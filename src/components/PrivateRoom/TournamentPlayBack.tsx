import { Box, Flex } from "@chakra-ui/react";
import Board from "../BttComponents/Board";
import { MMyTourUserProfile, MOpTourUserProfile } from "./UserProfile";
import { BoardItem, getPvpWinState } from "@/skyConstants/bttGameTypes";
import RoundInfo from "../BttComponents/RoundInfo";
import { TournamentGameInfo } from "@/pages/TacToe";
import { OpResultCard, ResultCard } from "../BttComponents/ResultUserCard";
import { MyBalance, OpBalance } from "../BttComponents/PlaneUserCard";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";
import { shortenAddress } from "@/utils";

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
            {isPc ? (
                <Box
                    sx={{
                        marginTop: "20px",
                    }}
                >
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
            ) : (
                <Box>
                    <Flex flexDir={"column"}>
                        <MOpTourUserProfile
                            balance={opBalance}
                            name={
                                opGameInfo.username
                                    ? `@${opGameInfo.username}`
                                    : shortenAddress(opGameInfo.address)
                            }
                            photoUrl={opGameInfo.photoUrl}
                            mark={opGameInfo.mark}
                            win={!isMyWin && currentRound === allRound}
                            showResult={currentRound === allRound}
                        ></MOpTourUserProfile>
                    </Flex>
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
                    <Flex
                        flexDir={"column"}
                        align={"flex-end"}
                        sx={{
                            marginTop: "10px",
                        }}
                    >
                        <MMyTourUserProfile
                            name={
                                myGameInfo.username
                                    ? `@${myGameInfo.username}`
                                    : shortenAddress(myGameInfo.address)
                            }
                            balance={myBalance}
                            photoUrl={myGameInfo.photoUrl}
                            mark={myGameInfo.mark}
                            win={isMyWin && currentRound === allRound}
                            showResult={currentRound === allRound}
                        ></MMyTourUserProfile>
                    </Flex>
                </Box>
            )}
        </Box>
    );
};

export default TournamentPlayBack;
