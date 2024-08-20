import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { useMemo } from "react";
import { UserMarkIcon, UserMarkType } from "@/skyConstants/bttGameTypes";
import { shortenAddress } from "@/utils";
import { motion } from "framer-motion";
import UserLeftArrow from "./assets/user-left-arrow.svg";
import { TournamentGameInfo } from "@/pages/TacToe";
import { aviationImg } from "@/utils/aviationImg";
import useBidIcon from "@/hooks/useBidIcon";
import GoldIcon from "@/components/BttComponents/assets/gold-icon.svg";

export const MOpUserProfile = ({
    userGameInfo,
}: {
    userGameInfo: TournamentGameInfo;
}) => {
    const MarkIcon = useBidIcon();
    return (
        <Flex align={"center"}>
            <Image
                src={userGameInfo.photoUrl}
                sx={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    marginRight: "4px",
                    border: "1px solid #fff",
                }}
            ></Image>
            <Flex flexDir={"column"}>
                <Flex>
                    <Image
                        src={aviationImg(userGameInfo.level)}
                        sx={{
                            width: "24px",
                        }}
                    ></Image>
                    <Text>Lvl.{userGameInfo.level}</Text>
                </Flex>
                <Text
                    sx={{
                        fontSize: "12px",
                    }}
                >
                    {userGameInfo.username
                        ? `@${userGameInfo.username}`
                        : `${shortenAddress(userGameInfo.address)}`}
                </Text>
                <Flex>
                    <Image
                        src={GoldIcon}
                        sx={{
                            width: "22px",
                            margin: "0 4px",
                        }}
                    ></Image>
                    <Text
                        sx={{
                            fontSize: "20px",
                        }}
                    >
                        {userGameInfo.balance}
                    </Text>
                    <Image
                        src={
                            userGameInfo.mark === UserMarkType.Circle
                                ? MarkIcon.Circle
                                : MarkIcon.Cross
                        }
                        sx={{
                            width: "16px",
                        }}
                    ></Image>
                </Flex>
            </Flex>
        </Flex>
    );
};
export const MMyUserProfile = ({
    userGameInfo,
}: {
    userGameInfo: TournamentGameInfo;
}) => {
    const MarkIcon = useBidIcon();
    return (
        <Flex align={"center"}>
            <Flex flexDir={"column"} align={"flex-end"}>
                <Flex>
                    <Image
                        src={aviationImg(userGameInfo.level)}
                        sx={{
                            width: "24px",
                        }}
                    ></Image>
                    <Text>Lvl.{userGameInfo.level}</Text>
                </Flex>
                <Text
                    sx={{
                        fontSize: "12px",
                    }}
                >
                    {userGameInfo.username
                        ? `@${userGameInfo.username}`
                        : `${shortenAddress(userGameInfo.address)}`}
                </Text>
                <Flex>
                    <Image
                        src={
                            userGameInfo.mark === UserMarkType.Circle
                                ? MarkIcon.Circle
                                : MarkIcon.Cross
                        }
                        sx={{
                            width: "16px",
                        }}
                    ></Image>
                    <Image
                        src={GoldIcon}
                        sx={{
                            width: "22px",
                            margin: "0 4px",
                        }}
                    ></Image>
                    <Text
                        sx={{
                            fontSize: "20px",
                        }}
                    >
                        {userGameInfo.balance}
                    </Text>
                </Flex>
            </Flex>
            <Image
                src={userGameInfo.photoUrl}
                sx={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    marginLeft: "4px",
                    border: "1px solid #fff",
                }}
            ></Image>
        </Flex>
    );
};

