import React, { useMemo } from "react";
import { Box, Text, keyframes, useMediaQuery } from "@chakra-ui/react";
import { ThirtySecond } from "@/skyConstants/bttGameTypes";

const BttTimer = ({
    width,
    time,
    show = true,
    gray = false,
    direction = "right",
}: {
    width: string;
    time: string;
    show?: boolean;
    gray?: boolean;
    direction?: "top" | "right";
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
            }}
        >
            <Box
                sx={{
                    border: gray
                        ? "3px solid #616161"
                        : show
                        ? "3px solid #FFF"
                        : "3px solid #616161",
                    width: isPc ? "21.4583vw" : "100%",
                    background: "transparent",
                    height: isPc ? "1.25vw" : "16px",
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: isPc ? "0.1042vw" : "1px",
                    borderRadius: "0.5208vw",
                }}
            >
                <Box
                    sx={{
                        width: width,
                        background: gray ? "#616161" : "#fddc2d",
                        borderRadius: "0.5208vw",
                    }}
                ></Box>
            </Box>
            {show && (
                <Text
                    sx={{
                        fontSize: isPc ? "1.25vw" : "20px",
                        position: "absolute",
                        right: direction === "right" && "-100px",
                        top: direction === "right" ? "50%" : "-28px",
                        left: direction === "top" && "50%",
                        transform:
                            direction === "right"
                                ? "translateY(-50%)"
                                : "translateX(-50%)",
                        color: gray ? "#616161" : "#fddc2d",
                    }}
                >
                    {time}
                </Text>
            )}
        </Box>
    );
};

const move = keyframes`
    0% {
        opacity:0
    }
    
    100% {
        opacity: 1;
    }
`;

const BufferTimer = ({ width, show }: { width: string; show: boolean }) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
            }}
        >
            <Box
                sx={{
                    background: "#616161",
                    height: isPc ? "0.3125vw" : "4px",
                    width: isPc ? "21.4583vw" : "100%",
                    marginTop: isPc ? "1.4815vh" : "8px",
                    display: "flex",
                    justifyContent: "flex-end",
                }}
                animation={`${show ? move : ""} 1s linear infinite alternate`}
            >
                <Box
                    sx={{
                        width: width,
                        background: show ? "#fff" : "#616161",
                        height: isPc ? "0.3125vw" : "4px",
                    }}
                ></Box>
            </Box>
            {isPc && (
                <Box
                    sx={{
                        height: "1.4583vw",
                    }}
                >
                    {show && (
                        <Text
                            sx={{
                                fontSize: isPc ? "1.0417vw" : "12px",
                                width: "100%",
                                textAlign: "center",
                            }}
                        >
                            {/* On Chain Buffer Time. Please Submit ASAP */}
                        </Text>
                    )}
                </Box>
            )}
        </Box>
    );
};
const Timer = ({
    time1,
    time2,
    time1Gray,
    direction = "right",
}: {
    time1: number;
    time2: number;
    time1Gray: boolean;
    direction?: "top" | "right";
}) => {
    const {
        minutes,
        second,
        time: fisrtTimeout,
        show: bttShow,
    } = useMemo(() => {
        let time = 0;
        let show = false;
        if (time1 > time2) {
            time = time1 - time2;
            show = true;
        }

        let minutes: string | number = Math.floor(time / 60000);
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }

        let second: string | number = Math.floor((time / 1000) % 60);
        if (second < 10) {
            second = `0${second}`;
        }
        return { minutes, second, time, show };
    }, [time1, time2]);

    const { time: secondTimeout, show: showBuffer } = useMemo(() => {
        let time = 0;
        let show = false;
        if (time1 > time2) {
            time = time2;
        } else {
            time = time1;
            show = true;
        }

        return { time, show };
    }, [time1, time2]);
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
            }}
        >
            <BttTimer
                direction={direction}
                width={(fisrtTimeout / ThirtySecond) * 100 + "%"}
                time={`${minutes}:${second}`}
                show={bttShow}
                gray={time1Gray}
            ></BttTimer>
            <BufferTimer
                width={(secondTimeout / time2) * 100 + "%"}
                show={showBuffer}
            ></BufferTimer>
        </Box>
    );
};

export default Timer;
