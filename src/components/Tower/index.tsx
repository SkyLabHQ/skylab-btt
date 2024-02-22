import React, { useState, useEffect, useRef, useMemo } from "react";
import { Box, Image, Text, Flex, keyframes } from "@chakra-ui/react";
import { aviationImg } from "@/utils/aviationImg";
import LineBg from "./assets/line.png";
import Bg from "@/assets/bg.png";
import HummerIcon from "./assets/hummer.png";
import { ReactComponent as ETHIcon } from "@/assets/ETH.svg";
import { motion } from "framer-motion";
import Back from "../Back";
import useCountDown from "react-countdown-hook";

const animationObj = {
    color: [
        "rgba(56, 248, 255, 1)",
        "rgba(255, 236, 199, 1)",
        "rgba(255, 214, 214, 1)",
    ],
    textShadow: "0px 0px 19px  #00CCFF",
    transition: {
        duration: 2,
        yoyo: Infinity,
    },
};
const rotation = keyframes`
  0% {
    transform: rotateZ(0deg);
  }

  100% {
    transform: rotateZ(360deg);
  }
`;

const AviationItem = ({ item, id }: { item: any; id: string }) => {
    const [timeLeft, { start }] = useCountDown(1000 * 100000, 1000);

    const formattedTime = useMemo(() => {
        if (timeLeft > 0) {
            const hours = String(
                Math.floor((timeLeft / (1000 * 60 * 60)) % 24),
            ).padStart(2, "0");
            const minutes = String(
                Math.floor((timeLeft / 1000 / 60) % 60),
            ).padStart(2, "0");
            const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(
                2,
                "0",
            );

            return `${hours}:${minutes}:${seconds}`;
        } else {
            return "00:00:00";
        }
    }, [timeLeft]);

    useEffect(() => {
        start();
    }, []);
    return (
        <Flex
            id={id}
            left={`${item.x}px`}
            top={`${item.y}px`}
            transform="translate(-50%, -50%)"
            width="124px"
            height="124px"
            sx={{
                background: "#000",
                borderRadius: "50%",
                position: "absolute",
                "&::before": {
                    position: "absolute",
                    content: "''",
                    display: "block",
                    width: "100%",
                    height: "100%",
                    background:
                        "linear-gradient(90deg, transparent, #ff9966, #ff9966, #ff9966, #ff9966, transparent)",
                    animation: `${rotation} 5000ms infinite linear`,
                    borderRadius: "50%",
                },
            }}
            flexDir={"column"}
            align={"center"}
        >
            <Box
                sx={{
                    position: "relative",
                    width: "99%",
                    height: "99%",
                    background: "#000",
                    borderRadius: "50%",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                }}
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
                        zIndex: 1,
                    }}
                >
                    <span
                        style={{
                            fontSize: "20px",
                        }}
                    >
                        Lv.
                    </span>{" "}
                    {item.level}
                </Text>
                <Image
                    src={aviationImg(item.level)}
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
                        {formattedTime}
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    );
};

const ThePot = () => {
    return (
        <Flex
            sx={{
                position: "absolute",
                left: "100px",
                top: "100px",
            }}
            flexDir={"column"}
            align={"center"}
        >
            <Flex align={"center"} sx={{}}>
                <motion.div
                    style={{
                        textShadow: "0px 0px 9px #FFEB3B",
                        color: "#FFEB3B",
                        fontSize: "74px",
                        textAlign: "center",
                        fontFamily: "Neoneon",
                    }}
                    animate={animationObj}
                >
                    THE
                </motion.div>
                <Image
                    src={HummerIcon}
                    sx={{
                        margin: "0 -50px 0",
                    }}
                ></Image>
                <motion.div
                    style={{
                        textShadow: "0px 0px 9px #FFEB3B",
                        color: "#FFEB3B",
                        fontSize: "74px",
                        textAlign: "center",
                        fontFamily: "Neoneon",
                    }}
                    animate={animationObj}
                >
                    POT
                </motion.div>
            </Flex>
            <Box
                sx={{
                    height: "2px",
                    background: "#FFE045",
                    boxShadow: "0px 0px 29px 4px #FAE20F",
                    width: "100%",
                    marginTop: "-50px",
                }}
            ></Box>
            <motion.div
                style={{
                    width: "100%",
                    textShadow: "0px 0px 9px #FFEB3B",
                    color: "#FFEB3B",
                    marginTop: "10px",
                }}
                animate={animationObj}
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
        </Flex>
    );
};

