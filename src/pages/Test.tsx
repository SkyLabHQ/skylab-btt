import { Box, Flex, SimpleGrid, Text, Image } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useMemo } from "react";
import BlueX from "../assets/blue-x.svg";
import YellowO from "../assets/yellow-o.svg";
import LogoIcon from "../assets/logo.svg";
import useCountDown from "react-countdown-hook";

const handleDateNumber = (number: number) => {
    if (number >= 10) {
        return [Math.floor(number / 10), number % 10];
    } else {
        return [0, number];
    }
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
                            duration: 0.5,
                            ease: "linear",
                        },
                    });
                } else {
                    numAnimate.start({
                        transform: `translateY(-${number * 9.09}%)`,
                        transition: {
                            duration: 0.5,
                            ease: "linear",
                        },
                    });
                }
            } else {
                numAnimate.start({
                    transform: ["translateY(-90.9%)", "translateY(0%)"],
                    transition: {
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                    },
                });

                setTimeout(() => {
                    setInit(true);
                }, 1000);
            }
        };
        handle();
    }, [number, init]);

    return (
        <Box sx={{}}>
            <Box
                sx={{
                    height: "160px",
                    overflow: "hidden",
                    fontSize: "160px",
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

const Test = () => {
    const logoAnimate = useAnimation();
    const beginAnimate = useAnimation();
    const potAnimate = useAnimation();
    const dateAnimate = useAnimation();
    const timeAnimate = useAnimation();

    const [timeLeft, { start }] = useCountDown(5000000, 1000);

    const { d1, d2, h1, h2, m1, m2, s1, s2 } = useMemo(() => {
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

        console.log(seconds, s1, s2);

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
    }, [timeLeft]);

    const [isTime, setIsTime] = React.useState(true);

    const handleInit = () => {
        if (isTime) {
            potAnimate.stop();
            potAnimate.set({
                color: "rgba(255, 255, 255, 0.2)",
                textShadow: "",
            });
            dateAnimate.stop();
            dateAnimate.set({
                color: "rgba(255, 255, 255, 0.2)",
                textShadow: "",
            });
            beginAnimate.start({
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
            });
            timeAnimate.start({
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
            });
        } else {
            beginAnimate.stop();
            beginAnimate.set({
                color: "rgba(255, 255, 255, 0.2)",
                textShadow: "",
            });
            timeAnimate.stop();
            timeAnimate.set({
                color: "rgba(255, 255, 255, 0.2)",
                textShadow: "",
            });
            potAnimate.start({
                color: [
                    "rgba(56, 248, 255, 1)",
                    "rgba(255, 236, 199, 1)",
                    "rgba(255, 214, 214, 1)",
                ],
                textShadow: "0px 0px 19px  #00CCFF",

                transition: {
                    duration: 1,
                    yoyo: Infinity,
                },
            });
            dateAnimate.start({
                color: [
                    "rgba(56, 248, 255, 1)",
                    "rgba(255, 236, 199, 1)",
                    "rgba(255, 214, 214, 1)",
                ],
                textShadow: "0px 0px 19px  #00CCFF",

                transition: {
                    duration: 1,
                    yoyo: Infinity,
                },
            });
        }
    };

    const handleClickLogo = () => {
        logoAnimate.start({
            height: ["200px", "280px", "200px"],
            width: "2px",
            background: "#fff",
            transition: {
                duration: 0.3,
            },
        });

        setIsTime(!isTime);
    };

    useEffect(() => {
        handleInit();
    }, [isTime]);

    useEffect(() => {
        start();
    }, []);

    console.log(s1, s2);

    return (
        <Flex
            align={"center"}
            flexDirection={"column"}
            sx={{
                width: "100%",
                height: "100%",
                fontFamily: "Neoneon",
                position: "relative",
                background:
                    "radial-gradient(50% 50%, rgba(255, 105, 190, 100) 0%, rgba(166, 62, 153, 0.41) 62.1%, rgba(103, 31, 156, 0.01) 100%)",
            }}
        >
            <Flex
                flexDir={"column"}
                align={"center"}
                sx={{
                    position: "absolute",
                    top: "0%",
                    right: "100px",
                }}
            >
                <motion.div
                    style={{
                        height: "200px",
                        width: "2px",
                        background: "#fff",
                    }}
                    animate={logoAnimate}
                ></motion.div>
                <Image
                    src={LogoIcon}
                    width={"40px"}
                    sx={{
                        cursor: "pointer",
                    }}
                    onClick={handleClickLogo}
                ></Image>
            </Flex>
            <Box
                sx={{
                    height: "240px",
                    position: "relative",
                    width: "1200px",
                }}
            >
                <motion.div
                    style={{
                        width: "100%",
                        textShadow: "",
                        color: "rgba(255, 255, 255, 0.2)",
                        fontSize: "160px",
                        textAlign: "center",
                        position: "absolute",
                        top: "35%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                    animate={potAnimate}
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
                        textShadow: "0px 0px 19px  #00CCFF",
                        color: "rgba(255, 255, 255, 0.2)",
                        fontSize: "160px",
                        textAlign: "center",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                    animate={beginAnimate}
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
                    width: "950px",
                    height: "6px",
                    background: "#FFE045",
                    boxShadow: "0px 0px 29px 4px #FAE20F",
                    margin: "0 auto ",
                }}
            ></motion.div>
            <Box
                sx={{
                    height: "330px",
                    position: "relative",
                    width: "950px",
                }}
            >
                <motion.div
                    style={{
                        textShadow: "0px 0px 19px  #00CCFF",
                        color: "rgba(255,255,255,0.2)",
                        fontSize: "160px",
                        textAlign: "center",
                        fontFamily: "Neoneon",
                        margin: "0 auto",
                        position: "absolute",
                        top: "30%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "100%",
                    }}
                    animate={dateAnimate}
                >
                    <Text
                        sx={{
                            fontSize: "200px",
                        }}
                    >
                        9.09
                    </Text>
                </motion.div>
                <motion.div
                    style={{
                        color: "rgba(56, 248, 255, 1)",
                        fontSize: "160px",
                        textAlign: "center",
                        margin: "0 auto",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "100%",
                        lineHeight: "1",
                        fontFamily: "neon",
                    }}
                    animate={timeAnimate}
                >
                    <SimpleGrid columns={4} spacingX={"80px"}>
                        <Box>
                            {" "}
                            <Flex align={"center"}>
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
                                    fontSize: "60px",
                                }}
                            >
                                DAYS
                            </Text>
                        </Box>
                        <Box>
                            <Flex align={"center"}>
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
                                    fontSize: "60px",
                                }}
                            >
                                HOURS
                            </Text>
                        </Box>
                        <Box>
                            <Flex align={"center"}>
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
                                    fontSize: "60px",
                                }}
                            >
                                MINS
                            </Text>
                        </Box>
                        <Box>
                            <Flex align={"center"}>
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
                                    fontSize: "60px",
                                }}
                            >
                                SECS
                            </Text>
                        </Box>
                    </SimpleGrid>
                </motion.div>
            </Box>

            <motion.div
                style={{
                    width: "950px",
                    height: "6px",
                    background: "#FFE045",
                    boxShadow: "0px 0px 29px 4px #FAE20F",
                    margin: "0 auto ",
                }}
            ></motion.div>
            <Flex
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "20px",
                }}
            >
                <Image
                    src={BlueX}
                    sx={{
                        width: "170px",
                    }}
                ></Image>
                <motion.div
                    animate={{}}
                    whileHover={{
                        background: "rgb(151,229,255)",
                    }}
                    style={{
                        width: "320px",
                        height: "133px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        boxShadow: "0px 0px 17px 3px #FFEB3B",
                        border: "3px solid #FFECC7",
                        borderRadius: "19px",
                        margin: "0 50px",
                        fontSize: "80px",
                        background: "transparent",
                    }}
                >
                    PLAY
                </motion.div>
                <Image
                    src={YellowO}
                    sx={{
                        width: "170px",
                    }}
                ></Image>
            </Flex>
        </Flex>
    );
};

export default Test;
