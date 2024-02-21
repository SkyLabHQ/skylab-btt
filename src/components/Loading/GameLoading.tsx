import { Box, Image } from "@chakra-ui/react";
import React from "react";
import EnterLoadingIcon from "@/assets/enter-loading.gif";

const GameLoading = ({ size = 100 }: { size?: number | string }) => {
    const ss = typeof size === "string" ? size : `${size}px`;

    return (
        <Box
            sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                height: ss,
                width: ss,
                zIndex: 1,
            }}
        >
            <Image
                src={EnterLoadingIcon}
                sx={{
                    width: "100%",
                }}
            ></Image>
        </Box>
    );
};

export default GameLoading;
