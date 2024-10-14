import { Box, Flex, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import RWarnIcon from "./assets/rwarn.svg";
import YWarnIcon from "./assets/ywarn.png";
import RCountDownIcon from "./assets/r-countdown.svg";
import YCountDownIcon from "./assets/y-countdown.png";
import { ReactComponent as WarningIcon } from "./assets/rwarning.svg";
import Countdown from "react-countdown";
import { Newcomer } from ".";

const Warning = ({
    oldNewcomer,
    warnType,
    onResetWarnType,
}: {
    oldNewcomer: Newcomer;
    warnType: number;
    onResetWarnType: () => void;
}) => {
    const [WarnIcon, CountDownIcon, color] = useMemo(() => {
        if (warnType == 1) {
            return [YWarnIcon, YCountDownIcon, "#B69601"];
        }

        return [RWarnIcon, RCountDownIcon, "#F80505"];
    }, [warnType]);

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
            {oldNewcomer && (
                <Box
                    sx={{
                        background: `url(${CountDownIcon})`,
                        width: "248px",
                        height: "109px",
                        backgroundSize: "100% 100%",
                    }}
                >
                    <Countdown
                        key={oldNewcomer.claimTIme}
                        zeroPadTime={2}
                        date={oldNewcomer.claimTIme * 1000}
                        renderer={({ formatted }) => (
                            <Text
                                sx={{
                                    color: color,
                                    fontSize: "50px",
                                    margin: "20px 0 0 80px",
                                }}
                                align={"center"}
                            >
                                <span>
                                    {formatted.minutes}:{formatted.seconds}
                                </span>
                            </Text>
                        )}
                    />
                </Box>
            )}
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
