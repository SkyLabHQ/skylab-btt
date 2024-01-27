import { Box, Text, Image, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import BackIcon from "./assets/back.svg";
import JoinLobbyIcon from "./assets/join-lobby.svg";
import NewLobbyIcon from "./assets/new-lobby.svg";
import { GrayButton } from "@/pages/TacToeMode";

const PrivateLobbyButtons = ({
    onBack,
    onCreateLobby,
    onJoinLobby,
}: {
    onCreateLobby: () => void;
    onJoinLobby: () => void;
    onBack: () => void;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "Quantico",
                "& button": {
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
            <Image
                onClick={onBack}
                src={BackIcon}
                sx={{
                    width: "16px",
                    cursor: "pointer",
                }}
            ></Image>
            <GrayButton
                onClick={onCreateLobby}
                sx={{
                    marginTop: "1.0417vw",
                }}
            >
                <Image
                    src={NewLobbyIcon}
                    sx={{
                        width: isPc ? "2.5vw" : "40px",
                        position: "absolute",
                        left: "0.9375vw",
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                ></Image>
                <Box className="text-wrapper">
                    <Text
                        sx={{
                            fontSize: isPc ? "1.0417vw" : "16px",
                        }}
                    >
                        Start a new lobby
                    </Text>
                </Box>
            </GrayButton>
            <GrayButton
                onClick={onJoinLobby}
                sx={{
                    marginTop: "1.0417vw",
                }}
                position={"relative"}
            >
                <Image
                    src={JoinLobbyIcon}
                    sx={{
                        width: isPc ? "2.5vw" : "40px",
                        position: "absolute",
                        left: "0.9375vw",
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                ></Image>

                <Box className="text-wrapper">
                    <Text
                        sx={{
                            fontSize: isPc ? "1.0417vw" : "16px",
                        }}
                    >
                        Join an existing lobby{" "}
                    </Text>
                </Box>
            </GrayButton>
        </Box>
    );
};

export default PrivateLobbyButtons;
