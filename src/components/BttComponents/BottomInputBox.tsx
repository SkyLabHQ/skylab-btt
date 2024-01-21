import { Box, Button, Image, Flex, Text } from "@chakra-ui/react";
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
                className="btt-1-step"
                sx={{
                    borderRadius: "8px",
                    border: "2px solid #fff",
                    height: "32px",
                    background: "#616161",
                    flex: 1,
                    marginRight: "10px",
                }}
                justify={"space-between"}
            >
                <Image
                    src={SubIcon}
                    sx={{
                        width: "18px",
                        margin: "4px",
                    }}
                    onClick={onSubClick}
                ></Image>
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
                                fontSize: "20px",
                            }}
                        >
                            Input Bid
                        </Text>
                    )}
                </Box>
                <Image
                    src={AddIcon}
                    onClick={onAddClick}
                    sx={{
                        width: "18px",
                        margin: "4px",
                    }}
                ></Image>
            </Flex>

            <Box
                sx={{
                    marginRight: "10px",
                }}
            >
                {loading ? (
                    <Button
                        disabled={true}
                        variant={"outline"}
                        sx={{
                            color: "#BCBBBE",
                            fontSize: "16px",
                            height: "32px",
                            width: "104px",
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
                            fontSize: "16px",
                            height: "32px",
                            width: "104px",
                            "&:disabled": {
                                border: "2px solid #fddc2d !important",
                                opacity: 1,
                            },
                            "&:hover[disabled]": {
                                background:
                                    myGameState === GameState.Commited ||
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
