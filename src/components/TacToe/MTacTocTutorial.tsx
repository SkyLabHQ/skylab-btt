import { Box, Grid, Text, Image, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BoardGrid } from "@/components/TacToe/Board";
import BaseGrid from "./assets/base-grid.svg";
import { useTour } from "@reactour/tour";
import CloseIcon from "./assets/close.svg";
import { UserMarkType } from "@/skyConstants/bttGameTypes";
import MBalance from "../BttComponents/MBalance";
import { MUserProfileResult } from "../PrivateRoom/UserProfile";
import Timer from "../BttComponents/Timer";
import { aviationImg } from "@/utils/aviationImg";
import BottomInputBox from "../BttComponents/BottomInputBox";
import PlayBackButton from "../BttPlayBack/PlayBackButton";
import RoundInfo from "../BttComponents/RoundInfo";

const FirstBoard = () => {
    const list = [
        {
            mark: -1,
            myValue: 0,
            opValue: 0,
            myMark: UserMarkType.Circle,
            opMark: UserMarkType.Cross,
        },
        {
            mark: 1,
            myValue: 12,
            opValue: 10,
            myMark: UserMarkType.Circle,
            opMark: UserMarkType.Cross,
        },
        {
            mark: 2,
            myValue: 6,
            opValue: 8,
            myMark: UserMarkType.Circle,
            opMark: UserMarkType.Cross,
        },
        {
            mark: -1,
            myValue: 0,
            opValue: 0,
            myMark: UserMarkType.Circle,
            opMark: UserMarkType.Cross,
        },
        {
            mark: 0,
            myValue: 5,
            opValue: 8,
            myMark: UserMarkType.Circle,
            opMark: UserMarkType.Cross,
        },
        {
            mark: 1,
            myValue: 7,
            opValue: 4,
            myMark: UserMarkType.Circle,
            opMark: UserMarkType.Cross,
        },
        {
            mark: -1,
            myValue: 0,
            opValue: 0,
            myMark: UserMarkType.Circle,
            opMark: UserMarkType.Cross,
        },
        {
            mark: -1,
            myValue: 0,
            opValue: 0,
            myMark: UserMarkType.Circle,
            opMark: UserMarkType.Cross,
        },
        {
            mark: 1,
            myValue: 10,
            opValue: 4,
            myMark: UserMarkType.Circle,
            opMark: UserMarkType.Cross,
        },
    ];

    return (
        <Box
            sx={{
                background: `url(${BaseGrid})`,
                backgroundSize: "100% 100%",
            }}
        >
            <Grid
                templateColumns="repeat(3, 1fr)"
                templateRows="repeat(3, 1fr)"
                w={"220px"}
                h={"220px"}
                sx={{
                    position: "relative",
                }}
            >
                {list.map((item, index) => {
                    return (
                        <BoardGrid
                            key={index}
                            mark={item.mark}
                            myValue={item.myValue}
                            opValue={item.opValue}
                            myMark={item.myMark}
                            opMark={item.opMark}
                        ></BoardGrid>
                    );
                })}

                <Box
                    className="btt-fourth-step"
                    sx={{
                        width: "8.125vw",
                        height: "0.8333vw",
                        position: "absolute",
                        top: "16.4063vw",
                        right: "50%",
                        transform: "translateX(50%)",
                    }}
                ></Box>
            </Grid>
        </Box>
    );
};

