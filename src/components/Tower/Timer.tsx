import {
    Box,
    Flex,
    Image,
    Text,
    useMediaQuery,
    useTimeout,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import SYellowIcon from "./assets/s-yellow.png";
import SGreenIcon from "./assets/s-green.png";
import RYellowIcon from "./assets/x-yellow-r.png";
import LYellowIcon from "./assets/x-yellow-l.png";
import AmountBg from "./assets/amount-bg.png";
import HourglassIcon from "./assets/hourglass.png";

import LevelBg from "./assets/level-bg.png";
import { aviationImg } from "@/utils/aviationImg";
import {
    useMultiMercuryJarTournamentContract,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { useChainId } from "wagmi";
import NewComerBg from "./assets/newcomer-bg.png";
import { ZERO_DATA } from "@/skyConstants";
import useCountDown from "react-countdown-hook";

const Timer = ({ time }: { time: number }) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [timeLeft, { start }] = useCountDown(5000, 1000);

    useEffect(() => {
        if (time === 0) {
            start(0);
            return;
        }
        const currentTime = new Date().getTime();
        if (time * 1000 > currentTime) {
            start(time * 1000 - currentTime);
            return;
        }
        start(0);
    }, [time]);

    const { minutes, second, hour } = useMemo(() => {
        let minutes: string | number = Math.floor((timeLeft / 60000) % 60);
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }

        let second: string | number = Math.floor((timeLeft / 1000) % 60);
        if (second < 10) {
            second = `0${second}`;
        }

        let hour: string | number = Math.floor((timeLeft / 3600000) % 24);
        if (hour < 10) {
            hour = `0${hour}`;
        }

        return { minutes, second, hour };
    }, [timeLeft]);

    return (
        <Flex
            sx={{
                width: isPc ? "136px" : "80px",
                height: isPc ? "32px" : "16px",
                border: "1px solid #f2d861",
                margin: "28px auto 0",
                borderRadius: "16px",
                background: "rgba(0, 0, 0, 0.30)",
            }}
            align={"center"}
        >
            {isPc && (
                <Image
                    src={HourglassIcon}
                    sx={{
                        width: "12px",
                        margin: "0 12px",
                    }}
                ></Image>
            )}
            <Box
                sx={{
                    fontSize: isPc ? "16px" : "12px",
                    zIndex: 999,
                    textAlign: "center",
                    flex: 1,
                }}
            >
                {hour}:{minutes}:{second}
            </Box>
        </Flex>
    );
};

export default Timer;
