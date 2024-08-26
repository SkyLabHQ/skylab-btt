import { useUserInfo } from "@/contexts/UserInfo";
import { Box, Flex, Image } from "@chakra-ui/react";
import Click1Wav from "@/assets/click1.wav";
import { shortenAddress } from "@/utils";
import PilotBorder from "@/assets/avatar-border.svg";
import WalletIcon from "@/assets/wallet-icon.png";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";

const audio = new Audio(Click1Wav);

const UserLogin = () => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    const { handleLogin, address, tgInfo, onUserInfoOpen } = useUserInfo();
    return (
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
                                left: "-4px",
                                transform: "translate(0%, -50%)",
                                zIndex: 99,
                                width: "48px",
                                height: "48px",
                                padding: "2px",
                            }}
                        >
                            <Image
                                src={tgInfo.photoUrl}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "50%",
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
                            width: "32px",
                            height: "32px",
                            padding: "2px",
                        }}
                        justify={"center"}
                        align={"center"}
                    >
                        <Image
                            src={tgInfo.photoUrl}
                            sx={{
                                width: "100%",
                                height: "100%",
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
    );
};

export default UserLogin;
