import { Box, Flex, Image, Input, Text, useMediaQuery } from "@chakra-ui/react";
import PaperIcon from "./assets/paper.png";
import RightArrowIcon from "./assets/right-arrow.svg";
import PlanetIcon from "./assets/planet.png";
import SubIcon from "./assets/sub.svg";
import AddIcon from "./assets/add.svg";
import WalletIcon from "./assets/wallet.svg";
import React from "react";
import useSkyToast from "@/hooks/useSkyToast";
import { useUserInfoRequest } from "@/contexts/UserInfo";
import { usePrivy } from "@privy-io/react-auth";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import BuyIcon from "./assets/buy-icon.svg";
import { ReactComponent as ETHIcon } from "@/assets/ETH.svg";
import YETHIcon from "./assets/y-ETH.png";
import BETHIcon from "./assets/b-ETH.png";
import { accMul, parseAmount } from "@/utils/formatBalance";
import { useMercuryJarTournamentContract } from "@/hooks/useContract";
import { useChainId, usePublicClient } from "wagmi";
import { handleError } from "@/utils/error";

const ConnectWalletBt = () => {
    const toast = useSkyToast();
    const [isPc] = useMediaQuery("(min-width: 800px)");

    const { ready, login } = usePrivy();
    const handleLogin = () => {
        if (!ready) {
            toast("Please wait for the wallet to be ready");
            return;
        }

        login();
    };
    return (
        <Flex
            align={"center"}
            justify={"center"}
            sx={{
                width: isPc ? "300px" : "182px",
                height: isPc ? "68px" : "40px",
                filter: "drop-shadow(0px 0px 17px rgba(255, 235, 59, 0.38))",
                border: "4px solid #ffecc7",
                borderRadius: "16px",
                marginTop: "20px",
            }}
            onClick={handleLogin}
        >
            <Image
                src={WalletIcon}
                sx={{
                    width: "24px",
                    marginRight: "7px",
                }}
            ></Image>
            <Text
                sx={{
                    fontFamily: "Neon",
                    fontSize: isPc ? "34px" : "18px",
                    color: "#FFECC7",
                }}
            >
                Connect Wallet
            </Text>
        </Flex>
    );
};

const BuyBt = ({
    onBuy,
    inputAmount,
}: {
    onBuy: () => void;
    inputAmount: number;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Flex
            onClick={onBuy}
            align={"center"}
            justify={"center"}
            sx={{
                width: isPc ? "300px" : "182px",
                height: isPc ? "68px" : "40px",
                filter: "drop-shadow(0px 0px 17px rgba(255, 235, 59, 0.38))",
                border: isPc ? "4px solid #ffecc7" : "2px solid #ffecc7",
                borderRadius: "16px",
                marginTop: "20px",
                color: "#FFECC7",
                fontFamily: "Neon",

                "&:hover": {
                    background: "#ffecc7",
                    filter: "drop-shadow(0px 0px 17px rgba(255, 246, 166, 0.84))",
                },

                "&:hover .unHover": {
                    display: "none",
                },
                "&:hover .activeHover": {
                    display: "flex",
                },
            }}
        >
            <Flex className="unHover" align={"center"}>
                <Text
                    sx={{
                        fontSize: isPc ? "30px" : "18px",
                        marginRight: "3px",
                    }}
                >
                    {accMul("0.01", inputAmount.toString())}
                </Text>
                <Image
                    src={YETHIcon}
                    sx={{
                        width: isPc ? "13px" : "12px",
                    }}
                ></Image>
            </Flex>

            <Flex
                align={"center"}
                className="activeHover"
                sx={{
                    color: "#1B1B1B",
                    display: "none",
                }}
            >
                <Image
                    src={BuyIcon}
                    sx={{
                        width: isPc ? "24px" : "12px",
                        marginRight: "8px",
                    }}
                ></Image>
                <Text
                    sx={{
                        fontFamily: "Neon",
                        fontSize: isPc ? "34px" : "18px",
                    }}
                >
                    BUY
                </Text>
                <Box
                    sx={{
                        width: isPc ? "2px" : "1px",
                        height: isPc ? "40px" : "24px",
                        background: "#1b1b1b",
                        margin: isPc ? "0 40px" : "0 20px",
                    }}
                ></Box>
                <Text
                    sx={{
                        fontSize: isPc ? "30px" : "16px",
                        marginRight: "3px",
                    }}
                >
                    {accMul("0.01", inputAmount.toString())}
                </Text>
                <Image
                    src={BETHIcon}
                    sx={{
                        width: isPc ? "13px" : "12px",
                    }}
                ></Image>
            </Flex>
        </Flex>
    );
};

