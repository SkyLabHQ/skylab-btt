import { Box, Flex, Text, Image } from "@chakra-ui/react";

import RewardVideo from "./assets/reward.mp4";

const CircleContent = ({ text }: { text: React.ReactNode }) => {
    return (
        <Box
            sx={{
                paddingLeft: "40px",
                position: "relative",
            }}
        >
            <Box
                sx={{
                    width: "15px",
                    height: "15px",
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                    position: "absolute",
                    left: "0px",
                    top: "18px",
                }}
            ></Box>
            <Text>{text}</Text>
        </Box>
    );
};

const RuleContent3 = () => {
    return (
        <Box>
            <Box
                sx={{
                    height: "515px",
                }}
            >
                <Text
                    sx={{
                        fontSize: "40px",

                        fontWeight: 700,
                        textAlign: "center",
                    }}
                >
                    League and League Leader
                </Text>
                <video
                    autoPlay
                    loop
                    muted
                    style={{
                        width: "100%",
                        margin: "20px auto",
                    }}
                >
                    <source src={RewardVideo} type="video/mp4" />
                </video>
            </Box>
            <Text
                sx={{
                    fontSize: "30px",
                    lineHeight: "50px",
                    marginTop: "16px",
                }}
            >
                League leader decides on{" "}
                <span
                    style={{
                        fontWeight: 700,
                    }}
                >
                    three parameters of a league.
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
                                fontSize: "24px",
                                fontWeight: 400,
                            }}
                        >
                            x - league leader takerate:{" "}
                            <span
                                style={{
                                    fontWeight: 700,
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
                                fontSize: "24px",
                                fontWeight: 400,
                            }}
                        >
                            y - winning newcomer takerate:{" "}
                            <span
                                style={{
                                    fontWeight: 700,
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
                                fontSize: "24px",
                                fontWeight: 400,
                            }}
                        >
                            z - paper plane league premium (in eth) -a cash flow
                            that goes directly to existing plane holders or the
                            inviter,{" "}
                            <span
                                style={{
                                    fontWeight: 700,
                                }}
                            >
                                {" "}
                                distributed pro-rata based on xp
                            </span>
                        </Text>
                    }
                ></CircleContent>
            </Box>
            <Text
                sx={{
                    marginTop: "54px",
                    fontSize: "30px",
                }}
            >
                Z can be changed be it can only go up.{" "}
                <span
                    style={{
                        fontWeight: 700,
                    }}
                >
                    The pot is distributed pro-rata based on the winning
                    league's xp ownership.
                </span>
            </Text>
            <Text
                sx={{
                    marginTop: "62px",
                    fontSize: "30px",
                }}
            >
                All of the above only matters when your league wins. So, degens,{" "}
                <span
                    style={{
                        fontWeight: 700,
                    }}
                >
                    join the league with the strongest community uniting around
                    a common goal: winning.
                </span>
            </Text>
        </Box>
    );
};

export default RuleContent3;
