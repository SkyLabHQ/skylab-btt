import {
    Flex,
    IconButton,
    Image,
    Menu,
    MenuButton,
    MenuList,
    useMediaQuery,
} from "@chakra-ui/react";
import React from "react";

import { useTour } from "@reactour/tour";
import BulbIcon from "./assets/bulb.svg";

const tourList = [
    { label: "Bid Tac Toe" },
    {
        label: "Pilot",
    },
    {
        label: "Mileage",
    },
    {
        label: "Leaderboard",
    },
    {
        label: "Detailed Rules",
    },
];
const Tutorialcon = ({
    onShowLeaderboard,
}: {
    onShowLeaderboard: () => void;
}) => {
    const { setIsOpen, setCurrentStep } = useTour();
    const [isPc] = useMediaQuery("(min-width: 800px)");

    return (
        <Menu>
            {isPc ? (
                <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={
                        <Image
                            src={BulbIcon}
                            sx={{
                                width: "1.875vw",
                                height: "1.875vw",
                            }}
                        />
                    }
                    variant="unstyled"
                    sx={{
                        border: "2px solid #F2D861",
                        borderRadius: "0.625vw",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        width: "2.2917vw",
                        height: "2.2917vw",
                    }}
                />
            ) : (
                <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={
                        <Image
                            src={BulbIcon}
                            sx={{
                                width: "28px",
                                height: "28px",
                            }}
                        />
                    }
                    variant="unstyled"
                    sx={{
                        width: "32px",
                        height: "32px",
                        background: "transparent !important",
                        border: "2px solid #F2D861",
                        display: "flex",
                        alignItems: "center",
                        color: "#F2D861",
                        fontWeight: 700,
                        cursor: "pointer",
                        padding: "4px",
                        justifyContent: "center",
                        minWidth: "32px",
                        minHeight: "32px",
                    }}
                />
            )}

            <MenuList
                sx={{
                    background: "transparent",
                    boxShadow: "none",
                    border: "none",
                    cursor: "pointer",
                }}
                onMouseLeave={() => {
                    setIsOpen(false);
                }}
                onMouseMove={() => {
                    setIsOpen(true);
                }}
            >
                {tourList.map((item, index) => {
                    return (
                        <Flex
                            onMouseMove={() => {
                                setCurrentStep(index);
                                if (index === 3) {
                                    onShowLeaderboard();
                                }
                            }}
                            align={"center"}
                            justifyContent={"center"}
                            sx={{
                                width: isPc ? "14.5833vw" : "120px",
                                height: isPc ? "2.6042vw" : "28px",
                                borderRadius: isPc ? "0.5208vw" : "4px",
                                border: "1px solid #F2D861",
                                background: "#4A4A4A",
                                color: "#F2D861",
                                marginBottom: isPc ? "0.3125vw" : "4px",
                                fontSize: isPc ? "1.0417vw" : "14px",
                                "&:hover": {
                                    border: "2px solid #F2D861",
                                },
                            }}
                            key={index}
                        >
                            {item.label}
                        </Flex>
                    );
                })}
            </MenuList>
        </Menu>
    );
};

export default Tutorialcon;
