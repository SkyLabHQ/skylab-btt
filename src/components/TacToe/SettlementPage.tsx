import { Box, Image, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect, useMemo } from "react";
import Bg from "./assets/settlement-bg.png";
import GardenIcon from "./assets/garden-icon.png";
import BackIcon from "./assets/back-arrow-home.svg";
import { useNavigate } from "react-router-dom";
import { MyNewInfo, useGameContext } from "@/pages/TacToe";
import UpIcon from "./assets/up-icon.svg";
import DownIcon from "./assets/down-icon.svg";
import Loading from "../Loading";
import { aviationImg } from "@/utils/aviationImg";
import { GameState, Info } from "@/skyConstants/bttGameTypes";
import { motion, useAnimation } from "framer-motion";
import { levelRanges } from "@/utils/level";

function generateProgressLevels(startPoints: number, endPoints: number) {
    const startLevelItem = levelRanges.find((item, index) => {
        return startPoints >= item.minPoints && startPoints < item.maxPoints;
    });

    const endLevelItem = levelRanges.find((item, index) => {
        return endPoints >= item.minPoints && endPoints < item.maxPoints;
    });

    const startRange =
        (startPoints - startLevelItem.minPoints) /
        (startLevelItem.maxPoints - startLevelItem.minPoints);

    const endRange =
        (endPoints - endLevelItem.minPoints) /
        (endLevelItem.maxPoints - endLevelItem.minPoints);
    // 如果是升级的
    if (endPoints > startPoints) {
        if (endLevelItem.level === startLevelItem.level) {
            return [[startRange, endRange]];
        } else {
            const progressArray = [[startRange, 1]];

            for (
                let i = startLevelItem.level + 1;
                i < endLevelItem.level;
                i++
            ) {
                progressArray.push([0, 1]);
            }

            progressArray.push([0, endRange]);

            return progressArray;
        }
    } else {
        if (endLevelItem.level === startLevelItem.level) {
            return [[endRange, startRange]];
        } else {
            const progressArray = [[startRange, 0]];

            for (
                let i = startLevelItem.level - 1;
                i > endLevelItem.level;
                i--
            ) {
                progressArray.push([1, 0]);
            }

            progressArray.push([1, endRange]);
            return progressArray;
        }
    }
}

