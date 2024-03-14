import React from "react";
import ArenaIcon from "./assets/arena-icon.png";
import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const EnterArena = () => {
    const navigate = useNavigate();
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Box
            onClick={() => {
                navigate("/tower");
            }}
            sx={{
                width: isPc ? "309px" : "110px",
                height: isPc ? "252px" : "90px",
                background: `url(${ArenaIcon}) no-repeat center center`,
                backgroundSize: "contain",
                position: "absolute",
                right: "0",
                bottom: "0",
            }}
        ></Box>
    );
};

export default EnterArena;
