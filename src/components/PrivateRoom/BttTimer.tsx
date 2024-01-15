import { Box, keyframes, Text, useMediaQuery } from "@chakra-ui/react";
import React from "react";
export const SixtySecond = 60 * 1000;
export const ThirtySecond = 30 * 1000;

const BttTimer = ({
    width,
    time,
    show = true,
    gray = false,
    direction = "right",
}: {
    width: string;
    time: string;
    show?: boolean;
    gray?: boolean;
    direction?: "top" | "right";
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
            }}
        >
            <Box
                sx={{
                    border: gray
                        ? "3px solid #616161"
                        : show
                        ? "3px solid #FFF"
                        : "3px solid #616161",
                    width: isPc ? "21.4583vw" : "100%",
                    background: "transparent",
                    height: isPc ? "1.25vw" : "16px",
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: isPc ? "0.1042vw" : "1px",
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
                        fontSize: isPc ? "1.25vw" : "12px",
                        position: "absolute",
                        right: direction === "right" && "-100px",
                        top: direction === "right" ? "50%" : "-20px",
                        left: direction === "top" && "50%",
                        transform:
                            direction === "right"
                                ? "translateY(-50%)"
                                : "translateX(-50%)",
                        color: gray ? "#616161" : "#fff",
                    }}
                >
                    {time}
                </Text>
            )}
        </Box>
    );
};

const move = keyframes`
    0% {
        opacity:0
    }
    
    100% {
        opacity: 1;
    }
`;

export const BufferTimer = ({
    width,
    show,
}: {
    width: string;
    show: boolean;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
            }}
        >
            <Box
                sx={{
                    background: "#616161",
                    height: isPc ? "0.3125vw" : "4px",
                    width: isPc ? "21.4583vw" : "100%",
                    marginTop: isPc ? "1.4815vh" : "8px",
                    display: "flex",
                    justifyContent: "flex-end",
                }}
                animation={`${show ? move : ""} 1s linear infinite alternate`}
            >
                <Box
                    sx={{
                        width: width,
                        background: show ? "#fff" : "#616161",
                        height: "0.3125vw",
                    }}
                ></Box>
            </Box>
            <Box
                sx={{
                    height: "1.4583vw",
                }}
            >
                {show && (
                    <Text
                        sx={{
                            fontSize: isPc ? "1.0417vw" : "12px",
                            width: "100%",
                            textAlign: "center",
                        }}
                    >
                        {/* On Chain Buffer Time. Please Submit ASAP */}
                    </Text>
                )}
            </Box>
        </Box>
    );
};

export default BttTimer;
