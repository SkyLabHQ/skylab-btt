import { Info } from "@/pages/TacToe";
import { Box, Image, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { shortenAddress } from "@/utils";
import { UserMarkType } from "@/skyConstants/bttGameTypes";
import useBidIcon from "@/hooks/useBidIcon";

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

export default ResultUserCard;
