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
    useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import RightArrowIcon from "@/assets/right-arrow.svg";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import DownArrowIcon from "@/assets/down-arrow.png";

import {
    useMultiMercuryJarTournamentContract,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { useChainId } from "wagmi";
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
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Flex
            flexDir={"column"}
            sx={{
                height: "100%",
            }}
        >
            <Box
                sx={{
                    flex: 1,
                }}
            >
                {!isPc && (
                    <Text
                        sx={{
                            fontSize: "20px",
                            textAlign: "center",
                            marginTop: "20px",
                        }}
                    >
                        Select Planes
                    </Text>
                )}
                <Box>
                    {planeList.length > 0 ? (
                        <SimpleGrid
                            columns={isPc ? 2 : 3}
                            spacingY={isPc ? "40px" : "30px"}
                        >
                            {planeList.map((item, index) => {
                                return (
                                    <PlaneItem
                                        isSelected={
                                            selectPlane?.tokenId ===
                                            item.tokenId
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
            </Box>

            <Flex
                onClick={onPlay}
                align={"center"}
                justify={"center"}
                sx={{
                    background: selectPlane?.tokenId ? "#F2D861" : "#777",
                    height: isPc ? "64px" : "40px",
                    width: isPc ? "280px" : "180px",
                    borderRadius: isPc ? "24px" : "12px",
                    fontSize: isPc ? "28px" : "16px",
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
    const [isPc] = useMediaQuery("(min-width: 800px)");
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
                    width: isPc ? "100px" : "60px",
                    height: isPc ? "100px" : "60px",
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
                    width: isPc ? "130px" : "90px",
                    height: isPc ? "13px" : "10px",
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
                    fontSize: isPc ? "16px" : "12px",
                }}
            >
                Next Lvl:
            </Text>
            <Text
                sx={{
                    fontSize: isPc ? "16px" : "12px",
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
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [planeList, setPlaneList] = useState([] as any[]);
    const chainId = useChainId();
    const { address } = usePrivyAccounts();
    const multiProvider = useMultiProvider(chainId);
    const multiMercuryJarTournamentContract =
        useMultiMercuryJarTournamentContract();

    const handleGetUserPaper = async () => {
        const [planeBalance] = await multiProvider.all([
            multiMercuryJarTournamentContract.balanceOf(address),
        ]);

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
                    maxWidth: isPc ? "375px" : "800px",
                }}
            >
                <DrawerBody
                    sx={{
                        padding: isPc ? "30px" : "14px",
                        width: "100% !important",
                    }}
                >
                    {isPc ? (
                        <Image
                            src={RightArrowIcon}
                            sx={{
                                width: "24px",
                                top: "40px",
                                left: "-36px",
                                position: "absolute",
                            }}
                            onClick={onClose}
                        ></Image>
                    ) : (
                        <Flex justify={"center"}>
                            <Image
                                sx={{
                                    width: "16px",
                                    top: "10px",
                                    left: "50%",
                                    position: "absolute",
                                    transform: "translate(-50%, 0)",
                                }}
                                onClick={onClose}
                                src={DownArrowIcon}
                            ></Image>
                        </Flex>
                    )}

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
