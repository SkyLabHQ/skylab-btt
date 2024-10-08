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

                <CircleContent
                    text={
                        <Text>
                            <span
                                style={{
                                    fontWeight: 700,
                                    color: "#F2D861",
                                    fontSize: "14px",
                                }}
                            >
                                {" "}
                                Teams:{" "}
                            </span>
                            <span>8 teams</span> are represented by{" "}
                            <span>8 colors</span>. They each have a{" "}
                            <span>team leader</span> , selected by the creators
                            of influence.game.
                        </Text>
                    }
                ></CircleContent>
                <CircleContent
                    text={
                        <Text>
                            <span
                                style={{
                                    fontWeight: 700,
                                    color: "#F2D861",
                                    fontSize: "14px",
                                }}
                            >
                                {" "}
                                Planes:
                            </span>{" "}
                            Each newly minted paper plane needs to choose a
                            team. Once selected, team membership can't be
                            changed.
                        </Text>
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
                                    How to Win:
                                </span>{" "}
                                The last plane that's minted or upgraded becomes
                                the level's Champion and resets the level's
                                timer. <span>If any level timer hits zero</span>{" "}
                                , the Champion of that level{" "}
                                <span>
                                    secures all prize money for their team
                                </span>{" "}
                                , which consists of all the paper and paper
                                plane minting fees*.
                            </Text>
                            <Text
                                sx={{
                                    color: "#999",
                                    fontFamily: "Orbitron",
                                    fontSize: "12px",
                                    fontWeight: 700,
                                    marginTop: "10px",
                                }}
                            >
                                * subtracting a 10% fee for the creators
                            </Text>
                        </Box>
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
