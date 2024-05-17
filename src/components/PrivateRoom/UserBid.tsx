import React, { useEffect, useMemo } from "react";
import AdvantageIcon from "@/assets/advantage-icon.svg";
import { motion } from "framer-motion";
import {
    Box,
    Image,
    Text,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    NumberInput,
    NumberInputField,
    Flex,
} from "@chakra-ui/react";
import GoldIcon from "@/assets/gold.svg";
import AddIcon from "@/assets/add-icon.svg";
import SubIcon from "@/assets/sub-icon.svg";
import DotIcon from "@/assets/dot3.svg";
import UnlockIcon from "@/assets/unlock.svg";
import LockIcon from "@/assets/lock.svg";
import { useCountUp } from "react-countup";
import { GameState } from "@/skyConstants/bttGameTypes";
import ConfirmVideo from "@/assets/confirm.wav";

interface UserCardProps {
    showTutorialStep?: boolean;
    loading?: boolean;
    balance: number;
    bidAmount?: number;
    myGameState?: number;
    opGameState?: number;
    onConfirm?: () => void;
    onInputChange?: (value: number) => void;
    revealing?: boolean;
    onReveal?: () => void;
}

export const AdvantageTip = ({
    direction,
    markIcon,
    showAdvantageTip,
}: {
    direction: "right" | "left";
    markIcon: string;
    showAdvantageTip: boolean;
}) => {
    return (
        <Box
            sx={{
                width: "fit-content",
                marginTop: "1.5625vw",
            }}
        >
            <Popover placement={direction}>
                <Image src={markIcon} sx={{ width: "1.875vw" }}></Image>
                <PopoverTrigger>
                    <Box
                        sx={{
                            position: "relative",
                        }}
                    >
                        {showAdvantageTip && (
                            <Image
                                src={AdvantageIcon}
                                sx={{
                                    position: "absolute",
                                    top: "-2.8646vw",
                                    right:
                                        direction === "right"
                                            ? "-1.3021vw"
                                            : "1.5625vw",
                                    cursor: "pointer",
                                }}
                            ></Image>
                        )}
                    </Box>
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
                            {direction === "left"
                                ? "your opponent will win the grid"
                                : "your will win the grid."}
                        </Text>
                        <Text
                            style={{
                                fontSize: "0.7292vw",
                                marginTop: "1.0417vw",
                            }}
                        >
                            Draw advantage belongs to loser of the previous
                            grid. The first draw advantage of each game is given
                            randomly.
                        </Text>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Box>
    );
};

