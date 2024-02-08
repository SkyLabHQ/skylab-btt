import {
    Box,
    Flex,
    SimpleGrid,
    Text,
    Image,
    keyframes,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useMemo, useRef } from "react";
import useCountDown from "react-countdown-hook";
import HourglassIcon from "../assets/hourglass.png";
import HummerIcon from "../assets/hummer.png";
import { ReactComponent as ETHIcon } from "../assets/ETH.svg";
import Bg from "../assets/bg.png";

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
                    height: "124px",
                    overflow: "hidden",
                    fontSize: "124px",
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
    const x = useRef(0);
    const y = useRef(0);
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

    return (
        <motion.div
            style={{
                width: "100%",
                minHeight: "100%",
                fontFamily: "Neoneon",
                position: "relative",
                background: `url(${Bg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "50% 50%",
                backgroundColor: "#1b1b1b",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <Box
                className="card"
                sx={{
                    width: "794px",
                    height: "794px",
                    borderRadius: "50%",
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
                        transition: "transform 300ms",
                        boxShadow: "0px 0px 10px 1px #000000ee",
                        borderRadius: "50%",

                        // transform: "rotateY(180deg)",
                    }}
                >
                    <Box
                        className="back"
                        sx={{
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
                                    // "linear-gradient(90deg, transparent, #ff9966, #ff9966, #ff9966, #ff9966, transparent)",
                                    "linear-gradient(90deg, rgba(255,85,85,0) 10%, #FF5555 50%, rgba(255,85,85,0) 91%)",

                                animation: `${rotation} 5000ms infinite linear`,
                                borderRadius: "50%",
                            },
                        }}
                    >
                        <Box
                            className="back-content"
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
                                }}
                            >
                                <Image src={HourglassIcon}></Image>
                                <Box>
                                    <motion.div
                                        style={{
                                            width: "100%",
                                            textShadow: "0px 0px 19px  #00CCFF",
                                            color: "rgba(255, 255, 255, 0.2)",
                                            fontSize: "120px",
                                            textAlign: "center",
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
                                            fontSize: "124px",
                                            textAlign: "center",
                                            margin: "20px auto 0",
                                            width: "100%",
                                            lineHeight: "1",
                                            fontFamily: "neon",
                                        }}
                                        animate={timeAnimate}
                                    >
                                        <SimpleGrid columns={4} width={"100%"}>
                                            <Box>
                                                <Flex
                                                    align={"center"}
                                                    justify={"center"}
                                                >
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
                                                        fontSize: "50px",
                                                    }}
                                                >
                                                    DAYS
                                                </Text>
                                            </Box>

                                            <Box>
                                                <Flex
                                                    align={"center"}
                                                    justify={"center"}
                                                >
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
                                                        fontSize: "50px",
                                                    }}
                                                >
                                                    HOURS
                                                </Text>
                                            </Box>
                                            <Box>
                                                <Flex
                                                    align={"center"}
                                                    justify={"center"}
                                                >
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
                                                        fontSize: "50px",
                                                    }}
                                                >
                                                    MINS
                                                </Text>
                                            </Box>
                                            <Box>
                                                <Flex
                                                    align={"center"}
                                                    justify={"center"}
                                                >
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
                                                        fontSize: "50px",
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
                    </Box>
                    <Box
                        className="front"
                        sx={{
                            color: "#fff",
                            transform: "rotateY(180deg)",
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
                                padding: "0 60px",
                            }}
                        >
                            <Image
                                src={HummerIcon}
                                sx={{
                                    width: "230px",
                                }}
                            ></Image>
                            <motion.div
                                style={{
                                    width: "100%",
                                    textShadow: "0px 0px 19px  #00CCFF",
                                    color: "rgba(255, 255, 255, 0.2)",
                                    fontSize: "160px",
                                    textAlign: "center",
                                    lineHeight: "170px",
                                    margin: "-30px 0 20px",
                                }}
                                animate={beginAnimate}
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
                                animate={beginAnimate}
                                transition={{
                                    duration: 1,
                                    yoyo: Infinity,
                                }}
                            >
                                <Flex align={"center"} justify={"center"}>
                                    <Text
                                        sx={{
                                            fontSize: "230px",
                                            lineHeight: "200px",
                                            fontFamily: "neon",
                                        }}
                                    >
                                        9.09
                                    </Text>
                                    <ETHIcon fill="currentColor"></ETHIcon>
                                </Flex>
                            </motion.div>
                        </Box>
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
                <motion.div
                    animate={{}}
                    whileHover={{
                        background: "rgb(151,229,255)",
                    }}
                    style={{
                        width: "334px",
                        height: "90px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        boxShadow: "0px 0px 17px 3px #FFEB3B",
                        border: "4px solid #FFECC7",
                        borderRadius: "19px",
                        margin: "0 50px",
                        fontSize: "50px",
                        background: "transparent",
                        fontFamily: "neon",
                    }}
                >
                    Level Tower
                </motion.div>
            </Flex>
        </motion.div>
    );
};

export default Test;
