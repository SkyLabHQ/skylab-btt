import { Box, Image, Text, useMediaQuery } from "@chakra-ui/react";
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
                display: "flex",
                background: "#fff",
                borderRadius: isPc ? "0.9375vw" : "8px",
                color: "#000",
                padding: "0.2083vw 0.3125vw",
                fontFamily: "Orbitron",
                cursor: "pointer",
                width: isPc ? "20.8333vw" : "200px",
                alignItems: "center",
            }}
            onClick={() => {
                navigate("/");
            }}
        >
            <Image
                src={BttIcon}
                sx={{
                    height: isPc ? "3.8542vw" : "30px",
                    marginRight: isPc ? "0.7813vw" : "4px",
                }}
            ></Image>
            <Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Text
                        sx={{
                            fontSize: isPc ? "1.6667vw" : "20px",
                            lineHeight: isPc ? "2.0833vw" : "24px",
                            fontWeight: "bold",
                            marginRight: "0.7813vw",
                        }}
                    >
                        Bid Tac Toe
                    </Text>
                    <Box
                        sx={{
                            borderLeft: "1px solid #000",
                            paddingLeft: "0.5208vw",
                        }}
                    >
                        <Image
                            src={RightArrow}
                            sx={{ height: isPc ? "1.6667vw" : "16px" }}
                        ></Image>
                    </Box>
                </Box>
                <Text
                    sx={{
                        fontWeight: "bold",
                        fontSize: isPc ? "1.0417vw" : "12px",
                    }}
                >
                    Start your journey
                </Text>
            </Box>
        </Box>
    );
};

export default StartJourney;
