import React from "react";
import ArenaIcon from "./assets/arena-icon.png";
import { Box, Text } from "@chakra-ui/react";

const EnterArena = () => {
    return (
        <Box
            sx={{
                width: "313px",
                height: "269px",
                background: `url(${ArenaIcon}) no-repeat center center`,
                backgroundSize: "contain",
                position: "absolute",
                right: "0",
                bottom: "0",
            }}
        >
            <Text
                sx={{
                    transform: "rotate(-8.337deg)",
                    flexShrink: 0,
                    color: "#F2D861",
                    textAlign: "center",
                    fontFamily: "Orbitron",
                    fontSize: "50px",
                    width: "350px",
                    position: "absolute",
                    right: "0px",
                    top: 0,
                    fontWeight: 700,
                }}
            >
                Enter Arena
            </Text>
        </Box>
    );
};

export default EnterArena;
