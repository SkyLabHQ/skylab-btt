import React, { useMemo } from "react";
import { Box } from "@chakra-ui/react";
import BttTimer, { BufferTimer, ThirtySecond } from "./BttTimer";

const Timer = ({
    time1,
    time2,
    time1Gray,
}: {
    time1: number;
    time2: number;
    time1Gray: boolean;
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
