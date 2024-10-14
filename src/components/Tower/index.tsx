import { Box, Flex, Image, useDisclosure, Text } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import PrizeMoney from "./PrizeMoney";
import BtButton from "./BtButton";
import { Toolbar } from "./Toolbar";
import ChooseTeamModal from "./ChooseTeamModal";
import AllAviation from "./AllAviation";
import Warning from "./Warning";
import Status from "./Status";
import ChoosePlane from "./ChoosePlane";
import {
    useMultiLeagueTournamentContract,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { useChainId, usePublicClient } from "wagmi";
import { useLeagueTournamentContract } from "@/hooks/useContract";
import { ZERO_DATA } from "@/skyConstants";
import { useUserInfo } from "@/contexts/UserInfo";
import { getMintSignature, getTokensGame } from "@/api/tournament";
import { isAddress } from "@/utils/isAddress";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import { parseAmount } from "@/utils/formatBalance";
import { getLevel, getLevelInfo } from "@/utils/level";
import { aviationImg } from "@/utils/aviationImg";
import GameOver from "./GmeOver";
import leagueConfigList from "@/utils/league";
import useCountDown from "react-countdown-hook";
import { useSubmitRequest } from "@/contexts/SubmitRequest";

export interface TokenIdInfo {
    tokenId: number;
    point: number;
    level: number;
    img: string;
    prePoint: number;
    nextPoint: number;
    leader: string;
    state: boolean;
    gameId: number;
}
export interface Newcomer {
    claimTIme: number;
    newComerId: number;
    owner: string;
    point: number;
    leader: string;
    level: number;
}

export interface GameOverNewComer {
    leader: string;
    tokenId: number;
    owner: string;
}

export const getInitNewcomerList = () => {
    const list: Newcomer[] = [];
    for (let i = 0; i < 16; i++) {
        list.push({
            claimTIme: 0,
            newComerId: 0,
            owner: ZERO_DATA,
            point: 0,
            leader: ZERO_DATA,
            level: 0,
        });
    }
    return list;
};

const Tower = () => {
    const { openLoading, closeLoading } = useSubmitRequest();

    const [timeLeft, { start }] = useCountDown(0, 1000);

    useEffect(() => {
        start(70000);
    }, []);

    const [warnType, setWarnType] = useState(0); // 0不展示 1黄色 2红色
    const [warnSet, setWarnSet] = useState(false);

    const toast = useSkyToast();
    const publicClient = usePublicClient();
    const leagueTournamentContract = useLeagueTournamentContract();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isChoosePlaneOpen,
        onOpen: onChoosePlaneOpen,
        onClose: onChoosePlaneClose,
    } = useDisclosure();
    const chainId = useChainId();
    const [newcomerList, setNewcomerList] = useState<Newcomer[]>(
        getInitNewcomerList(),
    );
    const [gameOverNewComer, setGameOverNewComer] = useState<GameOverNewComer>({
        leader: ZERO_DATA,
        tokenId: 0,
        owner: ZERO_DATA,
    });
    const { address } = useUserInfo();
    const [pot, setPot] = useState("");
    const [myTokenIdsInfo, setMyAviationInfo] = useState<TokenIdInfo[]>([]);
    const [myClaimReward, setMyClaimReward] = useState("");

    const multiLeagueTournamentContract = useMultiLeagueTournamentContract();
    const multiProvider = useMultiProvider(chainId);

    // [winleage的配置 ,游戏是否结束]
    const [leagueConfig, gameOverFlag] = useMemo(() => {
        if (gameOverNewComer.tokenId == 0) {
            return [null, false];
        }

        const fItem = leagueConfigList.find(
            (item) => item.leader === gameOverNewComer.leader,
        );
        return [fItem, true];
    }, [gameOverNewComer]);

    // 倒计时的分钟和秒
    const { minutes, seconds } = useMemo(() => {
        const t = Math.floor(timeLeft / 1000);
        const minutes = String(Math.floor(t / 60)).padStart(2, "0");
        const seconds = String(t % 60).padStart(2, "0");
        return { minutes, seconds };
    }, [timeLeft]);

    // 倒计时最短的newcomer
    const oldNewcomer = useMemo(() => {
        const _list = newcomerList
            .filter((item) => {
                return item.claimTIme != 0;
            })
            .sort((a, b) => {
                return a.claimTIme - b.claimTIme;
            });

        if (_list.length == 0) {
            return null;
        }

        return _list[0];
    }, [newcomerList]);

    const handleInit = async () => {
        const p = [];
        p.push(multiLeagueTournamentContract.pot());
        p.push(multiLeagueTournamentContract.getGameOverNewComer());
        for (let i = 1; i <= 16; i++) {
            p.push(multiLeagueTournamentContract.getNewComerInfo(i));
        }
        const [pot, gameOver, ...res] = await multiProvider.all(p);
        setGameOverNewComer({
            leader: gameOver[2],
            tokenId: gameOver[1].toNumber(),
            owner: gameOver[0],
        });
        setPot(pot.toString());
        const list: Newcomer[] = [];
        res.forEach((item) => {
            const point = item.point.toNumber();
            const level = getLevel(point);
            list.push({
                claimTIme: item.claimTime.toNumber(),
                newComerId: item.newComerId.toNumber(),
                owner: item.owner,
                point: point,
                leader: item.leader,
                level: level,
            });
        });

        setNewcomerList(list);
        console.log(res);
        console.log("init");
    };

    // 获取我的飞机信息列表
    const handleGetMyPlane = async () => {
        const [aviationInfos] = await multiProvider.all([
            multiLeagueTournamentContract.getAccountInfo(address),
        ]);
        const { leaders, points, tokenIds, isLocked } = aviationInfos;

        const gameRes = await getTokensGame({
            tokens: tokenIds.map((item: string) => {
                return item.toString();
            }),
        });

        const tokensGame = gameRes.data.tokensGame;

        const myAviation = tokenIds.map((item: string, index: number) => {
            const point = points[index].toNumber();
            const levelInfo = getLevelInfo(point);
            const level = levelInfo.level;
            const img = aviationImg(level);
            const inGame = tokensGame.find((item1: any) => {
                return (
                    item1.tokenId1 === Number(item.toString()) ||
                    item1.tokenId2 === Number(item.toString())
                );
            });
            return {
                leader: leaders[index],
                point: points[index].toNumber(),
                tokenId: item.toString(),
                level: level,
                img: img,
                prePoint: levelInfo.minPoints,
                nextPoint: levelInfo.maxPoints,
                state: isLocked[index],
                gameId: inGame ? inGame.id : 0,
            };
        });
        setMyAviationInfo(myAviation);
        console.log(myAviation, "myAviation");
    };

    const handleMint = async (leader: string) => {
        try {
            let referral = sessionStorage.getItem("referral");
            const expirationTime = Math.floor(Date.now() / 1000) + 86400;
            let signature = "";
            if (isAddress(referral)) {
                const res = await getMintSignature(referral, expirationTime);
                console.log(res, "r");
            } else {
                referral = ZERO_DATA;
            }

            openLoading();
            const hash = await leagueTournamentContract.write.mint(
                [leader, referral, expirationTime, signature],
                {
                    value: parseAmount("0.02"),
                },
            );

            // @ts-ignore
            await publicClient.waitForTransactionReceipt({
                hash,
            });
            closeLoading();
            handleInit();
            handleGetMyPlane();
        } catch (e) {
            closeLoading();
            toast(handleError(e));
        }
    };

    const handleGetPotReward = async () => {
        const [reward] = await multiProvider.all([
            multiLeagueTournamentContract.claimPot(address),
        ]);
        setMyClaimReward(reward.toString());
        console.log(reward.toString(), "reward");
    };

    const handleClaimReward = async () => {
        try {
            openLoading();
            const hash = await leagueTournamentContract.write.claimPot([
                address,
            ]);
            // @ts-ignore
            await publicClient.waitForTransactionReceipt(hash);
            handleGetPotReward();
            closeLoading();
        } catch (e) {
            closeLoading();
            toast(handleError(e));
        }
    };

    const handleResetWarnType = () => {
        setWarnType(0);
    };

    const handleOpenBuyPlane = () => {
        if (!address) {
            return;
        }
        onOpen();
    };

    // 打开选择飞机弹窗
    const handleOpenChoosePlane = () => {
        if (!address) {
            return;
        }
        onChoosePlaneOpen();
    };

    useEffect(() => {
        if (!multiProvider || !multiLeagueTournamentContract) return;
        // handleInit();
    }, [multiProvider, multiLeagueTournamentContract]);

    useEffect(() => {
        if (!address || !multiProvider || !multiLeagueTournamentContract)
            return;
        handleGetMyPlane();
    }, [multiProvider, multiLeagueTournamentContract, address]);

    useEffect(() => {
        if (oldNewcomer) {
            const time = oldNewcomer.claimTIme * 1000 - Date.now();
            if (time > 0) {
                setWarnType(0);
                setWarnSet(false);
                start(time);
            } else {
                start(0);
            }
        }
    }, [oldNewcomer]);

    useEffect(() => {
        if (
            gameOverNewComer.tokenId == 0 ||
            !address ||
            !multiProvider ||
            !multiLeagueTournamentContract
        ) {
            return;
        }

        handleGetPotReward();
    }, [
        gameOverNewComer.tokenId,
        address,
        multiLeagueTournamentContract,
        multiProvider,
    ]);

    useEffect(() => {
        if (timeLeft === 0) {
            setWarnType(0);
            return;
        }

        if (warnSet) {
            return;
        }

        if (timeLeft > 60000 && timeLeft <= 300000) {
            setWarnType(1);
            setWarnSet(true);
        } else if (timeLeft <= 60000 && timeLeft > 0) {
            setWarnType(2);
            setWarnSet(true);
        }
    }, [timeLeft]);

    return (
        <Flex
            sx={{
                position: "relative",
                height: "100%",
                padding: "0 20px",
            }}
            flexDir={"column"}
            justify={"center"}
        >
            <Toolbar></Toolbar>
            <Status
                oldNewcomer={oldNewcomer}
                leagueConfig={leagueConfig}
                timeLeft={timeLeft}
                minutes={minutes}
                seconds={seconds}
                gameOverFlag={gameOverFlag}
            ></Status>
            {!gameOverFlag && (
                <>
                    <PrizeMoney pot={pot}></PrizeMoney>
                    <AllAviation newcomerList={newcomerList}></AllAviation>
                    <BtButton
                        onAvaitionClick={handleOpenBuyPlane}
                        onPlayClick={handleOpenChoosePlane}
                    ></BtButton>
                    <Warning
                        warnType={warnType}
                        timeLeft={timeLeft}
                        minutes={minutes}
                        seconds={seconds}
                        onResetWarnType={handleResetWarnType}
                    ></Warning>
                    <ChooseTeamModal
                        handleMint={handleMint}
                        isOpen={isOpen}
                        onClose={onClose}
                    ></ChooseTeamModal>
                    <ChoosePlane
                        myTokenIdsInfo={myTokenIdsInfo}
                        isOpen={isChoosePlaneOpen}
                        onClose={onChoosePlaneClose}
                    ></ChoosePlane>
                </>
            )}

            {gameOverFlag && (
                <GameOver
                    leagueConfig={leagueConfig}
                    reward={myClaimReward}
                    onClaimReward={handleClaimReward}
                ></GameOver>
            )}
        </Flex>
    );
};

export default Tower;
