import {
    Box,
    Flex,
    Image,
    SimpleGrid,
    Text,
    useMediaQuery,
} from "@chakra-ui/react";
import TipIcon from "./assets/tip.svg";
import NoPlane from "@/assets/no-plane.png";
import { useEffect, useState } from "react";
import { aviationImg } from "@/utils/aviationImg";
import { levelRanges } from "@/utils/level";
import {
    useMultiMercuryJarTournamentContract,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import { useChainId } from "wagmi";
import BiddingGif from "@/assets/bidding.gif";
import PlaneBgSelect from "./assets/plane-bg-select.png";
import PlaneBg from "@/assets/plane-bg.png";

const SelectPlane = ({
    selectPlane,
    onSelectPlane,
}: {
    selectPlane: any;
    onSelectPlane: (plane: any) => void;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [planeList, setPlaneList] = useState([] as any[]);
    const chainId = useChainId();
    const { address } = usePrivyAccounts();
    const [planeListInit, setPlaneListLoading] = useState(false);
    const multiProvider = useMultiProvider(chainId);
    const multiMercuryJarTournamentContract =
        useMultiMercuryJarTournamentContract();

    const handleGetUserPaper = async () => {
        setPlaneListLoading(true);
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

        const p2: any = [];
        tokenIds.forEach((item) => {
            p2.push(multiMercuryJarTournamentContract.aviationPoints(item));
            p2.push(multiMercuryJarTournamentContract.isAviationLocked(item));
        });

        const levels = await multiProvider.all(p2);

        const planeList = tokenIds.map((item, index) => {
            const points = Number(levels[index * 2].toString());
            const state = levels[index * 2 + 1];
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
                state,
            };
        });

        setPlaneListLoading(false);
        setPlaneList(planeList);
    };

    useEffect(() => {
        if (!multiMercuryJarTournamentContract || !multiProvider || !address) {
            return;
        }

        handleGetUserPaper();
    }, [multiMercuryJarTournamentContract, multiProvider, address]);
    return (
        <Box
            sx={{
                marginTop: "30px",
            }}
        >
            <Flex justify={"center"} align={"center"}>
                <Image src={TipIcon}></Image>
                <Text
                    sx={{
                        color: "#F2D861",
                        fontSize: "20px",
                        fontFamily: "Quantico",
                    }}
                >
                    Please select plane first
                </Text>
            </Flex>
            <Box
                sx={{
                    width: "800px",
                    borderRadius: "18px",
                    border: "1px solid #FFF",
                    height: "calc(100vh - 560px)",
                    marginTop: "10px",
                    overflow: "auto",
                }}
            >
                <Flex
                    flexDir={"column"}
                    sx={{
                        height: "100%",
                    }}
                >
                    <Text
                        sx={{
                            fontSize: "30px",
                            textAlign: "center",
                            marginTop: "20px",
                            fontFamily: "Orbitron",
                            fontWeight: "bold",
                        }}
                    >
                        Select Planes
                    </Text>

                    <Box
                        sx={{
                            marginTop: "20px",
                            height: "100%",
                        }}
                    >
                        {planeListInit ? (
                            <SimpleGrid
                                columns={4}
                                sx={{
                                    position: "relative",
                                }}
                                spacingY={"30px"}
                            >
                                {new Array(4).fill("").map((item, index) => {
                                    return (
                                        <Box
                                            sx={{
                                                position: "relative",
                                            }}
                                            key={index}
                                        >
                                            <Image src={BiddingGif}></Image>
                                        </Box>
                                    );
                                })}
                            </SimpleGrid>
                        ) : planeList.length > 0 ? (
                            <SimpleGrid columns={4} spacingY={"20px"}>
                                {planeList.map((detail, index) => {
                                    const isSelected =
                                        selectPlane?.tokenId === detail.tokenId;
                                    return (
                                        <Flex
                                            key={index}
                                            flexDir={"column"}
                                            align={"center"}
                                            onClick={() => {
                                                onSelectPlane(detail);
                                            }}
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
                                                    width: isPc
                                                        ? "100px"
                                                        : "60px",
                                                    height: isPc
                                                        ? "100px"
                                                        : "60px",
                                                    background: `url(${
                                                        isSelected
                                                            ? PlaneBgSelect
                                                            : PlaneBg
                                                    }) no-repeat`,
                                                    backgroundSize: "100% 100%",
                                                    position: "relative",
                                                    marginTop: isPc
                                                        ? "6px"
                                                        : "3px",
                                                }}
                                            >
                                                {detail.state && (
                                                    <Box
                                                        sx={{
                                                            width: isPc
                                                                ? "80px"
                                                                : "60px",
                                                            height: isPc
                                                                ? "20px"
                                                                : "16px",
                                                            borderRadius: isPc
                                                                ? "100px"
                                                                : "6px",
                                                            border: "1px solid #000",
                                                            color: "#F2D861",
                                                            textAlign: "center",
                                                            fontFamily:
                                                                "Quantico",
                                                            fontSize: isPc
                                                                ? "14px"
                                                                : "10px",
                                                            background: "#000",
                                                            position:
                                                                "absolute",
                                                            top: "0px",
                                                            left: "50%",
                                                            transform:
                                                                "translate(-50%, 0)",
                                                        }}
                                                    >
                                                        In-Game
                                                    </Box>
                                                )}
                                                <Image
                                                    src={detail.img}
                                                    sx={{
                                                        width: "180%",
                                                        maxWidth: "180%",
                                                        position: "absolute",
                                                        left: "50%",
                                                        top: "50%",
                                                        transform:
                                                            "translate(-50%,-50%)",
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
                                                    width: isPc
                                                        ? "130px"
                                                        : "90px",
                                                    height: isPc
                                                        ? "13px"
                                                        : "10px",
                                                    padding: "2px",
                                                    border: "1px solid #FFF",
                                                    borderRadius: "12px",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width:
                                                            ((detail.points -
                                                                detail.prePoints) /
                                                                (detail.nextPoints -
                                                                    detail.prePoints)) *
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
                                                    fontSize: isPc
                                                        ? "16px"
                                                        : "12px",
                                                }}
                                            >
                                                Next Lvl:
                                            </Text>
                                            <Text
                                                sx={{
                                                    fontSize: isPc
                                                        ? "16px"
                                                        : "12px",
                                                }}
                                            >
                                                {detail.points}/
                                                <span
                                                    style={{
                                                        color: "#CCC",
                                                    }}
                                                >
                                                    {detail.nextPoints}
                                                    pt
                                                </span>
                                            </Text>
                                        </Flex>
                                    );
                                })}
                            </SimpleGrid>
                        ) : (
                            <Flex>
                                <Image
                                    src={NoPlane}
                                    sx={{
                                        width: "200px",
                                        margin: "50px auto",
                                    }}
                                ></Image>
                            </Flex>
                        )}
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
};

export default SelectPlane;
