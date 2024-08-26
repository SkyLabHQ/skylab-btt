import { Box, Flex, Image, Text } from "@chakra-ui/react";
import LineBg from "@/assets/line.png";
import ButtonBg from "@/assets/bt-bg.png";
import BttIcon from "@/assets/btt-icon.png";
import BotIcon from "@/assets/bot-icon.svg";
import Nest from "@/components/Nest";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";

const PlayButtonGroup = () => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");

    const handleStartBot = async () => {
        // try {
        //     openLoading();
        //     const res = await startGame();
        //     navigate(`/free/pvp/game?gameId=${res.data.gameId}`);
        //     closeLoading();
        // } catch (e) {
        //     toast(handleError(e));
        //     closeLoading();
        // }
    };

    return (
        <Box
            sx={{
                marginTop: "10px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    fontFamily: "Orbitron",
                    position: "relative",
                }}
            >
                <Flex
                    sx={{
                        width: "100%",
                    }}
                    align={"center"}
                >
                    <Box
                        sx={{
                            flex: 1,
                            height: "3px",
                            background: `url(${LineBg})`,
                        }}
                    ></Box>
                    <Box
                        sx={{
                            margin: "0 10px",
                            fontWeight: 700,
                            fontSize: "16px",
                            textAlign: "center",
                            color: "#FDDC2D",
                        }}
                    >
                        <Text>Game With Bot</Text>
                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            height: "3px",
                            background: `url(${LineBg})`,
                        }}
                    ></Box>
                </Flex>
                <Flex
                    align={"center"}
                    onClick={handleStartBot}
                    alignItems={"center"}
                    justify={"center"}
                    sx={{
                        width: "194px",
                        height: "60px",
                        marginTop: isPc ? "36px" : "20px",
                        cursor: "pointer",
                        background: `url(${ButtonBg})`,
                        backgroundSize: "100% 100%",
                        position: "relative",
                    }}
                >
                    <Image
                        src={BotIcon}
                        sx={{
                            position: "absolute",
                            left: "-10px",
                            top: "20%",
                            transform: "translateY(-50%)",
                        }}
                    ></Image>
                    <Text
                        className="play-button-text"
                        sx={{
                            color: "#fff",
                            paddingLeft: "20px",
                        }}
                    >
                        Start Game
                    </Text>
                </Flex>
            </Box>
        </Box>
    );
};

const StartBot = () => {
    return (
        <Box
            sx={{
                height: "100%",
            }}
        >
            <Flex
                flexDir={"column"}
                align={"center"}
                justify={"center"}
                sx={{
                    height: "100%",
                    fontFamily: "Orbitron",
                }}
            >
                <Image
                    src={BttIcon}
                    sx={{
                        width: "120px",
                    }}
                ></Image>
                <Text
                    sx={{
                        fontSize: "24px",
                        fontWeight: 700,
                        marginTop: "10px",
                    }}
                >
                    Bid Tac Toe
                </Text>
                <PlayButtonGroup></PlayButtonGroup>
            </Flex>
            <Nest />
        </Box>
    );
};

export default StartBot;
