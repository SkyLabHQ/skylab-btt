import { usePrivateGameContext } from "@/pages/PrivateRoom";
import {
    Box,
    Button,
    Image,
    Flex,
    Text,
    SimpleGrid,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MUserProfile } from "./UserProfile";
import MBalance from "../BttComponents/MBalance";
import Timer from "./Timer";
import {
    EMOTES,
    GameState,
    MERCS,
    MESSAGES,
} from "@/skyConstants/bttGameTypes";
import Board from "../TacToe/Board";
import AddIcon from "@/components/BttComponents/assets/add.svg";
import SubIcon from "@/components/BttComponents/assets/sub.svg";
import MessageIcon1 from "@/assets/message-icon.svg";
import MessageActiveIcon from "@/components/TacToe/assets/message-active.svg";
import MessageIcon from "@/components/TacToe/assets/message.svg";
import EmoteActiveIcon from "@/components/TacToe/assets/emote-active.svg";
import EmoteIcon from "@/components/TacToe/assets/emote.svg";
import ToolBar from "./Toolbar";
import { MMessage } from "./Message";
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

const MLayout = ({
    handleQuitClick,
    handleShareTw,
    nextDrawWinner,
    autoCommitTimeoutTime,
    bufferTime,
    bidAmount,
    showAnimateNumber,
    onInputChange,
    onConfirm,
    onSetMessage,
    emoteIndex,
    messageIndex,
    emoteLoading,
    messageLoading,
    loading,
}: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure({
        defaultIsOpen: true,
    });
    const { isOpen: opIsOpen, onToggle: opOnToggle } = useDisclosure({
        defaultIsOpen: true,
    });

    const { isOpen: keyBoardIsOpen, onToggle: keyBoardOnToggle } =
        useDisclosure();

    const [inputMode, setInputMode] = useState<"message" | "keyboard">(null);

    const { myGameInfo, opGameInfo, myInfo, opInfo, list } =
        usePrivateGameContext();
    const myGameState = myGameInfo.gameState;
    const balance = myGameInfo.balance;

    useEffect(() => {
        if (messageLoading || emoteLoading) {
            onClose();
        }
    }, [messageLoading, emoteLoading]);

    return (
        <Box
            sx={{
                position: "relative",
                paddingTop: "100px",
                height: "100%",
            }}
        >
            <ToolBar
                quitType="game"
                handleShareTw={handleShareTw}
                onQuitClick={handleQuitClick}
            ></ToolBar>
            <Flex
                sx={{
                    position: "absolute",
                    top: "12px",
                    left: 0,
                    alignItems: "flex-start",
                }}
                flexDir={"column"}
            >
                <Flex align={"flex-end"}>
                    <MUserProfile
                        status="op"
                        avatar={opInfo.avatar}
                        name={opInfo.name}
                        mark={opInfo.mark}
                        showAdvantageTip={opInfo.address === nextDrawWinner}
                        open={opIsOpen}
                        onClick={() => {
                            opOnToggle();
                        }}
                    ></MUserProfile>
                    {!opIsOpen && (
                        <MMessage
                            message={opGameInfo.message}
                            emote={opGameInfo.emote}
                            status={"op"}
                        ></MMessage>
                    )}
                </Flex>

                <MBalance
                    balance={opGameInfo.balance}
                    mark={opInfo.mark}
                ></MBalance>
            </Flex>

            <Flex
                align={"center"}
                justify={"center"}
                sx={{
                    marginTop: "60px",
                }}
            >
                <Board
                    list={list}
                    showAnimateNumber={showAnimateNumber}
                ></Board>
            </Flex>
            <Box
                sx={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        height: "100px",
                        position: "relative",
                    }}
                >
                    <Flex justify={"space-between"} align={"flex-end"}>
                        {myGameInfo.gameState < GameState.Commited && (
                            <Box
                                sx={{
                                    width: "200px",
                                    position: "absolute",
                                    left: "12px",
                                    bottom: "4px",
                                }}
                            >
                                <Timer
                                    direction="top"
                                    time1={autoCommitTimeoutTime}
                                    time2={bufferTime}
                                    time1Gray={
                                        myGameInfo.gameState ===
                                            GameState.Commited || loading
                                    }
                                ></Timer>
                            </Box>
                        )}
                    </Flex>
                    <Flex
                        sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                        }}
                        flexDir={"column"}
                        align={"flex-end"}
                    >
                        <Flex align={"flex-end"}>
                            {!isOpen && (
                                <MMessage
                                    message={myGameInfo.message}
                                    emote={myGameInfo.emote}
                                    status={"my"}
                                    emoteIndex={emoteIndex}
                                    messageIndex={messageIndex}
                                    emoteLoading={emoteLoading}
                                    messageLoading={messageLoading}
                                ></MMessage>
                            )}
                            <MUserProfile
                                status="my"
                                avatar={myInfo.avatar}
                                name={myInfo.name}
                                mark={myInfo.mark}
                                showAdvantageTip={
                                    myInfo.address === nextDrawWinner
                                }
                                open={isOpen}
                                onClick={() => {
                                    if (isOpen) {
                                        onClose();
                                    } else {
                                        onOpen();
                                    }
                                }}
                            ></MUserProfile>
                        </Flex>

                        <MBalance
                            balance={myGameInfo.balance}
                            status="op"
                            mark={myInfo.mark}
                        ></MBalance>
                    </Flex>
                </Box>

                <Flex
                    sx={{
                        height: "48px",
                        background: "#787878",
                        padding: "0 16px",
                    }}
                    justify={"space-between"}
                    align={"center"}
                >
                    <Flex
                        sx={{
                            borderRadius: "8px",
                            border: "2px solid #fff",
                            width: "172px",
                            height: "32px",
                            background: "#616161",
                        }}
                        justify={"space-between"}
                    >
                        <Image
                            src={SubIcon}
                            sx={{
                                width: "18px",
                                margin: "4px",
                            }}
                            onClick={() => {
                                if (bidAmount - 1 < 0) return;
                                onInputChange(bidAmount - 1);
                            }}
                        ></Image>
                        <Box
                            onClick={(e) => {
                                if (inputMode === "keyboard") {
                                    keyBoardOnToggle();
                                } else {
                                    setInputMode("keyboard");
                                    if (!keyBoardIsOpen) {
                                        keyBoardOnToggle();
                                    }
                                }
                            }}
                        >
                            {bidAmount !== "" ? (
                                <Text
                                    sx={{
                                        width: "100px",
                                        color: "#fff",
                                        fontSize: "20px",
                                        textAlign: "center",
                                    }}
                                >
                                    {bidAmount}
                                </Text>
                            ) : (
                                <Text
                                    sx={{
                                        width: "100px",
                                        color: "rgba(120, 120, 120, 1)",
                                        fontSize: "20px",
                                    }}
                                >
                                    Input Bid
                                </Text>
                            )}
                        </Box>
                        <Image
                            src={AddIcon}
                            onClick={() => {
                                if (bidAmount + 1 > balance) return;

                                onInputChange(bidAmount + 1);
                            }}
                            sx={{
                                width: "18px",
                                margin: "4px",
                            }}
                        ></Image>
                    </Flex>

                    <>
                        {loading ? (
                            <Button
                                disabled={true}
                                variant={"outline"}
                                sx={{
                                    color: "#BCBBBE",
                                    fontSize: "18px",
                                    height: "32px",
                                    width: "100px",
                                    "&:disabled": {
                                        border: "2px solid #fff !important",
                                        opacity: 1,
                                        background: "transparent",
                                    },
                                    "&:hover[disabled]": {
                                        background: "transparent",
                                    },
                                }}
                            >
                                Confirming
                            </Button>
                        ) : (
                            <Button
                                onClick={() => {
                                    onConfirm();
                                }}
                                disabled={
                                    myGameState === GameState.Commited ||
                                    myGameState === GameState.Revealed
                                }
                                variant={"outline"}
                                sx={{
                                    color: "#fddc2d",
                                    border: "2px solid #fddc2d !important",
                                    background:
                                        myGameState === GameState.Commited ||
                                        myGameState === GameState.Revealed
                                            ? "linear-gradient(180deg, rgba(253, 220, 45, 0.50) 0%, rgba(253, 220, 45, 0.00) 100%)"
                                            : "transparent",
                                    fontSize: "18px",
                                    height: "32px",
                                    width: "100px",
                                    "&:disabled": {
                                        border: "2px solid #fddc2d !important",
                                        opacity: 1,
                                    },
                                    "&:hover[disabled]": {
                                        background:
                                            myGameState ===
                                                GameState.Commited ||
                                            myGameState === GameState.Revealed
                                                ? "linear-gradient(180deg, rgba(253, 220, 45, 0.50) 0%, rgba(253, 220, 45, 0.00) 100%)"
                                                : "transparent",
                                    },
                                }}
                            >
                                {myGameState === GameState.Commited ||
                                myGameState === GameState.Revealed
                                    ? "Confirmed"
                                    : "Confirm"}
                            </Button>
                        )}
                    </>
                    <Image
                        src={MessageIcon1}
                        onClick={() => {
                            if (inputMode === "message") {
                                keyBoardOnToggle();
                            } else {
                                setInputMode("message");
                                if (!keyBoardIsOpen) {
                                    keyBoardOnToggle();
                                }
                            }
                        }}
                    ></Image>
                </Flex>
                <Box
                    sx={{
                        background: "#303030",
                        height: keyBoardIsOpen ? "108px" : "0px",
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
                                            if (
                                                item + Number(bidAmount) >
                                                myGameInfo.balance
                                            ) {
                                                onInputChange(
                                                    myGameInfo.balance,
                                                );
                                                return;
                                            }
                                            onInputChange(
                                                item + Number(bidAmount),
                                            );
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
                                onClick={() => {
                                    const value = bidAmount.toString();
                                    const length = value.length;
                                    const newValue = value.slice(0, length - 1);
                                    onInputChange(newValue);
                                }}
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
            </Box>
        </Box>
    );
};

export default MLayout;
