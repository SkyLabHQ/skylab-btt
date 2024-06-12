import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import {
    useMultiMercuryBTTPrivateLobby,
    useMultiProvider,
    useMultiSkylabBidTacToeFactoryContract,
    useMultiSkylabBidTacToeGameContract,
} from "@/hooks/useMultiContract";
import Board from "../TacToe/Board";
import { shortenAddressWithout0x } from "@/utils";
import { ZERO_DATA } from "@/skyConstants";
import {
    BoardItem,
    GameInfo,
    GameState,
    UserMarkType,
    getWinState,
    initBoard,
    winPatterns,
} from "@/skyConstants/bttGameTypes";
import UserProfile, { MUserProfileResult } from "../PrivateRoom/UserProfile";
import { OpBid } from "../PrivateRoom/UserBid";
import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import { MMessage, Message } from "../PrivateRoom/Message";
import Timer from "../BttComponents/Timer";
import getNowSecondsTimestamp from "@/utils/nowTime";
import MBalance from "../BttComponents/MBalance";
import StartJourney from "../BttComponents/StartJourney";
import StatusProgress from "../BttComponents/StatusProgress";
import { motion } from "framer-motion";
import LoadingPage from "../LoadingPage";
import { OpInputBid } from "../TacToe/UserCard";

const MBttLiveGame = ({
    autoCommitTimeoutTime,
    myGameInfo,
    opInfo,
    opGameInfo,
    myInfo,
    nextDrawWinner,
    list,
}: any) => {
    const isMyWin = getWinState(myGameInfo.gameState);

    const gameOver = myGameInfo.gameState > GameState.Revealed;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                justifyContent: "center",
                background: "#303030",
                padding: "0px 18px 0",
            }}
        >
            <Box
                id="share-content"
                sx={{
                    background: "#303030",
                    margin: "0 auto",
                    width: "100%",
                    border: "2px solid #fff",
                    boxShadow: "5px 4px 8px 0px rgba(255, 255, 255, 0.50)",
                    padding: "16px 0 80px",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "10px",
                }}
            >
                <motion.div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        position: "absolute",
                        right: "20px",
                        top: "20px",
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                    }}
                >
                    <Box
                        sx={{
                            border: "2px solid #fff",
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: "4px",
                        }}
                    >
                        <Box
                            sx={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                background: "#fff",
                            }}
                        ></Box>
                    </Box>
                    <Text
                        sx={{
                            fontSize: "18px",
                            fontWeight: "bold",
                        }}
                    >
                        Live
                    </Text>
                </motion.div>
                <Flex
                    sx={{
                        alignItems: "flex-start",
                    }}
                    flexDir={"column"}
                >
                    <Flex>
                        <MUserProfileResult
                            showUserIcon={false}
                            position="left"
                            avatar={opInfo.avatar}
                            mark={opInfo.mark}
                            showAdvantageTip={opInfo.burner === nextDrawWinner}
                            name={opInfo.name}
                        ></MUserProfileResult>
                        <MMessage
                            message={opGameInfo.message}
                            emote={opGameInfo.emote}
                            status={"op"}
                        ></MMessage>
                    </Flex>
                    <MBalance
                        balance={opGameInfo.balance}
                        mark={opInfo.mark}
                        win={!isMyWin}
                        showResult={gameOver}
                    ></MBalance>
                </Flex>
                <Box
                    sx={{
                        position: "absolute",
                        bottom: "0px",
                        left: "0",
                        width: "100%",
                    }}
                >
                    <Box
                        sx={{
                            width: "160px",
                            position: "absolute",
                            left: "12px",
                            bottom: "12px",
                        }}
                    >
                        {myGameInfo.gameState <= GameState.Revealed && (
                            <Timer
                                time1={autoCommitTimeoutTime}
                                time1Gray={false}
                            ></Timer>
                        )}
                    </Box>
                    <Flex
                        sx={{
                            position: "absolute",
                            bottom: "12px",
                            right: 0,
                        }}
                        flexDir={"column"}
                        align={"flex-end"}
                    >
                        <Flex>
                            <MMessage
                                message={myGameInfo.message}
                                emote={myGameInfo.emote}
                                status={"my"}
                            ></MMessage>
                            <MUserProfileResult
                                name={myInfo.name}
                                position="right"
                                showUserIcon={false}
                                mark={myInfo.mark}
                                avatar={myInfo.avatar}
                                showAdvantageTip={
                                    myInfo.address === nextDrawWinner
                                }
                            ></MUserProfileResult>
                        </Flex>
                        <MBalance
                            balance={myGameInfo.balance}
                            status="right"
                            mark={myInfo.mark}
                            win={isMyWin}
                            showResult={gameOver}
                        ></MBalance>
                    </Flex>
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
                            height: "44px",
                        }}
                    >
                        {!gameOver && (
                            <StatusProgress
                                myGameState={myGameInfo.gameState}
                                opGameState={opGameInfo.gameState}
                            ></StatusProgress>
                        )}
                    </Box>

                    <Box
                        sx={{
                            marginTop: "12px",
                        }}
                    >
                        <Board list={list}></Board>
                    </Box>
                </Flex>
            </Box>
            <Box
                sx={{
                    marginTop: "20px",
                }}
            >
                <StartJourney></StartJourney>
            </Box>
        </Box>
    );
};

