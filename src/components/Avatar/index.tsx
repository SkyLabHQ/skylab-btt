import { Box, BoxProps, Flex, Image } from "@chakra-ui/react";
import React from "react";
import { ReactComponent as LBIcon } from "./assets/lb.svg";
import { ReactComponent as LTIcon } from "./assets/lt.svg";
import { ReactComponent as RBIcon } from "./assets/rb.svg";
import { ReactComponent as RTIcon } from "./assets/rt.svg";

const Avatar = ({
    sx,
    borderColor = "#fff",
    hornColor = "#fff",
    hornSize = "15px",
    children,
    onClick,
}: {
    sx?: BoxProps["sx"];
    borderColor?: string;
    hornColor?: string;
    hornSize?: string;
    children?: React.ReactNode;
    onClick?: () => void;
}) => {
    return (
        <Box
            sx={{
                width: "52px",
                height: "52px",
                position: "relative",
                padding: "2px",
                ...sx,
            }}
            onClick={onClick}
        >
            <Flex
                sx={{
                    width: "100%",
                    height: "100%",
                    border: "1px solid ",
                    borderColor: borderColor,
                }}
                align={"center"}
                justify={"center"}
            >
                {children}
            </Flex>
            <LBIcon
                style={{
                    position: "absolute",
                    left: "0px",
                    bottom: "0px",
                    width: hornSize,
                    color: hornColor,
                }}
            ></LBIcon>
            <LTIcon
                style={{
                    position: "absolute",
                    left: "0px",
                    top: "0px",
                    width: hornSize,

                    color: hornColor,
                }}
            ></LTIcon>
            <RBIcon
                style={{
                    position: "absolute",
                    right: "0px",
                    bottom: "0px",
                    width: hornSize,

                    color: hornColor,
                }}
            ></RBIcon>
            <RTIcon
                style={{
                    position: "absolute",
                    right: "0px",
                    top: "0px",
                    width: hornSize,

                    color: hornColor,
                }}
            ></RTIcon>
        </Box>
    );
};

export default Avatar;
