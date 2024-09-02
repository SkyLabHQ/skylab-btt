import { Box, Flex, Text, Image } from "@chakra-ui/react";

import GameVideo from "./assets/up.mp4";

const RuleContent2 = () => {
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
                    The Game: Bid Tac Toe
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
                    <source src={GameVideo} type="video/mp4" />
                </video>
            </Box>
            <Text
                sx={{
                    fontSize: "30px",

                    lineHeight: "50px",
                    marginTop: "16px",
                }}
            >
                Plane vs. Plane with xp as stake.{" "}
                <span
                    style={{
                        fontWeight: 700,
                    }}
                >
                    Each game takes ~3min.
                </span>
            </Text>
            <Text
                sx={{
                    fontSize: "30px",

                    lineHeight: "50px",
                    marginTop: "16px",
                }}
            >
                Bid Tac Toe is a variation of tic tac toe, except players
                <span
                    style={{
                        fontWeight: 700,
                    }}
                >
                    blind-bid for each grid to occupy three grids in a row.
                </span>
            </Text>
            <Text
                sx={{
                    fontSize: "30px",

                    lineHeight: "50px",
                    marginTop: "16px",
                }}
            >
                The stake of each game is half of the{" "}
                <span
                    style={{
                        fontWeight: 700,
                    }}
                >
                    xp.
                </span>{" "}
                amount of the plane with less{" "}
                <span
                    style={{
                        fontWeight: 700,
                    }}
                >
                    xp.
                </span>
                <span
                    style={{
                        fontWeight: 700,
                    }}
                >
                    The only exception being level 1 paper plane - the stake is
                    its entire xp holding, 1 xp.{" "}
                </span>
            </Text>
        </Box>
    );
};

export default RuleContent2;
