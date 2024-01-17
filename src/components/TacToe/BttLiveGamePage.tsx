import { Box, Flex, Image, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BttIcon from "@/assets/btt-icon.png";
import qs from "query-string";

import {
    useMultiProvider,
    useMultiSkylabBidTacToeFactoryContract,
    useMultiSkylabBidTacToeGameContract,
} from "@/hooks/useMultiContract";
import Board from "../TacToe/Board";
import { UserCard } from "../BttPlayBack/UserCard";
import Loading from "../Loading";
import RightArrow from "@/components/TacToe/assets/right-arrow.svg";
import { useBlockNumber } from "@/contexts/BlockNumber";
import LiveStatusTip from "./LiveStatusTip";
import { shortenAddressWithout0x } from "@/utils";
import { aviationImg } from "@/utils/aviationImg";
import { ZERO_DATA } from "@/skyConstants";
import { botAddress } from "@/hooks/useContract";
import {
    BoardItem,
    GameInfo,
    GameState,
    RobotImg,
    SixtySecond,
    ThirtySecond,
    UserMarkIcon,
    UserMarkType,
    getWinState,
    initBoard,
    winPatterns,
} from "@/skyConstants/bttGameTypes";
import Timer from "../BttComponents/Timer";
import getNowSecondsTimestamp from "@/utils/nowTime";
import { MUserProfileResult } from "../PrivateRoom/UserProfile";
import { MMessage } from "../PrivateRoom/Message";
import MBalance from "../BttComponents/MBalance";
import StartJourney from "../BttComponents/StartJourney";

interface Info {
    burner?: string;
    level: number;
    mark: UserMarkType;
    isBot?: boolean;
}

const MBttLiveGame = ({
    autoCommitTimeoutTime,
    myGameInfo,
    bufferTime,
    opInfo,
    opGameInfo,
    myInfo,
    myMark,
    opMark,
    nextDrawWinner,
    list,
}: any) => {
    const isMyWin = getWinState(myGameInfo.gameState);

    const gameOver = myGameInfo.gameState > GameState.Revealed;
    console.log(isMyWin, "opInfo");

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
                    padding: "25px 0 100px",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "10px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        position: "absolute",
                        right: "20px",
                        top: "20px",
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
                </Box>
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
                            img={opInfo.img}
                            mark={opInfo.mark}
                            showAdvantageTip={opInfo.burner === nextDrawWinner}
                            level={opInfo.level}
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
                        bottom: "15px",
                        left: "0",
                        width: "100%",
                    }}
                >
                    <Box
                        sx={{
                            width: "180px",
                            position: "absolute",
                            left: "12px",
                            bottom: "4px",
                        }}
                    >
                        {myGameInfo.gameState < GameState.Commited && (
                            <Timer
                                time1={autoCommitTimeoutTime}
                                time2={bufferTime}
                                time1Gray={
                                    myGameInfo.gameState === GameState.Commited
                                }
                            ></Timer>
                        )}
                    </Box>
                    <Flex
                        sx={{
                            position: "absolute",
                            bottom: "0",
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
                                level={myInfo.level}
                                position="right"
                                showUserIcon={false}
                                mark={myInfo.mark}
                                img={myInfo.img}
                                showAdvantageTip={
                                    myInfo.address === nextDrawWinner
                                }
                            ></MUserProfileResult>
                        </Flex>
                        <MBalance
                            balance={myGameInfo.balance}
                            status="op"
                            mark={myInfo.mark}
                            win={isMyWin}
                            showResult={gameOver}
                        ></MBalance>
                    </Flex>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "center",
                        marginTop: "20px",
                    }}
                >
                    <Board list={list}></Board>

                    {/* <UserCard
                        isBot={opInfo.isBot}
                        message={opGameInfo.message}
                        emote={opGameInfo.emote}
                        level={opInfo.level}
                        markIcon={opMark}
                        status="op"
                        balance={opGameInfo.balance}
                        bidAmount={
                            lastBidIndex !== -1 ? list[lastBidIndex].opValue : 0
                        }
                        showAdvantageTip={opInfo.burner === nextDrawWinner}
                        planeUrl={aviationImg(opInfo.level)}
                    ></UserCard> */}
                </Box>
            </Box>
            <StartJourney></StartJourney>
        </Box>
    );
};