export const MyBid = ({
    showTutorialStep,
    loading,
    balance,
    bidAmount,
    myGameState,
    opGameState,
    revealing,
    onReveal,
    onConfirm,
    onInputChange,
}: UserCardProps) => {
    const countUpRef = React.useRef(null);
    const { update } = useCountUp({
        ref: countUpRef,
        end: balance,
        duration: 1,
        prefix: "/ ",
    });

    const [commitButtonText, status] = useMemo(() => {
        if (myGameState === GameState.WaitingForBid) {
            return loading ? ["Confirming", 0] : ["Confirm", 1];
        } else if (myGameState === GameState.Commited) {
            if (opGameState === GameState.WaitingForBid) {
                return ["Confirmed", 0];
            } else if (
                opGameState === GameState.Commited ||
                opGameState === GameState.Revealed
            ) {
                if (revealing) {
                    return ["Revealing", 0];
                } else {
                    return ["Reveal", 2];
                }
            }
        } else if (myGameState === GameState.Revealed) {
            return ["Revealed", 0];
        }
        return ["Confirm", 0];
    }, [loading, revealing, myGameState, opGameState]);

    useEffect(() => {
        update(balance);
    }, [balance]);

    useEffect(() => {
        const keyboardListener = (event: KeyboardEvent) => {
            const key = event.key;
            event.shiftKey && key === "Enter";
            switch (key) {
                case "ArrowUp":
                    onInputChange?.(bidAmount + 1);
                    break;

                case "ArrowDown": {
                    onInputChange?.(bidAmount - 1);
                    break;
                }
            }

            if (event.shiftKey && key === "Enter") {
                onConfirm();
            }
        };
        document.addEventListener("keydown", keyboardListener);
        return () => {
            document.removeEventListener("keydown", keyboardListener);
        };
    }, [onConfirm, bidAmount]);
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
            }}
        >
            <Box
                sx={{
                    background: "#787878",
                    borderRadius: "1.0417vw",
                    height: "13.5417vw",
                    padding: "0.3646vw 0.8333vw 0.625vw 1.9792vw",
                    marginTop: "0.7813vw",
                }}
            >
                <Box
                    sx={{
                        width: "9.6875vw",
                        height: "2.5vw",
                        background: "#bcbbbe",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "1.3542vw",
                        paddingLeft: "0.7292vw",
                    }}
                >
                    <Image src={GoldIcon} sx={{ width: "2.8125vw" }}></Image>
                    <Text
                        sx={{
                            textShadow: "1px 1px 0 #303030",
                            fontSize: "1.25vw",
                            color: "#fddc2d",
                            marginLeft: "0.6771vw",
                        }}
                    >
                        GOLD
                    </Text>
                </Box>
                <Box
                    className={
                        showTutorialStep
                            ? "btt-first-step btt-second-step btt-third-step"
                            : ""
                    }
                >
                    <Box
                        sx={{
                            marginTop: "0.7813vw",
                            display: "flex",
                        }}
                    >
                        <Box>
                            <Text sx={{ fontSize: "1.25vw" }}>Bid</Text>
                            <Box
                                sx={{
                                    position: "relative",
                                }}
                            >
                                <Image
                                    src={SubIcon}
                                    sx={{
                                        position: "absolute",
                                        left: "-1.5625vw",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer",
                                        width: "1.25vw",
                                    }}
                                    onClick={() => {
                                        if (bidAmount - 1 < 0) return;

                                        onInputChange(bidAmount - 1);
                                    }}
                                ></Image>
                                <Image
                                    src={AddIcon}
                                    onClick={() => {
                                        if (bidAmount + 1 > balance) return;

                                        onInputChange(bidAmount + 1);
                                    }}
                                    sx={{
                                        position: "absolute",
                                        right: "-1.5625vw",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer",
                                        width: "1.25vw",
                                    }}
                                ></Image>
                                <motion.div
                                    style={{
                                        height: "2.2917vw",
                                        width: "6.25vw",
                                        borderRadius: "0.9375vw",
                                        overflow: "hidden",
                                        border: "3px solid #fff",
                                        background: "rgba(255, 255, 255, 0.40)",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                    animate={{
                                        border:
                                            myGameState !==
                                                GameState.WaitingForBid ||
                                            loading
                                                ? [
                                                      "4px solid #fff",
                                                      "4px solid #fff",
                                                  ]
                                                : [
                                                      "4px solid #fff",
                                                      "4px solid #fddc2d",
                                                  ],
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                    }}
                                >
                                    <NumberInput
                                        isDisabled={
                                            loading ||
                                            myGameState !==
                                                GameState.WaitingForBid
                                        }
                                        variant="unstyled"
                                        max={balance}
                                        min={0}
                                        value={bidAmount ?? 0}
                                        sx={{
                                            "& input": {
                                                color: "#fff",
                                                lineHeight: "1",
                                                padding: 0,
                                                fontSize: "1.6667vw",
                                                width: "100%",
                                                textAlign: "center",
                                            },
                                        }}
                                        onChange={(e) => {
                                            if (Number(e) > balance) {
                                                onInputChange(balance);
                                                return;
                                            }
                                            onInputChange(Number(e));
                                        }}
                                    >
                                        <NumberInputField />
                                    </NumberInput>
                                </motion.div>
                            </Box>
                        </Box>

                        <Box
                            style={{
                                marginLeft: "1.5625vw",
                                flex: 1,
                            }}
                        >
                            <Text
                                sx={{
                                    fontSize: "0.8333vw",
                                    textAlign: "right",
                                    flex: 1,
                                    color: "#bcbbbe",
                                    lineHeight: "1.875vw",
                                }}
                            >
                                Remaining
                            </Text>
                            <Box
                                ref={countUpRef}
                                sx={{
                                    fontSize: "1.6667vw",
                                    textAlign: "right",
                                    flex: 1,
                                    color: "#bcbbbe",
                                }}
                            ></Box>
                        </Box>
                    </Box>
                    <Flex
                        onClick={() => {
                            const audio = new Audio(ConfirmVideo);
                            audio.play();
                            if (status === 1) {
                                onConfirm();
                            } else if (status === 2) {
                                onReveal();
                            }
                        }}
                        sx={{
                            marginTop: "0.5208vw",
                            fontSize: "0.8333vw",
                            height: "2.2917vw",
                            width: "6.25vw",
                            background:
                                status === 0 ? "transparent" : "#FDDC2D",
                            borderRadius: "16px",
                            color: status === 0 ? "#414141" : "#1b1b1b",
                            fontWeight: "bold",
                            animationIterationCount: "2",
                            cursor: status === 0 ? "not-allowed" : "pointer",
                        }}
                        align={"center"}
                        justify={"center"}
                    >
                        {commitButtonText}
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
};

export const OpBid = ({
    balance,
    opGameState,
    myGameState,
    bidAmount,
}: UserCardProps) => {
    return (
        <Box
            sx={{
                background: "#787878",
                borderRadius: "1.0417vw",
                height: "13.5417vw",
                padding: "0.3646vw 0.8333vw 0.625vw 0.8333vw",
                marginTop: "0.7813vw",
                width: "13.0208vw",
            }}
        >
            <Box
                sx={{
                    width: "9.6875vw",
                    height: "2.5vw",
                    background: "#bcbbbe",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "1.3542vw",
                    paddingLeft: "0.7292vw",
                }}
            >
                <Image src={GoldIcon} sx={{ width: "2.8125vw" }}></Image>
                <Text
                    sx={{
                        textShadow: "1px 1px 0 #303030",
                        fontSize: "1.25vw",
                        color: "#fddc2d",
                        marginLeft: "0.6771vw",
                    }}
                >
                    GOLD
                </Text>
            </Box>
            <Box>
                <Box sx={{ marginTop: "0.7813vw", display: "flex" }}>
                    <Box>
                        <Text sx={{ fontSize: "1.25vw" }}>Bid</Text>
                        <Box
                            sx={{
                                height: "2.2917vw",
                                background: "#4a4a4a",
                                borderRadius: "0.9375vw",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "#000000",
                                fontSize: "1.6667vw",
                                width: "6.25vw",
                            }}
                        >
                            {bidAmount !== undefined && (
                                <Text
                                    sx={{
                                        color: "#fddc2d",
                                        fontSize: "1.6667vw",
                                    }}
                                >
                                    {bidAmount}
                                </Text>
                            )}
                            {opGameState === GameState.Commited && (
                                <Image
                                    src={LockIcon}
                                    sx={{
                                        width: "2.0417vw",
                                    }}
                                ></Image>
                            )}

                            {opGameState === GameState.WaitingForBid && (
                                <motion.div
                                    animate={{
                                        opacity: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                    }}
                                >
                                    <Image
                                        src={DotIcon}
                                        sx={{
                                            width: "4.0417vw",
                                        }}
                                    ></Image>
                                </motion.div>
                            )}

                            {opGameState === GameState.Revealed && (
                                <Image
                                    src={UnlockIcon}
                                    sx={{
                                        width: "2.0417vw",
                                    }}
                                ></Image>
                            )}
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Text
                            sx={{
                                fontSize: "0.8333vw",
                                textAlign: "right",
                                flex: 1,
                                color: "#bcbbbe",
                                lineHeight: "1.875vw",
                            }}
                        >
                            Remaining
                        </Text>
                        <Text
                            sx={{
                                fontSize: "1.6667vw",
                                textAlign: "right",
                                margin: "0vw 0 0 0.5208vw",
                                flex: 1,
                                color: "#bcbbbe",
                            }}
                        >
                            / {balance}
                        </Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
