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
import OnTextIcon from "./assets/ON.svg";
import { ReactComponent as ShiftEIcon } from "./assets/shifte.svg";
import { ReactComponent as NextIcon } from "./assets/enter.svg";
import OffIcon from "@/components/Introduce/assets/off-icon.svg";
import OffTextIcon from "@/components/Introduce/assets/OFF.svg";

const OnButton = ({ onClick }: { onClick?: () => void }) => {
    return (
        <Flex
            onClick={onClick}
            align={"center"}
            sx={{
                width: "182px",
                height: "48px",
                borderRadius: "12px",
                border: "2px solid #FFF",
                padding: "6px",
                cursor: "pointer",
            }}
            justify={"space-between"}
        >
            <Image
                src={OnIcon}
                sx={{
                    width: "36px",
                }}
            ></Image>
            <ShiftAIcon
                style={{
                    width: "60px",
                }}
            ></ShiftAIcon>
            <Image
                src={OnTextIcon}
                sx={{
                    width: "40px",
                }}
            ></Image>
        </Flex>
    );
};

const OffButton = ({ onClick }: { onClick?: () => void }) => {
    return (
        <Flex
            onClick={onClick}
            align={"center"}
            sx={{
                width: "182px",
                height: "48px",
                borderRadius: "12px",
                border: "2px solid #FFF",
                padding: "6px",
                cursor: "pointer",
            }}
            justify={"space-between"}
        >
            <ShiftAIcon
                style={{
                    width: "60px",
                }}
            ></ShiftAIcon>
            <Image
                src={OffTextIcon}
                sx={{
                    width: "40px",
                }}
            ></Image>
            <Image
                src={OffIcon}
                sx={{
                    width: "36px",
                }}
            ></Image>
        </Flex>
    );
};
const quanList = [
    {
        img: Quan1,
        width: "32%",
        activeWidth: "37%",
    },
    {
        img: Quan2,
        width: "40%",
        activeWidth: "47%",
    },
    {
        img: Quan3,
        width: "50%",
        activeWidth: "57%",
    },
    {
        img: Quan4,
        width: "60%",
        activeWidth: "67%",
    },
    {
        img: Quan5,
        width: "70%",
        activeWidth: "77%",
    },
    {
        img: Quan6,
        width: "80%",
        activeWidth: "87%",
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
                    height: "100vw",
                    position: "relative",
                    overflow: "hidden",
                    "& *": {
                        transition: "all 0.5s",
                    },
                }}
            >
                {quanList.map((item, index) => {
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
                <Image
                    onClick={() => {
                        if (addCount >= quanList.length) {
                            handleDownTo0(addCount);
                            return;
                        }
                        setAddCount(addCount + 1);
                    }}
                    src={CircleGif}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "26%",
                        zIndex: 10,
                        cursor: "pointer",
                    }}
                ></Image>
                <Flex
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translateX(-50%)",
                    }}
                    flexDir={"column"}
                    align={"center"}
                >
                    <Image
                        src={Light}
                        sx={{
                            width: "80%",
                        }}
                    ></Image>
                    <Image
                        src={LightC}
                        sx={{
                            marginTop: "-4vw",
                            width: "40%",
                        }}
                    ></Image>
                    <Box
                        sx={{
                            marginTop: "80px",
                        }}
                    >
                        {!wMode ? (
                            <OnButton
                                onClick={() => {
                                    onThemeChange();
                                }}
                            ></OnButton>
                        ) : (
                            <OffButton
                                onClick={() => {
                                    onThemeChange();
                                }}
                            ></OffButton>
                        )}
                    </Box>
                </Flex>
            </Box>

            <Flex
                sx={{
                    fontSize: "32px",
                    gap: "100px",
                    marginTop: "2.6042vw",
                }}
                justify={"center"}
            >
                <BlackButton
                    onClick={() => {
                        onModeChange("rules");
                    }}
                    sx={{
                        width: "250px",
                        height: "60px",
                    }}
                >
                    <NextIcon
                        style={{
                            width: "18px",
                            marginRight: "20px",
                        }}
                    ></NextIcon>
                    <Text
                        sx={{
                            fontSize: "18px",
                        }}
                    >
                        Rules
                    </Text>
                </BlackButton>
                <BlackButton
                    onClick={() => {
                        onModeChange("schedule");
                    }}
                    sx={{
                        width: "250px",
                        height: "60px",
                    }}
                >
                    <ShiftEIcon
                        style={{
                            width: "60px",
                            marginRight: "20px",
                        }}
                    ></ShiftEIcon>
                    <Text
                        sx={{
                            fontSize: "18px",
                        }}
                    >
                        Schedule
                    </Text>
                </BlackButton>
            </Flex>
            <Info></Info>
        </Flex>
    );
};

export default IntroduceContent;
