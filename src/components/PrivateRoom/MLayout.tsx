import { usePvpGameContext } from "@/pages/PvpRoom";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { MUserProfilePvp } from "./UserProfile";
import MBalance, { MPvpBalance } from "../BttComponents/MBalance";
import { GameState } from "@/skyConstants/bttGameTypes";
import Board from "../BttComponents/Board";
import { MMessage } from "./Message";
import Timer from "../BttComponents/Timer";
import BottomInputBox from "../BttComponents/BottomInputBox";
import ToolBar from "../BttComponents/Toolbar";
import StatusProgress from "../BttComponents/StatusProgress";
import PvpBottomInputBox from "../BttComponents/PvpBottomInputBox";

const MLayout = ({
    inviteLink,
    handleQuitClick,
    handleShareTw,
    autoCommitTimeoutTime,
    bidAmount,
    showAnimateNumber,
    onInputChange,
    onConfirm,
    loading,
    handleBoardClick,
    showAnimateConfirm,
}: any) => {
    const { isOpen: keyBoardIsOpen, onToggle: keyBoardOnToggle } =
        useDisclosure();

    const [inputMode, setInputMode] = useState<"message" | "keyboard">(null);

    const { myGameInfo, opGameInfo, myInfo, opInfo, list } =
        usePvpGameContext();
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
                    left: "16px",
                    alignItems: "flex-start",
                }}
                flexDir={"column"}
            >
                <Flex align={"flex-end"}>
                    <MUserProfilePvp
                        address={""}
                        status="op"
                        mark={opInfo.mark}
                    ></MUserProfilePvp>
                </Flex>

                <MPvpBalance
                    balance={opGameInfo.balance}
                    mark={opInfo.mark}
                ></MPvpBalance>
            </Flex>

            <Flex
                align={"center"}
                justify={"center"}
                flexDir={"column"}
                sx={{
                    marginTop: "36px",
                }}
            >
                {/* <StatusProgress
                    myIsBid={myGameInfo.gameState}
                    opGameState={opGameInfo.gameState}
                ></StatusProgress> */}
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
                                time1Gray={loading || myGameInfo.isBid}
                            ></Timer>
                        </Box>
                    </Flex>
                    <Flex
                        sx={{
                            position: "absolute",
                            bottom: "16px",
                            right: "16px",
                        }}
                        flexDir={"column"}
                        align={"flex-end"}
                    >
                        <MPvpBalance
                            balance={myGameInfo.balance}
                            status="right"
                            mark={myInfo.mark}
                        ></MPvpBalance>
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
                ></PvpBottomInputBox>
            </Box>
        </Box>
    );
};

export default MLayout;
