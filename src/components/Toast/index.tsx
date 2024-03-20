import { Box, Image, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import Close from "./assets/close.svg";

const SkyToast = ({
    message,
    onClose,
    isCloseAble,
}: {
    message: string;
    onClose?: () => void;
    isCloseAble?: boolean;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Box
            color="white"
            p={3}
            bg="#ABABAB"
            borderRadius="20px"
            fontSize={isPc ? "1.5625vw" : "16px"}
            sx={{
                maxWidth: isPc ? "40vw" : "300px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                breakword: "break-all",
                position: "relative",
                zIndex: 10001,
            }}
        >
            {message}
            {isCloseAble && (
                <Image
                    src={Close}
                    sx={{
                        position: "absolute",
                        right: "10px",
                        top: "10px",
                        width: "20px",
                        cursor: "pointer",
                    }}
                    onClick={onClose}
                ></Image>
            )}
        </Box>
    );
};

export default SkyToast;
