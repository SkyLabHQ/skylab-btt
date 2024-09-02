import { Box, Flex, Text, Image } from "@chakra-ui/react";

import NewcomerVideo from "./assets/newcomer.mp4";

const RuleContent4 = () => {
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
                    Doubles, as you go up
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
                    <source src={NewcomerVideo} type="video/mp4" />
                </video>
            </Box>
            <Text
                sx={{
                    fontSize: "20px",
                    lineHeight: "50px",
                    marginTop: "32px",
                }}
            >
                For each level up,{" "}
                <span
                    style={{
                        fontWeight: 700,
                    }}
                >
                    minimum xp requirements and timer starting point doubles.
                </span>
            </Text>
            <Text
                sx={{
                    fontSize: "20px",

                    lineHeight: "50px",
                    marginTop: "16px",
                }}
            >
                perhaps so has the worth of your plane in the marketplace :)
            </Text>
        </Box>
    );
};

export default RuleContent4;
