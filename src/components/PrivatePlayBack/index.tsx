import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";
import {
    useMultiMercuryBTTPrivateLobby,
    useMultiProvider,
    useMultiSkylabBidTacToeFactoryContract,
    useMultiSkylabBidTacToeGameContract,
} from "@/hooks/useMultiContract";
import { ZERO_DATA } from "@/skyConstants";
import PrivateLobbyPlayBack from "../PrivateRoom/PrivateLobbyPlayBack";
import Back from "../Back";
import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import ShareButtons from "../PrivateRoom/ShareButton";
import { shortenAddressWithout0x } from "@/utils";
import {
    BoardItem,
    GameState,
    UserMarkIcon,
    UserMarkType,
    getShareEmoji,
    getWinState,
    initBoard,
    winPatterns,
} from "@/skyConstants/bttGameTypes";
import PlayBackButton from "../BttPlayBack/PlayBackButton";
import StartJourney from "../BttComponents/StartJourney";
import LoadingPage from "../PrivateLobby/LoadingPage";

const PrivatePlayBackPage = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const navigate = useNavigate();
    const [init, setInit] = useState(false);
    const { search } = useLocation();
    const params = qs.parse(search) as any;
    const [onlyShow] = useState(params.show === "true");

    const ethcallProvider = useMultiProvider(TESTFLIGHT_CHAINID);
    const [allSelectedGrids, setAllSelectedGrids] = useState<any[]>([]);
    const [currentRound, setCurrentRound] = useState(0);
    const [lobbyAddress] = useState(params.lobbyAddress);
    const [gameAddress] = useState(params.gameAddress);
    const multiMercuryBTTPrivateLobby =
        useMultiMercuryBTTPrivateLobby(lobbyAddress);
    const multiSkylabBidTacToeFactoryContract =
        useMultiSkylabBidTacToeFactoryContract(TESTFLIGHT_CHAINID);
    const multiSkylabBidTacToeGameContract =
        useMultiSkylabBidTacToeGameContract(gameAddress);
    const [resultList, setResultList] = useState<BoardItem[]>(initBoard()); // init board
    const [myInfo, setMyInfo] = useState<any>({
        mark: UserMarkType.Empty,
    });

    const [myGameInfo, setMyGameInfo] = useState({
        gameState: GameState.Unknown,
        balance: 0,
        timeout: 0,
        message: 0,
        emote: 0,
    });
    const [opGameInfo, setOpGameInfo] = useState({
        gameState: GameState.Unknown,
        balance: 0,
        timeout: 0,
        message: 0,
        emote: 0,
    });
    const [opInfo, setOpInfo] = useState<any>({
        mark: UserMarkType.Empty,
    });

    const gameOver = useMemo(() => {
        return currentRound === allSelectedGrids.length;
    }, [currentRound, allSelectedGrids]);

    const myMark = useMemo(() => {
        if (myInfo.mark === UserMarkType.Circle) {
            if (getWinState(myGameInfo.gameState) && gameOver) {
                return UserMarkIcon.YellowCircle;
            } else {
                return UserMarkIcon.Circle;
            }
        } else {
            if (getWinState(myGameInfo.gameState) && gameOver) {
                return UserMarkIcon.YellowCross;
            } else {
                return UserMarkIcon.Cross;
            }
        }
    }, [myInfo, gameOver, myGameInfo]);

    const opMark = useMemo(() => {
        if (opInfo.mark === UserMarkType.Circle) {
            if (getWinState(opGameInfo.gameState) && gameOver) {
                return UserMarkIcon.YellowCircle;
            } else {
                return UserMarkIcon.Circle;
            }
        } else if (opInfo.mark === UserMarkType.BotX) {
            if (getWinState(opGameInfo.gameState) && gameOver) {
                return UserMarkIcon.YellowBotX;
            } else {
                return UserMarkIcon.BotX;
            }
        } else {
            if (getWinState(opGameInfo.gameState) && gameOver) {
                return UserMarkIcon.YellowCross;
            } else {
                return UserMarkIcon.Cross;
            }
        }
    }, [opInfo, opGameInfo]);

    const handleGetGameInfo = async () => {
        const round = params.round;
        const address = params.address;
        const [boardGrids, player1, player2] = await ethcallProvider.all([
            multiSkylabBidTacToeGameContract.getGrid(),
            multiSkylabBidTacToeGameContract.player1(),
            multiSkylabBidTacToeGameContract.player2(),
        ]);

        const [
            player1Bids,
            player2Bids,
            player1GameState,
            player2GameState,
            userInfo1,
            userInfo2,
            winCount1,
            winCount2,
            loseCount1,
            loseCount2,
        ] = await ethcallProvider.all([
            multiSkylabBidTacToeGameContract.getRevealedBids(player1),
            multiSkylabBidTacToeGameContract.getRevealedBids(player2),
            multiSkylabBidTacToeGameContract.gameStates(player1),
            multiSkylabBidTacToeGameContract.gameStates(player2),
            multiMercuryBTTPrivateLobby.userInfo(player1),
            multiMercuryBTTPrivateLobby.userInfo(player2),
            multiMercuryBTTPrivateLobby.winCountPerPlayer(player1),
            multiMercuryBTTPrivateLobby.winCountPerPlayer(player2),
            multiMercuryBTTPrivateLobby.loseCountPerPlayer(player1),
            multiMercuryBTTPrivateLobby.loseCountPerPlayer(player2),
        ]);

        const myIsPlayer1 = player1 === address;
        let myGameState = GameState.Unknown;
        let opGameState = GameState.Unknown;
        let myBids = [];
        let opBids = [];
        let _myInfo = JSON.parse(JSON.stringify(myInfo));
        let _opInfo = JSON.parse(JSON.stringify(opInfo));

        if (myIsPlayer1) {
            myBids = player1Bids.map((item: any) => {
                return item.toNumber();
            });
            opBids = player2Bids.map((item: any) => {
                return item.toNumber();
            });
            myGameState = player1GameState.toNumber();
            opGameState = player2GameState.toNumber();

            _myInfo.mark = UserMarkType.Circle;
            _opInfo.mark = UserMarkType.Cross;
            _myInfo.address = player1;
            _opInfo.address = player2;
            _myInfo.name = userInfo1.name;
            _opInfo.name = userInfo2.name;
            _myInfo.avatar = userInfo1.avatar.toNumber() - 1;
            _opInfo.avatar = userInfo2.avatar.toNumber() - 1;
            _myInfo.win = winCount1.toNumber();
            _opInfo.win = winCount2.toNumber();
            _myInfo.lose = loseCount1.toNumber();
            _opInfo.lose = loseCount2.toNumber();
        } else {
            myBids = player2Bids.map((item: any) => {
                return item.toNumber();
            });
            opBids = player1Bids.map((item: any) => {
                return item.toNumber();
            });
            myGameState = player2GameState.toNumber();
            opGameState = player1GameState.toNumber();

            _myInfo.mark = UserMarkType.Cross;
            _opInfo.mark = UserMarkType.Circle;
            _myInfo.address = player2;
            _opInfo.address = player1;
            _myInfo.name = userInfo2.name;
            _opInfo.name = userInfo1.name;
            _myInfo.avatar = userInfo2.avatar.toNumber() - 1;
            _opInfo.avatar = userInfo1.avatar.toNumber() - 1;
            _myInfo.win = winCount2.toNumber();
            _opInfo.win = winCount1.toNumber();
            _myInfo.lose = loseCount2.toNumber();
            _opInfo.lose = loseCount1.toNumber();
        }

        console.log(_myInfo, "_myInfo");
        console.log(_opInfo);
        setMyInfo(_myInfo);
        setOpInfo(_opInfo);

        setMyGameInfo({
            balance: 0,
            timeout: 0,
            message: 0,
            emote: 0,
            gameState: myGameState,
        });

        setOpGameInfo({
            balance: 0,
            timeout: 0,
            message: 0,
            emote: 0,
            gameState: opGameState,
        });

        let index = 0;
        const p = boardGrids
            .map((item: any) => {
                if (item === ZERO_DATA) {
                    return null;
                } else {
                    return multiSkylabBidTacToeGameContract.allSelectedGrids(
                        index++,
                    );
                }
            })
            .filter((item: any) => item !== null);

        const _gridOrder = await ethcallProvider.all(p);

        const _list = initBoard();

        for (let i = 0; i < boardGrids.length; i++) {
            if (boardGrids[i] === ZERO_DATA) {
                _list[i].mark = UserMarkType.Empty;
            } else if (boardGrids[i] === _myInfo.address) {
                _list[i].mark = _myInfo.mark;
            } else if (boardGrids[i] === _opInfo.address) {
                _list[i].mark = _opInfo.mark;
            }
            _list[i].myValue = myBids[i];
            _list[i].opValue = opBids[i];
            _list[i].myMark = _myInfo.mark;
            _list[i].opMark = _opInfo.mark;
        }

        setAllSelectedGrids(
            _gridOrder.map((item: any) => {
                return item.toNumber();
            }),
        );

        if (round && round <= _gridOrder.length) {
            setCurrentRound(Number(round));
        } else {
            setCurrentRound(_gridOrder.length);
        }

        setResultList(_list);
        setInit(true);
    };

    const [showList, myBalance, opBalance, myBid, opBid, myIsNextDrawWinner] =
        useMemo(() => {
            let myBalance = 100,
                opBalance = 100;
            const _list = initBoard();
            if (allSelectedGrids[currentRound] !== undefined) {
                _list[allSelectedGrids[currentRound]].mark =
                    UserMarkType.Square;
            }

            for (let i = 0; i < currentRound; i++) {
                const grid = allSelectedGrids[i];
                _list[grid].mark = resultList[grid].mark;
                _list[grid].myMark = resultList[grid].myMark;
                _list[grid].opMark = resultList[grid].opMark;
                _list[grid].myValue = resultList[grid].myValue;
                _list[grid].opValue = resultList[grid].opValue;
                myBalance -= resultList[grid].myValue;
                opBalance -= resultList[grid].opValue;
            }
            if (currentRound == 0) {
                return [_list, myBalance, opBalance, 0, 0, true];
            }

            if (currentRound === allSelectedGrids.length) {
                const gameState = myGameInfo.gameState;
                const myIsWin = getWinState(gameState);
                const winMark = myIsWin ? myInfo.mark : opInfo.mark;
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
                            _list[index0].mark === winMark &&
                            _list[index1].mark === winMark &&
                            _list[index2].mark === winMark
                        ) {
                            _list[index0].mark = mark;
                            _list[index1].mark = mark;
                            _list[index2].mark = mark;
                            break;
                        }
                    }
                } else {
                    for (let i = 0; i < _list.length; i++) {
                        if (_list[i].mark === winMark) {
                            _list[i].mark = mark;
                        }
                    }
                }
            }

            const myBid =
                currentRound === 0
                    ? 0
                    : resultList[allSelectedGrids[currentRound - 1]].myValue;
            const opBid =
                currentRound === 0
                    ? 0
                    : resultList[allSelectedGrids[currentRound - 1]].opValue;

            let myIsNextDrawWinner = false;
            if (currentRound === 0) {
                myIsNextDrawWinner =
                    myInfo.mark === UserMarkType.Circle ? true : false;
            } else {
                myIsNextDrawWinner =
                    resultList[currentRound - 1].mark === myInfo.mark
                        ? true
                        : false;
            }

            return [
                _list,
                myBalance,
                opBalance,
                myBid,
                opBid,
                myIsNextDrawWinner,
            ];
        }, [allSelectedGrids, currentRound, resultList, myInfo, opInfo]);

    const handlePreStep = () => {
        if (currentRound === 0) return;
        setCurrentRound(currentRound - 1);
    };
    const handleNextStep = () => {
        setCurrentRound((currentRound) => {
            if (currentRound >= allSelectedGrids.length) {
                return currentRound;
            }
            return currentRound + 1;
        });
    };

    const handleStartStep = () => {
        setCurrentRound(0);
    };

    const handleEndStep = () => {
        setCurrentRound(allSelectedGrids.length);
    };

    const handleShare = () => {
        const text = getShareEmoji(
            myInfo.mark,
            resultList,
            getWinState(myGameInfo.gameState),
        );

        const url = `${window.location.origin}`;

        const des = `Btt is a fully on-chain cryptoeconomic game of deduction and psychology`;

        const value = `${text}

${url}
                
${des}`;
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                value,
            )}`,
        );
    };

    useEffect(() => {
        if (
            !multiSkylabBidTacToeGameContract ||
            !multiSkylabBidTacToeFactoryContract ||
            !multiMercuryBTTPrivateLobby
        )
            return;
        handleGetGameInfo();
    }, [
        multiSkylabBidTacToeGameContract,
        multiSkylabBidTacToeFactoryContract,
        multiMercuryBTTPrivateLobby,
    ]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "0px 4.1667vw 0",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    left: "1.0417vw",
                    top: "1.0417vw",
                }}
            >
                <Back
                    onClick={() =>
                        navigate(
                            `/btt/lobby?lobbyAddress=${lobbyAddress}&type=2`,
                        )
                    }
                ></Back>
            </Box>

            {!init ? (
                <LoadingPage></LoadingPage>
            ) : (
                <>
                    <PrivateLobbyPlayBack
                        myInfo={myInfo}
                        opInfo={opInfo}
                        myBalance={myBalance}
                        opBalance={opBalance}
                        myBid={myBid}
                        opBid={opBid}
                        myMark={myMark}
                        opMark={opMark}
                        myIsNextDrawWinner={myIsNextDrawWinner}
                        currentRound={currentRound}
                        allSelectedGrids={allSelectedGrids}
                        myGameInfo={myGameInfo}
                        showList={showList}
                    ></PrivateLobbyPlayBack>
                    <Flex
                        flexDir={"column"}
                        align={"center"}
                        sx={{
                            position: "relative",
                            width: "100%",
                        }}
                    >
                        <PlayBackButton
                            showPre={currentRound > 0}
                            showNext={currentRound < allSelectedGrids.length}
                            handleEndStep={handleEndStep}
                            handleNextStep={handleNextStep}
                            handlePreStep={handlePreStep}
                            handleStartStep={handleStartStep}
                        ></PlayBackButton>

                        {onlyShow ? (
                            <Box
                                sx={{
                                    marginTop: "20px",
                                }}
                            >
                                <StartJourney></StartJourney>
                            </Box>
                        ) : (
                            <ShareButtons
                                handleShare={handleShare}
                                // handleTextClick={handleTextClick}
                                showText={!onlyShow}
                            ></ShareButtons>
                        )}
                    </Flex>
                </>
            )}
        </Box>
    );
};

export default PrivatePlayBackPage;
