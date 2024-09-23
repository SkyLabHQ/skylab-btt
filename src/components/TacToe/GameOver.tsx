import React, { useMemo } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Board from "@/components/BttComponents/Board";
import {
    Game2Status,
    getPvpWinState,
    winPatterns,
} from "@/skyConstants/bttGameTypes";
import {
    MMyTourUserProfile,
    MOpTourUserProfile,
} from "../PrivateRoom/UserProfile";
import { useGameContext } from "@/pages/TacToe";
import { OpResultCard, ResultCard } from "../BttComponents/ResultUserCard";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";
import { shortenAddress } from "@/utils";
import { MyBalance, OpBalance } from "../BttComponents/PlaneUserCard";

const GameOver = ({ gameState }: { gameState: Game2Status }) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    const { myGameInfo, opGameInfo, list, handleStepChange } = useGameContext();

    const isMyWin = getPvpWinState(gameState);
    const resultList = useMemo(() => {
        const _list = [...list];

        const myGameState = myGameInfo.gameState;
        const isMyWin = getPvpWinState(myGameState);
        let beforeMark = isMyWin ? myGameInfo.mark : opGameInfo.mark;
        let mark = isMyWin ? myGameInfo.winMark : opGameInfo.winMark;
        if (
            gameState === Game2Status.WinByConnecting ||
            gameState === Game2Status.LoseByConnecting
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

    return isPc ? (
        <Flex
            sx={{
                padding: "115px 60px",
                position: "relative",
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "space-between",
            }}
            onClick={() => {
                handleStepChange();
            }}
        >
            <Box
                sx={{
                    width: "300px",
                }}
            >
                <ResultCard win={isMyWin} userInfo={myGameInfo}></ResultCard>
                <MyBalance
                    win={isMyWin}
                    balance={myGameInfo.balance}
                    mark={myGameInfo.mark}
                ></MyBalance>
            </Box>
            <Box
                sx={{
                    paddingTop: "30px",
                }}
            >
                <Board list={resultList}></Board>
                <Text
                    sx={{
                        textAlign: "center",
                        fontSize: "24px",
                        marginTop: "30px",
                    }}
                >
                    Tap anywhere to continue
                </Text>
            </Box>
            <Flex
                sx={{
                    width: "300px",
                }}
                flexDir={"column"}
                align={"flex-end"}
            >
                <OpResultCard
                    win={!isMyWin}
                    userInfo={opGameInfo}
                ></OpResultCard>
                <OpBalance
                    win={!isMyWin}
                    balance={opGameInfo.balance}
                    mark={opGameInfo.mark}
                ></OpBalance>
            </Flex>
        </Flex>
    ) : (
        <Box
            sx={{
                paddingTop: "100px",
                position: "relative",
                width: "100%",
                height: "100%",
            }}
            onClick={() => {
                handleStepChange();
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
                <MOpTourUserProfile
                    balance={opGameInfo.balance}
                    name={
                        opGameInfo.username
                            ? `@${opGameInfo.username}`
                            : shortenAddress(opGameInfo.address)
                    }
                    photoUrl={opGameInfo.photoUrl}
                    mark={opGameInfo.mark}
                    win={!isMyWin}
                ></MOpTourUserProfile>
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
                <MMyTourUserProfile
                    name={
                        myGameInfo.username
                            ? `@${myGameInfo.username}`
                            : shortenAddress(myGameInfo.address)
                    }
                    balance={myGameInfo.balance}
                    photoUrl={myGameInfo.photoUrl}
                    mark={myGameInfo.mark}
                    win={isMyWin}
                ></MMyTourUserProfile>
            </Flex>

            <Flex
                sx={{
                    marginTop: "40px",
                }}
                justify={"center"}
                flexDir={"column"}
                align={"center"}
            >
                <Board list={list}></Board>
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
