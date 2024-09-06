import { Box, Flex, Text, Image } from "@chakra-ui/react";

import UpVideo from "./assets/up.mp4";

import RuleWrap, { CircleContent } from "./RuleWrap";
import { BottomButton } from "./Rule";

const RuleContent4 = ({
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
                    LEVELING UP
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
            <RuleWrap>
                <Text>As you move up levels, two things double:</Text>
                <CircleContent
                    text={
                        <Box>
                            <Text>
                                The{" "}
                                <span
                                    style={{
                                        fontWeight: 700,
                                        fontSize: "14px",
                                        color: "#F2D861",
                                    }}
                                >
                                    minimum XP requirement
                                </span>{" "}
                                to advance.
                            </Text>
                        </Box>
                    }
                ></CircleContent>{" "}
                <CircleContent
                    text={
                        <Box>
                            <Text>
                                The{" "}
                                <span
                                    style={{
                                        fontWeight: 700,
                                        fontSize: "14px",
                                        color: "#F2D861",
                                    }}
                                >
                                    starting point of the countdown timer.
                                </span>
                            </Text>
                        </Box>
                    }
                ></CircleContent>
            </RuleWrap>
            <BottomButton
                activeIndex={4}
                onChangeActiveIndex={(activeIndex: number) => {
                    onChangeActiveIndex(activeIndex);
                }}
            ></BottomButton>
        </Box>
    );
};

export default RuleContent4;
