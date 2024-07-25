import React from "react";
import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import Board from "@/components/BttComponents/Board";
import { getWinState } from "@/skyConstants/bttGameTypes";
import MBalance from "../BttComponents/MBalance";
import { MUserProfileResult } from "../PrivateRoom/UserProfile";
import ResultUserCard from "../BttComponents/ResultUserCard";

const GameOver = ({
    myInfo,
    opInfo,
    myGameInfo,
    opGameInfo,
    list,
    onStep,
}: {
    myInfo: any;
    opInfo: any;
    myGameInfo: any;
    opGameInfo: any;
    list: any;
    onStep: any;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
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
                    opacity: !isMyWin ? 1 : 0.5,
                }}
                flexDir={"column"}
            >
                <MUserProfileResult
                    address={""}
                    position="left"
                    img={opInfo.img}
                    level={opInfo.level}
                ></MUserProfileResult>
                <MBalance
                    balance={opGameInfo.balance}
                    mark={opInfo.mark}
                    showResult={true}
                    win={!isMyWin}
                    status="left"
                ></MBalance>
            </Flex>
            <Flex
                sx={{
                    position: "absolute",
                    right: 0,
                    top: "480px",
                    opacity: isMyWin ? 1 : 0.5,
                }}
                flexDir={"column"}
                align={"flex-end"}
            >
                <MUserProfileResult
                    position="right"
                    address={""}
                    img={myInfo.img}
                    level={myInfo.level}
                ></MUserProfileResult>
                <MBalance
                    balance={myGameInfo.balance}
                    status="right"
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
