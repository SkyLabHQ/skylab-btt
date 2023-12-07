import { MyBid, OpBid } from "./UserBid";
import { Box, Flex } from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Board from "@/components/TacToe/Board";
import Timer from "./Timer";
import { useBlockNumber } from "@/contexts/BlockNumber";
import { useBttGameRetry } from "@/hooks/useRetryContract";
import { GameInfo, UserMarkType } from "@/pages/TacToe";
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
import StatusTip from "../TacToe/StatusTip";
import ToolBar from "./Toolbar";
import Chat from "./Chat";
import {
    GameState,
    MessageStatus,
    getWinState,
    winPatterns,
} from "@/skyConstants/bttGameTypes";
import { getPrivateLobbySigner } from "@/hooks/useSigner";
import { Message } from "./Message";

const PlayGame = ({
    onChangeGame,
}: {
    onChangeGame: (position: "my" | "op", info: GameInfo) => void;
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useSkyToast();
    const [currentGrid, setCurrentGrid] = useState<number>(-1);
    const {
        myGameInfo,
        opGameInfo,
        bidTacToeGameAddress,
        myInfo,
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
            setRevealing(false);
            setBidAmount(0);
            handleGetGameInfo();
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
            handleGetGameInfo();
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
        loading,
        myGameInfo,
        addGridCommited,
        bidAmount,
        tacToeGameRetryWrite,
        getGridCommited,
    ]);

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

    const handleGameOver = async () => {
        deleteTokenIdCommited();
        handleStepChange(2);
    };

    useEffect(() => {
        if (
            !myInfo.address ||
            !opInfo.address ||
            !multiSkylabBidTacToeGameContract ||
            !multiProvider
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
        if (revealing) return;
        if (
            myGameInfo.gameState === GameState.Commited &&
            (opGameInfo.gameState === GameState.Commited ||
                opGameInfo.gameState === GameState.Revealed)
        ) {
            handleRevealedBid();
        }
    }, [myGameInfo.gameState, opGameInfo.gameState, getGridCommited]);

    useEffect(() => {
        if (!gameOver) return;
        handleGameOver();
    }, [gameOver, deleteTokenIdCommited]);

    return (
        <Box
            sx={{
                padding: "1.4063vw 3.125vw",
                position: "relative",
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <Box>
                <Timer
                    myGameInfo={myGameInfo}
                    opGameInfo={opGameInfo}
                    autoBid={handleBid}
                    loading={loading}
                    bidTacToeGameAddress={bidTacToeGameAddress}
                    handleCallTimeOut={() => {
                        handleCallTimeOut();
                    }}
                ></Timer>
                <StatusTip
                    loading={loading}
                    myGameState={myGameInfo.gameState}
                    opGameState={opGameInfo.gameState}
                ></StatusTip>
            </Box>
            <ToolBar quitType="game"></ToolBar>
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
                            showAdvantageTip={myInfo.address === nextDrawWinner}
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
                        balance={myGameInfo.balance}
                        bidAmount={bidAmount}
                        onConfirm={handleBid}
                        onInputChange={(value) => {
                            if (loading) return;
                            if (
                                myGameInfo.gameState !== GameState.WaitingForBid
                            )
                                return;

                            if (value < 0) return;
                            if (value > myGameInfo.balance) return;
                            setBidAmount(value);
                        }}
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
                                emoteIndex={emoteIndex}
                                messageIndex={messageIndex}
                            ></Message>
                        </Box>

                        <UserProfile
                            status="op"
                            avatar={opInfo.avatar}
                            name={opInfo.name}
                            mark={opInfo.mark}
                            showAdvantageTip={opInfo.address === nextDrawWinner}
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
    );
};

export default PlayGame;
