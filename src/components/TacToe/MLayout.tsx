import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import MBalance from "../BttComponents/MBalance";
import { GameState } from "@/skyConstants/bttGameTypes";
import Board from "../BttComponents/Board";
import { useGameContext } from "@/pages/TacToe";
import { MUserProfile } from "../PrivateRoom/UserProfile";
import Timer from "../BttComponents/Timer";
import BottomInputBox from "../BttComponents/BottomInputBox";
import ToolBar from "../BttComponents/Toolbar";
import PvpBottomInputBox from "../BttComponents/PvpBottomInputBox";

const MLayout = ({
    currentRound,
    time,
    inviteLink,
    handleQuitClick,
    handleShareTw,
    nextDrawWinner,
    autoCommitTimeoutTime,
    bidAmount,
    showAnimateNumber,
    onInputChange,
    onConfirm,

    loading,
    handleBoardClick,
    showAnimateConfirm,
}: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure({
        defaultIsOpen: true,
    });
    const { isOpen: opIsOpen, onToggle: opOnToggle } = useDisclosure({
        defaultIsOpen: true,
    });

    const { myGameInfo, opGameInfo, list } = useGameContext();
    const myIsBid = myGameInfo.isBid;

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
                        address={opGameInfo.address}
                        img={""}
                        mark={opGameInfo.mark}
                        showAdvantageTip={opGameInfo.address === nextDrawWinner}
                        open={opIsOpen}
                        onClick={() => {
                            opOnToggle();
                        }}
                        level={1}
                    ></MUserProfile>
                </Flex>
                <MBalance
                    balance={opGameInfo.balance}
                    mark={opGameInfo.mark}
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
                                    time1={time}
                                    allTime={currentRound === 0 ? 3 * 60 : 60}
                                    time1Gray={myGameInfo.isBid}
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
                                address={myGameInfo.address}
                                img={""}
                                mark={myGameInfo.mark}
                                showAdvantageTip={
                                    myGameInfo.address === nextDrawWinner
                                }
                                open={isOpen}
                                onClick={() => {
                                    if (isOpen) {
                                        onClose();
                                    } else {
                                        onOpen();
                                    }
                                }}
                                level={1}
                            ></MUserProfile>
                        </Flex>

                        <MBalance
                            balance={myGameInfo.balance}
                            status="right"
                            mark={myGameInfo.mark}
                        ></MBalance>
                    </Flex>
                </Box>
                <PvpBottomInputBox
                    showAnimateConfirm={showAnimateConfirm}
                    myBalance={myGameInfo.balance}
                    bidAmount={bidAmount}
                    myIsBid={myIsBid}
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
                ></PvpBottomInputBox>
            </Box>
        </Box>
    );
};

export default MLayout;