export const MUserProfile = ({
    level,
    address,
    img,
    status,
    open,
    onClick,
}: {
    level?: number;
    address?: string;
    img?: string;
    showAdvantageTip?: boolean;
    mark?: number;
    status?: "my" | "op";
    open: boolean;
    onClick?: () => void;
}) => {
    const direction = status === "my" ? "row" : "row-reverse";

    const arrow = useMemo(() => {
        if (status === "my") {
            if (open) {
                return "rotate(180deg)";
            } else {
                return "";
            }
        } else {
            if (open) {
                return "";
            } else {
                return "rotate(180deg)";
            }
        }
    }, [open, status]);

    const info = useMemo(() => {
        if (status === "my") {
            return { right: "10px", alignItems: "flex-end" };
        } else {
            return { left: "10px", alignItems: "flex-start" };
        }
    }, [status]);

    return (
        <Box
            onClick={() => {
                onClick?.();
            }}
        >
            <Flex sx={{ flexDirection: direction }} alignItems={"flex-end"}>
                <Flex
                    justify={"center"}
                    align={"center"}
                    sx={{
                        background: "rgb(214,214,214)",
                        width: "30px",
                        height: "40px",
                        borderRadius:
                            status === "my" ? "16px 0 0 16px" : "0 16px 16px 0",
                    }}
                >
                    <Image
                        src={UserLeftArrow}
                        sx={{
                            width: "10px",
                            transform: arrow,
                        }}
                    ></Image>
                </Flex>
                <motion.div
                    style={{
                        height: "60px",
                        width: open ? (level ? "140px" : "110px") : 0,
                        transition: "all 0.1s linear",
                        position: "relative",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "flex-end",
                    }}
                >
                    <motion.div
                        style={{
                            background: "#bcbbbe",
                            width: "100%",
                            height: "40px",
                            position: "relative",
                            transition: "all 1s linear",
                        }}
                    ></motion.div>
                    <Flex
                        sx={{
                            margin:
                                status === "my" ? "-20px 0 0 0" : "-20px 0 0 0",
                            position: "absolute",
                            top: "20px",
                            ...info,
                        }}
                        flexDir={"column"}
                    >
                        {img && (
                            <Box
                                sx={{
                                    width: "40px",
                                    height: "40px",
                                    position: "relative",
                                }}
                            >
                                <Image
                                    src={img}
                                    sx={{
                                        position: "absolute",
                                        right: status === "my" ? "0" : "auto",
                                        left: status === "my" ? "auto" : "0",
                                        bottom: 0,
                                        width: "70px",
                                        maxWidth: "70px",
                                        transform:
                                            status === "my" ? "scaleX(-1)" : "",
                                    }}
                                ></Image>
                            </Box>
                        )}

                        <Flex
                            sx={{
                                flexDirection: direction,
                            }}
                            align={"center"}
                        >
                            {address && (
                                <Text
                                    sx={{
                                        fontSize: "12px",
                                        fontWeight: 700,
                                        color: "#000",
                                    }}
                                >
                                    {shortenAddress(address, 4, 4)}
                                </Text>
                            )}
                            {level && (
                                <Text
                                    sx={{
                                        fontSize: "14px",
                                        fontWeight: 700,
                                        color: "#000",
                                        margin: "0 4px",
                                    }}
                                >
                                    Lvl.{level}
                                </Text>
                            )}
                        </Flex>
                    </Flex>
                </motion.div>
            </Flex>
        </Box>
    );
};

export const MUserProfileResult = ({
    level,
    address,
    img,
    position,
}: {
    level?: number;
    address?: string;
    img?: string;
    position?: "left" | "right";
}) => {
    return (
        <>
            <Flex>
                {img && (
                    <Box
                        sx={{
                            width: "40px",
                            height: "40px",
                            position: "relative",
                        }}
                    >
                        <Image
                            src={img}
                            sx={{
                                position: "absolute",
                                left: position === "left" ? "0" : "auto",
                                right: position === "left" ? "auto" : "0",
                                bottom: 0,
                                width: "70px",
                                maxWidth: "70px",
                                transform:
                                    position === "left" ? "" : "scaleX(-1)",
                            }}
                        ></Image>
                    </Box>
                )}
            </Flex>
            <Flex align={"center"}>
                {level && (
                    <Text
                        sx={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "#fff",
                            margin: "0 4px",
                        }}
                    >
                        Lvl.{level}
                    </Text>
                )}
                {address && (
                    <Text
                        sx={{
                            fontSize: "12px",
                            color: "#fff",
                        }}
                    >
                        {shortenAddress(address, 4, 4)}
                    </Text>
                )}
            </Flex>
        </>
    );
};

export const MUserProfilePvp = ({
    nickname,
    status,
    mark,
}: {
    nickname?: string;
    mark?: number;
    status?: "my" | "op";
}) => {
    return (
        <Flex
            sx={{
                margin: status === "my" ? "0 0 0 10px" : "0 10px 0 0",

                "&>img": {
                    width: "10px",
                    height: "10px",
                    margin: "4px",
                },
            }}
            align={"center"}
            justify={"center"}
        >
            {nickname && status !== "my" && (
                <Text
                    sx={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#fff",
                    }}
                >
                    {nickname}
                </Text>
            )}
            {mark === UserMarkType.Circle && (
                <Image src={UserMarkIcon.Circle}></Image>
            )}
            {mark === UserMarkType.Cross && (
                <Image src={UserMarkIcon.Cross}></Image>
            )}
            {mark === UserMarkType.BotX && (
                <Image src={UserMarkIcon.BotX}></Image>
            )}
            {nickname && status === "my" && (
                <Text
                    sx={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#fff",
                    }}
                >
                    {nickname}
                </Text>
            )}
        </Flex>
    );
};

export default null;
