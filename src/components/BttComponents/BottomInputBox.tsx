import { Box, Image, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { GameState } from "@/skyConstants/bttGameTypes";
import AddIcon from "@/components/BttComponents/assets/add.svg";
import SubIcon from "@/components/BttComponents/assets/sub.svg";
import MessageIcon1 from "./assets/message-dot.svg";

const BottomInputBox = ({
    bidAmount,
    loading,
    myGameState,
    onSubClick,
    onAddClick,
    onConfirm,
    onMessageClick,
    onInputAmountClick,
}: {
    bidAmount: string;
    loading: boolean;
    myGameState: GameState;
    onSubClick: () => void;
    onAddClick: () => void;
    onConfirm: () => void;
    onMessageClick: () => void;
    onInputAmountClick: () => void;
}) => {
    return (
        <Flex
            sx={{
                height: "48px",
                background: "#787878",
                padding: "0 12px",
            }}
            justify={"space-between"}
            align={"center"}
        >
            <Flex
                sx={{
                    borderRadius: "8px",
                    border: "2px solid #fff",
                    height: "32px",
                    background: "#616161",
                    width: "160px",
                }}
                justify={"space-between"}
            >
                <Flex
                    sx={{
                        width: "32px",
                        background: "#fff",
                    }}
                    align={"center"}
                    justify={"center"}
                    flexDir={"column"}
                    onClick={onSubClick}
                >
                    <Image
                        src={SubIcon}
                        sx={{
                            width: "18px",
                            margin: "4px",
                        }}
                    ></Image>
                </Flex>
                <Box
                    onClick={(e) => {
                        onInputAmountClick();
                    }}
                    sx={{
                        flex: 1,
                        textAlign: "center",
                    }}
                >
                    {bidAmount !== "" ? (
                        <Text
                            sx={{
                                color: "#fff",
                                fontSize: "20px",
                            }}
                        >
                            {bidAmount}
                        </Text>
                    ) : (
                        <Text
                            sx={{
                                color: "rgba(120, 120, 120, 1)",
                                fontSize: "14px",
                            }}
                        >
                            Input Bid
                        </Text>
                    )}
                </Box>
                <Flex
                    sx={{
                        width: "32px",
                        background: "#fff",
                    }}
                    align={"center"}
                    justify={"center"}
                    flexDir={"column"}
                    onClick={onAddClick}
                >
                    <Image
                        src={AddIcon}
                        sx={{
                            width: "18px",
                            margin: "4px",
                        }}
                    ></Image>
                </Flex>
            </Flex>

            <Box>
                {loading ? (
                    <Text
                        sx={{
                            color: "#fff",
                            fontSize: "16px",
                            width: "104px",
                            textAlign: "center",
                        }}
                    >
                        Confirming
                    </Text>
                ) : (
                    <Text
                        onClick={() => {
                            onConfirm();
                        }}
                        sx={{
                            color:
                                myGameState === GameState.WaitingForBid
                                    ? "#FDDC2D"
                                    : "#414141",
                            fontSize: "18px",
                            width: "114px",
                            textAlign: "center",
                            fontWeight: "bold",
                        }}
                    >
                        {myGameState === GameState.Commited ||
                        myGameState === GameState.Revealed
                            ? "Confirmed"
                            : "Confirm"}
                    </Text>
                )}
            </Box>
            <Image
                src={MessageIcon1}
                onClick={onMessageClick}
                sx={{
                    width: "32px",
                }}
            ></Image>
        </Flex>
    );
};

export default BottomInputBox;
