import { Box, Text, Tr } from "@chakra-ui/react";
import LevelVideo from "./assets/level.mp4";
import DownVideo from "./assets/down.mp4";
import RuleWrap, { CircleContent, LastPlane } from "./RuleWrap";
import { BottomButton } from "./Rule";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";

const RuleContent0 = ({
    onChangeActiveIndex,
}: {
    onChangeActiveIndex: (activeIndex: number) => void;
}) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    return (
        <Box>
            <Box>
                <Text
                    sx={{
                        fontSize: isPc ? "20px" : "14px",
                        fontWeight: 700,
                        textAlign: "center",
                    }}
                >
                    Welcome, Pilots
                </Text>
                <video
                    playsInline
                    autoPlay
                    loop
                    muted
                    style={{
                        width: "100%",
                        maxWidth: "600px",
                        margin: isPc ? "20px auto" : "12px auto",
                    }}
                >
                    <source src={LevelVideo} type="video/mp4" />
                </video>
            </Box>
            <RuleWrap
                sx={{
                    marginTop: "30px",
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
                        The War of Influence Game
                    </span>{" "}
                    is a massive multiplayer, on-chain social game.
                </Text>
                <Text
                    sx={{
                        marginTop: isPc ? "20px" : "10px",
                    }}
                >
                    Here’s what you need to know:
                </Text>
                <CircleContent
                    text={
                        <Text>
                            Teams: There are{" "}
                            <span
                                style={{
                                    fontWeight: 700,
                                    color: "#F2D861",
                                    fontSize: "14px",
                                }}
                            >
                                8 Teams
                            </span>{" "}
                            (represented by{" "}
                            <span
                                style={{
                                    fontWeight: 700,
                                    color: "#F2D861",
                                    fontSize: "14px",
                                }}
                            >
                                8 colors
                            </span>{" "}
                            ) competing with each other. They each have a{" "}
                            <span
                                style={{
                                    fontWeight: 700,
                                    color: "#F2D861",
                                    fontSize: "14px",
                                }}
                            >
                                team leader
                            </span>{" "}
                            , selected by the creators of influence.game.{" "}
                            <span
                                style={{
                                    fontWeight: 700,
                                    color: "#F2D861",
                                    fontSize: "14px",
                                }}
                            >
                                {" "}
                                You win as a team.
                            </span>{" "}
                        </Text>
                    }
                ></CircleContent>
                <CircleContent
                    text={
                        <Text>
                            Planes: Planes all start off at{" "}
                            <span
                                style={{
                                    fontWeight: 700,
                                    color: "#F2D861",
                                    fontSize: "14px",
                                }}
                            >
                                Level 1: paper planes.
                            </span>{" "}
                            Each paper plane needs to choose a team when it's
                            minted. Once selected,{" "}
                            <span
                                style={{
                                    fontWeight: 700,
                                    color: "#F2D861",
                                    fontSize: "14px",
                                }}
                            >
                                team membership can't be changed.
                            </span>
                        </Text>
                    }
                ></CircleContent>
            </RuleWrap>

            <video
                playsInline
                autoPlay
                loop
                muted
                style={{
                    width: "100%",
                    maxWidth: "600px",
                    margin: "20px auto",
                }}
            >
                <source src={DownVideo} type="video/mp4" />
            </video>
            <RuleWrap sx={{}}>
                <Text>
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            fontSize: "14px",
                        }}
                    >
                        How to win:{" "}
                    </span>
                </Text>
                <Text>
                    When{" "}
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            fontSize: "14px",
                        }}
                    >
                        ANY timer counts to zero,
                    </span>{" "}
                    the Last Plane secures victory for its team.
                </Text>
            </RuleWrap>
            <BottomButton
                activeIndex={0}
                onChangeActiveIndex={(activeIndex: number) => {
                    onChangeActiveIndex(activeIndex);
                }}
            ></BottomButton>
        </Box>
    );
};

export default RuleContent0;
