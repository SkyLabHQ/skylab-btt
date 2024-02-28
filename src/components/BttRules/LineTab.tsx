import { Box, Flex, Image, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";
import LineAll from "./assets/line-all.png";
import LineAvi from "./assets/line-avi.png";
import LineCosmetics from "./assets/line-cosmetics.png";
import LineEstate from "./assets/line-estate.png";
import LineMileage from "./assets/line-mileage.png";
import LineUp from "./assets/line-up.png";
import TaxIcon from "./assets/tax.png";
import EstateScoreIcon from "./assets/estate-score.png";
import PlaneIcon from "./assets/avi-pt.png";
import { motion } from "framer-motion";
import PilotIcon from "./assets/pilot-icon.png";
import MileageS from "./assets/mileage-s.png";
import MercIcon from "./assets/merc.png";
import CosmeticsScoreIcon from "./assets/cosmetics-score.png";
import VaultIcon from "./assets/vault.png";
import UpgradeP from "./assets/upgrade-p.png";
import BabyMercIcon from "./assets/baby-merc.png";
import AviScore from "./assets/avi-score.png";
import CosmeticsIcon from "./assets/cosmetics.png";
import TournamentIcon from "./assets/tournament.png";
import PlayIcon from "./assets/play.png";
import AviationLvlPt from "./AviationLvlPt";
import Mileage from "./Mileage";
import Merc from "./Merc";

enum IconType {
    Avaition = "Aviation",
    Mileage = "Mileage",
    Merc = "Merc",
}

enum LabelType {
    Aviation = "Aviation",
    Mileage = "Mileage",
    Up = "Up",
    Estate = "Estate",
    Cosmetics = "Cosmetics",
}

const list: any = [
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
        show: [LabelType.Estate],
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
        show: [LabelType.Estate, LabelType.Cosmetics],
    },
    {
        icon: PlaneIcon,
        text: "Aviation Lvl-Pt",
        textPosition: {
            top: "-32px",
        },
        position: {
            right: "182px",
            top: "541px",
        },
        imgWidth: "79px",
        value: IconType.Avaition,
        show: [LabelType.Aviation],
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
        imgWidth: "79px",
        show: [],
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
        imgWidth: "79px",
        value: IconType.Mileage,
        show: [LabelType.Mileage],
    },
    {
        icon: MercIcon,
        text: "Merc",
        textPosition: {
            top: "-32px",
        },
        position: {
            left: "194px",
            bottom: "286px",
        },
        imgWidth: "79px",
        value: IconType.Merc,
        show: [LabelType.Up],
    },
    {
        icon: CosmeticsScoreIcon,
        text: "Cosmetics Score",
        textPosition: {
            top: "-32px",
        },
        position: {
            left: "-6px",
            top: "308px",
        },
        imgWidth: "79px",
        show: [LabelType.Cosmetics],
    },
    {
        icon: VaultIcon,
        text: "Vault Rights",
        textPosition: {
            top: "-32px",
        },
        position: {
            left: "194px",
            top: "274px",
        },
        imgWidth: "79px",
        show: [LabelType.Up],
    },
    {
        icon: UpgradeP,
        text: "Upgrade Power",
        textPosition: {
            top: "-32px",
        },
        position: {
            left: "50%",
            top: "338px",
            transform: "translate(-50%, 0)",
        },
        imgWidth: "79px",
        show: [LabelType.Mileage],
    },
    {
        icon: BabyMercIcon,
        text: "Baby Merc",
        textPosition: {
            top: "-32px",
        },
        position: {
            right: "192px",
            bottom: "286px",
        },
        imgWidth: "79px",
        show: [LabelType.Up],
    },
    {
        icon: CosmeticsIcon,
        text: "Cosmetics",
        textPosition: {
            top: "-32px",
        },
        position: {
            left: "193px",
            top: "541px",
        },
        imgWidth: "79px",
        show: [LabelType.Mileage, LabelType.Cosmetics],
    },
    {
        icon: AviScore,
        text: "Aviation Score ",
        textPosition: {
            top: "-32px",
        },
        position: {
            right: "-6px",
            top: "308px",
        },
        imgWidth: "79px",
        show: [LabelType.Estate],
    },

    {
        icon: TournamentIcon,
        text: "Tournament",
        textPosition: {
            bottom: "-32px",
        },
        position: {
            left: "295px",
            bottom: "-6px",
        },
        imgWidth: "114px",
        show: [LabelType.Aviation, LabelType.Mileage],
    },
    {
        icon: PlayIcon,
        text: "Play game",
        textPosition: {
            bottom: "-32px",
        },
        position: {
            right: "284px",
            bottom: "-6px",
        },
        imgWidth: "114px",
        show: [LabelType.Mileage, LabelType.Aviation],
    },
];

