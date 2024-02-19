import {
    Box,
    Flex,
    SimpleGrid,
    Text,
    Image,
    keyframes,
    useMediaQuery,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import useCountDown from "react-countdown-hook";
import HourglassIcon from "../assets/hourglass.png";
import HummerIcon from "../assets/hummer.png";
import { ReactComponent as ETHIcon } from "../assets/ETH.svg";
import Bg from "../assets/bg.png";
import BHummer from "../assets/b-hummer.png";
import OIcon from "../assets/o.png";
import XIcon from "../assets/x.png";
import BgLight from "../assets/bg-light.png";
import CHummer from "../assets/c-hummer.png";
import MouseImage from "../assets/mouse.png";

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

const handleDateNumber = (number: number) => {
    if (number >= 10) {
        return [Math.floor(number / 10), number % 10];
    } else {
        return [0, number];
    }
};

const FrontContent = () => {
    return (
        <Box
            className="front-content"
            sx={{
                position: "absolute",
                width: "99%",
                height: "99%",
                background:
                    "linear-gradient(126.1deg, #000000 0%, #000000 46.99%, #000000 100%)",
                borderRadius: "50%",
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                padding: "10px 100px",
            }}
        >
            <Image
                src={HummerIcon}
                sx={{
                    width: "180px",
                }}
            ></Image>
            <motion.div
                style={{
                    width: "100%",
                    textShadow: "0px 0px 19px  #00CCFF",
                    color: "rgba(255, 255, 255, 0.2)",
                    fontSize: "100px",
                    textAlign: "center",
                    lineHeight: "100px",
                    margin: "-20px 0 30px",
                }}
                animate={animationObj}
                transition={{
                    duration: 1,
                    yoyo: Infinity,
                }}
            >
                THE POT
            </motion.div>
            <motion.div
                style={{
                    width: "100%",
                    height: "6px",
                    background: "#FFE045",
                    boxShadow: "0px 0px 29px 4px #FAE20F",
                    margin: "0 auto ",
                }}
            ></motion.div>
            <motion.div
                style={{
                    width: "100%",
                    textShadow: "0px 0px 19px  #00CCFF",
                    color: "rgba(255, 255, 255, 0.2)",
                    textAlign: "center",
                    marginTop: "20px",
                }}
                animate={{
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
                }}
                transition={{
                    duration: 1,
                    yoyo: Infinity,
                }}
            >
                <Flex align={"center"} justify={"center"}>
                    <Text
                        sx={{
                            fontSize: "160px",
                            lineHeight: "160px",
                            fontFamily: "neon",
                        }}
                    >
                        9.09
                    </Text>
                    <ETHIcon
                        fill="currentColor"
                        style={{
                            width: "64px",
                        }}
                    ></ETHIcon>
                </Flex>
            </motion.div>
        </Box>
    );
};

const FirstContent = () => {
    return (
        <Box
            className="front-content"
            sx={{
                position: "absolute",
                width: "99%",
                height: "99%",
                background:
                    "linear-gradient(126.1deg, #000000 0%, #000000 46.99%, #000000 100%)",
                borderRadius: "50%",
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                padding: "10px 100px",
            }}
        >
            <Flex
                sx={{
                    width: "100%",
                    height: "100%",
                }}
                flexDir={"column"}
                justify={"flex-end"}
                align={"center"}
            >
                <Image
                    src={CHummer}
                    sx={{
                        width: "450px",
                        maxWidth: "200%",
                        marginBottom: "-100px",
                    }}
                ></Image>
            </Flex>
        </Box>
    );
};

const BackContent = () => {
    const [init, setInit] = useState(false);

    const [timeLeft, { start }] = useCountDown(5000000, 1000);

    const { d1, d2, h1, h2, m1, m2, s1, s2 } = useMemo(() => {
        if (!init) {
            return {
                d1: 3,
                d2: 4,
                h1: 5,
                h2: 6,
                m1: 7,
                m2: 8,
                s1: 9,
                s2: 1,
            };
        }
        const seconds = Math.floor((timeLeft / 1000) % 60);
        const mintues = Math.floor((timeLeft / 1000 / 60) % 60);
        const hours = Math.floor((timeLeft / 1000 / 60 / 60) % 60);
        const days = Math.floor((timeLeft / 1000 / 60 / 60 / 60) % 24);

        let s1,
            s2,
            m1,
            m2,
            h1,
            h2,
            d1,
            d2 = 0;
        [s1, s2] = handleDateNumber(seconds);
        [m1, m2] = handleDateNumber(mintues);
        [h1, h2] = handleDateNumber(hours);
        [d1, d2] = handleDateNumber(days);

        return {
            s1,
            s2,
            m1,
            m2,
            h1,
            h2,
            d1,
            d2,
        };
    }, [timeLeft, init]);

    const handleInit = () => {
        setTimeout(() => {
            start();
            setInit(true);
        }, 2000);
    };

    useEffect(() => {
        handleInit();
    }, []);
    return (
        <Box
            sx={{
                position: "absolute",
                width: "99%",
                height: "99%",
                background:
                    "linear-gradient(126.1deg, #000000 0%, #000000 46.99%, #000000 100%)",
                borderRadius: "50%",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                padding: "0 60px",
            }}
        >
            <Flex
                align={"center"}
                flexDirection={"column"}
                sx={{
                    width: "100%",
                    height: "100%",
                    fontFamily: "Neoneon",
                    position: "relative",
                    paddingTop: "20px",
                }}
            >
                <Image
                    src={HourglassIcon}
                    sx={{
                        width: "100px",
                    }}
                ></Image>
                <Box>
                    <motion.div
                        style={{
                            width: "100%",
                            textShadow: "0px 0px 19px  #00CCFF",
                            color: "rgba(255, 255, 255, 0.2)",
                            fontSize: "100px",
                            textAlign: "center",
                        }}
                        animate={animationObj}
                        transition={{
                            duration: 1,
                            yoyo: Infinity,
                        }}
                    >
                        BEGINS IN
                    </motion.div>
                </Box>

                <motion.div
                    style={{
                        width: "100%",
                        height: "6px",
                        background: "#FFE045",
                        boxShadow: "0px 0px 29px 4px #FAE20F",
                        margin: "0 auto ",
                    }}
                ></motion.div>
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                    }}
                >
                    <motion.div
                        style={{
                            color: "rgba(56, 248, 255, 1)",
                            fontSize: "95px",
                            textAlign: "center",
                            margin: "20px auto 0",
                            width: "100%",
                            lineHeight: "1",
                            fontFamily: "neon",
                        }}
                        animate={animationObj}
                    >
                        <SimpleGrid columns={4} width={"100%"}>
                            <Box>
                                <Flex align={"center"} justify={"center"}>
                                    <ScrollNum
                                        maxNumber={6}
                                        number={d1}
                                    ></ScrollNum>
                                    <ScrollNum
                                        maxNumber={9}
                                        number={d2}
                                    ></ScrollNum>{" "}
                                </Flex>
                                <Text
                                    sx={{
                                        fontSize: "30px",
                                    }}
                                >
                                    DAYS
                                </Text>
                            </Box>

                            <Box>
                                <Flex align={"center"} justify={"center"}>
                                    <ScrollNum
                                        maxNumber={6}
                                        number={h1}
                                    ></ScrollNum>
                                    <ScrollNum
                                        maxNumber={9}
                                        number={h2}
                                    ></ScrollNum>
                                </Flex>
                                <Text
                                    sx={{
                                        fontSize: "30px",
                                    }}
                                >
                                    HOURS
                                </Text>
                            </Box>
                            <Box>
                                <Flex align={"center"} justify={"center"}>
                                    <ScrollNum
                                        maxNumber={6}
                                        number={m1}
                                    ></ScrollNum>
                                    <ScrollNum
                                        maxNumber={9}
                                        number={m2}
                                    ></ScrollNum>
                                </Flex>
                                <Text
                                    sx={{
                                        fontSize: "30px",
                                    }}
                                >
                                    MINS
                                </Text>
                            </Box>
                            <Box>
                                <Flex align={"center"} justify={"center"}>
                                    <ScrollNum
                                        maxNumber={6}
                                        number={s1}
                                    ></ScrollNum>
                                    <ScrollNum
                                        maxNumber={9}
                                        number={s2}
                                    ></ScrollNum>
                                </Flex>
                                <Text
                                    sx={{
                                        fontSize: "30px",
                                    }}
                                >
                                    SECS
                                </Text>
                            </Box>
                        </SimpleGrid>
                    </motion.div>
                </Box>
            </Flex>
        </Box>
    );
};

