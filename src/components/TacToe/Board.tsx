import {
    Box,
    Grid,
    GridItem,
    Image,
    keyframes,
    useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import BaseGrid from "./assets/base-grid.svg";
import BlackXIcon from "./assets/black-x.svg";
import BlackCircle from "./assets/black-circle.svg";
import {
    BoardItem,
    UserMarkIcon,
    UserMarkType,
} from "@/skyConstants/bttGameTypes";

const move = keyframes`
    0% {
        width:90%;
        height:90%;
    }
    
    100% {
        width: 70%;
        height: 70%;
    }
`;
export const BoardGrid = ({
    mark,
    myValue,
    opValue,
    myMark,
    opMark,
    showAnimate,
}: BoardItem) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <GridItem
            sx={{
                position: "relative",
                paddingBottom: "100%",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    left: "0",
                    top: "0",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {mark !== UserMarkType.Square &&
                    mark !== UserMarkType.Empty && (
                        <Box
                            sx={{
                                position: "absolute",
                                left: "0",
                                bottom: "0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100%",
                                padding: "0 0.5208vw",
                                fontSize: isPc ? "0.8333vw" : "12px",
                                "& img": {
                                    width: isPc ? "0.7813vw" : "8px",
                                    height: isPc ? "0.7813vw" : "8px",
                                },
                                "& >div": {
                                    width: isPc ? "3.3333vw" : "28px",
                                    height: isPc ? "0.9375vw" : "10px",
                                    background: "#D9D9D9",
                                    borderRadius: isPc ? "0.9375vw" : "4px",
                                    color: "#000000",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "0 0.2083vw",
                                }}
                            >
                                <Image
                                    src={
                                        myMark === UserMarkType.Circle
                                            ? BlackCircle
                                            : BlackXIcon
                                    }
                                    sx={{
                                        marginRight: "0.5208vw",
                                    }}
                                ></Image>
                                {myValue}
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "0 0.2083vw",
                                }}
                            >
                                <Image
                                    src={
                                        opMark === UserMarkType.Circle
                                            ? BlackCircle
                                            : BlackXIcon
                                    }
                                    sx={{
                                        marginRight: "0.5208vw",
                                    }}
                                ></Image>

                                {opValue}
                            </Box>
                        </Box>
                    )}
                {mark === UserMarkType.Square && (
                    <Box
                        width={"70%"}
                        height={"70%"}
                        sx={{
                            border: "0.2083vw dashed #fff",
                            borderRadius: "0.5208vw",
                        }}
                    ></Box>
                )}
                {mark === UserMarkType.Circle && (
                    <Image
                        width={"70%"}
                        height={"70%"}
                        src={UserMarkIcon.Circle}
                        animation={showAnimate && `${move} 1s`}
                        sx={{
                            transition: "all 0.8s",
                        }}
                    ></Image>
                )}
                {mark === UserMarkType.Cross && (
                    <Image
                        width={"70%"}
                        height={"70%"}
                        src={UserMarkIcon.Cross}
                        animation={showAnimate && `${move} 1s`}
                        sx={{
                            transition: "all 0.8s",
                        }}
                    ></Image>
                )}
                {mark === UserMarkType.YellowCircle && (
                    <Image
                        width={"70%"}
                        height={"70%"}
                        src={UserMarkIcon.YellowCircle}
                    ></Image>
                )}
                {mark === UserMarkType.YellowCross && (
                    <Image
                        width={"70%"}
                        height={"70%"}
                        src={UserMarkIcon.YellowCross}
                    ></Image>
                )}
                {mark === UserMarkType.YellowBotX && (
                    <Image
                        width={"70%"}
                        height={"70%"}
                        src={UserMarkIcon.YellowBotX}
                    ></Image>
                )}
                {mark === UserMarkType.BotX && (
                    <Image
                        width={"70%"}
                        height={"70%"}
                        src={UserMarkIcon.BotX}
                    ></Image>
                )}
            </Box>
        </GridItem>
    );
};

const Board = ({
    list,
    showAnimateNumber,
}: {
    list: BoardItem[];
    showAnimateNumber?: number;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");

    return (
        <Box
            sx={{
                background: `url(${BaseGrid})`,
                backgroundSize: "100% 100%",
            }}
            w={isPc ? "26.0938vw" : "220px"}
            h={isPc ? "26.0938vw" : "220px"}
        >
            <Grid
                templateColumns="repeat(3, 1fr)"
                templateRows="repeat(3, 1fr)"
                sx={{
                    position: "relative",
                }}
            >
                {list.map((item, index) => {
                    return (
                        <BoardGrid
                            showAnimate={showAnimateNumber === index}
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

export default Board;