const AviationDes = () => {
    return (
        <Box>
            <Text
                sx={{
                    fontSize: "24px",
                }}
            >
                Aviation Lvl-Pt:
            </Text>
            <Text
                sx={{
                    fontSize: "18px",
                }}
            >
                Win games to earn{" "}
                <span
                    style={{
                        color: "#FFD700",
                    }}
                >
                    {" "}
                    Hit Points (HP)
                </span>{" "}
                for your aviation.{" "}
                <span
                    style={{
                        color: "#FFD700",
                    }}
                >
                    Accumulate HP
                </span>{" "}
                to upgrade your aviation. Losing games would cost you HP.
            </Text>
        </Box>
    );
};

const MileageDes = () => {
    return (
        <Box>
            <Text
                sx={{
                    fontSize: "24px",
                }}
            >
                Mileage:
            </Text>
            <Text
                sx={{
                    fontSize: "18px",
                }}
            >
                {" "}
                Play games to earn{" "}
                <span
                    style={{
                        color: "#FFD700",
                    }}
                >
                    Mileage
                </span>
                , no matter win or lose. Top rankers on{" "}
                <span
                    style={{
                        color: "#FFD700",
                    }}
                >
                    Mileage Leaderboard
                </span>{" "}
                will be rewarded with{" "}
                <span
                    style={{
                        color: "#FFD700",
                    }}
                >
                    Upgrade Power
                </span>{" "}
                and{" "}
                <span
                    style={{
                        color: "#FFD700",
                    }}
                >
                    Cosmetics
                </span>
                .
            </Text>
        </Box>
    );
};

const UpDes = () => {
    return (
        <Box>
            <Text
                sx={{
                    fontSize: "24px",
                }}
            >
                UP & Merc:
            </Text>
            <Text
                sx={{
                    fontSize: "18px",
                }}
            >
                {" "}
                <span
                    style={{
                        color: "#FFD700",
                    }}
                ></span>
                <span
                    style={{
                        color: "#FFD700",
                    }}
                >
                    Upgrade Power(UP)
                </span>{" "}
                breeds{" "}
                <span
                    style={{
                        color: "#FFD700",
                    }}
                >
                    Baby Mercs into{" "}
                </span>{" "}
                <span
                    style={{
                        color: "#FFD700",
                    }}
                >
                    Mercs
                </span>
                . Only Mercs can sell Planes back to the Vault.
            </Text>
        </Box>
    );
};

const CosmeticsDes = () => {
    return (
        <Box>
            <Text
                sx={{
                    fontSize: "24px",
                }}
            >
                Cosmetics Score:
            </Text>
            <Text
                sx={{
                    fontSize: "18px",
                }}
            >
                Earn cosmetics through participating in{" "}
                <span
                    style={{
                        color: "#FFD700",
                    }}
                >
                    Tournaments
                </span>{" "}
                and earning{" "}
                <span
                    style={{
                        color: "#FFD700",
                    }}
                >
                    Mileage
                </span>{" "}
                through playing games.{" "}
                <span
                    style={{
                        color: "#FFD700",
                    }}
                >
                    {" "}
                    Cosmetics Score
                </span>{" "}
                adds to{" "}
                <span
                    style={{
                        color: "#FFD700",
                    }}
                >
                    Estate Score
                </span>{" "}
                .
            </Text>
        </Box>
    );
};

const EstateDes = () => {
    return (
        <Box>
            {" "}
            <Text
                sx={{
                    fontSize: "24px",
                }}
            >
                Estate Score:
            </Text>
            <Text
                sx={{
                    fontSize: "18px",
                }}
            >
                A 2% transfer tax is imposed on every plane transaction. Project
                Mercury redistribute the tax collected to high rankers on the
                <span
                    style={{
                        color: "#FFD700",
                    }}
                >
                    Estate Score
                </span>{" "}
                leaderboard.{" "}
                <span
                    style={{
                        color: "#FFD700",
                    }}
                >
                    Estate Score
                </span>{" "}
                consists of{" "}
                <span
                    style={{
                        color: "#FFD700",
                    }}
                >
                    Cosmetics Score
                </span>{" "}
                and{" "}
                <span
                    style={{
                        color: "#FFD700",
                    }}
                >
                    Aviation Score
                </span>
                .
            </Text>
        </Box>
    );
};

