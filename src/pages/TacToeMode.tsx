import { Box, Text, useMediaQuery, Flex, Image } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError } from "@/utils/error";
import BttHelmet from "@/components/Helmet/BttHelmet";
import { PlayButtonGroup } from "@/components/TacToeMode/PlayButtonGroup";
import { motion } from "framer-motion";
import useSkyToast from "@/hooks/useSkyToast";
import { Toolbar } from "@/components/TacToeMode/Toolbar";
import { useSubmitRequest } from "@/contexts/SubmitRequest";
import GameMp3 from "@/assets/game.mp3";
import SelectPlane from "@/components/TacToeMode/SelectPlane";
import MarketIcon from "@/components/TacToeMode/assets/market-icon.png";
import LeaderboardIcon from "@/components/TacToeMode/assets/leaderboard.png";

import Nest from "@/components/Nest";
import { startGame } from "@/api/tournament";

const gameAudio = new Audio(GameMp3);

const TacToeMode = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const { openLoading, closeLoading } = useSubmitRequest();

    const navigate = useNavigate();
    const [selectPlane, setSelectPlane] = useState<any>({});

    const toast = useSkyToast();

    const handleTournament = async () => {
        const tokenId = selectPlane?.tokenId;

        try {
            const res = await startGame({
                tokenId,
            });
            if (res.code === 200) {
                navigate("/btt/game?gameId=" + res.data.game.id);
            }
            console.log(res, "res");
        } catch (e) {
            closeLoading();
            console.log(e);
            toast(handleError(e));
        }
    };

    return (
        <Box
            sx={{
                height: "100%",
            }}
        >
            <BttHelmet></BttHelmet>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    paddingTop: isPc ? "120px" : "40px",
                    flexDirection: "column",
                    height: "100%",
                    fontFamily: "Orbitron",
                    width: "100%",
                }}
            >
                <Toolbar></Toolbar>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: isPc ? "798px" : "100%",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        sx={{
                            paddingTop: "30px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: 100 }} // 初始状态：透明且在原位置右边100px的位置
                            animate={{ opacity: 1, x: 0 }} // 结束状态：完全不透明且在原位置
                            exit={{ opacity: 0, x: -100 }} // 退出状态：透明且在原位置左边100px的位置
                            transition={{ duration: 0.5 }}
                            style={{
                                width: "100%",
                            }}
                        >
                            <Flex
                                sx={{
                                    width: "100%",
                                    padding: "0 12px",
                                }}
                                justify={"space-between"}
                                align={"flex-end"}
                            >
                                <Flex
                                    flexDir={"column"}
                                    align={"center"}
                                    sx={{
                                        marginTop: "10px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        navigate("/point");
                                    }}
                                >
                                    <Image
                                        src={LeaderboardIcon}
                                        sx={{
                                            width: isPc ? "100px" : "64px",
                                        }}
                                    ></Image>
                                    <Text
                                        sx={{
                                            fontSize: isPc ? "20px" : "12px",
                                            fontFamily: "Quantico",
                                        }}
                                    >
                                        Leaderboard
                                    </Text>
                                </Flex>
                                <Box
                                    sx={{
                                        paddingBottom: isPc ? "12px" : "4px",
                                    }}
                                >
                                    <PlayButtonGroup
                                        tournamentDisabled={
                                            !selectPlane?.tokenId
                                        }
                                        onPlayTournament={() => {
                                            gameAudio.play();
                                            handleTournament();
                                        }}
                                    ></PlayButtonGroup>
                                </Box>

                                <Flex
                                    flexDir={"column"}
                                    align={"center"}
                                    sx={{
                                        marginTop: "10px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        navigate("/plane/market");
                                    }}
                                >
                                    <Image
                                        src={MarketIcon}
                                        sx={{
                                            width: isPc ? "100px" : "64px",
                                        }}
                                    ></Image>
                                    <Text
                                        sx={{
                                            fontSize: isPc ? "20px" : "12px",
                                            fontFamily: "Quantico",
                                        }}
                                    >
                                        Plane Market
                                    </Text>
                                </Flex>
                            </Flex>
                        </motion.div>
                    </Box>
                </Box>

                <Box
                    sx={{
                        position: "absolute",
                        left: "50%",
                        bottom: 0,
                        transform: "translate(-50%, 0)",
                        width: isPc ? "800px" : "100%",
                        display: "block",
                        height: isPc
                            ? "calc(100% - 400px)"
                            : "calc(100% - 220px)",
                    }}
                >
                    <SelectPlane
                        selectPlane={selectPlane}
                        onSelectPlane={(plane: any) => {
                            if (plane.tokenId === selectPlane.tokenId) {
                                setSelectPlane({});
                                return;
                            }
                            setSelectPlane(plane);
                        }}
                    ></SelectPlane>
                </Box>
            </Box>
            <Nest />
        </Box>
    );
};

export default TacToeMode;