const WinResult = ({
    myInfo,
    myNewInfo,
    progressArray,
}: {
    myInfo: Info;
    myNewInfo: MyNewInfo;
    progressArray: number[][];
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");

    const [highlight, rightPlaneImg, rightPlaneLevel] = useMemo(() => {
        if (myNewInfo.level === myInfo.level) {
            return [false, aviationImg(myInfo.level + 1), myInfo.level + 1];
        } else if (myNewInfo.level > myInfo.level) {
            return [
                true,
                myNewInfo.img ? myNewInfo.img : aviationImg(myNewInfo.level),
                myNewInfo.level,
            ];
        }
    }, [myNewInfo.level, myInfo.level]);

    const clickAnimate = useAnimation();

    useEffect(() => {
        const handleUp = async () => {
            for (let i = 0; i < progressArray.length; i++) {
                await clickAnimate.set({
                    width: progressArray[i][0] * 100 + "%",
                });
                await clickAnimate.start({
                    width: progressArray[i][1] * 100 + "%",
                    transition: {
                        duration: 1,
                    },
                });
            }
        };
        handleUp();
    }, []);

    return (
        <Box>
            <Text
                sx={{
                    fontSize: isPc ? "2.5vw" : "28px",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#FDDC2D",
                }}
            >
                YOU WIN
            </Text>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box>
                    <Image
                        src={aviationImg(myInfo.level)}
                        sx={{
                            width: isPc ? "15.625vw" : "100px",
                            height: isPc ? "15.625vw" : "100px",
                            opacity: highlight ? "0.5" : "1",
                        }}
                    ></Image>
                    <Text
                        sx={{
                            fontSize: isPc ? "1.875vw" : "20px",
                            textAlign: "center",
                        }}
                    >
                        Lvl.{myInfo.level}
                    </Text>
                </Box>

                <Image
                    src={UpIcon}
                    sx={{
                        width: isPc ? "40px" : "20px",
                        margin: isPc ? "0 4.1667vw" : "20px",
                    }}
                ></Image>
                <Box>
                    <Image
                        src={rightPlaneImg}
                        sx={{
                            width: isPc ? "15.625vw" : "100px",
                            height: isPc ? "15.625vw" : "100px",
                            opacity: highlight ? "1" : "0.5",
                        }}
                    ></Image>
                    <Text
                        sx={{
                            fontSize: isPc ? "1.875vw" : "20px",
                            textAlign: "center",
                        }}
                    >
                        Lvl.{rightPlaneLevel}
                    </Text>
                </Box>
            </Box>
            <Box
                sx={{
                    width: isPc ? "34.6354vw" : "100%",
                    margin: "0 auto",
                }}
            >
                <Text
                    sx={{
                        textAlign: "right",
                        fontSize: isPc ? "1.25vw" : "12px",
                    }}
                >
                    {myInfo.point} pt{"   "}
                    <span style={{ color: "rgba(253, 220, 45, 1)" }}>
                        + {myNewInfo.point - myInfo.point} pt
                    </span>{" "}
                    / {myNewInfo.point} pt
                </Text>
                <Box
                    sx={{
                        height: isPc ? "1.7188vw" : "15px",
                        border: isPc ? "0.1042vw solid #FFF" : "2px solid #fff",
                        borderRadius: isPc ? "1.0417vw" : "10px",
                        padding: isPc ? "0.3125vw" : "2px",
                    }}
                >
                    <motion.div
                        style={{
                            height: "100%",
                            background: "#fff",
                            borderRadius: isPc ? "1.0417vw" : "10px",
                        }}
                        initial={{ width: "0%" }}
                        animate={clickAnimate}
                    ></motion.div>
                </Box>
            </Box>
        </Box>
    );
};

const LoseResult = ({
    myInfo,
    myNewInfo,
    progressArray,
}: {
    myInfo: Info;
    myNewInfo: MyNewInfo;
    progressArray: number[][];
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const clickAnimate = useAnimation();

    useEffect(() => {
        const handleUp = async () => {
            for (let i = 0; i < progressArray.length; i++) {
                await clickAnimate.set({
                    width: progressArray[i][0] * 100 + "%",
                });
                await clickAnimate.start({
                    width: progressArray[i][1] * 100 + "%",
                    transition: {
                        duration: 1,
                    },
                });
            }
        };
        handleUp();
    }, []);
    return (
        <Box>
            <Text
                sx={{
                    fontSize: isPc ? "2.5vw" : "28px",
                    fontWeight: "bold",
                    textAlign: "center",
                }}
            >
                YOU LOSE
            </Text>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box>
                    <Image
                        src={
                            myNewInfo.img
                                ? myNewInfo.img
                                : aviationImg(myNewInfo.level)
                        }
                        sx={{
                            width: isPc ? "15.625vw" : "100px",
                            height: isPc ? "15.625vw" : "100px",
                        }}
                    ></Image>
                    <Text
                        sx={{
                            fontSize: isPc ? "1.875vw" : "20px",
                            textAlign: "center",
                        }}
                    >
                        Lvl.{myNewInfo.level}
                    </Text>
                </Box>
                <Image
                    src={DownIcon}
                    sx={{
                        width: isPc ? "40px" : "20px",
                        margin: isPc ? "0 4.1667vw" : "20px",
                    }}
                ></Image>
                <Box>
                    <Image
                        src={myInfo.img}
                        sx={{
                            width: isPc ? "15.625vw" : "100px",
                            height: isPc ? "15.625vw" : "100px",
                            opacity: "0.5",
                        }}
                    ></Image>
                    <Text
                        sx={{
                            fontSize: isPc ? "1.875vw" : "20px",
                            textAlign: "center",
                        }}
                    >
                        Lvl.{myInfo.level}
                    </Text>
                </Box>
            </Box>
            <Box
                sx={{
                    width: isPc ? "34.6354vw" : "100%",
                    margin: "0 auto",
                }}
            >
                <Text
                    sx={{
                        textAlign: "right",
                        fontSize: isPc ? "1.25vw" : "12px",
                    }}
                >
                    {myInfo.point} pt{"   "}
                    <span style={{ color: "rgba(253, 220, 45, 1)" }}>
                        - {myInfo.point - myNewInfo.point} pt
                    </span>{" "}
                    / {myNewInfo.point} pt
                </Text>
                <Box
                    sx={{
                        height: isPc ? "1.7188vw" : "15px",
                        border: isPc ? "0.1042vw solid #FFF" : "2px solid #fff",
                        borderRadius: isPc ? "1.0417vw" : "10px",
                        padding: isPc ? "0.3125vw" : "2px",
                    }}
                >
                    <motion.div
                        style={{
                            height: "100%",
                            background: "#fff",
                            borderRadius: isPc ? "1.0417vw" : "10px",
                        }}
                        animate={clickAnimate}
                    ></motion.div>
                </Box>
            </Box>
        </Box>
    );
};

const SettlementPage = ({}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const navigate = useNavigate();
    const { myGameInfo, myInfo, myNewInfo, mileages, istest } =
        useGameContext();

    // const myInfo: any = {
    //     level: 1,
    //     point: 1,
    //     img: "",
    //     burner: "",
    // };

    // const myNewInfo = {
    //     level: 2,
    //     point: 3,
    //     img: "",
    //     burner: "",
    // };

    const win = useMemo(() => {
        return [
            GameState.WinByConnecting,
            GameState.WinBySurrender,
            GameState.WinByTimeout,
            GameState.WinByGridCount,
        ].includes(myGameInfo.gameState);
    }, [myGameInfo.gameState]);

    const progressArray = useMemo(() => {
        if (!myInfo || !myNewInfo) {
            return [];
        }

        return generateProgressLevels(myInfo.point, myNewInfo.point);
    }, [myInfo, myNewInfo]);

    return (
        <Box
            sx={{
                width: "100vw",
                height: "100%",
                background: `url(${Bg}) no-repeat center center`,
                backgroundSize: "cover",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                fontFamily: "Orbitron",
                padding: "0 20px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    position: "absolute",
                    left: "0",
                    top: "0",
                    cursor: "pointer",
                }}
            >
                <Box
                    onClick={() =>
                        navigate("/", {
                            replace: true,
                        })
                    }
                    sx={{
                        display: "flex",
                        marginRight: isPc ? "1.0417vw" : "10px",
                    }}
                >
                    <Image
                        src={GardenIcon}
                        sx={{
                            width: isPc ? "5.4167vw" : "50px",
                        }}
                    ></Image>
                    <Image
                        src={BackIcon}
                        sx={{
                            width: isPc ? "2.6563vw" : "32px",
                        }}
                    ></Image>
                </Box>
            </Box>

            <Box
                sx={{
                    position: "relative",
                }}
            >
                {myNewInfo ? (
                    <>
                        {win ? (
                            <WinResult
                                myInfo={myInfo}
                                myNewInfo={myNewInfo}
                                progressArray={progressArray}
                            ></WinResult>
                        ) : (
                            <LoseResult
                                myInfo={myInfo}
                                myNewInfo={myNewInfo}
                                progressArray={progressArray}
                            ></LoseResult>
                        )}

                        <Box
                            sx={{
                                border: "3px solid #f2d861",
                                color: "#f2d861",
                                width: isPc ? "11.4583vw" : "240px",
                                height: isPc ? "3.2292vw" : "50px",
                                cursor: "pointer",
                                borderRadius: isPc ? "0.8333vw" : "16px",
                                fontSize: isPc ? "1.4583vw" : "20px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: "bold",
                                margin: isPc ? "1vh auto 0" : "20px auto 0",
                            }}
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            Continue
                        </Box>
                    </>
                ) : (
                    <Loading></Loading>
                )}
            </Box>
        </Box>
    );
};

export default SettlementPage;
