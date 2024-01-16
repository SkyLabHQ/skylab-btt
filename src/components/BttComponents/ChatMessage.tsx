import { Box, Image, Flex, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { EMOTES, MERCS, MESSAGES } from "@/skyConstants/bttGameTypes";

import MessageActiveIcon from "@/components/TacToe/assets/message-active.svg";
import MessageIcon from "@/components/TacToe/assets/message.svg";
import EmoteActiveIcon from "@/components/TacToe/assets/emote-active.svg";
import EmoteIcon from "@/components/TacToe/assets/emote.svg";
import KeyDeleteIcon from "./assets/key-delete.svg";

const ChatMessage = ({
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
        <Flex height={"100%"}>
            <Box
                sx={{
                    width: "38px",
                    borderRight: "1px solid #fff",
                }}
            >
                <Flex
                    align={"center"}
                    justify={"center"}
                    flexDirection={"column"}
                    sx={{
                        height: "54px",
                    }}
                >
                    <Image
                        src={
                            active === "message"
                                ? MessageActiveIcon
                                : MessageIcon
                        }
                        sx={{
                            marginRight: "0.5208vw",
                            cursor: "pointer",
                            width: "30px",
                            height: "30px",
                        }}
                        onClick={() => handleChangeActive("message")}
                    />
                </Flex>
                <Flex
                    align={"center"}
                    justify={"center"}
                    flexDirection={"column"}
                    sx={{
                        height: "54px",
                        borderTop: "1px solid #fff",
                    }}
                >
                    <Image
                        src={active === "emote" ? EmoteActiveIcon : EmoteIcon}
                        sx={{
                            cursor: "pointer",
                            width: "30px",
                            height: "30px",
                        }}
                        onClick={() => handleChangeActive("emote")}
                    />
                </Flex>
            </Box>
            <Box
                sx={{
                    paddingTop: "20px",
                    height: "100px",
                    overflow: "auto",
                    flex: 1,
                }}
            >
                <SimpleGrid
                    margin={"0 auto"}
                    width={"180px"}
                    columns={active === "message" ? 1 : 5}
                    spacingY={"4px"}
                >
                    {active === "message" &&
                        MESSAGES.map((message, index) => {
                            return (
                                <Flex
                                    onClick={() => {
                                        onSetMessage("setMessage", index + 1);
                                    }}
                                    key={index + 1}
                                    sx={{
                                        border: "2px solid #d9d9d9",
                                        borderRadius: "10px",
                                        paddingLeft: "5px",
                                        fontSize: "12px",
                                        width: "180px",
                                        height: "28px",
                                    }}
                                    align={"center"}
                                >
                                    {message}
                                </Flex>
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
                                            width: "30px",
                                            height: "30px",
                                            cursor: "pointer",
                                            marginRight: "0.4167vw",
                                            border: "2px solid #d9d9d9",
                                            borderRadius: "8px",
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
                                            borderRadius: "8px",
                                            width: "30px",
                                            height: "30px",
                                            lineHeight: "30px",
                                            cursor: "pointer",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            fontSize: "16px",
                                        }}
                                    >
                                        {message}
                                    </Box>
                                );
                            })}
                        </>
                    )}
                </SimpleGrid>
            </Box>
        </Flex>
    );
};

const BottomKeyBoard = ({
    inputMode,
    open,
    onNumberClick,
    onDeleteClick,
    onSetMessage,
}: {
    inputMode: "keyboard" | "message";
    open: boolean;
    onNumberClick: (value: string) => void;
    onDeleteClick: () => void;
    onSetMessage: (
        type: "setMessage" | "setEmote",
        emoteIndex?: number,
    ) => void;
}) => {
    return (
        <Box
            sx={{
                background: "#303030",
                height: open ? "108px" : "0px",
                overflow: "hidden",
                transition: "height 0.3s",
            }}
        >
            {inputMode === "keyboard" && (
                <SimpleGrid
                    columns={3}
                    spacingX={2}
                    spacingY={2}
                    sx={{
                        padding: "10px",
                    }}
                >
                    {[5, 10, 15, 20, 30].map((item) => {
                        return (
                            <Flex
                                onClick={() => {
                                    onNumberClick(item.toString());
                                }}
                                align={"center"}
                                justify={"center"}
                                key={item}
                                sx={{
                                    borderRadius: "4px",
                                    background: "#787878",
                                    height: "40px",
                                    fontSize: "28px",
                                }}
                            >
                                +{item}
                            </Flex>
                        );
                    })}

                    <Image
                        onClick={onDeleteClick}
                        src={KeyDeleteIcon}
                        sx={{
                            width: "100%",
                        }}
                    ></Image>
                </SimpleGrid>
            )}

            {inputMode === "message" && (
                <ChatMessage onSetMessage={onSetMessage}></ChatMessage>
            )}
        </Box>
    );
};

export default BottomKeyBoard;
