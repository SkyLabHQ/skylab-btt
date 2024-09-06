import { Box, Text } from "@chakra-ui/react";
import LevelVideo from "./assets/level.mp4";
import DownVideo from "./assets/down.mp4";
import RuleWrap, { CircleContent } from "./RuleWrap";
import { BottomButton } from "./Rule";

const RuleContent0 = ({
    onChangeActiveIndex,
}: {
    onChangeActiveIndex: (activeIndex: number) => void;
}) => {
    return (
        <Box>
            <Box>
                <Text
                    sx={{
                        fontSize: "20px",
                        fontWeight: 700,
                        textAlign: "center",
                    }}
                >
                    Welcome, Pilots
                </Text>
                <video
                    autoPlay
                    loop
                    muted
                    style={{
                        width: "100%",
                        maxWidth: "600px",
                        margin: "20px auto",
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
                        marginTop: "20px",
                    }}
                >
                    Here’s what you need to know:
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
                                8 Teams
                            </span>{" "}
                            (8 colors) compete against each other.
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
                                16 Levels of Planes
                            </span>{" "}
                            exist, with each level having its own
                            <span
                                style={{
                                    fontWeight: 700,
                                    color: "#F2D861",
                                    fontSize: "14px",
                                }}
                            >
                                {" "}
                                countdown timer.
                            </span>
                        </Text>
                    }
                ></CircleContent>
            </RuleWrap>

            <video
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
                    When any level's countdown timer hits zero,a plane from your
                    team must hold the{" "}
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            fontSize: "14px",
                        }}
                    >
                        [ Last Plane ] position of that level in order to win
                        the entire pot
                    </span>{" "}
                    , which includes all the minted paper and paper plane base
                    fees.*
                </Text>
                <Text
                    sx={{
                        color: "#999",
                        fontSize: "12px",
                        marginTop: "10px",
                    }}
                >
                    *After deducting a 10% operational fee.
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
