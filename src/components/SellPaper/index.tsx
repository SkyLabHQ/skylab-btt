import {
    Box,
    Flex,
    Text,
    Image,
    keyframes,
    useMediaQuery,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Bg from "@/assets/bg.png";
import BHummer from "@/assets/b-hummer.png";
import OIcon from "@/assets/o.png";
import XIcon from "@/assets/x.png";
import BgLight from "@/assets/bg-light.png";
import CHummer from "@/assets/c-hummer.png";
import MouseImage from "@/assets/mouse.png";
import MouseAImage from "@/assets/mouse-a.png";
import MouseBImage from "@/assets/mouse-b.png";
import Bgmp3 from "@/components/Presale/assets/bg.mp3";

import Turn1mp3 from "@/components/Presale/assets/turn1.mp3";
import Turn2mp3 from "@/components/Presale/assets/turn2.mp3";
import Numbermp3 from "@/components/Presale/assets/number.mp3";
import EnterArena from "./EnterArena";
import ToolBar from "@/components/HomeToolbar/ToolBar";
import BuyPaper from "./BuyPaper";
import { useCountUp } from "react-countup";
import {
    useMultiMercuryJarTournamentContract,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { useChainId } from "wagmi";
import { formatAmount } from "@/utils/formatBalance";
import StartCountDown from "../StartCountDown";
import useStartGame from "@/hooks/useStartGame";

const LightBorder = ({ width }: { width: string }) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <motion.div
            style={{
                width: width,
                height: isPc ? "6px" : "1px",
                background: "#FFE045",
                boxShadow: "0px 0px 29px 4px #FAE20F",
                margin: "0 auto ",
            }}
        ></motion.div>
    );
};

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

const rotation = keyframes`
  0% {
    transform: rotateZ(0deg);
  }

  100% {
    transform: rotateZ(360deg);
  }
`;

const FirstContent = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Box
            className="front-content"
            sx={{
                position: "absolute",
                width: "99%",
                height: "99%",
                background:
                    "linear-gradient(126.1deg, #000000 0%, #000000 46.99%, #000000 100%)",
                borderRadius: "50%",
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                padding: "10px 100px",
            }}
        >
            <Flex
                sx={{
                    width: "100%",
                    height: "100%",
                }}
                flexDir={"column"}
                justify={"flex-end"}
                align={"center"}
            >
                <Image
                    src={CHummer}
                    sx={{
                        maxWidth: isPc ? "100%" : "350%",
                        marginBottom: isPc ? "-100px" : "-60px",
                    }}
                ></Image>
            </Flex>
        </Box>
    );
};

const BackContent = ({
    rotateY,
    potAmount,
}: {
    rotateY?: number;
    potAmount: string;
}) => {
    const { timeLeft: timeLeft1 } = useStartGame();

    const [isPc] = useMediaQuery("(min-width: 800px)");

    const countUpRef = React.useRef(null);
    const { update } = useCountUp({
        ref: countUpRef,
        start: 0,
        end: 0,
        duration: 1,
        decimals: 2,
    });

    const [init, setInit] = useState(false);

    const handleInit = () => {
        setTimeout(() => {
            const audio1 = new Audio(Numbermp3);
            audio1.play();
            setInit(true);
        }, 1000);
    };

    useEffect(() => {
        if (init) {
            return;
        }
        if (rotateY === 0) {
            handleInit();
        }
    }, [rotateY, init]);

    useEffect(() => {
        if (Number(potAmount) > 0) {
            update(Number(potAmount));
        }
    }, [potAmount]);
    return (
        <Box
            sx={{
                position: "absolute",
                width: "99%",
                height: "99%",
                background:
                    "linear-gradient(126.1deg, #000000 0%, #000000 46.99%, #000000 100%)",
                borderRadius: "50%",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                padding: isPc ? "0 60px" : "0 26px",
            }}
        >
            <Flex
                align={"center"}
                flexDirection={"column"}
                sx={{
                    width: "100%",
                    height: "100%",
                    fontFamily: "Neoneon",
                    position: "relative",
                    paddingTop: isPc ? "50px" : "10px",
                }}
            >
                <Box>
                    <Flex
                        sx={{
                            margin: isPc ? "-20px 0 0px" : "0px",
                        }}
                        align={"center"}
                    >
                        <motion.div
                            style={{
                                width: "100%",
                                textShadow: "0px 0px 19px  #00CCFF",
                                color: "rgba(255, 255, 255, 0.2)",
                                fontSize: isPc ? "100px" : "38px",
                                textAlign: "center",
                                fontFamily: "neonsans",
                            }}
                            animate={animationObj}
                            transition={{
                                duration: 1,
                                yoyo: Infinity,
                            }}
                        >
                            POOL
                        </motion.div>
                    </Flex>

                    <motion.div
                        style={{
                            width: "100%",
                            textShadow: "0px 0px 19px  #00CCFF",
                            color: "rgba(255, 255, 255, 0.2)",
                            textAlign: "center",
                            marginTop: isPc ? "0px" : "0px",
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
                                ref={countUpRef}
                                sx={{
                                    fontSize: isPc ? "120px" : "50px",
                                    lineHeight: 1,
                                    fontFamily: "neon",
                                    width: isPc ? "200px" : "100px",
                                    textAlign: "right",
                                    marginRight: "20px",
                                }}
                            ></Text>
                            <Text
                                sx={{
                                    fontSize: isPc ? "60px" : "30px",
                                    fontFamily: "Neon",
                                }}
                            >
                                ETH
                            </Text>
                        </Flex>
                    </motion.div>
                </Box>
                <LightBorder width="100%"></LightBorder>
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                    }}
                >
                    <StartCountDown
                        timeLeft={timeLeft1}
                        fontSize={isPc ? "70px" : "42px"}
                    ></StartCountDown>
                </Box>
            </Flex>
        </Box>
    );
};

