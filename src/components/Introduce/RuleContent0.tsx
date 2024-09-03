import { Box, Text } from "@chakra-ui/react";
import LevelVideo from "./assets/level.mp4";
import DownVideo from "./assets/down.mp4";
import RuleWrap from "./RuleWrap";

const RuleContent0 = () => {
    return (
        <Box>
            <Box>
                <Text
                    sx={{
                        fontSize: "24px",
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
                    The War of Influence is a massive multiplayer on-chain
                    social game. There are{" "}
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            textDecoration: "underline",
                        }}
                    >
                        8 leagues, 16 levels of planes, and 16 countdown timers
                        (one for each level).
                    </span>
                </Text>
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
            <RuleWrap>
                <Text>
                    This game is about{" "}
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            textDecoration: "underline",
                        }}
                    >
                        when ANY timer counts to zero, make sure your league
                        holds the “newcomer” position of that level
                    </span>{" "}
                    , in order to win the whole pot, which consists of all the
                    paper and paper planes minting fees.*
                </Text>
                <Text
                    sx={{
                        color: "#999",
                        textAlign: "justify",
                        fontFamily: "Orbitron",
                        fontSize: "12px",
                    }}
                >
                    *deducting a 10% operational fee
                </Text>
            </RuleWrap>
        </Box>
    );
};

export default RuleContent0;
