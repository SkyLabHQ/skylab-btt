import { Box, Image } from "@chakra-ui/react";
import React from "react";
import MessageActiveIcon from "./assets/message-active.svg";
import MessageIcon from "./assets/message.svg";
import EmoteActiveIcon from "./assets/emote-active.svg";
import EmoteIcon from "./assets/emote.svg";
import { EMOTES, MERCS, MESSAGES } from "@/skyConstants/bttGameTypes";

const Chat = ({
    onSetMessage,
}: {
    onSetMessage: (
        type: "setMessage" | "setEmote",
        emoteIndex?: number,
    ) => void;
}) => {
    const [active, setActive] = React.useState("message");

    const handleChangeActive = (type: string) => {
        setActive(type);
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "4.6875vw",
            }}
        >
            <Box
                sx={{
                    marginRight: "1.0417vw",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Image
                    src={active === "message" ? MessageActiveIcon : MessageIcon}
                    sx={{
                        marginRight: "0.5208vw",
                        cursor: "pointer",
                        width: "1.9792vw",
                        height: "1.9792vw",
                    }}
                    onClick={() => handleChangeActive("message")}
                />
                <Image
                    src={active === "emote" ? EmoteActiveIcon : EmoteIcon}
                    sx={{
                        cursor: "pointer",
                        width: "1.9792vw",
                        height: "1.9792vw",
                    }}
                    onClick={() => handleChangeActive("emote")}
                />
            </Box>

            {active === "message" &&
                MESSAGES.map((message, index) => {
                    return (
                        <Box
                            onClick={() => {
                                onSetMessage("setMessage", index + 1);
                            }}
                            key={index + 1}
                            sx={{
                                border: "2px solid #d9d9d9",
                                borderRadius: "0.5208vw",
                                marginRight: "0.4167vw",
                                height: "1.9792vw",
                                lineHeight: "1.9792vw",
                                padding: "0 0.4167vw",
                                cursor: "pointer",
                                fontSize: "0.8333vw",
                            }}
                        >
                            {message}
                        </Box>
                    );
                })}
            {active === "emote" && (
                <>
                    {MERCS.map((message, index) => {
                        return (
                            <Image
                                key={index}
                                src={message}
                                onClick={() => {
                                    onSetMessage("setEmote", index + 1);
                                }}
                                sx={{
                                    width: "1.9792vw",
                                    height: "1.9792vw",
                                    cursor: "pointer",
                                    marginRight: "0.4167vw",
                                    border: "2px solid #d9d9d9",
                                    borderRadius: "0.5208vw",
                                }}
                            ></Image>
                        );
                    })}
                    {EMOTES.map((message, index) => {
                        return (
                            <Box
                                onClick={() => {
                                    onSetMessage(
                                        "setEmote",
                                        MERCS.length + index + 1,
                                    );
                                }}
                                key={index + MERCS.length}
                                sx={{
                                    border: "2px solid #d9d9d9",
                                    borderRadius: "0.5208vw",
                                    marginRight: "0.4167vw",
                                    height: "1.9792vw",
                                    width: "1.9792vw",
                                    lineHeight: "1.9792vw",
                                    cursor: "pointer",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: "0.8333vw",
                                }}
                            >
                                {message}
                            </Box>
                        );
                    })}
                </>
            )}
        </Box>
    );
};

export default Chat;