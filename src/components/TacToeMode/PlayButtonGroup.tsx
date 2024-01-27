import { Box, Text, Image, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import HumanPlane from "./assets/human-plane.png";
import RobotIcon from "./assets/robot.png";
import GrayHumanPlane from "./assets/gray-human-plane.png";
import PrivateLobbyIcon from "./assets/private-lobby.svg";
import { GrayButton } from "@/pages/TacToeMode";

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
                "&>div": {
                    width: "100% !important",
                    height: `${isPc ? "4.7917vw" : "70px"} !important`,
                    justifyContent: "flex-end",
                    borderRadius: "18px !important",
                },
                "& .text-wrapper": {
                    width: `${isPc ? "15.625vw" : "180px"} !important`,
                },
                "& .play-button-text": {
                    fontSize: isPc ? "1.6667vw" : "20px",
                    fontWeight: "400",
                },
                "& .play-button-text2": {
                    fontSize: isPc ? "1.0417vw" : "12px",
                    fontWeight: "400",
                },
            }}
        >
            <GrayButton
                onClick={onPlayTournament}
                sx={{
                    paddingLeft: "5.2083vw !important",
                    opacity: tournamentDisabled ? 0.5 : 1,
                }}
            >
                <Image
                    src={tournamentDisabled ? GrayHumanPlane : HumanPlane}
                    sx={{
                        width: isPc ? "6.25vw" : "80px",
                        position: "absolute",
                        left: "0.2604vw",
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
                        Play
                    </Text>
                    <Text
                        sx={{
                            color: tournamentDisabled
                                ? "#bcbbbe"
                                : "rgba(215, 200, 120, 1)",
                        }}
                        className="play-button-text2"
                    >
                        Tournament
                    </Text>
                </Box>
            </GrayButton>
            <GrayButton
                onClick={onPlayWithBot}
                sx={{
                    marginTop: "1.0417vw",
                }}
                position={"relative"}
            >
                <Image
                    src={RobotIcon}
                    sx={{
                        width: isPc ? "2.2917vw" : "40px",
                        position: "absolute",
                        left: "1.0417vw",
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
                onClick={onPlayTestLobby}
                sx={{
                    marginTop: "1.0417vw",
                }}
            >
                <Image
                    src={PrivateLobbyIcon}
                    sx={{
                        width: isPc ? "4.1667vw" : "60px",
                        position: "absolute",
                        left: "0.2083vw",
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
