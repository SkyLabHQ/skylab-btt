import { Box, Flex, Image, Text, useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useCountUp } from "react-countup";
import OpenSeaIcon from "@/assets/opensea.png";
import RightArrow from "./assets/right-arrow.svg";
import Tw from "./assets/m-tw.png";
import StartCountDown from "../StartCountDown";
import useStartGame from "@/hooks/useStartGame";

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

const MPotInfo = ({ potAmount }: { potAmount: string }) => {
    const countUpRef = React.useRef(null);
    const { update } = useCountUp({
        ref: countUpRef,
        start: 0,
        end: 0,
        duration: 1,
        decimals: 2,
    });

    useEffect(() => {
        if (Number(potAmount) > 0) {
            update(Number(potAmount));
        }
    }, [potAmount]);

    return (
        <Box
            sx={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                lineHeight: 1,
                fontFamily: "Neon Sans",
                marginBottom: [
                    "constant(safe-area-inset-bottom)",
                    "env(safe-area-inset-bottom)",
                ],
            }}
        >
            <motion.div
                style={{
                    width: "100%",
                    textShadow: "0px 0px 19px  #00CCFF",
                    color: "rgba(255, 255, 255, 0.2)",
                    fontSize: "24px",
                    textAlign: "center",
                    fontFamily: "neonsans",
                }}
                animate={animationObj}
                transition={{
                    duration: 1,
                    yoyo: Infinity,
                }}
            >
                POOL
            </motion.div>
            <motion.div
                style={{
                    width: "100%",
                    textShadow: "0px 0px 19px  #00CCFF",
                    color: "rgba(255, 255, 255, 0.2)",
                    textAlign: "center",
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
                <Flex
                    align={"center"}
                    justify={"center"}
                    sx={{
                        marginTop: "4px",
                    }}
                >
                    <Text
                        ref={countUpRef}
                        sx={{
                            fontSize: "30px",
                            fontFamily: "neon",
                            width: "60px",
                            textAlign: "right",
                            marginRight: "4px",
                        }}
                    ></Text>
                    <Text
                        sx={{
                            fontSize: "24px",
                            fontFamily: "Neon",
                        }}
                    >
                        ETH
                    </Text>
                </Flex>
            </motion.div>
        </Box>
    );
};

const PcPotInfo = ({ potAmount }: { potAmount: string }) => {
    const countUpPcRef = React.useRef(null);
    const { update } = useCountUp({
        ref: countUpPcRef,
        start: 0,
        end: 0,
        duration: 1,
        decimals: 2,
    });
    const { timeLeft } = useStartGame();

    useEffect(() => {
        if (Number(potAmount) > 0) {
            update(Number(potAmount));
        }
    }, [potAmount]);

    return (
        <Box
            sx={{
                fontFamily: "Neoneon",
                position: "absolute",
                top: "146px",
                left: "40px",
                lineHeight: 1,
                width: "360px",
            }}
        >
            <Flex sx={{}} align={"center"}>
                <motion.div
                    style={{
                        width: "100%",
                        textShadow: "0px 0px 19px  #00CCFF",
                        color: "rgba(255, 255, 255, 0.2)",
                        fontSize: "74px",
                        textAlign: "center",
                        fontFamily: "neonsans",
                    }}
                    animate={animationObj}
                    transition={{
                        duration: 1,
                        yoyo: Infinity,
                    }}
                >
                    POOL
                </motion.div>
            </Flex>

            <motion.div
                style={{
                    width: "100%",
                    textShadow: "0px 0px 19px  #00CCFF",
                    color: "rgba(255, 255, 255, 0.2)",
                    textAlign: "center",
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
                        ref={countUpPcRef}
                        sx={{
                            fontSize: "100px",
                            fontFamily: "neon",
                            width: "180px",
                            textAlign: "right",
                            marginRight: "20px",
                        }}
                    ></Text>
                    <Text
                        sx={{
                            fontSize: "70px",
                            fontFamily: "Neon",
                        }}
                    >
                        ETH
                    </Text>
                </Flex>
            </motion.div>
            <motion.div
                style={{
                    height: "2px",
                    background: "#FFE045",
                }}
            ></motion.div>
            <StartCountDown timeLeft={timeLeft}></StartCountDown>

            <Flex
                sx={{
                    width: "156px",
                    height: "34px",
                    background: "#B1B1B1",
                    margin: "12px auto",
                    borderRadius: "16px",
                    padding: "0 6px",
                    cursor: "pointer",
                }}
                align={"center"}
            >
                <Image
                    src={OpenSeaIcon}
                    sx={{
                        width: "32px",
                    }}
                ></Image>
                <Text
                    sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        fontFamily: "Quantico",
                        color: "#000",
                        flex: 1,
                        textAlign: "center",
                    }}
                >
                    OpenSea
                </Text>
                <Box
                    sx={{
                        width: "2px",
                        background: "rgba(96, 96, 96, 0.30)",
                        height: "30px",
                        margin: "0 8px",
                    }}
                ></Box>
                <Image src={RightArrow}></Image>
            </Flex>
            <Flex
                sx={{
                    width: "156px",
                    height: "34px",
                    background: "#B1B1B1",
                    margin: "12px auto",
                    borderRadius: "16px",
                    padding: "0 6px",
                    cursor: "pointer",
                }}
                onClick={() => {
                    window.open("https://twitter.com/skylabHQ", "_blank");
                }}
                align={"center"}
            >
                <Image
                    src={Tw}
                    sx={{
                        width: "32px",
                    }}
                ></Image>
                <Text
                    sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        fontFamily: "Quantico",
                        color: "#000",
                        flex: 1,
                        textAlign: "center",
                    }}
                >
                    Twitter
                </Text>
                <Box
                    sx={{
                        width: "2px",
                        background: "rgba(96, 96, 96, 0.30)",
                        height: "30px",
                        margin: "0 8px",
                    }}
                ></Box>
                <Image src={RightArrow}></Image>
            </Flex>
        </Box>
    );
};

const PotInfo = ({ potAmount }: { potAmount: string }) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return isPc ? (
        <PcPotInfo potAmount={potAmount}></PcPotInfo>
    ) : (
        <MPotInfo potAmount={potAmount}></MPotInfo>
    );
};

export default PotInfo;
