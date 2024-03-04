import { Box, Flex, Image, Input, Text } from "@chakra-ui/react";
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
import { accMul } from "@/utils/formatBalance";

const ConnectWalletBt = () => {
    const toast = useSkyToast();

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
                width: "300px",
                height: "68px",
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
                    fontSize: "34px",
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
    return (
        <Flex
            onClick={onBuy}
            align={"center"}
            justify={"center"}
            sx={{
                width: "300px",
                height: "68px",
                filter: "drop-shadow(0px 0px 17px rgba(255, 235, 59, 0.38))",
                border: "4px solid #ffecc7",
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
                        fontSize: "30px",
                        marginRight: "3px",
                    }}
                >
                    {accMul("0.01", inputAmount.toString())}
                </Text>
                <Image src={YETHIcon}></Image>
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
                        width: "24px",
                        marginRight: "8px",
                    }}
                ></Image>
                <Text
                    sx={{
                        fontFamily: "Neon",
                        fontSize: "34px",
                    }}
                >
                    BUY
                </Text>
                <Box
                    sx={{
                        width: "2px",
                        height: "40px",
                        background: "#1b1b1b",
                        margin: "0 40px",
                    }}
                ></Box>
                <Text
                    sx={{
                        fontSize: "30px",
                        marginRight: "3px",
                    }}
                >
                    {accMul("0.01", inputAmount.toString())}
                </Text>
                <Image src={BETHIcon}></Image>
            </Flex>
        </Flex>
    );
};

const BuyPaper = () => {
    const { isUserInfoOpen, onUserInfoOpen, onUserInfoClose } =
        useUserInfoRequest();

    const { ready, authenticated, login } = usePrivy();
    const { signer, address } = usePrivyAccounts();
    const [inputAmount, setInputAmount] = React.useState(0);

    const handleBuy = async () => {};

    return (
        <Box
            sx={{
                marginTop: "20px",
                fontFamily: "Quantico",
            }}
        >
            <Flex align={"center"}>
                <Image
                    src={PaperIcon}
                    sx={{
                        width: "154px",
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
                        width: "88px",
                    }}
                ></Image>
            </Flex>
            <Flex
                justify={"space-between"}
                sx={{
                    width: "260px",
                    borderRadius: "30px",
                    background: "rgba(0, 0, 0, 0.60)",
                    padding: "4px",
                    margin: "0 auto",
                }}
            >
                <Flex
                    sx={{
                        width: "50px",
                        height: "50px",
                        background: "#777",
                        borderRadius: "50%",
                        color: "#1B1B1B",
                        fontSize: "60px",
                    }}
                    justify={"center"}
                    align={"center"}
                >
                    <Image
                        src={SubIcon}
                        onClick={() => {
                            if (inputAmount > 0) {
                                setInputAmount(inputAmount - 1);
                            }
                        }}
                    ></Image>
                </Flex>
                <Input
                    variant={"unstyled"}
                    sx={{
                        flex: 1,
                        textAlign: "center",
                        color: "#999",
                        fontSize: "30px",
                    }}
                    value={inputAmount}
                    onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        setInputAmount(Number(value));
                    }}
                ></Input>
                <Flex
                    sx={{
                        width: "50px",
                        height: "50px",
                        background: "#777",
                        borderRadius: "50%",
                        color: "#1B1B1B",
                        fontSize: "60px",
                    }}
                    justify={"center"}
                    align={"center"}
                >
                    <Image
                        src={AddIcon}
                        onClick={() => {
                            setInputAmount(inputAmount + 1);
                        }}
                    ></Image>
                </Flex>
            </Flex>
            {address ? (
                <BuyBt onBuy={handleBuy} inputAmount={inputAmount}></BuyBt>
            ) : (
                <ConnectWalletBt></ConnectWalletBt>
            )}
        </Box>
    );
};

export default BuyPaper;
