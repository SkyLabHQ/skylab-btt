import { Box, Text, Image, Flex } from "@chakra-ui/react";
import { useState } from "react";
import PlanetList from "./PlanetList";
import RightNav from "./RightNav";
import Header from "./Header";
import { StepType, TourProvider } from "@reactour/tour";
import WhiteArrowIcon from "./assets/white-arrow.svg";

export const arrowPosition = ["", "", "", "", "right"];

const getArrowStyles = (direction: any, arrowPos: any) => {
    let mainSideStyle = {};
    let beforeSideStyle = {};

    const width = 20;
    const baseStyle = {
        position: "absolute",
        height: 0,
        width: 0,
        "&:before": {
            content: "''",
            position: "absolute",
        },
    };

    switch (direction) {
        case "left":
            mainSideStyle = {
                borderLeft: `${width}px solid #F2D861`,
                borderTop: `${width}px solid transparent`,
                borderBottom: `${width}px solid transparent`,
                right: "-20px",
                bottom: "20px",
            };
            beforeSideStyle = {
                bottom: "-20px",
                right: "2px",
                borderLeft: `${width}px solid #4A4A4A`,
                borderTop: `${width}px solid transparent`,
                borderBottom: `${width}px solid transparent`,
            };
            break;
        case "right":
            mainSideStyle = {
                borderRight: `${width}px solid #F2D861`,
                borderTop: `${width}px solid transparent`,
                borderBottom: `${width}px solid transparent`,
                left: "-20px",
                bottom: "20px",
            };
            beforeSideStyle = {
                bottom: "-20px",
                left: "2px",
                borderRight: `${width}px solid #4A4A4A`,
                borderTop: `${width}px solid transparent`,
                borderBottom: `${width}px solid transparent`,
            };
            break;
        case "bottom":
            mainSideStyle = {
                borderBottom: `${width}px solid #F2D861`,
                borderLeft: `${width}px solid transparent`,
                borderRight: `${width}px solid transparent`,
                top: "-20px",
                left: arrowPos === "left" ? "20px" : undefined,
                right: arrowPos === "right" ? "20px" : undefined,
            };
            beforeSideStyle = {
                top: "2px",
                left: arrowPos === "left" ? "-20px" : undefined,
                right: arrowPos === "right" ? "-20px" : undefined,
                borderBottom: `${width}px solid #4A4A4A`,
                borderLeft: `${width}px solid transparent`,
                borderRight: `${width}px solid transparent`,
            };
            break;
        case "top":
            mainSideStyle = {
                borderTop: `${width}px solid #F2D861`,
                borderLeft: `${width}px solid transparent`,
                borderRight: `${width}px solid transparent`,
                bottom: "-20px",
                [arrowPos ? arrowPos : "left"]: "20px",
            };
            beforeSideStyle = {
                bottom: "2px",
                [arrowPos ? arrowPos : "left"]: "-20px",
                borderTop: `${width}px solid #4A4A4A`,
                borderLeft: `${width}px solid transparent`,
                borderRight: `${width}px solid transparent`,
            };
            break;
        default:
            // Handle default case or throw an error
            break;
    }

    return {
        ...baseStyle,
        ...mainSideStyle,
        "&:before": {
            ...baseStyle["&:before"],
            ...beforeSideStyle,
        },
    };
};

