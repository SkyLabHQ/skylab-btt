import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import {
    BoardItem,
    GameState,
    PvpGameStatus,
    UserMarkType,
    getPvpWinState,
    getShareEmoji,
    getWinState,
    initBoard,
    winPatterns,
} from "@/skyConstants/bttGameTypes";
import { PLayerStatus, usePvpGameContext } from "@/pages/PvpRoom";
import PrivateLobbyPlayBack from "./PrivateLobbyPlayBack";
import PlayBackButton from "../BttPlayBack/PlayBackButton";
import ShareButtons from "./ShareButton";
import useBidIcon from "@/hooks/useBidIcon";
import { useNavigate } from "react-router-dom";

const ResultPlayBack = ({ gameInfo }: { gameInfo: any }) => {
    const navigate = useNavigate();
    const UserMarkIcon = useBidIcon();
    const { myGameInfo, opGameInfo } = usePvpGameContext();
    const [init, setInit] = useState(false);
    const [allSelectedGrids, setAllSelectedGrids] = useState<any[]>([]);
    const [currentRound, setCurrentRound] = useState(0);

    const [resultList, setResultList] = useState<BoardItem[]>(initBoard()); // init board

    const gameOver = useMemo(() => {
        return currentRound === allSelectedGrids.length && init;
    }, [currentRound, allSelectedGrids, init]);

    const [showList, myBalance, opBalance, myBid, opBid, myIsNextDrawWinner] =
        useMemo(() => {
            let myBalance = 100,
                opBalance = 100;
            const _list = initBoard();
            const gridOrder = gameInfo.gridOrder;
            const currentGrid = gridOrder[currentRound];
            const boards = gameInfo.boards;
            if (allSelectedGrids[currentRound] !== undefined) {
                _list[currentGrid].mark = UserMarkType.Square;
            }

            for (let i = 0; i < currentRound; i++) {
                const winAddress = boards[i].win;

                const grid = gridOrder[currentRound];
                _list[grid].mark =
                    winAddress === 1 ? UserMarkType.Circle : UserMarkType.Cross;
                _list[grid].myMark = myGameInfo.mark;
                _list[grid].opMark = opGameInfo.mark;
                _list[grid].myValue =
                    myGameInfo.playerStatus === PLayerStatus.Player1
                        ? boards[grid].bid1
                        : boards[grid].bid2;
                _list[grid].opValue =
                    opGameInfo.playerStatus === PLayerStatus.Player1
                        ? boards[grid].bid1
                        : boards[grid].bid2;
                myBalance -= boards[grid].myValue;
                opBalance -= boards[grid].opValue;
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
                const myGameState = myGameInfo.gameState;
                const isMyWin = getPvpWinState(myGameState);
                let beforeMark = isMyWin ? myGameInfo.mark : opGameInfo.mark;
                let mark = isMyWin ? myGameInfo.winMark : opGameInfo.winMark;

                if (
                    myGameState === PvpGameStatus.WinByConnecting ||
                    myGameState === PvpGameStatus.LoseByConnecting
                ) {
                    for (let i = 0; i < winPatterns.length; i++) {
                        const index0 = winPatterns[i][0];
                        const index1 = winPatterns[i][1];
                        const index2 = winPatterns[i][2];
                        if (
                            _list[index0].mark === beforeMark &&
                            _list[index0].mark === _list[index1].mark &&
                            _list[index0].mark === _list[index2].mark
                        ) {
                            _list[index0].mark = mark;
                            _list[index1].mark = mark;
                            _list[index2].mark = mark;
                            break;
                        }
                    }
                } else {
                    for (let i = 0; i < _list.length; i++) {
                        if (_list[i].mark === beforeMark) {
                            _list[i].mark = mark;
                        }
                    }
                }
            }

            const myBid =
                currentRound === 0
                    ? 0
                    : _list[gridOrder[currentRound - 1]].myValue;
            const opBid =
                currentRound === 0
                    ? 0
                    : _list[gridOrder[currentRound - 1]].opValue;

            let myIsNextDrawWinner = false;
            myIsNextDrawWinner = boards[gridOrder[currentRound]].advantage;

            return [
                _list,
                myBalance,
                opBalance,
                myBid,
                opBid,
                myIsNextDrawWinner,
                gameInfo,
            ];
        }, [
            allSelectedGrids,
            currentRound,
            resultList,
            myGameInfo,
            opGameInfo,
        ]);

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

    const handleShare = () => {};

    const handleTextClick = async () => {
        navigate("/free/pvp/home", {
            replace: true,
        });
    };

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
                myBalance={myBalance}
                opBalance={opBalance}
                // myBid={myBid}
                // opBid={opBid}
                myIsNextDrawWinner={myIsNextDrawWinner}
                currentRound={currentRound}
                allSelectedGrids={allSelectedGrids}
                myGameInfo={myGameInfo}
                opGameInfo={opGameInfo}
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
