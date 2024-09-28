import { Box } from "@chakra-ui/react";
import React from "react";
import WarnIcon from "./assets/warn.png";

const Warning = () => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                left: 0,
                top: 0,
                background:
                    "radial-gradient(138.67% 138.64% at 50.03% 48.38%, rgba(174, 43, 43, 0.00) 0%, rgba(174, 43, 43, 0.90) 100%)",
                pointerEvents: "none",
                zIndex: 1,
            }}
        >
            <Box
                sx={{
                    width: "46px",
                    height: "100%",
                    zIndex: 3,
                    background: `url(${WarnIcon})`,
                }}
            ></Box>
        </Box>
    );
};

export default Warning;
