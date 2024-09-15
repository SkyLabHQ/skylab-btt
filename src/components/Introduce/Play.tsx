import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import CloseIcon from "./assets/close.svg";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";
import SetupIcon from "./assets/setup.svg";
import ConflictIcon from "./assets/conflict.svg";
import NewDawnIcon from "./assets/newdawn.svg";
import PlayIcon from "./assets/play-icon.svg";
import RuleWrap, { CircleContent } from "./RuleWrap";

const Play = ({ onModeChange }: { onModeChange: (mode: string) => void }) => {
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
                            <Box>
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
                                </Text>
                            </Box>
                        }
                    ></CircleContent>
                    <CircleContent
                        text={
                            <Box>
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
                                </Text>
                            </Box>
                        }
                    ></CircleContent>
                    <CircleContent
                        text={
                            <Box>
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
                                </Text>
                            </Box>
                        }
                    ></CircleContent>
                    <CircleContent
                        text={
                            <Box>
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
                                </Text>{" "}
                            </Box>
                        }
                    ></CircleContent>
                    <CircleContent
                        text={
                            <Box>
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
                                </Text>
                            </Box>
                        }
                    ></CircleContent>
                </RuleWrap>
            </Box>
        </Box>
    );
};

export default Play;
