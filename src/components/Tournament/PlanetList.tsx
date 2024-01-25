import React, { useEffect } from "react";
import { Box, Image, Flex } from "@chakra-ui/react";
import SectionActivities from "@/components/Tournament/assets/ring.svg";
import BluePlanet from "@/components/Tournament/assets/blue-planet.png";
import GrayPlanet from "@/components/Tournament/assets/gray-planet.png";
import BttTitle from "@/components/Tournament/assets/btt-title.png";
import EnterBt from "@/components/Tournament/assets/enter-bt.png";
import { useNavigate } from "react-router-dom";
import GrayPlanetBg from "./assets/gray-planet-bg.svg";
import { motion, useAnimation } from "framer-motion";

const PlanetList = ({
    active,
    showAllActivities,
    onChangeActive,
    onChangeAllActivities,
}: {
    active: number;
    showAllActivities: boolean;
    onChangeActive: (index: number) => void;
    onChangeAllActivities: (showAllActivities: boolean) => void;
}) => {
    const imgAnimation = useAnimation();

    const navigate = useNavigate();

    const handleToBtt = async () => {
        navigate(`/`);
    };

    const planetList = [
        {
            img: BluePlanet,
            left: ["50vw", "-10.4167vw"],
            top: ["0", "50vh"],
            width: ["30vw", "20vw"],
            maxWidth: "31.25vw",
            transform: ["translate(-50%,-50%)", "translateY(-50%)"],
            showAll: {
                left: "20vw",
                top: "50%",
                width: "10.4167vw",
                transform: "",
            },
            text: "Trailbalzer",
            play: () => {},
            path: "/spendresource",
        },
        {
            img: GrayPlanet,
            left: ["90vw", "50vw"],
            top: ["15vh", "50vh"],
            width: ["20vw", "32vw"],
            maxWidth: "52vh",
            transform: ["", "translate(-50%,-50%)"],
            showAll: {
                left: "55vw",
                top: "3vh",
                width: "10.4167vw",
                transform: "",
            },
            text: "Bid Tac Toe",
            play: handleToBtt,
            path: "/btt",
        },
    ];

    useEffect(() => {
        imgAnimation.start("rotation");
    }, []);

    return (
        <>
            <Box
                sx={{
                    left: 0,
                    top: 0,
                    width: "100vw",
                    height: "70vh",
                    position: "relative",
                    background: `url(${SectionActivities})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: showAllActivities ? "100%" : "300vw",
                    backgroundPosition: showAllActivities
                        ? "0 bottom"
                        : "-80vw bottom",
                    transition: "all 0.2s",
                }}
            >
                {planetList.map((item, index) => {
                    const isCurrent = index === active;
                    return (
                        <Box
                            key={index}
                            sx={{
                                position: "absolute",
                                left: showAllActivities
                                    ? item.showAll.left
                                    : item.left[active],

                                top: showAllActivities
                                    ? item.showAll?.top
                                    : item?.top?.[active],
                                width: showAllActivities
                                    ? item.showAll.width
                                    : item.width[active],
                                height: showAllActivities
                                    ? item.showAll.width
                                    : item.width[active],
                                transform: showAllActivities
                                    ? item.showAll.transform
                                    : item.transform[active],
                                transition: "all 0.2s",
                                maxWidth: item.maxWidth,
                            }}
                        >
                            <Box
                                sx={{
                                    transition: "all 0.2s",
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {isCurrent && (
                                    <motion.div
                                        style={{
                                            position: "absolute",
                                            left: "-5%",
                                            top: "-5%",
                                            width: "110%",
                                            height: "110%",
                                            backgroundImage: `url(${GrayPlanetBg})`,
                                            backgroundSize: "100% 100%",
                                        }}
                                        animate={{
                                            rotate: "360deg",
                                        }}
                                        transition={{
                                            duration: 50,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                    ></motion.div>
                                )}

                                <Box
                                    sx={{
                                        zIndex: 10,
                                        position: "absolute",
                                        left: "50%",
                                        top: "50%",
                                        transform: "translate(-50%, -50%)",
                                        width: "90%",
                                    }}
                                >
                                    {isCurrent ? (
                                        <motion.img
                                            src={item.img}
                                            style={{
                                                width: "100%",
                                                background: "transparent",
                                                scale: 1,
                                            }}
                                            variants={{
                                                rotation: {
                                                    rotate: "360deg",
                                                    scale: 1.1,
                                                    transition: {
                                                        scale: {
                                                            duration: 1,
                                                            ease: "linear",
                                                            repeatType:
                                                                "reverse",
                                                            repeat: Infinity,
                                                        },
                                                        rotate: {
                                                            duration: 50,
                                                            repeat: Infinity,
                                                            ease: "linear",
                                                            repeatType: "loop",
                                                        },
                                                    },
                                                },
                                                oneScale: {
                                                    scale: 1,
                                                    transition: {
                                                        scale: {
                                                            duration: 1,
                                                            ease: "linear",
                                                        },
                                                    },
                                                },
                                                twoScale: {
                                                    scale: 1.1,
                                                    transition: {
                                                        scale: {
                                                            duration: 0.1,
                                                            ease: "linear",
                                                        },
                                                    },
                                                },
                                            }}
                                            animate={imgAnimation}
                                            onMouseEnter={async () => {
                                                await imgAnimation.stop();
                                                await imgAnimation.start(
                                                    "twoScale",
                                                );
                                            }}
                                            onMouseLeave={async () => {
                                                await imgAnimation.start(
                                                    "oneScale",
                                                );
                                                await imgAnimation.start(
                                                    "rotation",
                                                );
                                            }}
                                        ></motion.img>
                                    ) : (
                                        <Image
                                            style={{
                                                width: "100%",
                                                opacity: "0.8",
                                            }}
                                            src={item.img}
                                        ></Image>
                                    )}
                                    {isCurrent && (
                                        <Box
                                            sx={{
                                                width: "140%",
                                                position: "absolute",
                                                left: "50%",
                                                top: "50%",
                                                transform:
                                                    "translate(-49%, -50%)",
                                            }}
                                        >
                                            <Image src={BttTitle}></Image>
                                        </Box>
                                    )}
                                    {isCurrent && !showAllActivities && (
                                        <motion.div
                                            style={{
                                                position: "absolute",
                                                left: "50%",
                                                top: "50%",
                                                transform:
                                                    "translate(-50%, -50%)",
                                                transition: "all 0.2s",
                                                width: "100%",
                                            }}
                                            onMouseEnter={async () => {
                                                await imgAnimation.stop();
                                                await imgAnimation.start(
                                                    "twoScale",
                                                );
                                            }}
                                            onMouseLeave={async () => {
                                                await imgAnimation.start(
                                                    "oneScale",
                                                );
                                                await imgAnimation.start(
                                                    "rotation",
                                                );
                                            }}
                                        >
                                            <Flex
                                                className="bid-tac-toe"
                                                sx={{
                                                    position: "relative",
                                                    justifyContent: "center",
                                                }}
                                                onClick={() => {
                                                    item?.play();
                                                }}
                                            >
                                                <Image
                                                    src={EnterBt}
                                                    sx={{
                                                        width: "20vw",
                                                        marginTop: "5.5vw",
                                                        cursor: "pointer",
                                                    }}
                                                ></Image>
                                            </Flex>
                                        </motion.div>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </>
    );
};

export default PlanetList;
