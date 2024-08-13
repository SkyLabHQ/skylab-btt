import React, { useMemo } from "react";
import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import { TwelveHours } from "@/skyConstants/bttGameTypes";

const Timer = ({
    time1,
    time1Gray,
    allTime,
}: {
    time1: number;
    time1Gray: boolean;
    allTime?: number;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");

    console.log(time1, "time1");
    const { minutes, seconds } = useMemo(() => {
        let minutes: string | number = Math.floor((time1 / 60000) % 60);
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }

        let seconds: string | number = Math.floor((time1 / 1000) % 60);
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return { minutes, seconds };
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
            <Box
                sx={{
                    width: "100%",
                }}
            >
                <Text
                    sx={{
                        fontSize: isPc ? "1.25vw" : "16px",
                        color: time1Gray ? "#616161" : "#fddc2d",
                        textAlign: "center",
                    }}
                >
                    {minutes}:{seconds}
                </Text>
                <Box
                    sx={{
                        border: time1Gray
                            ? "3px solid #616161"
                            : "3px solid #FFFFFF",
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
                            width:
                                (time1 /
                                    1000 /
                                    (allTime ? allTime : TwelveHours)) *
                                    100 +
                                "%",
                            background: time1Gray ? "#616161" : "#fddc2d",
                            borderRadius: isPc ? "0.5208vw" : "8px",
                        }}
                    ></Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Timer;
