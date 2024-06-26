import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import {
    useMultiProvider,
    useMultiSkylabBidTacToeFactoryContract,
    useMultiSkylabBidTacToeGameContract,
} from "@/hooks/useMultiContract";
import { ZERO_DATA } from "@/skyConstants";
import {
    BoardItem,
    GameState,
    UserMarkType,
    getShareEmoji,
    getWinState,
    initBoard,
    winPatterns,
} from "@/skyConstants/bttGameTypes";
import { usePrivateGameContext } from "@/pages/PrivateRoom";
import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import PrivateLobbyPlayBack from "./PrivateLobbyPlayBack";
import PlayBackButton from "../BttPlayBack/PlayBackButton";
import ShareButtons from "./ShareButton";
import { useNavigate } from "react-router-dom";
import useBidIcon from "@/hooks/useBidIcon";

const ResultPlayBack = () => {
    const UserMarkIcon = useBidIcon();
    const navigate = useNavigate();
    const {
        bidTacToeGameAddress,
        myInfo,
        myGameInfo,
        opInfo,
        opGameInfo,
        lobbyAddress,
    } = usePrivateGameContext();

    const [init, setInit] = useState(false);
    const multiProvider = useMultiProvider(TESTFLIGHT_CHAINID);
    const [allSelectedGrids, setAllSelectedGrids] = useState<any[]>([]);
    const [currentRound, setCurrentRound] = useState(0);

    const multiSkylabBidTacToeFactoryContract =
        useMultiSkylabBidTacToeFactoryContract();
    const multiSkylabBidTacToeGameContract =
        useMultiSkylabBidTacToeGameContract(bidTacToeGameAddress);
    const [resultList, setResultList] = useState<BoardItem[]>(initBoard()); // init board

    const gameOver = useMemo(() => {
        return currentRound === allSelectedGrids.length && init;
    }, [currentRound, allSelectedGrids, init]);

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
    }, [myGameInfo, myInfo, gameOver]);

    const opMark = useMemo(() => {
        if (opInfo.mark === UserMarkType.Circle) {
            if (getWinState(opGameInfo.gameState) && gameOver) {
                return UserMarkIcon.YellowCircle;
            } else {
                return UserMarkIcon.Circle;
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
        if (
            !multiSkylabBidTacToeGameContract ||
            !multiSkylabBidTacToeFactoryContract ||
            !multiProvider
        )
            return;

        const [boardGrids, player1, player2] = await multiProvider.all([
            multiSkylabBidTacToeGameContract.getGrid(),
            multiSkylabBidTacToeGameContract.player1(),
            multiSkylabBidTacToeGameContract.player2(),
        ]);

        const [player1Bids, player2Bids] = await multiProvider.all([
            multiSkylabBidTacToeGameContract.getRevealedBids(player1),
            multiSkylabBidTacToeGameContract.getRevealedBids(player2),
        ]);

        const myIsPlayer1 = player1 === myInfo.address;

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
        const _gridOrder = await multiProvider.all(p);
        const _list = initBoard();
        for (let i = 0; i < boardGrids.length; i++) {
            if (boardGrids[i] === ZERO_DATA) {
                _list[i].mark = UserMarkType.Empty;
            } else if (boardGrids[i] === myInfo.address) {
                _list[i].mark = myInfo.mark;
            } else if (boardGrids[i] === opInfo.address) {
                _list[i].mark = opInfo.mark;
            }
            _list[i].myValue = myIsPlayer1
                ? player1Bids[i].toNumber()
                : player2Bids[i].toNumber();
            _list[i].opValue = myIsPlayer1
                ? player2Bids[i].toNumber()
                : player1Bids[i].toNumber();
            _list[i].myMark = myInfo.mark;
            _list[i].opMark = opInfo.mark;
        }

        setAllSelectedGrids(
            _gridOrder.map((item: any) => {
                return item.toNumber();
            }),
        );

        setCurrentRound(_gridOrder.length);
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
                return [
                    _list,
                    myBalance,
                    opBalance,
                    undefined,
                    undefined,
                    true,
                ];
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

    const handleTextClick = async () => {
        navigate(`/btt/lobby?lobbyAddress=${lobbyAddress}`);
    };

    useEffect(() => {
        handleGetGameInfo();
    }, [
        multiProvider,
        multiSkylabBidTacToeGameContract,
        multiSkylabBidTacToeFactoryContract,
    ]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                justifyContent: "center",
                padding: "0 4.1667vw 0",
            }}
        >
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
                <ShareButtons
                    handleShare={handleShare}
                    handleTextClick={handleTextClick}
                ></ShareButtons>
            </Flex>
        </Box>
    );
};

export default ResultPlayBack;