const ContentComponent = (props: any) => {
    const content = props.steps[props.currentStep].content;
    const position = props.steps[props.currentStep].position;
    const arrowPos = arrowPosition[props.currentStep];
    return (
        <Box
            sx={{
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                fontWeight: "600",
                background: "#4A4A4A",
                color: "#000",
                fontFamily: "Orbitron",
            }}
        >
            <Box sx={getArrowStyles(position, arrowPos)}></Box>
            {typeof content === "function" ? content({ ...props }) : content}
        </Box>
    );
};
const tourConfig: StepType[] = [
    {
        selector: ".bid-tac-toe",
        position: "top",
        content: () => {
            return (
                <Box>
                    <Text
                        sx={{
                            color: "#fff",
                            fontSize: "1.0417vw",
                            fontWeight: 600,
                        }}
                    >
                        Enter game here
                    </Text>
                </Box>
            );
        },
    },
    {
        selector: ".pilot-avatar",
        position: "left",
        content: () => {
            return (
                <Box
                    sx={{
                        width: "300px",
                    }}
                >
                    <Text
                        sx={{
                            color: "#fff",
                            fontSize: "1.0417vw",
                            fontWeight: 600,
                        }}
                    >
                        Set a pilot here to accumulate mileage.{" "}
                    </Text>
                    <Flex
                        align={"center"}
                        sx={{
                            width: "fit-content",
                            marginTop: "1.0417vw",
                            color: "#fff",
                            height: "22px",
                            padding: "4px 10px",
                            borderRadius: "40px",
                            background: "rgba(217, 217, 217, 0.50)",
                        }}
                    >
                        More on pilots
                        <Image
                            src={WhiteArrowIcon}
                            sx={{
                                width: "16px",
                            }}
                        ></Image>
                    </Flex>
                </Box>
            );
        },
    },
    {
        selector: ".pilot-mileage",
        position: "left",
        content: () => {
            return (
                <Box
                    sx={{
                        width: "300px",
                    }}
                >
                    <Text
                        sx={{
                            color: "#fff",
                            fontSize: "1.0417vw",
                            fontWeight: 600,
                        }}
                    >
                        Playing games will earn mileage.{" "}
                    </Text>
                    <Flex
                        align={"center"}
                        sx={{
                            width: "fit-content",
                            marginTop: "1.0417vw",
                            color: "#fff",
                            height: "22px",
                            padding: "4px 10px",
                            borderRadius: "40px",
                            background: "rgba(217, 217, 217, 0.50)",
                        }}
                    >
                        More on mileadge
                        <Image
                            src={WhiteArrowIcon}
                            sx={{
                                width: "16px",
                            }}
                        ></Image>
                    </Flex>
                </Box>
            );
        },
    },
    {
        selector: ".leaderboard",
        position: "left",
        content: () => {
            return (
                <Box
                    sx={{
                        width: "300px",
                    }}
                >
                    <Text
                        sx={{
                            color: "#fff",
                            fontSize: "1.0417vw",
                            fontWeight: 600,
                        }}
                    >
                        Check the leaderboards and see where your peers are at.{" "}
                    </Text>
                    <Flex
                        align={"center"}
                        sx={{
                            width: "fit-content",
                            marginTop: "1.0417vw",
                            color: "#fff",
                            height: "22px",
                            padding: "4px 10px",
                            borderRadius: "40px",
                            background: "rgba(217, 217, 217, 0.50)",
                        }}
                    >
                        More on mileadge
                        <Image
                            src={WhiteArrowIcon}
                            sx={{
                                width: "16px",
                            }}
                        ></Image>
                    </Flex>
                </Box>
            );
        },
    },
    {
        selector: ".rules",
        position: "left",
        content: () => {
            return (
                <Box
                    sx={{
                        width: "300px",
                    }}
                >
                    <Text
                        sx={{
                            color: "#fff",
                            fontSize: "1.0417vw",
                            fontWeight: 600,
                        }}
                    >
                        Click here for more info about Project Mercury{" "}
                    </Text>
                </Box>
            );
        },
    },
];

interface ChildProps {
    onNextRound: (step: number | string) => void;
}

const MissionRound = ({ onNextRound }: ChildProps) => {
    const [active, setActive] = useState(1);
    const [showAllActivities, setShowAllActivities] = useState(false);

    return (
        <TourProvider
            onClickMask={() => {}}
            steps={tourConfig}
            padding={{
                mask: 5,
                popover: 35,
            }}
            beforeClose={() => {}}
            ContentComponent={ContentComponent}
            styles={{
                maskWrapper: (base) => ({
                    ...base,
                }),
                popover: (base: any, state: any) => {
                    return {
                        ...base,
                        boxShadow: "none",
                        borderRadius: "0.8333vw",
                        background: "#4A4A4A",
                        border: "1px solid #F2D861",
                        padding: "12px",
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
            <Box
                h={"100vh"}
                w={"100vw"}
                sx={{ color: "#000", fontWeight: 600 }}
                onClick={() => {}}
            >
                <Header onNextRound={onNextRound}></Header>
                <PlanetList
                    active={active}
                    showAllActivities={showAllActivities}
                    onChangeActive={(index) => {
                        setActive(index);
                    }}
                    onChangeAllActivities={(flag) => {
                        setShowAllActivities(flag);
                    }}
                ></PlanetList>
                <RightNav onNextRound={onNextRound}></RightNav>
            </Box>
        </TourProvider>
    );
};

export default MissionRound;
