import { Box, Flex, Image, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";
import AllPlane from "./assets/all-plane.png";
import LeftArrow from "@/components/Tournament/assets/left-arrow.svg";
import RightArrow from "@/components/Tournament/assets/right-arrow.svg";

const AviationLvlPt = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [test, setTest] = useState(0);
    const handleSub = () => {
        if (test <= 0) return;
        setTest(test - 20);
    };

    const handleAdd = () => {
        if (test >= 100) return;
        setTest(test + 20);
    };

    return (
        <Box>
            <Text
                sx={{
                    fontSize: "1.6667vw",
                    fontWeight: "bold",
                }}
            >
                Aviation Lvl-Pt System
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
                        padding: isPc ? "0 3.125vw" : " 1.0417vw 1.5625vw",
                        height: "29.4792vw",
                        position: "relative",
                    }}
                >
                    <Box
                        sx={{
                            background: `url(${AllPlane}) no-repeat `,
                            backgroundSize: "cover",
                            backgroundPosition: `${test}% 0`,
                            width: "1200px",
                            height: "300px",
                            transition: "all 1s",
                        }}
                    ></Box>
                    <Image
                        src={LeftArrow}
                        sx={{
                            position: "absolute",
                            left: "0.5208vw",
                            cursor: "pointer",
                            width: isPc ? "1.25vw" : "0.625vw",
                        }}
                        onClick={handleSub}
                    ></Image>
                    <Image
                        src={RightArrow}
                        sx={{
                            position: "absolute",
                            right: "0.5208vw",
                            cursor: "pointer",
                            width: isPc ? "1.25vw" : "0.625vw",
                        }}
                        onClick={handleAdd}
                    ></Image>
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
                        Point is earned through winning game.
                    </Text>
                </Box>{" "}
            </Box>
        </Box>
    );
};

export default AviationLvlPt;
