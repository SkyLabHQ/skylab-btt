import { Box, Flex, Text, Image } from "@chakra-ui/react";

import UpVideo from "./assets/up.mp4";
import NewcomerVideo from "./assets/newcomer.mp4";
import RuleWrap from "./RuleWrap";

const RuleContent1 = () => {
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
                    How to Become Newcomers?{" "}
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
                    <source src={UpVideo} type="video/mp4" />
                </video>
            </Box>
            <RuleWrap
                sx={{
                    marginTop: "16px",
                }}
            >
                <Text>
                    A folded/minted paper plane comes{" "}
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            textDecoration: "underline",
                        }}
                    >
                        with 1 xp
                    </span>{" "}
                    and is automatically the newcomer to{" "}
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            textDecoration: "underline",
                        }}
                    >
                        {" "}
                        Level 1.
                    </span>{" "}
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
                <source src={NewcomerVideo} type="video/mp4" />
            </video>
            <RuleWrap
                sx={{
                    marginTop: "16px",
                }}
            >
                <Text>
                    A plane's level is determined by its xp. A plane gets
                    upgraded when its xp reaches the minimum requirement of the
                    next level.
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            textDecoration: "underline",
                        }}
                    >
                        It becomes the newcomer to the next level and resets the
                        countdown timer to its beginning,
                    </span>{" "}
                    till someone else upgrades to that level and steals the
                    newcomer position.
                </Text>
                <Text
                    sx={{
                        fontSize: "12px",
                        lineHeight: "25px",
                        marginTop: "36px",
                    }}
                >
                    So, how to gain xp? By playing the{" "}
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            textDecoration: "underline",
                        }}
                    >
                        {" "}
                        Bid Tac Toe game.{" "}
                    </span>{" "}
                </Text>
            </RuleWrap>
        </Box>
    );
};

export default RuleContent1;
