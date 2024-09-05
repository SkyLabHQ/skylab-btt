import { Box, Flex, Text } from "@chakra-ui/react";

import PaperVideo from "./assets/paper.mp4";
import NewcomerVideo from "./assets/newcomer.mp4";
import RuleWrap from "./RuleWrap";
import { BottomButton } from "./Rule";

const RuleContent1 = ({
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
                    <source src={PaperVideo} type="video/mp4" />
                </video>
            </Box>
            <RuleWrap
                sx={{
                    marginTop: "16px",
                }}
            >
                <Text> At any given time, each level has one newcomer. </Text>
                <Text>
                    A folded/minted paper plane comes with{" "}
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            fontSize: "14px",
                        }}
                    >
                        1 xp
                    </span>{" "}
                    and is automatically the newcomer to{" "}
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            fontSize: "14px",
                        }}
                    >
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
                    A plane's level is determined by its xp. A plane
                    automatically upgrades and becomes the newcomer to the next
                    level{" "}
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#FFF",
                            textDecoration: "underline",
                            fontSize: "14px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            onChangeActiveIndex(4);
                        }}
                    >
                        when it has enough xp.
                    </span>{" "}
                    Countdown timer of the next level is also set to
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#FFF",
                            textDecoration: "underline",
                            fontSize: "14px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            onChangeActiveIndex(4);
                        }}
                    >
                        {" "}
                        its starting point
                    </span>{" "}
                    . The plane can hold the newcomer position
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            fontSize: "14px",
                        }}
                    >
                        {" "}
                        till someone else upgrades to that level and steals the
                        newcomer position.
                    </span>{" "}
                </Text>
                <Text
                    sx={{
                        fontSize: "12px",
                        lineHeight: "25px",
                        marginTop: "36px",
                    }}
                >
                    {" "}
                    So, how to gain xp? By playing
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#FFF",
                            textDecoration: "underline",
                            fontSize: "14px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            onChangeActiveIndex(2);
                        }}
                    >
                        {" "}
                        the Bid Tac Toe game.{" "}
                    </span>{" "}
                </Text>
            </RuleWrap>
            <BottomButton
                activeIndex={1}
                onChangeActiveIndex={(activeIndex: number) => {
                    onChangeActiveIndex(activeIndex);
                }}
            ></BottomButton>
        </Box>
    );
};

export default RuleContent1;
