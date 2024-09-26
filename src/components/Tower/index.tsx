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
import AllAviation from "./AllAviation";
const Tower = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Flex
            sx={{
                // padding: "0 20px",
                position: "relative",
                height: "100%",
                padding: "0 20px",
            }}
            flexDir={"column"}
            justify={"center"}
        >
            <PrizeMoney></PrizeMoney>
            <Toolbar></Toolbar>
            <AllAviation></AllAviation>
            <BtButton onAvaitionClick={onOpen}></BtButton>
            <ChooseTeamModal
                isOpen={isOpen}
                onClose={onClose}
            ></ChooseTeamModal>
        </Flex>
    );
};

export default Tower;
