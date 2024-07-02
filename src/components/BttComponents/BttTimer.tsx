import { Box, Text } from "@chakra-ui/react";
import React from "react";

const BttTimer = ({
    width,
    time,
    show = true,
    gray = false,
}: {
    width: string;
    time: string;
    show?: boolean;
    gray?: boolean;
}) => {
    return (
        <Box
            sx={{
                position: "relative",
            }}
        >
            <Box
                sx={{
                    border: gray
                        ? "3px solid #616161"
                        : show
                        ? "3px solid #FFF"
                        : "3px solid #616161",
                    width: "21.4583vw",
                    background: "transparent",
                    height: "1.25vw",
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "0.1042vw",
                }}
            >
                <Box
                    sx={{
                        width: width,
                        background: gray ? "#616161" : "#fff",
                    }}
                ></Box>
            </Box>
            {show && (
                <Text
                    sx={{
                        fontSize: "1.25vw",
                        position: "absolute",
                        right: "-100px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: gray ? "#616161" : "#fff",
                    }}
                >
                    {time}
                </Text>
            )}
        </Box>
    );
};

export default BttTimer;
