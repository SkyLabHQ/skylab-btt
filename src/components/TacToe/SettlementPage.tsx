import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useMemo } from "react";
import GardenIcon from "./assets/garden-icon.png";
import { useNavigate } from "react-router-dom";
import UpIcon from "./assets/level-arrow.png";
import DownIcon from "./assets/level-down-arrow.png";

import { aviationImg } from "@/utils/aviationImg";
import { getPvpWinState } from "@/skyConstants/bttGameTypes";
import { motion, useAnimation } from "framer-motion";
import { levelRanges } from "@/utils/level";
import { TournamentGameInfo, useGameContext } from "@/pages/TacToe";
import { ReactComponent as XpUpIcon } from "./assets/xp-up.svg";
import LevelUpBg from "./assets/level-up.png";
import LevelDownBg from "./assets/level-down.png";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";
import { BackWithText } from "../Back";

function generateProgressLevels(startPoints: number, endPoints: number) {
    const startLevelItem = levelRanges.find((item, index) => {
        return startPoints >= item.minPoints && startPoints < item.maxPoints;
    });

    const endLevelItem = levelRanges.find((item, index) => {
        return endPoints >= item.minPoints && endPoints < item.maxPoints;
    });

    // 如果是升级的
    if (endPoints > startPoints) {
        const startRange =
            (startPoints - startLevelItem.minPoints) /
            (startLevelItem.maxPoints - startLevelItem.minPoints);

        const endRange =
            (endPoints - endLevelItem.minPoints) /
            (endLevelItem.maxPoints - endLevelItem.minPoints);
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

            if (endLevelItem.minPoints !== endPoints) {
                progressArray.push([0, endRange]);
            }

            return progressArray;
        }
    } else {
        const startRange =
            (startPoints - startLevelItem.minPoints) /
            (startLevelItem.maxPoints - startLevelItem.minPoints);

        const endRange =
            (endPoints - endLevelItem.minPoints) /
            (endLevelItem.maxPoints - endLevelItem.minPoints);
        if (endLevelItem.level === startLevelItem.level) {
            return [[startRange, endRange]];
        } else {
            const progressArray = [[startRange == 0 ? 1 : startRange, 0]];

            for (
                let i = startLevelItem.level - 1;
                i > endLevelItem.level;
                i--
            ) {
                progressArray.push([1, 0]);
            }

            if (endLevelItem.minPoints !== endPoints) {
                progressArray.push([1, endRange]);
            }

            return progressArray;
        }
    }
}