const list2 = [
    {
        label: "Aviation Lvl-Pt",
        value: LabelType.Aviation,
        backgroundImg: LineAvi,
    },
    {
        label: "Mileage",
        value: LabelType.Mileage,
        backgroundImg: LineMileage,
    },
    {
        label: "UP&Merc",
        value: LabelType.Up,
        backgroundImg: LineUp,
    },
    {
        label: "Estate Score",
        value: LabelType.Estate,
        backgroundImg: LineEstate,
    },
    {
        label: "Cosmetics Score",
        value: LabelType.Cosmetics,
        backgroundImg: LineCosmetics,
    },
];

const LineTab = () => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const [currentIconType, setCurrentIconType] = useState<IconType>(null);
    return (
        <Flex
            sx={{
                width: "100%",
                justifyContent: "center",
                transition: "all 1s",
                paddingTop: "80px",
                position: "relative",
            }}
        >
            {activeIndex >= 0 && (
                <Box
                    sx={{
                        position: "absolute",
                        left: "0",
                        top: "100px",
                        width: "480px",
                    }}
                >
                    {list2[activeIndex].value === LabelType.Aviation && (
                        <AviationDes></AviationDes>
                    )}
                    {list2[activeIndex].value === LabelType.Cosmetics && (
                        <CosmeticsDes></CosmeticsDes>
                    )}
                    {list2[activeIndex].value === LabelType.Mileage && (
                        <MileageDes></MileageDes>
                    )}
                    {list2[activeIndex].value === LabelType.Up && (
                        <UpDes></UpDes>
                    )}
                    {list2[activeIndex].value === LabelType.Estate && (
                        <EstateDes></EstateDes>
                    )}
                </Box>
            )}
            <Box
                sx={{
                    width: "988px",
                    marginRight: "50px",
                }}
            >
                <Box
                    sx={{
                        height: "782px",
                        backgroundImage: `url(${
                            activeIndex === -1
                                ? LineAll
                                : list2[activeIndex].backgroundImg
                        })`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        position: "relative",
                    }}
                >
                    {list.map((item: any) => {
                        return (
                            <Box
                                onClick={() => {
                                    const value = item.value;
                                    if (!value) {
                                        return;
                                    }
                                    setActiveIndex(-1);
                                    if (value === currentIconType) {
                                        setCurrentIconType(null);
                                        return;
                                    }
                                    setCurrentIconType(value);
                                }}
                                sx={{
                                    position: "absolute",
                                    ...item.position,
                                    border: "2px solid #fff",
                                    borderRadius: "50%",
                                    padding: "4px",
                                    opacity:
                                        activeIndex === -1 ||
                                        item.show.includes(
                                            list2[activeIndex].value,
                                        )
                                            ? 1
                                            : 0.5,
                                    "&:hover": {
                                        border:
                                            item.value && "2px solid #FFD700",
                                        cursor: item.value && "pointer",
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
                <Flex
                    justify={"space-around"}
                    sx={{
                        marginTop: "100px",
                    }}
                >
                    {list2.map((item, index) => {
                        return (
                            <Flex
                                align={"center"}
                                flexDir={"column"}
                                onClick={() => {
                                    setCurrentIconType(null);
                                    if (index === activeIndex) {
                                        setActiveIndex(-1);
                                        return;
                                    }
                                    setActiveIndex(index);
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "25px",
                                        height: "25px",
                                        borderRadius: "50%",
                                        padding: "6px",
                                        border:
                                            index === activeIndex
                                                ? "1px solid #FFD700"
                                                : "1px solid transparent",
                                        cursor: "pointer",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            background:
                                                index === activeIndex
                                                    ? "#FFD700"
                                                    : "#fff",
                                            borderRadius: "50%",
                                        }}
                                    ></Box>
                                </Box>
                                <Text
                                    sx={{
                                        fontSize: "16px",
                                        color:
                                            index === activeIndex
                                                ? "#FFD700"
                                                : "#fff",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {item.label}
                                </Text>
                            </Flex>
                        );
                    })}
                </Flex>
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
