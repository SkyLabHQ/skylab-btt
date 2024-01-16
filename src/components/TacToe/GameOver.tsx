import React from "react";
import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import Board from "@/components/TacToe/Board";
import ResultUserCard from "../TacToe/ResultUserCard";
import { getWinState } from "@/skyConstants/bttGameTypes";
import MBalance from "../BttComponents/MBalance";
import { MUserProfile } from "../PrivateRoom/UserProfile";
import { useGameContext } from "@/pages/TacToe";

const GameOver = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const { myInfo, opInfo, myGameInfo, opGameInfo, list, onStep } =
        useGameContext();

    const isMyWin = getWinState(myGameInfo.gameState);

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
                onStep();
            }}
        >
            <Box
                sx={{
                    width: "15.625vw",
                }}
            >
                <ResultUserCard
                    win={isMyWin}
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
                    win={!isMyWin}
                    userInfo={opInfo}
                ></ResultUserCard>
            </Box>
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
                onStep();
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
                <MUserProfile
                    status="op"
                    address={opInfo.address}
                    img={opInfo.img}
                    mark={opInfo.mark}
                    open={true}
                ></MUserProfile>
                <MBalance
                    balance={opGameInfo.balance}
                    mark={opInfo.mark}
                    showResult={true}
                    win={!isMyWin}
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
                <MUserProfile
                    status="my"
                    address={myInfo.address}
                    img={myInfo.img}
                    mark={myInfo.mark}
                    open={true}
                ></MUserProfile>
                <MBalance
                    balance={myGameInfo.balance}
                    status="op"
                    mark={myInfo.mark}
                    showResult={true}
                    win={isMyWin}
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
