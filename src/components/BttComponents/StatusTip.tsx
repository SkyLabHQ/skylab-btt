import React from "react";
import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import LoadingIcon from "@/assets/loading.svg";
import { GameState } from "@/skyConstants/bttGameTypes";

const StatusTip = ({
    loading,
    myGameState,
    opGameState,
}: {
    loading?: boolean;
    myGameState: number;
    opGameState: number;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isPc ? "0.8333vw" : "12px",
                height: isPc ? `1.5625vw` : "16px",
            }}
        >
            <Text sx={{ textAlign: "center" }}>
                {!loading &&
                    opGameState === GameState.LoseBySurrender &&
                    "Opponent quit"}
            </Text>

            {myGameState <= 3 && (
                <>
                    <Text sx={{ textAlign: "center" }}>
                        {loading && "On chain submission..."}
                        {!loading &&
                            myGameState === 1 &&
                            (opGameState === 1 || opGameState === 2) &&
                            "Please input bids for the selected grid"}

                        {!loading &&
                            myGameState === 2 &&
                            opGameState === 1 &&
                            "waiting for opponent to confirm"}
                        {!loading &&
                            myGameState === 2 &&
                            opGameState === 2 &&
                            "Revealing on chain..."}
                        {!loading &&
                            (myGameState === 3 || opGameState === 3) &&
                            "Revealing on chain..."}
                    </Text>
                    {(loading || myGameState === 3 || opGameState === 3) && (
                        <Box
                            sx={{
                                marginLeft: isPc ? "1.0417vw" : "6px",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <motion.img
                                src={LoadingIcon}
                                style={{
                                    rotate: 0,
                                    height: isPc ? `1.5625vw` : "14px",
                                }}
                                transition={{
                                    repeat: Infinity,
                                    ease: "linear",
                                    duration: 3,
                                }}
                                animate={{ rotate: 360 }}
                            />
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
};

export default StatusTip;
