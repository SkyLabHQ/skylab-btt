import { Box, Flex, Text, Image, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";
import QuitModal from "@/components/BttComponents/QuitModal";
import useSkyToast from "@/hooks/useSkyToast";
import ToolBar from "@/components/BttComponents/Toolbar";
import { quitMatch } from "@/api/pvpGame";
import DotLoading from "../Loading/DotLoading";
import { PvpGameInfo } from "@/pages/PvpRoom";
import SoloIcon from "@/assets/solo-icon.svg";
import { avatarImg } from "@/utils/avatars";

const Invited = ({ myGameInfo }: { myGameInfo: PvpGameInfo }) => {
    const { search } = useLocation();
    const params = qs.parse(search) as any;
    const [gameId] = useState<string>(params.gameId);
    const toast = useSkyToast();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleQuit = async () => {
        try {
            await quitMatch({ gameId: Number(gameId) });
            navigate("/free/pvp/home");
        } catch (e: any) {
            toast(e.data.message);
        }
    };

    return (
        <Box
            sx={{
                height: "100%",
                fontFamily: "Quantico",
                width: "100%",
            }}
        >
            <Flex
                align={"center"}
                h={"100%"}
                justify={"center"}
                sx={{
                    padding: "0 20px",
                }}
            >
                <ToolBar
                    quitType="wait"
                    onQuitClick={() => {
                        onOpen();
                    }}
                ></ToolBar>

                <Flex
                    align={"center"}
                    flexDir={"column"}
                    sx={{
                        width: "350px",
                    }}
                >
                    <Box
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        <DotLoading
                            fontSize="24px"
                            text="Waiting confirm"
                        ></DotLoading>
                    </Box>

                    <Box
                        sx={{
                            marginTop: "20px",
                        }}
                    >
                        <Flex
                            align={"flex-start"}
                            justify={"center"}
                            sx={{
                                gap: "16px",
                            }}
                        >
                            <Box>
                                <Image
                                    src={myGameInfo.photoUrl}
                                    sx={{
                                        borderRadius: "50%",
                                        width: "60px",
                                        height: "60px",
                                        border: "1px solid #FFF",
                                        overflow: "hidden",
                                    }}
                                ></Image>
                                <Text
                                    sx={{
                                        fontSize: "16px",
                                        textAlign: "center",
                                        marginTop: "14px",
                                        fontFamily: "Orbitron",
                                    }}
                                >
                                    You
                                </Text>
                            </Box>{" "}
                            <Image
                                sx={{
                                    width: "46px",
                                    height: "33px",
                                    marginTop: "14px",
                                }}
                                src={SoloIcon}
                            ></Image>
                            <Box>
                                <Box
                                    sx={{
                                        borderRadius: "50%",
                                        width: "60px",
                                        height: "60px",
                                        border: "1px solid #FFF",
                                    }}
                                >
                                    <Image
                                        src={avatarImg(String(gameId))}
                                    ></Image>
                                </Box>
                                <Text
                                    sx={{
                                        textAlign: "center",
                                        marginTop: "14px",
                                        fontFamily: "Orbitron",
                                        color: "#999",
                                        fontSize: "12px",
                                        width: "60px",
                                    }}
                                >
                                    Waiting confirm...{" "}
                                </Text>
                            </Box>
                        </Flex>
                    </Box>
                </Flex>
                <QuitModal
                    onConfirm={handleQuit}
                    isOpen={isOpen}
                    onClose={onClose}
                    quitType={"wait"}
                ></QuitModal>
            </Flex>
        </Box>
    );
};

export default Invited;
