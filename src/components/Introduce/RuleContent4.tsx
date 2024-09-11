import { Box, Flex, Text, Image } from "@chakra-ui/react";

import UpVideo from "./assets/up.mp4";

import RuleWrap, { CircleContent } from "./RuleWrap";
import { BottomButton } from "./Rule";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";

const RuleContent4 = ({
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
                    LEVELING UP
                </Text>
                <video
                    playsInline
                    autoPlay
                    loop
                    muted
                    style={{
                        width: "100%",
                        maxWidth: "600px",
                        margin: isPc ? "20px auto" : "12px auto",
                    }}
                >
                    <source src={UpVideo} type="video/mp4" />
                </video>
            </Box>
            <RuleWrap>
                <Text>
                    As you move up levels, two things <span>double:</span>{" "}
                </Text>
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
                <Text
                    sx={{
                        fontSize: "12px",
                        fontWeight: 700,
                        marginTop: "16px",
                    }}
                >
                    Perhaps, so as the worth of your plane in the marketplace :)
                </Text>
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
