import { motion } from "framer-motion";
import { Box, Image, Text } from "@chakra-ui/react";
import GoldIcon from "@/assets/gold.svg";
import DotIcon from "@/assets/dot3.svg";
import UnlockIcon from "@/assets/unlock.svg";
import LockIcon from "@/assets/lock.svg";
import { GameState } from "@/skyConstants/bttGameTypes";

interface UserCardProps {
    balance: number;
    bidAmount?: number;
    opGameState?: number;
}

export const OpBid = ({ balance, opGameState, bidAmount }: UserCardProps) => {
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
