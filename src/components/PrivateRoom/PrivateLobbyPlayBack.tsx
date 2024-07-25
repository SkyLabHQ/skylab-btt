import { Box, Flex, Image, Text, useMediaQuery } from "@chakra-ui/react";
import Logo from "@/assets/logo.svg";
import BttIcon from "@/assets/btt-icon.png";
import XIcon from "@/components/TacToe/assets/x.svg";
import Board from "../BttComponents/Board";
import TwLogo from "@/components/TacToe/assets/tw-logo.svg";
import EarthIcon from "@/components/TacToe/assets/earth.svg";
import UserProfile, { MUserProfileResult } from "./UserProfile";
import { BoardItem, GameInfo } from "@/skyConstants/bttGameTypes";
import RoundInfo from "../BttComponents/RoundInfo";
import MBalance from "../BttComponents/MBalance";
import { PvpGameInfo } from "@/pages/PvpRoom";

const PrivateLobbyPlayBack = ({
    myBalance,
    opBalance,
    myIsNextDrawWinner,
    currentRound,
    allSelectedGrids,
    showList,
    myGameInfo,
    opGameInfo,
}: {
    myBalance: number;
    opBalance: number;
    myIsNextDrawWinner: boolean;
    currentRound: number;
    allSelectedGrids: BoardItem[];
    myGameInfo: PvpGameInfo;
    opGameInfo: PvpGameInfo;
    showList: BoardItem[];
}) => {
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
                    marginTop: "1.0417vw",
                }}
            >
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
                                mark={myGameInfo.mark}
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
                                mark={opGameInfo.mark}
                                showAdvantageTip={!myIsNextDrawWinner}
                            ></MUserProfileResult>
                        </Box>

                        <MBalance
                            balance={opBalance}
                            status="right"
                            mark={opGameInfo.mark}
                        ></MBalance>
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
                        allRound={allSelectedGrids.length}
                    ></RoundInfo>
                </Flex>
            </Box>
        </Box>
    );
};

export default PrivateLobbyPlayBack;
