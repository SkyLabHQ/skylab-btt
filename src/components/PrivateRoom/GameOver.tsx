import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Board from "@/components/TacToe/Board";
import { usePrivateGameContext } from "@/pages/PrivateRoom";
import ResultUserCard from "../TacToe/ResultUserCard";
import { getWinState } from "@/skyConstants/bttGameTypes";

const GameOver = () => {
    const { myInfo, opInfo, myGameInfo, opGameInfo, list, handleStepChange } =
        usePrivateGameContext();

    return (
        <Flex
            sx={{
                padding: "6vw 3.125vw",
                position: "relative",
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "space-between",
            }}
            onClick={() => {
                handleStepChange(3);
            }}
        >
            <Box
                sx={{
                    width: "15.625vw",
                }}
            >
                <ResultUserCard
                    showResult
                    win={getWinState(myGameInfo.gameState)}
                    userInfo={myInfo}
                ></ResultUserCard>
            </Box>
            <Box
                sx={{
                    paddingTop: "1.5625vw",
                }}
            >
                <Board list={list}></Board>
                <Text
                    sx={{
                        textAlign: "center",
                        fontSize: "1.25vw",
                        marginTop: "1.5625vw",
                    }}
                >
                    Tap anywhere to continue
                </Text>
            </Box>
            <Box
                sx={{
                    width: "15.625vw",
                }}
            >
                <ResultUserCard
                    win={getWinState(opGameInfo.gameState)}
                    userInfo={opInfo}
                ></ResultUserCard>
            </Box>
        </Flex>
    );
};

export default GameOver;
