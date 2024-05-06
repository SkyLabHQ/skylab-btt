import {
    Box,
    Flex,
    Image,
    useDisclosure,
    useMediaQuery,
} from "@chakra-ui/react";
import TipIcon from "./assets/tip-icon.png";
import WalletIcon from "./assets/wallet-icon.png";
import { useUserInfo } from "@/contexts/UserInfo";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import { usePrivy } from "@privy-io/react-auth";
import useSkyToast from "@/hooks/useSkyToast";
import { shortenAddress } from "@/utils";
import RulesModal from "./RulesModal";
import MyPilot from "../MyPilot";
import MenuIcon from "./assets/menu.png";
import OpenSeaIcon from "./assets/opensea.png";
import MTwIcon from "./assets/m-tw.png";
import { useState } from "react";
import Click1Wav from "@/assets/click1.wav";
const audio = new Audio(Click1Wav);

const MToolBar = ({
    onUserInfoOpen,
    onWalletClick,
    onRulesModalOpen,
    showOpensea,
    showTw,
}: {
    onUserInfoOpen: () => void;
    onRulesModalOpen: () => void;
    onWalletClick: () => void;
    showOpensea?: boolean;
    showTw?: boolean;
}) => {
    const [active, setActive] = useState(false);
    const { address } = usePrivyAccounts();
    const { activePilot } = useUserInfo();

    return (
        <Flex
            id="my-wallet"
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
                    onClick={onRulesModalOpen}
                    src={TipIcon}
                    sx={{
                        width: "36px",
                        height: "36px",
                    }}
                ></Image>
                <Box
                    sx={{
                        marginTop: "20px",
                    }}
                >
                    {address ? (
                        <MyPilot
                            onClick={onUserInfoOpen}
                            width="36px"
                            imgUrl={activePilot.img}
                        ></MyPilot>
                    ) : (
                        <Image
                            onClick={onWalletClick}
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
                {showTw && (
                    <Image
                        sx={{
                            marginTop: "20px",
                        }}
                        src={MTwIcon}
                    ></Image>
                )}
            </Flex>
        </Flex>
    );
};

const ToolBar = ({
    showOpensea,
    showTw,
}: {
    showOpensea?: boolean;
    showTw?: boolean;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const {
        isOpen: isRulesModalOpen,
        onOpen: onRulesModalOpen,
        onClose: onRulesModalClose,
    } = useDisclosure();
    const toast = useSkyToast();
    const { onUserInfoOpen } = useUserInfo();
    const { ready, authenticated, login, user, connectWallet } = usePrivy();
    const { address } = usePrivyAccounts();
    const { activePilot } = useUserInfo();

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
        <>
            {isPc ? (
                <Flex
                    sx={{
                        position: "absolute",
                        top: "70px",
                        right: "48px",
                    }}
                    align={"center"}
                >
                    <Image
                        onClick={() => {
                            audio.play();
                            onRulesModalOpen();
                        }}
                        src={TipIcon}
                        sx={{
                            width: "60px",
                            height: "60px",
                            marginRight: "24px",
                            cursor: "pointer",
                        }}
                    ></Image>
                    <Box id="my-wallet">
                        {address ? (
                            <Flex
                                onClick={() => {
                                    audio.play();
                                    onUserInfoOpen();
                                }}
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
            ) : (
                <MToolBar
                    onUserInfoOpen={() => {
                        audio.play();
                        onUserInfoOpen();
                    }}
                    onRulesModalOpen={() => {
                        audio.play();
                        onRulesModalOpen();
                    }}
                    showOpensea={showOpensea}
                    showTw={showTw}
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
