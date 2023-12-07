import { Box, Text, Image } from "@chakra-ui/react";
import React, { useMemo } from "react";

import {
    EMOTES,
    MERCS,
    MESSAGES,
    MessageStatus,
} from "@/skyConstants/bttGameTypes";

export const Message = ({
    message = 0,
    emote = 0,
    messageLoading = MessageStatus.Unknown,
    emoteLoading = MessageStatus.Unknown,
    emoteIndex = 0,
    messageIndex = 0,
    status = "my",
}: {
    message: number;
    emote: number;
    messageLoading?: MessageStatus;
    emoteLoading?: MessageStatus;
    emoteIndex?: number;
    messageIndex?: number;
    status?: "my" | "op";
}) => {
    const [whiteTriangle, transparentTriangle] = useMemo(() => {
        if (status === "my") {
            return [
                {
                    borderRightColor: "#fff",
                    top: "0.5208vw",
                    left: "-1.0417vw",
                },
                {
                    borderRightColor: "#303030",
                    top: "0.5208vw",
                    left: "-0.9375vw",
                },
            ];
        } else {
            return [
                {
                    borderLeftColor: "#fff",
                    top: "0.5208vw",
                    right: "-1.0417vw",
                },
                {
                    borderLeftColor: "#303030",
                    top: "0.5208vw",
                    right: "-0.9375vw",
                },
            ];
        }
    }, [status]);

    const sendText = useMemo(() => {
        if (
            messageLoading === MessageStatus.Sending ||
            emoteLoading === MessageStatus.Sending
        ) {
            return "Sending";
        }

        if (
            messageLoading === MessageStatus.Sent ||
            emoteLoading === MessageStatus.Sent
        ) {
            return "Sent";
        }

        return "";
    }, [messageLoading, emoteLoading]);

    const showMessage = useMemo(() => {
        if (messageLoading !== MessageStatus.Unknown) {
            return MESSAGES[messageIndex - 1];
        } else if (message > 0) {
            return MESSAGES[message - 1];
        }
        return "";
    }, [message, messageLoading, messageIndex]);

    const showMercs = useMemo(() => {
        if (emoteLoading !== MessageStatus.Unknown) {
            return MERCS[emoteIndex - 1];
        } else if (emote > MERCS.length && emote === 0) {
            return "";
        } else if (emote > 0) {
            return MERCS[emote - 1];
        }

        return "";
    }, [emote, emoteLoading, emoteIndex]);

    const showEmote = useMemo(() => {
        if (emoteLoading !== MessageStatus.Unknown) {
            return EMOTES[emoteIndex - MERCS.length - 1];
        } else if (emote <= MERCS.length) {
            return "";
        } else if (emote > 0) {
            return EMOTES[emote - MERCS.length - 1];
        }

        return "";
    }, [emote, emoteLoading, emoteIndex]);

    return (
        <Box
            sx={{
                position: "relative",
                display:
                    emote === 0 &&
                    message === 0 &&
                    emoteLoading === MessageStatus.Unknown &&
                    messageLoading == MessageStatus.Unknown &&
                    "none",
            }}
        >
            <Box
                sx={{
                    border: "2px solid #fff",
                    height: "2.6042vw",
                    lineHeight: "2.6042vw",
                    borderRadius: "0.5208vw",
                    position: "relative",
                    padding: "0 0.5208vw",
                    display: "flex",
                    alignItems: "center",
                    minWidth: "5.2083vw",
                }}
            >
                <Box
                    sx={{
                        width: "0",
                        height: "0",
                        border: "0.5208vw solid transparent",
                        position: "absolute",
                        ...whiteTriangle,
                    }}
                ></Box>
                <Box
                    sx={{
                        width: "0",
                        height: "0",
                        border: "0.5208vw solid transparent",
                        position: "absolute",
                        ...transparentTriangle,
                    }}
                ></Box>

                {showMessage && (
                    <Text
                        sx={{
                            whiteSpace: "nowrap",
                            marginRight: "0.2604vw",
                            fontSize: "0.8333vw",
                        }}
                    >
                        {showMessage}
                    </Text>
                )}
                {showMercs && (
                    <Box
                        sx={{
                            height: "1.6667vw",
                            width: "1.6667vw",
                        }}
                    >
                        <Image src={showMercs}></Image>
                    </Box>
                )}

                {showEmote && (
                    <Text
                        sx={{
                            whiteSpace: "nowrap",
                        }}
                    >
                        {showEmote}
                    </Text>
                )}
            </Box>
            {sendText && (
                <Text
                    sx={{
                        color: "#bcbbbe",
                        fontSize: "0.8333vw",
                        position: "absolute",
                        bottom: "-1.3021vw",
                        left: "0",
                        width: "100%",
                    }}
                >
                    {sendText}
                </Text>
            )}
        </Box>
    );
};
