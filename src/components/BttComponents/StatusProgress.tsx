import { GameState } from "@/skyConstants/bttGameTypes";
import { Box, Text, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import EnterLoadingIcon from "@/assets/enter-loading.gif";

const dotLength = 3;

const StatusProgress = ({
    myGameState,
    opGameState,
}: {
    myGameState: GameState;
    opGameState: GameState;
}) => {
    const [activeIndex, setActiveIndex] = React.useState(0);

    useEffect(() => {
        let commitCount = 0;

        if (myGameState === GameState.Commited) {
            commitCount++;
        }

        if (opGameState === GameState.Commited) {
            commitCount++;
        }

        setActiveIndex(commitCount);
    }, [myGameState, opGameState]);

    return (
        <Box
            sx={{
                height: "44px",
            }}
        >
            <Box
                sx={{
                    width: "200px",
                    height: "2px",
                    background: "#fff",
                    position: "relative",
                }}
            >
                <motion.div
                    style={{
                        height: "100%",
                        background: "#F2d861",
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: 0,
                    }}
                    animate={{
                        width: activeIndex * 50 + "%",
                    }}
                    transition={{
                        duration: 0.5,
                    }}
                ></motion.div>
                {new Array(dotLength).fill("").map((item, index) => {
                    return (
                        <Box
                            key={index}
                            sx={{
                                height: activeIndex > index ? "9px" : "8px",
                                width: activeIndex > index ? "9px" : "8px",
                                borderRadius: "50%",
                                background:
                                    activeIndex > index
                                        ? "#FDDC2D"
                                        : "rgba(217, 217, 217, 1)",
                                border: activeIndex ? "none" : "1px solid #fff",
                                position: "absolute",
                                left: index * 50 + "%",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                            }}
                        ></Box>
                    );
                })}

                <Box
                    sx={{
                        position: "absolute",
                        left: 0,
                        top: "10px",
                        transform: "translateX(-50%)",
                        fontSize: "12px",
                        textAlign: "center",
                        color: activeIndex > 0 ? "#F2d861" : "#fff",
                    }}
                >
                    <Text>1 Player</Text>
                    <Text>commited</Text>
                </Box>
                <Box
                    sx={{
                        position: "absolute",
                        left: "50%",
                        top: "10px",
                        transform: "translateX(-50%)",
                        fontSize: "12px",
                        textAlign: "center",
                        color: activeIndex > 1 ? "#F2d861" : "#fff",
                    }}
                >
                    <Text>1 Player</Text>
                    <Text>commited</Text>
                </Box>
                <Box
                    sx={{
                        position: "absolute",
                        left: "100%",
                        top: "20px",
                        transform: "translateX(-50%)",
                        fontSize: "12px",
                        textAlign: "center",
                        color: activeIndex > 2 ? "#F2d861" : "#fff",
                    }}
                >
                    <Text>Revealing...</Text>
                </Box>
                <motion.div
                    style={{
                        borderRadius: "50%",
                        border: "2px solid #F2d861",
                        width: "14px",
                        height: "14px",
                        position: "absolute",
                        left: activeIndex * 50 + "%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        transition: "left 0.5s ease-in-out",
                    }}
                    animate={{
                        width: "18px",
                        height: "18px",
                    }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 0.5,
                    }}
                >
                    <Box
                        sx={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            background: "#F2d861",
                        }}
                    ></Box>
                    <Image
                        src={EnterLoadingIcon}
                        sx={{
                            width: "28px",
                            position: "absolute",
                            left: "50%",
                            top: "-28px",
                            maxWidth: "none",
                            transform: "translateX(-50%)",
                        }}
                    ></Image>
                </motion.div>
            </Box>
        </Box>
    );
};

export default StatusProgress;
