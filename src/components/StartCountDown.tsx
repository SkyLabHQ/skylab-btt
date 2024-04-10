import { Box, Flex, SimpleGrid, Text, useMediaQuery } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useMemo } from "react";

const handleDateNumber = (number: number) => {
    if (number >= 10) {
        return [Math.floor(number / 10), number % 10];
    } else {
        return [0, number];
    }
};

const ScrollNum = ({
    fontSize = "95px",
    maxNumber = 9,
    number = -1,
}: {
    fontSize?: string;
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
                    height: fontSize,
                    overflow: "hidden",
                    fontSize: fontSize,
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

const StartCountDown = ({
    timeLeft,
    fontSize = "70px",
}: {
    timeLeft: number;
    fontSize?: string;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
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
    return (
        <motion.div
            style={{
                color: "rgba(56, 248, 255, 1)",
                fontSize: fontSize,
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
                    <Flex
                        align={"center"}
                        justify={"center"}
                        sx={{
                            position: "relative",
                            "&::after": {
                                content: "':'",
                                position: "absolute",
                                right: "0",
                                top: "50%",
                                transform: "translateY(-50%)",
                            },
                        }}
                    >
                        <ScrollNum
                            maxNumber={6}
                            number={d1}
                            fontSize={fontSize}
                        ></ScrollNum>
                        <ScrollNum
                            maxNumber={9}
                            number={d2}
                            fontSize={fontSize}
                        ></ScrollNum>{" "}
                    </Flex>
                    <Text
                        sx={{
                            fontSize: isPc ? "18px" : "12px",
                        }}
                    >
                        DAYS
                    </Text>
                </Box>

                <Box>
                    <Flex
                        align={"center"}
                        justify={"center"}
                        sx={{
                            position: "relative",
                            "&::after": {
                                content: "':'",
                                position: "absolute",
                                right: "0",
                                top: "50%",
                                transform: "translateY(-50%)",
                            },
                        }}
                    >
                        <ScrollNum
                            maxNumber={6}
                            number={h1}
                            fontSize={fontSize}
                        ></ScrollNum>
                        <ScrollNum
                            maxNumber={9}
                            number={h2}
                            fontSize={fontSize}
                        ></ScrollNum>
                    </Flex>
                    <Text
                        sx={{
                            fontSize: isPc ? "18px" : "12px",
                        }}
                    >
                        HOURS
                    </Text>
                </Box>
                <Box>
                    <Flex
                        align={"center"}
                        justify={"center"}
                        sx={{
                            position: "relative",
                            "&::after": {
                                content: "':'",
                                position: "absolute",
                                right: "0",
                                top: "50%",
                                transform: "translateY(-50%)",
                            },
                        }}
                    >
                        <ScrollNum
                            maxNumber={6}
                            number={m1}
                            fontSize={fontSize}
                        ></ScrollNum>
                        <ScrollNum
                            maxNumber={9}
                            number={m2}
                            fontSize={fontSize}
                        ></ScrollNum>
                    </Flex>
                    <Text
                        sx={{
                            fontSize: isPc ? "18px" : "12px",
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
                            fontSize={fontSize}
                        ></ScrollNum>
                        <ScrollNum
                            maxNumber={9}
                            number={s2}
                            fontSize={fontSize}
                        ></ScrollNum>
                    </Flex>
                    <Text
                        sx={{
                            fontSize: isPc ? "18px" : "12px",
                        }}
                    >
                        SECS
                    </Text>
                </Box>
            </SimpleGrid>
        </motion.div>
    );
};

export default StartCountDown;
