import { Box, Flex, Text, Image } from "@chakra-ui/react";

import UpVideo from "./assets/up.mp4";

import RuleWrap from "./RuleWrap";
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
                    <source src={UpVideo} type="video/mp4" />
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
                            fontSize: "14px",
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
