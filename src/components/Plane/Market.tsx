import { aviationImg } from "@/utils/aviationImg";
import { Box, Image, Flex, Text, useMediaQuery, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Bg from "./assets/card-bg.png";
import {
    useMultiMarketPlaceContract,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { useChainId, usePublicClient } from "wagmi";
import { useMarketPlaceContract } from "@/hooks/useContract";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import ConfirmIcon from "./assets/confirm.svg";
import CancelIcon from "./assets/cancel.svg";
import { parseAmount } from "@/utils/formatBalance";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";

const planeList = new Array(16).fill("").map((_, index) => {
    return { img: aviationImg(index + 1), level: index + 1 };
});

const Market = () => {
    const publicClient = usePublicClient();
    const toast = useSkyToast();
    const [inputMode, setInputMode] = useState(new Array(16).fill(false));
    const [inputAmount, setInputAmount] = useState(
        new Array(16).fill("0") as string[],
    );
    const { address } = usePrivyAccounts();
    const chainId = useChainId();
    const multiProvider = useMultiProvider(chainId);
    const multiMarketPlaceContract = useMultiMarketPlaceContract();
    const marketPlaceContract = useMarketPlaceContract();
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [highList, sethighList] = useState(new Array(16).fill("0"));

    const [myPrice, setMyPrice] = useState(new Array(16).fill("0"));

    const getMarketPlaceList = async () => {
        const p = [];
        for (let i = 1; i <= 16; i++) {
            p.push(multiMarketPlaceContract.levelInfos(i));
        }
        const list = await multiProvider.all(p);
        sethighList(
            list.map((item) => {
                return item.toString();
            }),
        );
    };

    const getMyPrice = async () => {
        const p = [];
        for (let i = 1; i <= 16; i++) {
            p.push(multiMarketPlaceContract.userBids(address, i));
        }
        const list = await multiProvider.all(p);
        setMyPrice(
            list.map((item) => {
                return item.toString();
            }),
        );
    };

    console.log(highList, myPrice, ",mmm");
    const handleBid = (index: number) => {
        const _inputMode = [...inputMode];
        _inputMode[index] = true;
        setInputMode(_inputMode);
    };

    const handleCancel = (index: number) => {
        const _inputMode = [...inputMode];
        _inputMode[index] = false;
        setInputMode(_inputMode);
    };

    const handleConfirm = async (index: number, level: number) => {
        if (!address) {
            return;
        }

        try {
            const hash = await marketPlaceContract.write.bid([level], {
                value: parseAmount(inputAmount[index]),
            });

            // @ts-ignore
            const receipt = await publicClient.waitForTransactionReceipt({
                hash,
            });

            const _inputMode = [...inputMode];
            _inputMode[index] = false;

            const _inputAmount = [...inputAmount];
            _inputAmount[index] = "0";
            setInputMode(_inputMode);
            getMarketPlaceList();
            getMyPrice();
        } catch (e) {
            toast(handleError(e));
        }
    };

    useEffect(() => {
        if (!multiMarketPlaceContract || !multiProvider || !marketPlaceContract)
            return;

        getMarketPlaceList();
    }, [multiMarketPlaceContract, multiProvider, marketPlaceContract]);

    useEffect(() => {
        if (
            !multiMarketPlaceContract ||
            !multiProvider ||
            !marketPlaceContract ||
            !address
        )
            return;

        getMyPrice();
    }, [multiMarketPlaceContract, multiProvider, marketPlaceContract, address]);

    return (
        <Box
            sx={{
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: isPc
                    ? "repeat(auto-fill, 320px)"
                    : "repeat(auto-fill, 170px)",
                gap: isPc ? "24px" : "10px",
                maxWidth: "1700px",
                justifyContent: "center",
            }}
        >
            {planeList.map((item, index) => {
                return (
                    <Box
                        key={index}
                        sx={{
                            borderRadius: "20px",
                            border: "4px solid #1B1B1B",
                            overflow: "hidden",
                            width: isPc ? "320px" : "170px",
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
                                    width: isPc ? "102px" : "58px",
                                    height: isPc ? "60px" : "35px",
                                    borderRadius: isPc
                                        ? "0px 24px 24px 0"
                                        : "0px 16px 16px 0",
                                    fontWeight: "bold",
                                    fontSize: isPc ? "24px" : "14px",
                                }}
                                justify={"center"}
                                align={"center"}
                            >
                                <Box>
                                    Lvl.{" "}
                                    <span
                                        style={{
                                            fontSize: isPc ? "32px" : "18px",
                                        }}
                                    >
                                        {item.level}
                                    </span>
                                </Box>
                            </Flex>
                            <Image src={item.img}></Image>
                        </Box>
                        <Box
                            sx={{
                                background: "#2D240C",
                                padding: isPc ? "24px 12px" : "12px 4px",
                            }}
                        >
                            <Flex
                                justify={"space-between"}
                                sx={{
                                    fontSize: isPc ? "14px" : "12px",
                                }}
                            >
                                <Text>Hignest Price</Text>
                                <Text>My Price</Text>
                            </Flex>
                            <Flex
                                justify={"space-between"}
                                align={"flex-end"}
                                sx={{
                                    fontWeight: "bold",
                                    marginTop: isPc ? "4px" : "2px",
                                    verticalAlign: "bottom",
                                    lineHeight: "1",
                                    fontFamily: "DIN-Black",
                                }}
                            >
                                <Text
                                    sx={{
                                        fontSize: isPc ? "30px" : "18px",
                                    }}
                                >
                                    {highList[index] === "0"
                                        ? "--"
                                        : highList[index]}{" "}
                                    ETH
                                </Text>
                                <Text
                                    sx={{
                                        fontSize: isPc ? "24px" : "14px",
                                    }}
                                >
                                    {myPrice[index] === "0"
                                        ? "--"
                                        : myPrice[index]}{" "}
                                    ETH
                                </Text>
                            </Flex>
                        </Box>

                        {inputMode[index] && (
                            <Flex>
                                <Flex
                                    justify={"center"}
                                    align={"center"}
                                    sx={{
                                        width: "56px",
                                        background: "#D9D9D9",
                                        height: isPc ? "50px" : "28px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        handleCancel(index);
                                    }}
                                >
                                    <Image
                                        src={CancelIcon}
                                        sx={{
                                            width: "16px",
                                        }}
                                    ></Image>
                                </Flex>
                                <Box
                                    sx={{
                                        height: isPc ? "50px" : "28px",
                                        width: "2px",
                                        background: "#2D240C",
                                    }}
                                ></Box>
                                <Flex
                                    justify={"center"}
                                    align={"center"}
                                    sx={{
                                        width: "56px",
                                        background: "#F2D861",
                                        height: isPc ? "50px" : "28px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        handleConfirm(index, item.level);
                                    }}
                                >
                                    <Image
                                        src={ConfirmIcon}
                                        sx={{
                                            width: "20px",
                                        }}
                                    ></Image>
                                </Flex>
                                <Box
                                    sx={{
                                        height: isPc ? "50px" : "28px",
                                        width: "2px",
                                        background: "#2D240C",
                                    }}
                                ></Box>
                                <Flex
                                    align={"center"}
                                    justify={"center"}
                                    sx={{
                                        height: isPc ? "50px" : "28px",
                                        background: "#2D240C",
                                        fontSize: isPc ? "18px" : "14px",
                                        fontFamily: "Orbitron",
                                        fontWeight: "bold",
                                        border: "1px solid #F2D861",
                                        borderRadius: "0 0 18px 0px",
                                        position: "relative",
                                        flex: 1,
                                        padding: "10px",
                                        color: "#fff",
                                    }}
                                >
                                    <Flex
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            background: "#101010",
                                            borderRadius: "18px",
                                            fontFamily: "DIN-Black",
                                            padding: "0 8px 0 16px",
                                        }}
                                    >
                                        <Input
                                            variant={"unstyled"}
                                            value={inputAmount[index]}
                                            sx={{
                                                fontSize: "20px",
                                            }}
                                            onChange={(e) => {
                                                const _inputAmount = [
                                                    ...inputAmount,
                                                ];
                                                _inputAmount[index] =
                                                    e.target.value;
                                                setInputAmount(_inputAmount);
                                            }}
                                        ></Input>
                                        <Text
                                            sx={{
                                                fontSize: "20px",
                                            }}
                                        >
                                            ETH
                                        </Text>
                                    </Flex>
                                    <Box
                                        sx={{
                                            width: 0,
                                            height: 0,
                                            borderWidth: "0 10px 10px",
                                            borderStyle: "solid",
                                            borderColor:
                                                "transparent transparent #F2D861",
                                            position: "absolute",
                                            right: "10px",
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
                                </Flex>
                            </Flex>
                        )}
                        {!inputMode[index] && (
                            <Box>
                                {myPrice[index] !== "0" ? (
                                    <Flex
                                        onClick={() => handleBid(index)}
                                        align={"center"}
                                        justify={"center"}
                                        sx={{
                                            height: isPc ? "50px" : "28px",
                                            background: "#2D240C",
                                            fontSize: isPc ? "18px" : "14px",
                                            color: "#F2D861",
                                            fontFamily: "Orbitron",
                                            fontWeight: "bold",
                                            border: "1px solid #F2D861",
                                            borderRadius: "0 0 18px 18px",
                                            position: "relative",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Add
                                        <Box
                                            sx={{
                                                width: 0,
                                                height: 0,
                                                borderWidth: "0 10px 10px",
                                                borderStyle: "solid",
                                                borderColor:
                                                    "transparent transparent #F2D861",
                                                position: "absolute",
                                                right: "10px",
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
                                    </Flex>
                                ) : (
                                    <Flex
                                        align={"center"}
                                        justify={"center"}
                                        sx={{
                                            height: isPc ? "50px" : "28px",
                                            background: "#F2D861",
                                            fontSize: isPc ? "18px" : "14px",
                                            color: "#1b1b1b",
                                            fontFamily: "Orbitron",
                                            fontWeight: "bold",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => handleBid(index)}
                                    >
                                        Bid
                                    </Flex>
                                )}
                            </Box>
                        )}
                    </Box>
                );
            })}
        </Box>
    );
};

export default Market;