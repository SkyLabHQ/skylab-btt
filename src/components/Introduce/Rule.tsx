import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CloseIcon from "./assets/close.svg";
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

import { ReactComponent as LArrowIcon } from "./assets/l-arrow.svg";
import { ReactComponent as RArrowIcon } from "./assets/r-arrow.svg";
import { SwitchTransition, CSSTransition } from "react-transition-group";

import "./rule.css";

export const BottomButton = ({
    activeIndex,
    onChangeActiveIndex,
}: {
    activeIndex: number;
    onChangeActiveIndex: (index: number) => void;
}) => {
    return (
        <Flex
            sx={{
                marginTop: "35px",
            }}
            justify={"flex-end"}
        >
            {activeIndex !== 0 && (
                <BlackButton
                    onClick={() => {
                        onChangeActiveIndex(activeIndex - 1);
                    }}
                    sx={{
                        width: "235px",
                        height: "60px",
                        background: "transparent !important",
                    }}
                >
                    <BackIcon
                        style={{
                            marginRight: "24px",
                            width: "18px",
                        }}
                    ></BackIcon>
                    <Text>Back</Text>
                </BlackButton>
            )}
            {activeIndex !== 4 && (
                <BlackButton
                    sx={{
                        width: "235px",
                        height: "60px",
                        background: "transparent !important",
                        marginLeft: "60px",
                    }}
                    onClick={() => {
                        onChangeActiveIndex(activeIndex + 1);
                    }}
                >
                    <NextIcon
                        style={{ marginRight: "24px", width: "18px" }}
                    ></NextIcon>
                    <Text>Next</Text>
                </BlackButton>
            )}
        </Flex>
    );
};

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

    const handleActiveIndex = (index: number) => {
        setActiveIndex(index);
    };

    useEffect(() => {
        const keyboardListener = (event: KeyboardEvent) => {
            const key = event.key;
            console.log(key, "key");
            if (key === "Enter" && activeIndex !== 4) {
                handleActiveIndex(activeIndex + 1);
            } else if (key === "ArrowLeft" && activeIndex !== 0) {
                handleActiveIndex(activeIndex - 1);
            } else if (key === "Escape") {
                onModeChange("");
            }
        };
        document.addEventListener("keydown", keyboardListener);
        return () => {
            document.removeEventListener("keydown", keyboardListener);
        };
    }, [activeIndex]);
    return (
        <Box
            sx={{
                maxWidth: "800px",
                width: "100%",
                margin: "0 auto",
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
                    top: "0px",
                    cursor: "pointer",
                }}
                align={"center"}
                flexDir={"column"}
            >
                <Image
                    src={CloseIcon}
                    sx={{
                        width: "20px",
                        height: "20px",
                    }}
                ></Image>
                <Text
                    sx={{
                        color: "#FFF",
                        textAlign: "center",
                        fontFamily: "Orbitron",
                        fontSize: "18px",
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
                    fontSize: "34px",
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
                    marginTop: "60px",
                    position: "relative",
                }}
                id="top-nav"
            >
                <LArrowIcon
                    style={{
                        width: "12px",
                        position: "absolute",
                        left: "0",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: activeIndex === 0 && "#646464",
                        cursor: activeIndex === 0 ? "not-allowed" : "pointer",
                    }}
                    onClick={() => {
                        if (activeIndex !== 0) {
                            handleActiveIndex(activeIndex - 1);
                        }
                    }}
                ></LArrowIcon>
                <RArrowIcon
                    style={{
                        width: "12px",
                        position: "absolute",
                        right: "0",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: activeIndex === 4 && "#646464",
                        cursor: activeIndex === 4 ? "not-allowed" : "pointer",
                    }}
                    onClick={() => {
                        if (activeIndex !== 4) {
                            handleActiveIndex(activeIndex + 1);
                        }
                    }}
                ></RArrowIcon>

                {navList.map((item, index) => {
                    const ActiveIcon = item.activeIcon;
                    const HoverIcon = item.hIcon;
                    const Icon = item.icon;
                    return (
                        <Flex
                            key={index}
                            onClick={() => {
                                handleActiveIndex(index);
                            }}
                            flexDir={"column"}
                            justify={"flex-end"}
                            sx={{
                                cursor: "pointer",
                                width: "55px",
                                height: "40px",
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
                                            activeIndex !== index && "block",
                                    },
                                },
                            }}
                        >
                            <Image
                                src={activeIndex === index ? ActiveIcon : Icon}
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
            <SwitchTransition mode="out-in">
                <CSSTransition
                    key={activeIndex}
                    timeout={300}
                    classNames="layout-main-page"
                >
                    <Box
                        sx={{
                            marginTop: "30px",
                            "& video": {
                                border: "1px solid transparent",
                            },
                            "& video:hover": {
                                border: "1px solid #ffffff",
                            },
                        }}
                    >
                        {activeIndex === 0 && (
                            <RuleContent0
                                onChangeActiveIndex={(activeIndex: number) => {
                                    handleActiveIndex(activeIndex);
                                }}
                            ></RuleContent0>
                        )}
                        {activeIndex === 1 && (
                            <RuleContent1
                                onChangeActiveIndex={(activeIndex: number) => {
                                    handleActiveIndex(activeIndex);
                                }}
                            ></RuleContent1>
                        )}
                        {activeIndex === 2 && (
                            <RuleContent2
                                onChangeActiveIndex={(activeIndex: number) => {
                                    handleActiveIndex(activeIndex);
                                }}
                            ></RuleContent2>
                        )}
                        {activeIndex === 3 && (
                            <RuleContent3
                                onChangeActiveIndex={(activeIndex: number) => {
                                    handleActiveIndex(activeIndex);
                                }}
                            ></RuleContent3>
                        )}
                        {activeIndex === 4 && (
                            <RuleContent4
                                onChangeActiveIndex={(activeIndex: number) => {
                                    handleActiveIndex(activeIndex);
                                }}
                            ></RuleContent4>
                        )}
                    </Box>
                </CSSTransition>
            </SwitchTransition>
        </Box>
    );
};

export default Rule;
