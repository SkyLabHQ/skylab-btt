import { Box, Flex, Text, Image } from "@chakra-ui/react";

import GameVideo from "./assets/game.mp4";
import RuleWrap from "./RuleWrap";
import { BottomButton } from "./Rule";
import { TG_URL } from "@/skyConstants/tgConfig";

const RuleContent2 = ({
    onChangeActiveIndex,
}: {
    onChangeActiveIndex: (activeIndex: number) => void;
}) => {
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
                            color: "#FFF",
                            textDecoration: "underline",
                            fontSize: "14px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            window.open(TG_URL);
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
                            fontSize: "14px",
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
                            fontSize: "14px",
                        }}
                    >
                        xp.
                    </span>{" "}
                    amount of the plane with less{" "}
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            fontSize: "14px",
                        }}
                    >
                        xp.
                    </span>
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            fontSize: "14px",
                        }}
                    >
                        The only exception being level 1 paper plane - the stake
                        is its entire xp holding, 1 xp.{" "}
                    </span>
                </Text>
            </RuleWrap>
            <BottomButton
                activeIndex={2}
                onChangeActiveIndex={(activeIndex: number) => {
                    onChangeActiveIndex(activeIndex);
                }}
            ></BottomButton>
        </Box>
    );
};

export default RuleContent2;
