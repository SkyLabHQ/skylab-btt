import React from "react";
import StartIcon from "./assets/start.svg";
import PreStepIcon from "./assets/pre-step.svg";
import NextStepIcon from "./assets/next-step.svg";
import EndIcon from "./assets/end.svg";
import { Flex, Image } from "@chakra-ui/react";

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
    return (
        <Flex
            sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2.0833vw",
            }}
        >
            <Image
                src={StartIcon}
                sx={{
                    marginRight: "3.125vw",
                    width: "1.25vw",
                    opacity: showPre ? 1 : 0.5,
                    cursor: showPre ? "pointer" : "not-allowed",
                }}
                onClick={handleStartStep}
            ></Image>
            <Image
                src={PreStepIcon}
                sx={{
                    marginRight: "3.125vw",
                    width: "1.25vw",
                    opacity: showPre ? 1 : 0.5,
                    cursor: showPre ? "pointer" : "not-allowed",
                }}
                onClick={handlePreStep}
            ></Image>

            <Image
                src={NextStepIcon}
                sx={{
                    marginRight: "3.125vw",
                    width: "1.25vw",
                    opacity: showNext ? 1 : 0.5,
                    cursor: showNext ? "pointer" : "not-allowed",
                }}
                onClick={handleNextStep}
            ></Image>
            <Image
                src={EndIcon}
                onClick={handleEndStep}
                sx={{
                    width: "24px",
                    opacity: showNext ? 1 : 0.5,
                    cursor: showNext ? "pointer" : "not-allowed",
                }}
            ></Image>
        </Flex>
    );
};

export default PlayBackButton;
