import React from "react";
import ArenaIcon from "./assets/arena-icon.png";
import { Box, Text, Image, useMediaQuery } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const EnterArena = () => {
    const navigate = useNavigate();
    const [isPc] = useMediaQuery("(min-width: 800px)");

    const handleClick = () => {
        navigate("/");
    };
    return (
        <Image
            src={ArenaIcon}
            onClick={handleClick}
            sx={{
                width: isPc ? "313px" : "110px",
                position: "fixed",
                right: "0",
                bottom: "0",
                cursor: "pointer",
            }}
        ></Image>
    );
};

export default EnterArena;
