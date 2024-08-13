import React, { useEffect, useMemo } from "react";
import { shortenAddress } from "@/utils";
import AdvantageIcon from "./assets/advantage-icon.svg";
import { motion } from "framer-motion";
import {
    Box,
    Image,
    Text,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    useClipboard,
    NumberInput,
    NumberInputField,
    keyframes,
    Flex,
} from "@chakra-ui/react";
import CopyIcon from "./assets/copy-icon.svg";
import GoldIcon from "./assets/gold.png";
import AddIcon from "./assets/add-icon.svg";
import SubIcon from "./assets/sub-icon.svg";
import DotIcon from "./assets/dot3.svg";
import Plane1 from "@/assets/aviations/a1.png";
import useSkyToast from "@/hooks/useSkyToast";
import { useCountUp } from "react-countup";
import ConfirmVideo from "@/assets/confirm.wav";
import { UserMarkType } from "@/skyConstants/bttGameTypes";
import useBidIcon from "@/hooks/useBidIcon";

const move = keyframes`
    0% {
        background: #fddc2d;
        border: 3px solid #fddc2d;
       
    }
    
    100% {
        background: rgba(255, 255, 255, 0.40);
        border: 3px solid rgba(255, 255, 255, 0.40);

    }
`;

const MyBid = ({
    showTutorialStep,
    loading,
    balance,
    bidAmount,
    myIsBid,
    onInputChange,
    onConfirm,
    showAnimateConfirm,
}: {
    myIsBid: boolean;
    showTutorialStep?: boolean;
    loading: boolean;
    balance: number;
    bidAmount: number;
    showAnimateConfirm?: number;
    onInputChange?: (value: number) => void;
    onConfirm: () => void;
}) => {
    const countUpRef = React.useRef(null);
    const { update } = useCountUp({
        ref: countUpRef,
        end: balance,
        duration: 1,
        prefix: "/ ",
    });

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
            className={
                showTutorialStep
                    ? "btt-first-step btt-second-step btt-third-step"
                    : ""
            }
        >
            <Box
                sx={{
                    marginTop: "1.25vw",
                    display: "flex",
                }}
            >
                <Box>
                    <Text sx={{ fontSize: "0.8333vw" }}>Bid</Text>
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
                        <Box
                            key={showAnimateConfirm + ""}
                            sx={{
                                height: "2.2917vw",
                                width: "6.25vw",
                                borderRadius: "0.9375vw",
                                overflow: "hidden",
                                border: "3px solid #fff",
                                background: "rgba(255, 255, 255, 0.40)",
                                display: "flex",
                                alignItems: "center",
                                animationIterationCount: "2",
                            }}
                            animation={`${
                                showAnimateConfirm !== 0 && !loading ? move : ""
                            } 0.5s linear alternate`}
                        >
                            <NumberInput
                                isDisabled={loading || myIsBid}
                                variant="unstyled"
                                max={balance}
                                min={0}
                                value={bidAmount}
                                sx={{
                                    "& input": {
                                        color: "#fff",
                                        lineHeight: "1",
                                        padding: 0,
                                        fontSize: "1.6667vw",
                                        width: "100%",
                                        textAlign: "center",
                                        background: "#616161",
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
                        </Box>
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
        </Box>
    );
};

export const OpBid = ({ balance }: { balance: number }) => {
    return (
        <Box>
            <Box sx={{ marginTop: "1.25vw", display: "flex" }}>
                <Box>
                    <Text sx={{ fontSize: "0.8333vw" }}>Bid</Text>
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
                    </Box>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Text
                        sx={{
                            fontSize: "0.8333vw",
                            textAlign: "right",
                            flex: 1,
                            color: "#bcbbbe",
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
    );
};

interface UserCardProps {
    myIsBid: boolean;
    showTutorialStep?: boolean;
    showAnimateConfirm?: number;
    loading?: boolean;
    markIcon: UserMarkType;
    address: string;
    balance: number;
    bidAmount: number;
    showAdvantageTip?: boolean;
    level?: number;
    myGameState?: number;
    planeUrl?: string;
    onConfirm?: () => void;
    onInputChange?: (value: number) => void;
}

export const AdvantageTip = ({
    direction,
    markIcon,
    showAdvantageTip,
}: {
    direction: "right" | "left";
    markIcon: UserMarkType;
    showAdvantageTip: boolean;
}) => {
    const MarkIcon = useBidIcon();

    return (
        <Box
            sx={{
                width: "fit-content",
                marginTop: "1.5625vw",
            }}
        >
            <Popover placement={direction}>
                <Image
                    width={"1.875vw"}
                    height={"1.875vw"}
                    src={
                        markIcon === UserMarkType.Circle
                            ? MarkIcon.Circle
                            : markIcon === UserMarkType.BotX
                            ? MarkIcon.BotX
                            : MarkIcon.Cross
                    }
                ></Image>

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

export const MyInputBid = ({
    showTutorialStep,
    loading,
    myIsBid,
    balance,
    bidAmount,
    onInputChange,
    onConfirm,
    showAnimateConfirm,
}: {
    showTutorialStep?: boolean;
    loading: boolean;
    myIsBid: boolean;
    balance: number;
    bidAmount: number;
    showAnimateConfirm?: number;
    onInputChange?: (value: number) => void;
    onConfirm: () => void;
}) => {
    const [commitButtonText, status] = useMemo(() => {
        if (loading) {
            return ["Committing", 0];
        }

        return myIsBid ? ["Committed", 0] : ["Commit", 1];
    }, [loading, myIsBid]);

    const handleSumbit = async () => {
        const audio = new Audio(ConfirmVideo);
        audio.play();
        onConfirm();
    };
    return (
        <Box
            sx={{
                marginTop: "1.5625vw",
            }}
        >
            <Box
                sx={{
                    background: "#787878",
                    borderRadius: "1.0417vw",
                    height: "6.3542vw",
                    padding: "0.3646vw 0.8333vw 0.625vw 1.9792vw",
                    position: "relative",
                    border: "1px solid #fff",
                }}
            >
                <Box
                    sx={{
                        width: "8.6979vw",
                        height: "3.75vw",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "1.3542vw",
                        paddingLeft: "0.7292vw",
                        position: "absolute",
                        left: "50%",
                        top: "0",
                        transform: "translate(-50%,-50%)",
                        background: `url(${GoldIcon})`,
                        backgroundSize: "100% 100%",
                    }}
                ></Box>
                <MyBid
                    showTutorialStep={showTutorialStep}
                    loading={loading}
                    balance={balance}
                    bidAmount={bidAmount}
                    onInputChange={onInputChange}
                    onConfirm={handleSumbit}
                    myIsBid={myIsBid}
                    showAnimateConfirm={showAnimateConfirm}
                ></MyBid>
            </Box>
            <Flex flexDir={"column"} align={"center"}>
                <Flex
                    onClick={handleSumbit}
                    sx={{
                        marginTop: "0.5208vw",
                        fontSize: "0.8333vw",
                        height: "2.2917vw",
                        width: "6.25vw",
                        background: status === 0 ? "transparent" : "#FDDC2D",
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
            </Flex>
        </Box>
    );
};

export const OpInputBid = ({ balance }: { balance: number }) => {
    return (
        <Box
            sx={{
                marginTop: "1.5625vw",
            }}
        >
            <Box
                sx={{
                    background: "#787878",
                    borderRadius: "1.0417vw",
                    height: "6.3542vw",
                    padding: "0.3646vw 0.8333vw 0.625vw 0.7813vw",
                    position: "relative",
                    border: "1px solid #fff",
                }}
            >
                <Box
                    sx={{
                        width: "8.6979vw",
                        height: "3.75vw",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "1.3542vw",
                        paddingLeft: "0.7292vw",
                        position: "absolute",
                        left: "50%",
                        top: "0",
                        transform: "translate(-50%,-50%)",
                        background: `url(${GoldIcon})`,
                        backgroundSize: "100% 100%",
                    }}
                ></Box>
                <OpBid balance={balance}></OpBid>
            </Box>
        </Box>
    );
};

export const MyUserCard = ({
    myIsBid,
    showTutorialStep,
    level,
    loading,
    markIcon,
    address,
    balance,
    bidAmount,
    showAdvantageTip,
    myGameState,
    planeUrl = Plane1,
    onConfirm,
    onInputChange,
    showAnimateConfirm,
}: UserCardProps) => {
    const { onCopy } = useClipboard(address ?? "");
    const toast = useSkyToast();

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
                    position: "relative",
                }}
            >
                <Box
                    sx={{
                        width: "6.9792vw",
                        height: "6.9792vw",
                    }}
                >
                    <Image
                        sx={{
                            width: "6.9792vw",
                        }}
                        src={planeUrl}
                    ></Image>
                </Box>

                <Text
                    sx={{
                        fontSize: "0.8333vw",
                        fontWeight: "bold",
                    }}
                >
                    Level {level}
                </Text>
            </Box>
            <AdvantageTip
                direction="right"
                markIcon={markIcon}
                showAdvantageTip={showAdvantageTip}
            ></AdvantageTip>
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
            <MyInputBid
                myIsBid={myIsBid}
                showTutorialStep={showTutorialStep}
                loading={loading}
                balance={balance}
                bidAmount={bidAmount}
                onInputChange={onInputChange}
                onConfirm={onConfirm}
                showAnimateConfirm={showAnimateConfirm}
            ></MyInputBid>
        </Box>
    );
};

export const OpUserCard = ({
    level,
    markIcon,
    address,
    balance,
    showAdvantageTip,
    planeUrl = Plane1,
}: UserCardProps) => {
    const { onCopy } = useClipboard(address ?? "");

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
            }}
        >
            <Box
                sx={{
                    position: "relative",
                }}
            >
                <Box
                    sx={{
                        width: "6.9792vw",
                        height: "6.9792vw",
                    }}
                >
                    <Image
                        sx={{
                            width: "6.9792vw",
                            transform: "scaleX(-1)",
                        }}
                        src={planeUrl}
                    ></Image>
                </Box>
                <Text
                    sx={{
                        fontSize: "0.8333vw",
                        textAlign: "right",
                        fontWeight: "bold",
                    }}
                >
                    Level {level}
                </Text>
            </Box>
            <AdvantageTip
                direction="left"
                markIcon={markIcon}
                showAdvantageTip={showAdvantageTip}
            ></AdvantageTip>
            <Text
                sx={{
                    fontSize: "0.8333vw",
                    cursor: "pointer",
                    marginTop: "0.3125vw",
                }}
                onClick={onCopy}
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
            <OpInputBid balance={balance}></OpInputBid>
        </Box>
    );
};
