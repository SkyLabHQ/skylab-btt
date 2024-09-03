import { Box, Flex, Text, Image } from "@chakra-ui/react";

import PaperVideo from "./assets/paper.mp4";
import RuleWrap from "./RuleWrap";

const RuleContent4 = () => {
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
                    Doubles, as you go up
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
                    <source src={PaperVideo} type="video/mp4" />
                </video>
            </Box>
            <RuleWrap>
                <Text
                    sx={{
                        fontSize: "12px",
                        lineHeight: "25px",
                    }}
                >
                    For each level up,{" "}
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            textDecoration: "underline",
                        }}
                    >
                        minimum xp requirements and timer starting point
                        doubles.
                    </span>
                </Text>
                <Text
                    sx={{
                        marginTop: "16px",
                    }}
                >
                    perhaps so has the worth of your plane in the marketplace 😊
                </Text>
            </RuleWrap>
        </Box>
    );
};

export default RuleContent4;
