import { Box, Image, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import GardenIcon from "@/components/TacToe/assets/garden-icon.png";
import BackIcon from "@/components/TacToe/assets/back-arrow-home.svg";
const BackHomeButton = ({ onClick }: { onClick: () => void }) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Box
            sx={{
                display: "flex",
                position: "absolute",
                left: "0",
                top: "0",
                cursor: "pointer",
            }}
            onClick={onClick}
        >
            <Image
                src={GardenIcon}
                sx={{
                    width: isPc ? "4.1667vw" : "48px",
                    marginRight: isPc ? "0.5208vw" : "4px",
                }}
            ></Image>
            <Image
                src={BackIcon}
                sx={{
                    width: isPc ? "2.0833vw" : "24px",
                }}
            ></Image>
        </Box>
    );
};

export default BackHomeButton;
