import {
    Box,
    Flex,
    Text,
    Image,
    PopoverContent,
    PopoverBody,
    Popover,
    PopoverTrigger,
    useClipboard,
} from "@chakra-ui/react";
import { useMemo } from "react";
import CopyIcon from "./assets/copy-icon.svg";
import avatars from "@/skyConstants/avatars";
import { UserMarkType } from "@/skyConstants/bttGameTypes";
import AdvantageIcon from "@/assets/advantage-icon.svg";
import { shortenAddress } from "@/utils";
import useSkyToast from "@/hooks/useSkyToast";
import { motion } from "framer-motion";
import UserLeftArrow from "./assets/user-left-arrow.svg";
import UserIcon from "./assets/user.svg";
import useBidIcon from "@/hooks/useBidIcon";

const UserProfile = ({
    address,
    avatar,
    name,
    status,
    mark,
    showAdvantageTip,
}: {
    avatar: number;
    name: string;
    showAdvantageTip?: boolean;
    mark?: number;
    address?: string;
    status?: "my" | "op";
}) => {
    const UserMarkIcon = useBidIcon();
    const { onCopy } = useClipboard(address ?? "");
    const toast = useSkyToast();
    const direction = status === "my" ? "row" : "row-reverse";
    const popoverDirection = status === "my" ? "right" : "left";

    return (
        <Flex
            flexDir={"column"}
            align={status === "my" ? "flex-start" : "flex-end"}
        >
            <Flex>
                <Box
                    sx={{
                        borderRadius: "1.0417vw",
                        border: "1px solid #FDDC2D",
                        background: avatars[avatar],
                        width: "4.1667vw",
                        height: "4.1667vw",
                    }}
                ></Box>
            </Flex>

            <Text
                sx={{
                    color: "#fff",
                    fontSize: "0.8333vw",
                    marginTop: "0.2083vw",
                }}
            >
                {name}
            </Text>
            <Flex
                sx={{
                    flexDirection: direction,
                    marginTop: "1.0417vw",
                }}
            >
                {mark === UserMarkType.Circle && (
                    <Image
                        width={"24px"}
                        height={"24px"}
                        src={UserMarkIcon.Circle}
                    ></Image>
                )}
                {mark === UserMarkType.Cross && (
                    <Image
                        width={"24px"}
                        height={"24px"}
                        src={UserMarkIcon.Cross}
                    ></Image>
                )}
                {showAdvantageTip && (
                    <Popover placement={popoverDirection}>
                        <PopoverTrigger>
                            <Image
                                src={AdvantageIcon}
                                sx={{
                                    cursor: "pointer",
                                    marginTop: "-1.5625vw",
                                    width: "18px",
                                }}
                            ></Image>
                        </PopoverTrigger>
                        <PopoverContent
                            sx={{
                                background: "#D9D9D9",
                                borderRadius: "0.5208vw",
                                border: "none",
                                color: "#000",
                                textAlign: "center",
                                "&:focus": {
                                    outline: "none !important",
                                    boxShadow: "none !important",
                                },
                            }}
                        >
                            <PopoverBody
                                sx={{
                                    textAlign: "left",
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: "0.8333vw",
                                    }}
                                >
                                    <span style={{ fontWeight: 600 }}>
                                        [Draw Advantage]
                                    </span>
                                    If your next bid equals to your opponent,
                                    {status === "op"
                                        ? "your opponent will win the grid"
                                        : "your will win the grid."}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: "0.7292vw",
                                        marginTop: "1.0417vw",
                                    }}
                                >
                                    Draw advantage belongs to loser of the
                                    previous grid. The first draw advantage of
                                    each game is given randomly.
                                </Text>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                )}
            </Flex>
            {address && (
                <Text
                    sx={{
                        fontSize: "0.8333vw",
                        cursor: "pointer",
                        marginTop: "0.3125vw",
                    }}
                    onClick={() => {
                        onCopy();
                        toast("Copy address success");
                    }}
                >
                    {shortenAddress(address, 5, 4)}
                    <Image
                        src={CopyIcon}
                        sx={{
                            width: "0.8333vw",
                            marginLeft: "0.5208vw",
                            display: "inline-block",
                            verticalAlign: "middle",
                        }}
                    ></Image>
                </Text>
            )}
        </Flex>
    );
};

export const MUserProfile = ({
    level,
    address,
    img,
    avatar,
    name,
    status,
    open,
    onClick,
}: {
    level?: number;
    address?: string;
    img?: string;
    avatar?: number;
    name?: string;
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
                        {avatar >= 0 && (
                            <Box
                                sx={{
                                    borderRadius: "12px",
                                    border: "1px solid #FDDC2D",
                                    background: avatars[avatar],
                                    width: "40px",
                                    height: "40px",
                                }}
                            ></Box>
                        )}
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
                        {name && (
                            <Text
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    color: "#000",
                                }}
                            >
                                {name}
                            </Text>
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
    avatar,
    name,
    showUserIcon = true,
    showAdvantageTip,
    position,
}: {
    level?: number;
    showUserIcon?: boolean;
    address?: string;
    img?: string;
    avatar?: number;
    name?: string;
    showAdvantageTip?: boolean;
    mark?: number;
    position?: "left" | "right";
}) => {
    return (
        <Flex
            flexDir={"column"}
            align={position === "left" ? "flex-start" : "flex-end"}
            sx={{
                padding: "0 12px",
            }}
        >
            <Flex align={"flex-end"}>
                {avatar >= 0 && (
                    <Box
                        sx={{
                            borderRadius: "12px",
                            border: "1px solid #FDDC2D",
                            background: avatars[avatar],
                            width: "40px",
                            height: "40px",
                        }}
                    ></Box>
                )}

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

                {position === "left" && showUserIcon && (
                    <Image
                        src={UserIcon}
                        sx={{
                            marginLeft: "10px",
                        }}
                    ></Image>
                )}
            </Flex>

            {name && (
                <Text
                    sx={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#fff",
                    }}
                >
                    {name}
                </Text>
            )}

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
        </Flex>
    );
};

export default UserProfile;
