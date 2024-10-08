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
import { getLevelInfo } from "@/utils/level";
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
        });
    }
    return list;
};

const Tower = () => {
    const { openLoading, closeLoading } = useSubmitRequest();

    const [timeLeft, { start }] = useCountDown(0, 1000);
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

    const leagueConfig = useMemo(() => {
        const fItem = leagueConfigList.find(
            (item) => item.leader === gameOverNewComer.leader,
        );
        return fItem;
    }, [gameOverNewComer]);

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
            list.push({
                claimTIme: item.claimTime.toNumber(),
                newComerId: item.newComerId.toNumber(),
                owner: item.owner,
                point: item.point.toNumber(),
                leader: item.leader,
            });
        });

        setNewcomerList(list);
        console.log(res);
        console.log("init");
    };

    const handleGetMyPlane = async () => {
        const [aviationInfos] = await multiProvider.all([
            multiLeagueTournamentContract.getAccountInfo(address),
        ]);
        console.log(aviationInfos, "aviationInfos");
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

    useEffect(() => {
        if (!multiProvider || !multiLeagueTournamentContract) return;
        handleInit();
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
            <Status leagueConfig={leagueConfig}></Status>
            {timeLeft >= 0 && timeLeft < 300000 && (
                <Warning
                    timeLeft={timeLeft}
                    oldNewcomer={oldNewcomer}
                ></Warning>
            )}
            {gameOverNewComer.tokenId == 0 ? (
                <>
                    <PrizeMoney pot={pot}></PrizeMoney>
                    <AllAviation newcomerList={newcomerList}></AllAviation>
                    <BtButton
                        onAvaitionClick={onOpen}
                        onPlayClick={onChoosePlaneOpen}
                    ></BtButton>
                    {timeLeft > 0 && timeLeft < 300000 && (
                        <Warning
                            timeLeft={timeLeft}
                            oldNewcomer={oldNewcomer}
                        ></Warning>
                    )}
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
            ) : (
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
