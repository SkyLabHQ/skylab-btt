import { aviationImg } from "@/utils/aviationImg";
import { Box, Image, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import Bg from "./assets/card-bg.png";
import {
    useMultiMarketPlaceContract,
    useMultiMercuryJarTournamentContract,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { useChainId, usePublicClient } from "wagmi";
import {
    mercuryJarTournamentAddress,
    useMarketPlaceContract,
    useMercuryJarTournamentContract,
} from "@/hooks/useContract";
import usePrivyAccounts from "@/hooks/usePrivyAccount";

import { formatAmount, parseAmount } from "@/utils/formatBalance";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import { useUserInfo } from "@/contexts/UserInfo";
import LArrowIcon from "./assets/l-arrow.svg";
import LGArrowIcon from "./assets/l-arrow-g.svg";

import RArrowIcon from "./assets/r-arrow.svg";
import RGArrowIcon from "./assets/r-arrow-g.svg";

const My = () => {
    const [myPlaneList, setMyPlaneList] = useState([]);
    const [isApproved, setIsApproved] = useState(false);
    const publicClient = usePublicClient();
    const toast = useSkyToast();
    const { address } = usePrivyAccounts();
    const chainId = useChainId();
    const multiProvider = useMultiProvider(chainId);
    const multiMarketPlaceContract = useMultiMarketPlaceContract();
    const marketPlaceContract = useMarketPlaceContract();
    const multiMercuryJarTournamentContract =
        useMultiMercuryJarTournamentContract();

    const mercuryJarTournamentContract = useMercuryJarTournamentContract();

    const [large680] = useMediaQuery("(min-width: 680px)");

    const { planeList, handleGetUserPlane } = useUserInfo();

    const [highList, sethighList] = useState(new Array(16).fill("0"));

    const handleMintPlane = async () => {
        try {
            await mercuryJarTournamentContract.simulate.mint([1], {
                value: parseAmount("0.02"),
                account: address,
            });
            const hash = await mercuryJarTournamentContract.write.mint([1], {
                value: parseAmount("0.02"),
            });
            // @ts-ignore
            const receipt = await publicClient.waitForTransactionReceipt({
                hash,
            });
            if (receipt.status !== "success") {
                toast("Transaction failed");
                return;
            }

            handleGetUserPlane();
        } catch (e) {
            console.log(e, "e");
            toast(handleError(e));
        }
    };

    const getHighPrice = async () => {
        const p = [];
        for (let i = 1; i <= 16; i++) {
            p.push(multiMarketPlaceContract.getHighestBid(i));
        }
        const list = await multiProvider.all(p);
        sethighList(
            list.map((item) => {
                return item.toString();
            }),
        );
    };

    const getApprove = async () => {
        const [isApprovedForAll] = await multiProvider.all([
            multiMercuryJarTournamentContract.isApprovedForAll(
                address,
                marketPlaceContract.address,
            ),
        ]);
        setIsApproved(isApprovedForAll);
    };

    const handleApproveForAll = async () => {
        try {
            await mercuryJarTournamentContract.simulate.setApprovalForAll(
                [marketPlaceContract.address, true],
                {
                    account: address,
                },
            );
            const hash =
                await mercuryJarTournamentContract.write.setApprovalForAll([
                    marketPlaceContract.address,
                    true,
                ]);
            // @ts-ignore
            const receipt = await publicClient.waitForTransactionReceipt({
                hash,
            });
            if (receipt.status !== "success") {
                toast("Transaction failed");
                return;
            }
            setIsApproved(true);
        } catch (e) {
            toast(handleError(e));
        }
    };

    const handleNextTokenId = (index: number) => {
        const _myPlaneList = JSON.parse(JSON.stringify(myPlaneList));
        const current = _myPlaneList[index].planeIndex;
        const next = current + 1;

        if (next >= _myPlaneList[index].planes.length) {
            return;
        }
        _myPlaneList[index].planeIndex = next;
        setMyPlaneList(_myPlaneList);
    };

    const handlePreTokenId = (index: number) => {
        const _myPlaneList = JSON.parse(JSON.stringify(myPlaneList));
        const current = _myPlaneList[index].planeIndex;
        const next = current - 1;
        if (next < 0) {
            return;
        }
        _myPlaneList[index].planeIndex = next;
        setMyPlaneList(_myPlaneList);
    };

    const handleSell = async (tokenId: number) => {
        try {
            await marketPlaceContract.simulate.sell(
                [mercuryJarTournamentAddress[chainId], tokenId],
                {
                    account: address,
                },
            );

            const hash = await marketPlaceContract.write.sell(
                [mercuryJarTournamentAddress[chainId], tokenId],
                {
                    gasLimit: 10000000,
                },
            );

            // @ts-ignore
            const receipt = await publicClient.waitForTransactionReceipt({
                hash,
            });
            if (receipt.status !== "success") {
                toast("Transaction failed");
                return;
            }

            handleGetUserPlane();
        } catch (e) {
            toast(handleError(e));
        }
    };

    useEffect(() => {
        if (!multiMarketPlaceContract || !multiProvider || !marketPlaceContract)
            return;

        getHighPrice();
    }, [multiMarketPlaceContract, multiProvider, marketPlaceContract]);

    useEffect(() => {
        if (!multiMercuryJarTournamentContract || !address || !multiProvider)
            return;

        getApprove();
    }, [multiMercuryJarTournamentContract, multiProvider, address]);

    useEffect(() => {
        const list: any[] = [];

        for (let i = 0; i < 16; i++) {
            const level = i + 1;
            list.push({
                planes: [],
                level,
                img: aviationImg(i + 1),
                planeIndex: 0,
            });
        }

        planeList
            .filter((item) => {
                return item.state !== true;
            })
            .forEach((item) => {
                const listIndex = item.level - 1;
                list[listIndex].planes.push(item);
            });
        const newList = list.filter((item) => {
            return item.planes.length > 0;
        });

        setMyPlaneList(newList);
    }, [planeList]);

    return (
        <Flex
            sx={{
                width: "100%",
                flexWrap: "wrap",
                "&>div": {
                    margin: large680 ? "0 10px" : "0 1%",
                    marginBottom: "20px",
                },
            }}
        >
            <Box
                sx={{
                    borderRadius: "20px",
                    border: "4px solid #1B1B1B",
                    overflow: "hidden",
                    width: large680 ? "320px" : "48%",
                    position: "relative",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        height: "0",
                        paddingBottom: large680
                            ? "calc(100% + 103px)"
                            : "calc(100% + 62px)",
                        background: `url(${aviationImg(1)}) no-repeat`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        position: "relative",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            background: "rgba(4, 4, 4, 0.80)",
                            position: "absolute",
                            top: "0",
                            left: "0",
                            paddingTop: "45%",
                            textAlign: "center",
                            fontSize: large680 ? "24px" : "14px",
                            fontWeight: 700,
                            fontFamily: "Orbitron",
                        }}
                    >
                        Mint Plane
                    </Box>
                </Box>

                <Flex
                    align={"center"}
                    justify={"center"}
                    sx={{
                        height: large680 ? "50px" : "28px",
                        background: "#F2D861",
                        fontSize: large680 ? "18px" : "14px",
                        color: "#1b1b1b",
                        fontFamily: "Orbitron",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                    onClick={handleMintPlane}
                >
                    0.01 ETH
                </Flex>
            </Box>
            {myPlaneList.map((item, index) => {
                const currentPlane = item.planes[item.planeIndex];
                const havePrice = highList[item.level - 1] !== "0";
                // const
                return (
                    <Box
                        key={index}
                        sx={{
                            borderRadius: "20px",
                            border: "4px solid #1B1B1B",
                            overflow: "hidden",
                            width: large680 ? "320px" : "48%",
                        }}
                    >
                        <Box
                            sx={{
                                background: `url(${Bg}) no-repeat`,
                                backgroundSize: "cover",
                                position: "relative",
                            }}
                        >
                            <Flex
                                sx={{
                                    position: "absolute",
                                    left: "0",
                                    top: "0",
                                    background: "rgba(0, 0, 0, 0.40)",
                                    width: large680 ? "102px" : "58px",
                                    height: large680 ? "60px" : "35px",
                                    borderRadius: large680
                                        ? "0px 24px 24px 0"
                                        : "0px 16px 16px 0",
                                    fontWeight: "bold",
                                    fontSize: large680 ? "24px" : "14px",
                                    fontFamily: "Orbitron",
                                }}
                                justify={"center"}
                                align={"center"}
                            >
                                <Box>
                                    Lvl.{" "}
                                    <span
                                        style={{
                                            fontSize: large680
                                                ? "32px"
                                                : "18px",
                                        }}
                                    >
                                        {item.level}
                                    </span>
                                </Box>
                            </Flex>
                            <Image
                                src={
                                    item.planeIndex === 0
                                        ? LGArrowIcon
                                        : LArrowIcon
                                }
                                onClick={() => {
                                    handlePreTokenId(index);
                                }}
                                sx={{
                                    width: "16px",
                                    position: "absolute",
                                    left: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    cursor:
                                        item.planeIndex === 0
                                            ? "not-allowed"
                                            : "pointer",
                                }}
                            ></Image>
                            <Text
                                sx={{
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    position: "absolute",
                                    left: "50%",
                                    top: "35px",
                                    transform: "translateX(-50%)",
                                }}
                            >
                                #{currentPlane.tokenId}
                            </Text>
                            <Box
                                sx={{
                                    position: "absolute",
                                    left: "50%",
                                    bottom: "20px",
                                    transform: "translateX(-50%)",
                                    fontSize: "18px",
                                    lineHeight: "1",
                                    textAlign: "center",
                                }}
                            >
                                <Text>NextLvl:</Text>
                                <Text>
                                    {currentPlane.points}/
                                    <span
                                        style={{
                                            color: "#CCCCCC",
                                        }}
                                    >
                                        {currentPlane.nextPoints}pt
                                    </span>{" "}
                                </Text>
                            </Box>

                            <Image src={item.img}></Image>
                            <Image
                                src={
                                    item.planeIndex === item.planes.length - 1
                                        ? RGArrowIcon
                                        : RArrowIcon
                                }
                                onClick={() => {
                                    handleNextTokenId(index);
                                }}
                                sx={{
                                    width: "16px",
                                    position: "absolute",
                                    right: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    cursor:
                                        item.planeIndex ===
                                        item.planes.length - 1
                                            ? "not-allowed"
                                            : "pointer",
                                }}
                            ></Image>

                            <Flex
                                sx={{
                                    position: "absolute",
                                    right: "0px",
                                    bottom: "10px",
                                    background: "rgba(0, 0, 0, 0.40)",
                                    width: large680 ? "70px" : "58px",
                                    height: large680 ? "46px" : "35px",
                                    borderRadius: large680
                                        ? "24px 0  0 24px "
                                        : " 16px 0 0 16px ",
                                    fontWeight: "bold",
                                    fontSize: large680 ? "24px" : "14px",
                                    fontFamily: "Orbitron",
                                }}
                                justify={"center"}
                                align={"center"}
                            >
                                <Box>
                                    x{" "}
                                    <span
                                        style={{
                                            fontSize: large680
                                                ? "32px"
                                                : "18px",
                                        }}
                                    >
                                        {item.planes.length}
                                    </span>
                                </Box>
                            </Flex>
                        </Box>

                        <Box
                            sx={{
                                background: "#2D240C",
                                padding: large680 ? "24px 12px" : "12px 4px",
                            }}
                        >
                            <Flex
                                justify={"space-between"}
                                sx={{
                                    fontSize: large680 ? "14px" : "12px",
                                }}
                            >
                                <Text>Hignest Price</Text>
                            </Flex>
                            <Flex
                                justify={"space-between"}
                                align={"flex-end"}
                                sx={{
                                    fontWeight: "bold",
                                    marginTop: large680 ? "4px" : "2px",
                                    verticalAlign: "bottom",
                                    lineHeight: "1",
                                    fontFamily: "DIN-Black",
                                }}
                            >
                                <Text
                                    sx={{
                                        fontSize: large680 ? "30px" : "18px",
                                    }}
                                >
                                    {havePrice
                                        ? formatAmount(highList[index])
                                        : "--"}{" "}
                                    ETH
                                </Text>
                            </Flex>
                        </Box>

                        <Box>
                            {isApproved ? (
                                <Flex
                                    onClick={() => {
                                        if (!havePrice) return;
                                        handleSell(currentPlane.tokenId);
                                    }}
                                    align={"center"}
                                    justify={"center"}
                                    sx={{
                                        height: large680 ? "50px" : "28px",
                                        background: havePrice
                                            ? "#2D240C"
                                            : "#1e1e1e",
                                        fontSize: large680 ? "18px" : "14px",
                                        color: havePrice
                                            ? "#F2D861"
                                            : "#7a7a7a",
                                        fontFamily: "Orbitron",
                                        fontWeight: "bold",
                                        border: havePrice
                                            ? "1px solid #F2D861"
                                            : "1px solid #1e1e1e",
                                        borderRadius: "0 0 14px 14px",
                                        position: "relative",
                                        cursor: havePrice
                                            ? "pointer"
                                            : "not-allowed",
                                    }}
                                >
                                    Sell
                                    {havePrice && (
                                        <Box
                                            sx={{
                                                width: 0,
                                                height: 0,
                                                borderWidth: "0 10px 10px",
                                                borderStyle: "solid",
                                                borderColor:
                                                    "transparent transparent #F2D861",
                                                position: "absolute",
                                                left: "10px",
                                                top: "-10px",
                                                "&::before": {
                                                    content: '""',
                                                    position: "absolute",
                                                    top: "2px",
                                                    left: "-8px",
                                                    width: 0,
                                                    height: 0,
                                                    borderWidth: "0 8px 8px",
                                                    borderStyle: "solid",
                                                    borderColor:
                                                        "transparent transparent #2D240C",
                                                },
                                            }}
                                        ></Box>
                                    )}
                                </Flex>
                            ) : (
                                <Flex
                                    align={"center"}
                                    justify={"center"}
                                    sx={{
                                        height: large680 ? "50px" : "28px",
                                        background: "#F2D861",
                                        fontSize: large680 ? "18px" : "14px",
                                        color: "#1b1b1b",
                                        fontFamily: "Orbitron",
                                        fontWeight: "bold",
                                        cursor: "pointer",
                                    }}
                                    onClick={handleApproveForAll}
                                >
                                    Approve
                                </Flex>
                            )}
                        </Box>
                    </Box>
                );
            })}
        </Flex>
    );
};

export default My;
