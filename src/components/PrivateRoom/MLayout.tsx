import { useBttGameRetry } from "@/hooks/useRetryContract";
import { usePrivateGameContext } from "@/pages/PrivateRoom";
import { Box, Button, Image, Flex, Text, SimpleGrid } from "@chakra-ui/react";
import React, { useState } from "react";
import { MUserProfile } from "./UserProfile";
import MBalance from "../BttComponents/MBalance";
import Timer from "./Timer";
import { GameState } from "@/skyConstants/bttGameTypes";
import Board from "../TacToe/Board";
import AddIcon from "@/assets/add-icon.svg";
import SubIcon from "@/assets/sub-icon.svg";

const MLayout = ({
    nextDrawWinner,
    autoCommitTimeoutTime,
    bufferTime,
    bidAmount,
    showAnimateNumber,
    onInputChange,
    onConfirm,
}: any) => {
    const [loading, setLoading] = useState<boolean>(false);
    const {
        myGameInfo,
        opGameInfo,
        bidTacToeGameAddress,
        myInfo,
        opInfo,
        list,
        onList,
        handleStepChange,
    } = usePrivateGameContext();
    const tacToeGameRetryWrite = useBttGameRetry(bidTacToeGameAddress);
    const myGameState = myGameInfo.gameState;
    const balance = myGameInfo.balance;

    return (
        <Box
            sx={{
                padding: "12px",
            }}
        >
            <Flex justify={"space-between"}>
                <Box>
                    <MUserProfile
                        status="my"
                        avatar={myInfo.avatar}
                        name={myInfo.name}
                        mark={myInfo.mark}
                        showAdvantageTip={myInfo.address === nextDrawWinner}
                    ></MUserProfile>
                    <MBalance balance={myGameInfo.balance}></MBalance>
                </Box>

                <Box>
                    <MUserProfile
                        status="op"
                        avatar={opInfo.avatar}
                        name={opInfo.name}
                        mark={opInfo.mark}
                        showAdvantageTip={opInfo.address === nextDrawWinner}
                    ></MUserProfile>
                    <MBalance balance={opGameInfo.balance}></MBalance>
                </Box>
            </Flex>
            {myGameInfo.gameState < GameState.Commited && (
                <Timer
                    time1={autoCommitTimeoutTime}
                    time2={bufferTime}
                    time1Gray={
                        myGameInfo.gameState === GameState.Commited || loading
                    }
                ></Timer>
            )}
            <Flex
                align={"center"}
                justify={"center"}
                sx={{
                    marginTop: "10px",
                }}
            >
                <Board
                    list={list}
                    showAnimateNumber={showAnimateNumber}
                ></Board>
            </Flex>
            <Box
                sx={{
                    background: "#787878",
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    width: "100%",
                }}
            >
                <Flex
                    sx={{
                        height: "48px",
                    }}
                    align={"center"}
                >
                    <Flex
                        sx={{
                            borderRadius: "8px",
                            border: "2px solid #fff",
                            width: "172px",
                            height: "32px",
                            background: "#616161",
                        }}
                        justify={"space-between"}
                    >
                        <Image
                            src={SubIcon}
                            sx={{
                                width: "16px",
                            }}
                            onClick={() => {
                                if (bidAmount - 1 < 0) return;

                                onInputChange(bidAmount - 1);
                            }}
                        ></Image>
                        <Box>
                            {bidAmount !== "" ? (
                                <Text
                                    sx={{
                                        width: "100px",
                                        color: "#fff",
                                        fontSize: "20px",
                                        textAlign: "center",
                                    }}
                                >
                                    {bidAmount}
                                </Text>
                            ) : (
                                <Text
                                    sx={{
                                        width: "100px",
                                        color: "rgba(120, 120, 120, 1)",
                                        fontSize: "20px",
                                    }}
                                >
                                    Input Bid
                                </Text>
                            )}
                        </Box>
                        <Image
                            src={AddIcon}
                            onClick={() => {
                                if (bidAmount + 1 > balance) return;

                                onInputChange(bidAmount + 1);
                            }}
                            sx={{
                                width: "16px",
                            }}
                        ></Image>
                    </Flex>

                    <>
                        {loading ? (
                            <Button
                                disabled={true}
                                variant={"outline"}
                                sx={{
                                    color: "#BCBBBE",
                                    borderRadius: "0.9375vw",
                                    fontSize: "20px",
                                    height: "32px",
                                    width: "100px",
                                    marginTop: "0.5208vw",
                                    "&:disabled": {
                                        border: "2px solid #fff !important",
                                        opacity: 1,
                                        background: "transparent",
                                    },
                                    "&:hover[disabled]": {
                                        background: "transparent",
                                    },
                                }}
                            >
                                Confirming
                            </Button>
                        ) : (
                            <Button
                                onClick={() => {
                                    onConfirm();
                                }}
                                disabled={
                                    myGameState === GameState.Commited ||
                                    myGameState === GameState.Revealed
                                }
                                variant={"outline"}
                                sx={{
                                    color: "#fddc2d",
                                    border: "2px solid #fddc2d !important",
                                    borderRadius: "0.9375vw",
                                    background:
                                        myGameState === GameState.Commited ||
                                        myGameState === GameState.Revealed
                                            ? "linear-gradient(180deg, rgba(253, 220, 45, 0.50) 0%, rgba(253, 220, 45, 0.00) 100%)"
                                            : "transparent",
                                    fontSize: "20px",
                                    height: "32px",
                                    width: "100px",
                                    marginTop: "0.5208vw",
                                    "&:disabled": {
                                        border: "2px solid #fddc2d !important",
                                        opacity: 1,
                                    },
                                    "&:hover[disabled]": {
                                        background:
                                            myGameState ===
                                                GameState.Commited ||
                                            myGameState === GameState.Revealed
                                                ? "linear-gradient(180deg, rgba(253, 220, 45, 0.50) 0%, rgba(253, 220, 45, 0.00) 100%)"
                                                : "transparent",
                                    },
                                }}
                            >
                                {myGameState === GameState.Commited ||
                                myGameState === GameState.Revealed
                                    ? "Confirmed"
                                    : "Confirm"}
                            </Button>
                        )}
                    </>
                </Flex>
                <Box
                    sx={{
                        background: "#303030",
                        padding: "10px",
                    }}
                >
                    <SimpleGrid columns={3} spacingX={2} spacingY={2}>
                        {[1, 2, 3, 4, 5, 6].map((item) => {
                            return (
                                <Flex
                                    onClick={() => {
                                        if (
                                            item + bidAmount >
                                            myGameInfo.balance
                                        ) {
                                            onInputChange(myGameInfo.balance);
                                            return;
                                        }
                                        onInputChange(item + bidAmount);
                                    }}
                                    align={"center"}
                                    justify={"center"}
                                    key={item}
                                    sx={{
                                        borderRadius: "4px",
                                        background: "#787878",
                                        height: "40px",
                                        fontSize: "28px",
                                    }}
                                >
                                    +{item}
                                </Flex>
                            );
                        })}
                    </SimpleGrid>
                </Box>
            </Box>
        </Box>
    );
};

export default MLayout;
