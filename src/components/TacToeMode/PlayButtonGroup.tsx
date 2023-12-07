import { Box, Button, Text, Image, Flex } from "@chakra-ui/react";
import React from "react";
import HumanPlane from "./assets/human-plane.png";
import RobotIcon from "./assets/robot.png";
import SetIcon from "./assets/set.svg";
import GrayHumanPlane from "./assets/gray-human-plane.png";
import { GrayButton } from "../Button/Index";
import PrivateLobbyIcon from "./assets/private-lobby.svg";

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
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "Quantico",
            }}
        >
            <GrayButton
                onClick={onPlayTournament}
                sx={{
                    paddingLeft: "5.2083vw !important",
                    width: "19.6875vw !important",
                    height: "4.7917vw !important",
                    opacity: tournamentDisabled ? 0.5 : 1,
                }}
                variant="outline"
            >
                <Image
                    src={tournamentDisabled ? GrayHumanPlane : HumanPlane}
                    sx={{
                        width: "6.25vw",
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
                >
                    <Text
                        sx={{
                            color: tournamentDisabled ? "#bcbbbe" : "#fff",
                            fontSize: "1.6667vw",
                            fontWeight: "400",
                        }}
                    >
                        Play
                    </Text>
                    <Text
                        sx={{
                            fontSize: "1.25vw",
                            color: tournamentDisabled
                                ? "#bcbbbe"
                                : "rgba(215, 200, 120, 1)",
                            fontWeight: "400",
                        }}
                    >
                        Tournament
                    </Text>
                </Box>
            </GrayButton>
            <GrayButton
                onClick={onPlayWithBot}
                sx={{
                    paddingLeft: "7.2917vw !important",
                    width: "19.6875vw !important",
                    height: "4.7917vw !important",
                    marginTop: "1.0417vw",
                }}
                variant="outline"
                position={"relative"}
            >
                <Image
                    src={RobotIcon}
                    sx={{
                        width: "2.2917vw",
                        position: "absolute",
                        left: "1.0417vw",
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                ></Image>
                <Image
                    src={SetIcon}
                    sx={{
                        width: "3.3333vw",
                        position: "absolute",
                        right: "-1.0417vw",
                        top: "-1.5625vw",
                    }}
                ></Image>
                <Box
                    sx={{
                        textAlign: "center",
                    }}
                >
                    <Text
                        sx={{
                            fontSize: "1.6667vw",
                            fontWeight: "400",
                        }}
                    >
                        Quick Start
                    </Text>
                    <Text
                        sx={{
                            fontSize: "1.0417vw",
                            fontWeight: "400",
                        }}
                    >
                        Against Bot
                    </Text>
                </Box>
            </GrayButton>
            <GrayButton
                onClick={onPlayTestLobby}
                sx={{
                    paddingLeft: "4.1667vw !important",
                    width: "19.6875vw !important",
                    height: "4.7917vw !important",
                    marginTop: "1.0417vw",
                }}
                variant="outline"
            >
                <Image
                    src={PrivateLobbyIcon}
                    sx={{
                        width: "4.1667vw",
                        position: "absolute",
                        left: "0.2083vw",
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                ></Image>
                <Box
                    sx={{
                        textAlign: "center",
                        width: "100%",
                    }}
                >
                    <Text
                        sx={{
                            fontSize: "1.6667vw",
                            fontWeight: "400",
                        }}
                    >
                        Private Lobby
                    </Text>
                </Box>
            </GrayButton>
        </Box>
    );
};
