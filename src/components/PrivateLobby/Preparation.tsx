import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Games from "./Games";
import History from "./History";
import Leaderboard from "./Leaderboard";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { usePrivateLobbyContext } from "@/pages/PrivateLobby";
const tabs = [
    {
        label: "Games",
        value: "games",
    },
    {
        label: "Game History",
        value: "game history",
    },
    {
        label: "Leaderboard",
        value: "leaderboard",
    },
];

const Tabs = ({
    activeIndex,
    onChangeActive,
}: {
    activeIndex: number;
    onChangeActive: (activeIndex: number) => void;
}) => {
    return (
        <Box sx={{ display: "flex" }}>
            {tabs.map((item, index) => {
                return (
                    <Box
                        key={index}
                        sx={{
                            width: "11.875vw",
                            height: "2.8646vw",
                            borderRadius: "1.0417vw",
                            border: "2px solid #FFF",
                            background:
                                activeIndex === index ? "#000" : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            marginRight: "0.625vw",
                            fontSize: "1.25vw",
                        }}
                        onClick={() => {
                            onChangeActive(index);
                        }}
                    >
                        {item.label}
                    </Box>
                );
            })}
        </Box>
    );
};

const Preparation = () => {
    const { handleStepChange } = usePrivateLobbyContext();
    const [activeIndex, setActiveIndex] = useState(0);
    const { search } = useLocation();
    const params = qs.parse(search) as any;

    useEffect(() => {
        if (params.type == 2) {
            handleStepChange(1);
            setActiveIndex(1);
        }
    }, [params.type]);

    return (
        <Box
            sx={{
                width: "71.1458vw",
                margin: "0 auto",
                paddingTop: "5.2083vw",
            }}
        >
            <Tabs
                activeIndex={activeIndex}
                onChangeActive={(index) => {
                    setActiveIndex(index);
                }}
            ></Tabs>
            <Box>
                {activeIndex === 0 && <Games></Games>}
                {activeIndex === 1 && <History></History>}
                {activeIndex === 2 && <Leaderboard></Leaderboard>}
            </Box>
        </Box>
    );
};

export default Preparation;
