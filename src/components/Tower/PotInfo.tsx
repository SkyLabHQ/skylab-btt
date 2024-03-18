import { Box, Flex, Image, Text, useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import HummerIcon from "./assets/m-hummer.png";
import { ReactComponent as ETHIcon } from "@/assets/ETH.svg";

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

const MPotInfo = () => {
    return (
        <Box
            sx={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
            }}
        >
            <motion.div
                style={{
                    width: "100%",
                    textShadow: "0px 0px 19px  #00CCFF",
                    color: "rgba(255, 255, 255, 0.2)",
                    fontSize: "24px",
                    textAlign: "center",
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
                <Flex align={"center"} justify={"center"}>
                    <Text
                        sx={{
                            fontSize: "40px",
                            fontFamily: "neon",
                        }}
                    >
                        9.09
                    </Text>
                    <ETHIcon
                        fill="currentColor"
                        style={{
                            width: "36px",
                            height: "36px",
                        }}
                    ></ETHIcon>
                </Flex>
            </motion.div>
        </Box>
    );
};

const PotInfo = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return isPc ? (
        <Box
            sx={{
                fontFamily: "Neoneon",
                position: "absolute",
                top: "146px",
                left: "100px",
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
                    }}
                    animate={animationObj}
                    transition={{
                        duration: 1,
                        yoyo: Infinity,
                    }}
                >
                    POOL
                </motion.div>
                <Image
                    src={HummerIcon}
                    sx={{
                        width: "80px",
                    }}
                ></Image>
            </Flex>
            <motion.div
                style={{
                    height: "4px",
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
                            fontSize: "100px",
                            lineHeight: 1,
                            fontFamily: "neon",
                        }}
                    >
                        9.09
                    </Text>
                    <ETHIcon
                        fill="currentColor"
                        style={{
                            width: "70px",
                            height: "70px",
                        }}
                    ></ETHIcon>
                </Flex>
            </motion.div>
        </Box>
    ) : (
        <MPotInfo></MPotInfo>
    );
};

export default PotInfo;
