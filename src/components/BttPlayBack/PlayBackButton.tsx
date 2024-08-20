import React, { useEffect } from "react";
import StartIcon from "./assets/start.svg";
import PreStepIcon from "./assets/pre-step.svg";
import NextStepIcon from "./assets/next-step.svg";
import EndIcon from "./assets/end.svg";
import { Flex, Image, SimpleGrid } from "@chakra-ui/react";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";

const PlayBackButton = ({
    showPre,
    showNext,
    handleStartStep,
    handlePreStep,
    handleNextStep,
    handleEndStep,
}: {
    showPre: boolean;
    showNext: boolean;
    handleStartStep: () => void;
    handlePreStep: () => void;
    handleNextStep: () => void;
    handleEndStep: () => void;
}) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    useEffect(() => {
        const keyboardListener = (event: KeyboardEvent) => {
            const key = event.key;
            switch (key) {
                case "ArrowLeft":
                    handlePreStep();
                    break;
                case "ArrowRight":
                    handleNextStep();
                    break;
            }
        };
        document.addEventListener("keydown", keyboardListener);

        return () => {
            document.removeEventListener("keydown", keyboardListener);
        };
    }, [handlePreStep, handleNextStep]);

    return (
        <SimpleGrid
            columns={4}
            sx={{
                marginTop: "20px",
                width: isPc ? "30.4167vw" : "340px",
                "& img": {
                    width: isPc ? "1.25vw" : "16px",
                },
            }}
        >
            <Flex justify={"center"}>
                <Image
                    src={StartIcon}
                    sx={{
                        opacity: showPre ? 1 : 0.5,
                        cursor: showPre ? "pointer" : "not-allowed",
                    }}
                    onClick={() => {
                        showPre && handleStartStep();
                    }}
                ></Image>
            </Flex>
            <Flex justify={"center"}>
                <Image
                    src={PreStepIcon}
                    sx={{
                        opacity: showPre ? 1 : 0.5,
                        cursor: showPre ? "pointer" : "not-allowed",
                    }}
                    onClick={() => {
                        showPre && handlePreStep();
                    }}
                ></Image>
            </Flex>
            <Flex justify={"center"}>
                <Image
                    src={NextStepIcon}
                    sx={{
                        opacity: showNext ? 1 : 0.5,
                        cursor: showNext ? "pointer" : "not-allowed",
                    }}
                    onClick={() => {
                        showNext && handleNextStep();
                    }}
                ></Image>
            </Flex>
            <Flex justify={"center"}>
                <Image
                    src={EndIcon}
                    onClick={() => {
                        showNext && handleEndStep();
                    }}
                    sx={{
                        opacity: showNext ? 1 : 0.5,
                        cursor: showNext ? "pointer" : "not-allowed",
                    }}
                ></Image>
            </Flex>
        </SimpleGrid>
    );
};

export default PlayBackButton;
