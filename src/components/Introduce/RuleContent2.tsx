import { Box, Flex, Text, Image } from "@chakra-ui/react";

import GameVideo from "./assets/game.mp4";
import RuleWrap from "./RuleWrap";

const RuleContent2 = () => {
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
                    The Game: Bid Tac Toe
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
                    <source src={GameVideo} type="video/mp4" />
                </video>
            </Box>
            <RuleWrap
                sx={{
                    marginTop: "16px",
                }}
            >
                <Text>
                    Plane vs. Plane with xp as stake.{" "}
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            textDecoration: "underline",
                        }}
                    >
                        Each game takes ~3min.
                    </span>
                </Text>
                <Text
                    sx={{
                        marginTop: "16px",
                    }}
                >
                    Bid Tac Toe is a variation of tic tac toe, except players
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            textDecoration: "underline",
                        }}
                    >
                        blind-bid for each grid to occupy three grids in a row.
                    </span>
                </Text>
                <Text
                    sx={{
                        marginTop: "16px",
                    }}
                >
                    The stake of each game is half of the{" "}
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            textDecoration: "underline",
                        }}
                    >
                        xp.
                    </span>{" "}
                    amount of the plane with less{" "}
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            textDecoration: "underline",
                        }}
                    >
                        xp.
                    </span>
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            textDecoration: "underline",
                        }}
                    >
                        The only exception being level 1 paper plane - the stake
                        is its entire xp holding, 1 xp.{" "}
                    </span>
                </Text>
            </RuleWrap>
        </Box>
    );
};

export default RuleContent2;
