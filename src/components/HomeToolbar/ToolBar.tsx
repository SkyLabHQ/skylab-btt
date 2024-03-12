import { Box, Flex, Image, useDisclosure } from "@chakra-ui/react";
import React from "react";
import TipIcon from "./assets/tip-icon.png";
import WalletIcon from "./assets/wallet-icon.png";
import { useUserInfoRequest } from "@/contexts/UserInfo";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import { usePrivy } from "@privy-io/react-auth";
import useSkyToast from "@/hooks/useSkyToast";
import { shortenAddress } from "@/utils";
import RulesModal from "./RulesModal";
import MyPilot from "../MyPilot";

const ToolBar = () => {
    const {
        isOpen: isRulesModalOpen,
        onOpen: onRulesModalOpen,
        onClose: onRulesModalClose,
    } = useDisclosure();
    const toast = useSkyToast();
    const { onUserInfoOpen } = useUserInfoRequest();
    const { ready, authenticated, login, user } = usePrivy();
    const { address } = usePrivyAccounts();
    console.log(address, "address");

    const handleLogin = () => {
        console.log(ready, user, "ready");
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
                onClick={onRulesModalOpen}
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
                            position: "relative",
                            paddingLeft: "20px",
                        }}
                        justify={"flex-end"}
                        align={"center"}
                    >
                        <MyPilot
                            width="60px"
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "0px",
                                transform: "translate(0%, -50%)",
                                zIndex: 999,
                            }}
                        ></MyPilot>

                        <Box
                            sx={{
                                width: "184px",
                                height: "48px",
                                border: "1px solid #f2d861",
                                borderLeft: "none",
                                position: "relative",
                                background: "rgb(61,61,61)",
                                borderEndRadius: "24px",
                                fontFamily: "Quantico",
                                paddingLeft: "50px",
                                lineHeight: "48px",
                            }}
                        >
                            {shortenAddress(address, 5, 4)}
                        </Box>
                    </Flex>
                ) : (
                    <Image
                        src={WalletIcon}
                        sx={{
                            width: "60px",
                            height: "60px",
                        }}
                    ></Image>
                )}
            </Box>
            <RulesModal
                isOpen={isRulesModalOpen}
                onClose={onRulesModalClose}
            ></RulesModal>
        </Flex>
    );
};

export default ToolBar;
