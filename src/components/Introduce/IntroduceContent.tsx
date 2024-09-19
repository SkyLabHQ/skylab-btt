import { Box, Image, keyframes, Text, Flex } from "@chakra-ui/react";
import CircleGif from "@/components/Introduce/assets/circle.gif";
import Quan1 from "@/components/Introduce/assets/quan-1.png";
import Quan2 from "@/components/Introduce/assets/quan-2.png";
import Quan3 from "@/components/Introduce/assets/quan-3.png";
import Quan4 from "@/components/Introduce/assets/quan-4.png";
import Quan5 from "@/components/Introduce/assets/quan-5.png";
import Quan6 from "@/components/Introduce/assets/quan-6.png";
import { useEffect, useState } from "react";
import OnIcon from "@/components/Introduce/assets/on-icon.svg";
import Info from "@/components/Introduce/Info";
import Light from "@/components/Introduce/assets/light.png";
import LightC from "@/components/Introduce/assets/light-c.svg";

import { BlackButton } from "./Button";
import { ReactComponent as ShiftAIcon } from "./assets/shifta.svg";
import { ReactComponent as ShiftEIcon } from "./assets/shifte.svg";
import { ReactComponent as ShiftEnIcon } from "./assets/shiften.svg";
import { ReactComponent as NextIcon } from "./assets/enter.svg";

import ClickIcon from "./assets/click.png";

import OffIcon from "@/components/Introduce/assets/off-icon.svg";
import TitleOnIcon from "./assets/Title-On.png";
import TitleOffIcon from "./assets/Title-Off.png";
import TitleOnLIcon from "./assets/Title-Off-L.png";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";
import LeftIcon from "./assets/left.svg";

