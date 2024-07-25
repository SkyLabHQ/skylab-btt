import React, { useMemo } from "react";
import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import Board from "@/components/BttComponents/Board";
import { PLayerStatus, usePvpGameContext } from "@/pages/PvpRoom";
import {
    getPvpWinState,
    PvpGameStatus,
    UserMarkType,
    winPatterns,
} from "@/skyConstants/bttGameTypes";
import { MUserProfileResult } from "./UserProfile";
import MBalance from "../BttComponents/MBalance";

const GameOver = ({ gameState }: { gameState: PvpGameStatus }) => {
    const { myGameInfo, opGameInfo, list, handleStepChange } =
        usePvpGameContext();

    const player1IsWin = getPvpWinState(gameState);

    const resultList = useMemo(() => {
        const _list = [...list];

        let beforeMark = player1IsWin
            ? UserMarkType.Circle
            : UserMarkType.Cross;
        let mark = player1IsWin
            ? UserMarkType.YellowCircle
            : UserMarkType.YellowCross;

        if (
            gameState === PvpGameStatus.WinByConnecting ||
            gameState === PvpGameStatus.LoseByConnecting
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

        return _list;
    }, [list]);

    return (
        <Box
            sx={{
                paddingTop: "100px",
                position: "relative",
                width: "100%",
                height: "100%",
            }}
            onClick={() => {
                handleStepChange(2);
            }}
        >
            <Flex
                sx={{
                    position: "absolute",
                    top: "24px",
                    left: 0,
                    alignItems: "flex-start",
                }}
                flexDir={"column"}
            >
                <MUserProfileResult
                    position="left"
                    mark={opGameInfo.mark}
                ></MUserProfileResult>
                <MBalance
                    balance={opGameInfo.balance}
                    mark={opGameInfo.mark}
                    showResult={true}
                    status="left"
                ></MBalance>
            </Flex>
            <Flex
                sx={{
                    position: "absolute",
                    right: 0,
                    top: "480px",
                }}
                flexDir={"column"}
                align={"flex-end"}
            >
                <MUserProfileResult
                    position="right"
                    mark={myGameInfo.mark}
                ></MUserProfileResult>
                <MBalance
                    balance={myGameInfo.balance}
                    status="right"
                    mark={myGameInfo.mark}
                    showResult={true}
                ></MBalance>
            </Flex>

            <Flex
                sx={{
                    marginTop: "40px",
                }}
                justify={"center"}
                flexDir={"column"}
                align={"center"}
            >
                <Board list={resultList}></Board>
                <Text
                    sx={{
                        fontSize: "12px",
                        marginTop: "30px",
                    }}
                >
                    Tap anywhere to continue
                </Text>
            </Flex>
        </Box>
    );
};

export default GameOver;
