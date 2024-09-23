import { Box, Flex } from "@chakra-ui/react";
import Board from "../BttComponents/Board";
import { MUserProfileResult } from "./UserProfile";
import { BoardItem, getPvpWinState } from "@/skyConstants/bttGameTypes";
import RoundInfo from "../BttComponents/RoundInfo";
import MBalance from "../BttComponents/MBalance";
import { TournamentGameInfo } from "@/pages/TacToe";
import { OpResultCard, ResultCard } from "../BttComponents/ResultUserCard";
import { MyBalance, OpBalance } from "../BttComponents/PlaneUserCard";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";

const TournamentPlayBack = ({
    myBalance,
    opBalance,
    currentRound,
    allRound,
    showList,
    myGameInfo,
    opGameInfo,
}: {
    myBalance: number;
    opBalance: number;
    currentRound: number;
    allRound: number;
    myGameInfo: TournamentGameInfo;
    opGameInfo: TournamentGameInfo;
    showList: BoardItem[];
}) => {
    const isMyWin = getPvpWinState(myGameInfo.gameState);
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    return (
        <Box
            id="share-content"
            sx={{
                background: "#303030",
                margin: "0 auto",
                width: "100%",
                border: "2px solid #fff",
                boxShadow: "5px 4px 8px 0px rgba(255, 255, 255, 0.50)",
                position: "relative",
                padding: "20px 0",
                borderRadius: "8px",
            }}
        >
            <Box
                sx={{
                    marginTop: "20px",
                }}
            >
                {isPc ? (
                    <Flex
                        justify={"space-between"}
                        sx={{
                            padding: "0 20px",
                        }}
                    >
                        <Box>
                            <ResultCard
                                showResult={currentRound === allRound}
                                win={isMyWin}
                                userInfo={myGameInfo}
                            ></ResultCard>
                            <MyBalance
                                win={isMyWin && currentRound === allRound}
                                balance={myBalance}
                                mark={myGameInfo.mark}
                            ></MyBalance>
                        </Box>

                        <Flex flexDir={"column"} align={"flex-end"}>
                            <OpResultCard
                                showResult={currentRound === allRound}
                                win={!isMyWin && currentRound === allRound}
                                userInfo={opGameInfo}
                            ></OpResultCard>
                            <OpBalance
                                win={!isMyWin && currentRound === allRound}
                                balance={opBalance}
                                mark={opGameInfo.mark}
                            ></OpBalance>
                        </Flex>
                    </Flex>
                ) : (
                    <Flex justify={"space-between"}>
                        <Box>
                            <Box
                                sx={{
                                    paddingLeft: "12px",
                                }}
                            >
                                <MUserProfileResult
                                    address={""}
                                    position="left"
                                ></MUserProfileResult>
                            </Box>

                            <MBalance
                                balance={myBalance}
                                mark={myGameInfo.mark}
                            ></MBalance>
                        </Box>

                        <Flex
                            flexDir={"column"}
                            align={"flex"}
                            alignItems={"flex-end"}
                        >
                            <Box
                                sx={{
                                    paddingRight: "12px",
                                }}
                            >
                                <MUserProfileResult
                                    address={""}
                                    position="right"
                                ></MUserProfileResult>
                            </Box>

                            <MBalance
                                balance={opBalance}
                                status="right"
                                mark={opGameInfo.mark}
                            ></MBalance>
                        </Flex>
                    </Flex>
                )}

                <Flex
                    align={"center"}
                    flexDir={"column"}
                    sx={{
                        marginTop: "20px",
                    }}
                >
                    <Board list={showList}></Board>
                    <RoundInfo
                        currentRound={currentRound}
                        allRound={allRound}
                    ></RoundInfo>
                </Flex>
            </Box>
        </Box>
    );
};

export default TournamentPlayBack;
