import React from "react";
import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import Board from "@/components/TacToe/Board";
import { usePrivateGameContext } from "@/pages/PrivateRoom";
import ResultUserCard from "../TacToe/ResultUserCard";
import { getWinState } from "@/skyConstants/bttGameTypes";
import { MUserProfile } from "./UserProfile";
import MBalance from "../BttComponents/MBalance";

const GameOver = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const { myInfo, opInfo, myGameInfo, opGameInfo, list, handleStepChange } =
        usePrivateGameContext();

    return isPc ? (
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
    ) : (
        <Box
            sx={{
                padding: "6vw 3.125vw",
                position: "relative",
                width: "100vw",
                height: "100vh",
            }}
            onClick={() => {
                handleStepChange(3);
            }}
        >
            <Flex justify={"space-between"}>
                <Box>
                    <MUserProfile
                        status="my"
                        avatar={myInfo.avatar}
                        name={myInfo.name}
                        mark={myInfo.mark}
                    ></MUserProfile>
                    <MBalance balance={myGameInfo.balance}></MBalance>
                </Box>
                <Box>
                    <MUserProfile
                        status="op"
                        avatar={opInfo.avatar}
                        name={opInfo.name}
                        mark={opInfo.mark}
                    ></MUserProfile>
                    <MBalance balance={opGameInfo.balance}></MBalance>
                </Box>
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
