import { Box, Flex, Text, Image } from "@chakra-ui/react";
import Medal1 from "@/assets/medal1.svg";
import Medal2 from "@/assets/medal2.svg";
import Medal3 from "@/assets/medal3.svg";

import React from "react";
import LobbyInfo from "./LobbyInfo";

const Top3Item = ({ detail }: { detail: any }) => {
    const { color, rank } = detail;
    return (
        <Flex align={"flex-end"}>
            <Box
                sx={{
                    position: "relative",
                }}
            >
                <Box
                    sx={{
                        width: "90px",
                        height: "90px",
                        background: color,
                        border: "1px solid #FFF",
                        borderRadius: "20px",
                    }}
                ></Box>
                <Image
                    src={rank === 1 ? Medal1 : rank === 2 ? Medal2 : Medal3}
                    sx={{
                        position: "absolute",
                        top: "-10px",
                        right: "0",
                        width: "40px",
                        transform: "translateX(50%)",
                    }}
                ></Image>
            </Box>
            <Box
                sx={{
                    background:
                        rank === 1
                            ? "var(--champion, linear-gradient(257deg, #FDCE49 61.28%, #EBD85B 64.38%, #FFF 68.02%, #FFF 70.38%, #FDCE49 81.84%))"
                            : rank === 2
                            ? "linear-gradient(180deg, #8EB4BD 0%, #FFF 100%)"
                            : "linear-gradient(180deg, #C96F9D 0%, #FFF 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                <Text sx={{}}>Alfwwdd</Text>
                <Text>Alfwwdd</Text>
            </Box>
        </Flex>
    );
};

const GameStatus = () => {
    return (
        <Flex>
            <Text>4 win/ 5 games</Text>
        </Flex>
    );
};

const GameList = () => {
    return (
        <Box sx={{ marginTop: "40px" }}>
            {Array(10)
                .fill(0)
                .map((_, index) => {
                    return (
                        <Box
                            key={index}
                            sx={{
                                height: "78px",
                            }}
                        >
                            <Flex align={"center"} justify={"space-between"}>
                                <Flex align={"center"}>
                                    <Text
                                        sx={{
                                            fontSize: "16px",
                                            marginRight: "40px",
                                            width: "100px",
                                        }}
                                    >
                                        {index + 4}
                                    </Text>
                                    <Flex sx={{}} align={"center"}>
                                        <Box
                                            sx={{
                                                width: "70px",
                                                height: "70px",
                                                borderRadius: "20px",
                                                border: "1px solid #FFF",
                                                background: "#C96F9D",
                                                marginRight: "12px",
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
        </Box>
    );
};

const Leaderboard = () => {
    return (
        <Box>
            <Box
                sx={{
                    border: "1px solid #FFF",
                    borderRadius: "20px",
                    marginTop: "10px",
                    height: "594px",
                    overflow: "scroll",
                    paddingTop: "70px",
                }}
            >
                <Box
                    sx={{
                        width: "700px",
                        margin: "0 auto",
                    }}
                >
                    <Flex justify={"center"}>
                        <Top3Item
                            detail={{
                                color: "red",
                                name: "Alhasit",
                                win: 10,
                                game: 20,
                                rank: 1,
                            }}
                        ></Top3Item>
                    </Flex>
                    <Flex
                        justify={"space-between"}
                        sx={{
                            marginTop: "100px",
                        }}
                    >
                        <Top3Item
                            detail={{
                                color: "red",
                                name: "Alhasit",
                                win: 10,
                                game: 20,
                                rank: 2,
                            }}
                        ></Top3Item>
                        <Top3Item
                            detail={{
                                color: "red",
                                name: "Alhasit",
                                win: 10,
                                game: 20,
                                rank: 3,
                            }}
                        ></Top3Item>
                    </Flex>
                    <GameList></GameList>
                </Box>
            </Box>
            <LobbyInfo></LobbyInfo>
        </Box>
    );
};

export default Leaderboard;