const WinResult = ({
    myInfo,
    progressArray,
}: {
    myInfo: TournamentGameInfo;
    progressArray: number[][];
}) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");

    const [rightPlaneImg, rightPlaneLevel, nextLevelXp] = useMemo(() => {
        let nextLevelXp = 0;
        const levelItem = levelRanges.find((item, index) => {
            return (
                myInfo.overPoint >= item.minPoints &&
                myInfo.overPoint < item.maxPoints
            );
        });

        if (levelItem) {
            nextLevelXp = levelItem.maxPoints - myInfo.overPoint;
        }

        if (myInfo.overLevel === myInfo.level) {
            return [
                aviationImg(myInfo.level + 1),
                myInfo.level + 1,
                nextLevelXp,
            ];
        } else if (myInfo.overLevel > myInfo.level) {
            return [
                aviationImg(myInfo.overLevel),
                myInfo.overLevel,
                nextLevelXp,
            ];
        }
    }, [myInfo]);

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
                    fontSize: isPc ? "48px" : "28px",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#FDDC2D",
                    fontFamily: "Orbitron",
                }}
            >
                YOU WIN
            </Text>
            {myInfo.overLevel > myInfo.level && (
                <Text
                    sx={{
                        color: "#FDDC2D",
                        textAlign: "center",
                        fontFamily: "Orbitron",
                        fontSize: isPc ? "20px" : "12px",
                        marginTop: "20px",
                    }}
                >
                    You become the active plane in Lvl.{myInfo.overLevel}
                </Text>
            )}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                    }}
                >
                    <Image
                        src={aviationImg(myInfo.level)}
                        sx={{
                            width: isPc ? "220px" : "100px",
                            height: isPc ? "220px" : "100px",
                        }}
                    ></Image>
                    <Text
                        sx={{
                            fontSize: isPc ? "36px" : "20px",
                            textAlign: "center",
                            position: "absolute",
                            bottom: "10%",
                            width: "100%",
                            left: "50%",
                            transform: "translateX(-50%)",
                        }}
                    >
                        Lvl.{myInfo.level}
                    </Text>
                </Box>

                <Image
                    src={UpIcon}
                    sx={{
                        width: isPc ? "80px" : "40px",
                    }}
                ></Image>
                <Box
                    sx={{
                        backgroundImage: `url(${LevelUpBg})`,
                        backgroundSize: "100% ",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center 40%",
                        position: "relative",
                    }}
                >
                    <Text
                        sx={{
                            color: "#FDDC2D",
                            textAlign: "center",
                            fontSize: isPc ? "24px" : "12px",
                            fontWeight: 700,
                            position: "absolute",
                            fontFamily: "Orbitron",
                            top: "10%",
                            width: "100%",
                        }}
                    >
                        Level Up!
                    </Text>
                    <Image
                        src={rightPlaneImg}
                        sx={{
                            width: isPc ? "220px" : "100px",
                            height: isPc ? "220px" : "100px",
                        }}
                    ></Image>
                    <Text
                        sx={{
                            fontSize: isPc ? "36px" : "20px",
                            textAlign: "center",
                            position: "absolute",
                            bottom: "10%",
                            width: "100%",
                            left: "50%",
                            transform: "translateX(-50%)",
                        }}
                    >
                        Lvl.{rightPlaneLevel}
                    </Text>
                </Box>
            </Box>
            <Box
                sx={{
                    width: isPc ? "652px" : "100%",
                    margin: "0 auto",
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        marginTop: "20px",
                        lineHeight: 1,
                    }}
                >
                    <Flex
                        sx={{
                            position: "absolute",
                            left: "50%",
                            transform: "translateX(-50%)",
                            top: isPc ? "-44px" : "-24px",
                            fontSize: isPc ? "40px" : "20px",

                            fontWeight: 700,
                            color: "#FDDC2D",
                            verticalAlign: "bottom",
                        }}
                        align={"flex-end"}
                    >
                        <Box
                            sx={{
                                marginBottom: isPc ? "8px" : "4px",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: isPc ? "24px" : "12px",
                                    fontWeight: 700,
                                    marginRight: "4px",
                                    color: "#fff",
                                    verticalAlign: "bottom",
                                }}
                            >
                                {myInfo.point}
                            </span>
                            <XpUpIcon
                                color="#fff"
                                style={{
                                    marginRight: "18px",
                                    width: isPc ? "28px" : "14px",
                                    height: isPc ? "22px" : "11px",
                                    display: "inline-block",
                                }}
                            ></XpUpIcon>
                        </Box>
                        <Box
                            sx={{
                                marginBottom: isPc ? "6px" : "3px",
                            }}
                        >
                            <span
                                style={{
                                    marginRight: "4px",
                                }}
                            >
                                +{myInfo.overPoint - myInfo.point}
                            </span>
                            <XpUpIcon
                                style={{
                                    width: isPc ? "35px" : "16px",
                                    height: isPc ? "28px" : "14px",
                                    display: "inline-block",
                                }}
                            ></XpUpIcon>
                        </Box>
                    </Flex>

                    <Box
                        sx={{
                            position: "absolute",
                            right: "0%",
                            top: isPc ? "-44px" : "-24px",
                            fontSize: isPc ? "40px" : "20px",
                        }}
                    >
                        <span
                            style={{
                                fontSize: isPc ? "24px" : "12px",
                            }}
                        >
                            NextLevel:{" "}
                            <span
                                style={{
                                    fontWeight: 700,
                                }}
                            >
                                {nextLevelXp}
                            </span>
                        </span>
                        <XpUpIcon
                            style={{
                                color: "#FDDC2D",
                                width: isPc ? "28px" : "14px",
                                height: isPc ? "22px" : "11px",
                                marginLeft: "4px",
                                display: "inline-block",
                            }}
                        ></XpUpIcon>
                    </Box>
                </Box>
                <Box
                    sx={{
                        height: isPc ? "33px" : "15px",
                        border: isPc ? "1px solid #FFF" : "2px solid #fff",
                        borderRadius: isPc ? "20px" : "10px",
                        padding: isPc ? "6px" : "2px",
                    }}
                >
                    <motion.div
                        style={{
                            height: "100%",
                            background: "#FDDC2D",
                            borderRadius: isPc ? "20px" : "10px",
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
    progressArray,
}: {
    myInfo: TournamentGameInfo;
    progressArray: number[][];
}) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    const clickAnimate = useAnimation();
    const [leftPlaneImg, leftPlaneLevel, nextLevelXp] = useMemo(() => {
        let nextLevelXp = 0;
        const levelItem = levelRanges.find((item, index) => {
            return (
                myInfo.overPoint >= item.minPoints &&
                myInfo.overPoint < item.maxPoints
            );
        });

        if (levelItem) {
            nextLevelXp = levelItem.maxPoints - myInfo.overPoint;
        }

        if (myInfo.overLevel === myInfo.level) {
            return [
                aviationImg(myInfo.level - 1),
                myInfo.level - 1,
                nextLevelXp,
            ];
        } else if (myInfo.overLevel < myInfo.level) {
            return [
                aviationImg(myInfo.overLevel),
                myInfo.overLevel,
                nextLevelXp,
            ];
        }
    }, [myInfo]);

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
        <Box sx={{}}>
            <Text
                sx={{
                    fontSize: isPc ? "48px" : "28px",
                    fontWeight: "bold",
                    textAlign: "center",
                    fontFamily: "Orbitron",
                    color: "#BCBBBE",
                }}
            >
                YOU LOSE
            </Text>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        backgroundImage: `url(${LevelDownBg})`,
                        backgroundSize: "100% ",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center 40%",
                    }}
                >
                    <Text
                        sx={{
                            color: "#888",
                            textAlign: "center",
                            fontSize: isPc ? "24px" : "12px",
                            fontWeight: 700,
                            position: "absolute",
                            fontFamily: "Orbitron",
                            top: "10%",
                            width: "100%",
                        }}
                    >
                        Level Down...{" "}
                    </Text>
                    <Image
                        src={leftPlaneImg}
                        sx={{
                            width: isPc ? "220px" : "100px",
                            height: isPc ? "220px" : "100px",
                        }}
                    ></Image>
                    <Text
                        sx={{
                            fontSize: isPc ? "36px" : "20px",
                            textAlign: "center",
                            position: "absolute",
                            bottom: "10%",
                            width: "100%",
                            left: "50%",
                            transform: "translateX(-50%)",
                        }}
                    >
                        Lvl.{leftPlaneLevel}{" "}
                    </Text>
                </Box>

                <Image
                    src={DownIcon}
                    sx={{
                        width: isPc ? "80px" : "40px",
                    }}
                ></Image>
                <Box
                    sx={{
                        position: "relative",
                    }}
                >
                    <Image
                        src={aviationImg(myInfo.level)}
                        sx={{
                            width: isPc ? "220px" : "100px",
                            height: isPc ? "220px" : "100px",
                        }}
                    ></Image>
                    <Text
                        sx={{
                            fontSize: isPc ? "36px" : "20px",
                            textAlign: "center",
                            position: "absolute",
                            bottom: "10%",
                            width: "100%",
                            left: "50%",
                            transform: "translateX(-50%)",
                        }}
                    >
                        Lvl.{myInfo.level}
                    </Text>
                </Box>
            </Box>
            <Box
                sx={{
                    margin: "0 auto",
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        marginTop: "20px",
                        lineHeight: 1,
                    }}
                >
                    <Flex
                        sx={{
                            position: "absolute",
                            left: "50%",
                            transform: "translateX(-50%)",
                            top: isPc ? "-44px" : "-24px",
                            fontSize: isPc ? "40px" : "20px",

                            fontWeight: 700,
                            color: "#FDDC2D",
                            verticalAlign: "bottom",
                        }}
                        align={"flex-end"}
                    >
                        <Box
                            sx={{
                                marginBottom: isPc ? "8px" : "4px",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: isPc ? "24px" : "12px",
                                    fontWeight: 700,
                                    marginRight: "4px",
                                    color: "#fff",
                                    verticalAlign: "bottom",
                                }}
                            >
                                {myInfo.point}
                            </span>
                            <XpUpIcon
                                color="#fff"
                                style={{
                                    marginRight: "18px",
                                    width: isPc ? "28px" : "14px",
                                    height: isPc ? "22px" : "11px",
                                    display: "inline-block",
                                }}
                            ></XpUpIcon>
                        </Box>
                        <Box
                            sx={{
                                marginBottom: isPc ? "6px" : "3px",
                            }}
                        >
                            <span
                                style={{
                                    marginRight: "4px",
                                    color: "#CA4040",
                                }}
                            >
                                {myInfo.overPoint - myInfo.point}
                            </span>
                            <XpUpIcon
                                style={{
                                    width: isPc ? "35px" : "16px",
                                    height: isPc ? "28px" : "14px",
                                    color: "#CA4040",
                                    display: "inline-block",
                                }}
                            ></XpUpIcon>
                        </Box>
                    </Flex>

                    <Box
                        sx={{
                            position: "absolute",
                            right: "0%",
                            top: isPc ? "-44px" : "-24px",
                            fontSize: isPc ? "40px" : "20px",
                        }}
                    >
                        <span
                            style={{
                                fontSize: isPc ? "24px" : "12px",
                            }}
                        >
                            NextLevel:{" "}
                            <span
                                style={{
                                    fontWeight: 700,
                                }}
                            >
                                {nextLevelXp}
                            </span>
                        </span>
                        <XpUpIcon
                            style={{
                                color: "#FDDC2D",
                                width: isPc ? "28px" : "14px",
                                height: isPc ? "22px" : "11px",
                                marginLeft: "4px",
                                display: "inline-block",
                            }}
                        ></XpUpIcon>
                    </Box>
                </Box>
                <Box
                    sx={{
                        height: isPc ? "33px" : "15px",
                        border: isPc ? "1px solid #FFF" : "2px solid #fff",
                        borderRadius: isPc ? "20px" : "10px",
                        padding: isPc ? "6px" : "2px",
                    }}
                >
                    <motion.div
                        style={{
                            height: "100%",
                            background: "#FDDC2D",
                            borderRadius: isPc ? "20px" : "10px",
                        }}
                        initial={{ width: "0%" }}
                        animate={clickAnimate}
                    ></motion.div>
                </Box>
            </Box>
        </Box>
    );
};

