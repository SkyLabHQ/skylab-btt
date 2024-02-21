import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

const dotList = [
    {
        left: 0,
        bottom: 0,
        delay: 0,
    },
    {
        left: "8px",
        bottom: 0,
        delay: 0.2,
    },
    {
        left: "16px",
        bottom: 0,
        delay: 0.4,
    },
];

const DotLoading = ({
    showLoading = true,
    text,
    color = "#fff",
    fontSize = "12px",
    dotSize = "4px",
}: {
    showLoading?: boolean;
    text?: string;
    color?: string;
    fontSize?: string;
    dotSize?: string;
}) => {
    const dotVariants = {
        hidden: { opacity: 0 }, // 初始状态，隐藏并向下移动
        visible: { opacity: 1 }, // 显示状态，不移动
    };

    return (
        <Box
            sx={{
                position: "relative",
                color: color,
                fontSize,
            }}
        >
            <Text>{text}</Text>

            {showLoading && (
                <motion.div
                    style={{
                        height: "10px",
                        position: "absolute",
                        right: "-4px",
                        bottom: "50%",
                        transform: "translateY(50%)",
                    }}
                >
                    {dotList.map((item, index) => {
                        return (
                            <motion.div
                                key={index}
                                style={{
                                    width: dotSize,
                                    height: dotSize,
                                    borderRadius: "50%",
                                    backgroundColor: color,
                                    position: "absolute",
                                    left: item.left,
                                    bottom: item.bottom,
                                }}
                                initial="hidden"
                                animate="visible"
                                variants={dotVariants}
                                transition={{
                                    delay: item.delay,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 1.2,
                                }} // 设置无限循环
                            ></motion.div>
                        );
                    })}
                </motion.div>
            )}
        </Box>
    );
};

export default DotLoading;
