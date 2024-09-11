import { Box, Flex, Text, Image } from "@chakra-ui/react";

import RewardVideo from "./assets/reward.mp4";
import RuleWrap, { CircleContent, LastPlane } from "./RuleWrap";
import { BottomButton } from "./Rule";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";

const RuleContent3 = ({
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
                    Team Politics{" "}
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
                    <source src={RewardVideo} type="video/mp4" />
                </video>
            </Box>
            <RuleWrap>
                <Text
                    sx={{
                        fontSize: "12px",
                        lineHeight: "25px",
                        marginTop: "16px",
                    }}
                >
                    Each team is managed by a <span>team leader</span>, who can
                    adjust{" "}
                    <span
                        style={{
                            fontWeight: 700,
                            color: "#F2D861",
                            fontSize: "14px",
                        }}
                    >
                        three key policies:
                    </span>
                </Text>
                <Box
                    sx={{
                        lineHeight: "50px",
                        marginTop: "10px",
                    }}
                >
                    <CircleContent
                        text={
                            <Text
                                sx={{
                                    fontSize: "14px",
                                    lineHeight: "25px",
                                    fontWeight: 400,
                                }}
                            >
                                <span
                                    style={{
                                        fontWeight: 700,
                                        color: "#F2D861",
                                        fontSize: "14px",
                                    }}
                                >
                                    x{" "}
                                </span>
                                - Team leader's take rate: 0%~10%
                            </Text>
                        }
                    ></CircleContent>
                    <CircleContent
                        text={
                            <Text
                                sx={{
                                    fontSize: "14px",
                                    lineHeight: "25px",
                                    fontWeight: 400,
                                }}
                            >
                                <span
                                    style={{
                                        fontWeight: 700,
                                        color: "#F2D861",
                                        fontSize: "14px",
                                    }}
                                >
                                    y{" "}
                                </span>
                                - Winning{" "}
                                <span
                                    style={{
                                        fontWeight: 700,
                                        fontSize: "14px",
                                        color: "#F2D861",
                                    }}
                                >
                                    {" "}
                                    <LastPlane
                                        text={"Last Plane's"}
                                    ></LastPlane>
                                </span>{" "}
                                take rate: 10%~20%
                            </Text>
                        }
                    ></CircleContent>
                    <CircleContent
                        text={
                            <Text
                                sx={{
                                    lineHeight: "25px",
                                    fontWeight: 400,
                                }}
                            >
                                <span
                                    style={{
                                        fontWeight: 700,
                                        color: "#F2D861",
                                        fontSize: "14px",
                                    }}
                                >
                                    z{" "}
                                </span>
                                - Goes directly to existing plane holders or new
                                users' inviter as others join the team (starting
                                at 0.005 eth)
                            </Text>
                        }
                    ></CircleContent>
                </Box>

                <Text
                    sx={{
                        marginTop: "14px",
                        fontWeight: 700,
                        fontSize: "16px",
                        color: "#F2D861",
                    }}
                >
                    Winning the Pot:
                </Text>
                <Text sx={{}}>
                    After subtracting x and y, the rest of the pot is
                    distributed within the winning team pro-rata based on XP
                    holdings.
                </Text>
            </RuleWrap>
            <BottomButton
                activeIndex={3}
                onChangeActiveIndex={(activeIndex: number) => {
                    onChangeActiveIndex(activeIndex);
                }}
            ></BottomButton>
        </Box>
    );
};

export default RuleContent3;
