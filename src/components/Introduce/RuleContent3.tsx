import { Box, Flex, Text, Image } from "@chakra-ui/react";

import RewardVideo from "./assets/reward.mp4";
import RuleWrap, { CircleContent } from "./RuleWrap";
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
                    Team and Team Leader{" "}
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
                    adjust three key policies:
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
                                x - Team leader's take rate:
                                <span
                                    style={{
                                        fontWeight: 700,
                                        color: "#F2D861",
                                        fontSize: "14px",
                                    }}
                                >
                                    0%~10%
                                </span>
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
                                y - Winning{" "}
                                <span
                                    style={{
                                        fontWeight: 700,
                                        fontSize: "14px",
                                        color: "#F2D861",
                                    }}
                                >
                                    {" "}
                                    [ Last Plane ]'s
                                </span>{" "}
                                take rate:
                                <span
                                    style={{
                                        fontWeight: 700,
                                        fontSize: "14px",
                                        color: "#F2D861",
                                    }}
                                >
                                    10%~20%
                                </span>
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
                                z - Paper plane team premium – this goes
                                directly to existing plane holders{" "}
                                <span
                                    style={{
                                        fontWeight: 700,
                                        fontSize: "14px",
                                        color: "#F2D861",
                                    }}
                                >
                                    {" "}
                                    (distributed pro-rata based on XP holdings)
                                </span>{" "}
                                or the plane’s inviter.
                            </Text>
                        }
                    ></CircleContent>
                </Box>
                <Text
                    sx={{
                        marginTop: "14px",
                        fontWeight: 700,
                        fontSize: "14px",
                        color: "#F2D861",
                    }}
                >
                    Earn as the game goes:
                </Text>
                <Text
                    sx={{
                        lineHeight: "25px",
                    }}
                >
                    The premium (z) is added to the paper plane minting fee and
                    can only increase. Regardless of your team's ultimate
                    performance,
                    <span
                        style={{
                            fontWeight: 700,
                            fontSize: "14px",
                            color: "#F2D861",
                        }}
                    >
                        {" "}
                        plane holders continue to earn this premium as the game
                        progresses.
                    </span>
                </Text>
                <Text
                    sx={{
                        marginTop: "14px",
                        fontWeight: 700,
                        fontSize: "14px",
                        color: "#F2D861",
                    }}
                >
                    Winning the Pot:
                </Text>
                <Text sx={{}}>
                    x and y percent are taken by the team leader and the Last
                    Plane that locks in the win for the team. The rest of the
                    pot is distributed within the winning team pro-rata based on
                    XP holdings. The pot only matters if your team wins, so join
                    a team that unites around a common goal:{" "}
                    <span
                        style={{
                            fontWeight: 700,
                            fontSize: "14px",
                            color: "#F2D861",
                        }}
                    >
                        holding the [ Last Plane ] position when any timer
                        counts down to zero.
                    </span>
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
