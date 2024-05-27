import { Box, Text, Image, useMediaQuery, Flex } from "@chakra-ui/react";
import RobotIcon from "./assets/bot-game.png";

import PrivateLobbyIcon from "./assets/private-lobby.png";
import OneIcon from "./assets/1v1.png";

const LeftButton = ({
    onPlayWithBot,
    onPlayTestLobby,
    onPlayQuickGame,
}: {
    onPlayWithBot: () => void;
    onPlayTestLobby: () => void;
    onPlayQuickGame: () => void;
}) => {
    return (
        <Flex
            sx={{
                position: "absolute",
                left: "60px",
                bottom: "20%",
                width: "160px",
                textAlign: "center",
                fontSize: "20px",
                "&>div": {
                    cursor: "pointer",
                },
            }}
            flexDir={"column"}
        >
            <Flex
                onClick={onPlayWithBot}
                sx={{}}
                align={"center"}
                flexDir={"column"}
            >
                <Image
                    src={RobotIcon}
                    sx={{
                        width: "120px",
                    }}
                ></Image>
                <Text sx={{}}>Bot Game</Text>
            </Flex>
            <Flex
                onClick={onPlayTestLobby}
                sx={{
                    marginTop: "20px",
                }}
                align={"center"}
                flexDir={"column"}
            >
                <Image
                    src={PrivateLobbyIcon}
                    sx={{
                        width: "120px",
                    }}
                ></Image>
                <Text>Private Lobby</Text>
            </Flex>

            <Flex
                onClick={onPlayQuickGame}
                sx={{
                    marginTop: "20px",
                }}
                align={"center"}
                flexDir={"column"}
            >
                <Image
                    src={OneIcon}
                    sx={{
                        width: "120px",
                    }}
                ></Image>
                <Text>1V1 Game</Text>
            </Flex>
        </Flex>
    );
};

export default LeftButton;
