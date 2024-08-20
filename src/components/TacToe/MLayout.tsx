import { Box, Flex } from "@chakra-ui/react";
import Board from "../BttComponents/Board";
import { useGameContext } from "@/pages/TacToe";
import { MMyUserProfile, MOpUserProfile } from "../PrivateRoom/UserProfile";
import Timer from "../BttComponents/Timer";
import ToolBar from "../BttComponents/Toolbar";
import PvpBottomInputBox from "../BttComponents/PvpBottomInputBox";

const MLayout = ({
    currentRound,
    time,
    inviteLink,
    handleQuitClick,
    handleShareTw,
    bidAmount,
    showAnimateNumber,
    onInputChange,
    onConfirm,
    loading,
    handleBoardClick,
    showAnimateConfirm,
}: any) => {
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
            <Box
                sx={{
                    position: "absolute",
                    top: "12px",
                    left: "6px",
                }}
            >
                <MOpUserProfile userGameInfo={opGameInfo}></MOpUserProfile>
            </Box>

            <Flex
                align={"center"}
                justify={"center"}
                flexDir={"column"}
                sx={{
                    marginTop: "16px",
                }}
            >
                <Timer
                    time1={time}
                    allTime={currentRound === 0 ? 3 * 60 : 60}
                    time1Gray={myGameInfo.isBid}
                ></Timer>
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
                    <Flex
                        sx={{
                            position: "absolute",
                            bottom: "0px",
                            right: "6px",
                        }}
                        flexDir={"column"}
                        align={"flex-end"}
                    >
                        <MMyUserProfile
                            userGameInfo={myGameInfo}
                        ></MMyUserProfile>
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
