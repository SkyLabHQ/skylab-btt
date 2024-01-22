import { Box, Text } from "@chakra-ui/react";
import React from "react";

import { useTour } from "@reactour/tour";
import TopMenu from "./TopMenu";
import Tutorialcon from "./Tutorialcon";

const Header = ({
    onNextRound,
    onShowLeaderboard,
}: {
    onNextRound: (step: number | string) => void;
    onShowLeaderboard: () => void;
}) => {
    const { setIsOpen, setCurrentStep } = useTour();

    return (
        <Box>
            <Box pos="absolute" left="1.1979vw" top="1.8229vw" zIndex={20}>
                <Box
                    sx={{
                        display: "flex",
                    }}
                >
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                            }}
                        >
                            <Text
                                sx={{
                                    color: "#F2D861",
                                    textShadow: "0.2083vw 0.2083vw 0vw #000",
                                    fontFamily: "Orbitron",
                                    fontSize: "2.5vw",
                                    fontStyle: "normal",
                                    fontWeight: 800,
                                    lineHeight: "normal",
                                    WebkitTextStroke: "0.1042vw #000",
                                    marginRight: "1.5625vw",
                                }}
                            >
                                Tournament
                            </Text>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        marginTop: "1.875vw",
                    }}
                >
                    <TopMenu></TopMenu>
                </Box>
            </Box>
            <Box
                sx={{
                    position: "fixed",
                    zIndex: 9999999,
                    left: "4.375vw",
                    top: "6.875vw",
                }}
                onMouseLeave={() => {
                    setIsOpen(false);
                }}
            >
                <Tutorialcon
                    onShowLeaderboard={onShowLeaderboard}
                ></Tutorialcon>
            </Box>
        </Box>
    );
};

export default Header;
