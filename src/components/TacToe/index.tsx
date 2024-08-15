import { Box, Flex, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import Board from "@/components/BttComponents/Board";
import { useGameContext } from "@/pages/TacToe";
import getNowSecondsTimestamp from "@/utils/nowTime";
import QuitModal from "../BttComponents/QuitModal";
import MLayout from "./MLayout";
import Timer from "../BttComponents/Timer";
import ToolBar from "../BttComponents/Toolbar";
import { MyUserCard, OpUserCard } from "../BttComponents/PlaneUserCard";

const TacToePage = ({
    bidAmount,
    currentRound,
    gameTimeout,
    loading,
    onBid,
    showAnimateNumber,
    onBidAmount,
    handleQuit,
}: {
    bidAmount: number;
    currentRound: number;
    gameTimeout: number;
    loading: boolean;
    onBid: () => void;
    showAnimateNumber: number;
    onBidAmount: (value: number) => void;
    handleQuit: () => void;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [time, setTime] = useState(0);
    const { myGameInfo, opGameInfo, list, handleStepChange } = useGameContext();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const commitWorkerRef = useRef<Worker>(null);
    const [showAnimateConfirm, setShowAnimateConfirm] = useState(0);

    const [autoCommitTimeoutTime, setAutoCommitTimeoutTime] = useState(0);

    const inviteLink = useMemo(() => {
        return "";
        // if (!gameId) return "";
        // return `${
        //     window.location.origin
        // }/btt/live?gameAddress=${gameAddress}&chainId=${chainId}&burner=${shortenAddressWithout0x(
        //     myInfo.burner,
        // )}`;
    }, []);

    const handleBoardClick = () => {
        setShowAnimateConfirm((number) => {
            return number + 1;
        });
    };

    const handleShareTw = () => {
        //         const text = `${
        //             window.location.host
        //         }/btt/live?gameAddress=${gameAddress}&chainId=${chainId}&burner=${shortenAddressWithout0x(
        //             myInfo.burner,
        //         )}
        // ⭕️❌⭕️❌Watch me play Bid tac toe and crush the opponent！⭕️❌⭕️❌
        // Bid tac toe, a fully on-chain PvP game of psychology and strategy, on ${
        //             CHAIN_NAMES[chainId]
        //         }
        // (Twitter)@skylabHQ`;
        //         window.open(
        //             `https://x.com/intent/post?text=${encodeURIComponent(text)}`,
        //         );
    };

    const handleCommitWorker = () => {
        if (commitWorkerRef.current) {
            commitWorkerRef.current.terminate();
        }
        if (!gameTimeout) {
            return;
        }
        commitWorkerRef.current = new Worker(
            new URL("../../utils/timerWorker.ts", import.meta.url),
        );
        commitWorkerRef.current.onmessage = async (event) => {
            const timeLeft = event.data;
            setTime(timeLeft);
        };
        const time = gameTimeout * 1000;
        const now = getNowSecondsTimestamp();
        const remainTime = time - now;
        if (remainTime > 0) {
            commitWorkerRef.current.postMessage({
                action: "start",
                timeToCount: remainTime,
            });
        } else {
            commitWorkerRef.current.postMessage({
                action: "stop",
            });
        }
    };

    useEffect(() => {
        handleCommitWorker();
    }, [gameTimeout]);

    useEffect(() => {
        if (isPc) {
            return;
        }

        const handleVisibilityChange = () => {
            if (document.hidden) {
                if (commitWorkerRef.current) {
                    commitWorkerRef.current.terminate();
                }
            } else {
                handleCommitWorker();
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange,
            );
        };
    }, [isPc]);

    return (
        <Box
            sx={{
                height: "100%",
            }}
        >
            {isPc ? (
                <Box
                    sx={{
                        padding: "1.4063vw 3.125vw",
                        position: "relative",
                        width: "100vw",
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                    }}
                    onClick={() => {
                        myGameInfo.gameState > 3 && handleStepChange(2);
                    }}
                >
                    <Flex flexDir={"column"} align={"center"}>
                        <Box
                            sx={{
                                height: "90px",
                            }}
                        >
                            <Timer
                                time1={time}
                                allTime={currentRound === 0 ? 3 * 60 : 60}
                                time1Gray={myGameInfo.isBid}
                            ></Timer>
                        </Box>
                    </Flex>
                    <ToolBar
                        inviteLink={inviteLink}
                        handleShareTw={handleShareTw}
                        quitType="game"
                        onQuitClick={() => {
                            onOpen();
                        }}
                    ></ToolBar>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "10vh",
                        }}
                    >
                        <Box
                            sx={{
                                width: "15.625vw",
                            }}
                        >
                            <MyUserCard
                                myIsBid={myGameInfo.isBid}
                                showAdvantageTip={false}
                                myGameState={myGameInfo.gameState}
                                markIcon={myGameInfo.mark}
                                address={myGameInfo.address}
                                balance={myGameInfo.balance}
                                bidAmount={bidAmount}
                                onInputChange={onBidAmount}
                                onConfirm={onBid}
                                planeUrl={""}
                                showAnimateConfirm={showAnimateConfirm}
                            ></MyUserCard>
                        </Box>

                        <Box onClick={handleBoardClick}>
                            <Board
                                list={list}
                                showAnimateNumber={showAnimateNumber}
                            ></Board>
                        </Box>
                        <Box
                            sx={{
                                width: "15.625vw",
                            }}
                        >
                            <OpUserCard
                                myIsBid={myGameInfo.isBid}
                                markIcon={opGameInfo.mark}
                                showAdvantageTip={false}
                                address={opGameInfo.address}
                                balance={opGameInfo?.balance}
                                bidAmount={0}
                                planeUrl={""}
                            ></OpUserCard>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <MLayout
                    inviteLink={inviteLink}
                    handleShareTw={handleShareTw}
                    autoCommitTimeoutTime={autoCommitTimeoutTime}
                    showAnimateNumber={showAnimateNumber}
                    bidAmount={bidAmount}
                    onInputChange={onBidAmount}
                    onConfirm={onBid}
                    handleQuitClick={() => {
                        onOpen();
                    }}
                    loading={loading}
                    handleBoardClick={handleBoardClick}
                    showAnimateConfirm={showAnimateConfirm}
                ></MLayout>
            )}

            <QuitModal
                onConfirm={handleQuit}
                isOpen={isOpen}
                onClose={onClose}
                quitType="game"
            ></QuitModal>
        </Box>
    );
};

export default TacToePage;