const BttLiveGamePage = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [autoCommitTimeoutTime, setAutoCommitTimeoutTime] = useState(0);
    const [init, setInit] = useState(false);
    const [list, setList] = useState<BoardItem[]>(initBoard());
    const { search } = useLocation();
    const params = qs.parse(search) as any;

    const ethcallProvider = useMultiProvider(TESTFLIGHT_CHAINID);
    const [nextDrawWinner, setNextDrawWinner] = useState<string>("");

    const [lobbyAddress] = useState(params.lobbyAddress);
    const [gameAddress] = useState(params.gameAddress);
    const multiMercuryBTTPrivateLobby =
        useMultiMercuryBTTPrivateLobby(lobbyAddress);
    const multiSkylabBidTacToeFactoryContract =
        useMultiSkylabBidTacToeFactoryContract(TESTFLIGHT_CHAINID);

    const multiSkylabBidTacToeGameContract =
        useMultiSkylabBidTacToeGameContract(gameAddress);
    const [lastBidIndex, setLastBidIndex] = useState<number>(-1);
    const [myGameInfo, setMyGameInfo] = useState<GameInfo>({
        balance: 0,
        gameState: GameState.Unknown,
        timeout: 0,
        message: 0,
        emote: 0,
    });
    const [opGameInfo, setOpGameInfo] = useState<GameInfo>({
        balance: 0,
        gameState: GameState.Unknown,
        timeout: 0,
        message: 0,
        emote: 0,
    });
    const [myInfo, setMyInfo] = useState<any>({
        mark: UserMarkType.Empty,
    });
    const [opInfo, setOpInfo] = useState<any>({
        mark: UserMarkType.Empty,
    });

    const handleGetGameInfo = async () => {
        if (
            !multiSkylabBidTacToeGameContract ||
            !multiSkylabBidTacToeFactoryContract ||
            !myInfo.address ||
            !opInfo.address
        ) {
            return;
        }

        const [
            currentGrid,
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

        const _list = initBoard();
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
            _list[currentGrid.toNumber()].mark = UserMarkType.Square;
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

        let index = -1;
        boardGrids.forEach((item: any) => {
            if (item !== ZERO_DATA) {
                index++;
            }
        });

        if (index !== -1) {
            const [_gridOrder] = await ethcallProvider.all([
                multiSkylabBidTacToeGameContract.allSelectedGrids(index),
            ]);
            setLastBidIndex(_gridOrder.toNumber());
        }

        setList(_list);
        setMyGameInfo({
            balance: myBalance.toNumber(),
            gameState: myGameState.toNumber(),
            timeout: myTimeout.toNumber(),
            message: myMessage.toNumber(),
            emote: myEmote.toNumber(),
        });
        setOpGameInfo({
            balance: opBalance.toNumber(),
            gameState: opGameState.toNumber(),
            timeout: opTimeout.toNumber(),
            message: opMessage.toNumber(),
            emote: opEmote.toNumber(),
        });

        setNextDrawWinner(nextDrawWinner);
        if (!init) {
            setInit(true);
        }
    };

    const handleGetPlayer = async () => {
        if (
            !multiSkylabBidTacToeGameContract ||
            !multiSkylabBidTacToeFactoryContract ||
            !ethcallProvider
        )
            return;

        const [player1, player2] = await ethcallProvider.all([
            multiSkylabBidTacToeGameContract.player1(),
            multiSkylabBidTacToeGameContract.player2(),
        ]);

        const [
            userInfo1,
            userInfo2,
            winCount1,
            winCount2,
            loseCount1,
            loseCount2,
        ] = await ethcallProvider.all([
            multiMercuryBTTPrivateLobby.userInfo(player1),
            multiMercuryBTTPrivateLobby.userInfo(player2),
            multiMercuryBTTPrivateLobby.winCountPerPlayer(player1),
            multiMercuryBTTPrivateLobby.winCountPerPlayer(player2),
            multiMercuryBTTPrivateLobby.loseCountPerPlayer(player1),
            multiMercuryBTTPrivateLobby.loseCountPerPlayer(player2),
        ]);

        const params = qs.parse(search) as any;
        const address = params.address;

        const myIsPlayer1 = shortenAddressWithout0x(player1) === address;

        const player1Info = {
            address: player1,
            name: userInfo1.name,
            avatar: userInfo1.avatar.toNumber() - 1,
            winCount: winCount1.toNumber(),
            loseCount: loseCount1.toNumber(),
            mark: UserMarkType.Circle,
        };

        const player2Info = {
            address: player2,
            name: userInfo2.name,
            avatar: userInfo2.avatar.toNumber() - 1,
            winCount: winCount2.toNumber(),
            loseCount: loseCount2.toNumber(),
            mark: UserMarkType.Cross,
        };

        if (myIsPlayer1) {
            setMyInfo(player1Info);
            setOpInfo(player2Info);
        } else {
            setMyInfo(player2Info);
            setOpInfo(player1Info);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            handleGetGameInfo();
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    }, [
        myInfo.address,
        opInfo.address,
        multiSkylabBidTacToeGameContract,
        multiSkylabBidTacToeFactoryContract,
    ]);

    useEffect(() => {
        handleGetPlayer();
    }, [
        multiSkylabBidTacToeFactoryContract,
        multiSkylabBidTacToeGameContract,
        ethcallProvider,
    ]);

    useEffect(() => {
        if (myGameInfo.gameState !== GameState.WaitingForBid) {
            return;
        }
        const commitWorkerRef = new Worker(
            new URL("../../utils/timerWorker.ts", import.meta.url),
        );
        const time = myGameInfo.timeout * 1000;
        const now = getNowSecondsTimestamp();
        commitWorkerRef.onmessage = async (event) => {
            const timeLeft = event.data;
            setAutoCommitTimeoutTime(timeLeft);
        };

        const remainTime = time - now;

        if (remainTime > 0) {
            commitWorkerRef.postMessage({
                action: "start",
                timeToCount: remainTime,
            });
        } else {
            commitWorkerRef.postMessage({
                action: "stop",
            });
        }

        return () => {
            commitWorkerRef.terminate();
        };
    }, [myGameInfo.timeout, myGameInfo.gameState]);

    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
            }}
        >
            {!init ? (
                <LoadingPage></LoadingPage>
            ) : isPc ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        height: "100%",
                        justifyContent: "center",
                        padding: "0px 4.1667vw 0",
                    }}
                >
                    <Box
                        id="share-content"
                        sx={{
                            height: "74.537vh",
                            background: "#303030",
                            margin: "0 auto",
                            width: "100%",
                            border: "2px solid #fff",
                            boxShadow:
                                "5px 4px 8px 0px rgba(255, 255, 255, 0.50)",
                            padding: "2vh 1.5vw 10vh",
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Box
                            sx={{
                                position: "relative",
                            }}
                        >
                            <motion.div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    position: "absolute",
                                    left: "0",
                                    top: 0,
                                }}
                                animate={{
                                    opacity: [0, 1, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                }}
                            >
                                <Box
                                    sx={{
                                        border: "2px solid #fff",
                                        width: "1.0417vw",
                                        height: "1.0417vw",
                                        borderRadius: "50%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginRight: "0.2604vw",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: "0.5208vw",
                                            height: "0.5208vw",
                                            borderRadius: "50%",
                                            background: "#fff",
                                        }}
                                    ></Box>
                                </Box>
                                <Text
                                    sx={{
                                        fontSize: "0.8333vw",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Live
                                </Text>
                            </motion.div>

                            <Flex flexDir={"column"} align={"center"}>
                                <Box
                                    sx={{
                                        height: "90px",
                                    }}
                                >
                                    {myGameInfo.gameState <
                                        GameState.Revealed && (
                                        <Timer
                                            time1={autoCommitTimeoutTime}
                                            time1Gray={false}
                                        ></Timer>
                                    )}
                                </Box>

                                <StatusProgress
                                    myGameState={myGameInfo.gameState}
                                    opGameState={opGameInfo.gameState}
                                ></StatusProgress>
                            </Flex>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                flex: 1,
                                alignItems: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "15.625vw",
                                }}
                            >
                                {" "}
                                <Flex>
                                    <UserProfile
                                        status="my"
                                        address={myInfo.address}
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
                                            status={"my"}
                                        ></Message>
                                    </Box>
                                </Flex>
                                <OpInputBid
                                    opGameState={myGameInfo.gameState}
                                    balance={myGameInfo.balance}
                                ></OpInputBid>
                            </Box>
                            <Box>
                                <Box
                                    sx={{
                                        paddingTop: "0.7813vw",
                                    }}
                                >
                                    <Board list={list}></Board>
                                </Box>
                            </Box>
                            <Flex
                                sx={{
                                    width: "15.625vw",
                                }}
                                flexDir={"column"}
                                alignItems={"flex-end"}
                            >
                                {" "}
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
                                        mark={opInfo.mark}
                                        showAdvantageTip={
                                            opInfo.address === nextDrawWinner
                                        }
                                    ></UserProfile>
                                </Flex>
                                <OpInputBid
                                    opGameState={opGameInfo.gameState}
                                    balance={opGameInfo.balance}
                                ></OpInputBid>
                            </Flex>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            marginTop: "20px",
                        }}
                    >
                        <StartJourney></StartJourney>
                    </Box>
                </Box>
            ) : (
                <MBttLiveGame
                    autoCommitTimeoutTime={autoCommitTimeoutTime}
                    myGameInfo={myGameInfo}
                    lastBidIndex={lastBidIndex}
                    opInfo={opInfo}
                    opGameInfo={opGameInfo}
                    myInfo={myInfo}
                    nextDrawWinner={nextDrawWinner}
                    list={list}
                ></MBttLiveGame>
            )}
        </Box>
    );
};

export default BttLiveGamePage;