const YellowBg = ({ onClick }: { onClick: () => void }) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const clickAnimate = useAnimation();
    const handleClick = async () => {
        onClick();

        const height = window.innerHeight;
        await clickAnimate.set({
            borderRadius: "50%",
            transition: { duration: 0.2 },
        });

        await clickAnimate.start({
            width: Math.floor(0.9 * height),
            height: Math.floor(0.9 * height),
            transition: { duration: 0.2 },
        });

        await clickAnimate.start({
            scale: 0,
            transition: { duration: 0.6 },
        });
    };

    return (
        <motion.div
            style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                background: "#fddc2d",
                zIndex: 1000,
            }}
            onClick={handleClick}
            animate={clickAnimate}
        >
            <Box
                sx={{
                    position: "absolute",
                    bottom: "0px",
                    left: "50%",
                    transform: "translateX(-50%)",
                }}
            >
                <Flex
                    sx={{
                        justifyContent: "space-around",
                    }}
                >
                    <motion.img
                        src={XIcon}
                        style={{
                            width: isPc ? "180px" : "90px",
                            height: isPc ? "180px" : "90px",
                        }}
                        animate={{
                            transform: [
                                "translateY(-20px)",
                                "translateY(20px)",
                            ],
                        }}
                        transition={{
                            duration: 1,
                            yoyo: Infinity,
                        }}
                    ></motion.img>
                    <motion.img
                        src={OIcon}
                        style={{
                            width: isPc ? "180px" : "90px",
                            height: isPc ? "180px" : "90px",
                        }}
                        animate={{
                            transform: [
                                "translateY(-20px)",
                                "translateY(20px)",
                            ],
                        }}
                        transition={{
                            duration: 1,
                            yoyo: Infinity,
                            delay: 1,
                        }}
                    ></motion.img>
                </Flex>

                <Image
                    src={BHummer}
                    sx={{
                        width: isPc ? "530px" : "280px",
                        maxWidth: "none",
                        marginTop: "10px",
                    }}
                ></Image>
            </Box>
        </motion.div>
    );
};

const bgAudio = new Audio(Bgmp3);

