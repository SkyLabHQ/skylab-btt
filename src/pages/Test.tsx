import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

const Test = () => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",

                background:
                    "radial-gradient(50% 50%, rgba(255, 105, 190, 100) 0%, rgba(166, 62, 153, 0.41) 62.1%, rgba(103, 31, 156, 0.01) 100%)",
            }}
        >
            <motion.div
                style={{
                    textShadow: "0px 0px 19px  #00CCFF",
                    color: "rgba(56, 248, 255, 1)",
                    fontSize: "160px",
                    textAlign: "center",
                    fontFamily: "Neoneon",
                }}
                animate={{
                    color: [
                        "rgba(56, 248, 255, 1)",
                        "rgba(255, 236, 199, 1)",
                        "rgba(255, 214, 214, 1)",
                    ],
                }}
                transition={{
                    duration: 1,
                    yoyo: Infinity,
                }}
            >
                BEGINS IN
            </motion.div>
        </Box>
    );
};

export default Test;
