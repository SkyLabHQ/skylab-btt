import { Box, Flex, Image, Text, useMediaQuery } from "@chakra-ui/react";
import Logo from "@/assets/logo.svg";
import BttIcon from "@/assets/btt-icon.png";
import XIcon from "@/components/TacToe/assets/x.svg";
import Board from "../TacToe/Board";
import TwLogo from "@/components/TacToe/assets/tw-logo.svg";
import EarthIcon from "@/components/TacToe/assets/earth.svg";
import UserProfile, { MUserProfileResult } from "./UserProfile";
import { OpBid } from "./UserBid";
import { BoardItem, GameInfo } from "@/skyConstants/bttGameTypes";
import RoundInfo from "../BttComponents/RoundInfo";
import MBalance from "../BttComponents/MBalance";

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
    const [isPc] = useMediaQuery("(min-width: 800px)");
    console.log(showList, "showList");
    return isPc ? (
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
                        {window.location.host}
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
                        address={myInfo.address}
                        status="my"
                        mark={myInfo.mark}
                        showAdvantageTip={myIsNextDrawWinner}
                    ></UserProfile>

                    <OpBid balance={myBalance} bidAmount={myBid}></OpBid>
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
                        address={opInfo.address}
                        status="op"
                        mark={opInfo.mark}
                        showAdvantageTip={!myIsNextDrawWinner}
                    ></UserProfile>
                    <OpBid balance={opBalance} bidAmount={opBid}></OpBid>
                </Flex>
            </Box>
        </Box>
    ) : (
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
                                address={myInfo.address}
                                position="left"
                                mark={myInfo.mark}
                            ></MUserProfileResult>
                        </Box>

                        <MBalance
                            balance={myBalance}
                            mark={myInfo.mark}
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
                                address={opInfo.address}
                                position="right"
                                mark={opInfo.mark}
                                showAdvantageTip={!myIsNextDrawWinner}
                            ></MUserProfileResult>
                        </Box>

                        <MBalance
                            balance={opBalance}
                            status="right"
                            mark={opInfo.mark}
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
