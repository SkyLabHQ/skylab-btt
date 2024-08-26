import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { shortenAddress } from "@/utils";
import { Info, UserMarkType } from "@/skyConstants/bttGameTypes";
import useBidIcon from "@/hooks/useBidIcon";
import { TournamentGameInfo } from "@/pages/TacToe";

const ResultUserCard = ({
    showResult,
    win,
    userInfo,
}: {
    showResult?: boolean;
    win?: boolean;
    userInfo: Info;
}) => {
    const UserMarkIcon = useBidIcon();

    const mark = useMemo(() => {
        if (win) {
            if (userInfo.mark === UserMarkType.Circle) {
                return UserMarkIcon.YellowCircle;
            } else if (userInfo.mark === UserMarkType.BotX) {
                return UserMarkIcon.YellowBotX;
            } else {
                return UserMarkIcon.YellowCross;
            }
        } else {
            if (userInfo.mark === UserMarkType.Circle) {
                return UserMarkIcon.Circle;
            } else if (userInfo.mark === UserMarkType.BotX) {
                return UserMarkIcon.BotX;
            } else {
                return UserMarkIcon.Cross;
            }
        }
    }, [win, userInfo]);

    return (
        <Box>
            <Box sx={{ height: "2.7083vw" }}>
                {showResult && (
                    <Box
                        sx={{
                            width: "5.4688vw",
                            height: "2.7083vw",
                            color: "#303030",
                            background: win ? "#fddc2d" : "#d9d9d9",
                            borderRadius: "0.9375vw",
                            fontSize: "1.875vw",
                            textAlign: "center",
                            lineHeight: "2.7083vw",
                        }}
                    >
                        {win ? "Win" : "Lose"}
                    </Box>
                )}
            </Box>

            <Image
                sx={{
                    width: "2.3958vw",
                    height: "2.3958vw",
                    marginTop: "1.5625vw",
                }}
                src={mark}
            ></Image>
            <Text
                sx={{
                    color: win ? "#fddc2d" : "#d9d9d9",
                    marginTop: "0.5208vw",
                    fontSize: "1.875vw",
                }}
            >
                {shortenAddress(userInfo.address)}
            </Text>
        </Box>
    );
};

export const ResultCard = ({
    win,
    userInfo,
}: {
    win?: boolean;
    userInfo: TournamentGameInfo;
}) => {
    const UserMarkIcon = useBidIcon();

    const mark = useMemo(() => {
        if (win) {
            if (userInfo.mark === UserMarkType.Circle) {
                return UserMarkIcon.YellowCircle;
            } else if (userInfo.mark === UserMarkType.BotX) {
                return UserMarkIcon.YellowBotX;
            } else {
                return UserMarkIcon.YellowCross;
            }
        } else {
            if (userInfo.mark === UserMarkType.Circle) {
                return UserMarkIcon.Circle;
            } else if (userInfo.mark === UserMarkType.BotX) {
                return UserMarkIcon.BotX;
            } else {
                return UserMarkIcon.Cross;
            }
        }
    }, [win, userInfo]);

    return (
        <Flex sx={{}} flexDir={"column"}>
            <Flex align={"center"}>
                <Box
                    sx={{
                        width: "105px",
                        height: "50px",
                        color: "#303030",
                        background: win ? "#fddc2d" : "#d9d9d9",
                        borderRadius: "18px",
                        fontSize: "36px",
                        textAlign: "center",
                        lineHeight: "50px",
                        marginRight: "16px",
                    }}
                >
                    {win ? "Win" : "Lose"}
                </Box>
                <Image
                    sx={{
                        width: "46px",
                        height: "46px",
                    }}
                    src={mark}
                ></Image>
            </Flex>

            <Flex
                sx={{
                    marginTop: "24px",
                }}
                align={"center"}
            >
                <Image
                    sx={{
                        width: "68px",
                        height: "68px",
                        borderRadius: "50%",
                        marginRight: "16px",
                    }}
                    src={userInfo.photoUrl}
                ></Image>
                <Text
                    sx={{
                        color: win ? "#fddc2d" : "#d9d9d9",
                        fontSize: "24px",
                    }}
                >
                    {userInfo.username
                        ? userInfo.username
                        : shortenAddress(userInfo.address)}
                </Text>
            </Flex>
        </Flex>
    );
};

export const OpResultCard = ({
    win,
    userInfo,
}: {
    win?: boolean;
    userInfo: TournamentGameInfo;
}) => {
    const UserMarkIcon = useBidIcon();

    const mark = useMemo(() => {
        if (win) {
            if (userInfo.mark === UserMarkType.Circle) {
                return UserMarkIcon.YellowCircle;
            } else if (userInfo.mark === UserMarkType.BotX) {
                return UserMarkIcon.YellowBotX;
            } else {
                return UserMarkIcon.YellowCross;
            }
        } else {
            if (userInfo.mark === UserMarkType.Circle) {
                return UserMarkIcon.Circle;
            } else if (userInfo.mark === UserMarkType.BotX) {
                return UserMarkIcon.BotX;
            } else {
                return UserMarkIcon.Cross;
            }
        }
    }, [win, userInfo]);

    return (
        <Flex sx={{}} flexDir={"column"} align={"flex-end"}>
            <Flex align={"center"}>
                <Image
                    sx={{
                        width: "46px",
                        height: "46px",
                        marginRight: "16px",
                    }}
                    src={mark}
                ></Image>
                <Box
                    sx={{
                        width: "105px",
                        height: "50px",
                        color: "#303030",
                        background: win ? "#fddc2d" : "#d9d9d9",
                        borderRadius: "18px",
                        fontSize: "36px",
                        textAlign: "center",
                        lineHeight: "50px",
                    }}
                >
                    {win ? "Win" : "Lose"}
                </Box>
            </Flex>

            <Flex
                sx={{
                    marginTop: "24px",
                }}
                align={"center"}
            >
                <Text
                    sx={{
                        color: win ? "#fddc2d" : "#d9d9d9",
                        marginTop: "10px",
                        fontSize: "24px",
                    }}
                >
                    {userInfo.username
                        ? userInfo.username
                        : shortenAddress(userInfo.address)}
                </Text>
                <Image
                    sx={{
                        width: "68px",
                        height: "68px",
                        borderRadius: "50%",
                        marginLeft: "16px",
                    }}
                    src={userInfo.photoUrl}
                ></Image>
            </Flex>
        </Flex>
    );
};

export default ResultUserCard;
