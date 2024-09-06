import { Box, BoxProps, Image, Text } from "@chakra-ui/react";
import React from "react";
import BorderBg from "./assets/border.png";
import styled from "@emotion/styled";
import { ReactComponent as LBorder } from "./assets/l-border.svg";
import { ReactComponent as RBorder } from "./assets/r-border.svg";
import CIcon from "./assets/c-icon.svg";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";
import LastIcon from "./assets/last.svg";

const RuleWrapStyle = styled(Box)`
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 20px;
    letter-spacing: 1px;
    background-image: url(${BorderBg});
    position: relative;
    line-height: 1.6;
    font-size: 12px;
`;

const RuleWrap = (props: BoxProps) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");

    return (
        <RuleWrapStyle {...props}>
            <LBorder
                style={{
                    position: "absolute",
                    left: isPc ? "-4px" : "-2px",
                    top: isPc ? "-4px" : "-2px",
                    height: "40%",
                    width: "auto",
                    maxHeight: isPc ? "50px" : "14px",
                }}
            ></LBorder>
            <RBorder
                style={{
                    position: "absolute",
                    right: isPc ? "-4px" : "-2px",
                    bottom: isPc ? "-4px" : "-2px",
                    height: "40%",
                    width: "auto",
                    maxHeight: isPc ? "50px" : "14px",
                }}
            ></RBorder>
            {props.children}
        </RuleWrapStyle>
    );
};

export const CircleContent = ({ text }: { text: React.ReactNode }) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");

    return (
        <Box
            sx={{
                paddingLeft: "30px",
                position: "relative",
                marginTop: isPc ? "16px" : "8px",
            }}
        >
            <Image
                src={CIcon}
                sx={{
                    position: "absolute",
                    left: "0px",
                    top: "6px",
                    width: "14px",
                }}
            ></Image>
            <Text>{text}</Text>
        </Box>
    );
};

export const LastPlane = ({ text }: { text?: string }) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");

    return (
        <Box
            sx={{
                display: "inline-block",
                background: "#F2D861",
                color: "#000",
                position: "relative",
                padding: "0 2px",
                lineHeight: 1,
            }}
        >
            {text || "Last Plane"}
            <Image
                src={LastIcon}
                sx={{
                    position: "absolute",
                    right: "0px",
                    top: isPc ? "-12px" : "-8px",
                    width: isPc ? "20px" : "12px",
                }}
            ></Image>
        </Box>
    );
};

export default RuleWrap;
