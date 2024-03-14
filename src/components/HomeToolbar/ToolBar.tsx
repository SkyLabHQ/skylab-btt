import {
    Box,
    Flex,
    Image,
    useDisclosure,
    useMediaQuery,
} from "@chakra-ui/react";
import TipIcon from "./assets/tip-icon.png";
import WalletIcon from "./assets/wallet-icon.png";
import { useUserInfoRequest } from "@/contexts/UserInfo";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import { usePrivy } from "@privy-io/react-auth";
import useSkyToast from "@/hooks/useSkyToast";
import { shortenAddress } from "@/utils";
import RulesModal from "./RulesModal";
import MyPilot from "../MyPilot";
import MenuIcon from "./assets/menu.png";
import OpenSeaIcon from "./assets/opensea.png";
import { useState } from "react";

const MToolBar = ({
    onWalletClick,
    showOpensea,
}: {
    onWalletClick: () => void;
    showOpensea?: boolean;
}) => {
    const [active, setActive] = useState(false);
    const { address } = usePrivyAccounts();
    const { activePilot } = useUserInfoRequest();

    return (
        <Flex
            sx={{
                position: "absolute",
                top: "70px",
                right: "0px",
                "&>div": {
                    transition: "all 0.2s",
                },
            }}
        >
            <Flex
                sx={{
                    background: "#b8a850",
                    height: "40px",
                    borderRadius: "40px 0 0 40px",
                    width: "50px",
                    paddingLeft: "10px",
                    zIndex: 999,
                    transform: active ? "translateX(0px)" : "translateX(20px)",
                }}
                onClick={() => {
                    setActive(!active);
                }}
                align={"center"}
            >
                <Image
                    src={MenuIcon}
                    sx={{
                        width: "16px",
                    }}
                ></Image>
            </Flex>
            <Flex
                sx={{
                    position: "absolute",
                    top: "28px",
                    right: 0,
                    width: "40px",
                    background: "rgba(0, 0, 0, 0.60)",
                    paddingTop: "20px",
                    // zIndex: -1,
                    transform: active ? "translateX(0px)" : "translateX(40px)",
                    borderRadius: "0 0 40px 40px",
                }}
                flexDir={"column"}
                align={"center"}
            >
                <Image
                    // onClick={onRulesModalOpen}
                    src={TipIcon}
                    sx={{
                        width: "36px",
                        height: "36px",
                    }}
                ></Image>
                <Box
                    onClick={onWalletClick}
                    sx={{
                        marginTop: "20px",
                    }}
                >
                    {address ? (
                        <MyPilot
                            width="36px"
                            imgUrl={activePilot.img}
                            sx={{}}
                        ></MyPilot>
                    ) : (
                        <Image
                            src={WalletIcon}
                            sx={{
                                width: "36px",
                                height: "36px",
                            }}
                        ></Image>
                    )}
                </Box>
                {showOpensea && (
                    <Image
                        sx={{
                            marginTop: "20px",
                        }}
                        src={OpenSeaIcon}
                    ></Image>
                )}
            </Flex>
        </Flex>
    );
};

const ToolBar = ({ showOpensea }: { showOpensea?: boolean }) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const {
        isOpen: isRulesModalOpen,
        onOpen: onRulesModalOpen,
        onClose: onRulesModalClose,
    } = useDisclosure();
    const toast = useSkyToast();
    const { onUserInfoOpen } = useUserInfoRequest();
    const { ready, authenticated, login, user } = usePrivy();
    const { address } = usePrivyAccounts();
    const { activePilot } = useUserInfoRequest();

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
        <>
            {isPc ? (
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
                                    imgUrl={activePilot.img}
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
                </Flex>
            ) : (
                <MToolBar
                    showOpensea={showOpensea}
                    onWalletClick={handleLogin}
                ></MToolBar>
            )}
            <RulesModal
                isOpen={isRulesModalOpen}
                onClose={onRulesModalClose}
            ></RulesModal>
        </>
    );
};

export default ToolBar;
