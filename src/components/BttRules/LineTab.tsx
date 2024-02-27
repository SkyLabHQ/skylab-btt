import { Box, Flex, Image, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";
import LineAll from "./assets/line-all.png";
import TaxIcon from "./assets/tax.png";
import EstateScoreIcon from "./assets/estate-score.png";
import PlaneIcon from "./assets/avi-pt.png";
import AllPlane from "./assets/all-plane.png";
import LeftArrow from "@/components/Tournament/assets/left-arrow.svg";
import RightArrow from "@/components/Tournament/assets/right-arrow.svg";
import { motion } from "framer-motion";
import PilotIcon from "./assets/pilot-icon.png";
import MileageS from "./assets/mileage-s.png";
import MileageType from "./assets/mileage.png";
import MercIcon from "./assets/merc.png";
import Up from "./assets/up.png";

enum IconType {
    Avaition = "Aviation",
    Mileage = "Mileage",
    Merc = "Merc",
}

const AviationLvlPt = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [test, setTest] = useState(0);
    const handleSub = () => {
        if (test <= 0) return;
        setTest(test - 20);
    };

    const handleAdd = () => {
        if (test >= 100) return;
        setTest(test + 20);
    };

    return (
        <Box sx={{ width: "566px" }}>
            <Text
                sx={{
                    fontSize: "32px",
                    fontWeight: "bold",
                }}
            >
                Aviation Lvl-Pt System
            </Text>
            <Box
                sx={{
                    border: "1px solid #FDDC2D",
                    borderRadius: "15px",
                    backdropFilter: "blur(15px)",
                    background: "rgba(113,157,151,0.5)",
                    marginTop: "10px",
                }}
            >
                <Flex
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottom: "1px solid #FDDC2D",
                        borderRadius: "0 0 15px 15px",
                        padding: isPc ? "0 60px" : " 20px 30px",
                        height: "566px",
                        position: "relative",
                    }}
                >
                    <Box
                        sx={{
                            background: `url(${AllPlane}) no-repeat `,
                            backgroundSize: "cover",
                            backgroundPosition: `${test}% 0`,
                            width: "1200px",
                            height: "300px",
                            transition: "all 1s",
                        }}
                    ></Box>
                    <Image
                        src={LeftArrow}
                        sx={{
                            position: "absolute",
                            left: "0.5208vw",
                            cursor: "pointer",
                            width: isPc ? "24px" : "12px",
                        }}
                        onClick={handleSub}
                    ></Image>
                    <Image
                        src={RightArrow}
                        sx={{
                            position: "absolute",
                            right: "0.5208vw",
                            cursor: "pointer",
                            width: isPc ? "24px" : "12px",
                        }}
                        onClick={handleAdd}
                    ></Image>
                </Flex>
                <Box
                    sx={{
                        padding: "20px",
                    }}
                >
                    <Text
                        sx={{
                            fontSize: isPc ? "20px" : "12px",

                            textAlign: "center",
                        }}
                    >
                        Point is earned through winning game.
                    </Text>
                </Box>{" "}
            </Box>
        </Box>
    );
};

const Mileage = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");

    return (
        <Box sx={{ width: "566px" }}>
            <Text
                sx={{
                    fontSize: "32px",
                    fontWeight: "bold",
                }}
            >
                Mileage
            </Text>
            <Box
                sx={{
                    border: "1px solid #FDDC2D",
                    borderRadius: "15px",
                    backdropFilter: "blur(15px)",
                    background: "rgba(113,157,151,0.5)",
                    marginTop: "10px",
                }}
            >
                <Flex
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottom: "1px solid #FDDC2D",
                        borderRadius: "0 0 15px 15px",
                        height: "400px",
                        position: "relative",
                    }}
                >
                    <Image src={MileageType}></Image>
                </Flex>
                <Box
                    sx={{
                        padding: "20px",
                        fontSize: isPc ? "20px" : "12px",
                    }}
                >
                    <Text>Pilot earn mileage through playing games.</Text>
                    <Text>For each game: </Text>
                    <Text>
                        Mileage gained ={" "}
                        <span
                            style={{
                                color: "#FDDC2D",
                            }}
                        >
                            Level of aviation
                        </span>{" "}
                        x{" "}
                        <span
                            style={{
                                color: "#FDDC2D",
                            }}
                        >
                            point transferred
                        </span>{" "}
                    </Text>
                </Box>{" "}
            </Box>
        </Box>
    );
};

