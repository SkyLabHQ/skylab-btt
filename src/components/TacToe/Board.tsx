import {
    Box,
    Flex,
    Grid,
    GridItem,
    keyframes,
    Text,
    Image,
    useMediaQuery,
} from "@chakra-ui/react";
import BaseGrid from "./assets/base-grid.svg";
import { BoardItem, UserMarkType } from "@/skyConstants/bttGameTypes";
import useBidIcon from "@/hooks/useBidIcon";

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

const move2 = keyframes`
    from {
    }
    to {
    background-position: 0 -12px, 100% 12px, 12px 0, -12px 100%;
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
    const MarkIcon = useBidIcon();
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
                                padding: isPc ? "0 0.5208vw" : "0 3px",
                                fontSize: isPc ? "0.8333vw" : "10px",
                                "& img": {
                                    width: isPc ? "0.7813vw" : "8px",
                                    height: isPc ? "0.7813vw" : "8px",
                                },
                                "& >div": {
                                    width: isPc ? "3.3333vw" : "30px",
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
                                    padding: isPc ? "0 0.2083vw" : "0 2px",
                                }}
                            >
                                <Image
                                    width={"10px"}
                                    height={"10px"}
                                    sx={{
                                        marginRight: isPc ? "0.5208vw" : "2px",
                                    }}
                                    src={
                                        myMark === UserMarkType.Circle
                                            ? MarkIcon.BlackCircle
                                            : MarkIcon.BlackCross
                                    }
                                ></Image>
                                <Box>{myValue}</Box>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: isPc ? "0 0.2083vw" : "0 2px",
                                }}
                            >
                                <Image
                                    width={"10px"}
                                    height={"10px"}
                                    sx={{
                                        marginRight: isPc ? "0.5208vw" : "2px",
                                    }}
                                    src={
                                        opMark === UserMarkType.Circle
                                            ? MarkIcon.BlackCircle
                                            : opMark === UserMarkType.BotX
                                            ? MarkIcon.BlackBotX
                                            : MarkIcon.BlackCross
                                    }
                                ></Image>
                                <Box>{opValue}</Box>
                            </Box>
                        </Box>
                    )}
                {mark === UserMarkType.Square && (
                    <Flex
                        width={"70%"}
                        height={"70%"}
                        sx={{
                            borderRadius: isPc ? "12px" : "6px",
                            background: `linear-gradient(0deg, transparent 6px, #FFF 6px) repeat-y,
                                        linear-gradient(0deg, transparent 50%, #FFF  0) repeat-y,
                                        linear-gradient(90deg, transparent 50%, #FFF  0) repeat-x,
                                        linear-gradient(90deg, transparent 50%, #FFF  0) repeat-x`,
                            backgroundSize:
                                "2px 12px, 2px 12px, 12px 2px, 12px 2px",
                            backgroundPosition: "0 0, 100% 0, 0 0, 0 100%",
                            color: "#FDDC2D",
                            fontSize: isPc ? "0.8333vw" : "10px",
                            fontWeight: 700,
                        }}
                        animation={`${move2} 1s infinite linear`}
                        align={"center"}
                        justify={"center"}
                        flexDirection={"column"}
                    >
                        <Text>Up For Bid</Text>
                        <Text>Now</Text>
                    </Flex>
                )}
                {mark === UserMarkType.Circle && (
                    <Image
                        width={"70%"}
                        height={"70%"}
                        animation={showAnimate && `${move} 1s`}
                        sx={{
                            transition: "all 0.8s",
                        }}
                        src={MarkIcon.Circle}
                    ></Image>
                )}
                {mark === UserMarkType.Cross && (
                    <Image
                        width={"70%"}
                        height={"70%"}
                        animation={showAnimate && `${move} 1s`}
                        sx={{
                            transition: "all 0.8s",
                        }}
                        src={MarkIcon.Cross}
                    ></Image>
                )}
                {mark === UserMarkType.YellowCircle && (
                    <Image
                        width={"70%"}
                        height={"70%"}
                        src={MarkIcon.YellowCircle}
                    ></Image>
                )}
                {mark === UserMarkType.YellowCross && (
                    <Image
                        width={"70%"}
                        height={"70%"}
                        src={MarkIcon.YellowCross}
                    ></Image>
                )}
                {mark === UserMarkType.YellowBotX && (
                    <Image
                        width={"70%"}
                        height={"70%"}
                        src={MarkIcon.YellowBotX}
                    ></Image>
                )}
                {mark === UserMarkType.BotX && (
                    <Image
                        width={"70%"}
                        height={"70%"}
                        src={MarkIcon.BotX}
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
            w={isPc ? "26.0938vw" : "240px"}
            h={isPc ? "26.0938vw" : "240px"}
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