const SecondBoard = () => {
    const list = [
        {
            mark: -1,
            myValue: 0,
            opValue: 0,
            myMark: UserMarkType.Circle,
            opMark: UserMarkType.Cross,
        },
        {
            mark: 1,
            myValue: 6,
            opValue: 4,
            myMark: UserMarkType.Circle,
            opMark: UserMarkType.Cross,
        },
        {
            mark: 3,
            myValue: 9,
            opValue: 6,
            myMark: UserMarkType.Circle,
            opMark: UserMarkType.Cross,
        },
        {
            mark: -1,
            myValue: 0,
            opValue: 0,
            myMark: UserMarkType.Circle,
            opMark: UserMarkType.Cross,
        },
        {
            mark: 2,
            myValue: 4,
            opValue: 10,
            myMark: UserMarkType.Circle,
            opMark: UserMarkType.Cross,
        },
        {
            mark: 3,
            myValue: 14,
            opValue: 12,
            myMark: UserMarkType.Circle,
            opMark: UserMarkType.Cross,
        },
        {
            mark: -1,
            myValue: 0,
            opValue: 0,
            myMark: UserMarkType.Circle,
            opMark: UserMarkType.Cross,
        },
        {
            mark: -1,
            myValue: 0,
            opValue: 0,
            myMark: UserMarkType.Circle,
            opMark: UserMarkType.Cross,
        },
        {
            mark: 3,
            myValue: 12,
            opValue: 4,
            myMark: UserMarkType.Circle,
            opMark: UserMarkType.Cross,
        },
    ];

    return (
        <Box
            sx={{
                background: `url(${BaseGrid})`,
                backgroundSize: "100% 100%",
            }}
        >
            <Grid
                templateColumns="repeat(3, 1fr)"
                templateRows="repeat(3, 1fr)"
                w={"220px"}
                h={"220px"}
                sx={{
                    position: "relative",
                }}
            >
                {list.map((item, index) => {
                    return (
                        <BoardGrid
                            key={index}
                            mark={item.mark}
                            myValue={item.myValue}
                            opValue={item.opValue}
                            myMark={item.myMark}
                            opMark={item.opMark}
                        ></BoardGrid>
                    );
                })}
                <Box
                    className="btt-fifth-step"
                    sx={{
                        width: "74px",
                        height: "220px",
                        position: "absolute",
                        top: 0,
                        right: 0,
                    }}
                ></Box>
            </Grid>
        </Box>
    );
};

const ThirdBoard = () => {
    const list = [
        {
            mark: 3,
            myValue: 12,
            opValue: 7,
            myMark: UserMarkType.Circle,
            opMark: UserMarkType.Cross,
        },
        {
            mark: 3,
            myValue: 16,
            opValue: 5,
            myMark: UserMarkType.Circle,
            opMark: UserMarkType.Cross,
        },
        {
            mark: 2,
            myValue: 4,
            opValue: 9,
            myMark: UserMarkType.Circle,
            opMark: UserMarkType.Cross,
        },
        {
            mark: 2,
            myValue: 9,
            opValue: 20,
            myMark: UserMarkType.Circle,
            opMark: UserMarkType.Cross,
        },
        {
            mark: 2,
            myValue: 11,
            opValue: 24,
            myMark: UserMarkType.Circle,
            opMark: UserMarkType.Cross,
        },
        {
            mark: 3,
            myValue: 12,
            opValue: 4,
            myMark: UserMarkType.Circle,
            opMark: UserMarkType.Cross,
        },
        {
            mark: 3,
            myValue: 15,
            opValue: 3,
            myMark: UserMarkType.Circle,
            opMark: UserMarkType.Cross,
        },
        {
            mark: 2,
            myValue: 12,
            opValue: 24,
            myMark: UserMarkType.Circle,
            opMark: UserMarkType.Cross,
        },
        {
            mark: 3,
            myValue: 9,
            opValue: 4,
            myMark: UserMarkType.Circle,
            opMark: UserMarkType.Cross,
        },
    ];

    return (
        <Box
            sx={{
                background: `url(${BaseGrid})`,
                backgroundSize: "100% 100%",
            }}
            className="btt-sixth-step"
        >
            <Grid
                templateColumns="repeat(3, 1fr)"
                templateRows="repeat(3, 1fr)"
                w={"220px"}
                h={"220px"}
                sx={{
                    position: "relative",
                }}
            >
                {list.map((item, index) => {
                    return (
                        <BoardGrid
                            key={index}
                            mark={item.mark}
                            myValue={item.myValue}
                            opValue={item.opValue}
                            myMark={item.myMark}
                            opMark={item.opMark}
                        ></BoardGrid>
                    );
                })}
            </Grid>
        </Box>
    );
};

