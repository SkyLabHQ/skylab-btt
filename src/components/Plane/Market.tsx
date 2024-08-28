import { aviationImg } from "@/utils/aviationImg";
import { Box, Image, Flex, Text, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Bg from "./assets/card-bg.png";
import {
    useMultiMarketPlaceContract,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { useChainId, usePublicClient } from "wagmi";
import {
    useMarketPlaceContract,
    useMercuryJarTournamentContract,
} from "@/hooks/useContract";
import ConfirmIcon from "./assets/confirm.svg";
import CancelIcon from "./assets/cancel.svg";
import { formatAmount, parseAmount } from "@/utils/formatBalance";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import DeleteIcon from "./assets/delete.svg";
import { useUserInfo } from "@/contexts/UserInfo";
import ETHIcon from "./assets/eth.svg";
import A1Icon from "./assets/a1.svg";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";

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

    const mercuryJarTournamentContract = useMercuryJarTournamentContract();
    const { address, handleGetUserPlane } = useUserInfo();
    const chainId = useChainId();
    const multiProvider = useMultiProvider(chainId);
    const multiMarketPlaceContract = useMultiMarketPlaceContract();
    const marketPlaceContract = useMarketPlaceContract();
    const [large680] = useSkyMediaQuery("(min-width: 680px)");
    const [highList, sethighList] = useState(new Array(16).fill("0"));
    const [myPrice, setMyPrice] = useState(new Array(16).fill("0"));
    const getMarketPlaceList = async () => {
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

    const getMyPrice = async () => {
        const p = [];
        for (let i = 1; i <= 16; i++) {
            p.push(multiMarketPlaceContract.getBidInfo(address, i));
        }
        const list = await multiProvider.all(p);
        setMyPrice(
            list.map((item) => {
                return item.price.toString();
            }),
        );
    };

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

    const handleConfirm = async (
        index: number,
        level: number,
        isAdd: boolean,
    ) => {
        if (!address) {
            toast("Please connect wallet");
            return;
        }

        try {
            const method = isAdd ? "reBid" : "bid";
            await marketPlaceContract.simulate[method]([level], {
                value: parseAmount(inputAmount[index]),
                account: address,
            });
            const hash = await marketPlaceContract.write[method]([level], {
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

    const handleCancelBid = async (level: number) => {
        if (!address) {
            return;
        }

        try {
            const hash = await marketPlaceContract.write.cancelBid([level]);

            // @ts-ignore
            const receipt = await publicClient.waitForTransactionReceipt({
                hash,
            });

            getMarketPlaceList();
            getMyPrice();
        } catch (e) {
            toast(handleError(e));
        }
    };

    const handleMintPlane = async () => {
        if (!address) {
            toast("Please connect wallet");
            return;
        }
        try {
            // await mercuryJarTournamentContract.simulate.mint([1], {
            //     value: parseAmount("0.02"),
            //     account: address,
            // });
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
                            : "calc(100% + 43px)",
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        background: "rgba(4, 4, 4, 0.80)",
                        position: "relative",
                    }}
                >
                    <Flex
                        flexDir={"column"}
                        align={"center"}
                        sx={{
                            width: "100%",
                            position: "absolute",
                            top: "30%",
                            left: "0",
                            fontFamily: "Orbitron",
                        }}
                    >
                        <Box
                            sx={{
                                textAlign: "center",
                                fontSize: large680 ? "24px" : "14px",
                                fontWeight: 700,
                            }}
                        >
                            Buy Plane
                        </Box>
                        <Image
                            src={A1Icon}
                            sx={{
                                width: "80%",
                            }}
                        ></Image>
                        <Text
                            sx={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                marginTop: "-10px",
                            }}
                        >
                            Lvl.{" "}
                            <span
                                style={{
                                    fontSize: "24px",
                                }}
                            >
                                1
                            </span>{" "}
                        </Text>
                    </Flex>
                </Box>

                <Flex
                    align={"center"}
                    justify={"center"}
                    sx={{
                        height: large680 ? "50px" : "28px",
                        background: "#F2D861",
                        fontSize: large680 ? "18px" : "14px",
                        color: "#1b1b1b",
                        fontWeight: "bold",
                        cursor: "pointer",
                        zIndex: 999,
                        position: "absolute",
                        bottom: "0",
                        left: "0",
                        width: "100%",
                    }}
                    onClick={handleMintPlane}
                >
                    <Text
                        sx={{
                            marginRight: "20px",
                            fontFamily: "Orbitron",
                        }}
                    >
                        Mint
                    </Text>
                    <Flex
                        align={"center"}
                        sx={{
                            gap: "5px",
                        }}
                    >
                        <Image
                            src={ETHIcon}
                            sx={{
                                width: "14px",
                            }}
                        ></Image>
                        <Text> 0.01</Text>
                        <Text> ETH</Text>
                    </Flex>
                </Flex>
            </Box>
            {planeList.map((item, index) => {
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
                        <Flex
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

                            <Image
                                src={item.img}
                                sx={{
                                    width: "80%",
                                    position: "absolute",
                                    left: "50%",
                                    top: "50%",
                                    transform: "translate(-50%, -50%)",
                                }}
                            ></Image>
                        </Flex>
                        <Box
                            sx={{
                                background: "#2D240C",
                                padding: large680 ? "24px 12px" : "4px 4px",
                            }}
                        >
                            <Flex
                                justify={"space-between"}
                                sx={{
                                    fontSize: large680 ? "14px" : "10px",
                                    fontFamily: "Orbitron",
                                }}
                            >
                                <Text>Highest Bid Price</Text>
                                <Text>My Price</Text>
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
                                    {highList[index].price === "0"
                                        ? "--"
                                        : formatAmount(
                                              highList[index].price,
                                          )}{" "}
                                    ETH
                                </Text>
                                <Flex>
                                    {myPrice[index] !== "0" && (
                                        <Image
                                            onClick={() => {
                                                handleCancelBid(item.level);
                                            }}
                                            src={DeleteIcon}
                                            sx={{
                                                width: large680
                                                    ? "16px"
                                                    : "12px",
                                                marginRight: "4px",
                                                cursor: "pointer",
                                            }}
                                        ></Image>
                                    )}
                                    <Text
                                        sx={{
                                            fontSize: large680
                                                ? "24px"
                                                : "14px",
                                        }}
                                    >
                                        {myPrice[index] === "0"
                                            ? "--"
                                            : formatAmount(myPrice[index])}{" "}
                                        ETH
                                    </Text>
                                </Flex>
                            </Flex>
                        </Box>

                        {inputMode[index] && (
                            <Flex>
                                <Flex
                                    justify={"center"}
                                    align={"center"}
                                    sx={{
                                        width: large680 ? "56px" : "32px",
                                        background: "#D9D9D9",
                                        height: large680 ? "50px" : "28px",
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
                                        height: large680 ? "50px" : "28px",
                                        width: "2px",
                                        background: "#2D240C",
                                    }}
                                ></Box>
                                <Flex
                                    justify={"center"}
                                    align={"center"}
                                    sx={{
                                        width: large680 ? "56px" : "32px",
                                        background: "#F2D861",
                                        height: large680 ? "50px" : "28px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        handleConfirm(
                                            index,
                                            item.level,
                                            myPrice[index] !== "0",
                                        );
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
                                        height: large680 ? "50px" : "28px",
                                        width: "2px",
                                        background: "#2D240C",
                                    }}
                                ></Box>
                                <Flex
                                    align={"center"}
                                    justify={"center"}
                                    sx={{
                                        height: large680 ? "50px" : "28px",
                                        background: "#2D240C",
                                        fontSize: large680 ? "18px" : "14px",
                                        fontFamily: "Orbitron",
                                        fontWeight: "bold",
                                        border: "1px solid #F2D861",
                                        borderRadius: "0 0 18px 0px",
                                        position: "relative",
                                        flex: 1,
                                        padding: large680 ? "10px" : "2px",
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
                                            padding: large680
                                                ? "0 8px 0 16px"
                                                : "0 4px 0 8px",
                                            fontSize: large680
                                                ? "20px"
                                                : "12px",
                                        }}
                                    >
                                        <Input
                                            variant={"unstyled"}
                                            value={inputAmount[index]}
                                            sx={{}}
                                            onChange={(e) => {
                                                let value = e.target.value;
                                                const regex = /^\d*\.?\d+$/;
                                                const isValid =
                                                    regex.test(value);
                                                if (!isValid) {
                                                    const formattedInput =
                                                        value.replace(
                                                            /[^0-9.]/g,
                                                            "",
                                                        );
                                                    value = formattedInput;
                                                }

                                                const _inputAmount = [
                                                    ...inputAmount,
                                                ];
                                                _inputAmount[index] = value;
                                                setInputAmount(_inputAmount);
                                            }}
                                        ></Input>
                                        <Text sx={{}}>ETH</Text>
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
                                            height: large680 ? "50px" : "28px",
                                            background: "#2D240C",
                                            fontSize: large680
                                                ? "18px"
                                                : "14px",
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
                                            height: large680 ? "50px" : "28px",
                                            background: "#F2D861",
                                            fontSize: large680
                                                ? "18px"
                                                : "14px",
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
        </Flex>
    );
};

export default Market;
