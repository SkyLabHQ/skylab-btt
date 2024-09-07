import { Box, Image, keyframes, Text, Flex } from "@chakra-ui/react";
import CircleGif from "@/components/Introduce/assets/circle.gif";
import Quan1 from "@/components/Introduce/assets/quan-1.png";
import Quan2 from "@/components/Introduce/assets/quan-2.png";
import Quan3 from "@/components/Introduce/assets/quan-3.png";
import Quan4 from "@/components/Introduce/assets/quan-4.png";
import Quan5 from "@/components/Introduce/assets/quan-5.png";
import Quan6 from "@/components/Introduce/assets/quan-6.png";
import { useState } from "react";
import OnIcon from "@/components/Introduce/assets/on-icon.svg";
import Info from "@/components/Introduce/Info";
import Light from "@/components/Introduce/assets/light.png";
import LightC from "@/components/Introduce/assets/light-c.svg";
import { BlackButton } from "./Button";
import { ReactComponent as ShiftAIcon } from "./assets/shifta.svg";
import { ReactComponent as ShiftEIcon } from "./assets/shifte.svg";
import { ReactComponent as NextIcon } from "./assets/enter.svg";
import OffIcon from "@/components/Introduce/assets/off-icon.svg";
import TitleOnIcon from "./assets/Title-On.png";
import TitleOffIcon from "./assets/Title-Off.png";
import TitleOnLIcon from "./assets/Title-Off-L.png";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";

