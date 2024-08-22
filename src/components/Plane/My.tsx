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
import { formatAmount } from "@/utils/formatBalance";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import { useUserInfo } from "@/contexts/UserInfo";
import { DEAFAULT_CHAINID } from "@/utils/web3Utils";

const My = () => {
    const [isApproved, setIsApproved] = useState(false);
    const publicClient = usePublicClient();
    const toast = useSkyToast();
    const { address } = useUserInfo();
    const chainId = useChainId();
    const multiProvider = useMultiProvider(chainId);
    const multiMarketPlaceContract = useMultiMarketPlaceContract();
    const marketPlaceContract = useMarketPlaceContract();
    const multiMercuryJarTournamentContract =
        useMultiMercuryJarTournamentContract();

    const mercuryJarTournamentContract = useMercuryJarTournamentContract();

    const [large680] = useMediaQuery("(min-width: 680px)");

    const { planeList, handleGetUserPlane } = useUserInfo();

    const [highList, sethighList] = useState(
        new Array(16).fill({
            bidder: "",
            price: "0",
        }),
    );

    const myPlaneList = useMemo(() => {
        return planeList.sort((item1, item2) => {
            if (item1.state === false && item2.state === true) {
                return -1; // item1排在前
            } else if (item1.state === true && item2.state === false) {
                return 1; // item2排在前
            } else {
                return item2.points - item1.points; // 如果state相同，则根据point进行排序
            }
        });
    }, [planeList]);

    console.log(myPlaneList, "myPlaneList");

    const getHighPrice = async () => {
        const p = [];
        for (let i = 1; i <= 16; i++) {
            p.push(multiMarketPlaceContract.getHighestBid(i));
        }
        const list = await multiProvider.all(p);
        sethighList(
            list.map((item) => {
                return {
                    bidder: item[0],
                    price: item[1].toString(),
                };
            }),
        );
    };

    console.log(highList, "list");

    const getApprove = async () => {
        const [isApprovedForAll] = await multiProvider.all([
            multiMercuryJarTournamentContract.isApprovedForAll(
                address,
                marketPlaceContract.address,
            ),
        ]);
        setIsApproved(isApprovedForAll);
    };

    const handleSell = async (tokenId: number) => {
        try {
            if (!isApproved) {
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
            }

            await marketPlaceContract.simulate.sell(
                [
                    mercuryJarTournamentAddress[DEAFAULT_CHAINID] as string,
                    tokenId,
                ],
                {
                    account: address,
                },
            );

            const hash = await marketPlaceContract.write.sell([
                mercuryJarTournamentAddress[DEAFAULT_CHAINID],
                tokenId,
            ]);

            // @ts-ignore
            const receipt = await publicClient.waitForTransactionReceipt({
                hash,
            });
            if (receipt.status !== "success") {
                toast("Transaction failed");
                return;
            }

            getHighPrice();
            handleGetUserPlane();
        } catch (e) {
            toast(handleError(e));
        }
    };

    useEffect(() => {
        if (!multiMarketPlaceContract || !multiProvider) return;

        getHighPrice();
    }, [multiMarketPlaceContract, multiProvider]);

    useEffect(() => {
        if (!multiMercuryJarTournamentContract || !address || !multiProvider)
            return;

        getApprove();
    }, [multiMercuryJarTournamentContract, multiProvider, address]);

    return (
        <Flex
            sx={{
                width: "100%",
                flexWrap: "wrap",
                fontFamily: "Orbitron",
                "&>div": {
                    margin: large680 ? "0 10px" : "0 1%",
                    marginBottom: "20px",
                },
            }}
        >
            {myPlaneList.map((item, index) => {
                const bidder =
                    highList[item.level - 1].bidder.toLocaleLowerCase();
                const price = highList[item.level - 1].price;
                const havePrice = price !== "0";

                const showMyBid =
                    bidder === address.toLocaleLowerCase() && price !== "0";

                const canSell = item.state === false && havePrice && !showMyBid;

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
                                paddingBottom: "100%",
                                height: "0",
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
                                    fontSize: large680 ? "20px" : "14px",
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
                                                ? "26px"
                                                : "18px",
                                        }}
                                    >
                                        {item.level}
                                    </span>
                                </Box>
                            </Flex>
                            {item.state && (
                                <Flex
                                    sx={{
                                        position: "absolute",
                                        right: "0",
                                        top: "0",
                                        background: "rgba(0, 0, 0, 0.40)",
                                        width: large680 ? "102px" : "58px",
                                        height: large680 ? "60px" : "35px",
                                        borderRadius: large680
                                            ? "24px 0px 0px 24px"
                                            : "16px 0 0  16px",
                                        fontWeight: "bold",
                                        fontSize: large680 ? "16px" : "10px",
                                        color: "#FDDC2D",
                                    }}
                                    justify={"center"}
                                    align={"center"}
                                >
                                    <Box>In Game</Box>
                                </Flex>
                            )}
                            <Text
                                sx={{
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    position: "absolute",
                                    left: "50%",
                                    top: "35px",
                                    transform: "translateX(-50%)",
                                    fontFamily: "Quantico",
                                }}
                            >
                                #{item.tokenId}
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
                                <Text
                                    sx={{
                                        color: "#FFF",
                                        textAlign: "center",
                                        fontFamily: "Quantico",
                                        fontSize: "14px",
                                    }}
                                >
                                    {item.points}xp
                                </Text>
                                <Box
                                    sx={{
                                        width: large680 ? "176px" : "100px",
                                        height: "10px",
                                        padding: "2px",
                                        border: "1px solid #FFF",
                                        borderRadius: "5px",
                                        marginTop: "4px",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            background: "#F2D861",
                                            height: "100%",
                                            width: `${
                                                ((item.points -
                                                    item.prePoints) /
                                                    (item.nextPoints -
                                                        item.prePoints)) *
                                                100
                                            }%`,
                                            borderRadius: "5px",
                                        }}
                                    ></Box>
                                </Box>
                                <Text
                                    sx={{
                                        color: "#CCC",
                                        textAlign: "center",
                                        fontFamily: "Quantico",
                                        marginTop: "6px",
                                        fontSize: "12px",
                                    }}
                                >
                                    NextLvl: {item.nextPoints}pt
                                </Text>
                            </Box>
                            <Image
                                src={item.img}
                                sx={{
                                    width: "80%",
                                    position: "absolute",
                                    left: "50%",
                                    top: "50%",
                                    transform: "translate(-50%, -50%)",
                                }}
                            ></Image>{" "}
                        </Box>

                        <Box
                            sx={{
                                background: "#2D240C",
                                padding: large680 ? "24px 12px" : "4px 4px",
                            }}
                        >
                            <Flex
                                sx={{
                                    fontSize: large680 ? "14px" : "12px",
                                }}
                                align={"center"}
                            >
                                <Text
                                    sx={{
                                        marginRight: "6px",
                                    }}
                                >
                                    Highest Bid Price
                                </Text>
                                {showMyBid && (
                                    <Text
                                        sx={{
                                            color: "#7CFD2D",
                                            textAlign: "center",
                                            fontFamily: "Quantico",
                                            fontSize: large680
                                                ? "12px"
                                                : "10px",
                                            fontStyle: "normal",
                                            fontWeight: 700,
                                        }}
                                    >
                                        My Bid
                                    </Text>
                                )}
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
                                        fontSize: large680 ? "30px" : "16px",
                                    }}
                                >
                                    {havePrice ? formatAmount(price) : "--"} ETH
                                </Text>
                            </Flex>
                        </Box>

                        <Flex
                            onClick={() => {
                                if (!canSell) return;
                                handleSell(item.tokenId);
                            }}
                            align={"center"}
                            justify={"center"}
                            sx={{
                                height: large680 ? "50px" : "28px",
                                background: canSell ? "#F2D861" : "#1e1e1e",
                                fontSize: large680 ? "18px" : "14px",
                                color: canSell ? "#1b1b1b" : "#7a7a7a",
                                fontFamily: "Orbitron",
                                fontWeight: "bold",
                                border: canSell
                                    ? "1px solid #F2D861"
                                    : "1px solid #1e1e1e",
                                borderRadius: "0 0 14px 14px",
                                position: "relative",
                                cursor: canSell ? "pointer" : "not-allowed",
                            }}
                        >
                            Sell
                        </Flex>
                    </Box>
                );
            })}
        </Flex>
    );
};

export default My;
