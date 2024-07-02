import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { StepType } from "@reactour/tour";
import { CSSObject } from "@emotion/react";
import "@reactour/popover/dist/index.css";

const opositeSide = {
    top: "bottom",
    bottom: "top",
    right: "left",
    left: "right",
};

function doArrow(
    position: "top" | "right" | "bottom" | "left" | "custom",
    verticalAlign: "top" | "bottom",
    horizontalAlign: "left" | "right",
    color = "white",
): CSSObject {
    if (!position || position === "custom") {
        return {};
    }
    const width = 16;
    const height = 12;
    const isVertical = position === "top" || position === "bottom";
    const spaceFromSide = 25;

    const obj = {
        [`--rtp-arrow-${
            isVertical ? opositeSide[horizontalAlign] : verticalAlign
        }`]: height + spaceFromSide + "px",
        [`--rtp-arrow-${opositeSide[position]}`]: -height + 2 + "px",
        [`--rtp-arrow-border-${isVertical ? "left" : "top"}`]: `${
            width / 2
        }px solid transparent`,
        [`--rtp-arrow-border-${isVertical ? "right" : "bottom"}`]: `${
            width / 2
        }px solid transparent`,
        [`--rtp-arrow-border-${position}`]: `${height}px solid ${color}`,
    };

    return obj;
}

const tourConfig: StepType[] = [
    {
        selector: ".btt-0-step",
        position: "top",
        content: () => {
            return (
                <Box>
                    <Text
                        sx={{
                            color: "#000",
                            fontSize: "1.0417vw",
                            fontWeight: 600,
                        }}
                    >
                        The player with higher{" "}
                        <span style={{ color: "#c8ad23" }}>bid</span> conquers
                        the{" "}
                        <span
                            style={{
                                border: "2px solid #76c551",
                                color: "#76c551",
                            }}
                        >
                            grid
                        </span>
                    </Text>
                </Box>
            );
        },
    },
    {
        selector: ".btt-third-step",
        position: "right",
        content: () => {
            return (
                <Box>
                    <Text
                        sx={{
                            color: "#000",
                            fontSize: "1.0417vw",
                            fontWeight: 600,
                        }}
                    >
                        After bidding, the
                        <span style={{ color: "#c8ad23" }}> bid</span> amount is
                        subtracted from your balance, no matter you won the{" "}
                        <span
                            style={{
                                border: "2px solid #76c551",
                                color: "#76c551",
                            }}
                        >
                            grid
                        </span>{" "}
                        or not.
                    </Text>
                </Box>
            );
        },
    },
    {
        selector: ".btt-fifth-step",
        position: "right",
        content: () => {
            return (
                <Box
                    sx={{
                        lineHeight: "2.0833vw",
                        color: "#000",
                        fontSize: "1.0417vw",
                        fontWeight: 600,
                    }}
                >
                    The player who first form 3 connected{" "}
                    <Box
                        sx={{
                            position: "relative",
                            display: "inline-block",
                        }}
                    >
                        <span
                            style={{
                                color: "#76c551",
                            }}
                        >
                            grids
                        </span>
                        <Box
                            sx={{
                                position: "absolute",
                                top: "-4px",
                                left: 0,
                                display: "flex",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "0.8854vw",
                                    height: "0.8854vw",
                                    border: "2px solid #76c551",
                                    marginRight: "2px",
                                }}
                            ></Box>
                            <Box
                                sx={{
                                    width: "0.8854vw",
                                    height: "0.8854vw",
                                    border: "2px solid #76c551",
                                    marginRight: "2px",
                                }}
                            ></Box>
                            <Box
                                sx={{
                                    width: "0.8854vw",
                                    height: "0.8854vw",
                                    border: "2px solid #76c551",
                                    marginRight: "2px",
                                }}
                            ></Box>
                        </Box>
                    </Box>{" "}
                    win.{" "}
                </Box>
            );
        },
    },
    {
        selector: ".btt-sixth-step",
        position: "right",
        content: () => {
            return (
                <Box>
                    <Box
                        sx={{
                            color: "#000",
                            fontSize: "1.0417vw",
                            fontWeight: 600,
                            lineHeight: "2.0833vw",
                        }}
                    >
                        If there's no 3 connected{" "}
                        <Box
                            sx={{
                                position: "relative",
                                display: "inline-block",
                            }}
                        >
                            <span
                                style={{
                                    color: "#76c551",
                                }}
                            >
                                grids
                            </span>
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: "-4px",
                                    left: 0,
                                    display: "flex",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "0.8854vw",
                                        height: "0.8854vw",
                                        border: "2px solid #76c551",
                                        marginRight: "2px",
                                    }}
                                ></Box>
                                <Box
                                    sx={{
                                        width: "0.8854vw",
                                        height: "0.8854vw",
                                        border: "2px solid #76c551",
                                        marginRight: "2px",
                                    }}
                                ></Box>
                                <Box
                                    sx={{
                                        width: "0.8854vw",
                                        height: "0.8854vw",
                                        border: "2px solid #76c551",
                                        marginRight: "2px",
                                    }}
                                ></Box>
                            </Box>
                        </Box>{" "}
                        and the board is full, then the player who has occupied
                        more{" "}
                        <span
                            style={{
                                border: "2px solid #76c551",
                                color: "#76c551",
                            }}
                        >
                            grid
                        </span>{" "}
                        wins.
                    </Box>
                </Box>
            );
        },
    },
];

