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
                "&>div": {
                    width: "100% !important",
                    height: `${isPc ? "92px" : "70px"} !important`,
                    justifyContent: "flex-end",
                    borderRadius: "18px !important",
                },
                "& .text-wrapper": {
                    width: `${isPc ? "250px" : "180px"} !important`,
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
                    marginTop: "20px",
                }}
            >
                <Image
                    src={NewLobbyIcon}
                    sx={{
                        width: isPc ? "48px" : "40px",
                        position: "absolute",
                        left: "18px",
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                ></Image>
                <Box className="text-wrapper">
                    <Text
                        sx={{
                            fontSize: isPc ? "20px" : "16px",
                        }}
                    >
                        Start a new lobby
                    </Text>
                </Box>
            </GrayButton>
            <GrayButton
                onClick={onJoinLobby}
                sx={{
                    marginTop: "20px",
                }}
                position={"relative"}
            >
                <Image
                    src={JoinLobbyIcon}
                    sx={{
                        width: isPc ? "48px" : "40px",
                        position: "absolute",
                        left: "18px",
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                ></Image>

                <Box className="text-wrapper">
                    <Text
                        sx={{
                            fontSize: isPc ? "20px" : "16px",
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
