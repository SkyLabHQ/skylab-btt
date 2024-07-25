import { usePvpGameContext } from "@/pages/PvpRoom";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { MUserProfilePvp } from "./UserProfile";
import { MPvpBalance } from "../BttComponents/MBalance";
import Board from "../BttComponents/Board";
import Timer from "../BttComponents/Timer";
import ToolBar from "../BttComponents/Toolbar";
import PvpBottomInputBox from "../BttComponents/PvpBottomInputBox";
import getNowSecondsTimestamp from "@/utils/nowTime";

const MLayout = ({
    currentRound,
    gameTimeout,
    inviteLink,
    handleQuitClick,
    handleShareTw,
    bidAmount,
    showAnimateNumber,
    onInputChange,
    onConfirm,
    loading,
    handleBoardClick,
    showAnimateConfirm,
}: any) => {
    const [time, setTime] = useState(0);
    const commitWorkerRef = useRef<Worker>(null);
    const { myGameInfo, opGameInfo, list } = usePvpGameContext();
    const myIsBid = myGameInfo.isBid;

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
    }, []);

    return (
        <Box
            sx={{
                position: "relative",
                paddingTop: "100px",
                height: "100%",
            }}
        >
            <ToolBar
                showLive={false}
                inviteLink={inviteLink}
                quitType="game"
                handleShareTw={handleShareTw}
                onQuitClick={handleQuitClick}
            ></ToolBar>
            <Flex
                sx={{
                    position: "absolute",
                    top: "12px",
                    left: "16px",
                    alignItems: "flex-start",
                }}
                flexDir={"column"}
            >
                <Flex align={"flex-end"}>
                    <MUserProfilePvp
                        address={""}
                        status="op"
                        mark={opGameInfo.mark}
                    ></MUserProfilePvp>
                </Flex>

                <MPvpBalance
                    balance={opGameInfo.balance}
                    mark={opGameInfo.mark}
                ></MPvpBalance>
            </Flex>

            <Flex
                align={"center"}
                justify={"center"}
                flexDir={"column"}
                sx={{
                    marginTop: "36px",
                }}
            >
                <Box
                    sx={{
                        marginTop: "20px",
                    }}
                    onClick={handleBoardClick}
                >
                    <Board
                        list={list}
                        showAnimateNumber={showAnimateNumber}
                    ></Board>
                </Box>
            </Flex>
            <Box
                sx={{
                    position: "fixed",
                    bottom: "0",
                    left: "0",
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        height: "100px",
                        position: "relative",
                    }}
                >
                    <Flex justify={"space-between"} align={"flex-end"}>
                        <Box
                            sx={{
                                width: "84px",
                                position: "absolute",
                                left: "12px",
                                bottom: "20px",
                            }}
                        >
                            <Timer
                                time1={time}
                                allTime={currentRound === 0 ? 3 * 60 : 60}
                                time1Gray={loading || myGameInfo.isBid}
                            ></Timer>
                        </Box>
                    </Flex>
                    <Flex
                        sx={{
                            position: "absolute",
                            bottom: "16px",
                            right: "16px",
                        }}
                        flexDir={"column"}
                        align={"flex-end"}
                    >
                        <MPvpBalance
                            balance={myGameInfo.balance}
                            status="right"
                            mark={myGameInfo.mark}
                        ></MPvpBalance>
                    </Flex>
                </Box>
                <PvpBottomInputBox
                    showAnimateConfirm={showAnimateConfirm}
                    myBalance={myGameInfo.balance}
                    bidAmount={bidAmount}
                    myIsBid={myIsBid}
                    loading={loading}
                    onIuputAmount={(amount: number) => {
                        onInputChange(amount);
                    }}
                    onSubClick={() => {
                        if (Number(bidAmount) - 1 < 0) return;
                        onInputChange(Number(bidAmount) - 1);
                    }}
                    onAddClick={() => {
                        if (
                            Number(bidAmount) + 1 <=
                            Number(myGameInfo.balance)
                        ) {
                            onInputChange(Number(bidAmount) + 1);
                        }
                    }}
                    onConfirm={onConfirm}
                ></PvpBottomInputBox>
            </Box>
        </Box>
    );
};

export default MLayout;
