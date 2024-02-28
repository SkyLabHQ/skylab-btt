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
        <Box sx={{ width: "566px" }}>
            <Text
                sx={{
                    fontSize: "32px",
                    fontWeight: "bold",
                }}
            >
                Aviation Lvl-Pt System
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
                        padding: isPc ? "0 60px" : " 20px 30px",
                        height: "566px",
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
                            width: isPc ? "24px" : "12px",
                        }}
                        onClick={handleSub}
                    ></Image>
                    <Image
                        src={RightArrow}
                        sx={{
                            position: "absolute",
                            right: "0.5208vw",
                            cursor: "pointer",
                            width: isPc ? "24px" : "12px",
                        }}
                        onClick={handleAdd}
                    ></Image>
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
                        Point is earned through winning game.
                    </Text>
                </Box>{" "}
            </Box>
        </Box>
    );
};

export default AviationLvlPt;
