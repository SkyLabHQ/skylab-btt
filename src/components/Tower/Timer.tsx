import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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
const Timer = () => {
    return (
        <Flex
            sx={{
                width: "136px",
                height: "32px",
                border: "1px solid #f2d861",
                margin: "28px auto 0",
                borderRadius: "16px",
                background: "rgba(0, 0, 0, 0.30)",
            }}
            align={"center"}
        >
            <Image
                src={HourglassIcon}
                sx={{
                    width: "12px",
                    margin: "0 12px",
                }}
            ></Image>
            <Box
                sx={{
                    fontSize: "16px",
                    zIndex: 999,
                }}
            >
                00:14:14
            </Box>
        </Flex>
    );
};

export default Timer;
