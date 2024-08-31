import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CloseIcon from "./assets/close.svg";
import CircleGif from "@/components/Introduce/assets/circle.gif";
import RBg from "./assets/r-bg.png";
import { ReactComponent as An1Icon } from "./assets/an-1.svg";
import { ReactComponent as An2Icon } from "./assets/an-2.svg";
import { ReactComponent as An3Icon } from "./assets/an-3.svg";
import { ReactComponent as An4Icon } from "./assets/an-4.svg";
import { ReactComponent as An5Icon } from "./assets/an-5.svg";

import { ReactComponent as n1Icon } from "./assets/n-1.svg";
import { ReactComponent as n2Icon } from "./assets/n-2.svg";
import { ReactComponent as n3Icon } from "./assets/n-3.svg";
import { ReactComponent as n4Icon } from "./assets/n-4.svg";
import { ReactComponent as n5Icon } from "./assets/n-5.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import RedIcon from "./assets/red.png";

const navList = [
    {
        icon: n1Icon,
        activeIcon: An1Icon,
    },
    {
        icon: n2Icon,
        activeIcon: An2Icon,
    },
    {
        icon: n3Icon,
        activeIcon: An3Icon,
    },
    {
        icon: n4Icon,
        activeIcon: An4Icon,
    },
    {
        icon: n5Icon,
        activeIcon: An5Icon,
    },
];

const Content0 = () => {
    const [activeIndex, setActiveIndex] = useState(1);
    console.log(activeIndex, "activeIndex");
    return (
        <Box>
            <Box
                sx={{
                    height: "515px",
                    background: `url(${RBg}) no-repeat center center`,
                }}
            >
                <Text
                    sx={{
                        fontSize: "40px",
                        fontStyle: "normal",
                        fontWeight: 700,
                        textAlign: "center",
                    }}
                >
                    Welcome, Pilots
                </Text>
                <Box
                    sx={{
                        width: "900px",
                        margin: "0 auto",
                    }}
                >
                    <Swiper
                        initialSlide={activeIndex}
                        style={{
                            position: "relative",
                            marginTop: "16px",
                        }}
                        onSlideChange={(swiper) => {
                            setActiveIndex(swiper.activeIndex);
                        }}
                        // spaceBetween={50}
                        centeredSlides={true}
                        slidesPerView={5}
                        modules={[Autoplay]}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                    >
                        {[1, 2, 3, 4, 5, 6, 6, 2, 13, 14].map((item, index) => {
                            return (
                                <SwiperSlide
                                    key={index}
                                    style={{
                                        // color: "#fff",
                                        textAlign: "center",
                                    }}
                                >
                                    <Flex flexDir={"column"} align={"center"}>
                                        <Image
                                            src={RedIcon}
                                            sx={{
                                                width:
                                                    activeIndex === index
                                                        ? "180px"
                                                        : Math.abs(
                                                              activeIndex -
                                                                  index,
                                                          ) === 1
                                                        ? "150px"
                                                        : "110px",
                                            }}
                                        ></Image>
                                    </Flex>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </Box>
            </Box>
        </Box>
    );
};

const Content1 = () => {
    return <Box></Box>;
};

const Rule = ({ onModeChange }: { onModeChange: (mode: string) => void }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {
        const keyboardListener = (event: KeyboardEvent) => {
            const key = event.key;
            console.log(key);
            if (key === "Escape") {
                onModeChange("");
            }
        };
        document.addEventListener("keydown", keyboardListener);
        return () => {
            document.removeEventListener("keydown", keyboardListener);
        };
    }, []);
    return (
        <Box
            sx={{
                maxWidth: "1574px",
                width: "100%",
                margin: "0 auto",
            }}
        >
            <Box
                sx={{
                    position: "relative",
                }}
            >
                <Flex
                    onClick={() => {
                        onModeChange("default");
                    }}
                    sx={{
                        position: "absolute",
                        right: "0",
                        top: "20px",
                        cursor: "pointer",
                    }}
                    align={"center"}
                    flexDir={"column"}
                >
                    <Image
                        src={CloseIcon}
                        sx={{
                            width: "36px",
                            height: "36px",
                        }}
                    ></Image>
                    <Text
                        sx={{
                            color: "#FFF",
                            textAlign: "center",
                            fontFamily: "Orbitron",
                            fontSize: "30px",
                            fontStyle: "normal",
                            fontWeight: 400,
                        }}
                    >
                        Esc
                    </Text>
                </Flex>
                <Text
                    sx={{
                        color: "#F2D861",
                        textAlign: "center",
                        textShadow: "#FFD000",
                        fontFamily: "Orbitron",
                        fontSize: "64px",
                        fontStyle: "normal",
                        fontWeight: 700,
                    }}
                >
                    Rules
                </Text>
                <Flex
                    justify={"center"}
                    align={"flex-end"}
                    sx={{
                        gap: "50px",
                    }}
                >
                    {navList.map((item, index) => {
                        const ActiveIcon = item.activeIcon;
                        const Icon = item.icon;
                        return (
                            <Box
                                key={index}
                                onClick={() => {
                                    setActiveIndex(index);
                                }}
                                sx={{
                                    "&:hover": {
                                        svg: {
                                            color: "#fff",
                                            transition: "all 0.3s",
                                        },
                                    },
                                }}
                            >
                                {activeIndex === index ? (
                                    <ActiveIcon></ActiveIcon>
                                ) : (
                                    <Icon></Icon>
                                )}
                            </Box>
                        );
                    })}
                </Flex>
                <Box
                    sx={{
                        marginTop: "30px",
                    }}
                >
                    {activeIndex === 0 && <Content0></Content0>}
                </Box>
            </Box>
        </Box>
    );
};

export default Rule;