const ScrollNum = ({
    maxNumber = 9,
    number = -1,
}: {
    maxNumber?: number;
    number?: number;
}) => {
    const [init, setInit] = React.useState(false);
    const numAnimate = useAnimation();

    useEffect(() => {
        const handle = async () => {
            if (init) {
                await numAnimate.stop();
                if (number === maxNumber) {
                    await numAnimate.start({
                        transform: [
                            `translateY(-${(maxNumber + 1) * 9.09}%)`,
                            `translateY(-${number * 9.09}%)`,
                        ],

                        transition: {
                            duration: init ? 0.5 : 0,
                            ease: "linear",
                        },
                    });
                } else {
                    numAnimate.start({
                        transform: `translateY(-${number * 9.09}%)`,
                        transition: {
                            duration: init ? 0.5 : 0,
                            ease: "linear",
                        },
                    });
                }
            } else {
                await numAnimate.set({
                    transform: [
                        `translateY(-${(maxNumber + 1) * 9.09}%)`,
                        `translateY(-${number * 9.09}%)`,
                    ],
                });
                setInit(true);
            }
        };
        handle();
    }, [number]);

    return (
        <Box sx={{}}>
            <Box
                sx={{
                    height: "95px",
                    overflow: "hidden",
                    fontSize: "95px",
                    lineHeight: "1",
                }}
            >
                <motion.div animate={numAnimate}>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item, index) => {
                        return <Box key={index}>{item}</Box>;
                    })}
                </motion.div>
            </Box>
        </Box>
    );
};

