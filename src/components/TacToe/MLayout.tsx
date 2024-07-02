import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import MBalance from "../BttComponents/MBalance";
import { GameState } from "@/skyConstants/bttGameTypes";
import Board from "../BttComponents/Board";
import { MMessage } from "@/components/PrivateRoom/Message";
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
    bidAmount,
    showAnimateNumber,
    onInputChange,
    onConfirm,
    onReveal,
    onSetMessage,
    emoteIndex,
    messageIndex,
    emoteLoading,
    messageLoading,
    loading,
    revealing,
    handleBoardClick,
    showAnimateConfirm,
    onCallTimeout,
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

    const canCallTimeout = useMemo(() => {
        if (
            autoCommitTimeoutTime === 0 &&
            myGameInfo.gameState <= opGameInfo.gameState
        ) {
            return true;
        }

        return false;
    }, [autoCommitTimeoutTime, myGameInfo.gameState, opGameInfo.gameState]);

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
                    onClick={() => {
                        handleBoardClick();
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
                                    width: "84px",
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
                                <Flex
                                    onClick={() => {
                                        if (canCallTimeout) {
                                            onCallTimeout();
                                        }
                                    }}
                                    sx={{
                                        marginTop: "5px",
                                        fontSize: "12px",
                                        height: "30px",
                                        width: "84px",
                                        background: canCallTimeout
                                            ? "transparent"
                                            : "#787878",
                                        borderRadius: "16px",
                                        color: canCallTimeout
                                            ? "#FDDC2D"
                                            : "#555",
                                        fontWeight: "bold",
                                        cursor: canCallTimeout
                                            ? "pointer"
                                            : "not-allowed",
                                        border: canCallTimeout
                                            ? "1px solid #FDDC2D"
                                            : "1px solid #787878",
                                    }}
                                    align={"center"}
                                    justify={"center"}
                                >
                                    Call Timeout
                                </Flex>
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
                    showAnimateConfirm={showAnimateConfirm}
                    onSetMessage={onSetMessage}
                    myBalance={myGameInfo.balance}
                    bidAmount={bidAmount}
                    myGameState={myGameState}
                    opGameState={opGameInfo.gameState}
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
                    onReveal={onReveal}
                    revealing={revealing}
                ></BottomInputBox>
            </Box>
        </Box>
    );
};

export default MLayout;
