import { Box, Text, Image, Flex, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";
import GardenIcon from "@/components/TacToe/assets/garden-icon.png";
import BackIcon from "@/components/TacToe/assets/back-arrow-home.svg";
import { useNavigate } from "react-router-dom";
import CircleBg from "./assets/circle-bg.png";
import BackArrow from "./assets/back-arrow.svg";

import LineTab from "./LineTab";

enum RuleTabEnum {
    OVERAll = 0,
    AVIATIONSYSTEM = 1,
    XPPILOT = 2,
    COSMETIC = 3,
    MILEAGEXP = 4,
    UPMERCSBREEDING = 5,
}

const NavItem = ({
    imgWidth,
    label,
    onClick,
    img,
    position,
}: {
    imgWidth: string;
    label: string;
    img: string;
    onClick: () => void;
    position: any;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Box
            sx={{
                cursor: "pointer",
                position: "absolute",
                ...position,
                "&:hover": {
                    img: {
                        transform: "scale(1.2)",
                        transition: "all 0.3s ease",
                    },
                },
            }}
            onClick={onClick}
        >
            <Flex
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
                flexDir={"column"}
            >
                <Text
                    sx={{
                        color: "#fff",
                        fontSize: isPc ? "1.6667vw" : "0.625vw",
                    }}
                >
                    {label}
                </Text>
                <Image
                    src={img}
                    sx={{
                        width: imgWidth,
                        marginTop: isPc ? "0.5208vw" : 0,
                    }}
                ></Image>
            </Flex>
        </Box>
    );
};

const BttRules = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [showTab, setShowTab] = useState(true);
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                position: "relative",
                paddingTop: "7.3958vw",
                // minHeight: "100%",
                fontFamily: "Quantico",
                overflow: "auto",
            }}
        >
            {isPc ? (
                <Box
                    sx={{
                        display: "flex",
                        position: "absolute",
                        left: "0",
                        top: "0",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate("/home?step=2")}
                >
                    <Image
                        src={GardenIcon}
                        sx={{
                            width: isPc ? "80px" : "48px",
                        }}
                    ></Image>
                    <Image
                        sx={{
                            width: isPc ? "48px" : "32px",
                        }}
                        src={BackIcon}
                    ></Image>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        position: "absolute",
                        left: "12px",
                        top: "12px",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate("/home?step=2")}
                >
                    <Image src={BackArrow}></Image>
                </Box>
            )}

            {!isPc && (
                <Text
                    sx={{
                        position: "absolute",
                        top: "12px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: "12px",
                    }}
                >
                    Detailed Rules
                </Text>
            )}

            <Box
                sx={{
                    width: "83.3333vw",
                    margin: "0 auto",
                    borderTop: isPc && "1px solid #fff",
                    paddingTop: "1.1458vw",
                }}
            >
                <Text
                    sx={{
                        fontSize: "1.25vw",
                    }}
                >
                    Detailed Rules
                </Text>
                {showTab && <LineTab></LineTab>}
            </Box>
        </Box>
    );
};

export default BttRules;
