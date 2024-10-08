import { MyUserCard, OpUserCard } from "@/components/BttComponents/UserCard";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Board from "@/components/BttComponents/Board";
import { useBttGameRetryPaymaster } from "@/hooks/useRetryContract";
import { ethers } from "ethers";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import {
    useAddBttTransaction,
    useDeleteTokenIdCommited,
    useGridCommited,
} from "@/hooks/useTacToeStore";
import { GameInfo, GameState, Info } from "@/skyConstants/bttGameTypes";
import getNowSecondsTimestamp from "@/utils/nowTime";
import QuitModal from "../BttComponents/QuitModal";
import MLayout from "./MLayout";
import { CHAIN_NAMES, TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import Timer from "../BttComponents/Timer";
import ToolBar from "../BttComponents/Toolbar";
import { shortenAddressWithout0x } from "@/utils";
import StatusProgress from "../BttComponents/StatusProgress";
import { getBotGameSigner } from "@/hooks/useSigner";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";

interface TacToeProps {
    showAnimateNumber: number;
    currentGrid: number;
    nextDrawWinner: string;
    handleGetGameInfo: () => void;
    onChangeGame: (position: "my" | "op", info: GameInfo) => void;
    myInfo: Info;
    opInfo: Info;
    myGameInfo: GameInfo;
    opGameInfo: GameInfo;
    gameAddress: string;
    tokenId: number;
    list: any[];
    onStep: (step: number) => void;
}

const TacToePage = ({
    showAnimateNumber,
    currentGrid,
    nextDrawWinner,
    onChangeGame,
    myInfo,
    opInfo,
    myGameInfo,
    opGameInfo,
    gameAddress,
    tokenId,
    list,
    onStep,
}: TacToeProps) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    const toast = useSkyToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const commitWorkerRef = useRef<Worker>(null);
    const [showAnimateConfirm, setShowAnimateConfirm] = useState(0);
    const [revealing, setRevealing] = useState<boolean>(false);
    const [bidAmount, setBidAmount] = useState<number>(0);
    const [surrenderLoading, setSurrenderLoading] = useState<boolean>(false);

    const botGameSigner = getBotGameSigner(gameAddress);

    const { getGridCommited, addGridCommited } = useGridCommited(
        tokenId,
        currentGrid,
    );

    const addBttTransaction = useAddBttTransaction(tokenId);
    const tacToeGameRetryPaymaster = useBttGameRetryPaymaster(gameAddress, {
        privateKey: botGameSigner?.privateKey,
    });
    const deleteTokenIdCommited = useDeleteTokenIdCommited(tokenId);
    const [loading, setLoading] = useState<boolean>(false);
    const [autoCommitTimeoutTime, setAutoCommitTimeoutTime] = useState(0);

    const inviteLink = useMemo(() => {
        if (!gameAddress) return "";

        return `${
            window.location.origin
        }/btt/live?gameAddress=${gameAddress}&chainId=${TESTFLIGHT_CHAINID}&burner=${shortenAddressWithout0x(
            myInfo.burner,
        )}`;
    }, [gameAddress, myInfo]);

    const handleBoardClick = () => {
        setShowAnimateConfirm((number) => {
            return number + 1;
        });
    };

    const handleShareTw = () => {
        const text = `${
            window.location.host
        }/btt/live?gameAddress=${gameAddress}&chainId=${TESTFLIGHT_CHAINID}&burner=${shortenAddressWithout0x(
            myInfo.burner,
        )}
⭕️❌⭕️❌Watch me play Bid tac toe and crush the opponent！⭕️❌⭕️❌
Bid tac toe, a fully on-chain PvP game of psychology and strategy, on ${
            CHAIN_NAMES[TESTFLIGHT_CHAINID]
        }
(Twitter)@skylabHQ`;

        window.open(
            `https://x.com/intent/post?text=${encodeURIComponent(text)}`,
        );
    };

    const handleBidAmount = (value: number) => {
        if (loading) return;
        if (myGameInfo.gameState !== GameState.WaitingForBid) return;

        if (value < 0) return;
        if (value > myGameInfo.balance) return;
        setBidAmount(value);
    };

    const handleBid = useCallback(async () => {
        try {
            if (currentGrid < 0) return;
            if (loading) return;
            if (myGameInfo.gameState !== GameState.WaitingForBid) return;
            setLoading(true);
            const localSalt = getGridCommited();
            const salt = localSalt?.salt
                ? localSalt?.salt
                : Math.floor(Math.random() * 9000000000000000) +
                  1000000000000000;
            if (!localSalt?.salt) {
                addGridCommited(bidAmount, salt, false);
            }
            const hash = ethers.utils.solidityKeccak256(
                ["uint256", "uint256"],
                [String(bidAmount), String(salt)],
            );
            console.log(
                `currentGrid: ${currentGrid} bidAmount: ${bidAmount}, salt: ${salt}, hash: ${hash}`,
            );

            await tacToeGameRetryPaymaster("commitBid", [hash]);
            onChangeGame("my", {
                ...myGameInfo,
                gameState: GameState.Commited,
            });
            addGridCommited(bidAmount, salt, true);
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
            toast(handleError(e, true));
        }
    }, [
        currentGrid,
        loading,
        myGameInfo,
        addGridCommited,
        bidAmount,
        tacToeGameRetryPaymaster,
        getGridCommited,
    ]);

    const handleRevealedBid = async () => {
        try {
            const localSalt = getGridCommited();
            if (!localSalt) return;
            const { salt, amount } = localSalt;
            setRevealing(true);
            await tacToeGameRetryPaymaster(
                "revealBid",
                [amount, Number(salt)],
                {
                    gasLimit: 7000000,
                },
            );
            onChangeGame("my", {
                ...myGameInfo,
                gameState: GameState.Revealed,
            });
            setRevealing(false);
            setBidAmount(0);
        } catch (e) {
            setRevealing(false);
            console.log(e);
            toast(handleError(e, true));
        }
    };

    // game over
    const handleGameOver = async () => {
        if (myGameInfo.gameState <= GameState.Revealed) return;
        deleteTokenIdCommited();
        onStep(1);
    };

    const handleQuit = async () => {
        if (surrenderLoading) {
            return;
        }
        try {
            setSurrenderLoading(true);
            await tacToeGameRetryPaymaster("surrender", [], {
                gasLimit: 4000000,
                clearQueue: true,
            });
            setSurrenderLoading(false);
        } catch (error) {
            setSurrenderLoading(false);
            console.log(error);
            toast(handleError(error, true));
        }
    };

    const handleCommitWorker = () => {
        if (commitWorkerRef.current) {
            commitWorkerRef.current.terminate();
        }
        if ((!myGameInfo.timeout && !opGameInfo.timeout) || !gameAddress) {
            return;
        }
        commitWorkerRef.current = new Worker(
            new URL("../../utils/timerWorker.ts", import.meta.url),
        );
        commitWorkerRef.current.onmessage = async (event) => {
            const timeLeft = event.data;
            setAutoCommitTimeoutTime(timeLeft);
        };
        const time = Math.max(myGameInfo.timeout, opGameInfo.timeout) * 1000;
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
        handleGameOver();
    }, [myGameInfo.gameState, deleteTokenIdCommited, addBttTransaction]);

    useEffect(() => {
        handleCommitWorker();
    }, [myGameInfo.timeout, opGameInfo.timeout]);

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
                        justifyContent:
                            myGameInfo.gameState <= GameState.Revealed
                                ? "space-between"
                                : "flex-start",
                    }}
                    onClick={() => {
                        myGameInfo.gameState > 3 && onStep(2);
                    }}
                >
                    <Flex flexDir={"column"} align={"center"}>
                        <Box
                            sx={{
                                height: "90px",
                            }}
                        >
                            {myGameInfo.gameState <= GameState.Revealed && (
                                <Timer
                                    time1={autoCommitTimeoutTime}
                                    time1Gray={
                                        loading ||
                                        revealing ||
                                        (myGameInfo.gameState ===
                                            GameState.Commited &&
                                            opGameInfo.gameState ===
                                                GameState.WaitingForBid) ||
                                        myGameInfo.gameState ===
                                            GameState.Revealed
                                    }
                                ></Timer>
                            )}
                        </Box>

                        <StatusProgress
                            myGameState={myGameInfo.gameState}
                            opGameState={opGameInfo.gameState}
                        ></StatusProgress>
                    </Flex>
                    <ToolBar
                        quitType="game"
                        showShare={false}
                        onQuitClick={() => {
                            onOpen();
                        }}
                    ></ToolBar>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box
                            sx={{
                                width: "15.625vw",
                            }}
                        >
                            <MyUserCard
                                loading={loading}
                                revealing={revealing}
                                showAdvantageTip={
                                    myInfo.burner === nextDrawWinner
                                }
                                myGameState={myGameInfo.gameState}
                                opGameState={opGameInfo.gameState}
                                level={myInfo.level}
                                markIcon={myInfo.mark}
                                address={myInfo.address}
                                balance={myGameInfo.balance}
                                bidAmount={bidAmount}
                                onConfirm={handleBid}
                                onReveal={handleRevealedBid}
                                onInputChange={handleBidAmount}
                                planeUrl={myInfo.img}
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
                                markIcon={opInfo.mark}
                                level={opInfo.level}
                                showAdvantageTip={
                                    opInfo.burner === nextDrawWinner
                                }
                                opGameState={opGameInfo.gameState}
                                address={opInfo.address}
                                balance={opGameInfo?.balance}
                                bidAmount={
                                    list.length > 0 && currentGrid >= 0
                                        ? list[currentGrid].opValue
                                        : 0
                                }
                                planeUrl={opInfo.img}
                            ></OpUserCard>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <MLayout
                    myGameInfo={myGameInfo}
                    opGameInfo={opGameInfo}
                    myInfo={myInfo}
                    opInfo={opInfo}
                    list={list}
                    inviteLink={inviteLink}
                    handleShareTw={handleShareTw}
                    nextDrawWinner={nextDrawWinner}
                    autoCommitTimeoutTime={autoCommitTimeoutTime}
                    showAnimateNumber={showAnimateNumber}
                    bidAmount={bidAmount}
                    onInputChange={handleBidAmount}
                    onConfirm={handleBid}
                    onReveal={handleRevealedBid}
                    handleQuitClick={() => {
                        onOpen();
                    }}
                    loading={loading}
                    revealing={revealing}
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
