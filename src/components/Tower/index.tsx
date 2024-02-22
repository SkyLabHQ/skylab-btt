import React, { useState, useEffect } from "react";
import { Box, Image, Text, Flex } from "@chakra-ui/react";
import { aviationImg } from "@/utils/aviationImg";
import LineBg from "./assets/line.png";
import Bg from "@/assets/bg.png";
import HummerIcon from "./assets/hummer.png";
import { ReactComponent as ETHIcon } from "@/assets/ETH.svg";
import { motion } from "framer-motion";
import Back from "../Back";

const ThePot = () => {
    return (
        <Box
            sx={{
                position: "absolute",
                left: "10%",
                top: "10px",
            }}
        >
            <Flex align={"center"}>
                <Text
                    sx={{
                        textShadow: "0px 0px 9px #FFEB3B",
                        color: "#FFEB3B",
                        fontSize: "74px",
                        textAlign: "center",
                        fontFamily: "Neoneon",
                    }}
                >
                    THE
                </Text>
                <Image src={HummerIcon}></Image>
                <Text
                    sx={{
                        textShadow: "0px 0px 9px #FFEB3B",
                        color: "#FFEB3B",
                        fontSize: "74px",
                        textAlign: "center",
                        fontFamily: "Neoneon",
                    }}
                >
                    POT
                </Text>
            </Flex>
            <Box
                sx={{
                    height: "2px",
                    background: "#FFE045",
                    boxShadow: "0px 0px 29px 4px #FAE20F",
                    width: "300px",
                }}
            ></Box>
            <motion.div
                style={{
                    width: "100%",
                    textShadow: "0px 0px 9px #FFEB3B",
                    color: "#FFEB3B",
                    marginTop: "10px",
                }}
            >
                <Flex align={"center"} justify={"center"}>
                    <Text
                        sx={{
                            fontSize: "160px",
                            lineHeight: 1,
                            fontFamily: "neon",
                        }}
                    >
                        9.09
                    </Text>
                    <ETHIcon
                        fill="currentColor"
                        style={{
                            width: "100px",
                            height: "100px",
                        }}
                    ></ETHIcon>
                </Flex>
            </motion.div>
        </Box>
    );
};

const Tower = () => {
    const [dataPoints] = useState([
        { x: 240, y: 30, level: 16 },
        { x: 560, y: 120, level: 15 },
        { x: 880, y: 190, level: 14 },
        { x: 1170, y: 320, level: 13 },
        { x: 900, y: 500, level: 12 },
        { x: 660, y: 560, level: 11 },
        { x: 330, y: 590, level: 10 },
        { x: 20, y: 592, level: 9 },
        { x: 250, y: 1200, level: 8 },
        { x: 550, y: 1330, level: 7 },
        { x: 840, y: 1400, level: 6 },
        { x: 1170, y: 1530, level: 5 },
        { x: 900, y: 1720, level: 4 },
        { x: 660, y: 1780, level: 3 },
        { x: 330, y: 1810, level: 2 },
        { x: 20, y: 1812, level: 1 },
    ]);

    return (
        <Box
            position="relative"
            sx={{
                backgroundImage: `url(${Bg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                backgroundColor: "#1b1b1b",
                height: "auto",
                padding: "100px 0 160px",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    left: "70px",
                    top: "60px",
                }}
            >
                <Back></Back>
            </Box>
            <ThePot></ThePot>
            <Box
                sx={{
                    width: "1200px",
                    backgroundImage: `url(${LineBg})`,
                    aspectRatio: "1133/1714",
                    backgroundSize: "cover",
                    position: "relative",
                }}
                margin="auto"
            >
                {dataPoints.map((point, index) => (
                    <Flex
                        key={index}
                        position="absolute"
                        left={`${point.x}px`}
                        top={`${point.y}px`}
                        transform="translate(-50%, -50%)"
                        width="124px"
                        height="124px"
                        sx={{
                            background: "#000",
                            borderRadius: "50%",
                        }}
                        flexDir={"column"}
                        align={"center"}
                    >
                        <Text
                            sx={{
                                position: "absolute",
                                top: "-36px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                fontSize: "24px",
                                width: "100%",
                                textAlign: "center",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "20px",
                                }}
                            >
                                Lv.
                            </span>{" "}
                            {point.level}
                        </Text>
                        <Image
                            src={aviationImg(point.level)}
                            alt={`Point ${index + 1}`}
                            width="124"
                            height="124"
                        ></Image>
                        <Flex
                            sx={{
                                padding: "2px",
                                borderRadius: "20px",
                                border: "1px solid #F2D861",
                                marginTop: "12px",
                            }}
                        >
                            <Flex
                                sx={{
                                    border: "1px solid #F2D861",
                                    borderRadius: "20px",
                                    height: "36px",
                                    fontSize: "28px",
                                    width: "160px",
                                }}
                                align={"center"}
                                justify={"center"}
                            >
                                00:45:59
                            </Flex>
                        </Flex>
                    </Flex>
                ))}
            </Box>
        </Box>
    );
};

export default Tower;
