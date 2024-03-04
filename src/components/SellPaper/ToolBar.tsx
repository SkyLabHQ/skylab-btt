import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import TipIcon from "./assets/tip-icon.png";
import WalletIcon from "./assets/wallet-icon.png";
import { useUserInfoRequest } from "@/contexts/UserInfo";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import { usePrivy } from "@privy-io/react-auth";
import useSkyToast from "@/hooks/useSkyToast";
import { shortenAddress } from "@/utils";

const ToolBar = () => {
    const toast = useSkyToast();
    const { onUserInfoOpen } = useUserInfoRequest();
    const { ready, authenticated, login } = usePrivy();
    const { address } = usePrivyAccounts();

    const handleLogin = () => {
        if (!ready) {
            toast("Please wait for the wallet to be ready");
            return;
        }
        if (authenticated) {
            onUserInfoOpen();
            return;
        }
        login();
    };

    return (
        <Flex
            sx={{
                position: "absolute",
                top: "70px",
                right: "88px",
            }}
            align={"center"}
        >
            <Image
                src={TipIcon}
                sx={{
                    width: "60px",
                    height: "60px",
                    marginRight: "24px",
                }}
            ></Image>
            <Box onClick={handleLogin}>
                {address ? (
                    <Flex
                        sx={{
                            width: "204px",
                            height: "48px",
                            border: "1px solid #f2d861",
                            borderLeft: "none",
                            position: "relative",
                            background: "rgb(61,61,61)",
                            borderEndRadius: "24px",
                            paddingRight: "20px",
                        }}
                        justify={"flex-end"}
                        align={"center"}
                    >
                        <Image
                            src={WalletIcon}
                            sx={{
                                width: "60px",
                                height: "60px",
                                position: "absolute",
                                top: "50%",
                                left: "-20px",
                                transform: "translate(0%, -50%)",
                            }}
                        ></Image>
                        <Text
                            sx={{
                                fontFamily: "Quantico",
                            }}
                        >
                            {shortenAddress(address, 5, 4)}
                        </Text>
                    </Flex>
                ) : (
                    <Image
                        onClick={handleLogin}
                        src={WalletIcon}
                        sx={{
                            width: "60px",
                            height: "60px",
                        }}
                    ></Image>
                )}
            </Box>
        </Flex>
    );
};

export default ToolBar;
