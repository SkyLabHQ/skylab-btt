import { Box, Flex, Image, Text, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import BttIcon from "@/assets/btt-icon.png";
import RightArrow from "@/components/TacToe/assets/right-arrow.svg";

const StartJourney = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                padding: "2px",
                background: "rgb(254,220,45)",
                border: "1px solid #000",
                borderRadius: isPc ? "0.9375vw" : "24px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    borderRadius: isPc ? "0.9375vw" : "24px",
                    color: "#000",
                    fontFamily: "Orbitron",
                    cursor: "pointer",
                    alignItems: "center",
                    position: "relative",
                    border: "1px solid #000",
                }}
                onClick={() => {
                    navigate("/");
                }}
            >
                <Image
                    src={BttIcon}
                    sx={{
                        height: isPc ? "6.7708vw" : "68px",
                        position: "absolute",
                        left: isPc ? "-2.1875vw" : "-16px",
                    }}
                ></Image>
                <Flex
                    sx={{
                        padding: isPc ? "0.5208vw 0" : "4px 0",
                    }}
                >
                    <Box
                        sx={{
                            padding: isPc
                                ? "0 0.5208vw 0 5.2083vw"
                                : "0 4px 0 56px",
                        }}
                    >
                        <Text
                            sx={{
                                fontSize: isPc ? "1.0417vw" : "12px",
                                marginRight: "0.7813vw",
                                textAlign: "center",
                                fontWeight: "bold",
                            }}
                        >
                            Bid Tac Toe
                        </Text>
                        <Text
                            sx={{
                                fontWeight: "bold",
                                fontSize: isPc ? "1.5625vw" : "16px",
                                textAlign: "center",
                            }}
                        >
                            Start your journey
                        </Text>
                    </Box>

                    <Flex
                        sx={{
                            borderLeft: "1px solid #000",
                            padding: isPc ? "0 0.5208vw" : "0 10px",
                        }}
                        flexDir={"column"}
                        justify={"center"}
                    >
                        <Image
                            src={RightArrow}
                            sx={{ height: isPc ? "1.6667vw" : "16px" }}
                        ></Image>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    );
};

export default StartJourney;
