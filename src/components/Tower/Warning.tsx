import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useMemo } from "react";
import RWarnIcon from "./assets/rwarn.svg";
import YWarnIcon from "./assets/ywarn.svg";
import RCountDownIcon from "./assets/r-countdown.svg";
import YCountDownIcon from "./assets/y-countdown.svg";
import RWarningIcon from "./assets/rwarning.svg";
import YWarningIcon from "./assets/ywarning.svg";

const Warning = ({
    warnType,
    timeLeft,
    onResetWarnType,
}: {
    warnType: number;
    timeLeft: number;
    onResetWarnType: () => void;
}) => {
    const { minutes, seconds } = useMemo(() => {
        const t = Math.floor(timeLeft / 1000);
        const minutes = String(Math.floor(t / 60)).padStart(2, "0");
        const seconds = String(t % 60).padStart(2, "0");
        return { minutes, seconds };
    }, [timeLeft]);

    const [WarnIcon, CountDownIcon, WarningIcon] = useMemo(() => {
        if (warnType == 1) {
            return [YWarnIcon, YCountDownIcon, YWarningIcon];
        }

        return [RWarnIcon, RCountDownIcon, RWarningIcon];
    }, [timeLeft]);

    return (
        <Flex
            sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                left: 0,
                top: 0,
                background:
                    "radial-gradient(138.67% 138.64% at 50.03% 48.38%, rgba(174, 43, 43, 0.00) 0%, rgba(174, 43, 43, 0.90) 100%)",
                zIndex: 1,
                display: warnType == 0 ? "none" : "flex",
            }}
            onClick={onResetWarnType}
            align={"center"}
            justify={"center"}
            flexDir={"column"}
        >
            <Box
                sx={{
                    width: "48px",
                    height: "100%",
                    zIndex: 3,
                    background: `url(${WarnIcon})`,
                    backgroundSize: "100% ",
                    backgroundRepeatX: "no-repeat ",
                    position: "absolute",
                    left: "0",
                    top: "0",
                }}
            ></Box>
            <Box
                sx={{
                    width: "48px",
                    height: "100%",
                    zIndex: 3,
                    background: `url(${WarnIcon})`,
                    backgroundSize: "100% ",
                    backgroundRepeatX: "no-repeat ",
                    position: "absolute",
                    right: "0",
                    top: "0",
                }}
            ></Box>
            <Box
                sx={{
                    background: `url(${CountDownIcon})`,
                    width: "248px",
                    height: "109px",
                }}
            >
                <Text
                    sx={{
                        color: "#F80404",
                        fontSize: "50px",
                        margin: "20px 0 0 80px",
                    }}
                >
                    {minutes}:{seconds}
                </Text>
            </Box>
            <Image
                src={WarningIcon}
                sx={{
                    width: "300px",
                }}
            ></Image>
        </Flex>
    );
};

export default Warning;