const Merc = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");

    return (
        <Box sx={{ width: "566px" }}>
            <Text
                sx={{
                    fontSize: "32px",
                    fontWeight: "bold",
                }}
            >
                UP & Mercs breeding
            </Text>
            <Box
                sx={{
                    border: "1px solid #FDDC2D",
                    borderRadius: "15px",
                    backdropFilter: "blur(15px)",
                    background: "rgba(113,157,151,0.5)",
                    marginTop: "10px",
                }}
            >
                <Flex
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottom: "1px solid #FDDC2D",
                        borderRadius: "0 0 15px 15px",
                        height: "400px",
                        position: "relative",
                    }}
                >
                    <Image src={Up}></Image>
                </Flex>
                <Box
                    sx={{
                        padding: "20px",
                    }}
                >
                    <Text
                        sx={{
                            fontSize: isPc ? "20px" : "12px",
                            textAlign: "center",
                        }}
                    >
                        Mercs have governance rights, can arbitrage, and would
                        have a buff to estate score{" "}
                    </Text>
                </Box>{" "}
            </Box>
        </Box>
    );
};

const list = [
    {
        icon: TaxIcon,
        text: "Tax Redistribution",
        textPosition: {
            top: "-32px",
        },
        position: {
            left: "50%",
            top: "-2",
            transform: "translate(-50%, 0)",
        },
        imgWidth: "84px",
    },
    {
        icon: EstateScoreIcon,
        text: "Estate Score",
        textPosition: {
            top: "-32px",
        },
        position: {
            left: "50%",
            top: "136px",
            transform: "translate(-50%, 0)",
        },
        imgWidth: "84px",
    },
    {
        icon: PlaneIcon,
        text: "Aviation Lvl-Pt",
        textPosition: {
            top: "-32px",
        },
        position: {
            right: "174px",
            top: "538px",
        },
        imgWidth: "90px",
        value: IconType.Avaition,
    },
    {
        icon: PilotIcon,
        text: "Pilot",
        textPosition: {
            top: "-32px",
        },
        position: {
            left: "50%",
            bottom: "72px",
            transform: "translate(-50%, 0)",
        },
        imgWidth: "80px",
    },

    {
        icon: MileageS,
        text: "Mileage",
        textPosition: {
            top: "-32px",
        },
        position: {
            left: "50%",
            bottom: "218px",
            transform: "translate(-50%, 0)",
        },
        imgWidth: "78px",
        value: IconType.Mileage,
    },
    {
        icon: MercIcon,
        text: "Mileage",
        textPosition: {
            top: "-32px",
        },
        position: {
            left: "194px",
            bottom: "286px",
        },
        imgWidth: "78px",
        value: IconType.Merc,
    },
];

const LineTab = () => {
    const [currentIconType, setCurrentIconType] = useState<IconType>(null);
    return (
        <Flex
            sx={{
                width: "100%",
                justifyContent: "center",
                transition: "all 1s",
                paddingTop: "80px",
            }}
        >
            <Box
                sx={{
                    width: "988px",
                    marginRight: "30px",
                }}
            >
                <Box
                    sx={{
                        height: "782px",
                        backgroundImage: `url(${LineAll})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        position: "relative",
                    }}
                >
                    {list.map((item) => {
                        return (
                            <Box
                                onClick={() => {
                                    const value = item.value;
                                    if (value && value === currentIconType) {
                                        setCurrentIconType(null);
                                        return;
                                    }
                                    if (value) {
                                        setCurrentIconType(value);
                                    }
                                }}
                                sx={{
                                    position: "absolute",
                                    ...item.position,
                                    border: "2px solid #FFD700",
                                    borderRadius: "50%",
                                    padding: "4px",
                                    "&:hover": {
                                        border: "2px solid #FFD700",
                                        borderRadius: "50%",
                                    },
                                }}
                            >
                                <Text
                                    sx={{
                                        fontSize: "20px",
                                        position: "absolute",
                                        left: "50%",
                                        transform: "translate(-50%, 0)",
                                        width: "240px",
                                        textAlign: "center",
                                        wordBreak: "break-word",
                                        fontWeight: "bold",
                                        ...item.textPosition,
                                    }}
                                >
                                    {item.text}
                                </Text>
                                {/* <Box
                                    sx={{
                                        width: item.imgWidth,
                                        height: item.imgWidth,
                                        background: "red",
                                        borderRadius: "50%",
                                    }}
                                ></Box> */}
                                <Image
                                    src={item.icon}
                                    sx={{
                                        width: item.imgWidth,
                                        height: item.imgWidth,
                                    }}
                                ></Image>
                            </Box>
                        );
                    })}
                </Box>
            </Box>

            <motion.div
                style={{ transition: "all 0.3s" }}
                animate={{
                    width: currentIconType ? "566px" : "0",
                }}
            >
                {currentIconType === IconType.Avaition && (
                    <AviationLvlPt></AviationLvlPt>
                )}
                {currentIconType === IconType.Mileage && <Mileage></Mileage>}

                {currentIconType === IconType.Merc && <Merc></Merc>}
            </motion.div>
        </Flex>
    );
};

export default LineTab;
