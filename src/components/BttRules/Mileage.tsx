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
import CosmeticsScoreIcon from "./assets/cosmetics-score.png";
import Up from "./assets/up.png";
import VaultIcon from "./assets/vault.png";
import UpgradeP from "./assets/upgrade-p.png";
import BabyMercIcon from "./assets/baby-merc.png";
import AviScore from "./assets/avi-score.png";
import CosmeticsIcon from "./assets/cosmetics.png";
import TournamentIcon from "./assets/tournament.png";
import PlayIcon from "./assets/play.png";

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
export default Mileage;
