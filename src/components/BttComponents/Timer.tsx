import React, { useMemo } from "react";
import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import { TwelveHours } from "@/skyConstants/bttGameTypes";

const BttTimer = ({
    width,
    time,
    gray = false,
}: {
    width: string;
    time: string;
    gray?: boolean;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Box
            sx={{
                width: "100%",
            }}
        >
            <Text
                sx={{
                    fontSize: isPc ? "1.25vw" : "16px",
                    color: gray ? "#616161" : "#fddc2d",
                    textAlign: "center",
                }}
            >
                {time}
            </Text>
            <Box
                sx={{
                    border: gray ? "3px solid #616161" : "3px solid #FFFFFF",
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
        </Box>
    );
};

const Timer = ({ time1, time1Gray }: { time1: number; time1Gray: boolean }) => {
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
                width={(time1 / 1000 / TwelveHours) * 100 + "%"}
                time={`${hours}:${minutes}:${seconds}`}
                gray={time1Gray}
            ></BttTimer>
        </Box>
    );
};

export default Timer;
