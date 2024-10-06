import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";
import {
    Box,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Text,
    Image,
    keyframes,
} from "@chakra-ui/react";
import React from "react";
import { ReactComponent as BorderBg } from "./assets/border.svg";
import WLight from "./assets/w-light.svg";
import TutorialIcon from "@/assets/tutorial.svg";
import ApyUpIcon from "@/assets/apy-up.svg";
import A1 from "./assets/a1.png";
import { LButton } from "../Button/Index";
import WL from "./assets/w-l.svg";
import YL from "./assets/y-l.svg";
import WE from "./assets/w-e.svg";
import YE from "./assets/y-e.svg";
import XP from "@/assets/xp.svg";
import TutorirlIcon from "@/assets/tutorial.svg";

const rotateKeyframes = keyframes`
    0% {
        transform: rotate(0deg);
     }
    100% {
        transform: rotate(360deg);
     }
`;

const LineCircleWrap = ({
    sx,
    children,
}: {
    children: React.ReactNode;

    sx?: any;
}) => {
    return (
        <Flex
            sx={{
                width: "168px",
                height: "168px",
                position: "relative",
                ...sx,
                "&:hover": {
                    ".n-l": {
                        background: `url(${YL})`,
                    },
                    ".xx": {
                        svg: {
                            color: "#F2D861",
                        },
                    },
                    ".eth": {
                        background: `url(${YE})`,
                    },
                    ".amount": {
                        color: "#F2D861",
                    },
                },
            }}
            align={"center"}
            justify={"center"}
        >
            <Box
                className="xx"
                sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    left: "0",
                    top: "0",
                }}
                animation={`${rotateKeyframes} 8s linear infinite `}
            >
                <BorderBg
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                ></BorderBg>
            </Box>
            <Flex
                className="n-l"
                sx={{
                    width: "140px",
                    height: "140px",
                    borderRadius: "50%",
                    background: `url(${WL})`,
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%,-50%)",
                }}
                align={"center"}
                justify={"center"}
                flexDir={"column"}
            >
                {children}
            </Flex>
        </Flex>
    );
};

export default LineCircleWrap;
