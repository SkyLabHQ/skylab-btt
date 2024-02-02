import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

const DotLoading = ({
    showLoading,
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
            <motion.div
                style={{
                    height: "10px",
                    position: "absolute",
                    right: "-4px",
                    bottom: "50%",
                    transform: "translateY(50%)",
                }}
            >
                <motion.div
                    style={{
                        width: dotSize,
                        height: dotSize,
                        borderRadius: "50%",
                        backgroundColor: color,
                        position: "absolute",
                        left: "0px",
                        bottom: "0px",
                    }}
                    initial="hidden"
                    animate="visible"
                    variants={dotVariants}
                    transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 1.2,
                    }} // 设置无限循环
                ></motion.div>
                <motion.div
                    style={{
                        width: dotSize,
                        height: dotSize,
                        borderRadius: "50%",
                        backgroundColor: color,
                        position: "absolute",
                        left: "8px",
                        bottom: "0px",
                    }}
                    initial="hidden"
                    animate="visible"
                    variants={dotVariants}
                    transition={{
                        delay: 0.2,
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 1.2,
                    }} // 延迟0.2秒显示第二个点
                ></motion.div>
                <motion.div
                    style={{
                        width: dotSize,
                        height: dotSize,
                        borderRadius: "50%",
                        backgroundColor: color,
                        position: "absolute",
                        left: "16px",
                        bottom: "0px",
                    }}
                    initial="hidden"
                    animate="visible"
                    variants={dotVariants}
                    transition={{
                        delay: 0.4,
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 1.2,
                    }} // 延迟0.4秒显示第三个点
                ></motion.div>
            </motion.div>
        </Box>
    );
};

export default DotLoading;
