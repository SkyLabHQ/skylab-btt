import { Box, Flex, Image, useDisclosure } from "@chakra-ui/react";
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
const Tower = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Flex
            sx={{
                // padding: "0 20px",
                position: "relative",
                height: "100%",
            }}
            flexDir={"column"}
            justify={"center"}
        >
            <PrizeMoney></PrizeMoney>
            <Toolbar></Toolbar>
            <Swiper
                style={{
                    width: "100%",
                    position: "relative",
                    height: "300px",
                }}
                centeredSlides={true}
                slidesPerView={"auto"}
                // autoplay={{
                //     delay: 3000,
                //     disableOnInteraction: false,
                // }}
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
                                                transform:
                                                    "translate(-50%, -50%)",
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
                        );
                    },
                )}
            </Swiper>
            <BtButton onAvaitionClick={onOpen}></BtButton>
            <ChooseTeamModal
                isOpen={isOpen}
                onClose={onClose}
            ></ChooseTeamModal>
        </Flex>
    );
};

export default Tower;
