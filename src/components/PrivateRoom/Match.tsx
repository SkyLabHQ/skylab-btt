import { usePvpGameContext } from "@/pages/PvpRoom";
import {
    Box,
    Image,
    Flex,
    Text,
    useDisclosure,
    useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect, useMemo } from "react";
import QuitModal from "../BttComponents/QuitModal";
import ToolBar from "../BttComponents/Toolbar";
import useSkyToast from "@/hooks/useSkyToast";
import { motion } from "framer-motion";
import UserIcon from "./assets/user1.svg";
import { shortenAddress } from "@/utils";
import { useBttFactoryRetryPaymaster } from "@/hooks/useRetryContract";
import { useNavigate } from "react-router-dom";
import { handleError } from "@/utils/error";
import { MINI_APP_URL } from "@/skyConstants";

const Match = () => {
    const toast = useSkyToast();
    const navigate = useNavigate();
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { myInfo, opInfo, handleStepChange, gameAddress, privateKey } =
        usePvpGameContext();
    const bttFactoryRetryPaymaster = useBttFactoryRetryPaymaster({
        privateKey,
    });

    const handleQuit = async () => {
        try {
            await bttFactoryRetryPaymaster("quitPvpRoom", []);
            navigate(`/pvp/home`);
        } catch (error) {
            toast(handleError(error));
        }
    };

    const shareUrl = useMemo(() => {
        try {
            const pvpPasswords =
                JSON.parse(localStorage.getItem("pvpPasswords")) || {};
            const share_url =
                "https://t.me/share/url?url=" +
                encodeURIComponent(
                    `${MINI_APP_URL}?startapp=accept-${gameAddress}-${pvpPasswords[gameAddress]}`,
                ) +
                "&text=" +
                encodeURIComponent(
                    "Invite friends to join the 1v1 immediately",
                );
            return share_url;
        } catch (e) {
            console.log(e);
            return "";
        }
    }, []);

    useEffect(() => {
        console.log(myInfo, "myInfo", opInfo, "opInfo");
        if (myInfo.address && opInfo.address) {
            handleStepChange(1);
        }
    }, [myInfo.address, opInfo.address]);

    return (
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

            <Box
                sx={{
                    width: isPc ? "600px" : "350px",
                }}
            >
                {(!myInfo.address || !opInfo.address) && (
                    <motion.div
                        style={{
                            fontSize: isPc ? "30px" : "20px",
                            textAlign: "center",
                            marginBottom: "20px",
                            fontWeight: "bold",
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                    >
                        Matching
                    </motion.div>
                )}

                <Flex
                    align={"center"}
                    justify={"space-around"}
                    w={"100%"}
                    sx={{
                        height: isPc ? "250px" : "120px",
                        marginTop: "40px",
                    }}
                >
                    {shortenAddress(myInfo?.address)}
                    <Text
                        sx={{
                            fontSize: isPc ? "48px" : "20px",
                        }}
                    >
                        VS
                    </Text>
                    {shortenAddress(opInfo?.address)}
                </Flex>

                <a href={shareUrl} target="_blank">
                    <Flex
                        justify={"center"}
                        flexDir={"column"}
                        align={"center"}
                    >
                        <Flex
                            align={"center"}
                            justify={"center"}
                            // onClick={handleCopyLink}
                            sx={{
                                width: isPc ? "420px" : "180px",
                                height: isPc ? "55px" : "40px",
                                borderRadius: isPc ? "18px" : "12px",
                                border: "2px solid #FFF",
                                background: "#303030",
                                fontSize: isPc ? "24px" : "14px",
                                marginTop: isPc ? "74px" : "20px",
                                cursor: "pointer",
                            }}
                        >
                            <Image
                                sx={{
                                    width: isPc ? "32px" : "16px",
                                    height: isPc ? "32px" : "16px",
                                    marginRight: isPc ? "12px" : "6px",
                                }}
                                src={UserIcon}
                            ></Image>
                            <Text>Copy 1v1 Invite Link</Text>
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
                    </Flex>
                </a>
            </Box>
            <QuitModal
                onConfirm={handleQuit}
                isOpen={isOpen}
                onClose={onClose}
                quitType={"wait"}
            ></QuitModal>
        </Flex>
    );
};

export default Match;
