import { MyUserCard, OpUserCard } from "@/components/TacToe/UserCard";
import { Box, Flex, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import Board from "@/components/TacToe/Board";
import { useBlockNumber } from "@/contexts/BlockNumber";
import { useBttGameRetry } from "@/hooks/useRetryContract";
import { GameType, MyNewInfo, useGameContext } from "@/pages/TacToe";
import { ethers } from "ethers";
import {
    useMultiProvider,
    useMultiSkylabBidTacToeGameContract,
    useMultiMercuryBaseContract,
} from "@/hooks/useMultiContract";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import {
    useAddBttTransaction,
    useDeleteTokenIdCommited,
    useGridCommited,
} from "@/hooks/useTacToeStore";
import { ZERO_DATA } from "@/skyConstants";
import {
    GameInfo,
    GameState,
    MessageStatus,
    UserMarkType,
    getWinState,
    winPatterns,
} from "@/skyConstants/bttGameTypes";
import getNowSecondsTimestamp from "@/utils/nowTime";
import QuitModal from "../BttComponents/QuitModal";
import MLayout from "./MLayout";
import { CHAIN_NAMES } from "@/utils/web3Utils";
import Timer from "../BttComponents/Timer";
import ToolBar from "../BttComponents/Toolbar";
import Chat from "../BttComponents/Chat";
import { shortenAddressWithout0x } from "@/utils";
import StatusProgress from "../BttComponents/StatusProgress";

interface TacToeProps {
    onChangeGame: (position: "my" | "op", info: GameInfo) => void;
    onChangeNewInfo: (info: MyNewInfo) => void;
}

const TacToePage = ({ onChangeGame, onChangeNewInfo }: TacToeProps) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const toast = useSkyToast();

    const {
        istest,
        myInfo,
        opInfo,
        myGameInfo,
        opGameInfo,
        bidTacToeGameAddress,
        tokenId,
        list,
        onList,
        myActivePilot,
        opActivePilot,
        onStep,
        gameType,
        realChainId,
        handleGetGas,
    } = useGameContext();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const commitWorkerRef = useRef<Worker>(null);
    const revealWorkerRef = useRef<Worker>(null);
    const callTimeoutWorkerRef = useRef<Worker>(null);

    const [showAnimateConfirm, setShowAnimateConfirm] = useState(0);
    const [showAnimateNumber, setShowAnimate] = useState<number>(-1);
    const { blockNumber } = useBlockNumber();
    const [revealing, setRevealing] = useState<boolean>(false);
    const [currentGrid, setCurrentGrid] = useState<number>(-1);
    const [bidAmount, setBidAmount] = useState<number>(0);
    const [nextDrawWinner, setNextDrawWinner] = useState<string>("");
    const [surrenderLoading, setSurrenderLoading] = useState<boolean>(false);
    const [messageLoading, setMessageLoading] = useState<MessageStatus>(
        MessageStatus.Unknown,
    );

    const [emoteLoading, setEmoteLoading] = useState<MessageStatus>(
        MessageStatus.Unknown,
    );

    const [messageIndex, setMessageIndex] = useState<number>(0);
    const [emoteIndex, setEmoteIndex] = useState<number>(0);

    const { getGridCommited, addGridCommited } = useGridCommited(
        tokenId,
        currentGrid,
    );

    const addBttTransaction = useAddBttTransaction(tokenId);
    const tacToeGameRetryWrite = useBttGameRetry(bidTacToeGameAddress, tokenId);
    const deleteTokenIdCommited = useDeleteTokenIdCommited(tokenId);
    const multiSkylabBidTacToeGameContract =
        useMultiSkylabBidTacToeGameContract(bidTacToeGameAddress);
    const multiMercuryBaseContract = useMultiMercuryBaseContract();

    const ethcallProvider = useMultiProvider(realChainId);
    const [loading, setLoading] = useState<boolean>(false);
    const [autoCommitTimeoutTime, setAutoCommitTimeoutTime] = useState(0);

    const inviteLink = useMemo(() => {
        if (!bidTacToeGameAddress) return "";

        return `${
            window.location.origin
        }/btt/live?gameAddress=${bidTacToeGameAddress}&chainId=${realChainId}&burner=${shortenAddressWithout0x(
            myInfo.burner,
        )}`;
    }, [bidTacToeGameAddress, myInfo]);

    const handleBoardClick = () => {
        setShowAnimateConfirm((number) => {
            return number + 1;
        });
    };

    const handleShareTw = () => {
        const text = `${
            window.location.host
        }/btt/live?gameAddress=${bidTacToeGameAddress}&chainId=${realChainId}&burner=${shortenAddressWithout0x(
            myInfo.burner,
        )}
⭕️❌⭕️❌Watch me play Bid tac toe and crush the opponent！⭕️❌⭕️❌
Bid tac toe, a fully on-chain PvP game of psychology and strategy, on ${
            CHAIN_NAMES[realChainId]
        }
(Twitter)@skylabHQ`;

        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
        );
    };

    const handleGetGameInfo = async () => {
        try {
            const [
                resCurrentGrid,
                boardGrids,
                myBalance,
                myGameState,
                myRevealedBid,
                myTimeout,
                myMessage,
                myEmote,
                opBalance,
                opGameState,
                opRevealedBid,
                opTimeout,
                opMessage,
                opEmote,
                nextDrawWinner,
            ] = await ethcallProvider.all([
                multiSkylabBidTacToeGameContract.currentSelectedGrid(),
                multiSkylabBidTacToeGameContract.getGrid(),
                multiSkylabBidTacToeGameContract.balances(myInfo.burner),
                multiSkylabBidTacToeGameContract.gameStates(myInfo.burner),
                multiSkylabBidTacToeGameContract.getRevealedBids(myInfo.burner),
                multiSkylabBidTacToeGameContract.timeouts(myInfo.burner),
                multiSkylabBidTacToeGameContract.playerMessage(myInfo.burner),
                multiSkylabBidTacToeGameContract.playerEmote(myInfo.burner),
                multiSkylabBidTacToeGameContract.balances(opInfo.burner),
                multiSkylabBidTacToeGameContract.gameStates(opInfo.burner),
                multiSkylabBidTacToeGameContract.getRevealedBids(opInfo.burner),
                multiSkylabBidTacToeGameContract.timeouts(opInfo.burner),
                multiSkylabBidTacToeGameContract.playerMessage(opInfo.burner),
                multiSkylabBidTacToeGameContract.playerEmote(opInfo.burner),
                multiSkylabBidTacToeGameContract.nextDrawWinner(),
            ]);

            if (showAnimateNumber === -1) {
                setShowAnimate(resCurrentGrid.toNumber());
            } else if (resCurrentGrid.toNumber() !== currentGrid) {
                setShowAnimate(currentGrid);
            }
            const _list = JSON.parse(JSON.stringify(list));
            const gameState = myGameState.toNumber();
            for (let i = 0; i < boardGrids.length; i++) {
                if (boardGrids[i] === ZERO_DATA) {
                    _list[i].mark = UserMarkType.Empty;
                } else if (boardGrids[i] === myInfo.burner) {
                    _list[i].mark = myInfo.mark;
                } else if (boardGrids[i] === opInfo.burner) {
                    _list[i].mark = opInfo.mark;
                }
                _list[i].myValue = myRevealedBid[i].toNumber();
                _list[i].opValue = opRevealedBid[i].toNumber();
                _list[i].myMark = myInfo.mark;
                _list[i].opMark = opInfo.mark;
            }
            if (
                [
                    GameState.WaitingForBid,
                    GameState.Commited,
                    GameState.Revealed,
                ].includes(gameState)
            ) {
                _list[resCurrentGrid.toNumber()].mark = UserMarkType.Square;
            }

            // game over result
            if (gameState > GameState.Revealed) {
                const myIsWin = getWinState(gameState);
                const burner = myIsWin ? myInfo.burner : opInfo.burner;
                let mark;
                if (myIsWin) {
                    mark =
                        myInfo.mark === UserMarkType.Circle
                            ? UserMarkType.YellowCircle
                            : myInfo.mark === UserMarkType.Cross
                            ? UserMarkType.YellowCross
                            : UserMarkType.YellowBotX;
                } else {
                    mark =
                        opInfo.mark === UserMarkType.Circle
                            ? UserMarkType.YellowCircle
                            : opInfo.mark === UserMarkType.Cross
                            ? UserMarkType.YellowCross
                            : UserMarkType.YellowBotX;
                }
                if (
                    gameState === GameState.WinByConnecting ||
                    gameState === GameState.LoseByConnecting
                ) {
                    for (let i = 0; i < winPatterns.length; i++) {
                        const index0 = winPatterns[i][0];
                        const index1 = winPatterns[i][1];
                        const index2 = winPatterns[i][2];
                        if (
                            boardGrids[index0] === burner &&
                            boardGrids[index1] === burner &&
                            boardGrids[index2] === burner
                        ) {
                            _list[index0].mark = mark;
                            _list[index1].mark = mark;
                            _list[index2].mark = mark;
                            break;
                        }
                    }
                } else {
                    for (let i = 0; i < boardGrids.length; i++) {
                        if (boardGrids[i] === burner) {
                            _list[i].mark = mark;
                        }
                    }
                }
            }
            setCurrentGrid(resCurrentGrid.toNumber());
            onList(_list);
            onChangeGame("my", {
                balance: myBalance.toNumber(),
                gameState: myGameState.toNumber(),
                timeout: myTimeout.toNumber(),
                message: myMessage.toNumber(),
                emote: myEmote.toNumber(),
            });

            onChangeGame("op", {
                balance: opBalance.toNumber(),
                gameState: opGameState.toNumber(),
                timeout: opTimeout.toNumber(),
                message: opMessage.toNumber(),
                emote: opEmote.toNumber(),
            });
            setNextDrawWinner(nextDrawWinner);
        } catch (e) {
            console.log(e);
        }
    };

    const handleCallTimeOut = async () => {
        const [myGameStateHex, opGameStateHex] = await ethcallProvider.all([
            multiSkylabBidTacToeGameContract.gameStates(myInfo.burner),
            multiSkylabBidTacToeGameContract.gameStates(opInfo.burner),
        ]);

        const myGameState = myGameStateHex.toNumber();
        const opGameState = opGameStateHex.toNumber();

        if (
            myGameState === GameState.Unknown ||
            opGameState === GameState.Unknown
        ) {
            return;
        }

        if (myGameState > GameState.Revealed) {
            return;
        }
        if (myGameState < opGameState) {
            return;
        }

        if (gameType === GameType.HumanWithBot) {
            handleQuit();
            return;
        }

        try {
            await tacToeGameRetryWrite("claimTimeoutPenalty", [], {
                gasLimit: 5000000,
                usePaymaster: istest,
            });
            handleGetGameInfo();
        } catch (e) {
            console.log(e);
            toast(handleError(e, istest));
        }
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
            if (loading) return;
            if (myGameInfo.gameState !== GameState.WaitingForBid) return;

            setLoading(true);
            const localSalt = getGridCommited();
            const salt = localSalt?.salt
                ? localSalt?.salt
                : Math.floor(Math.random() * 10000000) + 100000;
            if (!localSalt?.salt) {
                addGridCommited(bidAmount, salt, false);
            }

            const hash = ethers.utils.solidityKeccak256(
                ["uint256", "uint256"],
                [bidAmount, salt],
            );
            console.log(
                `currentGird: ${currentGrid} bidAmount: ${bidAmount}, salt: ${salt}, hash: ${hash}`,
            );

            await tacToeGameRetryWrite("commitBid", [hash], {
                gasLimit: 1000000,
                usePaymaster: istest,
            });
            onChangeGame("my", {
                ...myGameInfo,
                gameState: GameState.Commited,
            });
            addGridCommited(bidAmount, salt, true);
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
            toast(handleError(e, istest));
        }
    }, [
        currentGrid,
        loading,
        myGameInfo,
        addGridCommited,
        bidAmount,
        gameType,
        tacToeGameRetryWrite,
        getGridCommited,
    ]);

    const handleRevealedBid = async () => {
        try {
            const localSalt = getGridCommited();
            if (!localSalt) return;
            const { salt, amount } = localSalt;
            setRevealing(true);
            await tacToeGameRetryWrite("revealBid", [amount, Number(salt)], {
                gasLimit: 1500000,
                usePaymaster: istest,
            });
            onChangeGame("my", {
                ...myGameInfo,
                gameState: GameState.Revealed,
            });
            setRevealing(false);
            setBidAmount(0);
        } catch (e) {
            setRevealing(false);
            console.log(e);
            toast(handleError(e, istest));
        }
    };

    useEffect(() => {
        if (
            !multiSkylabBidTacToeGameContract ||
            !blockNumber ||
            !ethcallProvider ||
            revealing ||
            myGameInfo.gameState > GameState.Revealed
        )
            return;

        handleGetGameInfo();
    }, [blockNumber, multiSkylabBidTacToeGameContract, ethcallProvider]);

    // game over
    const handleGameOver = async () => {
        if (myGameInfo.gameState <= GameState.Revealed) return;
        deleteTokenIdCommited();
        onStep(3);

        const gameResult = getWinState(myGameInfo.gameState);

        if (gameType === GameType.HumanWithBot) {
        } else {
            handleGetGas();
            try {
                const [level, point] = await ethcallProvider.all([
                    multiMercuryBaseContract.aviationLevels(tokenId),
                    multiMercuryBaseContract.aviationPoints(tokenId),
                ]);
                onChangeNewInfo({
                    point: point.toNumber(),
                    level: level.toNumber(),
                });
                addBttTransaction({
                    account: myInfo.address,
                    burner: myInfo.burner,
                    gameAddress: bidTacToeGameAddress,
                    oldLevel: myInfo.level,
                    newLevel: level.toNumber(),
                    oldPoint: myInfo.point,
                    newPoint: point.toNumber(),
                    win: gameResult,
                });
            } catch (e) {
                onChangeNewInfo({
                    point: 0,
                    level: 0,
                });
                addBttTransaction({
                    account: myInfo.address,
                    burner: myInfo.burner,
                    gameAddress: bidTacToeGameAddress,
                    oldLevel: myInfo.level,
                    newLevel: 0,
                    oldPoint: myInfo.point,
                    newPoint: 0,
                    win: gameResult,
                });
            }
        }
    };

    const handleSetMessage = async (
        type: "setMessage" | "setEmote",
        index: number,
    ) => {
        try {
            if (type === "setMessage") {
                if (messageLoading === MessageStatus.Sending) {
                    return;
                } else {
                    setMessageLoading(MessageStatus.Sending);
                    setMessageIndex(index);
                }
            }

            if (type === "setEmote") {
                if (emoteLoading === MessageStatus.Sending) {
                    return;
                } else {
                    setEmoteLoading(MessageStatus.Sending);
                    setEmoteIndex(index);
                }
            }

            await tacToeGameRetryWrite(type, [index], {
                usePaymaster: istest,
            });
            if (type === "setMessage") {
                setMessageLoading(MessageStatus.Sent);
                setMessageIndex(index);
            } else {
                setEmoteLoading(MessageStatus.Sent);
                setEmoteIndex(index);
            }
        } catch (e) {
            console.log(e);
            if (type === "setMessage") {
                setMessageLoading(MessageStatus.Unknown);
                setMessageIndex(index);
            } else {
                setEmoteLoading(MessageStatus.Unknown);
                setEmoteIndex(index);
            }
            toast(handleError(e));
        }
    };

    const handleQuit = async () => {
        if (surrenderLoading) {
            return;
        }
        try {
            setSurrenderLoading(true);
            await tacToeGameRetryWrite("surrender", [], {
                gasLimit: 4000000,
                usePaymaster: istest,
                clearQueue: true,
            });
            setSurrenderLoading(false);
        } catch (error) {
            setSurrenderLoading(false);
            console.log(error);
            toast(handleError(error, istest));
        }
    };

    const handleCommitWorker = () => {
        if (commitWorkerRef.current) {
            commitWorkerRef.current.terminate();
        }
        if (
            (!myGameInfo.timeout && !opGameInfo.timeout) ||
            !bidTacToeGameAddress
        ) {
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

    const handleCallTimeoutWorkerRef = () => {
        if (callTimeoutWorkerRef.current) {
            callTimeoutWorkerRef.current.terminate();
        }
        if (
            !opGameInfo.timeout ||
            !opGameInfo.gameState ||
            !myGameInfo.gameState
        ) {
            return;
        }
        const now = getNowSecondsTimestamp();
        const autoCallTimeoutTime =
            opGameInfo.timeout * 1000 - now > 0
                ? opGameInfo.timeout * 1000 - now
                : 0;

        callTimeoutWorkerRef.current = new Worker(
            new URL("../../utils/timerWorker.ts", import.meta.url),
        );

        callTimeoutWorkerRef.current.onmessage = async (event) => {
            const timeLeft = event.data;
            if (timeLeft === 0) {
                handleCallTimeOut();
            }
        };
        if (autoCallTimeoutTime === 0) {
            handleCallTimeOut();
        } else {
            callTimeoutWorkerRef.current.postMessage({
                action: "start",
                timeToCount: autoCallTimeoutTime,
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
        handleCallTimeoutWorkerRef();
    }, [opGameInfo.timeout, opGameInfo.gameState, myGameInfo.gameState]);

    useEffect(() => {
        if (isPc) {
            return;
        }

        const handleVisibilityChange = () => {
            if (document.hidden) {
                if (commitWorkerRef.current) {
                    commitWorkerRef.current.terminate();
                }
                if (revealWorkerRef.current) {
                    revealWorkerRef.current.terminate();
                }

                if (callTimeoutWorkerRef.current) {
                    callTimeoutWorkerRef.current.terminate();
                }
            } else {
                handleCommitWorker();
                handleCallTimeoutWorkerRef();
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
                        myGameInfo.gameState > 3 && onStep(3);
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
                        }}
                    >
                        <Box
                            sx={{
                                width: "15.625vw",
                            }}
                        >
                            <MyUserCard
                                pilotInfo={myActivePilot}
                                loading={loading}
                                revealing={revealing}
                                messageLoading={messageLoading}
                                emoteLoading={emoteLoading}
                                showAdvantageTip={
                                    myInfo.burner === nextDrawWinner
                                }
                                myGameState={myGameInfo.gameState}
                                opGameState={opGameInfo.gameState}
                                message={myGameInfo.message}
                                emote={myGameInfo.emote}
                                level={myInfo.level}
                                messageIndex={messageIndex}
                                emoteIndex={emoteIndex}
                                markIcon={myInfo.mark}
                                address={myInfo.address}
                                balance={myGameInfo.balance}
                                bidAmount={bidAmount}
                                onConfirm={handleBid}
                                onReveal={handleRevealedBid}
                                onInputChange={handleBidAmount}
                                status="my"
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
                                pilotInfo={opActivePilot}
                                markIcon={opInfo.mark}
                                level={opInfo.level}
                                showAdvantageTip={
                                    opInfo.burner === nextDrawWinner
                                }
                                myGameState={myGameInfo.gameState}
                                opGameState={opGameInfo.gameState}
                                message={opGameInfo.message}
                                emote={opGameInfo.emote}
                                address={opInfo.address}
                                balance={opGameInfo?.balance}
                                bidAmount={
                                    list.length > 0 && currentGrid >= 0
                                        ? list[currentGrid].opValue
                                        : 0
                                }
                                status="op"
                                planeUrl={opInfo.img}
                            ></OpUserCard>
                        </Box>
                    </Box>
                    <Chat onSetMessage={handleSetMessage}></Chat>
                </Box>
            ) : (
                <MLayout
                    inviteLink={inviteLink}
                    handleShareTw={handleShareTw}
                    nextDrawWinner={nextDrawWinner}
                    autoCommitTimeoutTime={autoCommitTimeoutTime}
                    showAnimateNumber={showAnimateNumber}
                    bidAmount={bidAmount}
                    onInputChange={handleBidAmount}
                    onConfirm={handleBid}
                    onSetMessage={handleSetMessage}
                    onReveal={handleRevealedBid}
                    emoteIndex={emoteIndex}
                    messageIndex={messageIndex}
                    messageLoading={messageLoading}
                    emoteLoading={emoteLoading}
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
