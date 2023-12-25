import { usePrivateGameContext } from "@/pages/PrivateRoom";
import avatars from "@/skyConstants/avatars";
import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Loading from "../Loading";
import useCountDown from "react-countdown-hook";
import { useLocation } from "react-router-dom";
import ToolBar from "./Toolbar";
import QuitModal from "./QuitModal";

const UserInfo = ({ detail, status }: { detail: any; status: "my" | "op" }) => {
    const isMy = status === "my";
    return (
        <Box
            sx={{
                position: "relative",
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
                            borderRadius: "1.0417vw",
                            border: `1px solid  ${isMy ? "#fddc2d" : "#fff"}`,
                            background: avatars[detail?.avatar],
                            width: "8.5417vw",
                            height: "8.5417vw",
                        }}
                    ></Box>
                    <Text
                        sx={{
                            marginTop: "0.5208vw",
                        }}
                    >
                        {detail?.name}
                    </Text>
                    <Text
                        sx={{
                            marginTop: "1.3021vw",
                        }}
                    >
                        {detail.winCount} Wins/{" "}
                        {detail.winCount + detail.loseCount} Games
                    </Text>
                </Flex>
            ) : (
                <Loading></Loading>
            )}
        </Box>
    );
};

const Match = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { search } = useLocation();
    const [timeLeft, { start }] = useCountDown(5000, 1000);
    const { myInfo, opInfo, handleStepChange } = usePrivateGameContext();

    const handleWithdrawFromQueue = async () => {
        onOpen();
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
            h={"100vh"}
            justify={"center"}
            sx={{
                padding: "0 1.0417vw",
            }}
        >
            <ToolBar quitType="wait"></ToolBar>

            <Box
                sx={{
                    width: "31.25vw",
                }}
            >
                <Flex align={"center"} justify={"space-between"} w={"100%"}>
                    <UserInfo detail={myInfo} status="my"></UserInfo>
                    <Text
                        sx={{
                            fontSize: "2.5vw",
                        }}
                    >
                        VS
                    </Text>
                    <UserInfo detail={opInfo} status="op"></UserInfo>
                </Flex>
                <Flex
                    justify={"center"}
                    flexDir={"column"}
                    align={"center"}
                    sx={{
                        marginTop: "5.2083vw",
                    }}
                >
                    {myInfo.address && opInfo.address ? (
                        <Box>
                            <Text
                                sx={{
                                    fontSize: "1.25vw",
                                    textAlign: "center",
                                }}
                            >
                                ({timeLeft / 1000}s)
                            </Text>
                            <Box
                                sx={{
                                    width: "21.875vw",
                                    height: "0.2083vw",
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
                                        height: "0.2083vw",
                                        background: "#BCBBBE",
                                    }}
                                ></Box>
                            </Box>
                        </Box>
                    ) : (
                        <Button
                            onClick={handleWithdrawFromQueue}
                            sx={{
                                width: "12.5vw",
                                height: "2.8646vw",
                                borderRadius: "0.9375vw",
                                border: "2px solid #FFF",
                                background: "#303030",
                                fontSize: "1.25vw",
                                marginTop: "3.8542vw",
                            }}
                        >
                            <Text>Quit Match</Text>
                        </Button>
                    )}
                </Flex>
            </Box>
            <QuitModal
                isOpen={isOpen}
                onClose={onClose}
                quitType={"wait"}
            ></QuitModal>
        </Flex>
    );
};

export default Match;
