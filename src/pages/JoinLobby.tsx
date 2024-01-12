import Back from "@/components/Back";
import Join from "@/components/JoinLobby/Join";
import { Box } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const JoinLobby = () => {
    const navigate = useNavigate();

    const handleMode = () => {
        navigate("/btt");
    };
    return (
        <Box
            sx={{
                background: "#303030",
                height: "100%",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    left: "1.0417vw",
                    top: "1.0417vw",
                }}
            >
                <Back onClick={handleMode}></Back>
            </Box>
            <Join></Join>
        </Box>
    );
};

export default JoinLobby;
