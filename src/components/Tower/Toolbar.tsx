import { Box, Flex, Image } from "@chakra-ui/react";
import BidTacToeTutorial from "@/components/BttComponents/BidTacToeTutorial";
import BulbIcon from "@/components/TacToe/assets/bulb.svg";
import WalletIcon from "@/assets/wallet.svg";
import { useNavigate } from "react-router-dom";
import { shortenAddress } from "@/utils";
import { useUserInfo } from "@/contexts/UserInfo";
import PilotBorder from "@/assets/pilot-border.png";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";
import Avatar from "../Avatar";

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
            <Avatar
                borderColor="#707070"
                sx={{
                    cursor: "pointer",
                }}
            >
                <Image
                    src={BulbIcon}
                    sx={{
                        width: isPc ? "32px" : "24px",
                        height: isPc ? "32px" : "24px",
                        cursor: "pointer",
                    }}
                ></Image>
            </Avatar>
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
                                onUserInfoOpen();
                            }}
                            sx={{
                                position: "relative",
                                paddingLeft: "20px",
                            }}
                            justify={"flex-end"}
                            align={"center"}
                        >
                            <Avatar>
                                <Image
                                    src={tgInfo.photoUrl}
                                    sx={{
                                        width: "100%",
                                    }}
                                ></Image>
                            </Avatar>
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
                    <Avatar onClick={handleLogin}>
                        <Image
                            src={WalletIcon}
                            sx={{
                                width: isPc ? "28px" : "24px",
                            }}
                        ></Image>
                    </Avatar>
                )}
            </Box>
        </Box>
    );
};
