import React, { useMemo } from "react";
import { Box, Text } from "@chakra-ui/react";
import { TwelveHours } from "@/skyConstants/bttGameTypes";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";

const Timer = ({
    time1,
    time1Gray,
    allTime,
}: {
    time1: number;
    time1Gray: boolean;
    allTime?: number;
}) => {
    const [isGreaterThan1300] = useSkyMediaQuery("(min-width: 1300px)");
    const [isGreaterThan800] = useSkyMediaQuery("(min-width: 800px)");
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
                        fontSize: isGreaterThan800 ? "24px" : "16px",
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
                        borderWidth: isGreaterThan800 ? "3px" : "2px",
                        width: isGreaterThan1300
                            ? "550px"
                            : isGreaterThan800
                            ? "360px"
                            : "260px",
                        background: "transparent",
                        height: isGreaterThan800 ? "24px" : "12px",
                        display: "flex",
                        justifyContent: "flex-end",
                        padding: isGreaterThan800 ? "2px" : "1px",
                        borderRadius: isGreaterThan800 ? "10px" : "8px",
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
                            borderRadius: isGreaterThan800 ? "10px" : "8px",
                        }}
                    ></Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Timer;
