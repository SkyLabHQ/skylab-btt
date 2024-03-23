import React from "react";
import Buycon from "./assets/buy.png";
import PlanetIcon from "./assets/planet.png";
import SubIcon from "./assets/sub.svg";
import AddIcon from "./assets/add.svg";
import BETHIcon from "./assets/b-ETH.png";
import BuyIcon from "./assets/buy-icon.svg";
import YETHIcon from "./assets/y-ETH.png";

import {
    Box,
    Image,
    Flex,
    Text,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    useDisclosure,
    Input,
    useMediaQuery,
} from "@chakra-ui/react";
import { accMul, parseAmount } from "@/utils/formatBalance";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import { useMercuryJarTournamentContract } from "@/hooks/useContract";
import { usePublicClient } from "wagmi";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import WalletIcon from "./assets/wallet-icon.svg";
import { usePrivy } from "@privy-io/react-auth";

const ConnectWalletBt = () => {
    const toast = useSkyToast();
    const { ready, login, connectWallet, user } = usePrivy();
    const handleLogin = () => {
        if (!ready) {
            toast("Please wait for the wallet to be ready");
            return;
        }

        if (user && user.wallet.walletClientType !== "privy") {
            connectWallet();
            return;
        }
        login();
    };
    return (
        <Flex
            onClick={handleLogin}
            sx={{
                width: "100%",
                height: "100%",
                borderRadius: "12px",
                background: "#f2d861",
                cursor: "pointer",
            }}
            align={"center"}
            justify={"center"}
        >
            <Image
                src={WalletIcon}
                sx={{
                    width: "16px",
                    marginRight: "5px",
                }}
            ></Image>
            <Text
                sx={{
                    color: "#000",
                    fontSize: "16px",
                }}
            >
                Connect Wallet
            </Text>
        </Flex>
    );
};

const BuyButton = ({
    inputAmount,
    onBuy,
}: {
    inputAmount: number;
    onBuy: () => void;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Flex
            onClick={onBuy}
            sx={{
                width: "100%",
                height: "100%",
                borderRadius: "12px",
                background: "#f2d861",
                fontSize: isPc ? "16px" : "12px",
                padding: "0 12px",
                color: "#000",
                cursor: "pointer",

                "&:hover .unHover": {
                    display: "none",
                },
                "&:hover .activeHover": {
                    display: "flex",
                },
            }}
            align={"center"}
        >
            <Flex
                className="unHover"
                align={"center"}
                justify={"center"}
                sx={{
                    width: "100%",
                }}
            >
                <Text
                    sx={{
                        fontSize: isPc ? "18px" : "12px",
                        marginRight: "3px",
                        textAlign: "center",
                    }}
                >
                    {accMul("0.02", inputAmount.toString())} ETH
                </Text>
            </Flex>
            <Flex
                className="activeHover"
                align={"center"}
                justify={"center"}
                sx={{
                    width: "100%",
                    display: "none",
                }}
            >
                <Flex>
                    <Image
                        src={BuyIcon}
                        sx={{
                            width: "12px",
                            marginRight: "5px",
                        }}
                    ></Image>
                    <Text
                        sx={{
                            fontFamily: "Quantico",
                        }}
                    >
                        BUY
                    </Text>
                </Flex>

                <Box
                    sx={{
                        width: "1px",
                        height: "16px",
                        background: "#1b1b1b",
                        margin: "0 10px",
                    }}
                ></Box>
                <Text
                    sx={{
                        marginRight: "3px",
                    }}
                >
                    {accMul("0.02", inputAmount.toString())} ETH
                </Text>
            </Flex>
        </Flex>
    );
};

