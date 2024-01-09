import useSkyToast from "@/hooks/useSkyToast";
import { usePrivateLobbyContext } from "@/pages/PrivateLobby";
import { Flex, Text, useClipboard, useMediaQuery } from "@chakra-ui/react";
import React from "react";

const LobbyInfo = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const { lobbyName, gameCount } = usePrivateLobbyContext();
    const { onCopy } = useClipboard(lobbyName);
    const toast = useSkyToast();

    return (
        <Flex
            justify={"flex-end"}
            sx={{
                fontSize: isPc ? "1.25vw" : "12px",
            }}
        >
            <Text
                sx={{
                    marginRight: "1.0417vw",
                    cursor: "pointer",
                }}
                onClick={() => {
                    onCopy();
                    toast("Copy code success");
                }}
            >
                Private Lobby Code: {lobbyName}
            </Text>
            <Text>
                {gameCount.inGameCount}/{gameCount.allGameCount} In Game
            </Text>
        </Flex>
    );
};

export default LobbyInfo;
