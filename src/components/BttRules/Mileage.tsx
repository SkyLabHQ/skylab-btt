import { Box, Flex, Image, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";
import MileageType from "./assets/mileage.png";

const Mileage = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");

    return (
        <Box>
            <Text
                sx={{
                    fontSize: "1.6667vw",
                    fontWeight: "bold",
                }}
            >
                Mileage
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
                    <Image src={MileageType}></Image>
                </Flex>
                <Box
                    sx={{
                        padding: "1.0417vw",
                        fontSize: isPc ? "1.0417vw" : "0.625vw",
                        height: "6.7708vw",
                        overflowY: "hidden",
                    }}
                >
                    <Text>Pilot earn mileage through playing games.</Text>
                    <Text>For each game: </Text>
                    <Text>
                        Mileage gained ={" "}
                        <span
                            style={{
                                color: "#FDDC2D",
                            }}
                        >
                            Level of aviation
                        </span>{" "}
                        x{" "}
                        <span
                            style={{
                                color: "#FDDC2D",
                            }}
                        >
                            point transferred
                        </span>{" "}
                    </Text>
                </Box>{" "}
            </Box>
        </Box>
    );
};
export default Mileage;
