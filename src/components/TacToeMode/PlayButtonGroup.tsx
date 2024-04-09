import { Box, Text, Image, useMediaQuery, Flex } from "@chakra-ui/react";
import React from "react";
import HumanPlane from "./assets/human-plane.png";
import RobotIcon from "./assets/robot.png";
import GrayHumanPlane from "./assets/gray-human-plane.png";
import PrivateLobbyIcon from "./assets/private-lobby.svg";
import { GrayButton } from "@/pages/TacToeMode";
import LineBg from "./assets/line.png";

export const PlayButtonGroup = ({
    tournamentDisabled,
    onPlayTournament,
    onPlayWithBot,
    onPlayTestLobby,
}: {
    tournamentDisabled: boolean;
    onPlayTournament: () => void;
    onPlayWithBot: () => void;
    onPlayTestLobby: () => void;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "Quantico",
                "& .bt": {
                    width: "100% !important",
                    height: `${isPc ? "90px" : "70px"} !important`,
                    justifyContent: "flex-end",
                    borderRadius: "18px !important",
                },
                "& .text-wrapper": {
                    width: `${isPc ? "300px" : "180px"} !important`,
                },
                "& .play-button-text": {
                    fontSize: isPc ? "32px" : "20px",
                    fontWeight: "400",
                },
                "& .play-button-text2": {
                    fontSize: isPc ? "20px" : "12px",
                    fontWeight: "400",
                },
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
                <Text
                    sx={{
                        fontSize: isPc ? "30px" : "16px",
                        fontWeight: 700,
                        WebkitTextStrokeWidth: 1,
                        WebkitTextStrokeColor: "#FDDC2D",
                        textAlign: "center",
                        margin: "0 10px",
                        fontFamily: "Orbitron",
                    }}
                >
                    TOURNAMENT
                </Text>
                <Box
                    sx={{
                        flex: 1,
                        height: "3px",
                        background: `url(${LineBg})`,
                    }}
                ></Box>
            </Flex>
            <GrayButton
                className="bt"
                onClick={onPlayTournament}
                sx={{
                    paddingLeft: "100px !important",
                    opacity: tournamentDisabled ? 0.5 : 1,
                    marginTop: isPc ? "36px" : "20px",
                }}
            >
                <Image
                    src={tournamentDisabled ? GrayHumanPlane : HumanPlane}
                    sx={{
                        width: isPc ? "120px" : "80px",
                        position: "absolute",
                        left: "5px",
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                ></Image>
                <Box
                    sx={{
                        textAlign: "center",
                        width: "100%",
                    }}
                    className="text-wrapper"
                >
                    <Text
                        className="play-button-text"
                        sx={{
                            color: tournamentDisabled ? "#bcbbbe" : "#fff",
                        }}
                    >
                        Start Game
                    </Text>
                    <Text
                        sx={{
                            color: tournamentDisabled
                                ? "#bcbbbe"
                                : "rgba(215, 200, 120, 1)",
                        }}
                        className="play-button-text2"
                    >
                        With Plane
                    </Text>
                </Box>
            </GrayButton>
            <Flex
                sx={{
                    width: "100%",
                    marginTop: isPc ? "60px" : "20px",
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
                        position: "relative ",
                    }}
                >
                    <Text
                        sx={{
                            fontSize: isPc ? "30px" : "16px",
                            fontWeight: 700,
                            WebkitTextStrokeWidth: 1,
                            WebkitTextStrokeColor: "#FDDC2D",
                            textAlign: "center",
                            margin: "0 10px",
                            fontFamily: "Orbitron",
                        }}
                    >
                        CUSTOM
                    </Text>
                    <Text
                        sx={{
                            color: "#D7C878",
                            position: "absolute",
                            left: "50%",
                            top: isPc ? "40px" : "20px",
                            transform: "translateX(-50%)",
                            width: "200%",
                            textAlign: "center",
                            fontSize: isPc ? "20px" : "12px",
                        }}
                    >
                        Without Plane
                    </Text>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        height: "3px",
                        background: `url(${LineBg})`,
                    }}
                ></Box>
            </Flex>
            <GrayButton
                className="bt"
                onClick={onPlayWithBot}
                sx={{
                    marginTop: isPc ? "50px" : "30px",
                }}
                position={"relative"}
            >
                <Image
                    src={RobotIcon}
                    sx={{
                        width: isPc ? "44px" : "40px",
                        position: "absolute",
                        left: "20px",
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                ></Image>

                <Box
                    sx={{
                        textAlign: "center",
                    }}
                    className="text-wrapper"
                >
                    <Text className="play-button-text">Quick Start</Text>
                    <Text className="play-button-text2">Against Bot</Text>
                </Box>
            </GrayButton>
            <GrayButton
                className="bt"
                onClick={onPlayTestLobby}
                sx={{
                    marginTop: isPc ? "20px" : "20px",
                }}
            >
                <Image
                    src={PrivateLobbyIcon}
                    sx={{
                        width: isPc ? "80px" : "60px",
                        position: "absolute",
                        left: "4px",
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                ></Image>
                <Box className="text-wrapper">
                    <Text className="play-button-text">Private Lobby</Text>
                </Box>
            </GrayButton>
        </Box>
    );
};
