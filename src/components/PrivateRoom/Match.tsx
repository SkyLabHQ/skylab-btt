import { usePrivateGameContext } from "@/pages/PrivateRoom";
import avatars from "@/skyConstants/avatars";
import {
    Box,
    Button,
    Flex,
    Text,
    useDisclosure,
    useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Loading from "../Loading";
import useCountDown from "react-countdown-hook";
import { useLocation, useNavigate } from "react-router-dom";
import ToolBar from "./Toolbar";
import { getPrivateLobbySigner } from "@/hooks/useSigner";
import { useBttPrivateLobbyContract } from "@/hooks/useRetryContract";
import QuitModal from "../BttComponents/QuitModal";

const UserInfo = ({ detail, status }: { detail: any; status: "my" | "op" }) => {
    const isMy = status === "my";
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Box
            sx={{
                position: "relative",
                width: isPc ? "8.5417vw" : "96px",
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
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const { bidTacToeGameAddress, lobbyAddress } = usePrivateGameContext();

    const { search } = useLocation();
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
            setTimeout(
                () => {
                    handleStepChange(1);
                },
                0,
                // 5000
            );
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
            <ToolBar
                quitType="wait"
                onQuitClick={() => {
                    onOpen();
                }}
            ></ToolBar>

            <Box
                sx={{
                    width: isPc ? "31.25vw" : "240px",
                }}
            >
                <Flex align={"center"} justify={"space-between"} w={"100%"}>
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
                                marginTop: "3.8542vw",
                            }}
                        >
                            <Text>Quit Match</Text>
                        </Button>
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
