import { Box, Flex, Text, Image } from "@chakra-ui/react";

import LevelVideo from "./assets/level.mp4";
import DownVideo from "./assets/down.mp4";

const RuleContent0 = () => {
    return (
        <Box>
            <Box>
                <Text
                    sx={{
                        fontSize: "30px",
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
                        margin: "20px auto",
                    }}
                >
                    <source src={LevelVideo} type="video/mp4" />
                </video>
            </Box>
            <Text
                sx={{
                    fontSize: "20px",
                    lineHeight: "40px",
                    marginTop: "30px",
                }}
            >
                The War of Influence is a massive multiplayer on-chain social
                game. There are{" "}
                <span
                    style={{
                        fontWeight: 700,
                    }}
                >
                    8 leagues, 16 levels of planes, and 16 countdown timers (one
                    for each level).
                </span>
            </Text>
            <video
                autoPlay
                loop
                muted
                style={{
                    width: "100%",
                    margin: "20px auto",
                }}
            >
                <source src={DownVideo} type="video/mp4" />
            </video>
            <Text
                sx={{
                    fontSize: "20px",
                    lineHeight: "50px",
                    marginTop: "16px",
                }}
            >
                This game is about{" "}
                <span
                    style={{
                        fontWeight: 700,
                    }}
                >
                    when ANY timer counts to zero, make sure your league holds
                    the “newcomer” position of that level
                </span>{" "}
                , in order to win the whole pot, which consists of all the paper
                and paper planes minting fees.*
            </Text>

            <Text
                sx={{
                    color: "#999",
                    textAlign: "justify",
                    fontFamily: "Orbitron",
                    fontSize: "20px",
                }}
            >
                *deducting a 10% operational fee
            </Text>
        </Box>
    );
};

export default RuleContent0;
