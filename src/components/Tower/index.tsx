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
import Bg from "@/assets/bg.png";
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
        let animationFrameId: any = null;
        const throttledHandleMouseMove = (event: any) => {
            if (animationFrameId !== null) {
                window.cancelAnimationFrame(animationFrameId);
            }

            animationFrameId = window.requestAnimationFrame(() =>
                handleMouseMove(event),
            );
        };
        window.addEventListener("mousemove", throttledHandleMouseMove);
        return () => {
            window.removeEventListener("mousemove", throttledHandleMouseMove);
            if (animationFrameId !== null) {
                window.cancelAnimationFrame(animationFrameId);
            }
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
