import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useMemo } from "react";
import RWarnIcon from "./assets/rwarn.svg";
import YWarnIcon from "./assets/ywarn.png";
import RCountDownIcon from "./assets/r-countdown.svg";
import YCountDownIcon from "./assets/y-countdown.png";
import { ReactComponent as WarningIcon } from "./assets/rwarning.svg";

const Warning = ({
    minutes,
    seconds,
    warnType,
    timeLeft,
    onResetWarnType,
}: {
    minutes: string;
    seconds: string;
    warnType: number;
    timeLeft: number;
    onResetWarnType: () => void;
}) => {
    const [WarnIcon, CountDownIcon, color] = useMemo(() => {
        if (warnType == 1) {
            return [YWarnIcon, YCountDownIcon, "#B69601"];
        }

        return [RWarnIcon, RCountDownIcon, "#F80505"];
    }, [timeLeft, warnType]);

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
                    backgroundSize: "100% 100%",
                }}
            >
                <Text
                    sx={{
                        color: color,
                        fontSize: "50px",
                        margin: "20px 0 0 80px",
                    }}
                >
                    {minutes}:{seconds}
                </Text>
            </Box>
            <WarningIcon
                style={{
                    width: "300px",
                    color: color,
                }}
            ></WarningIcon>
        </Flex>
    );
};

export default Warning;
