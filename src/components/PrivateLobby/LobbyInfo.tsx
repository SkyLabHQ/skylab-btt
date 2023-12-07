import { usePrivateLobbyContext } from "@/pages/PrivateLobby";
import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const LobbyInfo = () => {
    const { lobbyName, gameCount } = usePrivateLobbyContext();
    return (
        <Flex
            justify={"flex-end"}
            sx={{
                fontSize: "24px",
            }}
        >
            <Text
                sx={{
                    marginRight: "20px",
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
