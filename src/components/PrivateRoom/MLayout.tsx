import { usePvpGameContext } from "@/pages/PvpRoom";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { MUserProfilePvp } from "./UserProfile";
import MBalance from "../BttComponents/MBalance";
import { GameState } from "@/skyConstants/bttGameTypes";
import Board from "../TacToe/Board";
import { MMessage } from "./Message";
import Timer from "../BttComponents/Timer";
import BottomInputBox from "../BttComponents/BottomInputBox";
import ToolBar from "../BttComponents/Toolbar";
import StatusProgress from "../BttComponents/StatusProgress";

const MLayout = ({
    inviteLink,
    handleQuitClick,
    handleShareTw,
    nextDrawWinner,
    autoCommitTimeoutTime,
    bidAmount,
    showAnimateNumber,
    onInputChange,
    onConfirm,
    onSetMessage,
    emoteIndex,
    messageIndex,
    emoteLoading,
    messageLoading,
    loading,
    revealing,
    handleBoardClick,
    showAnimateConfirm,
    onReveal,
}: any) => {
    const { isOpen: keyBoardIsOpen, onToggle: keyBoardOnToggle } =
        useDisclosure();

    const [inputMode, setInputMode] = useState<"message" | "keyboard">(null);

    const { myGameInfo, opGameInfo, myInfo, opInfo, list } =
        usePvpGameContext();
    const myGameState = myGameInfo.gameState;

    return (
        <Box
            sx={{
                position: "relative",
                paddingTop: "100px",
                height: "100%",
            }}
        >
            <ToolBar
                showLive={false}
                inviteLink={inviteLink}
                quitType="game"
                handleShareTw={handleShareTw}
                onQuitClick={handleQuitClick}
            ></ToolBar>
            <Flex
                sx={{
                    position: "absolute",
                    top: "12px",
                    left: 0,
                    alignItems: "flex-start",
                }}
                flexDir={"column"}
            >
                <Flex align={"flex-end"}>
                    <MUserProfilePvp
                        address={opInfo.address}
                        status="op"
                        mark={opInfo.mark}
                        showAdvantageTip={opInfo.address === nextDrawWinner}
                    ></MUserProfilePvp>
                    <MMessage
                        message={opGameInfo.message}
                        emote={opGameInfo.emote}
                        status={"op"}
                    ></MMessage>
                </Flex>

                <MBalance
                    balance={opGameInfo.balance}
                    mark={opInfo.mark}
                ></MBalance>
            </Flex>

            <Flex
                align={"center"}
                justify={"center"}
                flexDir={"column"}
                sx={{
                    marginTop: "36px",
                }}
            >
                <StatusProgress
                    myGameState={myGameInfo.gameState}
                    opGameState={opGameInfo.gameState}
                ></StatusProgress>
                <Box
                    sx={{
                        marginTop: "20px",
                    }}
                    onClick={handleBoardClick}
                >
                    <Board
                        list={list}
                        showAnimateNumber={showAnimateNumber}
                    ></Board>
                </Box>
            </Flex>
            <Box
                sx={{
                    position: "fixed",
                    bottom: "0",
                    left: "0",
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        height: "100px",
                        position: "relative",
                    }}
                >
                    <Flex justify={"space-between"} align={"flex-end"}>
                        {myGameInfo.gameState <= GameState.Revealed && (
                            <Box
                                sx={{
                                    width: "160px",
                                    position: "absolute",
                                    left: "12px",
                                    bottom: "20px",
                                }}
                            >
                                <Timer
                                    time1={autoCommitTimeoutTime}
                                    time1Gray={
                                        loading ||
                                        revealing ||
                                        (myGameInfo.gameState ===
                                            GameState.Commited &&
                                            opGameInfo.gameState ===
                                                GameState.WaitingForBid) ||
                                        myGameInfo.gameState ===
                                            GameState.Revealed
                                    }
                                ></Timer>
                            </Box>
                        )}
                    </Flex>
                    <Flex
                        sx={{
                            position: "absolute",
                            bottom: "16px",
                            right: 0,
                        }}
                        flexDir={"column"}
                        align={"flex-end"}
                    >
                        <Flex align={"flex-end"}>
                            <MMessage
                                message={myGameInfo.message}
                                emote={myGameInfo.emote}
                                status={"my"}
                                emoteIndex={emoteIndex}
                                messageIndex={messageIndex}
                                emoteLoading={emoteLoading}
                                messageLoading={messageLoading}
                            ></MMessage>

                            <MUserProfilePvp
                                status="my"
                                address={myInfo.address}
                                mark={myInfo.mark}
                                showAdvantageTip={
                                    myInfo.address === nextDrawWinner
                                }
                            ></MUserProfilePvp>
                        </Flex>

                        <MBalance
                            balance={myGameInfo.balance}
                            status="right"
                            mark={myInfo.mark}
                        ></MBalance>
                    </Flex>
                </Box>
                <BottomInputBox
                    showAnimateConfirm={showAnimateConfirm}
                    onSetMessage={onSetMessage}
                    myBalance={myGameInfo.balance}
                    bidAmount={bidAmount}
                    myGameState={myGameState}
                    opGameState={opGameInfo.gameState}
                    loading={loading}
                    revealing={revealing}
                    onIuputAmount={(amount: number) => {
                        onInputChange(amount);
                    }}
                    onInputAmountClick={() => {
                        if (inputMode === "keyboard") {
                            keyBoardOnToggle();
                        } else {
                            setInputMode("keyboard");
                            if (!keyBoardIsOpen) {
                                keyBoardOnToggle();
                            }
                        }
                    }}
                    onSubClick={() => {
                        if (Number(bidAmount) - 1 < 0) return;
                        onInputChange(Number(bidAmount) - 1);
                    }}
                    onAddClick={() => {
                        if (
                            Number(bidAmount) + 1 <=
                            Number(myGameInfo.balance)
                        ) {
                            onInputChange(Number(bidAmount) + 1);
                        }
                    }}
                    onConfirm={onConfirm}
                    onReveal={onReveal}
                ></BottomInputBox>
            </Box>
        </Box>
    );
};

export default MLayout;