const SellPaper = () => {
    const [rotateY, setRotateY] = useState(0);
    const [_, setUpdate] = useState(0);
    const bgmp3 = useRef(bgAudio);
    const [showYellowBg, setShowYellowBg] = useState(true);
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [hoverInit, setHoverInit] = useState(false);
    const mounseX = useRef(0);
    const mounseY = useRef(0);
    const mouseImg = useRef(MouseBImage);
    const chainId = useChainId();
    const [potAmount, setPotAmount] = useState("0");
    const multiMercuryJarTournamentContract =
        useMultiMercuryJarTournamentContract();
    const multiProvider = useMultiProvider(chainId);
    const [backgroundPosition, setBackgroundPosition] = useState("50% 50%");

    const handleLevelInfo = async () => {
        const [potAmount] = await multiProvider.all([
            multiMercuryJarTournamentContract.pot(),
        ]);

        setPotAmount(formatAmount(potAmount.toString()));
    };

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

    // 处理鼠标移动
    const handleMouseDown = () => {
        mouseImg.current = MouseAImage;
        setUpdate((prev) => prev + 1);
    };

    // 处理鼠标移动
    const handleMouseUp = () => {
        mouseImg.current = MouseImage;
        setUpdate((prev) => prev + 1);
    };

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
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mousemove", throttledHandleMouseMove);
        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mousemove", throttledHandleMouseMove);
            if (animationFrameId !== null) {
                window.cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);

    useEffect(() => {
        if (!multiProvider || !multiMercuryJarTournamentContract) return;
        handleLevelInfo();
    }, [multiProvider, multiMercuryJarTournamentContract]);

    useEffect(() => {
        return () => {
            bgmp3.current.pause();
        };
    }, []);

    return (
        <motion.div
            style={{
                width: "100%",
                minHeight: "100%",
                fontFamily: "Neoneon",
                position: "relative",
                backgroundImage: `url(${Bg}),url(${BgLight})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "auto 100%",
                backgroundColor: "#1b1b1b",
                backgroundPosition: `${backgroundPosition}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                overflow: "hidden",
                cursor: `none`,
                padding: "0 32px",
            }}
        >
            {isPc && (
                <Image
                    src={mouseImg.current}
                    sx={{
                        position: "absolute",
                        left: "-30px",
                        top: "-30px",
                        width: "60px",
                        height: "60px",
                        transform: `translate3d(${mounseX.current}px, ${mounseY.current}px, 0)`,
                        pointerEvents: "none",
                        zIndex: 999999,
                    }}
                ></Image>
            )}
            <YellowBg
                onClick={() => {
                    bgmp3.current.loop = true;
                    bgmp3.current.play();
                    setShowYellowBg(false);
                }}
            ></YellowBg>
            <ToolBar></ToolBar>
            <Box
                className="card"
                sx={{
                    width: isPc ? "520px" : "250px",
                    height: "auto",
                    borderRadius: "50%",
                    aspectRatio: "1/1",
                }}
                onMouseEnter={() => {
                    if (hoverInit) {
                        if (rotateY === 180) {
                            return;
                        }
                        const audio1 = new Audio(Turn1mp3);
                        audio1.play();
                        setRotateY(180);
                        return;
                    }
                    const audio1 = new Audio(Turn1mp3);
                    audio1.play();
                    setRotateY(180);

                    setTimeout(() => {
                        setHoverInit(true);
                    }, 0);
                }}
                onMouseLeave={() => {
                    if (hoverInit) {
                        if (rotateY === 0) {
                            return;
                        }
                        const audio2 = new Audio(Turn2mp3);
                        audio2.play();
                        setRotateY(0);
                        return;
                    }
                }}
            >
                <Box
                    className="content"
                    sx={{
                        width: "100%",
                        height: "100%",
                        transformStyle: "preserve-3d",
                        transition: "transform 600ms",
                        boxShadow: "0px 0px 10px 1px #000000ee",
                        borderRadius: "50%",
                        transform: ` rotateY(${rotateY}deg)`,
                    }}
                    onClick={() => {
                        if (rotateY === 0) {
                            const audio1 = new Audio(Turn1mp3);
                            audio1.play();
                            setRotateY(180);
                        } else {
                            const audio2 = new Audio(Turn2mp3);
                            audio2.play();
                            setRotateY(0);
                        }
                    }}
                >
                    <Box
                        className="back"
                        sx={{
                            transform: "rotateY(180deg)",
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            webkitBackfaceVisibility: "hidden !important",
                            WebkitPerspective: 0,
                            overflow: "hidden",
                            borderRadius: "50%",
                            "&::before": {
                                position: "absolute",
                                content: "''",
                                display: "block",
                                width: "100%",
                                height: "100%",
                                background:
                                    "linear-gradient(90deg, rgba(255,85,85,0) 10%, #FF5555 50%, rgba(255,85,85,0) 91%)",
                                animation: `${rotation} 5000ms infinite linear`,
                                borderRadius: "50%",
                            },
                        }}
                    >
                        <FirstContent></FirstContent>
                    </Box>
                    <Box
                        className="front"
                        sx={{
                            color: "#fff",
                            backgroundColor: "#151515",
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            webkitBackfaceVisibility: "hidden !important",
                            WebkitPerspective: 0,
                            borderRadius: "50%",
                            overflow: "hidden",
                            "&::before": {
                                position: "absolute",
                                content: "''",
                                display: "block",
                                width: "100%",
                                height: "100%",
                                background:
                                    "linear-gradient(90deg, transparent, #ff9966, #ff9966, #ff9966, #ff9966, transparent)",
                                animation: `${rotation} 5000ms infinite linear`,
                                borderRadius: "50%",
                            },
                        }}
                    >
                        {!showYellowBg && (
                            <BackContent
                                rotateY={rotateY}
                                potAmount={potAmount}
                            ></BackContent>
                        )}
                    </Box>
                </Box>
            </Box>

            <BuyPaper></BuyPaper>
            <EnterArena></EnterArena>
        </motion.div>
    );
};

export default SellPaper;
