import { MyBid, OpBid } from "./UserBid";
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
import { ethers } from "ethers";
import {
    useMultiProvider,
    useMultiSkylabBidTacToeGameContract,
} from "@/hooks/useMultiContract";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import {
    useDeleteTokenIdCommited,
    useGridCommited,
} from "@/hooks/useTacToeStore";
import { ZERO_DATA } from "@/skyConstants";
import { usePrivateGameContext } from "@/pages/PrivateRoom";
import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import UserProfile from "./UserProfile";
import {
    GameInfo,
    GameState,
    MessageStatus,
    UserMarkType,
    getWinState,
    winPatterns,
} from "@/skyConstants/bttGameTypes";
import { getPrivateLobbySigner } from "@/hooks/useSigner";
import { Message } from "./Message";
import MLayout from "./MLayout";
import getNowSecondsTimestamp from "@/utils/nowTime";
import QuitModal from "../BttComponents/QuitModal";
import Timer from "../BttComponents/Timer";
import ToolBar from "../BttComponents/Toolbar";
import Chat from "../BttComponents/Chat";
import StatusProgress from "../BttComponents/StatusProgress";

const PlayGame = ({
    onChangeGame,
}: {
    onChangeGame: (position: "my" | "op", info: GameInfo) => void;
}) => {
    const [showAnimateConfirm, setShowAnimateConfirm] = useState(0);

    const commitWorkerRef = useRef<Worker>(null);
    const callTimeoutWorkerRef = useRef<Worker>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [loading, setLoading] = useState<boolean>(false);
    const [surrenderLoading, setSurrenderLoading] = useState<boolean>(false);
    const toast = useSkyToast();
    const [currentGrid, setCurrentGrid] = useState<number>(-1);
    const [autoCommitTimeoutTime, setAutoCommitTimeoutTime] = useState(0);

    const {
        myGameInfo,
        opGameInfo,
        bidTacToeGameAddress,
        myInfo,
        lobbyAddress,
        opInfo,
        list,
        onList,
        handleStepChange,
    } = usePrivateGameContext();

    const tacToeGameRetryWrite = useBttGameRetry(bidTacToeGameAddress);

    const deleteTokenIdCommited =
        useDeleteTokenIdCommited(bidTacToeGameAddress);
    const [showAnimateNumber, setShowAnimate] = useState<number>(-1);
    const { blockNumber } = useBlockNumber();
    const [revealing, setRevealing] = useState<boolean>(false);
    const { getGridCommited, addGridCommited } = useGridCommited(
        bidTacToeGameAddress,
        currentGrid,
    );
    const [bidAmount, setBidAmount] = useState<number>(0);
    const [nextDrawWinner, setNextDrawWinner] = useState<string>("");
    const [messageLoading, setMessageLoading] = useState<MessageStatus>(
        MessageStatus.Unknown,
    );

    const gameOver = useMemo(() => {
        return myGameInfo.gameState > GameState.Revealed;
    }, [myGameInfo.gameState]);

    const multiProvider = useMultiProvider(TESTFLIGHT_CHAINID);

    const [emoteLoading, setEmoteLoading] = useState<MessageStatus>(
        MessageStatus.Unknown,
    );

    const [messageIndex, setMessageIndex] = useState<number>(0);
    const [emoteIndex, setEmoteIndex] = useState<number>(0);
    const multiSkylabBidTacToeGameContract =
        useMultiSkylabBidTacToeGameContract(bidTacToeGameAddress);

    const inviteLink = useMemo(() => {
        if (!bidTacToeGameAddress || !lobbyAddress) return "";

        return `${window.location.origin}/btt/lobbyLive?gameAddress=${bidTacToeGameAddress}&lobbyAddress=${lobbyAddress}`;
    }, [bidTacToeGameAddress, lobbyAddress]);

    const handleGetGameInfo = async () => {
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
        ] = await multiProvider.all([
            multiSkylabBidTacToeGameContract.currentSelectedGrid(),
            multiSkylabBidTacToeGameContract.getGrid(),
            multiSkylabBidTacToeGameContract.balances(myInfo.address),
            multiSkylabBidTacToeGameContract.gameStates(myInfo.address),
            multiSkylabBidTacToeGameContract.getRevealedBids(myInfo.address),
            multiSkylabBidTacToeGameContract.timeouts(myInfo.address),
            multiSkylabBidTacToeGameContract.playerMessage(myInfo.address),
            multiSkylabBidTacToeGameContract.playerEmote(myInfo.address),
            multiSkylabBidTacToeGameContract.balances(opInfo.address),
            multiSkylabBidTacToeGameContract.gameStates(opInfo.address),
            multiSkylabBidTacToeGameContract.getRevealedBids(opInfo.address),
            multiSkylabBidTacToeGameContract.timeouts(opInfo.address),
            multiSkylabBidTacToeGameContract.playerMessage(opInfo.address),
            multiSkylabBidTacToeGameContract.playerEmote(opInfo.address),
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
            } else if (boardGrids[i] === myInfo.address) {
                _list[i].mark = myInfo.mark;
            } else if (boardGrids[i] === opInfo.address) {
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
            const address = myIsWin ? myInfo.address : opInfo.address;
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
                        boardGrids[index0] === address &&
                        boardGrids[index1] === address &&
                        boardGrids[index2] === address
                    ) {
                        _list[index0].mark = mark;
                        _list[index1].mark = mark;
                        _list[index2].mark = mark;
                        break;
                    }
                }
            } else {
                for (let i = 0; i < boardGrids.length; i++) {
                    if (boardGrids[i] === address) {
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
    };

    const handleRevealedBid = async () => {
        try {
            const privateLobbySigner = getPrivateLobbySigner();
            const localSalt = getGridCommited();
            if (!localSalt) return;
            const { salt, amount } = localSalt;
            setRevealing(true);
            await tacToeGameRetryWrite("revealBid", [amount, Number(salt)], {
                usePaymaster: true,
                signer: privateLobbySigner,
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
            toast(handleError(e, true));
        }
    };

    const handleCallTimeOut = async () => {
        const [myGameStateHex, opGameStateHex] = await multiProvider.all([
            multiSkylabBidTacToeGameContract.gameStates(myInfo.address),
            multiSkylabBidTacToeGameContract.gameStates(opInfo.address),
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

        try {
            const privateLobbySigner = getPrivateLobbySigner();
            await tacToeGameRetryWrite("claimTimeoutPenalty", [], {
                usePaymaster: true,
                signer: privateLobbySigner,
            });
            handleGetGameInfo();
        } catch (e) {
            console.log(e);
            toast(handleError(e, true));
        }
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

            const privateLobbySigner = getPrivateLobbySigner();
            await tacToeGameRetryWrite("commitBid", [hash], {
                usePaymaster: true,
                signer: privateLobbySigner,
            });
            onChangeGame("my", {
                ...myGameInfo,
                gameState: GameState.Commited,
            });
            setLoading(false);
            addGridCommited(bidAmount, salt, true);
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
        tacToeGameRetryWrite,
        getGridCommited,
    ]);

    const handleBoardClick = () => {
        setShowAnimateConfirm((number) => {
            return number + 1;
        });
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

            const privateLobbySigner = getPrivateLobbySigner();
            await tacToeGameRetryWrite(type, [index], {
                usePaymaster: true,
                signer: privateLobbySigner,
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

    const handleBidAmount = (value: number) => {
        if (loading) return;
        if (myGameInfo.gameState !== GameState.WaitingForBid) return;

        if (value < 0) return;
        if (value > myGameInfo.balance) return;
        setBidAmount(value);
    };

    const handleQuit = async () => {
        if (surrenderLoading) {
            return;
        }
        try {
            setSurrenderLoading(true);
            const privateLobbySigner = getPrivateLobbySigner();
            await tacToeGameRetryWrite("surrender", [], {
                usePaymaster: true,
                signer: privateLobbySigner,
                clearQueue: true,
            });
            setSurrenderLoading(false);
        } catch (e) {
            setSurrenderLoading(false);
            console.log(e);
            toast(handleError(e, true));
        }
    };

    const handleGameOver = async () => {
        deleteTokenIdCommited();
        handleStepChange(2);
    };

    const handleShareTw = () => {
        const text = `⭕️❌⭕️❌Watch me crush the opponent！⭕️❌⭕️❌

${window.location.host}/btt/lobbyLive?gameAddress=${bidTacToeGameAddress}&lobbyAddress=${lobbyAddress}

bid tac toe, a fully on-chain PvP game of psychology and strategy, on@base 

@skylabHQ`;

        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
        );
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
        if (
            !myInfo.address ||
            !opInfo.address ||
            !multiSkylabBidTacToeGameContract ||
            !multiProvider ||
            revealing ||
            !blockNumber
        ) {
            return;
        }
        handleGetGameInfo();
    }, [
        myInfo.address,
        opInfo.address,
        blockNumber,
        multiSkylabBidTacToeGameContract,
        multiProvider,
    ]);

    useEffect(() => {
        if (!gameOver) return;
        handleGameOver();
    }, [gameOver, deleteTokenIdCommited]);

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
            style={{
                height: "100%",
            }}
        >
            {isPc ? (
                <Box
                    sx={{
                        padding: "1.4063vw 3.125vw",
                        position: "relative",
                        width: "100vw",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
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
                        quitType="game"
                        onQuitClick={() => {
                            onOpen();
                        }}
                        handleShareTw={handleShareTw}
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
                            <Flex>
                                <UserProfile
                                    status="my"
                                    avatar={myInfo.avatar}
                                    name={myInfo.name}
                                    mark={myInfo.mark}
                                    showAdvantageTip={
                                        myInfo.address === nextDrawWinner
                                    }
                                ></UserProfile>
                                <Box
                                    sx={{
                                        margin: "0.5208vw 0 0 0.5208vw",
                                    }}
                                >
                                    <Message
                                        message={myGameInfo.message}
                                        emote={myGameInfo.emote}
                                        messageLoading={messageLoading}
                                        emoteLoading={emoteLoading}
                                        status={"my"}
                                        emoteIndex={emoteIndex}
                                        messageIndex={messageIndex}
                                    ></Message>
                                </Box>
                            </Flex>

                            <MyBid
                                loading={loading}
                                myGameState={myGameInfo.gameState}
                                opGameState={opGameInfo.gameState}
                                balance={myGameInfo.balance}
                                bidAmount={bidAmount}
                                onConfirm={handleBid}
                                onInputChange={handleBidAmount}
                                onReveal={handleRevealedBid}
                                revealing={revealing}
                            ></MyBid>
                        </Box>

                        <Box
                            sx={{
                                paddingTop: "1.5625vw",
                            }}
                        >
                            <Board
                                list={list}
                                showAnimateNumber={showAnimateNumber}
                            ></Board>
                        </Box>
                        <Flex
                            sx={{
                                width: "15.625vw",
                            }}
                            flexDir={"column"}
                            alignItems={"flex-end"}
                        >
                            <Flex justify={"flex-end"}>
                                <Box
                                    sx={{
                                        margin: "0.5208vw 0.5208vw 0 0",
                                    }}
                                >
                                    <Message
                                        message={opGameInfo.message}
                                        emote={opGameInfo.emote}
                                        status={"op"}
                                    ></Message>
                                </Box>

                                <UserProfile
                                    status="op"
                                    avatar={opInfo.avatar}
                                    name={opInfo.name}
                                    mark={opInfo.mark}
                                    showAdvantageTip={
                                        opInfo.address === nextDrawWinner
                                    }
                                ></UserProfile>
                            </Flex>

                            <OpBid
                                myGameState={myGameInfo.gameState}
                                opGameState={opGameInfo.gameState}
                                balance={opGameInfo.balance}
                            ></OpBid>
                        </Flex>
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
                    onReveal={handleRevealedBid}
                    onSetMessage={handleSetMessage}
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
                quitType={"wait"}
            ></QuitModal>
        </Box>
    );
};

export default PlayGame;
