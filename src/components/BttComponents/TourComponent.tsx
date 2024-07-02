import React from "react";
import { Box, Flex, Image, Text, useMediaQuery } from "@chakra-ui/react";
import LeftIcon from "./assets/left.svg";
import RightIcon from "./assets/right.svg";

const ContentComponent = (props: any) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");

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
                // background: "#fff",
                color: "#000",
                fontFamily: "Orbitron",
                paddingBottom: "10px",
            }}
        >
            {/* Check if the step.content is a function or a string */}
            <Box
                sx={{
                    background: "#fff",
                    padding: isPc ? "24px 30px" : "6px 6px",
                    borderRadius: "8px",
                }}
            >
                {typeof content === "function"
                    ? content({ ...props })
                    : content}
            </Box>
            <Flex
                sx={{
                    width: "100%",
                    justifyContent: "center",
                    marginTop: "10px ",
                }}
            >
                <Flex align={"center"}>
                    {props.currentStep === 0 ? (
                        <Image
                            src={LeftIcon}
                            sx={{
                                width: "12px",
                                marginRight: "10px",
                            }}
                        ></Image>
                    ) : (
                        <Image
                            onClick={() => {
                                props.setCurrentStep((s: any) => s - 1);
                            }}
                            src={RightIcon}
                            sx={{
                                width: "12px",
                                marginRight: "10px",
                                transform: "rotate(180deg)",
                                cursor: "pointer",
                            }}
                        ></Image>
                    )}
                    {props.steps.map((item: any, index: number) => {
                        return (
                            <Flex
                                onClick={() => {
                                    props.setCurrentStep(index);
                                }}
                                key={index}
                                align={"center"}
                                justify={"center"}
                                sx={{
                                    borderRadius: "50%",
                                    width: "18px",
                                    height: "18px",
                                    border:
                                        props.currentStep === index
                                            ? "2px solid #fff"
                                            : "none",
                                    margin: "0 5px",
                                    cursor: "pointer",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "9px",
                                        height: "9px",
                                        borderRadius: "50%",
                                        background: "#fff",
                                    }}
                                ></Box>
                            </Flex>
                        );
                    })}
                    {isLastStep ? (
                        <Image
                            src={LeftIcon}
                            sx={{
                                marginLeft: "10px",
                                width: "12px",
                                transform: "rotate(180deg)",
                            }}
                        ></Image>
                    ) : (
                        <Image
                            src={RightIcon}
                            sx={{
                                marginLeft: "10px",
                                width: "12px",
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                props.setCurrentStep((s: any) => s + 1);
                            }}
                        ></Image>
                    )}
                </Flex>
            </Flex>
        </Box>
    );
};

export default ContentComponent;
