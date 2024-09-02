import { Box, Flex, Text, Image } from "@chakra-ui/react";

import UpVideo from "./assets/up.mp4";
import PaperVideo from "./assets/paper.mp4";

const RuleContent1 = () => {
    return (
        <Box>
            <Box
                sx={{
                    height: "515px",
                }}
            >
                <Text
                    sx={{
                        fontSize: "40px",

                        fontWeight: 700,
                        textAlign: "center",
                    }}
                >
                    How to Become Newcomers?{" "}
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
                    <source src={UpVideo} type="video/mp4" />
                </video>
            </Box>
            <Text
                sx={{
                    fontSize: "30px",

                    lineHeight: "50px",
                    marginTop: "16px",
                }}
            >
                A folded/minted paper plane comes with 1 xp and is automatically
                the newcomer to Level 1.
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
                <source src={PaperVideo} type="video/mp4" />
            </video>
            <Text
                sx={{
                    fontSize: "30px",

                    lineHeight: "50px",
                    marginTop: "16px",
                }}
            >
                A plane's level is determined by its xp. A plane gets upgraded
                when its xp reaches the minimum requirement of the next level.
                <span
                    style={{
                        fontWeight: 700,
                    }}
                >
                    It becomes the newcomer to the next level and resets the
                    countdown timer to its beginning,
                </span>{" "}
                till someone else upgrades to that level and steals the newcomer
                position.
            </Text>
            <Text
                sx={{
                    fontSize: "30px",
                    marginTop: "36px",
                }}
            >
                So, how to gain xp? By playing the Bid Tac Toe game.{" "}
            </Text>
        </Box>
    );
};

export default RuleContent1;
