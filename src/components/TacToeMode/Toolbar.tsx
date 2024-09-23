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
import Avatar from "../Avatar";

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
                {" "}
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
                            <Avatar img={tgInfo.photoUrl}></Avatar>
                            <Flex
                                align={"center"}
                                justify={"center"}
                                sx={{
                                    width: "164px",
                                    height: "44px",
                                    border: "1px solid #868686",
                                    borderLeft: "none",
                                    position: "relative",
                                    background: "#000",
                                    fontFamily: "Quantico",
                                    fontWeight: "bold",
                                }}
                            >
                                {shortenAddress(address, 5, 4)}
                            </Flex>
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
                                    borderRadius: "50%",
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
