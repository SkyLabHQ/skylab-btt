import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BttIcon from "@/assets/btt-icon.png";
import qs from "query-string";
import {
    useMultiMercuryBTTPrivateLobby,
    useMultiProvider,
    useMultiSkylabBidTacToeFactoryContract,
    useMultiSkylabBidTacToeGameContract,
} from "@/hooks/useMultiContract";
import Board from "../TacToe/Board";
import Loading from "../Loading";
import RightArrow from "@/components/TacToe/assets/right-arrow.svg";
import { useBlockNumber } from "@/contexts/BlockNumber";
import LiveGameTimer from "./LiveGameTimer";
import LiveStatusTip from "./LiveStatusTip";
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
import UserProfile from "../PrivateRoom/UserProfile";
import { OpBid } from "../PrivateRoom/UserBid";
import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import { Message } from "../PrivateRoom/Message";

const StartJourney = () => {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: "flex",
                background: "#fff",
                borderRadius: "0.9375vw",
                color: "#000",
                padding: "0.2083vw 0.3125vw",
                fontFamily: "Orbitron",
                cursor: "pointer",
                marginTop: "1.5625vw",
                width: "20.8333vw",
            }}
            onClick={() => {
                navigate("/btt");
            }}
        >
            <Image
                src={BttIcon}
                sx={{ height: "3.8542vw", marginRight: "0.7813vw" }}
            ></Image>
            <Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Text
                        sx={{
                            fontSize: "1.6667vw",
                            fontWeight: "bold",
                            marginRight: "0.7813vw",
                        }}
                    >
                        Bid Tac Toe
                    </Text>
                    <Box
                        sx={{
                            borderLeft: "1px solid #000",
                            paddingLeft: "0.5208vw",
                        }}
                    >
                        <Image
                            src={RightArrow}
                            sx={{ height: "1.6667vw" }}
                        ></Image>
                    </Box>
                </Box>
                <Text sx={{ fontWeight: "bold", fontSize: "1.0417vw" }}>
                    Start your journey
                </Text>
            </Box>
        </Box>
    );
};

const BttLiveGamePage = () => {
    const { blockNumber } = useBlockNumber();
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
        handleGetGameInfo();
    }, [
        myInfo.address,
        opInfo.address,
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

    return (
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
            {!init ? (
                <Loading></Loading>
            ) : (
                <>
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
                            <LiveGameTimer
                                myGameInfo={myGameInfo}
                            ></LiveGameTimer>
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
                            <Box
                                sx={{
                                    width: "15.625vw",
                                }}
                            >
                                {" "}
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
                                            status={"my"}
                                        ></Message>
                                    </Box>
                                </Flex>
                                <OpBid
                                    myGameState={myGameInfo.gameState}
                                    balance={myGameInfo.balance}
                                    bidAmount={
                                        lastBidIndex !== -1
                                            ? list[lastBidIndex].myValue
                                            : 0
                                    }
                                ></OpBid>
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
                                        avatar={opInfo.avatar}
                                        name={opInfo.name}
                                        mark={opInfo.mark}
                                        showAdvantageTip={
                                            opInfo.address === nextDrawWinner
                                        }
                                    ></UserProfile>
                                </Flex>
                                <OpBid
                                    balance={opGameInfo.balance}
                                    bidAmount={
                                        lastBidIndex !== -1
                                            ? list[lastBidIndex].opValue
                                            : 0
                                    }
                                ></OpBid>
                            </Flex>
                        </Box>
                    </Box>
                    <StartJourney></StartJourney>
                </>
            )}
        </Box>
    );
};

export default BttLiveGamePage;
