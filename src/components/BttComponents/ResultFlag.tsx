import { Box } from "@chakra-ui/react";
import React from "react";

export const Lose = () => {
    return (
        <Box
            sx={{
                width: "60px",
                height: "24px",
                borderRadius: "9px",
                background: "#D9D9D9",
                color: "#303030",
                textAlign: "center",
                lineHeight: "24px",
                fontSize: "20px",
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
                height: "24px",
                borderRadius: "8px",
                background: "#FDDC2D",
                textAlign: "center",
                color: "#303030",
                lineHeight: "24px",
                fontSize: "20px",
            }}
        >
            Win
        </Box>
    );
};
