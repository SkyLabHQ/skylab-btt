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
import React from "react";
import CopyIcon from "./assets/copy-icon.svg";
import avatars from "@/skyConstants/avatars";
import { UserMarkIcon, UserMarkType } from "@/skyConstants/bttGameTypes";
import AdvantageIcon from "@/assets/advantage-icon.svg";
import { shortenAddress } from "@/utils";
import useSkyToast from "@/hooks/useSkyToast";
import { motion } from "framer-motion";

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
    const { onCopy } = useClipboard(address ?? "");
    const toast = useSkyToast();
    const direction = status === "my" ? "row" : "row-reverse";
    const popoverDirection = status === "my" ? "right" : "left";

    return (
        <Flex
            flexDir={"column"}
            align={status === "my" ? "flex-start" : "flex-end"}
        >
            <Box
                sx={{
                    borderRadius: "1.0417vw",
                    border: "1px solid #FDDC2D",
                    background: avatars[avatar],
                    width: "4.1667vw",
                    height: "4.1667vw",
                }}
            ></Box>
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
    avatar,
    name,
    status,
    open,
    onClick,
}: {
    avatar: number;
    name: string;
    showAdvantageTip?: boolean;
    mark?: number;
    address?: string;
    status?: "my" | "op";
    open: boolean;
    onClick?: () => void;
}) => {
    const direction = status === "my" ? "row" : "row-reverse";
    return (
        <Box
            onClick={() => {
                onClick?.();
            }}
        >
            <Flex sx={{ flexDirection: direction }}>
                <Box
                    sx={{
                        background: "rgb(214,214,214)",
                        width: "30px",
                        height: "40px",
                        borderRadius:
                            status === "my" ? "16px 0 0 16px" : "0 16px 16px 0",
                    }}
                ></Box>
                <motion.div
                    style={{
                        width: open ? "110px" : 0,
                        background: "rgb(168,168,168)",
                        height: "40px",
                        position: "relative",
                        transition: "all 0.1s ease-in-out",
                    }}
                >
                    {open && (
                        <Box
                            sx={{
                                margin:
                                    status === "my"
                                        ? "-20px 0 0 48px"
                                        : "-20px 0 0 16px",
                            }}
                        >
                            <Box
                                sx={{
                                    borderRadius: "12px",
                                    border: "1px solid #FDDC2D",
                                    background: avatars[avatar],
                                    width: "40px",
                                    height: "40px",
                                }}
                            ></Box>
                            <Text
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    color: "#000",
                                }}
                            >
                                {name}
                            </Text>
                        </Box>
                    )}
                </motion.div>
            </Flex>
        </Box>
    );
};

export const MUserProfileResult = ({
    avatar,
    name,
    status,
}: {
    avatar: number;
    name: string;
    showAdvantageTip?: boolean;
    mark?: number;
    address?: string;
    status?: "my" | "op";
}) => {
    return (
        <Flex
            sx={{}}
            flexDir={"column"}
            align={status === "my" ? "flex-start" : "flex-end"}
        >
            <Box
                sx={{
                    borderRadius: "12px",
                    border: "1px solid #FDDC2D",
                    background: avatars[avatar],
                    width: "40px",
                    height: "40px",
                }}
            ></Box>
            <Text
                sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#fff",
                }}
            >
                {name}
            </Text>
        </Flex>
    );
};

export default UserProfile;
