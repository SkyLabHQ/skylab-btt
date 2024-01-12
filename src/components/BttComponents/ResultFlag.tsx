import { Box } from "@chakra-ui/react";
import React from "react";

export const Lose = () => {
    return (
        <Box
            sx={{
                width: "60px",
                height: "28px",
                borderRadius: "12px",
                background: "#D9D9D9",
                color: "#303030",
                textAlign: "center",
                lineHeight: "28px",
            }}
        >
            Lose
        </Box>
    );
};

export const Win = () => {
    return (
        <Box
            sx={{
                width: "60px",
                height: "28px",
                borderRadius: "12px",
                background: "#FDDC2D",
                textAlign: "center",
                color: "#303030",
                lineHeight: "28px",
            }}
        >
            Win
        </Box>
    );
};
