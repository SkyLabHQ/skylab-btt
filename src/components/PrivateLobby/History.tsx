import { Box, Flex, Text, Image, Button, SimpleGrid } from "@chakra-ui/react";
import PairingIcon from "./assets/pairing.svg";
import RightArrow from "./assets/right-arrow.svg";
import FriendIcon from "./assets/friend.svg";
import React from "react";
import LobbyInfo from "./LobbyInfo";

const GameStatus = () => {
    return (
        <Flex>
            <Image
                src={PairingIcon}
                sx={{
                    width: "24px",
                    marginLeft: "24px",
                }}
            ></Image>
        </Flex>
    );
};

const GameList = () => {
    return (
        <Box
            sx={{
                padding: "20px",
                height: "594px",
                overflowY: "scroll",
                border: "1px solid #FFF",
                borderRadius: "20px",
                marginTop: "10px",
            }}
        >
            <SimpleGrid
                justifyContent={"space-between"}
                columns={2}
                spacingX={"110px"}
                spacingY={"20px"}
            >
                {Array(10)
                    .fill(0)
                    .map((_, index) => {
                        return (
                            <Box w="400px" key={index}>
                                <Flex align={"center"}>
                                    <Flex
                                        sx={{}}
                                        direction={"column"}
                                        align={"center"}
                                    >
                                        <Box
                                            sx={{
                                                width: "90px",
                                                height: "90px",
                                                borderRadius: "20px",
                                                border: "1px solid #FFF",
                                                background: "#C96F9D",
                                            }}
                                        ></Box>

                                        <Text
                                            sx={{
                                                color: "#BCBBBE",
                                                fontSize: "16px",
                                            }}
                                        >
                                            Alhasit
                                        </Text>
                                    </Flex>
                                    <Text
                                        sx={{
                                            fontSize: "24px",
                                            margin: "0 20px",
                                        }}
                                    >
                                        VS
                                    </Text>
                                    <Flex
                                        sx={{
                                            marginRight: "24px",
                                        }}
                                        direction={"column"}
                                        align={"center"}
                                    >
                                        <Box
                                            sx={{
                                                width: "90px",
                                                height: "90px",
                                                borderRadius: "20px",
                                                border: "1px solid #FFF",
                                                background: "#C96F9D",
                                            }}
                                        ></Box>

                                        <Text
                                            sx={{
                                                color: "#BCBBBE",
                                                fontSize: "16px",
                                            }}
                                        >
                                            Alhasit
                                        </Text>
                                    </Flex>
                                    <GameStatus></GameStatus>
                                </Flex>
                                <Box
                                    sx={{
                                        height: "1px",
                                        background:
                                            "linear-gradient(270deg, rgba(255, 255, 255, 0.00) 0%, #FFF 9.44%, rgba(255, 255, 255, 0.39) 85.56%, rgba(255, 255, 255, 0.00) 100%)",
                                    }}
                                ></Box>
                            </Box>
                        );
                    })}
            </SimpleGrid>
        </Box>
    );
};

const History = () => {
    return (
        <Box>
            <GameList></GameList>
            <LobbyInfo></LobbyInfo>
        </Box>
    );
};

export default History;