const BuyBt = () => {
    const { address } = usePrivyAccounts();
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const toast = useSkyToast();
    const publicClient = usePublicClient();
    const { onOpen, onClose, isOpen } = useDisclosure();
    const [inputAmount, setInputAmount] = React.useState(1);
    const mercuryJarTournamentContract = useMercuryJarTournamentContract();

    const handleMintPlane = async () => {
        try {
            const hash = await mercuryJarTournamentContract.write.mint(
                [inputAmount],
                {
                    value: parseAmount(accMul("0.02", inputAmount.toString())),
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
        } catch (e) {
            console.log(e, "e");
            toast(handleError(e));
        }
    };
    return (
        <Box
            sx={{
                zIndex: 999,
            }}
        >
            <Popover
                gutter={38}
                arrowSize={20}
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
            >
                <PopoverTrigger>
                    <Image
                        tabIndex={0}
                        role="button"
                        src={Buycon}
                        sx={{
                            width: isPc ? "313px" : "110px",
                            position: "absolute",
                            left: "0",
                            bottom: "0",
                        }}
                    ></Image>
                </PopoverTrigger>
                <PopoverContent
                    width={isPc ? "240px" : "200px"}
                    sx={{
                        border: "2px solid #F2D861",
                        borderRadius: "10px",
                        background: "rgb(61,61,61)",
                    }}
                >
                    <PopoverBody sx={{}}>
                        <Flex flexDir={"column"} align={"center"}>
                            <Image
                                src={PlanetIcon}
                                sx={{
                                    width: isPc ? "90px" : "60px",
                                    height: isPc ? "90px" : "60px",
                                }}
                            ></Image>
                            <Flex
                                justify={"space-between"}
                                sx={{
                                    width: isPc ? "170px" : "120px",
                                    borderRadius: isPc ? "30px" : "20px",
                                    background: "rgba(0, 0, 0, 0.60)",
                                    padding: "2px",
                                    margin: "0 auto",
                                    height: isPc ? "38px" : "30px",
                                    marginTop: "9px",
                                    border: "1px solid #F2D861",
                                }}
                            >
                                <Flex
                                    sx={{
                                        width: isPc ? "32px" : "24px",
                                        height: isPc ? "32px" : "24px",
                                        background:
                                            inputAmount > 1
                                                ? "#F2D861"
                                                : "#777",
                                        borderRadius: "50%",
                                        color: "#1B1B1B",
                                    }}
                                    justify={"center"}
                                    align={"center"}
                                    onClick={() => {
                                        if (inputAmount > 1) {
                                            setInputAmount(inputAmount - 1);
                                        }
                                    }}
                                >
                                    <Image
                                        src={SubIcon}
                                        sx={{
                                            width: "16px",
                                        }}
                                    ></Image>
                                </Flex>
                                <Input
                                    variant={"unstyled"}
                                    sx={{
                                        flex: 1,
                                        textAlign: "center",
                                        color: "#fff",
                                        fontSize: isPc ? "20px" : "16px",
                                    }}
                                    value={inputAmount}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(
                                            /[^0-9]/g,
                                            "",
                                        );
                                        setInputAmount(Number(value));
                                    }}
                                ></Input>
                                <Flex
                                    sx={{
                                        width: isPc ? "32px" : "24px",
                                        height: isPc ? "32px" : "24px",
                                        background: "#F2D861",
                                        borderRadius: "50%",
                                        color: "#1B1B1B",
                                    }}
                                    justify={"center"}
                                    align={"center"}
                                    onClick={() => {
                                        setInputAmount(inputAmount + 1);
                                    }}
                                >
                                    <Image
                                        src={AddIcon}
                                        sx={{
                                            width: "16px",
                                        }}
                                    ></Image>
                                </Flex>
                            </Flex>
                            <Box
                                sx={{
                                    width: isPc ? "180px" : "120px",
                                    height: isPc ? "40px" : "30px",
                                    margin: "8px 0 24px",
                                }}
                            >
                                {address ? (
                                    <BuyButton
                                        onBuy={handleMintPlane}
                                        inputAmount={inputAmount}
                                    ></BuyButton>
                                ) : (
                                    <ConnectWalletBt></ConnectWalletBt>
                                )}
                            </Box>
                        </Flex>
                    </PopoverBody>
                    <Box
                        sx={{
                            height: "0",
                            width: "0",
                            borderTop: "12px solid #F2D861",
                            borderRight: "12px solid transparent",
                            borderBottom: "12px solid transparent",
                            borderLeft: "12px solid transparent",
                            position: "absolute",
                            left: "18px",
                            bottom: "-24px",
                        }}
                    ></Box>
                    <Box
                        sx={{
                            height: "0",
                            width: "0",
                            borderTop: "10px solid rgb(61,61,61)",
                            borderRight: "10px solid transparent",
                            borderBottom: "10px solid transparent",
                            borderLeft: "10px solid transparent",
                            position: "absolute",
                            left: "20px",
                            bottom: "-20px",
                        }}
                    ></Box>
                </PopoverContent>
            </Popover>
        </Box>
    );
};

export default BuyBt;
