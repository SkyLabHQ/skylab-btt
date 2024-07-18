import {
    Box,
    Flex,
    Text,
    Image,
    useMediaQuery,
    useDisclosure,
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

const MatchPage = () => {
    const { search } = useLocation();
    const params = qs.parse(search) as any;
    const [gameAddress] = useState<string>(params.gameAddress);

    const toast = useSkyToast();
    const navigate = useNavigate();
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleQuit = async () => {
        try {
            // await quit()
            navigate(`/free/pvpHome`);
        } catch (error) {
            toast(handleError(error));
        }
    };

    const shareUrl = useMemo(() => {
        if (!gameAddress) return "";
        try {
            const pvpPasswords =
                JSON.parse(localStorage.getItem("pvpPasswords")) || {};
            const share_url =
                "https://t.me/share/url?url=" +
                encodeURIComponent(
                    `${MINI_APP_URL}?startapp=accept-${pvpPasswords[gameAddress]}`,
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
    }, [gameAddress]);

    const handleGetAllPlayerInfo = async () => {
        // const gameInfo = await getGameInfo();
    };

    useEffect(() => {
        const timer = setInterval(() => {
            handleGetAllPlayerInfo();
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    }, []);

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
                                    <Flex
                                        align={"center"}
                                        justify={"center"}
                                        onClick={() => {
                                            onOpen();
                                        }}
                                        sx={{
                                            width: isPc ? "420px" : "180px",
                                            height: isPc ? "55px" : "40px",
                                            borderRadius: isPc
                                                ? "18px"
                                                : "12px",
                                            border: "2px solid #FFF",
                                            background: "#303030",
                                            fontSize: isPc ? "24px" : "14px",
                                            marginTop: isPc ? "60px" : "20px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Text>Quit Match</Text>
                                    </Flex>
                                </Flex>
                            </a>
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
