import { Box, Flex, Image, useMediaQuery } from "@chakra-ui/react";
import BidTacToeTutorial from "@/components/BttComponents/BidTacToeTutorial";
import BulbIcon from "@/components/TacToe/assets/bulb.svg";
import PlayBackIcon from "./assets/playback-icon.svg";
import WalletIcon from "./assets/wallet-icon.png";
import { useNavigate } from "react-router-dom";
import { shortenAddress } from "@/utils";
import { useUserInfo } from "@/contexts/UserInfo";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import Click1Wav from "@/assets/click1.wav";
import UserIcon from "@/assets/user-icon.png";
import PilotBorder from "@/assets/pilot-border.png";
import { usePrivy, useWallets } from "@privy-io/react-auth";

const audio = new Audio(Click1Wav);

export const Toolbar = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const navigate = useNavigate();
    const { onUserInfoOpen } = useUserInfo();
    const { user } = usePrivy();
    const { address } = usePrivyAccounts();
    const { wallets } = useWallets();
    const { handleLogin } = useUserInfo();

    console.log(user, wallets, address, "address");

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
                            <Box
                                sx={{
                                    background: `url(${PilotBorder}) no-repeat`,
                                    backgroundSize: "cover",
                                    position: "absolute",
                                    top: "50%",
                                    left: "0px",
                                    transform: "translate(0%, -50%)",
                                    zIndex: 99,
                                }}
                            >
                                <Image
                                    src={UserIcon}
                                    sx={{
                                        width: "52px",
                                        height: "52px",
                                    }}
                                ></Image>
                            </Box>
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
                        <Box
                            onClick={() => {
                                audio.play();
                                onUserInfoOpen();
                            }}
                            sx={{
                                background: `url(${PilotBorder}) no-repeat`,
                                backgroundSize: "cover",
                            }}
                        >
                            <Image
                                src={UserIcon}
                                sx={{
                                    width: isPc ? "48px" : "40px",
                                    height: isPc ? "48px" : "40px",
                                }}
                            ></Image>
                        </Box>
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