const OnButton = ({
    wMode,
    onClick,
}: {
    wMode: boolean;
    onClick?: () => void;
}) => {
    const [isClicked, setIsClicked] = useState(false);
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");

    useEffect(() => {
        const localClicked = localStorage.getItem("isClicked");
        if (localClicked) {
            setIsClicked(true);
        }
    }, []);

    return (
        <Flex
            sx={{
                width: isPc ? "140px" : "88px",
            }}
            flexDir={"column"}
            align={"center"}
        >
            <Box
                sx={{
                    position: "relative",
                }}
            >
                <Box
                    onClick={() => {
                        localStorage.setItem("isClicked", "true");
                        setIsClicked(true);
                        onClick();
                    }}
                    sx={{
                        width: isPc ? "124px" : "80px",
                        height: isPc ? "48px" : "32px",
                        border: "2px solid",
                        borderImage: !wMode
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
                            left: !wMode ? "0" : isPc ? "-48px" : "-24px",
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
                        {isPc ? (
                            <ShiftAIcon
                                style={{
                                    width: "60px",
                                    margin: "0 16px",
                                    height: "23px",
                                }}
                            ></ShiftAIcon>
                        ) : (
                            <Image
                                src={ClickIcon}
                                sx={{
                                    width: "38px",
                                    margin: "0 11px",
                                }}
                            ></Image>
                        )}
                        <Image
                            src={OffIcon}
                            sx={{
                                width: isPc ? "36px" : "18px",
                                height: isPc ? "36px" : "18px",
                            }}
                        ></Image>
                    </Flex>
                </Box>
                {!isClicked && (
                    <Flex
                        sx={{
                            position: "absolute",
                            top: "50%",
                            right: "-60px",
                            fontSize: "12px",
                            color: "#FFF",
                            animationDirection: "alternate",
                        }}
                        animation={`${arrow} 1s linear infinite`}
                        align={"center"}
                    >
                        <Image
                            src={LeftIcon}
                            sx={{
                                width: "8px",
                                marginRight: "4px",
                            }}
                        ></Image>
                        <Text
                            sx={{
                                color: "#F2D861",
                            }}
                        >
                            Click
                        </Text>
                    </Flex>
                )}
            </Box>

            {!wMode ? (
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
        width: "450px",
        activeWidth: "510px",
    },
    {
        img: Quan2,
        width: "500px",
        activeWidth: "610px",
    },
    {
        img: Quan3,
        width: "660px",
        activeWidth: "710px",
    },
    {
        img: Quan4,
        width: "760px",
        activeWidth: "810px",
    },
    {
        img: Quan5,
        width: "860px",
        activeWidth: "910px",
    },
    {
        img: Quan6,
        width: "960px",
        activeWidth: "1010px",
    },
];

const mquanList = [
    {
        img: Quan1,
        width: "170px",
        activeWidth: "185px",
    },
    {
        img: Quan2,
        width: "195px",
        activeWidth: "220px",
    },
    {
        img: Quan3,
        width: "230px",
        activeWidth: "255px",
    },
    {
        img: Quan4,
        width: "275px",
        activeWidth: "290px",
    },
    {
        img: Quan5,
        width: "300px",
        activeWidth: "325px",
    },
    {
        img: Quan6,
        width: "335px",
        activeWidth: "360px",
    },
];

const arrow = keyframes`
    0% {
        transform: translate(0%,-50%);
    }

    50% {
        transform: translate(10%,-50%);
    }
    
    100% {
        transform: translate(20%,-50%);
    }
`;

const playBt = keyframes`
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }


`;

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
                    position: "relative",
                    overflowX: "hidden",
                }}
            >
                <Box
                    sx={{
                        width: isPc ? "400px" : "140px",
                        height: isPc ? "400px" : "140px",
                        position: "relative",
                        margin: isPc ? "320px auto 0 " : "100px auto 0",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            aspectRatio: 1,
                            zIndex: 1,
                            cursor: wMode ? "default" : "pointer",
                            position: "absolute",
                        }}
                        onClick={() => {
                            if (wMode) return;

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
                                transition: "all 0.5s",

                                width: "100%",
                                cursor: "pointer",
                                // display: wMode ? "none" : "block",
                                // opacity: wMode ? 0 : 1,
                                opacity: wMode ? 0 : 1,
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
                                        "& img:nth-of-type(1)": {
                                            display: "none",
                                        },
                                        "& img:nth-of-type(2)": {
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
                                    transition: "all 0.5s",

                                    width:
                                        addCount > index
                                            ? item.activeWidth
                                            : item.width,
                                    maxWidth:
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
                <Flex
                    flexDir={"column"}
                    align={"center"}
                    sx={{
                        marginTop: isPc ? "-120px" : "-70px",
                    }}
                >
                    <Image
                        src={Light}
                        sx={{
                            width: isPc ? "400px" : "200px",
                            opacity: wMode ? 0 : 1,
                        }}
                    ></Image>{" "}
                    <Image
                        src={LightC}
                        sx={{
                            marginTop: "-20px",
                            width: isPc ? "100px" : "40px",
                            opacity: wMode ? 0 : 1,
                        }}
                    ></Image>
                    <Box
                        sx={{
                            marginTop: "20px",
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
                        justify={"center"}
                        align={"center"}
                        onClick={() => {
                            onModeChange("play");
                        }}
                        sx={{
                            width: isPc ? "250px" : "130px",
                            height: isPc ? "60px" : "25px",
                            background: "#FFF",
                            boxShadow:
                                "0px 0px 17px 0px rgba(255, 246, 166, 0.84)",
                            color: "#1b1b1b",
                            fontSize: isPc ? "18px" : "12px",
                            fontWeight: 700,
                            marginTop: isPc ? "40px" : "20px",
                            cursor: "pointer",
                            zIndex: 10,
                        }}
                        animation={`${playBt} 0.5s linear infinite`}
                    >
                        {isPc && (
                            <NextIcon
                                style={{
                                    width: isPc ? "18px" : "14px",
                                    marginRight: "20px",
                                }}
                            ></NextIcon>
                        )}

                        <Text>How to play</Text>
                    </Flex>
                </Flex>
                <Flex
                    sx={{
                        fontSize: isPc ? "32px" : "16px",
                        gap: isPc ? "100px" : "20px",
                        marginTop: isPc ? "57px" : "30px",
                    }}
                    justify={"center"}
                >
                    <BlackButton
                        onClick={() => {
                            onModeChange("rules");
                        }}
                        sx={{
                            width: isPc ? "270px" : "130px",
                            height: isPc ? "60px" : "25px",
                        }}
                    >
                        {isPc && (
                            <ShiftEnIcon
                                style={{
                                    width: isPc ? "80px" : "40px",
                                    height: isPc ? "26px" : "13px",
                                    marginRight: "10px",
                                }}
                            ></ShiftEnIcon>
                        )}
                        <Text>Detailed Rules</Text>
                    </BlackButton>
                    <BlackButton
                        onClick={() => {
                            onModeChange("schedule");
                        }}
                        sx={{
                            width: isPc ? "270px" : "130px",
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
            </Box>
        </Flex>
    );
};

export default IntroduceContent;
