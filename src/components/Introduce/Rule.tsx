import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CloseIcon from "./assets/close.svg";
import CircleGif from "@/components/Introduce/assets/circle.gif";
import RBg from "./assets/r-bg.png";
import An1Icon from "./assets/an-1.svg";
import An2Icon from "./assets/an-2.svg";
import An3Icon from "./assets/an-3.svg";
import An4Icon from "./assets/an-4.svg";
import An5Icon from "./assets/an-5.svg";

import n1Icon from "./assets/n-1.svg";
import n2Icon from "./assets/n-2.svg";
import n3Icon from "./assets/n-3.svg";
import n4Icon from "./assets/n-4.svg";
import n5Icon from "./assets/n-5.svg";

import H1Icon from "./assets/h-1.png";
import H2Icon from "./assets/h-2.png";
import H3Icon from "./assets/h-3.png";
import H4Icon from "./assets/h-4.png";
import H5Icon from "./assets/h-5.png";

import { ReactComponent as BackIcon } from "./assets/back.svg";
import { ReactComponent as NextIcon } from "./assets/enter.svg";
import { BlackButton } from "./Button";
import RuleContent0 from "./RuleContent0";
import RuleContent1 from "./RuleContent1";
import RuleContent2 from "./RuleContent2";
import RuleContent3 from "./RuleContent3";
import RuleContent4 from "./RuleContent4";

const navList = [
    {
        icon: n1Icon,
        hIcon: H1Icon,
        activeIcon: An1Icon,
    },
    {
        icon: n2Icon,
        hIcon: H2Icon,
        activeIcon: An2Icon,
    },
    {
        icon: n3Icon,
        hIcon: H3Icon,
        activeIcon: An3Icon,
    },
    {
        icon: n4Icon,
        hIcon: H4Icon,
        activeIcon: An4Icon,
    },
    {
        icon: n5Icon,
        hIcon: H5Icon,
        activeIcon: An5Icon,
    },
];

const Rule = ({ onModeChange }: { onModeChange: (mode: string) => void }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <Box
            sx={{
                maxWidth: "1574px",
                width: "100%",
                margin: "0 auto",
                padding: "200px 0",
            }}
        >
            <Box
                sx={{
                    position: "relative",
                }}
            >
                <Flex
                    onClick={() => {
                        onModeChange("");
                    }}
                    sx={{
                        position: "absolute",
                        right: "0",
                        top: "20px",
                        cursor: "pointer",
                    }}
                    align={"center"}
                    flexDir={"column"}
                >
                    <Image
                        src={CloseIcon}
                        sx={{
                            width: "36px",
                            height: "36px",
                        }}
                    ></Image>
                    <Text
                        sx={{
                            color: "#FFF",
                            textAlign: "center",
                            fontFamily: "Orbitron",
                            fontSize: "30px",
                            fontWeight: 400,
                        }}
                    >
                        Esc
                    </Text>
                </Flex>
                <Text
                    sx={{
                        color: "#F2D861",
                        textAlign: "center",
                        textShadow: "#FFD000",
                        fontFamily: "Orbitron",
                        fontSize: "64px",
                        fontWeight: 700,
                    }}
                >
                    Rules
                </Text>
                <Flex
                    justify={"center"}
                    align={"flex-end"}
                    sx={{
                        gap: "50px",
                    }}
                >
                    {navList.map((item, index) => {
                        const ActiveIcon = item.activeIcon;
                        const HoverIcon = item.hIcon;
                        const Icon = item.icon;
                        return (
                            <Flex
                                key={index}
                                onClick={() => {
                                    setActiveIndex(index);
                                }}
                                flexDir={"column"}
                                justify={"flex-end"}
                                sx={{
                                    cursor: "pointer",
                                    width: "110px",
                                    height: "82px",
                                    "&:hover": {
                                        "& img": {
                                            width: "110px",
                                        },
                                        "& img:nth-child(1)": {
                                            display:
                                                activeIndex !== index && "none",
                                        },
                                        "& img:nth-child(2)": {
                                            display:
                                                activeIndex !== index &&
                                                "block",
                                        },
                                    },
                                }}
                            >
                                <Image
                                    src={
                                        activeIndex === index
                                            ? ActiveIcon
                                            : Icon
                                    }
                                ></Image>
                                <Image
                                    src={HoverIcon}
                                    sx={{
                                        display: "none",
                                    }}
                                ></Image>
                            </Flex>
                        );
                    })}
                </Flex>
                <Box
                    sx={{
                        marginTop: "30px",
                    }}
                >
                    {activeIndex === 0 && <RuleContent0></RuleContent0>}
                    {activeIndex === 1 && <RuleContent1></RuleContent1>}
                    {activeIndex === 2 && <RuleContent2></RuleContent2>}
                    {activeIndex === 3 && <RuleContent3></RuleContent3>}
                    {activeIndex === 4 && <RuleContent4></RuleContent4>}
                </Box>
                <Flex
                    sx={{
                        marginTop: "85px",
                    }}
                    justify={"flex-end"}
                >
                    {activeIndex !== 0 && (
                        <BlackButton
                            onClick={() => {
                                setActiveIndex(activeIndex - 1);
                            }}
                            sx={{
                                width: "235px",
                                height: "68px",
                                marginRight: "60px",
                                background: "transparent !important",
                            }}
                        >
                            <BackIcon
                                style={{
                                    marginRight: "24px",
                                }}
                            ></BackIcon>
                            <Text>Back</Text>
                        </BlackButton>
                    )}
                    {activeIndex !== 4 && (
                        <BlackButton
                            sx={{
                                width: "306px",
                                height: "68px",
                                background: "transparent !important",
                            }}
                            onClick={() => {
                                setActiveIndex(activeIndex + 1);
                            }}
                        >
                            <NextIcon
                                style={{ marginRight: "24px" }}
                            ></NextIcon>
                            <Text>Continue</Text>
                        </BlackButton>
                    )}
                </Flex>
            </Box>
        </Box>
    );
};

export default Rule;
