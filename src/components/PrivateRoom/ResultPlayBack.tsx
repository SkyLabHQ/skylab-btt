import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import {
    PvpGameStatus,
    UserMarkType,
    getPvpWinState,
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

    const [currentRound, setCurrentRound] = useState(0);

    const gameOver = useMemo(() => {
        return currentRound === gameInfo.gridIndex;
    }, [currentRound, gameInfo]);

    const [showList, myBalance, opBalance] = useMemo(() => {
        let myBalance = 100,
            opBalance = 100;
        const _list = initBoard();
        const gridOrder = gameInfo.gridOrder;
        const currentGrid = gridOrder[currentRound];
        const boards = gameInfo.boards;

        for (let i = 0; i < currentRound; i++) {
            const grid = gridOrder[i];
            const winAddress = boards[grid].win;
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
            myBalance -= _list[grid].myValue;
            opBalance -= _list[grid].opValue;

            if (currentRound <= gameInfo.gridIndex) {
                _list[currentGrid].mark = UserMarkType.Square;
            }
        }

        console.log(myBalance, opBalance, currentRound, "_list");

        if (currentRound == 0) {
            return [_list, myBalance, opBalance, true];
        }

        if (currentRound - 1 === gameInfo.gridIndex) {
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

        return [_list, myBalance, opBalance];
    }, [currentRound, gameInfo, myGameInfo, opGameInfo]);

    const handlePreStep = () => {
        if (currentRound === 0) return;
        setCurrentRound(currentRound - 1);
    };

    const handleNextStep = () => {
        setCurrentRound((currentRound) => {
            if (currentRound >= gameInfo.gridIndex + 1) {
                return currentRound;
            }
            return currentRound + 1;
        });
    };

    const handleStartStep = () => {
        setCurrentRound(0);
    };

    const handleEndStep = () => {
        setCurrentRound(gameInfo.gridIndex);
    };

    const handleShare = () => {};

    const handleTextClick = async () => {
        navigate("/free/pvp/home", {
            replace: true,
        });
    };

    console.log(myBalance, opBalance, currentRound);

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
                currentRound={currentRound}
                allRound={gameInfo.gridIndex + 1}
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
                    showNext={currentRound < gameInfo.gridIndex + 1}
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
