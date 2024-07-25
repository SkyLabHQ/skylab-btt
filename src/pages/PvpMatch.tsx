import {
    Box,
    Flex,
    Text,
    Image,
    useMediaQuery,
    useDisclosure,
    useClipboard,
    Button,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";
import BttHelmet from "@/components/Helmet/BttHelmet";
import UserIcon from "@/assets/user1.svg";
import Nest from "@/components/Nest";
import { MINI_APP_URL } from "@/skyConstants/tgConfig";
import QuitModal from "@/components/BttComponents/QuitModal";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import ToolBar from "@/components/BttComponents/Toolbar";
import ArrowIcon from "@/assets/arrow.svg";
import { getGameInfo, quitMatch } from "@/api/pvpGame";
import { useInitData } from "@tma.js/sdk-react";

const MatchPage = () => {
    const { search } = useLocation();
    const params = qs.parse(search) as any;
    const [gameId] = useState<string>(params.gameId);
    const initData = useInitData();
    const toast = useSkyToast();
    const navigate = useNavigate();
    const [isPc] = useMediaQuery("(min-width: 800px)");
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
    const { onCopy } = useClipboard(
        `${location.origin}/free/pvp/accept?gameId=${gameId}&outer2=true`,
    );

    const shareUrl = useMemo(() => {
        const url = `${location.origin}/free/pvp/accept?gameId=${gameId}&outer2=true`;
        return url;
        // if (!gameAddress) return "";
        // try {
        //     const pvpPasswords =
        //         JSON.parse(localStorage.getItem("pvpPasswords")) || {};
        //     const share_url =
        //         "https://t.me/share/url?url=" +
        //         encodeURIComponent(
        //             `${MINI_APP_URL}?startapp=accept-${pvpPasswords[gameAddress]}`,
        //         ) +
        //         "&text=" +
        //         encodeURIComponent(
        //             "Bid Tac Toe is a super fun variant of the Tic Tac Toe game. I invite you to play with me. Click here to accept my invite!",
        //         );
        //     return share_url;
        // } catch (e) {
        //     console.log(e);
        //     return "";
        // }
        return "";
    }, [gameId]);

    const handleGetAllPlayerInfo = async () => {
        if (!gameId) return;

        const gameInfo = await getGameInfo(Number(gameId));

        if (gameInfo.code == 200) {
            const game = gameInfo.data.game;
            if (game.player1 != initData.user.id) {
                navigate("/free/pvp/home");
                return;
            }

            if (game.player1 && game.player2) {
                navigate(`/free/pvp/game?gameId=${gameId}`);
                return;
            }
        }

        console.log(gameInfo, "gameInfo");
    };

    useEffect(() => {
        if (!gameId || !initData.user.id) return;
        const timer = setInterval(() => {
            handleGetAllPlayerInfo();
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    }, [gameId, initData]);

    return (
        <Box
            sx={{
                height: "100%",
            }}
        >
            <BttHelmet></BttHelmet>
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
                            width: isPc ? "600px" : "350px",
                        }}
                    >
                        <Text
                            sx={{
                                fontSize: isPc ? "16px" : "12px",
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
                                marginTop: isPc ? "74px" : "20px",
                            }}
                        >
                            <Button onClick={onCopy}>复制链接</Button>
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
                                            width: isPc ? "420px" : "180px",
                                            height: isPc ? "55px" : "40px",
                                            borderRadius: isPc
                                                ? "16px"
                                                : "12px",
                                            border: "2px solid #FFF",
                                            background: "#303030",
                                            fontSize: isPc ? "24px" : "14px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Image
                                            sx={{
                                                width: isPc ? "32px" : "16px",
                                                height: isPc ? "32px" : "16px",
                                                marginRight: isPc
                                                    ? "12px"
                                                    : "6px",
                                            }}
                                            src={UserIcon}
                                        ></Image>
                                        <Text>Invite Friend</Text>
                                    </Flex>
                                </Flex>
                            </a>{" "}
                            <Flex
                                align={"center"}
                                justify={"center"}
                                onClick={() => {
                                    onOpen();
                                }}
                                sx={{
                                    width: isPc ? "420px" : "180px",
                                    height: isPc ? "55px" : "40px",
                                    borderRadius: isPc ? "18px" : "12px",
                                    border: "2px solid #FFF",
                                    background: "#303030",
                                    fontSize: isPc ? "24px" : "14px",
                                    marginTop: isPc ? "60px" : "20px",
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
            <Nest />
        </Box>
    );
};

export default MatchPage;
