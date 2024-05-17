import React, { useMemo } from "react";
import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import { TwelveHours } from "@/skyConstants/bttGameTypes";

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
                    borderWidth: isPc ? "3px" : "2px",
                    width: isPc ? "21.4583vw" : "100%",
                    background: "transparent",
                    height: isPc ? "1.25vw" : "12px",
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: isPc ? "0.1042vw" : "1px",
                    borderRadius: isPc ? "0.5208vw" : "8px",
                }}
            >
                <Box
                    sx={{
                        width: width,
                        background: gray ? "#616161" : "#fddc2d",
                        borderRadius: isPc ? "0.5208vw" : "8px",
                    }}
                ></Box>
            </Box>
            {show && (
                <Text
                    sx={{
                        fontSize: isPc ? "1.25vw" : "20px",
                        position: "absolute",
                        right: direction === "right" && "-6.875vw",
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

const Timer = ({
    time1,
    time1Gray,
    direction = "right",
}: {
    time1: number;
    time1Gray: boolean;
    direction?: "top" | "right";
}) => {
    const { hours, minutes, seconds } = useMemo(() => {
        let hours: string | number = Math.floor(time1 / 3600000);
        if (hours < 10) {
            hours = `0${hours}`;
        }

        let minutes: string | number = Math.floor((time1 / 60000) % 60);
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }

        let seconds: string | number = Math.floor((time1 / 1000) % 60);
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return { hours, minutes, seconds };
    }, [time1]);

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
                width={(time1 / TwelveHours) * 100 + "%"}
                time={`${hours}:${minutes}:${seconds}`}
                gray={time1Gray}
            ></BttTimer>
        </Box>
    );
};

export default Timer;
