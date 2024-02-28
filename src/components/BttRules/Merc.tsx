import { Box, Flex, Image, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";
import Up from "./assets/up.png";

const Merc = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");

    return (
        <Box>
            <Text
                sx={{
                    fontSize: "1.6667vw",
                    fontWeight: "bold",
                }}
            >
                UP & Mercs breeding
            </Text>
            <Box
                sx={{
                    border: "1px solid #FDDC2D",
                    borderRadius: "0.7813vw",
                    backdropFilter: "blur(0.7813vw)",
                    background: "rgba(113,157,151,0.5)",
                    marginTop: "0.5208vw",
                }}
            >
                <Flex
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottom: "1px solid #FDDC2D",
                        borderRadius: "0 0 0.7813vw 0.7813vw",
                        height: "20.8333vw",
                        position: "relative",
                    }}
                >
                    <Image src={Up}></Image>
                </Flex>
                <Box
                    sx={{
                        padding: "1.0417vw",
                    }}
                >
                    <Text
                        sx={{
                            fontSize: isPc ? "1.0417vw" : "0.625vw",
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
