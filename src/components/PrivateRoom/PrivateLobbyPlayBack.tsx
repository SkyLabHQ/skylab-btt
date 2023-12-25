import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import Logo from "@/assets/logo.svg";
import BttIcon from "@/assets/btt-icon.png";
import XIcon from "@/components/TacToe/assets/x.svg";
import Board from "../TacToe/Board";
import TwLogo from "@/components/TacToe/assets/tw-logo.svg";
import EarthIcon from "@/components/TacToe/assets/earth.svg";
import UserProfile from "./UserProfile";
import { OpBid } from "./UserBid";
import { BoardItem, GameInfo } from "@/skyConstants/bttGameTypes";
import RoundInfo from "../BttComponents/RoundInfo";

const PrivateLobbyPlayBack = ({
    myInfo,
    opInfo,
    myBalance,
    opBalance,
    myBid,
    opBid,
    myIsNextDrawWinner,
    currentRound,
    allSelectedGrids,
    myGameInfo,
    showList,
}: {
    myInfo: any;
    opInfo: any;
    myBalance: number;
    opBalance: number;
    myBid: number;
    opBid: number;
    myMark: string;
    opMark: string;
    myIsNextDrawWinner: boolean;
    currentRound: number;
    allSelectedGrids: BoardItem[];
    myGameInfo: GameInfo;
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
                padding: "1.5vh 1.5vw",
                position: "relative",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    right: "1.5vw",
                    bottom: "1.5vh",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Image
                        src={TwLogo}
                        sx={{ marginRight: "0.2083vw", width: "1.4583vw" }}
                    ></Image>
                    <Text
                        sx={{
                            fontSize: "1.0417vw",
                            color: "rgb(172,172,172)",
                        }}
                    >
                        @skylabHQ
                    </Text>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "0.2083vw",
                    }}
                >
                    <Image
                        src={EarthIcon}
                        sx={{ marginRight: "0.2083vw", width: "1.4583vw" }}
                    ></Image>
                    <Text
                        sx={{
                            fontSize: "1.0417vw",
                            color: "rgb(172,172,172)",
                        }}
                    >
                        https://app.projmercury.io/#/
                    </Text>
                </Box>
            </Box>
            <Box
                sx={{
                    fontFamily: "Orbitron",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Image
                        src={Logo}
                        sx={{
                            width: "2.9167vw",
                            height: "2.9167vw",
                        }}
                    ></Image>
                    <Text
                        sx={{
                            fontSize: "1.25vw",
                            fontWeight: "700",
                            marginTop: "0.2604vw",
                        }}
                    >
                        Sky Lab
                    </Text>
                </Box>
                <Image
                    src={XIcon}
                    sx={{
                        margin: "0 1.0417vw",
                        width: "1.0417vw",
                        height: "1.0417vw",
                    }}
                ></Image>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Image
                        src={BttIcon}
                        sx={{
                            width: "2.9167vw",
                            height: "2.9167vw",
                        }}
                    ></Image>
                    <Text
                        sx={{
                            fontSize: "1.25vw",
                            fontWeight: "700",
                            marginTop: "0.2604vw",
                        }}
                    >
                        Bid Tac Toe{" "}
                    </Text>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "1.0417vw",
                }}
            >
                <Box
                    sx={{
                        width: "15.625vw",
                    }}
                >
                    <UserProfile
                        status="my"
                        avatar={myInfo.avatar}
                        name={myInfo.name}
                        mark={myInfo.mark}
                        showAdvantageTip={myIsNextDrawWinner}
                    ></UserProfile>

                    <OpBid
                        myGameState={myGameInfo.gameState}
                        balance={myBalance}
                        bidAmount={myBid}
                    ></OpBid>
                </Box>

                <Box>
                    <Board list={showList}></Board>
                    <RoundInfo
                        currentRound={currentRound}
                        allRound={allSelectedGrids.length}
                    ></RoundInfo>
                </Box>
                <Flex
                    sx={{
                        width: "15.625vw",
                    }}
                    flexDir={"column"}
                    alignItems={"flex-end"}
                >
                    <UserProfile
                        status="op"
                        avatar={opInfo.avatar}
                        name={opInfo.name}
                        mark={opInfo.mark}
                        showAdvantageTip={!myIsNextDrawWinner}
                    ></UserProfile>
                    <OpBid balance={opBalance} bidAmount={opBid}></OpBid>
                </Flex>
            </Box>
        </Box>
    );
};

export default PrivateLobbyPlayBack;
