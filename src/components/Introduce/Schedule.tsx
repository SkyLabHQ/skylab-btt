import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import CloseIcon from "./assets/close.svg";
import CircleGif from "@/components/Introduce/assets/circle.gif";
import CircleYGif from "@/components/Introduce/assets/circle-y.gif";
import BtBg from "./assets/bt-bg.png";
import Line from "./assets/line.png";

import SBg from "./assets/s-bg.png";

const sList = [
    {
        title: "SETUP",
        list: [
            {
                title: "Act I: Prelude",
                des: "League leaders reveal. Paper airdrops claim opens.",
            },
            {
                title: "Act II: Outbreak",
                des: "Limited paper pre-sale begins. Get yours before they run out.",
            },
            {
                title: "Act III: Escalation",
                des: "The War of Influence Game begins. Paper folding and Paper Plane minting starts. Timers start ticking and Bid Tac Toe Battles begin.",
            },
        ],
    },
    {
        title: "CONFLICT",
        list: [
            {
                title: "Act IV: Stalemate",
                des: "Any timer is within 5 minutes of finishing",
            },
            {
                title: "Act V: Turning Point",
                des: "The pot reaches 500 eth and timers are still ticking.",
            },
            {
                title: "Act VI: Turning Point",
                des: "The shortest timer is not on Level 1",
            },
        ],
    },
    {
        title: "NEW DAWN",
        list: [
            {
                title: "Act VII: Resolution",
                des: "A timer counts to 0. Game over and the pot is distributed pro-rata to the winning league.",
            },
            {
                title: "Act VIII: Epilogue",
                des: "A new beginning. Every participant is awarded a Badge of Honor, with its tier forged by their performance in the war—greater deeds earn higher honors. Paper holders get the most special awards.",
            },
        ],
    },
];

const Schedule = ({
    onModeChange,
}: {
    onModeChange: (mode: string) => void;
}) => {
    useEffect(() => {
        const keyboardListener = (event: KeyboardEvent) => {
            const key = event.key;
            if (key === "Escape") {
                onModeChange("");
            }
        };
        document.addEventListener("keydown", keyboardListener);
        return () => {
            document.removeEventListener("keydown", keyboardListener);
        };
    }, []);
    return (
        <Box
            sx={{
                maxWidth: "800px",
                width: "100%",
                margin: "0 auto",
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
                        fontSize: "34px",
                        fontWeight: 700,
                    }}
                >
                    Schedule
                </Text>
                <Box
                    sx={{
                        marginTop: "85px",
                    }}
                >
                    {sList.map((item, index) => {
                        return (
                            <Flex
                                flexDir={"column"}
                                align={"center"}
                                sx={{
                                    marginBottom: "40px",
                                    letterSpacing: "3px",
                                }}
                                key={index}
                            >
                                <Image
                                    src={Line}
                                    sx={{
                                        width: "120px",
                                    }}
                                ></Image>
                                <Flex
                                    sx={{
                                        width: "370px",
                                        height: "100px",
                                        background: `url(${BtBg})`,
                                        backgroundSize: "100% 100%",
                                    }}
                                    align={"center"}
                                    justify={"center"}
                                >
                                    <Text
                                        sx={{
                                            fontSize: "30px",
                                            fontStyle: "normal",
                                            fontWeight: 700,
                                        }}
                                    >
                                        SETUP
                                    </Text>
                                </Flex>
                                <Flex
                                    sx={{
                                        border: "1px solid #FFFFFF26",
                                        background: "#ffffff08",
                                        padding: "28px 0 64px",
                                    }}
                                    align={"center"}
                                    flexDir={"column"}
                                >
                                    <Box
                                        sx={{
                                            width: "100%",
                                            padding: "0 32px",
                                        }}
                                    >
                                        {item.list.map((item, index) => {
                                            return (
                                                <Flex
                                                    key={index}
                                                    flexDir={"column"}
                                                    align={"center"}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: "80px",
                                                            height: "80px",
                                                            "&:hover img:nth-child(1)":
                                                                {
                                                                    display:
                                                                        "none",
                                                                },
                                                            "&:hover img:nth-child(2)":
                                                                {
                                                                    display:
                                                                        "block",
                                                                },
                                                        }}
                                                    >
                                                        <Image
                                                            src={CircleGif}
                                                            sx={{
                                                                width: "100%",
                                                            }}
                                                        ></Image>
                                                        <Image
                                                            src={CircleYGif}
                                                            sx={{
                                                                width: "100%",
                                                                display: "none",
                                                            }}
                                                        ></Image>
                                                    </Box>
                                                    <Text
                                                        sx={{
                                                            textAlign: "center",
                                                            fontFamily:
                                                                "Orbitron",
                                                            fontSize: "30px",
                                                            fontWeight: 700,
                                                            lineHeight: "80px",
                                                        }}
                                                    >
                                                        {item.title}
                                                    </Text>
                                                    <Text
                                                        sx={{
                                                            fontSize: "18px",
                                                            fontWeight: 400,
                                                            lineHeight: "30px",
                                                            marginTop: "0px",
                                                            width: "100%",
                                                            marginBottom:
                                                                "30px",
                                                        }}
                                                    >
                                                        {item.des}
                                                    </Text>
                                                </Flex>
                                            );
                                        })}
                                    </Box>
                                </Flex>
                            </Flex>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
};

export default Schedule;
