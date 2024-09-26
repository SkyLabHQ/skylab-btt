import { Box, Flex, Image, useDisclosure, Text } from "@chakra-ui/react";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import RArrowIcon from "./assets/r-arrow.svg";
import WB from "./assets/w-b.png";
import Paper from "./assets/paper.png";
import PrizeMoney from "./PrizeMoney";
import BtButton from "./BtButton";
import { Toolbar } from "./Toolbar";
import ChooseTeamModal from "./ChooseTeamModal";
import { aviationImg } from "@/utils/aviationImg";
import { ReactComponent as LevelBorder } from "./assets/level-border.svg";
import CountDownIcon from "./assets/countdown.svg";
const AllAviation = () => {
    return (
        <Swiper
            style={{
                width: "100%",
                position: "relative",
                height: "380px",
            }}
            centeredSlides={true}
            slidesPerView={"auto"}
        >
            <SwiperSlide
                style={{
                    color: "#fff",
                    textAlign: "center",
                    width: "400px",
                }}
            >
                <Flex
                    sx={{
                        height: "100%",
                    }}
                    align={"center"}
                >
                    <Flex
                        sx={{
                            width: "182px",
                            height: "182px",
                            borderRadius: "50%",
                            marginRight: "40px",
                            position: "relative",
                        }}
                        align={"center"}
                        justify={"center"}
                    >
                        <Image
                            src={WB}
                            sx={{
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                                width: "100%",
                                height: "100%",
                            }}
                        ></Image>
                        <Image
                            src={Paper}
                            sx={{
                                width: "60p%",
                                height: "60%",
                            }}
                        ></Image>
                    </Flex>
                    <Image src={RArrowIcon}></Image>
                </Flex>
            </SwiperSlide>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14, 15, 16].map(
                (item, index) => {
                    return (
                        <SwiperSlide
                            key={index}
                            style={{
                                color: "#fff",
                                textAlign: "center",
                                width: "400px",
                            }}
                        >
                            <Flex
                                sx={{
                                    height: "100%",
                                }}
                                align={"center"}
                            >
                                <Flex
                                    sx={{
                                        width: "182px",
                                        height: "182px",
                                        borderRadius: "50%",
                                        marginRight: "40px",
                                        position: "relative",
                                    }}
                                    align={"center"}
                                    justify={"center"}
                                >
                                    <Image
                                        src={WB}
                                        sx={{
                                            position: "absolute",
                                            left: "50%",
                                            top: "50%",
                                            transform: "translate(-50%, -50%)",
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    ></Image>
                                    <Image
                                        src={aviationImg(index + 1)}
                                        sx={{
                                            width: "60p%",
                                            height: "60%",
                                        }}
                                    ></Image>

                                    <LevelBorder
                                        style={{
                                            color: "red",
                                            position: "absolute",
                                            left: "80%",
                                            top: "-20px",
                                            width: "80px",
                                        }}
                                    ></LevelBorder>
                                    <Text
                                        sx={{
                                            position: "absolute",
                                            left: "85%",
                                            top: "-34px",
                                            width: "80px",
                                            textAlign: "center",
                                        }}
                                    >
                                        Lvl.{" "}
                                        <span
                                            style={{
                                                fontSize: "40px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {index + 1}
                                        </span>
                                    </Text>
                                    <Image
                                        sx={{
                                            position: "absolute",
                                            left: "70%",
                                            bottom: "-80px",
                                            width: "180px",
                                        }}
                                        src={CountDownIcon}
                                    ></Image>
                                    <Text
                                        sx={{
                                            position: "absolute",
                                            right: "-130px",
                                            bottom: "-80px",
                                            width: "120px",
                                            textAlign: "center",
                                            fontSize: "34px",
                                        }}
                                    >
                                        00:00
                                    </Text>
                                </Flex>
                                <Image src={RArrowIcon}></Image>
                            </Flex>
                        </SwiperSlide>
                    );
                },
            )}
        </Swiper>
    );
};

export default AllAviation;
