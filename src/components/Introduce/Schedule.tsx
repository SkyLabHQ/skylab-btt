import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import CloseIcon from "./assets/close.svg";
import CircleGif from "@/components/Introduce/assets/circle.gif";
import CircleYGif from "@/components/Introduce/assets/circle-y.gif";
import BtBg from "./assets/bt-bg.png";
import Line from "./assets/line.png";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";
import SetupIcon from "./assets/setup.svg";
import ConflictIcon from "./assets/conflict.svg";
import NewDawnIcon from "./assets/newdawn.svg";

const sList = [
    {
        icon: SetupIcon,
        title: "SETUP",
        list: [
            {
                title: "Act I: Prelude",
                des: "Team leaders reveal. Paper airdrops claim opens.",
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
        icon: ConflictIcon,
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
        icon: NewDawnIcon,
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
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");

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
                >
                    <Text
                        sx={{
                            color: "#FFF",
                            textAlign: "center",
                            fontFamily: "Orbitron",
                            fontSize: isPc ? "18px" : "12px",
                            fontWeight: 400,
                            marginRight: "6px",
                        }}
                    >
                        Esc
                    </Text>{" "}
                    <Image
                        src={CloseIcon}
                        sx={{
                            width: isPc ? "16px" : "8px",
                            height: isPc ? "16px" : "8px",
                        }}
                    ></Image>
                </Flex>
                <Text
                    sx={{
                        color: "#F2D861",
                        textAlign: "center",
                        textShadow: "#FFD000",
                        fontSize: isPc ? "34px" : "14px",
                        fontWeight: 700,
                    }}
                >
                    Schedule
                </Text>
                <Box
                    sx={{
                        marginTop: isPc ? "85px" : "20px",
                    }}
                >
                    {sList.map((item, index) => {
                        return (
                            <Flex
                                flexDir={"column"}
                                align={"center"}
                                sx={{
                                    marginBottom: "40px",
                                    letterSpacing: "1px",
                                }}
                                key={index}
                            >
                                <Image
                                    src={Line}
                                    sx={{
                                        width: isPc ? "120px" : "48px",
                                    }}
                                ></Image>
                                <Flex
                                    sx={{
                                        width: isPc ? "370px" : "130px",
                                        height: isPc ? "100px" : "35px",
                                        background: `url(${BtBg})`,
                                        backgroundSize: "100% 100%",
                                    }}
                                    align={"center"}
                                    justify={"center"}
                                >
                                    <Image
                                        src={item.icon}
                                        sx={{
                                            width: isPc ? "32px" : "16px",
                                            marginRight: isPc ? "10px" : "5px",
                                        }}
                                    ></Image>
                                    <Text
                                        sx={{
                                            fontSize: isPc ? "30px" : "14px",
                                            fontStyle: "normal",
                                            fontWeight: 700,
                                        }}
                                    >
                                        {item.title}
                                    </Text>
                                </Flex>
                                <Flex
                                    sx={{
                                        border: "1px solid #FFFFFF26",
                                        background: "#ffffff08",
                                        padding: isPc
                                            ? "28px 0 64px"
                                            : "16px 0 12px",
                                    }}
                                    align={"center"}
                                    flexDir={"column"}
                                >
                                    <Box
                                        sx={{
                                            width: "100%",
                                            padding: isPc ? "0 32px" : "0 16px",
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
                                                            width: isPc
                                                                ? "80px"
                                                                : "56px",
                                                            height: isPc
                                                                ? "80px"
                                                                : "56px",
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
                                                            fontSize: isPc
                                                                ? "30px"
                                                                : "14px",
                                                            fontWeight: 700,
                                                            lineHeight: isPc
                                                                ? "80px"
                                                                : "56px",
                                                        }}
                                                    >
                                                        {item.title}
                                                    </Text>
                                                    <Text
                                                        sx={{
                                                            fontSize: isPc
                                                                ? "18px"
                                                                : "12px",
                                                            fontWeight: 400,
                                                            lineHeight: 1,
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