const YellowBg = () => {
    const clickAnimate = useAnimation();
    const handleClick = async () => {
        const height = window.innerHeight;
        await clickAnimate.set({
            borderRadius: "50%",
            transition: { duration: 0.2 },
        });

        await clickAnimate.start({
            width: Math.floor(0.9 * height),
            height: Math.floor(0.9 * height),
            transition: { duration: 0.2 },
        });

        await clickAnimate.start({
            scale: 0,
            transition: { duration: 0.6 },
        });
    };

    return (
        <motion.div
            style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                background: "#fddc2d",
                zIndex: 10,
            }}
            onClick={handleClick}
            animate={clickAnimate}
        >
            <Box
                sx={{
                    position: "absolute",
                    bottom: "0px",
                    left: "50%",
                    transform: "translateX(-50%)",
                }}
            >
                <Flex
                    sx={{
                        justifyContent: "space-around",
                    }}
                >
                    <motion.img
                        src={XIcon}
                        style={{
                            width: "180px",
                        }}
                        animate={{
                            transform: [
                                "translateY(-20px)",
                                "translateY(20px)",
                            ],
                        }}
                        transition={{
                            duration: 1,
                            yoyo: Infinity,
                        }}
                    ></motion.img>
                    <motion.img
                        src={OIcon}
                        style={{
                            width: "180px",
                        }}
                        animate={{
                            transform: [
                                "translateY(-20px)",
                                "translateY(20px)",
                            ],
                        }}
                        transition={{
                            duration: 1,
                            yoyo: Infinity,
                            delay: 1,
                        }}
                    ></motion.img>
                </Flex>

                <Image
                    src={BHummer}
                    sx={{
                        width: "600px",
                    }}
                ></Image>
            </Box>
        </motion.div>
    );
};

