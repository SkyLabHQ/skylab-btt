import { Box, Flex, Text, Image } from "@chakra-ui/react";

import GameVideo from "./assets/game.mp4";
import Game1Video from "./assets/game1.mp4";

import RuleWrap, { CircleContent } from "./RuleWrap";
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
                        fontSize: "20px",
                        fontWeight: 700,
                        textAlign: "center",
                    }}
                >
                    The Game: Bid Tac Toe{" "}
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
                    In{" "}
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            fontSize: "14px",
                        }}
                    >
                        Bid Tac Toe
                    </span>
                    , planes go head-to-head, wagering their{" "}
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            fontSize: "14px",
                        }}
                    >
                        XP
                    </span>{" "}
                    as the stakes.{" "}
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#FFF",
                            fontSize: "14px",
                            textDecoration: "underline",
                        }}
                        onClick={() => {
                            window.open(TG_URL);
                        }}
                    >
                        Each match lasts around 3 minutes.
                    </span>
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
                                Bid Tac Toe
                            </span>{" "}
                            is a variation of Tic Tac Toe, where players{" "}
                            <span
                                style={{
                                    fontWeight: 700,
                                    color: "#F2D861",
                                    fontSize: "14px",
                                }}
                            >
                                blind-bid
                            </span>{" "}
                            for each grid space to form a row of three.
                        </Text>
                    }
                ></CircleContent>
                <CircleContent
                    text={
                        <Text>
                            The stake for each game is{" "}
                            <span
                                style={{
                                    fontWeight: 700,
                                    color: "#F2D861",
                                    fontSize: "14px",
                                }}
                            >
                                half the XP{" "}
                            </span>{" "}
                            of the plane with the lower XP, except at Level 1,
                            where each plane risks all its{" "}
                            <span
                                style={{
                                    fontWeight: 700,
                                    color: "#F2D861",
                                    fontSize: "14px",
                                }}
                            >
                                1 XP
                            </span>{" "}
                            .
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
                <source src={Game1Video} type="video/mp4" />
            </video>
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
