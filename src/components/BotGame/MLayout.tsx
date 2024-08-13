import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import MBalance from "../BttComponents/MBalance";
import { GameState } from "@/skyConstants/bttGameTypes";
import Board from "../BttComponents/Board";
import { MUserProfile } from "../PrivateRoom/UserProfile";
import Timer from "../BttComponents/Timer";
import BottomInputBox from "../BttComponents/BottomInputBox";
import ToolBar from "../BttComponents/Toolbar";
import StatusProgress from "../BttComponents/StatusProgress";

const MLayout = ({
    myGameInfo,
    opGameInfo,
    myInfo,
    opInfo,
    list,
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
    loading,
    revealing,
    handleBoardClick,
    showAnimateConfirm,
}: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure({
        defaultIsOpen: true,
    });
    const { isOpen: opIsOpen, onToggle: opOnToggle } = useDisclosure({
        defaultIsOpen: true,
    });

    const { isOpen: keyBoardIsOpen, onToggle: keyBoardOnToggle } =
        useDisclosure();

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
                    myBalance={myGameInfo.balance}
                    bidAmount={bidAmount}
                    myGameState={myGameState}
                    opGameState={opGameInfo.gameState}
                    loading={loading}
                    onIuputAmount={(amount: number) => {
                        onInputChange(amount);
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
