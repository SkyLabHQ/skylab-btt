import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import WarnIcon from "./assets/warn.svg";
import RCountDown from "./assets/r-countdown.svg";
import WarningIcon from "./assets/warning.svg";

const Warning = () => {
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
                pointerEvents: "none",
                zIndex: 1,
            }}
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
                    background: `url(${RCountDown})`,
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
                    00:77
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
