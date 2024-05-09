import { Box, Text, Image, useMediaQuery, Flex } from "@chakra-ui/react";
import RobotIcon from "./assets/robot.svg";

import PrivateLobbyIcon from "./assets/private-lobby.svg";
const LeftButton = ({
    onPlayWithBot,
    onPlayTestLobby,
}: {
    onPlayWithBot: () => void;
    onPlayTestLobby: () => void;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
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
            align={"center"}
            flexDir={"column"}
        >
            <Box onClick={onPlayWithBot} sx={{}}>
                <Image
                    src={RobotIcon}
                    sx={{
                        width: "140px",
                    }}
                ></Image>
                <Text sx={{}}>Bot Game</Text>
            </Box>
            <Box
                onClick={onPlayTestLobby}
                sx={{
                    marginTop: "20px",
                }}
            >
                <Image
                    src={PrivateLobbyIcon}
                    sx={{
                        width: "120px",
                    }}
                ></Image>
                <Text>Private Lobby</Text>
            </Box>
        </Flex>
    );
};

export default LeftButton;
