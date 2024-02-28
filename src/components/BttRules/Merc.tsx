import { Box, Flex, Image, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";
import Up from "./assets/up.png";

const Merc = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");

    return (
        <Box sx={{ width: "566px" }}>
            <Text
                sx={{
                    fontSize: "32px",
                    fontWeight: "bold",
                }}
            >
                UP & Mercs breeding
            </Text>
            <Box
                sx={{
                    border: "1px solid #FDDC2D",
                    borderRadius: "15px",
                    backdropFilter: "blur(15px)",
                    background: "rgba(113,157,151,0.5)",
                    marginTop: "10px",
                }}
            >
                <Flex
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottom: "1px solid #FDDC2D",
                        borderRadius: "0 0 15px 15px",
                        height: "400px",
                        position: "relative",
                    }}
                >
                    <Image src={Up}></Image>
                </Flex>
                <Box
                    sx={{
                        padding: "20px",
                    }}
                >
                    <Text
                        sx={{
                            fontSize: isPc ? "20px" : "12px",
                            textAlign: "center",
                        }}
                    >
                        Mercs have governance rights, can arbitrage, and would
                        have a buff to estate score{" "}
                    </Text>
                </Box>{" "}
            </Box>
        </Box>
    );
};

export default Merc;
