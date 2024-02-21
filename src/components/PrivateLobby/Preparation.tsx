import {
    Box,
    Button,
    Flex,
    SimpleGrid,
    useClipboard,
    Image,
    Text,
    useMediaQuery,
} from "@chakra-ui/react";
import FriendIcon from "./assets/friend.svg";
import React, { useEffect, useState } from "react";
import Games from "./Games";
import History from "./History";
import Leaderboard from "./Leaderboard";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { usePrivateLobbyContext } from "@/pages/PrivateLobby";
import useSkyToast from "@/hooks/useSkyToast";
import LobbyInfo from "./LobbyInfo";
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
    const toast = useSkyToast();
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <SimpleGrid
            columns={3}
            spacingX={isPc ? "12px" : "6px"}
            sx={{
                width: isPc && "40vw",
            }}
        >
            {tabs.map((item, index) => {
                return (
                    <Box
                        key={index}
                        sx={{
                            height: isPc ? "2.8646vw" : "30px",
                            borderRadius: isPc ? "1.0417vw" : "10px",
                            border: isPc ? "2px solid #FFF" : "1px solid #FFF",
                            background:
                                activeIndex === index ? "#000" : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            fontSize: isPc ? "1.25vw" : "12px",
                        }}
                        onClick={() => {
                            onChangeActive(index);
                        }}
                    >
                        {item.label}
                    </Box>
                );
            })}
        </SimpleGrid>
    );
};

const Preparation = () => {
    const toast = useSkyToast();
    const { onCopy } = useClipboard(window.location.href ?? "");
    const [isPc] = useMediaQuery("(min-width: 800px)");
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
                width: isPc && "71.1458vw",
                margin: "0 auto",
                paddingTop: isPc ? "5.2083vw" : "16px",
                height: "100%",
            }}
        >
            <Tabs
                activeIndex={activeIndex}
                onChangeActive={(index) => {
                    setActiveIndex(index);
                }}
            ></Tabs>
            <Box
                sx={{
                    height: isPc ? "600px" : "450px",
                    marginTop: "10px",
                    border: "1px solid #FFF",
                    borderRadius: isPc ? "0.625vw" : "10px",
                    overflow: "hidden",
                }}
            >
                {activeIndex === 0 && <Games></Games>}
                {activeIndex === 1 && <History></History>}
                {activeIndex === 2 && <Leaderboard></Leaderboard>}
            </Box>
            <LobbyInfo></LobbyInfo>
            {activeIndex === 0 && (
                <Flex justify={"center"}>
                    <Button
                        onClick={() => {
                            onCopy();
                            toast("Copy link success");
                        }}
                        sx={{
                            width: isPc ? "12.5vw" : "160px",
                            height: isPc ? "2.8646vw" : "40px",
                            borderRadius: isPc ? "0.9375vw" : "8px",
                            border: "2px solid #FFF",
                            background: "#303030",
                            fontSize: isPc ? "1.25vw" : "20px",
                            marginTop: "3.8542vw",
                        }}
                    >
                        <Image
                            src={FriendIcon}
                            sx={{
                                width: isPc ? "1.7708vw" : "22px",
                                marginRight: "0.5208vw",
                            }}
                        ></Image>
                        <Text>Invite Friend</Text>
                    </Button>
                </Flex>
            )}
        </Box>
    );
};

export default Preparation;
