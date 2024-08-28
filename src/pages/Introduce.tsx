import { Box, Image, keyframes, Text, Flex } from "@chakra-ui/react";
import CircleGif from "@/components/Introduce/assets/circle.gif";
import Quan1 from "@/components/Introduce/assets/quan-1.png";
import Quan2 from "@/components/Introduce/assets/quan-2.png";
import Quan3 from "@/components/Introduce/assets/quan-3.png";
import Quan4 from "@/components/Introduce/assets/quan-4.png";
import Quan5 from "@/components/Introduce/assets/quan-5.png";
import Quan6 from "@/components/Introduce/assets/quan-6.png";
import { useState } from "react";
import Rule from "@/components/Introduce/Rule";
import IntroduceContent from "@/components/Introduce/IntroduceContent";
import Schedule from "@/components/Introduce/Schedule";

const quanList = [
    {
        img: Quan1,
        width: "32%",
        activeWidth: "37%",
    },
    {
        img: Quan2,
        width: "40%",
        activeWidth: "47%",
    },
    {
        img: Quan3,
        width: "50%",
        activeWidth: "57%",
    },
    {
        img: Quan4,
        width: "60%",
        activeWidth: "67%",
    },
    {
        img: Quan5,
        width: "70%",
        activeWidth: "77%",
    },
    {
        img: Quan6,
        width: "80%",
        activeWidth: "87%",
    },
];

const move = keyframes`
    0% {
        transform: translate(-50%, -50%) rotate(0deg);
    }
    
    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
`;

const move1 = keyframes`
    0% {
        transform: translate(-50%, -50%) rotate(360deg);
    }

    100% {
        transform: translate(-50%, -50%) rotate(0deg);
    }
`;

const Introduce = () => {
    const [mode, setMode] = useState("default");

    const handleChangeMode = (mode: string) => {
        setMode(mode);
    };

    return (
        <Box
            sx={{
                fontFamily: "Orbitron",
                // padding: "0 20px",
                background: "#1B1B1B",
                // minHeight: "100vh",
            }}
        >
            {mode === "default" && (
                <IntroduceContent
                    onModeChange={(mode: string) => {
                        handleChangeMode(mode);
                    }}
                ></IntroduceContent>
            )}
            {mode === "rules" && (
                <Rule
                    onModeChange={(mode: string) => {
                        handleChangeMode(mode);
                    }}
                ></Rule>
            )}
            {mode === "schedule" && (
                <Schedule
                    onModeChange={(mode: string) => {
                        handleChangeMode(mode);
                    }}
                ></Schedule>
            )}
        </Box>
    );
};

export default Introduce;
