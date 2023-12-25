import { usePrivateLobbyContext } from "@/pages/PrivateLobby";
import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const LobbyInfo = () => {
    const { lobbyName, gameCount } = usePrivateLobbyContext();
    return (
        <Flex
            justify={"flex-end"}
            sx={{
                fontSize: "1.25vw",
            }}
        >
            <Text
                sx={{
                    marginRight: "1.0417vw",
                }}
            >
                Private Lobby Code {lobbyName}
            </Text>
            <Text>
                {gameCount.inGameCount}/{gameCount.allGameCount} In Game
            </Text>
        </Flex>
    );
};

export default LobbyInfo;
