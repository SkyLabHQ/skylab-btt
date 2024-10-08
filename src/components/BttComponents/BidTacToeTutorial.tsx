import React from "react";
import { Box, Modal, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { TourProvider } from "@reactour/tour";
import "@reactour/popover/dist/index.css"; // arrow css
import { mTourConfig, tourConfig } from "@/components/BttComponents/config";
import ContentComponent from "@/components/BttComponents/TourComponent";
import TacToeTutorial from "@/components/BttComponents/TacTocTutorial";
import MTacToeTutorial from "./MTacTocTutorial";
import Click1Wav from "@/assets/click1.wav";
const audio = new Audio(Click1Wav);
const BidTacToeTutorial = ({ children }: { children: React.ReactNode }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isPc] = useMediaQuery("(min-width: 800px)");

    return (
        <Box>
            <Box
                onClick={() => {
                    audio.play();
                    onOpen();
                }}
            >
                {children}
            </Box>
            <Modal isOpen={isOpen} onClose={onClose} size="full">
                <TourProvider
                    onClickMask={() => {}}
                    steps={isPc ? tourConfig : mTourConfig}
                    padding={{
                        mask: 5,
                        // popover: [35, 0, 0, 10],
                    }}
                    beforeClose={() => {
                        onClose();
                    }}
                    ContentComponent={ContentComponent}
                    styles={{
                        maskWrapper: (base) => ({
                            ...base,
                        }),
                        popover: (base: any, state: any) => {
                            return {
                                ...base,
                                boxShadow: "none",
                                borderRadius: isPc ? "0.8333vw" : "8px",
                                background: "transparent",
                                padding: 0,
                                // ...doArrow(
                                //     state.position,
                                //     state.verticalAlign,
                                //     state.horizontalAlign,
                                // ),
                            };
                        },
                        highlightedArea: (base: any, props: any) => ({
                            ...base,
                            display: "block",
                            stroke: "#FDDC2D",
                            strokeWidth: 4,
                            strokeDasharray: "8,4",
                            padding: 0,
                            rx: 10,
                        }),
                    }}
                >
                    {isPc ? (
                        <TacToeTutorial></TacToeTutorial>
                    ) : (
                        <MTacToeTutorial></MTacToeTutorial>
                    )}
                </TourProvider>
            </Modal>
        </Box>
    );
};

export default BidTacToeTutorial;
