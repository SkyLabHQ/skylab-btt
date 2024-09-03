import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";
import BorderBg from "./assets/border.png";
import styled from "@emotion/styled";
import { ReactComponent as LBorder } from "./assets/l-border.svg";
import { ReactComponent as RBorder } from "./assets/r-border.svg";
const RuleWrapStyle = styled(Box)`
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 20px;
    letter-spacing: 4px;
    background-image: url(${BorderBg});
    position: relative;
    line-height: 25px;
    font-size: 12px;
`;

const RuleWrap = (props: BoxProps) => {
    return (
        <RuleWrapStyle {...props}>
            <LBorder
                style={{
                    position: "absolute",
                    left: "-4px",
                    top: "-4px",
                    height: "40%",
                    width: "auto",
                    maxHeight: "50px",
                }}
            ></LBorder>
            <RBorder
                style={{
                    position: "absolute",
                    right: "-4px",
                    bottom: "-4px",
                    height: "40%",
                    width: "auto",
                    maxHeight: "50px",
                }}
            ></RBorder>
            {props.children}
        </RuleWrapStyle>
    );
};

export default RuleWrap;
