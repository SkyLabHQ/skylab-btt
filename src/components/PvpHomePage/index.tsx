import { useEffect, useState } from "react";
import { Box, Flex, useMediaQuery, Image, Text } from "@chakra-ui/react";
import LineBg from "@/assets/line.png";
import ButtonBg from "@/assets/bt-bg.png";
import { useNavigate } from "react-router-dom";
import { useSubmitRequest } from "@/contexts/SubmitRequest";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import BttIcon from "@/assets/btt-icon.png";
import SoloIcon from "./assets/solo-icon.svg";
import { getPoint, startGame } from "@/api/pvpGame";
import IIcon from "./assets/i.svg";
import TIcon from "./assets/t.svg";

const PlayButtonGroup = ({
    onPlayTournament,
}: {
    onPlayTournament: () => void;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
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
                    fontFamily: "Quantico",
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
                            margin: "0 20px",
                            fontWeight: 700,
                            fontSize: isPc ? "30px" : "16px",
                            textAlign: "center",
                            color: "#FDDC2D",
                        }}
                    >
                        <Flex align={"center"}>
                            <Text>1</Text>
                            <Image
                                src={SoloIcon}
                                sx={{
                                    margin: "0 4px",
                                }}
                            ></Image>
                            <Text>1</Text>
                        </Flex>
                        <Text>GAME</Text>
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
                    onClick={() => {
                        onPlayTournament();
                    }}
                    alignItems={"center"}
                    justify={"center"}
                    sx={{
                        width: "194px",
                        height: "60px",
                        marginTop: isPc ? "36px" : "20px",
                        cursor: "pointer",
                        background: `url(${ButtonBg})`,
                        backgroundSize: "100% 100%",
                    }}
                >
                    <Text
                        className="play-button-text"
                        sx={{
                            color: "#fff",
                        }}
                    >
                        Start Game
                    </Text>
                </Flex>
            </Box>
        </Box>
    );
};

const PvpHomePage = () => {
    const toast = useSkyToast();
    const navigate = useNavigate();
    const { openLoading, closeLoading } = useSubmitRequest();
    const [point, setPoint] = useState(0);
    const handlePlay1V1 = async () => {
        try {
            openLoading();
            const res = await startGame();
            navigate(`/free/pvp/game?gameId=${res.data.gameId}`);
            closeLoading();
        } catch (e) {
            toast(handleError(e));
            closeLoading();
        }
    };

    const handleGetPoint = async () => {
        const res = await getPoint();
        if (res.code === 200) {
            setPoint(res.data.point);
        }
    };

    useEffect(() => {
        handleGetPoint();
    }, []);

    return (
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
            <PlayButtonGroup onPlayTournament={handlePlay1V1}></PlayButtonGroup>
            <Flex
                sx={{
                    width: "164px",
                    height: "30px",
                    flexShrink: 0,
                    borderRadius: "100px",
                    background: "rgba(0, 0, 0, 0.50)",
                    marginTop: "26px",
                    fontFamily: "Quantico",
                    fontSize: "16px",
                }}
                align={"center"}
                justify={"center"}
            >
                <Image
                    src={IIcon}
                    sx={{
                        marginRight: "4px",
                    }}
                ></Image>
                <Text
                    sx={{
                        marginRight: "4px",
                    }}
                >
                    Point:
                </Text>
                <Image
                    src={TIcon}
                    sx={{
                        marginRight: "4px",
                    }}
                ></Image>
                <Text>{point}</Text>
            </Flex>
            <Box
                sx={{
                    width: "250px",
                    height: "51px",
                    background: "rgba(255, 255, 255, 0.82)",
                    border: "1px solid #F2D861",
                    borderRadius: "12px",
                    padding: "5px 12px",
                    color: "#1E1E1E",
                    fontFamily: "Quantico",
                    fontSize: "12px",
                }}
            >
                <Text>Invite new friend to play: +100</Text>
                <Text>Play plane game: +xp transferred * 100</Text>
            </Box>
        </Flex>
    );
};

export default PvpHomePage;
