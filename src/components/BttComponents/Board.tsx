import {
    Box,
    Flex,
    Grid,
    GridItem,
    keyframes,
    Text,
    Image,
} from "@chakra-ui/react";
import BaseGrid from "./assets/base-grid.svg";
import { BoardItem, UserMarkType } from "@/skyConstants/bttGameTypes";
import useBidIcon from "@/hooks/useBidIcon";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";

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
    const [isGreaterThan1300] = useSkyMediaQuery("(min-width: 1300px)");
    const [isGreaterThan800] = useSkyMediaQuery("(min-width: 800px)");
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
                                padding: isGreaterThan800 ? "0 10px" : "0 3px",
                                fontSize: isGreaterThan1300
                                    ? "16px"
                                    : isGreaterThan800
                                    ? "13px"
                                    : "10px",
                                "& img": {
                                    width: isGreaterThan1300
                                        ? "15px"
                                        : isGreaterThan800
                                        ? "12px"
                                        : "8px",
                                    height: isGreaterThan1300
                                        ? "15px"
                                        : isGreaterThan800
                                        ? "12px"
                                        : "8px",
                                },
                                "& >div": {
                                    width: isGreaterThan1300
                                        ? "64px"
                                        : isGreaterThan800
                                        ? "48px"
                                        : "30px",
                                    height: isGreaterThan1300
                                        ? "18px"
                                        : isGreaterThan800
                                        ? "14px"
                                        : "10px",
                                    background: "#D9D9D9",
                                    borderRadius: isGreaterThan800
                                        ? "18px"
                                        : "4px",
                                    color: "#000000",
                                },
                            }}
                        >
                            <Flex
                                sx={{
                                    padding: isGreaterThan800
                                        ? "0 4px"
                                        : "0 2px",
                                }}
                                justify={"space-between"}
                                align={"center"}
                            >
                                <Image
                                    width={"10px"}
                                    height={"10px"}
                                    src={
                                        myMark === UserMarkType.Circle
                                            ? MarkIcon.BlackCircle
                                            : MarkIcon.BlackCross
                                    }
                                ></Image>
                                <Box>{myValue}</Box>
                            </Flex>

                            <Flex
                                sx={{
                                    padding: isGreaterThan800
                                        ? "0 4px"
                                        : "0 2px",
                                }}
                                justify={"space-between"}
                                align={"center"}
                            >
                                <Image
                                    width={"10px"}
                                    height={"10px"}
                                    sx={{
                                        marginRight: isGreaterThan800
                                            ? "10px"
                                            : "2px",
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
                            </Flex>
                        </Box>
                    )}
                {mark === UserMarkType.Square && (
                    <Flex
                        width={"70%"}
                        height={"70%"}
                        sx={{
                            borderRadius: isGreaterThan800 ? "12px" : "6px",
                            background: `linear-gradient(0deg, transparent 6px, #FFF 6px) repeat-y,
                                        linear-gradient(0deg, transparent 50%, #FFF  0) repeat-y,
                                        linear-gradient(90deg, transparent 50%, #FFF  0) repeat-x,
                                        linear-gradient(90deg, transparent 50%, #FFF  0) repeat-x`,
                            backgroundSize:
                                "2px 12px, 2px 12px, 12px 2px, 12px 2px",
                            backgroundPosition: "0 0, 100% 0, 0 0, 0 100%",
                            color: "#FDDC2D",
                            fontSize: isGreaterThan1300
                                ? "16px"
                                : isGreaterThan800
                                ? "12px"
                                : "10px",
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
    const [isGreaterThan1300] = useSkyMediaQuery("(min-width: 1300px)");
    const [isGreaterThan800] = useSkyMediaQuery("(min-width: 800px)");
    return (
        <Box
            sx={{
                background: `url(${BaseGrid})`,
                backgroundSize: "100% 100%",
            }}
            w={
                isGreaterThan1300
                    ? "550px"
                    : isGreaterThan800
                    ? "360px"
                    : "240px"
            }
            h={
                isGreaterThan1300
                    ? "550px"
                    : isGreaterThan800
                    ? "360px"
                    : "240px"
            }
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
