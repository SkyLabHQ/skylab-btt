import {
    Box,
    Flex,
    SimpleGrid,
    Text,
    Image,
    keyframes,
    useMediaQuery,
    useDisclosure,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import useCountDown from "react-countdown-hook";
import HummerIcon from "@/assets/hummer.gif";
import { ReactComponent as ETHIcon } from "@/assets/ETH.svg";
import Bg from "@/assets/bg.png";
import CHummer from "@/assets/c-hummer.png";
import MouseImage from "@/assets/mouse.png";
import MouseAImage from "@/assets/mouse-a.png";
import MouseBImage from "@/assets/mouse-b.png";
import EnterArena from "./EnterArena";
import ToolBar from "@/components/HomeToolbar/ToolBar";
import BuyBt from "./BuyBt";
import PotInfo from "./PotInfo";
import AviationLevel from "./AviationLevel";

const TowerPage = () => {
    const [_, setUpdate] = useState(0);
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const mounseX = useRef(0);
    const mounseY = useRef(0);

    const [backgroundPosition, setBackgroundPosition] = useState("50% 50%");
    // 处理鼠标移动
    const handleMouseMove = (event: any) => {
        const { clientX, clientY } = event;
        mounseX.current = clientX;
        mounseY.current = clientY;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // 计算背景位置的百分比
        const backgroundPositionX =
            50 + ((clientX - screenWidth / 2) / screenWidth) * 20; // 微调这个值来改变移动的幅度
        const backgroundPositionY =
            50 + ((clientY - screenHeight / 2) / screenHeight) * 20; // 微调这个值来改变移动的幅度
        setBackgroundPosition(
            `${backgroundPositionX}% ${backgroundPositionY}%`,
        );
    };

    useEffect(() => {
        if (!isPc) {
            return;
        }

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [isPc]);

    return (
        <motion.div
            style={{
                width: "100%",
                fontFamily: "Quantico",
                position: "relative",
                backgroundImage: `url(${Bg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "auto 100%",
                backgroundColor: "#1b1b1b",
                backgroundPosition: `${backgroundPosition}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                overflow: "hidden",
                padding: "0 32px",
                height: "100%",
            }}
        >
            <AviationLevel></AviationLevel>
            <PotInfo></PotInfo>
            <ToolBar showOpensea={true}></ToolBar>
            <BuyBt></BuyBt>
            <EnterArena></EnterArena>
        </motion.div>
    );
};

export default TowerPage;
