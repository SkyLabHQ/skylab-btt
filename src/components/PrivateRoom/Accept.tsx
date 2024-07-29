import { Box, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BackWithText } from "@/components/Back";
import Nest from "@/components/Nest";

const Accept = ({
    handleJoinGame,
    gameInfo,
}: {
    handleJoinGame: () => void;
    gameInfo: any;
}) => {
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate("/free/pvpHome", {
            replace: true,
        });
    };

    return (
        <Flex
            sx={{
                width: "100%",
                height: "100%",
                position: "relative",
            }}
            align={"center"}
            justify={"center"}
            flexDir={"column"}
        >
            <Box
                sx={{
                    position: "absolute",
                    left: "12px",
                    top: "12px",
                }}
            >
                <BackWithText
                    onClick={handleCancel}
                    textContent={
                        <Box
                            sx={{
                                fontSize: "12px",
                                textAlign: "center",
                                lineHeight: "1",
                                marginTop: "8px",
                            }}
                        >
                            <Text>Back</Text>
                        </Box>
                    }
                ></BackWithText>
            </Box>
            <Box
                sx={{
                    fontSize: "16px",
                }}
            >
                Accept {gameInfo?.nickname1} 1v1 invitation?{" "}
            </Box>
            <Flex
                onClick={handleJoinGame}
                justify={"center"}
                align={"center"}
                sx={{
                    fontSize: "14px",
                    width: "180px",
                    height: "40px",
                    borderRadius: "12px",
                    border: "2px solid #fff",
                    marginTop: "40px",
                    background: "#303030",
                    cursor: "pointer",
                }}
            >
                <Box>Accept</Box>
            </Flex>
            <Flex
                onClick={handleCancel}
                justify={"center"}
                align={"center"}
                sx={{
                    width: "180px",
                    height: "40px",
                    borderRadius: "12px",
                    border: "2px solid #FFF",
                    background: "#303030",
                    fontSize: "14px",
                    marginTop: "20px",
                    cursor: "pointer",
                }}
            >
                Cancel
            </Flex>
            <Nest />
        </Flex>
    );
};
export default Accept;
