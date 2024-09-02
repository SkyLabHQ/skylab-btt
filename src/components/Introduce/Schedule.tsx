import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import CloseIcon from "./assets/close.svg";
import CircleGif from "@/components/Introduce/assets/circle.gif";
import SBg from "./assets/s-bg.png";

const list = [
    {
        title: "Act I: Prelude",
        des: "League leaders emerge. Paper pre-sale begins. The countdown to the game begins. The War of Influence is about to start. Get ready for the clash.",
    },
    {
        title: "Act II: Outbreak",
        des: "Game starts. Paper folding and Paper Plane minting begins. Timers start ticking and Bid Tac Toe Battles begins.",
    },
    {
        title: "Act III: Escalation",
        des: "When any timer is within 5 min of finishing.",
    },
    {
        title: "Act IV: Stalemate",
        des: "When the pot reaches 100 eth.",
    },
    {
        title: "Act V: Turning Point",
        des: " when the shortest timer is not a Level 1.",
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
                    {list.map((item, index) => {
                        return (
                            <Flex
                                flexDir={"column"}
                                align={"center"}
                                sx={{
                                    marginBottom: "40px",
                                }}
                            >
                                <Image
                                    src={CircleGif}
                                    sx={{
                                        width: "80px",
                                        height: "80px",
                                    }}
                                ></Image>
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: "160px",
                                        background: `url(${SBg})`,
                                        backgroundSize: "100% 100%",
                                        padding: "0 32px",
                                    }}
                                >
                                    <Text
                                        sx={{
                                            textAlign: "center",
                                            fontFamily: "Orbitron",
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
                                        }}
                                    >
                                        {item.des}
                                    </Text>
                                </Box>
                            </Flex>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
};

export default Schedule;
