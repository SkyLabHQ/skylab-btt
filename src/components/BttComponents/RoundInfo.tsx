import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const RoundInfo = ({
    currentRound,
    allRound,
}: {
    currentRound: number;
    allRound: number;
}) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    return (
        <Box
            sx={{
                borderRadius: isPc ? "1.0417vw" : "8px",
                background: "#d9d9d9",
                display: "flex",
                width: isPc ? "6.875vw" : "86px",
                alignItems: "center",
                justifyContent: "center",
                margin: "2.6042vw auto 0",
                height: isPc ? "1.875vw" : "16px",
            }}
        >
            <Text
                sx={{
                    fontSize: isPc ? "0.8333vw" : "12px",
                    color: "#303030",
                }}
            >
                Round {currentRound}
                <span
                    style={{
                        color: "#616161",
                        fontSize: isPc ? "0.7292vw" : "12px",
                    }}
                >
                    /{allRound}
                </span>
            </Text>
        </Box>
    );
};

export default RoundInfo;
