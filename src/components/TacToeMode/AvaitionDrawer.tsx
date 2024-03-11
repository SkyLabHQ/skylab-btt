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
import NoPlane from "@/assets/no-plane.png";
import { aviationImg } from "@/utils/aviationImg";
import { levelRanges } from "@/utils/level";

const MyPlane = ({
    balance,
    planeList,
}: {
    balance: string;
    planeList: any[];
}) => {
    return (
        <Box>
            <Box
                sx={{
                    paddingTop: "48px",
                }}
            >
                {planeList.length > 0 ? (
                    <SimpleGrid columns={2} spacingY={"40px"}>
                        {planeList.map((item, index) => {
                            return (
                                <PlaneItem
                                    detail={item}
                                    key={index}
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
    );
};

const PlaneItem = ({ detail }: { detail: any }) => {
    return (
        <Flex flexDir={"column"} align={"center"}>
            <Box
                sx={{
                    width: "100px",
                    height: "100px",
                    background: `url(${PlaneBg}) no-repeat`,
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
                        width: "100%",
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
    onClose,
    isOpen,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
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
            return {
                tokenId: item.toString(),
                points,
                level: level,
                img: aviationImg(level),
                nextPoints,
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
                    <MyPlane planeList={planeList} balance={"0"}></MyPlane>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default AvaitionDrawer;
