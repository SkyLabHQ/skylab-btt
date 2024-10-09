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
import { useChainId } from "wagmi";
import { getLevelInfo } from "@/utils/level";
import { aviationImg } from "@/utils/aviationImg";

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
    const multiLeagueTournamentContract = useMultiLeagueTournamentContract();
    const multiProvider = useMultiProvider(chainId);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [pot, setPot] = React.useState("0");

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

        for (let i = 0; i < leagueAddressList.length; i++) {
            const leaderAddress = leagueAddressList[i];
            p.push(multiLeagueTournamentContract.getLeagueInfo(leaderAddress));
        }

        const [pot, ...leagueListRes] = await multiProvider.all(p);
        setPot(pot.toString());
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
                leagueConfig={leagueConfigList[activeIndex]}
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
