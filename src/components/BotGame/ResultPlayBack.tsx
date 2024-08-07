import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import {
    useMultiProvider,
    useMultiSkylabBidTacToeFactoryContract,
    useMultiSkylabBidTacToeGameContract,
} from "@/hooks/useMultiContract";
import { ZERO_DATA } from "@/skyConstants";
import BttPlayBackContent from "../BttPlayBack/BttPlayBackContent";
import {
    BoardItem,
    GameInfo,
    GameState,
    Info,
    UserMarkType,
    getShareEmoji,
    getWinState,
    initBoard,
    winPatterns,
} from "@/skyConstants/bttGameTypes";
import PlayBackButton from "../BttPlayBack/PlayBackButton";
import ShareButtons from "../PrivateRoom/ShareButton";
import { useNavigate } from "react-router-dom";
import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";

const ResultPage = ({
    gameAddress,
    myInfo,
    myGameInfo,
    opInfo,
    opGameInfo,
}: {
    gameAddress: string;
    myInfo: Info;
    myGameInfo: GameInfo;
    opInfo: Info;
    opGameInfo: GameInfo;
}) => {
    const navigate = useNavigate();
    const ethcallProvider = useMultiProvider(TESTFLIGHT_CHAINID);
    const [allSelectedGrids, setAllSelectedGrids] = useState<any[]>([]);
    const [currentRound, setCurrentRound] = useState(0);
    const multiSkylabBidTacToeFactoryContract =
        useMultiSkylabBidTacToeFactoryContract();
    const multiSkylabBidTacToeGameContract =
        useMultiSkylabBidTacToeGameContract(gameAddress);
    const [resultList, setResultList] = useState<BoardItem[]>(initBoard()); // init board

    const gameOver = useMemo(() => {
        return currentRound === allSelectedGrids.length;
    }, [currentRound, allSelectedGrids]);

    const myMark = useMemo(() => {
        if (myInfo.mark === UserMarkType.Circle) {
            if (getWinState(myGameInfo.gameState) && gameOver) {
                return UserMarkType.YellowCircle;
            } else {
                return UserMarkType.Circle;
            }
        } else {
            if (getWinState(myGameInfo.gameState) && gameOver) {
                return UserMarkType.YellowCross;
            } else {
                return UserMarkType.Cross;
            }
        }
    }, [myGameInfo, myInfo, gameOver]);

    const opMark = useMemo(() => {
        if (opInfo.mark === UserMarkType.Circle) {
            if (getWinState(opGameInfo.gameState) && gameOver) {
                return UserMarkType.YellowCircle;
            } else {
                return UserMarkType.Circle;
            }
        } else {
            if (getWinState(opGameInfo.gameState) && gameOver) {
                return UserMarkType.YellowCross;
            } else {
                return UserMarkType.Cross;
            }
        }
    }, [opInfo, opGameInfo]);

    const handleGetGameInfo = async () => {
        if (
            !multiSkylabBidTacToeGameContract ||
            !multiSkylabBidTacToeFactoryContract ||
            !ethcallProvider
        )
            return;

        const [boardGrids, player1, player2] = await ethcallProvider.all([
            multiSkylabBidTacToeGameContract.getGrid(),
            multiSkylabBidTacToeGameContract.player1(),
            multiSkylabBidTacToeGameContract.player2(),
        ]);

        const [player1Bids, player2Bids] = await ethcallProvider.all([
            multiSkylabBidTacToeGameContract.getRevealedBids(player1),
            multiSkylabBidTacToeGameContract.getRevealedBids(player2),
        ]);

        const myIsPlayer1 = player1 === myInfo.burner;

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
            } else if (boardGrids[i] === myInfo.burner) {
                _list[i].mark = myInfo.mark;
            } else if (boardGrids[i] === opInfo.burner) {
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
            return currentRound + 1;
        });
    };

    const handleStartStep = () => {
        setCurrentRound(0);
    };

    const handleEndStep = () => {
        setCurrentRound(allSelectedGrids.length);
    };

    useEffect(() => {
        handleGetGameInfo();
    }, [
        ethcallProvider,
        multiSkylabBidTacToeGameContract,
        multiSkylabBidTacToeFactoryContract,
    ]);

    const handleShare = () => {
        const text = getShareEmoji(
            myInfo.mark,
            resultList,
            getWinState(myGameInfo.gameState),
        );

        const url = `${window.location.origin}`;

        const des = `A fully on-chain cryptoeconomic game of deduction and psychology`;

        const value = `${text}

${url}

${des}`;

        window.open(
            `https://x.com/intent/post?text=${encodeURIComponent(value)}`,
        );
    };

    const handleNext = async () => {
        navigate("/free/botHome");
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "100%",
                justifyContent: "center",
                padding: "0px 4.1667vw 0",
            }}
        >
            <BttPlayBackContent
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
                gameOver={gameOver}
                myGameInfo={myGameInfo}
                opGameInfo={opGameInfo}
                showList={showList}
            ></BttPlayBackContent>

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
                    text="Next"
                    handleShare={handleShare}
                    handleTextClick={handleNext}
                ></ShareButtons>
            </Flex>
        </Box>
    );
};

export default ResultPage;
