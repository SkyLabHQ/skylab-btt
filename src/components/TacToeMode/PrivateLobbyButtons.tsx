import { Box, Text, Image } from "@chakra-ui/react";
import React from "react";
import { GrayButton } from "../Button/Index";
import BackIcon from "./assets/back.svg";
import JoinLobbyIcon from "./assets/join-lobby.svg";
import NewLobbyIcon from "./assets/new-lobby.svg";

const PrivateLobbyButtons = ({
    onBack,
    onCreateLobby,
    onJoinLobby,
}: {
    onCreateLobby: () => void;
    onJoinLobby: () => void;
    onBack: () => void;
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "Quantico",
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
                    paddingLeft: "4.1667vw !important",
                    width: "19.6875vw !important",
                    height: "4.7917vw !important",
                    marginTop: "1.0417vw",
                }}
                variant="outline"
            >
                <Image
                    src={NewLobbyIcon}
                    sx={{
                        width: "2.5vw",
                        position: "absolute",
                        left: "18px",
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
                            color: "#fff",
                            fontSize: "1.4583vw",
                            fontWeight: "400",
                        }}
                    >
                        Start a new lobby
                    </Text>
                </Box>
            </GrayButton>
            <GrayButton
                onClick={onJoinLobby}
                sx={{
                    paddingLeft: "4.1667vw !important",
                    width: "19.6875vw !important",
                    height: "4.7917vw !important",
                    marginTop: "1.0417vw",
                }}
                variant="outline"
                position={"relative"}
            >
                <Image
                    src={JoinLobbyIcon}
                    sx={{
                        width: "2.5vw",
                        position: "absolute",
                        left: "0.9375vw",
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                ></Image>

                <Box
                    sx={{
                        textAlign: "center",
                    }}
                >
                    <Text
                        sx={{
                            fontSize: "1.4583vw",
                            fontWeight: "400",
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