export const mTourConfig: StepType[] = [
    {
        selector: ".btt-0-step",
        content: () => {
            return (
                <Box>
                    <Text
                        sx={{
                            color: "#000",
                            fontSize: "18px",
                            fontWeight: 600,
                        }}
                    >
                        The player with higher{" "}
                        <span style={{ color: "#c8ad23" }}>bid</span> conquers
                        the{" "}
                        <span
                            style={{
                                border: "2px solid #76c551",
                                color: "#76c551",
                            }}
                        >
                            grid
                        </span>
                    </Text>
                </Box>
            );
        },
    },
    {
        selector: ".btt-1-step",
        content: () => {
            return (
                <Box>
                    <Text
                        sx={{
                            color: "#000",
                            fontSize: "18px",
                            fontWeight: 600,
                        }}
                    >
                        After bidding, the
                        <span style={{ color: "#c8ad23" }}> bid</span> amount is
                        subtracted from your balance, no matter you won the{" "}
                        <span
                            style={{
                                border: "2px solid #76c551",
                                color: "#76c551",
                            }}
                        >
                            grid
                        </span>{" "}
                        or not.
                    </Text>
                </Box>
            );
        },
    },
    {
        selector: ".btt-fifth-step",
        position: "left",
        content: () => {
            return (
                <Box
                    sx={{
                        color: "#000",
                        fontSize: "16px",
                        fontWeight: 600,
                        width: "135px",
                    }}
                >
                    The player who first form 3 connected{" "}
                    <Box
                        sx={{
                            position: "relative",
                            display: "inline-block",
                        }}
                    >
                        <span
                            style={{
                                color: "#76c551",
                            }}
                        >
                            grids
                        </span>
                        <Box
                            sx={{
                                position: "absolute",
                                top: "-4px",
                                left: 0,
                                display: "flex",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "12px",
                                    height: "12px",
                                    border: "3px solid #76c551",
                                    marginRight: "4px",
                                }}
                            ></Box>
                            <Box
                                sx={{
                                    width: "12px",
                                    height: "12px",
                                    border: "3px solid #76c551",
                                    marginRight: "4px",
                                }}
                            ></Box>
                            <Box
                                sx={{
                                    width: "12px",
                                    height: "12px",
                                    border: "3px solid #76c551",
                                    marginRight: "4px",
                                }}
                            ></Box>
                        </Box>
                    </Box>{" "}
                    win.{" "}
                </Box>
            );
        },
    },
    {
        selector: ".btt-sixth-step",
        position: "bottom",
        content: () => {
            return (
                <Box>
                    <Box
                        sx={{
                            color: "#000",
                            fontSize: "18px",
                            fontWeight: 600,
                            width: "262px",
                        }}
                    >
                        If there's no 3 connected{" "}
                        <Box
                            sx={{
                                position: "relative",
                                display: "inline-block",
                            }}
                        >
                            <span
                                style={{
                                    color: "#76c551",
                                }}
                            >
                                grids
                            </span>
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: "-4px",
                                    left: 0,
                                    display: "flex",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "12px",
                                        height: "12px",
                                        border: "3px solid #76c551",
                                        marginRight: "4px",
                                    }}
                                ></Box>
                                <Box
                                    sx={{
                                        width: "12px",
                                        height: "12px",
                                        border: "3px solid #76c551",
                                        marginRight: "4px",
                                    }}
                                ></Box>
                                <Box
                                    sx={{
                                        width: "12px",
                                        height: "12px",
                                        border: "3px solid #76c551",
                                        marginRight: "4px",
                                    }}
                                ></Box>
                            </Box>
                        </Box>{" "}
                        and the board is full, then the player who has occupied
                        more{" "}
                        <span
                            style={{
                                border: "2px solid #76c551",
                                color: "#76c551",
                            }}
                        >
                            grid
                        </span>{" "}
                        wins.
                    </Box>
                </Box>
            );
        },
    },
];

export { tourConfig, doArrow };
