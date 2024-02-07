import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import MBalance from "../BttComponents/MBalance";
import { GameState } from "@/skyConstants/bttGameTypes";
import Board from "../TacToe/Board";
import { MMessage } from "@/components/PrivateRoom/Message";
import BottomKeyBoard from "../BttComponents/ChatMessage";
import { useGameContext } from "@/pages/TacToe";
import { MUserProfile } from "../PrivateRoom/UserProfile";
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
    bufferTime,
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
}: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure({
        defaultIsOpen: true,
    });
    const { isOpen: opIsOpen, onToggle: opOnToggle } = useDisclosure({
        defaultIsOpen: true,
    });

    const { isOpen: keyBoardIsOpen, onToggle: keyBoardOnToggle } =
        useDisclosure();

    const [inputMode, setInputMode] = useState<"message" | "keyboard">(null);

    const { myGameInfo, opGameInfo, myInfo, opInfo, list } = useGameContext();
    const myGameState = myGameInfo.gameState;

    useEffect(() => {
        if (messageLoading || emoteLoading) {
            onClose();
        }
    }, [messageLoading, emoteLoading]);

    return (
        <Box
            sx={{
                position: "relative",
                paddingTop: "100px",
                height: "100%",
            }}
        >
            <ToolBar
                quitType="game"
                inviteLink={inviteLink}
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
                    <MUserProfile
                        status="op"
                        address={opInfo.address}
                        img={opInfo.img}
                        mark={opInfo.mark}
                        showAdvantageTip={opInfo.address === nextDrawWinner}
                        open={opIsOpen}
                        onClick={() => {
                            opOnToggle();
                        }}
                        level={opInfo.level}
                    ></MUserProfile>
                    {!opIsOpen && (
                        <MMessage
                            message={opGameInfo.message}
                            emote={opGameInfo.emote}
                            status={"op"}
                        ></MMessage>
                    )}
                </Flex>
                <MBalance
                    balance={opGameInfo.balance}
                    mark={opInfo.mark}
                    status="left"
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
                >
                    <Board
                        list={list}
                        showAnimateNumber={showAnimateNumber}
                    ></Board>
                </Box>
            </Flex>
            <Box
                sx={{
                    position: "absolute",
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
                        {myGameInfo.gameState < GameState.Commited && (
                            <Box
                                sx={{
                                    width: "160px",
                                    position: "absolute",
                                    left: "12px",
                                    bottom: "20px",
                                }}
                            >
                                <Timer
                                    direction="top"
                                    time1={autoCommitTimeoutTime}
                                    time2={bufferTime}
                                    time1Gray={
                                        myGameInfo.gameState ===
                                            GameState.Commited || loading
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
                            {!isOpen && (
                                <MMessage
                                    message={myGameInfo.message}
                                    emote={myGameInfo.emote}
                                    status={"my"}
                                    emoteIndex={emoteIndex}
                                    messageIndex={messageIndex}
                                    emoteLoading={emoteLoading}
                                    messageLoading={messageLoading}
                                ></MMessage>
                            )}
                            <MUserProfile
                                status="my"
                                address={myInfo.address}
                                img={myInfo.img}
                                mark={myInfo.mark}
                                showAdvantageTip={
                                    myInfo.address === nextDrawWinner
                                }
                                open={isOpen}
                                onClick={() => {
                                    if (isOpen) {
                                        onClose();
                                    } else {
                                        onOpen();
                                    }
                                }}
                                level={myInfo.level}
                            ></MUserProfile>
                        </Flex>

                        <MBalance
                            balance={myGameInfo.balance}
                            status="right"
                            mark={myInfo.mark}
                        ></MBalance>
                    </Flex>
                </Box>
                <BottomInputBox
                    onSetMessage={onSetMessage}
                    myBalance={myGameInfo.balance}
                    bidAmount={bidAmount}
                    myGameState={myGameState}
                    loading={loading}
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
                    onMessageClick={() => {
                        if (inputMode === "message") {
                            keyBoardOnToggle();
                        } else {
                            setInputMode("message");
                            if (!keyBoardIsOpen) {
                                keyBoardOnToggle();
                            }
                        }
                    }}
                ></BottomInputBox>
                <BottomKeyBoard
                    open={keyBoardIsOpen}
                    inputMode={inputMode}
                    onSetMessage={onSetMessage}
                    onNumberClick={(value: string) => {
                        if (
                            Number(value) + Number(bidAmount) >
                            myGameInfo.balance
                        ) {
                            onInputChange(myGameInfo.balance);
                            return;
                        }
                        onInputChange(Number(value) + Number(bidAmount));
                    }}
                    onDeleteClick={() => {
                        const value = bidAmount.toString();
                        const length = value.length;
                        const newValue = value.slice(0, length - 1);
                        onInputChange(newValue);
                    }}
                ></BottomKeyBoard>
            </Box>
        </Box>
    );
};

export default MLayout;
