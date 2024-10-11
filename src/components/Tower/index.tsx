import { Box, Flex, Image, useDisclosure, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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
import { leagueAddressList } from "@/utils/league";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import { parseAmount } from "@/utils/formatBalance";
import { getLevelInfo } from "@/utils/level";
import { aviationImg } from "@/utils/aviationImg";

export interface TokenIdInfo {
    tokenId: number;
    point: number;
    level: number;
    img: string;
    prePoint: number;
    nextPoint: number;
    leader: string;
}
export interface Newcomer {
    claimTIme: number;
    newComerId: number;
    owner: string;
    point: number;
    leader: string;
}

const getInitNewcomerList = () => {
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
    const { address } = useUserInfo();
    const [pot, setPot] = useState("");
    const [myTokenIdsInfo, setMyAviationInfo] = useState<TokenIdInfo[]>([]);

    const multiLeagueTournamentContract = useMultiLeagueTournamentContract();
    const multiProvider = useMultiProvider(chainId);

    const handleInit = async () => {
        const p = [];
        p.push(multiLeagueTournamentContract.pot());
        for (let i = 1; i <= 16; i++) {
            p.push(multiLeagueTournamentContract.getNewComerInfo(i));
        }
        const [pot, ...res] = await multiProvider.all(p);
        setPot(pot.toString());
        const list: Newcomer[] = [];
        console.log(res, "res");
        res.forEach((item) => {
            list.push({
                claimTIme: item.claimTime.toNumber(),
                newComerId: item.newComerId.toNumber(),
                // owner: item[2],
                owner: ZERO_DATA,
                point: item.point.toNumber(),
                leader: item.leader,
            });
        });

        setNewcomerList(list);
        console.log(res);
        console.log("init");
    };

    const handleGetMyPlane = async () => {
        console.log(address, "address");
        const [aviationInfos] = await multiProvider.all([
            multiLeagueTournamentContract.getAccountInfo(address),
        ]);
        const { leaders, points, tokenIds } = aviationInfos;

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

            console.log(referral, expirationTime, signature, "signature");
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
            handleInit();
            handleGetMyPlane();
        } catch (e) {
            toast(handleError(e));
        }

        // const res= await getMintSignature("0x")
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
            <PrizeMoney pot={pot}></PrizeMoney>
            <Toolbar></Toolbar>
            <Status></Status>
            <AllAviation newcomerList={newcomerList}></AllAviation>
            <BtButton
                onAvaitionClick={onOpen}
                onPlayClick={onChoosePlaneOpen}
            ></BtButton>
            {/* <Warning></Warning> */}
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
        </Flex>
    );
};

export default Tower;
