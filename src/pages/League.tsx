import Back from "@/components/Back";
import { Toolbar } from "@/components/Tower/Toolbar";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataInfo from "@/components/League/DataInfo";
import TeamPlaneList from "@/components/League/TeamPlaneList";
import leagueConfigList, { leagueAddressList } from "@/utils/league";
import LeaderRateModal from "@/components/League/LeaderRateModal";
import SelectTeam from "@/components/League/SelectTeam";
import {
    useMultiLeagueTournamentContract,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { useChainId, usePublicClient } from "wagmi";
import { getLevel, getLevelInfo } from "@/utils/level";
import { aviationImg } from "@/utils/aviationImg";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import { getInitNewcomerList, Newcomer } from "@/components/Tower";

export interface TokenIdInfo {
    tokenId: number;
    point: number;
    level: number;
    img: string;
    prePoint: number;
    nextPoint: number;
}
export interface LeagueInfo {
    isLocked: boolean;
    isWinner: boolean;
    leagueOwnerPercentage: number;
    newComerPercentage: number;
    tokenIdsInfo: TokenIdInfo[];
    premium: number;
    leader: string;
}

const initLeagueInfoList = leagueAddressList.map((item) => {
    return {
        isLocked: false,
        isWinner: false,
        leagueOwnerPercentage: 0,
        newComerPercentage: 0,
        tokenIdsInfo: [],
        premium: 0,
        leader: item,
    };
});

const League = () => {
    const chainId = useChainId();
    const publicClient = usePublicClient();
    const toast = useSkyToast();
    const multiLeagueTournamentContract = useMultiLeagueTournamentContract();
    const multiProvider = useMultiProvider(chainId);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [pot, setPot] = React.useState("0");
    const [newcomerList, setNewcomerList] = React.useState(
        getInitNewcomerList(),
    );

    const [leagueInfoList, setLeagueInfoList] =
        React.useState(initLeagueInfoList);
    const navigate = useNavigate();
    const {
        isOpen: isLeaderRateModalOpen,
        onOpen: onLeaderRateModalOpen,
        onClose: onLeaderRateModalClose,
    } = useDisclosure();

    console.log(leagueInfoList, "leagueInfoList");
    const handleActiveIndex = (index: number) => {
        setActiveIndex(index);
    };

    const handleGetLeagueInfo = async () => {
        const p = [];
        p.push(multiLeagueTournamentContract.pot());

        for (let i = 1; i <= 16; i++) {
            p.push(multiLeagueTournamentContract.getNewComerInfo(i));
        }

        for (let i = 0; i < leagueAddressList.length; i++) {
            const leaderAddress = leagueAddressList[i];
            p.push(multiLeagueTournamentContract.getLeagueInfo(leaderAddress));
        }

        const res = await multiProvider.all(p);
        const pot = res[0].toString();
        const newcomerList = res.slice(1, 17);
        const leagueListRes = res.slice(17);

        setPot(pot.toString());

        const list: Newcomer[] = [];
        newcomerList.forEach((item) => {
            const point = item.point.toNumber();
            const level = getLevel(point);
            list.push({
                claimTIme: item.claimTime.toNumber(),
                newComerId: item.newComerId.toNumber(),
                owner: item.owner,
                point: point,
                leader: item.leader,
                level,
            });
        });

        setNewcomerList(list);
        console.log(leagueListRes, "leagueListRes");
        const allTokenIds: string[] = [];
        const leagueInfoList: LeagueInfo[] = [];
        leagueListRes.forEach((item) => {
            allTokenIds.push(...item.tokenIds);
        });

        const p1 = [];
        for (let i = 0; i < allTokenIds.length; i++) {
            p1.push(
                multiLeagueTournamentContract.aviationPoints(allTokenIds[i]),
            );
        }

        const aviationPoints = await multiProvider.all(p1);
        console.log(aviationPoints, "aviationPoints");

        leagueListRes.forEach((item, index) => {
            leagueInfoList.push({
                isLocked: item.isLocked,
                isWinner: item.isWinner,
                leagueOwnerPercentage: item.leagueOwnerPercentage.toNumber(),
                newComerPercentage: item.newComerPercentage.toNumber(),
                tokenIdsInfo: item.tokenIds.map(
                    (tokenId: any, index: number) => {
                        const point = aviationPoints[index].toNumber();
                        const levelInfo = getLevelInfo(point);
                        const level = levelInfo.level;
                        const img = aviationImg(level);
                        return {
                            tokenId: tokenId.toNumber(),
                            point,
                            level: levelInfo.level,
                            img,
                            prePoint: levelInfo.minPoints,
                            nextPoint: levelInfo.maxPoints,
                        };
                    },
                ),
                premium: item.premium.toNumber(),
                leader: leagueAddressList[index],
            });
        });

        setLeagueInfoList(leagueInfoList);
    };

    const handleSetPremium = async (amount: string) => {
        try {
            const hash = await multiLeagueTournamentContract.setPremium([
                amount,
            ]);
            // @ts-ignore
            await publicClient.waitForTransactionReceipt({
                hash,
            });
            handleGetLeagueInfo();
        } catch (e) {
            console.log(e);
            toast(handleError(e));
        }
    };

    useEffect(() => {
        if (!multiLeagueTournamentContract || !multiProvider) return;
        handleGetLeagueInfo();
    }, [multiLeagueTournamentContract, multiProvider]);

    return (
        <Flex
            sx={{
                width: "100%",
                height: "100%",
                position: "relative",
                paddingTop: "100px",
            }}
            flexDirection={"column"}
            align={"center"}
        >
            <Box
                sx={{
                    position: "absolute",
                    left: "24px",
                    top: "24px",
                }}
            >
                <Back
                    onClick={() => {
                        navigate("/tower");
                    }}
                ></Back>
            </Box>
            <Toolbar showLeague={false}></Toolbar>
            <SelectTeam
                activeIndex={activeIndex}
                onActiveIndex={handleActiveIndex}
            ></SelectTeam>
            <DataInfo
                leagueInfo={leagueInfoList[activeIndex]}
                pot={pot}
            ></DataInfo>
            <TeamPlaneList
                newcomerList={newcomerList}
                onSetPremium={handleSetPremium}
                leagueColor={leagueConfigList[activeIndex].color}
                leagueInfo={leagueInfoList[activeIndex]}
                onLeaderRateModalOpen={onLeaderRateModalOpen}
            ></TeamPlaneList>
            <LeaderRateModal
                isOpen={isLeaderRateModalOpen}
                onClose={onLeaderRateModalClose}
            ></LeaderRateModal>
        </Flex>
    );
};

export default League;
