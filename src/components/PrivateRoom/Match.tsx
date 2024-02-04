import { usePrivateGameContext } from "@/pages/PrivateRoom";
import avatars from "@/skyConstants/avatars";
import {
    Box,
    Button,
    Flex,
    Text,
    useClipboard,
    useDisclosure,
    useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Loading from "../Loading";
import useCountDown from "react-countdown-hook";
import { useNavigate } from "react-router-dom";
import { getPrivateLobbySigner } from "@/hooks/useSigner";
import { useBttPrivateLobbyContract } from "@/hooks/useRetryContract";
import QuitModal from "../BttComponents/QuitModal";
import ToolBar from "../BttComponents/Toolbar";
import useSkyToast from "@/hooks/useSkyToast";
import { motion } from "framer-motion";

const UserInfo = ({ detail, status }: { detail: any; status: "my" | "op" }) => {
    const isMy = status === "my";
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Box
            sx={{
                position: "relative",
                width: isPc ? "8.5417vw" : "120px",
            }}
        >
            {detail?.address ? (
                <Flex
                    flexDir={"column"}
                    align={"center"}
                    sx={{
                        color: isMy ? "#FDDC2D" : "#fff",
                        fontSize: "1.25vw",
                    }}
                >
                    <Box
                        sx={{
                            borderRadius: isPc ? "1.0417vw" : "12px",
                            border: `1px solid  ${isMy ? "#fddc2d" : "#fff"}`,
                            background: avatars[detail?.avatar],
                            width: isPc ? "8.5417vw" : "76px",
                            height: isPc ? "8.5417vw" : "76px",
                        }}
                    ></Box>
                    <Text
                        sx={{
                            fontSize: isPc ? "0.8333vw" : "12px",
                            marginTop: "0.5208vw",
                        }}
                    >
                        {detail?.name}
                    </Text>
                    <Text
                        sx={{
                            fontSize: isPc ? "0.8333vw" : "12px",
                            marginTop: "1.3021vw",
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
    const navigate = useNavigate();
    const { bidTacToeGameAddress, lobbyAddress, lobbyName } =
        usePrivateGameContext();
    const { onCopy } = useClipboard(lobbyName);

    const [timeLeft, { start }] = useCountDown(5000, 1000);
    const { myInfo, opInfo, handleStepChange } = usePrivateGameContext();
    const bttPrivateLobbyContract = useBttPrivateLobbyContract(lobbyAddress);

    const handleQuit = async () => {
        const privateLobbySigner = getPrivateLobbySigner();
        await bttPrivateLobbyContract("deleteRoom", [bidTacToeGameAddress], {
            usePaymaster: true,
            signer: privateLobbySigner,
        });
        navigate(`/btt/lobby?lobbyAddress=${lobbyAddress}`);
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
                padding: "0 1.0417vw",
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
                    width: isPc ? "31.25vw" : "350px",
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
                        height: isPc ? "10vw" : "120px",
                    }}
                >
                    <UserInfo detail={myInfo} status="my"></UserInfo>
                    <Text
                        sx={{
                            fontSize: isPc ? "2.5vw" : "20px",
                        }}
                    >
                        VS
                    </Text>
                    <UserInfo detail={opInfo} status="op"></UserInfo>
                </Flex>
                <Flex justify={"center"} flexDir={"column"} align={"center"}>
                    {myInfo.address && opInfo.address ? (
                        <Box>
                            <Text
                                sx={{
                                    fontSize: isPc ? "1.25vw" : "12px",
                                    textAlign: "center",
                                }}
                            >
                                ({timeLeft / 1000}s)
                            </Text>
                            <Box
                                sx={{
                                    width: isPc ? "21.875vw" : "184px",
                                    height: isPc ? "0.2083vw" : "3px",
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
                                        height: isPc ? "0.2083vw" : "3px",
                                        background: "#BCBBBE",
                                    }}
                                ></Box>
                            </Box>
                        </Box>
                    ) : (
                        <Button
                            onClick={() => {
                                onOpen();
                            }}
                            sx={{
                                width: isPc ? "12.5vw" : "160px",
                                height: isPc ? "2.8646vw" : "40px",
                                borderRadius: isPc ? "0.9375vw" : "12px",
                                border: "2px solid #FFF",
                                background: "#303030",
                                fontSize: isPc ? "1.25vw" : "20px",
                                marginTop: isPc ? "3.8542vw" : "20px",
                            }}
                        >
                            <Text>Quit Match</Text>
                        </Button>
                    )}
                </Flex>
                <Box
                    sx={{
                        textAlign: "center",
                        fontSize: "16px",
                        marginTop: "10px",
                    }}
                    onClick={() => {
                        onCopy();
                        toast("Copy code success");
                    }}
                >
                    <Text>Lobby Code</Text>
                    <Text>{lobbyName}</Text>
                </Box>
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
