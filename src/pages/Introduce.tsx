import { Box, Image, keyframes, Text, Flex } from "@chakra-ui/react";
import CircleGif from "@/components/Introduce/assets/circle.gif";
import Quan1 from "@/components/Introduce/assets/quan-1.png";
import Quan2 from "@/components/Introduce/assets/quan-2.png";
import Quan3 from "@/components/Introduce/assets/quan-3.png";
import Quan4 from "@/components/Introduce/assets/quan-4.png";
import Quan5 from "@/components/Introduce/assets/quan-5.png";
import Quan6 from "@/components/Introduce/assets/quan-6.png";
import { useState } from "react";
import Info from "@/components/Introduce/Info";

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
    const [addCount, setAddCount] = useState(0);

    return (
        <Box
            sx={{
                fontFamily: "Orbitron",
                padding: "0 20px",
                background: "#1B1B1B",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "100vh",
                    position: "relative",
                    overflow: "hidden",
                    "& *": {
                        transition: "all 0.5s, width 1s",
                    },
                }}
            >
                {quanList.map((item, index) => {
                    return (
                        <Image
                            src={item.img}
                            key={index}
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width:
                                    addCount > index
                                        ? item.activeWidth
                                        : item.width,
                                // display: addCount > index ? "block" : "none",
                                opacity: addCount > index ? 1 : 0,
                            }}
                            animation={`${
                                index % 2 == 0 ? move : move1
                            } 20s linear infinite`}
                        ></Image>
                    );
                })}
                <Image
                    onClick={() => {
                        if (addCount >= quanList.length) {
                            setAddCount(0);
                            return;
                        }
                        setAddCount(addCount + 1);
                    }}
                    src={CircleGif}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "26%",
                        zIndex: 10,
                        cursor: "pointer",
                    }}
                ></Image>
            </Box>

            <Info></Info>
        </Box>
    );
};

export default Introduce;
