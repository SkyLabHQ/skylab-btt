import { useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Bg from "@/assets/bg.png";
import EnterArena from "./EnterArena";
import ToolBar from "@/components/HomeToolbar/ToolBar";
import BuyBt from "./BuyBt";
import PotInfo from "./PotInfo";
import AviationLevel from "./AviationLevel";
import { useChainId } from "wagmi";
import {
    useMultiMercuryJarTournamentContract,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { ActivePilotRes, handlePilotsInfo1 } from "@/skyConstants/pilots";
import { formatAmount } from "@/utils/formatBalance";

const levelInfoInit: any = Array.from({ length: 16 }, (_, index) => ({
    level: index + 1,
    levelTokenIds: [],
    tokenId: "0",
    claimTime: 0,
    owner: "",
    userName: "",
    pilotImg: "",
}));
const TowerPage = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");

    const [potAmount, setPotAmount] = useState("0");
    const chainId = useChainId();
    const multiMercuryJarTournamentContract =
        useMultiMercuryJarTournamentContract();
    const multiProvider = useMultiProvider(chainId);
    const [levelInfo, setLevelInfo] = useState(levelInfoInit);
    const [totalPaper, setTotalPaper] = useState("0");

    const [_, setUpdate] = useState(0);
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

    const handleLevelInfo = async () => {
        const p = [];

        for (let i = 1; i <= 16; i++) {
            p.push(multiMercuryJarTournamentContract.getTokenIdPerLevel(i));
            p.push(multiMercuryJarTournamentContract.getNewCommerInfo(i));
        }
        p.push(multiMercuryJarTournamentContract.paperTotalAmount());
        p.push(multiMercuryJarTournamentContract.pot());

        const res = await multiProvider.all(p);
        const potAmount = res.pop();
        const paperTotalAmount = res.pop();

        setPotAmount(formatAmount(potAmount.toString()));
        setTotalPaper(paperTotalAmount.toString());
        const levelTokenInfo = [];
        const allPilot: ActivePilotRes[] = [];
        for (let i = 0; i < 16; i++) {
            const newComerInfo = res[i * 2 + 1];
            allPilot.push({
                collectionAddress: newComerInfo.pilot.collectionAddress,
                pilotId: newComerInfo.pilot.pilotId.toString(),
            });
            levelTokenInfo.push({
                levelTokenIds: res[i * 2], // 该等级的名称列表
                tokenId: newComerInfo.newComerId.toString(), // newComerInfo.tokenId.toString(),
                claimTime: newComerInfo.claimTime.toNumber(),
                owner: newComerInfo.owner,
                point: newComerInfo.point.toString(),
                userName: newComerInfo.userName,
            });
        }

        const pilotList = await handlePilotsInfo1({
            chainId: chainId,
            allPilot,
        });

        let jIndex = -1;
        const list = levelTokenInfo.map((item, index) => {
            if (item.tokenId === "0") {
                return {
                    ...item,
                    level: index + 1,
                    owner: "",
                    userName: "",
                    pilotImg: "",
                };
            }
            jIndex++;
            return {
                ...item,
                level: index + 1,
                pilotImg:
                    item.tokenId === "0" ? "" : pilotList[jIndex].pilotImg,
            };
        });
        setLevelInfo(list.reverse());
    };

    useEffect(() => {
        if (!multiProvider || !multiMercuryJarTournamentContract) return;
        handleLevelInfo();
    }, [multiProvider, multiMercuryJarTournamentContract]);

    useEffect(() => {
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
    }, []);

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
            <AviationLevel
                levelInfo={levelInfo}
                totalPaper={totalPaper}
            ></AviationLevel>
            <PotInfo potAmount={potAmount}></PotInfo>
            <ToolBar showOpensea={true} showTw={true}></ToolBar>
            <BuyBt></BuyBt>
            <EnterArena></EnterArena>
        </motion.div>
    );
};

export default TowerPage;
