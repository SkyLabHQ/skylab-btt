import {
    Box,
    Drawer,
    DrawerBody,
    DrawerContent,
    Text,
    Image,
    DrawerOverlay,
    SimpleGrid,
    Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import RightArrowIcon from "@/assets/right-arrow.svg";
import { usePrivy } from "@privy-io/react-auth";
import usePrivyAccounts from "@/hooks/usePrivyAccount";

import {
    useMultiMercuryJarTournamentContract,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { useChainId, usePublicClient } from "wagmi";
import useSkyToast from "@/hooks/useSkyToast";
import { useMercuryJarTournamentContract } from "@/hooks/useContract";
import PlaneBg from "@/assets/plane-bg.png";
import PlaneBgSelect from "./assets/plane-bg-select.png";

import NoPlane from "@/assets/no-plane.png";
import { aviationImg } from "@/utils/aviationImg";
import { levelRanges } from "@/utils/level";

const MyPlane = ({
    selectPlane,
    planeList,
    onPlay,
    onSelectPlane,
}: {
    selectPlane: any;
    planeList: any[];
    onPlay: () => void;
    onSelectPlane: (plane: any) => void;
}) => {
    return (
        <Flex
            sx={{
                height: "100%",
            }}
            flexDir={"column"}
        >
            <Box
                sx={{
                    flex: 1,
                }}
            >
                {planeList.length > 0 ? (
                    <SimpleGrid columns={2} spacingY={"40px"}>
                        {planeList.map((item, index) => {
                            return (
                                <PlaneItem
                                    isSelected={
                                        selectPlane?.tokenId === item.tokenId
                                    }
                                    detail={item}
                                    key={index}
                                    onSelectPlane={() => {
                                        onSelectPlane(item);
                                    }}
                                ></PlaneItem>
                            );
                        })}
                    </SimpleGrid>
                ) : (
                    <Flex flexDir={"column"} align={"center"}>
                        <Image
                            src={NoPlane}
                            sx={{
                                width: "140px",
                            }}
                        ></Image>
                    </Flex>
                )}
            </Box>
            <Flex
                onClick={onPlay}
                align={"center"}
                justify={"center"}
                sx={{
                    background: selectPlane?.tokenId ? "#F2D861" : "#777",
                    height: "64px",
                    width: "280px",
                    borderRadius: "24px",
                    fontSize: "28px",
                    fontWeight: 700,
                    color: selectPlane?.tokenId ? "#1b1b1b" : "#999",
                    margin: "28px auto 0",
                    backdropFilter: "blur(6.795704364776611px)",
                    fontFamily: "Orbitron",
                    cursor: selectPlane?.tokenId ? "pointer" : "not-allowed",
                }}
            >
                Play
            </Flex>
        </Flex>
    );
};

const PlaneItem = ({
    isSelected,
    detail,
    onSelectPlane,
}: {
    isSelected: boolean;
    detail: any;
    onSelectPlane: () => void;
}) => {
    return (
        <Flex
            flexDir={"column"}
            align={"center"}
            onClick={onSelectPlane}
            sx={{
                cursor: "pointer",
            }}
        >
            <Text
                sx={{
                    fontSize: "16px",
                }}
            >
                #{detail.tokenId}
            </Text>
            <Box
                sx={{
                    width: "100px",
                    height: "100px",
                    background: `url(${
                        isSelected ? PlaneBgSelect : PlaneBg
                    }) no-repeat`,
                    backgroundSize: "100% 100%",
                    position: "relative",
                }}
            >
                <Image
                    src={detail.img}
                    sx={{
                        width: "180%",
                        maxWidth: "180%",
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%,-50%)",
                    }}
                ></Image>
            </Box>
            <Text
                sx={{
                    fontWeight: "bold",
                    fontSize: "12px",
                }}
            >
                Lvl.{" "}
                <span
                    style={{
                        fontSize: "16px",
                    }}
                >
                    {detail.level}
                </span>
            </Text>
            <Box
                sx={{
                    width: "130px",
                    height: "13px",
                    padding: "2px",
                    border: "1px solid #FFF",
                    borderRadius: "12px",
                }}
            >
                <Box
                    sx={{
                        width:
                            ((detail.points - detail.prePoints) /
                                (detail.nextPoints - detail.points)) *
                                100 +
                            "%",
                        height: "100%",
                        background: "#fff",
                        borderRadius: "12px",
                    }}
                ></Box>
            </Box>
            <Text
                sx={{
                    fontSize: "16px",
                }}
            >
                Next Lvl:
            </Text>
            <Text
                sx={{
                    fontSize: "16px",
                }}
            >
                {detail.points}/
                <span
                    style={{
                        color: "#CCC",
                    }}
                >
                    {detail.nextPoints}pt
                </span>
            </Text>
        </Flex>
    );
};

const AvaitionDrawer = ({
    selectPlane,
    onClose,
    isOpen,
    onSelectPlane,
    onPlay,
}: {
    selectPlane: any;
    isOpen: boolean;
    onClose: () => void;
    onSelectPlane: (plane: any) => void;
    onPlay: () => void;
}) => {
    console.log(selectPlane, "selectPlane");
    const [planeList, setPlaneList] = useState([] as any[]);

    const toast = useSkyToast();
    const mercuryJarTournamentContract = useMercuryJarTournamentContract();
    const publicClient = usePublicClient();
    const chainId = useChainId();
    const { address } = usePrivyAccounts();
    const multiProvider = useMultiProvider(chainId);
    const multiMercuryJarTournamentContract =
        useMultiMercuryJarTournamentContract();
    const { user, logout } = usePrivy();
    const [paperBalance, setPaperBalance] = useState("0");
    const [planeBalance, setPlaneBalance] = useState("0");
    const [userName, setUserName] = useState("");
    const [placement, setPlacement] = React.useState("right");

    const handleGetUserPaper = async () => {
        const [planeBalance, paperBalance, userName] = await multiProvider.all([
            multiMercuryJarTournamentContract.balanceOf(address),
            multiMercuryJarTournamentContract.paperBalance(address),
            multiMercuryJarTournamentContract.userName(address),
        ]);
        setUserName(userName);
        setPaperBalance(paperBalance.toString());
        setPlaneBalance(planeBalance.toString());

        const p = [];
        for (let i = 0; i < Number(planeBalance.toString()); i++) {
            p.push(
                multiMercuryJarTournamentContract.tokenOfOwnerByIndex(
                    address,
                    i,
                ),
            );
        }

        const tokenIds = await multiProvider.all(p);

        const levelP = tokenIds.map((item) => {
            return multiMercuryJarTournamentContract.aviationPoints(item);
        });

        const levels = await multiProvider.all(levelP);

        const planeList = tokenIds.map((item, index) => {
            const points = Number(levels[index].toString());
            const levelItem = levelRanges.find((item) => {
                return points < item.maxPoints && points >= item.minPoints;
            });
            const level = levelItem.level;
            const nextPoints = levelItem.maxPoints;
            const prePoints = levelItem.minPoints;
            return {
                tokenId: item.toString(),
                points,
                level: level,
                img: aviationImg(level),
                nextPoints,
                prePoints,
            };
        });

        setPlaneList(planeList);
    };

    useEffect(() => {
        if (
            !isOpen ||
            !multiMercuryJarTournamentContract ||
            !multiProvider ||
            !address
        ) {
            return;
        }
        handleGetUserPaper();
    }, [isOpen, multiMercuryJarTournamentContract, multiProvider]);

    return (
        <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent
                sx={{
                    borderRadius: "20px",
                    border: "1px solid #F2D861",
                    background: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(25px)",
                    position: "relative",
                    maxWidth: "375px",
                }}
            >
                <DrawerBody
                    sx={{
                        padding: "30px",
                        width: "375px !important",
                    }}
                >
                    <Image
                        src={RightArrowIcon}
                        sx={{
                            width: "24px",
                            top: "40px",
                            left: "-36px",
                            position: "absolute",
                        }}
                    ></Image>
                    <MyPlane
                        planeList={planeList}
                        selectPlane={selectPlane}
                        onPlay={onPlay}
                        onSelectPlane={(plane) => {
                            onSelectPlane(plane);
                        }}
                    ></MyPlane>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default AvaitionDrawer;
