import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

const ContentComponent = (props: any) => {
    const isLastStep = props.currentStep === props.steps.length - 1;
    const content = props.steps[props.currentStep].content;
    return (
        <Box
            sx={{
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                fontWeight: "600",
                background: "#fff",
                color: "#000",
                fontFamily: "Orbitron",
            }}
        >
            {/* Check if the step.content is a function or a string */}
            {typeof content === "function" ? content({ ...props }) : content}
        </Box>
    );
};

export default ContentComponent;