const MTacToeTutorial = ({}) => {
    const { currentStep, steps, setIsOpen, setCurrentStep } = useTour();

    useEffect(() => {
        setTimeout(() => {
            setIsOpen(true);
        }, 200);
    }, []);

    const handlePreStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleStartStep = () => {
        setCurrentStep(0);
    };

    const handleEndStep = () => {
        setCurrentStep(steps.length - 1);
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "calc(100% - 16.6667vw)",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "fixed",
                    top: "20px",
                    left: "0",
                    width: "100%",
                    zIndex: 9999999,
                    padding: "0 20px",
                }}
            >
                <Text
                    sx={{
                        fontSize: "20px",
                    }}
                >
                    Tutorial
                </Text>
                <Image
                    src={CloseIcon}
                    sx={{
                        cursor: "pointer",
                        width: "18px",
                    }}
                    onClick={() => {
                        setIsOpen(false);
                    }}
                ></Image>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100%",
                    padding: "0px 18px 0",
                    background: "rgba(217, 217, 217, 1)",
                    zIndex: 100,
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    paddingTop: "60px",
                }}
            >
                <Box
                    id="share-content"
                    sx={{
                        background: "#303030",
                        margin: "0 auto",
                        width: "100%",
                        border: "2px solid #fff",
                        boxShadow: "5px 4px 8px 0px rgba(255, 255, 255, 0.50)",
                        padding: "0 0 140px",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "10px",
                    }}
                >
                    <Flex
                        sx={{
                            alignItems: "flex-start",
                        }}
                        flexDir={"column"}
                    >
                        <Flex>
                            <MUserProfileResult
                                showUserIcon={false}
                                position="left"
                                img={aviationImg(1)}
                                level={1}
                            ></MUserProfileResult>
                        </Flex>
                        <Box className="btt-first-step btt-third-step">
                            <MBalance balance={88} mark={2}></MBalance>
                        </Box>
                    </Flex>
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: "0px",
                            left: "0",
                            width: "100%",
                        }}
                    >
                        <Box
                            sx={{
                                height: "100px",
                                position: "relative",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "180px",
                                    position: "absolute",
                                    left: "12px",
                                    bottom: "4px",
                                }}
                            >
                                <Timer
                                    direction="top"
                                    time1={30000}
                                    time2={0}
                                    time1Gray={false}
                                ></Timer>
                            </Box>
                            <Flex
                                sx={{
                                    position: "absolute",
                                    bottom: "0",
                                    right: 0,
                                }}
                                flexDir={"column"}
                                align={"flex-end"}
                            >
                                <Flex>
                                    <MUserProfileResult
                                        level={1}
                                        position="right"
                                        showUserIcon={false}
                                        img={aviationImg(1)}
                                    ></MUserProfileResult>
                                </Flex>
                                <MBalance
                                    balance={88}
                                    status="op"
                                    mark={1}
                                ></MBalance>
                            </Flex>
                        </Box>

                        <BottomInputBox
                            bidAmount={""}
                            myGameState={null}
                            loading={false}
                            onSubClick={() => {}}
                            onAddClick={() => {}}
                            onConfirm={() => {}}
                            onMessageClick={() => {}}
                            onInputAmountClick={() => {}}
                        ></BottomInputBox>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flex: 1,
                            justifyContent: "center",
                            marginTop: "20px",
                        }}
                    >
                        <Box>
                            {[0, 1].includes(currentStep) && (
                                <FirstBoard></FirstBoard>
                            )}
                            {currentStep === 2 && <SecondBoard></SecondBoard>}
                            {currentStep === 3 && <ThirdBoard></ThirdBoard>}
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    position: "fixed",
                    bottom: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 99999999,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        borderRadius: "8px",
                        background: "#d9d9d9",
                        display: "flex",
                        width: "50px",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "16px",
                    }}
                >
                    <Text
                        sx={{
                            fontSize: "12px",
                            color: "#303030",
                        }}
                    >
                        {currentStep + 1}
                        <span
                            style={{
                                color: "#616161",
                                fontSize: "12px",
                            }}
                        >
                            /{steps.length}
                        </span>
                    </Text>
                </Box>
                <PlayBackButton
                    showPre={currentStep > 0}
                    showNext={currentStep + 1 < steps.length}
                    handleEndStep={handleEndStep}
                    handleNextStep={handleNextStep}
                    handlePreStep={handlePreStep}
                    handleStartStep={handleStartStep}
                ></PlayBackButton>
            </Box>
        </Box>
    );
};

export default MTacToeTutorial;
