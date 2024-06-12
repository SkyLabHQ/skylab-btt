import { Text, Image, Flex } from "@chakra-ui/react";
import RobotIcon from "./assets/bot-game.png";

const LeftButton = ({ onPlayWithBot }: { onPlayWithBot: () => void }) => {
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
        </Flex>
    );
};

export default LeftButton;