const OnButton = ({
    wMode,
    onClick,
}: {
    wMode: boolean;
    onClick?: () => void;
}) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");

    return (
        <Flex
            sx={{
                width: isPc ? "140px" : "88px",
            }}
            flexDir={"column"}
            align={"center"}
        >
            <Box
                onClick={onClick}
                sx={{
                    width: isPc ? "124px" : "80px",
                    height: isPc ? "48px" : "32px",
                    border: "2px solid",
                    borderImage: wMode
                        ? "#fff 1"
                        : "linear-gradient(to right, #FF0000, #FF6B00, #FFE500, #61FF00, #00FFF0, #0057FF, #AD00FF) 1",
                    padding: isPc ? "4px" : "6px",
                    cursor: "pointer",
                    overflow: "hidden",
                }}
            >
                <Flex
                    sx={{
                        width: isPc ? "160px" : "120px",
                        position: "relative",
                        left: wMode ? "0" : isPc ? "-48px" : "-24px",
                        transition: "all 0.5s",
                    }}
                    align={"center"}
                >
                    <Image
                        src={OnIcon}
                        sx={{
                            width: isPc ? "36px" : "18px",
                            height: isPc ? "36px" : "18px",
                        }}
                    ></Image>
                    <ShiftAIcon
                        style={{
                            width: isPc ? "60px" : "40px",
                            margin: isPc ? "0 16px" : "0 8px",
                            height: isPc ? "23px" : "18px",
                        }}
                    ></ShiftAIcon>
                    <Image
                        src={OffIcon}
                        sx={{
                            width: isPc ? "36px" : "18px",
                            height: isPc ? "36px" : "18px",
                        }}
                    ></Image>
                </Flex>
            </Box>{" "}
            {wMode ? (
                <Text
                    sx={{
                        color: "#FFF",
                        fontSize: isPc ? "14px" : "12px",
                        textAlign: "center",
                        marginTop: isPc ? "8px" : "4px",
                    }}
                >
                    Monochrome
                </Text>
            ) : (
                <Text
                    sx={{
                        color: "#FFF",
                        fontSize: isPc ? "14px" : "12px",
                        textAlign: "center",
                        marginTop: isPc ? "8px" : "4px",
                        fontWeight: 700,
                        backgroundImage:
                            "linear-gradient(to right, #FF0000, #FF6B00, #FFE500, #61FF00, #00FFF0, #0057FF, #AD00FF) 1",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    Color
                </Text>
            )}
        </Flex>
    );
};

const quanList = [
    {
        img: Quan1,
        width: "30%",
        activeWidth: "36%",
    },
    {
        img: Quan2,
        width: "38%",
        activeWidth: "44%",
    },
    {
        img: Quan3,
        width: "46%",
        activeWidth: "52%",
    },
    {
        img: Quan4,
        width: "54%",
        activeWidth: "60%",
    },
    {
        img: Quan5,
        width: "62%",
        activeWidth: "68%",
    },
    {
        img: Quan6,
        width: "70%",
        activeWidth: "76%",
    },
];

const mquanList = [
    {
        img: Quan1,
        width: "52%",
        activeWidth: "56%",
    },
    {
        img: Quan2,
        width: "60%",
        activeWidth: "65%",
    },
    {
        img: Quan3,
        width: "69%",
        activeWidth: "74%",
    },
    {
        img: Quan4,
        width: "78%",
        activeWidth: "83%",
    },
    {
        img: Quan5,
        width: "87%",
        activeWidth: "92%",
    },
    {
        img: Quan6,
        width: "96%",
        activeWidth: "101%",
    },
];

const move = keyframes`
    0% {
        transform: translate(-50%, -50%) rotate(0deg);
    }
    
    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
`;

const move1 = keyframes`
    0% {
        transform: translate(-50%, -50%) rotate(360deg);
    }

    100% {
        transform: translate(-50%, -50%) rotate(0deg);
    }
`;
const IntroduceContent = ({
    wMode,
    onThemeChange,
    onModeChange,
}: {
    wMode: boolean;
    onModeChange: (mode: string) => void;
    onThemeChange: () => void;
}) => {
    const [addCount, setAddCount] = useState(0);
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");

    const handleDownTo0 = (addCount: number) => {
        if (addCount > 0) {
            setTimeout(() => {
                setAddCount((_addCount) => {
                    return _addCount - 1;
                });
                handleDownTo0(addCount - 1);
            }, 200);
        }
    };
    return (
        <Flex
            sx={{
                width: "100%",
            }}
            flexDir={"column"}
            align={"center"}
        >
            <Box
                sx={{
                    width: "100%",
                    height: isPc ? "100vh" : "100vw",
                    position: "relative",
                    overflow: "hidden",
                    "& *": {
                        transition: "all 0.5s",
                    },
                }}
            >
                <Box
                    sx={{
                        display: wMode ? "none" : "block",
                    }}
                >
                    {(isPc ? quanList : mquanList).map((item, index) => {
                        return (
                            <Image
                                src={item.img}
                                key={index}
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    width:
                                        addCount > index
                                            ? item.activeWidth
                                            : item.width,
                                    opacity: addCount > index ? 1 : 0,
                                }}
                                animation={`${
                                    index % 2 == 0 ? move : move1
                                } 20s linear infinite`}
                            ></Image>
                        );
                    })}
                </Box>

                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: isPc ? "26%" : "44%",
                        aspectRatio: 1,
                        zIndex: 1,
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        if (addCount >= quanList.length) {
                            handleDownTo0(addCount);
                            return;
                        }
                        setAddCount(addCount + 1);
                    }}
                >
                    <Image
                        src={CircleGif}
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "100%",
                            cursor: "pointer",
                            height: "100%",
                            display: wMode ? "none" : "block",
                        }}
                    ></Image>
                    {wMode && (
                        <Image
                            src={TitleOffIcon}
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: "100%",
                            }}
                        ></Image>
                    )}
                    {!wMode && (
                        <Box
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: "100%",
                                zIndex: 11,
                                "&:hover ": {
                                    "& img:nth-child(1)": {
                                        display: "none",
                                    },
                                    "& img:nth-child(2)": {
                                        display: "block",
                                    },
                                },
                            }}
                        >
                            <Image src={TitleOnIcon}></Image>
                            <Image
                                src={TitleOnLIcon}
                                sx={{
                                    display: "none",
                                }}
                            ></Image>
                        </Box>
                    )}
                </Box>

                <Box
                    sx={{
                        position: "absolute",
                        right: isPc ? "24px" : "12px",
                        top: isPc ? "24px" : "16px",
                    }}
                >
                    <OnButton
                        wMode={wMode}
                        onClick={() => {
                            onThemeChange();
                            setAddCount(0);
                        }}
                    ></OnButton>
                </Box>
                <Flex
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        opacity: wMode ? 0 : 1,
                    }}
                    flexDir={"column"}
                    align={"center"}
                >
                    <Image
                        src={Light}
                        sx={{
                            width: "60%",
                            marginTop: "1vw",
                        }}
                    ></Image>
                    <Image
                        src={LightC}
                        sx={{
                            marginTop: "-1vw",
                            width: "7%",
                            opacity: 0.5,
                        }}
                    ></Image>
                </Flex>
            </Box>

            <Flex
                sx={{
                    fontSize: isPc ? "32px" : "16px",
                    gap: isPc ? "100px" : "20px",
                    marginTop: "3vw",
                }}
                justify={"center"}
            >
                <BlackButton
                    onClick={() => {
                        onModeChange("rules");
                    }}
                    sx={{
                        width: isPc ? "250px" : "120px",
                        height: isPc ? "60px" : "25px",
                    }}
                >
                    {isPc && (
                        <NextIcon
                            style={{
                                width: isPc ? "18px" : "14px",
                                marginRight: "20px",
                            }}
                        ></NextIcon>
                    )}
                    <Text>Rules</Text>
                </BlackButton>
                <BlackButton
                    onClick={() => {
                        onModeChange("schedule");
                    }}
                    sx={{
                        width: isPc ? "250px" : "120px",
                        height: isPc ? "60px" : "25px",
                    }}
                >
                    {isPc && (
                        <ShiftEIcon
                            style={{
                                width: isPc ? "60px" : "45px",
                                marginRight: isPc ? "20px" : "10px",
                            }}
                        ></ShiftEIcon>
                    )}
                    <Text>Schedule</Text>
                </BlackButton>
            </Flex>
            <Info></Info>
        </Flex>
    );
};

export default IntroduceContent;
