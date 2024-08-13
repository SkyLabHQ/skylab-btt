import { Box, Grid, Text, Image, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BoardGrid } from "@/components/BttComponents/Board";
import BaseGrid from "./assets/base-grid.svg";
import { useTour } from "@reactour/tour";
import CloseIcon from "./assets/close.svg";
import { UserMarkType } from "@/skyConstants/bttGameTypes";
import MBalance from "../BttComponents/MBalance";
import { MUserProfile } from "../PrivateRoom/UserProfile";
import Timer from "../BttComponents/Timer";
import { aviationImg } from "@/utils/aviationImg";
import BottomInputBox from "../BttComponents/BottomInputBox";

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
            myValue: 3,
            opValue: 2,
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
                <Box
                    className="btt-0-step"
                    sx={{
                        width: "58px",
                        height: "58px",
                        position: "absolute",
                        top: "160px",
                        left: "50%",
                        transform: "translateX(-50%)",
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

const myBalanceObj = {
    0: 97,
    1: 97,
    2: 55,
    3: 0,
};
const opBalanceObj = {
    0: 98,
    1: 98,
    2: 64,
    3: 0,
};

const MTacToeTutorial = ({}) => {
    const { currentStep, setIsOpen } = useTour();

    useEffect(() => {
        setTimeout(() => {
            setIsOpen(true);
        }, 200);
    }, []);

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
                        padding: "20px 0 140px",
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
                            <MUserProfile
                                open={true}
                                status="op"
                                img={aviationImg(1)}
                                level={1}
                            ></MUserProfile>
                        </Flex>
                        <Box className="btt-first-step btt-third-step">
                            <MBalance
                                balance={opBalanceObj[currentStep]}
                                mark={2}
                            ></MBalance>
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
                                height: "32px",
                                position: "relative",
                            }}
                            className="btt-1-step"
                        >
                            <Box
                                sx={{
                                    width: "140px",
                                    position: "absolute",
                                    left: "12px",
                                    bottom: "12px",
                                }}
                            >
                                <Timer time1={30000} time1Gray={false}></Timer>
                            </Box>
                            <Flex
                                sx={{
                                    position: "absolute",
                                    bottom: "12px",
                                    right: 0,
                                }}
                                flexDir={"column"}
                                align={"flex-end"}
                            >
                                <MUserProfile
                                    level={1}
                                    open={true}
                                    status="my"
                                    img={aviationImg(1)}
                                ></MUserProfile>
                                <MBalance
                                    balance={myBalanceObj[currentStep]}
                                    status="right"
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
        </Box>
    );
};

export default MTacToeTutorial;
