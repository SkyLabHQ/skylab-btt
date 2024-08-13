import {
    Box,
    Flex,
    Text,
    Image,
    useDisclosure,
    useClipboard,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";
import UserIcon from "@/assets/user1.svg";
import { MINI_APP_URL } from "@/skyConstants/tgConfig";
import QuitModal from "@/components/BttComponents/QuitModal";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import ToolBar from "@/components/BttComponents/Toolbar";
import ArrowIcon from "@/assets/arrow.svg";
import { quitMatch } from "@/api/pvpGame";

const MatchPage = () => {
    const { search } = useLocation();
    const params = qs.parse(search) as any;
    const [gameId] = useState<string>(params.gameId);

    const toast = useSkyToast();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleQuit = async () => {
        try {
            const res = await quitMatch({ gameId: Number(gameId) });
            if (res.code == 200) {
                navigate("/free/pvp/home");
            }
        } catch (error) {
            toast(handleError(error));
        }
    };

    const shareUrl = useMemo(() => {
        if (!gameId) return "";
        try {
            const share_url =
                "https://t.me/share/url?url=" +
                encodeURIComponent(
                    `${MINI_APP_URL}?startapp=pvpGame-${gameId}`,
                ) +
                "&text=" +
                encodeURIComponent(
                    "Bid Tac Toe is a super fun variant of the Tic Tac Toe game. I invite you to play with me. Click here to accept my invite!",
                );
            return share_url;
        } catch (e) {
            console.log(e);
            return "";
        }
    }, [gameId]);

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
                    <Text
                        sx={{
                            fontSize: "12px",
                            textAlign: "center",
                            fontFamily: "PingFang SC",
                        }}
                    >
                        Click to invite your frenid
                    </Text>
                    <Image
                        src={ArrowIcon}
                        sx={{
                            marginTop: "10px",
                        }}
                    ></Image>
                    <Box
                        sx={{
                            marginTop: "20px",
                        }}
                    >
                        <a href={shareUrl} target="_blank">
                            <Flex
                                justify={"center"}
                                flexDir={"column"}
                                align={"center"}
                            >
                                <Flex
                                    align={"center"}
                                    justify={"center"}
                                    sx={{
                                        width: "180px",
                                        height: "40px",
                                        borderRadius: "12px",
                                        border: "2px solid #FFF",
                                        background: "#303030",
                                        fontSize: "14px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <Image
                                        sx={{
                                            width: "16px",
                                            height: "16px",
                                            marginRight: "6px",
                                        }}
                                        src={UserIcon}
                                    ></Image>
                                    <Text>Invite Friend</Text>
                                </Flex>
                            </Flex>
                        </a>
                        <Flex
                            align={"center"}
                            justify={"center"}
                            onClick={() => {
                                onOpen();
                            }}
                            sx={{
                                width: "180px",
                                height: "40px",
                                borderRadius: "12px",
                                border: "2px solid #FFF",
                                background: "#303030",
                                fontSize: "14px",
                                marginTop: "20px",
                                cursor: "pointer",
                            }}
                        >
                            <Text>Quit Match</Text>
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

export default MatchPage;