const SettlementPage = ({}) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    const navigate = useNavigate();
    const { myGameInfo } = useGameContext();

    const progressArray = useMemo(() => {
        return generateProgressLevels(myGameInfo.point, myGameInfo.overPoint);
    }, [myGameInfo]);

    return (
        <Box
            onClick={() => {
                navigate("/");
            }}
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                fontFamily: "Quantico",
                padding: "200px 20px 0",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    position: "absolute",
                    left: "12px",
                    top: "12px",
                    cursor: "pointer",
                }}
            >
                <BackWithText
                    textContent="Back"
                    onClick={() =>
                        navigate("/", {
                            replace: true,
                        })
                    }
                ></BackWithText>
            </Box>

            <Box
                sx={{
                    position: "relative",
                    width: isPc ? "652px" : "100%",
                }}
            >
                {getPvpWinState(myGameInfo.gameState) ? (
                    <WinResult
                        myInfo={myGameInfo}
                        progressArray={progressArray}
                    ></WinResult>
                ) : (
                    <LoseResult
                        myInfo={myGameInfo}
                        progressArray={progressArray}
                    ></LoseResult>
                )}
            </Box>
            <Text
                sx={{
                    color: "#FDDC2D",
                    textAlign: "center",
                    fontFamily: "Quantico",
                    fontSize: isPc ? "20px" : "12px",
                    fontWeight: 700,
                    marginTop: "90px",
                }}
            >
                Press any key to continue
            </Text>
        </Box>
    );
};

export default SettlementPage;