const BuyPaper = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const chainId = useChainId();
    const publicClient = usePublicClient();
    const mercuryJarTournamentContract = useMercuryJarTournamentContract();
    const toast = useSkyToast();
    const { signer, address } = usePrivyAccounts();
    const [inputAmount, setInputAmount] = React.useState(1);

    const handleBuy = async () => {
        try {
            const hash = await mercuryJarTournamentContract.write.mintPaper(
                [inputAmount],
                {
                    value: parseAmount(accMul(String(inputAmount), "0.01")),
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
            setInputAmount(0);
        } catch (e) {
            toast(handleError(e));
        }
    };

    return (
        <Flex
            sx={{
                marginTop: "20px",
                fontFamily: "Quantico",
            }}
            flexDir={"column"}
            align={"center"}
        >
            <Flex align={"center"}>
                <Image
                    src={PaperIcon}
                    sx={{
                        width: isPc ? "154px" : "78px",
                    }}
                ></Image>
                <Image
                    src={RightArrowIcon}
                    sx={{
                        width: "38px",
                        margin: "0 6px",
                    }}
                ></Image>
                <Image
                    src={PlanetIcon}
                    sx={{
                        width: isPc ? "88px" : "44px",
                    }}
                ></Image>
            </Flex>
            <Flex
                justify={"space-between"}
                sx={{
                    width: isPc ? "260px" : "130px",
                    borderRadius: "30px",
                    background: "rgba(0, 0, 0, 0.60)",
                    padding: "4px",
                    margin: "0 auto",
                }}
            >
                <Flex
                    sx={{
                        width: isPc ? "50px" : "30px",
                        height: isPc ? "50px" : "30px",
                        background: inputAmount > 1 ? "#F2D861" : "#777",
                        borderRadius: "50%",
                        color: "#1B1B1B",
                        fontSize: "60px",
                    }}
                    justify={"center"}
                    align={"center"}
                    onClick={() => {
                        if (inputAmount > 1) {
                            setInputAmount(inputAmount - 1);
                        }
                    }}
                >
                    <Image src={SubIcon}></Image>
                </Flex>
                <Input
                    variant={"unstyled"}
                    sx={{
                        flex: 1,
                        textAlign: "center",
                        color: "#999",
                        fontSize: isPc ? "30px" : "16px",
                    }}
                    value={inputAmount}
                    onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        setInputAmount(Number(value));
                    }}
                ></Input>
                <Flex
                    sx={{
                        width: isPc ? "50px" : "30px",
                        height: isPc ? "50px" : "30px",
                        background: "#F2D861",
                        borderRadius: "50%",
                        color: "#1B1B1B",
                        fontSize: "60px",
                    }}
                    justify={"center"}
                    align={"center"}
                    onClick={() => {
                        setInputAmount(inputAmount + 1);
                    }}
                >
                    <Image src={AddIcon}></Image>
                </Flex>
            </Flex>
            {address ? (
                <BuyBt onBuy={handleBuy} inputAmount={inputAmount}></BuyBt>
            ) : (
                <ConnectWalletBt></ConnectWalletBt>
            )}
        </Flex>
    );
};

export default BuyPaper;