const BttLiveGamePage = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const { blockNumber } = useBlockNumber();
    const [autoCommitTimeoutTime, setAutoCommitTimeoutTime] = useState(0);

    const [init, setInit] = useState(false);
    const [list, setList] = useState<BoardItem[]>(initBoard());
    const { search } = useLocation();
    const params = qs.parse(search) as any;

    const ethcallProvider = useMultiProvider(params.chainId);
    const [bttGameAddress] = useState(params.gameAddress);
    const [nextDrawWinner, setNextDrawWinner] = useState<string>("");
    const [bufferTime, setBufferTime] = useState(0);
    const multiSkylabBidTacToeFactoryContract =
        useMultiSkylabBidTacToeFactoryContract(params.chainId);
    const multiSkylabBidTacToeGameContract =
        useMultiSkylabBidTacToeGameContract(bttGameAddress);
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
    const [myInfo, setMyInfo] = useState<Info>({
        burner: "",
        level: 0,
        mark: UserMarkType.Empty,
    });
    const [opInfo, setOpInfo] = useState<Info>({
        burner: "",
        level: 0,
        mark: UserMarkType.Empty,
    });

    const myMark = useMemo(() => {
        if (myInfo.mark === UserMarkType.Circle) {
            if (getWinState(myGameInfo.gameState)) {
                return UserMarkIcon.YellowCircle;
            } else {
                return UserMarkIcon.Circle;
            }
        } else {
            if (getWinState(myGameInfo.gameState)) {
                return UserMarkIcon.YellowCross;
            } else {
                return UserMarkIcon.Cross;
            }
        }
    }, [myInfo, myGameInfo]);

    const opMark = useMemo(() => {
        if (opInfo.mark === UserMarkType.Circle) {
            if (getWinState(opGameInfo.gameState)) {
                return UserMarkIcon.YellowCircle;
            } else {
                return UserMarkIcon.Circle;
            }
        } else if (opInfo.mark === UserMarkType.BotX) {
            if (getWinState(opGameInfo.gameState)) {
                return UserMarkIcon.YellowBotX;
            } else {
                return UserMarkIcon.BotX;
            }
        } else {
            if (getWinState(opGameInfo.gameState)) {
                return UserMarkIcon.YellowCross;
            } else {
                return UserMarkIcon.Cross;
            }
        }
    }, [opInfo, opGameInfo]);

    const handleGetGameInfo = async () => {
        if (
            !multiSkylabBidTacToeGameContract ||
            !multiSkylabBidTacToeFactoryContract ||
            !myInfo.burner ||
            !opInfo.burner
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

        const _list = initBoard();
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
            _list[currentGrid.toNumber()].mark = UserMarkType.Square;
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

        const [metadata, player1, player2] = await ethcallProvider.all([
            multiSkylabBidTacToeFactoryContract.planeMetadataPerGame(
                bttGameAddress,
            ),
            multiSkylabBidTacToeGameContract.player1(),
            multiSkylabBidTacToeGameContract.player2(),
        ]);

        const [level1, points1, level2, points2] = metadata;
        const params = qs.parse(search) as any;
        const burner = params.burner;

        const _myInfo = JSON.parse(JSON.stringify(myInfo));
        const _opInfo = JSON.parse(JSON.stringify(opInfo));
        const isBotGame = player2 === botAddress[params.chainId];
        const myIsPlayer1 = shortenAddressWithout0x(player1) === burner;

        if (myIsPlayer1) {
            _myInfo.level = level1.toNumber();
            _opInfo.level = isBotGame ? level1.toNumber() : level2.toNumber();
            _myInfo.burner = player1;
            _opInfo.burner = player2;
            _myInfo.mark = UserMarkType.Circle;
            _opInfo.mark = isBotGame ? UserMarkType.BotX : UserMarkType.Cross;
            _opInfo.isBot = isBotGame;
            _myInfo.img = aviationImg(_opInfo.level);
            _opInfo.img = isBotGame ? RobotImg : aviationImg(_opInfo.level);
        } else {
            _myInfo.level = isBotGame ? level1.toNumber() : level2.toNumber();
            _opInfo.level = level1.toNumber();
            _myInfo.burner = player2;
            _opInfo.burner = player1;
            _myInfo.mark = isBotGame ? UserMarkType.BotX : UserMarkType.Cross;
            _opInfo.mark = UserMarkType.Circle;
            _myInfo.isBot = isBotGame;
            _myInfo.img = isBotGame ? RobotImg : aviationImg(_myInfo.level);
            _opInfo.img = aviationImg(_opInfo.level);
        }

        setMyInfo(_myInfo);
        setOpInfo(_opInfo);
    };

    useEffect(() => {
        handleGetGameInfo();
    }, [
        myInfo.burner,
        opInfo.burner,
        blockNumber,
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

        if (remainTime > ThirtySecond) {
            let bufferTime = 0;

            if (Number(bufferTime) === 0 || remainTime > bufferTime) {
                if (remainTime > SixtySecond) {
                    bufferTime = remainTime - SixtySecond;
                } else if (remainTime > ThirtySecond) {
                    bufferTime = remainTime - ThirtySecond;
                } else {
                    bufferTime = remainTime;
                }
            } else {
                bufferTime = remainTime;
            }

            setBufferTime(Number(bufferTime));
            commitWorkerRef.postMessage({
                action: "start",
                timeToCount: remainTime - ThirtySecond,
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
            }}
        >
            {!init ? (
                <Loading></Loading>
            ) : isPc ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        height: "100vh",
                        justifyContent: "center",
                        background: "#303030",
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
                            borderRadius: "10px",
                        }}
                    >
                        <Box
                            sx={{
                                position: "relative",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    position: "absolute",
                                    left: "0",
                                    top: 0,
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
                            </Box>
                            {myGameInfo.gameState < GameState.Commited && (
                                <Timer
                                    time1={autoCommitTimeoutTime}
                                    time2={bufferTime}
                                    time1Gray={
                                        myGameInfo.gameState ===
                                        GameState.Commited
                                    }
                                ></Timer>
                            )}
                            <LiveStatusTip
                                myGameState={myGameInfo.gameState}
                                opGameState={opGameInfo.gameState}
                            ></LiveStatusTip>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                flex: 1,
                                alignItems: "center",
                            }}
                        >
                            <UserCard
                                message={myGameInfo.message}
                                emote={myGameInfo.emote}
                                level={myInfo.level}
                                markIcon={myMark}
                                gameState={myGameInfo.gameState}
                                status="my"
                                balance={myGameInfo.balance}
                                bidAmount={
                                    lastBidIndex !== -1
                                        ? list[lastBidIndex].myValue
                                        : 0
                                }
                                showAdvantageTip={
                                    myInfo.burner === nextDrawWinner
                                }
                                planeUrl={aviationImg(myInfo.level)}
                            ></UserCard>
                            <Box>
                                <Box
                                    sx={{
                                        paddingTop: "0.7813vw",
                                    }}
                                >
                                    <Board list={list}></Board>
                                </Box>
                            </Box>
                            <UserCard
                                isBot={opInfo.isBot}
                                message={opGameInfo.message}
                                emote={opGameInfo.emote}
                                level={opInfo.level}
                                markIcon={opMark}
                                status="op"
                                balance={opGameInfo.balance}
                                bidAmount={
                                    lastBidIndex !== -1
                                        ? list[lastBidIndex].opValue
                                        : 0
                                }
                                showAdvantageTip={
                                    opInfo.burner === nextDrawWinner
                                }
                                planeUrl={aviationImg(opInfo.level)}
                            ></UserCard>
                        </Box>
                    </Box>
                    <StartJourney></StartJourney>
                </Box>
            ) : (
                <MBttLiveGame
                    autoCommitTimeoutTime={autoCommitTimeoutTime}
                    myGameInfo={myGameInfo}
                    lastBidIndex={lastBidIndex}
                    bufferTime={bufferTime}
                    opInfo={opInfo}
                    opGameInfo={opGameInfo}
                    myInfo={myInfo}
                    myMark={myMark}
                    opMark={opMark}
                    nextDrawWinner={nextDrawWinner}
                    list={list}
                ></MBttLiveGame>
            )}
        </Box>
    );
};

export default BttLiveGamePage;
