import { Box, Flex, Image, useMediaQuery } from "@chakra-ui/react";
import BidTacToeTutorial from "@/components/TacToe/BidTacToeTutorial";
import BulbIcon from "@/components/TacToe/assets/bulb.svg";
import PlayBackIcon from "./assets/playback-icon.svg";
import WalletIcon from "./assets/wallet-icon.png";
import { useNavigate } from "react-router-dom";
import { shortenAddress } from "@/utils";
import MyPilot from "../MyPilot";
import { useUserInfoRequest } from "@/contexts/UserInfo";
import { usePrivy } from "@privy-io/react-auth";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import useSkyToast from "@/hooks/useSkyToast";
import Click1Wav from "@/assets/click1.wav";
const audio = new Audio(Click1Wav);

export const Toolbar = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const navigate = useNavigate();
    const toast = useSkyToast();
    const { onUserInfoOpen } = useUserInfoRequest();
    const { ready, login, user, connectWallet } = usePrivy();
    const { address } = usePrivyAccounts();
    const { activePilot } = useUserInfoRequest();
    const handleLogin = () => {
        audio.play();
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
        <Box
            sx={{
                position: "absolute",
                right: "3.125vw",
                top: "1.4063vw",
                display: "flex",
                gap: isPc ? "24px" : "12px",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    cursor: "pointer",
                }}
            >
                {address ? (
                    isPc ? (
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
                                    zIndex: 99,
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
                        <MyPilot
                            onClick={() => {
                                audio.play();
                                onUserInfoOpen();
                            }}
                            imgUrl={activePilot.img}
                            sx={{
                                width: "40px",
                                height: "40px",
                                cursor: "pointer",
                            }}
                        ></MyPilot>
                    )
                ) : (
                    <Image
                        onClick={handleLogin}
                        src={WalletIcon}
                        sx={{
                            width: isPc ? "48px" : "40px",
                            height: isPc ? "48px" : "40px",
                            cursor: "pointer",
                        }}
                    ></Image>
                )}
            </Box>
            <Image
                src={PlayBackIcon}
                sx={{
                    width: isPc ? "48px" : "40px",
                    height: isPc ? "48px" : "40px",
                    cursor: "pointer",
                }}
                onClick={() => {
                    audio.play();
                    navigate("/btt/history");
                }}
            ></Image>
            <BidTacToeTutorial>
                <Image
                    sx={{
                        width: isPc ? "48px" : "40px",
                        height: isPc ? "48px" : "40px",
                    }}
                    src={BulbIcon}
                ></Image>
            </BidTacToeTutorial>
        </Box>
    );
};