const Test = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [hoverInit, setHoverInit] = useState(false);
    const mounseX = useRef(0);
    const mounseY = useRef(0);

    const [backgroundPosition, setBackgroundPosition] = useState("50% 50%");
    // 处理鼠标移动
    const handleMouseMove = (event: any) => {
        const { clientX, clientY } = event;
        mounseX.current = clientX;
        mounseY.current = clientY;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // 计算背景位置的百分比
        const backgroundPositionX =
            50 + ((clientX - screenWidth / 2) / screenWidth) * 20; // 微调这个值来改变移动的幅度
        const backgroundPositionY =
            50 + ((clientY - screenHeight / 2) / screenHeight) * 20; // 微调这个值来改变移动的幅度
        setBackgroundPosition(
            `${backgroundPositionX}% ${backgroundPositionY}%`,
        );
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <motion.div
            style={{
                width: "100%",
                minHeight: "100%",
                fontFamily: "Neoneon",
                position: "relative",
                backgroundImage: `url(${Bg}),url(${BgLight})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "auto 100%",
                backgroundColor: "#1b1b1b",
                backgroundPosition: `${backgroundPosition}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                overflow: "hidden",
                cursor: `none`,
            }}
        >
            {isPc && (
                <Image
                    src={MouseImage}
                    sx={{
                        position: "absolute",
                        left: mounseX.current,
                        top: mounseY.current,
                        width: "100px",
                        height: "100px",
                        transform: "translate(-50%,-50%)",
                        pointerEvents: "none",
                        zIndex: 9999,
                    }}
                ></Image>
            )}
            <YellowBg></YellowBg>
            <Box
                className="card"
                sx={{
                    maxWidth: "600px",
                    width: "100%",
                    height: "auto",
                    borderRadius: "50%",
                    aspectRatio: "1/1",

                    "&:hover .content": {
                        transform: "rotateY(180deg)",
                    },
                }}
            >
                <Box
                    className="content"
                    sx={{
                        width: "100%",
                        height: "100%",
                        transformStyle: "preserve-3d",
                        transition: "transform 600ms",
                        boxShadow: "0px 0px 10px 1px #000000ee",
                        borderRadius: "50%",
                        // transform: "rotateY(180deg)",
                    }}
                    onMouseEnter={() => {
                        setTimeout(() => {
                            setHoverInit(true);
                        }, 600);
                    }}
                >
                    <Box
                        className="back"
                        sx={{
                            transform: "rotateY(180deg)",
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            overflow: "hidden",
                            borderRadius: "50%",
                            "&::before": {
                                position: "absolute",
                                content: "''",
                                display: "block",
                                width: "100%",
                                height: "100%",
                                background:
                                    "linear-gradient(90deg, rgba(255,85,85,0) 10%, #FF5555 50%, rgba(255,85,85,0) 91%)",
                                animation: `${rotation} 5000ms infinite linear`,
                                borderRadius: "50%",
                            },
                        }}
                    >
                        <FrontContent></FrontContent>
                    </Box>
                    <Box
                        className="front"
                        sx={{
                            color: "#fff",
                            backgroundColor: "#151515",
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            borderRadius: "50%",
                            overflow: "hidden",
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
                    >
                        {hoverInit ? (
                            <BackContent></BackContent>
                        ) : (
                            <FirstContent></FirstContent>
                        )}
                    </Box>
                </Box>
            </Box>
            <Flex
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "20px",
                }}
            >
                <Box
                    sx={{
                        width: "334px",
                        height: "90px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "19px",
                        margin: "66px 50px 0",
                        fontSize: "50px",
                        background: "transparent",
                        fontFamily: "neon",
                        //  --glow-color: #FFECC7;
                        // --glow-spread-color: #FFECC7;
                        // --enhanced-glow-color: #FFECC7;
                        // --btn-color: #000000;
                        border: "4px solid #FFECC7",
                        color: "#FFECC7",
                        fontWeight: "bold",
                        backgroundColor: "transparent",
                        outline: "none",
                        boxShadow: `0 0 8px 2px #FFECC7,
                               0 0 32px 8px #FFECC7,
                               inset 0 0 6px 2px #FFECC7`,
                        textShadow: `0 0 4px #FFECC7`,
                        position: `relative`,
                        transition: ` all 0.3s`,
                        "&::after": {
                            content: "''",
                            position: "absolute",
                            top: "120%",
                            left: "0",
                            height: "100%",
                            width: "100%",
                            backgroundColor: "#FFECC7",
                            filter: "blur(2em)",
                            opacity: ".7",
                            transform:
                                "perspective(1.5em) rotateX(35deg) scale(1, .6)",
                        },
                        "&:hover": {
                            color: "#000",
                            backgroundColor: "#FFECC7",
                            boxShadow: `0 0 8px 2px #FFECC7, 0 0 32px 16px #FFECC7,inset 0 0 6px 2px #FFECC7`,
                        },
                        "&:active": {
                            boxShadow: `0 0 5px 2px #FFECC7,
        0 0 20px 16px #FFECC7,
        inset 0 0 4px 2px #FFECC7`,
                        },
                    }}
                >
                    Level Tower
                </Box>
            </Flex>
        </motion.div>
    );
};

export default Test;
