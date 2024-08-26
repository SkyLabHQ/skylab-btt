import { Box, Flex, Image } from "@chakra-ui/react";
import BidTacToeTutorial from "@/components/BttComponents/BidTacToeTutorial";
import BulbIcon from "@/components/TacToe/assets/bulb.svg";
import PlayBackIcon from "./assets/playback-icon.svg";
import WalletIcon from "./assets/wallet-icon.png";
import { useNavigate } from "react-router-dom";
import { shortenAddress } from "@/utils";
import { useUserInfo } from "@/contexts/UserInfo";
import Click1Wav from "@/assets/click1.wav";
import PilotBorder from "@/assets/pilot-border.png";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";

const audio = new Audio(Click1Wav);

export const Toolbar = () => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    const navigate = useNavigate();
    const { onUserInfoOpen, tgInfo, handleLogin, address } = useUserInfo();

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
                            <Flex
                                sx={{
                                    background: `url(${PilotBorder}) no-repeat`,
                                    backgroundSize: "cover",
                                    position: "absolute",
                                    top: "50%",
                                    left: "0px",
                                    transform: "translate(0%, -50%)",
                                    zIndex: 99,
                                    width: "52px",
                                    height: "52px",
                                }}
                                justify={"center"}
                                align={"center"}
                            >
                                <Image
                                    src={tgInfo.photoUrl}
                                    sx={{
                                        width: "40px",
                                        height: "40px",
                                    }}
                                ></Image>
                            </Flex>
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
                        <Flex
                            onClick={() => {
                                audio.play();
                                onUserInfoOpen();
                            }}
                            sx={{
                                background: `url(${PilotBorder}) no-repeat`,
                                backgroundSize: "cover",
                                width: "40px",
                                height: "40px",
                            }}
                            justify={"center"}
                            align={"center"}
                        >
                            <Image
                                src={tgInfo.photoUrl}
                                sx={{
                                    width: "32px",
                                    height: "32px",
                                }}
                            ></Image>
                        </Flex>
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
            {/* <Image
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
            ></Image> */}
            <BidTacToeTutorial>
                <Image
                    sx={{
                        width: isPc ? "48px" : "40px",
                        height: isPc ? "48px" : "40px",
                        cursor: "pointer",
                    }}
                    src={BulbIcon}
                ></Image>
            </BidTacToeTutorial>
        </Box>
    );
};
