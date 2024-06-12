import { usePvpGameContext } from "@/pages/PvpRoom";
import avatars from "@/skyConstants/avatars";
import {
    Box,
    Image,
    Flex,
    Text,
    useClipboard,
    useDisclosure,
    useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect, useMemo } from "react";
import Loading from "../Loading";
import useCountDown from "react-countdown-hook";
import QuitModal from "../BttComponents/QuitModal";
import ToolBar from "../BttComponents/Toolbar";
import useSkyToast from "@/hooks/useSkyToast";
import { motion } from "framer-motion";
import UserIcon from "./assets/user1.svg";
import { shortenAddress } from "@/utils";

const UserInfo = ({ detail, status }: { detail: any; status: "my" | "op" }) => {
    const isMy = status === "my";
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Box
            sx={{
                position: "relative",
                width: isPc ? "164px" : "120px",
            }}
        >
            {detail?.address ? (
                <Flex
                    flexDir={"column"}
                    align={"center"}
                    sx={{
                        color: isMy ? "#FDDC2D" : "#fff",
                        fontSize: "24px",
                    }}
                >
                    <Box
                        sx={{
                            borderRadius: isPc ? "20px" : "12px",
                            border: `1px solid  ${isMy ? "#fddc2d" : "#fff"}`,
                            background: avatars[detail?.avatar],
                            width: isPc ? "124px" : "76px",
                            height: isPc ? "124px" : "76px",
                        }}
                    ></Box>
                    <Text
                        sx={{
                            fontSize: isPc ? "16px" : "12px",
                            marginTop: "10px",
                        }}
                    >
                        {detail?.name}
                    </Text>
                    <Text
                        sx={{
                            fontSize: isPc ? "16px" : "12px",
                            marginTop: isPc ? "25px" : "12px",
                        }}
                    >
                        {detail.winCount} Wins/{" "}
                        {detail.winCount + detail.loseCount} Games
                    </Text>
                </Flex>
            ) : (
                <Loading size={"52px"}></Loading>
            )}
        </Box>
    );
};

const Match = () => {
    const toast = useSkyToast();
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [timeLeft, { start }] = useCountDown(5000, 1000);
    const { myInfo, opInfo, handleStepChange, bidTacToeGameAddress } =
        usePvpGameContext();

    const inviteLink = useMemo(() => {
        const password = localStorage.getItem("password");
        return `${window.location.origin}/pvp/accept?gameAddress=${bidTacToeGameAddress}`;
    }, [bidTacToeGameAddress]);

    const { onCopy } = useClipboard(inviteLink);

    const handleQuit = async () => {};

    const handleCopyLink = () => {
        onCopy();
        toast("Copy code success");
    };

    useEffect(() => {
        if (myInfo.address && opInfo.address) {
            start();
            setTimeout(() => {
                handleStepChange(1);
            }, 5000);
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

                <Flex justify={"center"} flexDir={"column"} align={"center"}>
                    {myInfo.address && opInfo.address ? (
                        <Box>
                            <Text
                                sx={{
                                    fontSize: isPc ? "24px" : "12px",
                                    textAlign: "center",
                                }}
                            >
                                ({timeLeft / 1000}s)
                            </Text>
                            <Box
                                sx={{
                                    width: isPc ? "420px" : "184px",
                                    height: isPc ? "4px" : "3px",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    background: "#616161",
                                    marginTop: "18px",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: (timeLeft / 5000) * 100 + "%",
                                        transition: "width 0.5s",
                                        height: isPc ? "4px" : "3px",
                                        background: "#BCBBBE",
                                    }}
                                ></Box>
                            </Box>
                        </Box>
                    ) : (
                        <>
                            <Flex
                                align={"center"}
                                justify={"center"}
                                onClick={handleCopyLink}
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
                        </>
                    )}
                </Flex>
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
