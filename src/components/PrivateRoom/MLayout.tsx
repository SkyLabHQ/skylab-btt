import { usePvpGameContext } from "@/pages/PvpRoom";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { MMyPvpUserProfile, MOpPvpUserProfile } from "./UserProfile";
import Board from "../BttComponents/Board";
import Timer from "../BttComponents/Timer";
import ToolBar from "../BttComponents/Toolbar";
import PvpBottomInputBox from "../BttComponents/PvpBottomInputBox";
import getNowSecondsTimestamp from "@/utils/nowTime";

const MLayout = ({
    currentRound,
    gameTimeout,
    handleQuitClick,
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
                quitType="game"
                showShare={false}
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
                    <MOpPvpUserProfile
                        userGameInfo={opGameInfo}
                    ></MOpPvpUserProfile>
                </Flex>
            </Flex>
            <Box
                sx={{
                    width: "270px",
                    margin: "0 auto",
                }}
            >
                <Timer
                    time1={time}
                    allTime={currentRound === 0 ? 3 * 60 : 60}
                    time1Gray={myGameInfo.isBid}
                ></Timer>
            </Box>
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
                    <Flex
                        sx={{
                            position: "absolute",
                            bottom: "16px",
                            right: "16px",
                        }}
                        flexDir={"column"}
                        align={"flex-end"}
                    >
                        <MMyPvpUserProfile
                            userGameInfo={myGameInfo}
                        ></MMyPvpUserProfile>
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