const Level = () => {
    const [scrollStatus, setScrollStatus] = useState(0);

    const handleScroll = (id: number) => {
        if (id === 0) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            return;
        }
        const targetNode = document.getElementById(`point-${id}`);

        if (targetNode) {
            window.scrollTo({
                top: targetNode.offsetTop,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const nodeA = document.getElementById("point-7");
            if (nodeA) {
                const rect = nodeA.offsetTop;
                const distanceFromTop = nodeA.offsetTop;
                console.log(distanceFromTop, "distanceFromTop");
                console.log(window.scrollY, "window.scrollY");
                // 当滚动距离大于节点 A 的距离时，设置状态为 1
                if (window.scrollY > distanceFromTop) {
                    setScrollStatus(1);
                } else {
                    setScrollStatus(0);
                }
            }
        };

        // 添加滚动事件监听器
        window.addEventListener("scroll", handleScroll);

        // 清除滚动事件监听器
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []); // 空数组表示只在组件挂载时运行一次

    return (
        <Box
            sx={{
                position: "fixed",
                right: "100px",
                top: "100px",
                zIndex: 1,
            }}
        >
            <Text
                sx={{
                    textShadow: "0px 7px 0px  #000",
                    color: "#fff",
                    fontSize: "38px",
                }}
            >
                Level Tower
            </Text>
            <Text
                onClick={() => {
                    handleScroll(0);
                }}
                sx={{
                    textShadow: "0px 7px 0px  rgba(0, 0, 0, 0.5)",
                    color: scrollStatus === 0 ? "#F2D861" : "#909090",
                    fontSize: scrollStatus === 0 ? "36px" : "30px",
                    fowWeight: "bold",
                    textAlign: "right",
                    cursor: "pointer",
                }}
            >
                Level 9-16
            </Text>
            <Text
                onClick={() => {
                    handleScroll(15);
                }}
                sx={{
                    textShadow: "0px 7px 0px  #000",
                    color: scrollStatus === 1 ? "#F2D861" : "#909090",
                    fontSize: scrollStatus === 1 ? "36px" : "30px",
                    fowWeight: "bold",
                    textAlign: "right",
                    cursor: "pointer",
                }}
            >
                Level 1-8
            </Text>
        </Box>
    );
};

const Tower = () => {
    const [dataPoints] = useState([
        { x: 200, y: 20, level: 16 },
        { x: 430, y: 110, level: 15 },
        { x: 680, y: 170, level: 14 },
        { x: 980, y: 280, level: 13 },
        { x: 780, y: 420, level: 12 },
        { x: 540, y: 480, level: 11 },
        { x: 250, y: 490, level: 10 },
        { x: 20, y: 490, level: 9 },
        { x: 200, y: 1030, level: 8 },
        { x: 460, y: 1130, level: 7 },
        { x: 700, y: 1180, level: 6 },
        { x: 980, y: 1280, level: 5 },
        { x: 780, y: 1420, level: 4 },
        { x: 540, y: 1480, level: 3 },
        { x: 250, y: 1490, level: 2 },
        { x: 20, y: 1490, level: 1 },
    ]);

    return (
        <Box
            position="relative"
            sx={{
                height: "100%",
            }}
        >
            <Box
                sx={{
                    position: "fixed",
                    backgroundImage: `url(${Bg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                    backgroundColor: "#1b1b1b",
                    height: "100%",
                    width: "100%",
                    overflow: "auto",
                }}
            ></Box>
            <ThePot></ThePot>
            <Level></Level>
            <Box
                sx={{
                    position: "absolute",
                    left: "70px",
                    top: "60px",
                }}
            >
                <Back></Back>
            </Box>
            <Box
                sx={{
                    height: "100%",
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        padding: "200px 0",
                    }}
                >
                    <Box
                        sx={{
                            width: "1000px",
                            backgroundImage: `url(${LineBg})`,
                            aspectRatio: "1133/1714",
                            backgroundSize: "cover",
                            position: "relative",
                        }}
                        margin="auto"
                    >
                        {dataPoints.map((point, index) => (
                            <AviationItem
                                item={point}
                                key={point.level + "-" + index}
                                id={"point-" + index}
                            ></AviationItem>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Tower;
