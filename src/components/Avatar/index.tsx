import { Box, BoxProps, Flex, Image } from "@chakra-ui/react";
import React from "react";
import LBIcon from "./assets/lb.svg";
import LTIcon from "./assets/lt.svg";
import RBIcon from "./assets/rb.svg";
import RTIcon from "./assets/rt.svg";

const Avatar = ({
    img,
    sx,
    imgWidth = "52px",
    imgHeight = "52px",
    borderColor = "#fff",
}: {
    img: string;
    sx?: BoxProps["sx"];
    imgWidth?: string;
    imgHeight?: string;
    borderColor?: string;
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
                <Image
                    src={img}
                    sx={{
                        width: imgWidth,
                        height: imgHeight,
                    }}
                ></Image>
            </Flex>
            <Image
                src={LBIcon}
                sx={{
                    position: "absolute",
                    left: "0px",
                    bottom: "0px",
                }}
            ></Image>
            <Image
                src={LTIcon}
                sx={{
                    position: "absolute",
                    left: "0px",
                    top: "0px",
                }}
            ></Image>
            <Image
                src={RBIcon}
                sx={{
                    position: "absolute",
                    right: "0px",
                    bottom: "0px",
                }}
            ></Image>
            <Image
                src={RTIcon}
                sx={{
                    position: "absolute",
                    right: "0px",
                    top: "0px",
                }}
            ></Image>
        </Box>
    );
};

export default Avatar;
