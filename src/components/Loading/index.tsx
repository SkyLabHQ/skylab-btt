import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import LoadingIcon from "@/assets/loading.svg";
import React from "react";

const Loading = ({ size = 100 }: { size?: number | string }) => {
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
                zIndex: 999,
            }}
        >
            <motion.img
                src={LoadingIcon}
                style={{
                    rotate: 0,
                    height: ss,
                }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 3,
                }}
                animate={{ rotate: 360 }}
            />
        </Box>
    );
};

export default Loading;
