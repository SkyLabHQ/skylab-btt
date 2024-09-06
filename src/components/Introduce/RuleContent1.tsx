import { Box, Flex, Text } from "@chakra-ui/react";

import PaperVideo from "./assets/paper.mp4";
import NewcomerVideo from "./assets/newcomer.mp4";
import RuleWrap, { CircleContent } from "./RuleWrap";
import { BottomButton } from "./Rule";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";

const RuleContent1 = ({
    onChangeActiveIndex,
}: {
    onChangeActiveIndex: (activeIndex: number) => void;
}) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");

    return (
        <Box>
            <Box>
                <Text
                    sx={{
                        fontSize: isPc ? "20px" : "14px",
                        fontWeight: 700,
                        textAlign: "center",
                    }}
                >
                    How to Become the{" "}
                    <span
                        style={{
                            color: "#F2D861",
                            fontSize: isPc ? "24px" : "16px",
                            fontWeight: 700,
                        }}
                    >
                        {" "}
                        [ Last Plane ]
                    </span>{" "}
                    ?{" "}
                </Text>
                <video
                    autoPlay
                    loop
                    muted
                    style={{
                        width: "100%",
                        maxWidth: "600px",
                        margin: isPc ? "20px auto" : "12px auto",
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
                <Text>
                    At any given moment, each level has one plane holding the{" "}
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            fontSize: "14px",
                        }}
                    >
                        {" "}
                        [ Last Plane ]
                    </span>{" "}
                    position. It belongs to the last plane that ascends to the
                    level.
                </Text>{" "}
                <CircleContent
                    text={
                        <Text>
                            When you fold/mint a paper plane, it starts with{" "}
                            <span
                                style={{
                                    fontWeight: 700,
                                    color: "#F2D861",
                                    fontSize: "14px",
                                }}
                            >
                                1 XP
                            </span>{" "}
                            and automatically becomes the{" "}
                            <span
                                style={{
                                    fontWeight: 700,
                                    color: "#F2D861",
                                    fontSize: "14px",
                                }}
                            >
                                [ Last Plane ]
                            </span>{" "}
                            at{" "}
                            <span
                                style={{
                                    fontWeight: 700,
                                    color: "#F2D861",
                                    fontSize: "14px",
                                }}
                            >
                                {" "}
                                Level 1.
                            </span>
                        </Text>
                    }
                ></CircleContent>
                <CircleContent
                    text={
                        <Text>
                            A plane’s{" "}
                            <span
                                style={{
                                    fontWeight: 700,
                                    color: "#F2D861",
                                    fontSize: "14px",
                                }}
                            >
                                XP
                            </span>{" "}
                            determines its level. When it gains enough{" "}
                            <span
                                style={{
                                    fontWeight: 700,
                                    color: "#F2D861",
                                    fontSize: "14px",
                                }}
                            >
                                XP
                            </span>{" "}
                            , it{" "}
                            <span
                                style={{
                                    fontWeight: 700,
                                    color: "#F2D861",
                                    fontSize: "14px",
                                }}
                            >
                                upgrades to the next level
                            </span>{" "}
                            and becomes the{" "}
                            <span
                                style={{
                                    fontWeight: 700,
                                    color: "#F2D861",
                                    fontSize: "14px",
                                }}
                            >
                                [ Last Plane ]{" "}
                            </span>{" "}
                            of that level.
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
                <source src={NewcomerVideo} type="video/mp4" />
            </video>
            <RuleWrap
                sx={{
                    marginTop: "16px",
                }}
            >
                <Text>
                    You hold the{" "}
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            fontSize: "14px",
                        }}
                    >
                        [ Last Plane ]{" "}
                    </span>{" "}
                    position until another player’s plane upgrades to that level
                    and takes it. When this happens, the countdown timer for
                    that level resets to its starting point.
                </Text>
                <Text>
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            fontSize: "14px",
                        }}
                    >
                        {" "}
                        So, how do you gain XP for upgrading
                    </span>{" "}
                    ? By playing{" "}
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            fontSize: "14px",
                            textDecoration: "underline",
                        }}
                        onClick={() => {
                            onChangeActiveIndex(2);
                        }}
                    >
                        Bid Tac Toe.
                    </span>
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
