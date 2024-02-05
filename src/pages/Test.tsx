import { Box, Flex, SimpleGrid, Text, Image } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import BlueX from "../assets/blue-x.svg";
import YellowO from "../assets/yellow-o.svg";
import LogoIcon from "../assets/logo.svg";

const Test = () => {
    const logoAnimate = useAnimation();
    const beginAnimate = useAnimation();
    const potAnimate = useAnimation();
    const dateAnimate = useAnimation();
    const timeAnimate = useAnimation();

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
                sx={{ position: "absolute", top: "0%", right: "100px" }}
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
                    }}
                    animate={timeAnimate}
                >
                    <SimpleGrid columns={4} spacingX={"80px"}>
                        <Box>
                            <Text>02</Text>
                            <Text
                                sx={{
                                    fontSize: "60px",
                                }}
                            >
                                DAYS
                            </Text>
                        </Box>
                        <Box>
                            <Text>02</Text>
                            <Text
                                sx={{
                                    fontSize: "60px",
                                }}
                            >
                                HOURS
                            </Text>
                        </Box>
                        <Box>
                            <Text>02</Text>
                            <Text
                                sx={{
                                    fontSize: "60px",
                                }}
                            >
                                MINS
                            </Text>
                        </Box>
                        <Box>
                            <Text>02</Text>
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
