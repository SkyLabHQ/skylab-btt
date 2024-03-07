import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import SYellowIcon from "./assets/s-yellow.png";
import SGreenIcon from "./assets/s-green.png";
import RYellowIcon from "./assets/x-yellow-r.png";
import LYellowIcon from "./assets/x-yellow-l.png";
import AmountBg from "./assets/amount-bg.png";
import HourglassIcon from "./assets/hourglass.png";

import LevelBg from "./assets/level-bg.png";
import { aviationImg } from "@/utils/aviationImg";

const list = [
    {
        level: 16,
        position: {
            top: "0%",
            left: "120px",
        },
        arrowImg: LYellowIcon,
        imgPosition: {
            width: "260px",
            top: "75px",
            left: "50%",
            transform: "translateX(-50%)",
        },
    },
    {
        level: 15,
        position: {
            top: "180px",
            right: "120px",
        },
        arrowImg: SYellowIcon,
        imgPosition: {
            top: "360px",
            right: "190px",
            width: "24px",
        },
    },
    {
        level: 14,
        position: {
            top: "630px",
            right: "120px",
        },
        arrowImg: RYellowIcon,
        imgPosition: {
            top: "675px",
            width: "260px",
            left: "50%",
            transform: "translateX(-50%)",
        },
    },
];

const AviationLevel = () => {
    return (
        <Box
            sx={{
                height: "100%",
                width: "900px",
                overflow: "hidden",
                margin: "0 auto",
                position: "relative",
            }}
        >
            {list.map((item, index) => {
                return (
                    <Box>
                        <Box
                            key={index}
                            sx={{
                                position: "absolute",
                                zIndex: 999,
                                ...item.position,
                            }}
                        >
                            <Flex
                                sx={{
                                    width: "160px",
                                    height: "160px",
                                    backgroundImage: `url(${LevelBg})`,
                                    backgroundSize: "100% 100%",
                                }}
                                flexDir={"column"}
                                align={"center"}
                                position={"relative"}
                            >
                                <Image
                                    src={aviationImg(item.level)}
                                    sx={{
                                        width: "80%",
                                    }}
                                ></Image>
                                <Text
                                    sx={{
                                        position: "absolute",
                                        bottom: "30px",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        fontSize: "30px",
                                        width: "100%",
                                        textAlign: "center",
                                    }}
                                >
                                    Lvl. {item.level}
                                </Text>
                                <Flex
                                    sx={{
                                        background: `url(${AmountBg})`,
                                        backgroundSize: "100% 100%",
                                        width: "48px",
                                        height: "48px",
                                        position: "absolute",
                                        bottom: "0",
                                        left: "50%",
                                        transform: "translate(-50%,40%)",
                                    }}
                                    justify={"center"}
                                    align={"center"}
                                >
                                    <Box
                                        sx={{
                                            verticalAlign: "bottom",
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: "12px",
                                            }}
                                        >
                                            x
                                        </span>
                                        <span
                                            style={{
                                                fontSize: "16px",
                                            }}
                                        >
                                            10
                                        </span>
                                    </Box>
                                </Flex>
                            </Flex>
                            <Flex
                                sx={{
                                    width: "136px",
                                    height: "32px",
                                    border: "1px solid #f2d861",
                                    margin: "28px auto 0",
                                    borderRadius: "16px",
                                    background: "rgba(0, 0, 0, 0.30)",
                                }}
                                align={"center"}
                            >
                                <Image
                                    src={HourglassIcon}
                                    sx={{
                                        width: "12px",
                                        margin: "0 12px",
                                    }}
                                ></Image>
                                <Box
                                    sx={{
                                        fontSize: "16px",
                                        zIndex: 999,
                                    }}
                                >
                                    00:14:14
                                </Box>
                            </Flex>
                        </Box>
                        <Image
                            src={item.arrowImg}
                            sx={{
                                position: "absolute",
                                ...item.imgPosition,
                            }}
                        ></Image>
                    </Box>
                );
            })}
        </Box>
    );
};
export default AviationLevel;
