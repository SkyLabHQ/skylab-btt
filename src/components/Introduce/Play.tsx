import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CloseIcon from "./assets/close.svg";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";
import PlayIcon from "./assets/play-icon.svg";
import RuleWrap, { CircleContent } from "./RuleWrap";
import DownIcon from "./assets/down-icon.svg";
import Play1Img from "./assets/play1.svg";
import Play2Img from "./assets/play2.svg";
import Play3Img from "./assets/play3.svg";
import Play4Img from "./assets/play4.svg";
import Play5Img from "./assets/play5.svg";

const Play = ({ onModeChange }: { onModeChange: (mode: string) => void }) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);

    const handleShow = (index: number, flag: boolean) => {
        if (index === 0) {
            setOpen1(flag);
        } else if (index === 1) {
            setOpen2(flag);
        } else if (index === 2) {
            setOpen3(flag);
        } else if (index === 3) {
            setOpen4(flag);
        } else if (index === 4) {
            setOpen5(flag);
        }

        if (flag) {
            if (index === 0) {
                setOpen2(false);
                setOpen3(false);
                setOpen4(false);
                setOpen5(false);
            } else if (index === 1) {
                setOpen1(false);
                setOpen3(false);
                setOpen4(false);
                setOpen5(false);
            } else if (index === 2) {
                setOpen1(false);
                setOpen2(false);
                setOpen4(false);
                setOpen5(false);
            } else if (index === 3) {
                setOpen1(false);
                setOpen2(false);
                setOpen3(false);
                setOpen5(false);
            } else if (index === 4) {
                setOpen1(false);
                setOpen2(false);
                setOpen3(false);
                setOpen4(false);
            }
        }
    };

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
                <Flex
                    flexDir={"column"}
                    align={"center"}
                    sx={{
                        paddingTop: "20px",
                    }}
                >
                    <Image
                        src={PlayIcon}
                        sx={{
                            width: isPc ? "42px" : "28px",
                        }}
                    ></Image>
                    <Text
                        sx={{
                            textShadow: "#FFD000",
                            fontSize: isPc ? "20px" : "14px",
                            fontWeight: 700,
                            marginTop: "10px",
                        }}
                    >
                        How to Play
                    </Text>
                </Flex>

                <RuleWrap
                    sx={{
                        marginTop: "36px",
                    }}
                >
                    <CircleContent
                        text={
                            <Box
                                onClick={() => {
                                    handleShow(0, !open1);
                                }}
                                sx={{
                                    cursor: "pointer",
                                }}
                            >
                                <Text>
                                    <span
                                        style={{
                                            fontWeight: 700,
                                            color: "#F2D861",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {" "}
                                        Join a Team:{" "}
                                    </span>{" "}
                                    Choose one of 8 teams when minting your
                                    plane.
                                    <Image
                                        src={DownIcon}
                                        sx={{
                                            display: "inline-block",
                                            marginLeft: "4px",
                                            transform: open1
                                                ? "rotate(0deg)"
                                                : "rotate(180deg)",
                                            transition: "all 0.3s",
                                        }}
                                    ></Image>
                                </Text>
                                <Image
                                    src={Play1Img}
                                    sx={{
                                        margin: "0 auto",
                                        maxHeight: open1 ? "150px" : 0,
                                        transition: "all 0.3s",
                                    }}
                                ></Image>
                            </Box>
                        }
                    ></CircleContent>
                    <CircleContent
                        text={
                            <Box
                                onClick={() => {
                                    handleShow(1, !open2);
                                }}
                                sx={{
                                    cursor: "pointer",
                                }}
                            >
                                <Text>
                                    <span
                                        style={{
                                            fontWeight: 700,
                                            color: "#F2D861",
                                            fontSize: "14px",
                                        }}
                                    >
                                        PvP Combat:{" "}
                                    </span>{" "}
                                    Play PvP strategy game Bid Tac Toe to win XP
                                    and level up your plane.
                                    <Image
                                        src={DownIcon}
                                        sx={{
                                            display: "inline-block",
                                            marginLeft: "4px",
                                            transform: open2
                                                ? "rotate(0deg)"
                                                : "rotate(180deg)",
                                            transition: "all 0.3s",
                                        }}
                                    ></Image>
                                </Text>
                                <Image
                                    src={Play2Img}
                                    sx={{
                                        margin: "0 auto",
                                        maxHeight: open2 ? "150px" : 0,
                                        transition: "all 0.3s",
                                        marginTop: "20px",
                                    }}
                                ></Image>
                            </Box>
                        }
                    ></CircleContent>
                    <CircleContent
                        text={
                            <Box
                                onClick={() => {
                                    handleShow(2, !open3);
                                }}
                                sx={{
                                    cursor: "pointer",
                                }}
                            >
                                <Text>
                                    {" "}
                                    <span
                                        style={{
                                            fontWeight: 700,
                                            color: "#F2D861",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {" "}
                                        Last Plane Wins:{" "}
                                    </span>{" "}
                                    The last plane that's minted or upgraded
                                    becomes the level's Champion and resets the
                                    level's timer. If any level timer hits zero,
                                    the Champion of that level secures all prize
                                    money for their team.
                                    <Image
                                        src={DownIcon}
                                        sx={{
                                            display: "inline-block",
                                            marginLeft: "4px",
                                            transform: open3
                                                ? "rotate(0deg)"
                                                : "rotate(180deg)",
                                            transition: "all 0.3s",
                                        }}
                                    ></Image>
                                </Text>{" "}
                                <Image
                                    src={Play3Img}
                                    sx={{
                                        margin: "0 auto",
                                        maxHeight: open3 ? "150px" : 0,
                                        transition: "all 0.3s",
                                        marginTop: "20px",
                                    }}
                                ></Image>
                            </Box>
                        }
                    ></CircleContent>
                    <CircleContent
                        text={
                            <Box
                                onClick={() => {
                                    handleShow(3, !open4);
                                }}
                                sx={{
                                    cursor: "pointer",
                                }}
                            >
                                <Text>
                                    {" "}
                                    <span
                                        style={{
                                            fontWeight: 700,
                                            color: "#F2D861",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {" "}
                                        Team Politics:
                                    </span>{" "}
                                    Team leaders can adjust how prize money is
                                    split between themselves, the Winning
                                    Champion, and winning team members, as well
                                    as the cash flow distributed to existing
                                    team members as others join the team.
                                    <Image
                                        src={DownIcon}
                                        sx={{
                                            display: "inline-block",
                                            marginLeft: "4px",
                                            transform: open4
                                                ? "rotate(0deg)"
                                                : "rotate(180deg)",
                                            transition: "all 0.3s",
                                        }}
                                    ></Image>
                                </Text>{" "}
                                <Image
                                    src={Play4Img}
                                    sx={{
                                        margin: "0 auto",
                                        maxHeight: open4 ? "150px" : 0,
                                        transition: "all 0.3s",
                                        marginTop: "20px",
                                    }}
                                ></Image>
                            </Box>
                        }
                    ></CircleContent>
                    <CircleContent
                        text={
                            <Box
                                onClick={() => {
                                    handleShow(4, !open5);
                                }}
                                sx={{
                                    cursor: "pointer",
                                }}
                            >
                                <Text>
                                    {" "}
                                    <span
                                        style={{
                                            fontWeight: 700,
                                            color: "#F2D861",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {" "}
                                        Democracy:
                                    </span>{" "}
                                    Team members can lobby or veto bad policies,
                                    and newly minted planes "vote" with their
                                    choice of which team to join.
                                    <Image
                                        src={DownIcon}
                                        sx={{
                                            display: "inline-block",
                                            marginLeft: "4px",
                                            transform: open5
                                                ? "rotate(0deg)"
                                                : "rotate(180deg)",
                                            transition: "all 0.3s",
                                        }}
                                    ></Image>
                                </Text>{" "}
                                <Image
                                    src={Play5Img}
                                    sx={{
                                        margin: "0 auto",
                                        maxHeight: open5 ? "150px" : 0,
                                        transition: "all 0.3s",
                                        marginTop: "20px",
                                    }}
                                ></Image>
                            </Box>
                        }
                    ></CircleContent>
                </RuleWrap>
            </Box>
        </Box>
    );
};

export default Play;
