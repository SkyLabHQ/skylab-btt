import { Box, Text, Image, Flex, useMediaQuery } from "@chakra-ui/react";
import { useState } from "react";
import PlanetList from "./PlanetList";
import RightNav from "./RightNav";
import Header from "./Header";
import { StepType, TourProvider } from "@reactour/tour";
import WhiteArrowIcon from "./assets/white-arrow.svg";
import MBttHome from "./MBttHome";
import Discord from "./assets/discord.svg";
import Tw from "./assets/tw.svg";
import Telegram from "./assets/telegram.svg";
import SkylabIcon from "./assets/skylab-icon.svg";
export const arrowPosition = ["left", "left", "left", "top", "right"];
export const mArrowPosition = ["left", "left", "left", "left", "right"];

export const menuList = [
    // {
    //     icon: CosmeticRewardIcon,
    //     title: "Cosmetic Reward",
    // },
    // {
    //     icon: TasksIcon,
    //     title: "Tasks",
    // },
    // {
    //     icon: FactionIcon,
    //     title: "Faction",
    // },
    // {
    //     icon: Lock,
    //     title: "Mercury Overview",
    // },
    // {
    //     icon: Airdrop,
    //     title: "Reward History",
    //     onClick: () => {
    //         onNextRound(0);
    //     },
    // },
    {
        icon: SkylabIcon,
        title: "About",
        onClick: () => {
            window.open("https://app.projmercury.io", "_blank");
        },
    },
];

export const menuList2 = [
    {
        icon: Tw,
        onClick: () => {
            window.open("https://twitter.com/skylabHQ", "_blank");
        },
    },
    {
        icon: Discord,
        onClick: () => {
            window.open("https://discord.gg/qWxPz8Qr87", "_blank");
        },
    },
    {
        icon: Telegram,
        onClick: () => {
            window.open("https://t.me/skylabHQ", "_blank");
        },
    },
];

const getArrowStyles = (direction: any, arrowPos: any, width = 20) => {
    let mainSideStyle = {};
    let beforeSideStyle = {};

    const baseStyle = {
        position: "absolute",
        height: 0,
        width: 0,
        "&:before": {
            content: "''",
            position: "absolute",
        },
    };

    console.log(direction, arrowPos);

    switch (direction) {
        case "left":
            mainSideStyle = {
                borderLeft: `${width}px solid #F2D861`,
                borderTop: `${width}px solid transparent`,
                borderBottom: `${width}px solid transparent`,
                right: `-${width}px`,
                bottom: `${width}px`,
            };
            beforeSideStyle = {
                bottom: `-${width}px`,
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
                left: `-${width}px`,
                bottom: `${width}px`,
            };
            beforeSideStyle = {
                bottom: `-${width}px`,
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
                top: `-${width}px`,
                left: arrowPos === "left" ? `${width}px` : undefined,
                right: arrowPos === "right" ? `${width}px` : undefined,
            };
            beforeSideStyle = {
                top: "2px",
                left: arrowPos === "left" ? `-${width}px` : undefined,
                right: arrowPos === "right" ? `-${width}px` : undefined,
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
                bottom: `-${width}px`,
                [arrowPos ? arrowPos : "left"]: `${width}px`,
            };
            beforeSideStyle = {
                bottom: "2px",
                [arrowPos ? arrowPos : "left"]: `-${width}px`,
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
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const content = props.steps[props.currentStep].content;
    const position = props.steps[props.currentStep].position;
    const arrowPos = isPc
        ? arrowPosition[props.currentStep]
        : mArrowPosition[props.currentStep];
    return (
        <Box
            sx={{
                fontSize: "1.0417vw",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                fontWeight: "600",
                background: "#4A4A4A",
                color: "#000",
                fontFamily: "Orbitron",
                padding: "10px",
            }}
        >
            <Box sx={getArrowStyles(position, arrowPos, isPc ? 20 : 10)}></Box>
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
                            fontSize: "0.8333vw",
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
                <Box>
                    <Text
                        sx={{
                            color: "#fff",
                            fontSize: "0.8333vw",
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
                            height: "1.25vw",
                            padding: "0.2083vw 0.5208vw",
                            borderRadius: "2.0833vw",
                            background: "rgba(217, 217, 217, 0.50)",
                            fontSize: "0.8333vw",
                        }}
                    >
                        More on pilots
                        <Image
                            src={WhiteArrowIcon}
                            sx={{
                                width: "0.8333vw",
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
                <Box>
                    <Text
                        sx={{
                            color: "#fff",
                            fontSize: "0.8333vw",
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
                            height: "1.25vw",
                            padding: "0.2083vw 0.5208vw",
                            borderRadius: "2.0833vw",
                            background: "rgba(217, 217, 217, 0.50)",
                            fontSize: "0.8333vw",
                        }}
                    >
                        More on mileadge
                        <Image
                            src={WhiteArrowIcon}
                            sx={{
                                width: "0.8333vw",
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
                <Box>
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
                            height: "1.25vw",
                            padding: "0.2083vw 0.5208vw",
                            borderRadius: "2.0833vw",
                            background: "rgba(217, 217, 217, 0.50)",
                            fontSize: "0.8333vw",
                        }}
                    >
                        More on mileadge
                        <Image
                            src={WhiteArrowIcon}
                            sx={{
                                width: "0.8333vw",
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
                <Box>
                    <Text
                        sx={{
                            color: "#fff",
                            fontSize: "0.8333vw",
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

const mTourConfig: StepType[] = [
    {
        selector: ".bid-tac-toe",
        position: "top",
        content: () => {
            return (
                <Box>
                    <Text
                        sx={{
                            color: "#fff",
                            fontSize: "12px",
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
        position: "bottom",
        content: () => {
            return (
                <Box
                    sx={{
                        width: "200px",
                    }}
                >
                    <Text
                        sx={{
                            color: "#fff",
                            fontSize: "12px",
                            fontWeight: 600,
                        }}
                    >
                        Set a pilot here to accumulate mileage.{" "}
                    </Text>
                    <Flex
                        align={"center"}
                        sx={{
                            width: "fit-content",
                            marginTop: "12px",
                            color: "#fff",
                            height: "24px",
                            padding: "4px 10px",
                            borderRadius: "8px",
                            background: "rgba(217, 217, 217, 0.50)",
                            fontSize: "12px",
                        }}
                    >
                        More on pilots
                        <Image
                            src={WhiteArrowIcon}
                            sx={{
                                width: "12px",
                                marginLeft: "4px",
                            }}
                        ></Image>
                    </Flex>
                </Box>
            );
        },
    },
    {
        selector: ".pilot-mileage",
        position: "bottom",
        content: () => {
            return (
                <Box>
                    <Text
                        sx={{
                            color: "#fff",
                            fontSize: "12px",
                            fontWeight: 600,
                        }}
                    >
                        Playing games will earn mileage.{" "}
                    </Text>
                    <Flex
                        align={"center"}
                        sx={{
                            width: "fit-content",
                            marginTop: "12px",
                            color: "#fff",
                            height: "24px",
                            padding: "4px 10px",
                            borderRadius: "8px",
                            background: "rgba(217, 217, 217, 0.50)",
                            fontSize: "12px",
                        }}
                    >
                        More on mileadge
                        <Image
                            src={WhiteArrowIcon}
                            sx={{
                                width: "12px",
                                marginLeft: "4px",
                            }}
                        ></Image>
                    </Flex>
                </Box>
            );
        },
    },
    {
        selector: ".leaderboard",
        position: "bottom",
        content: () => {
            return (
                <Box>
                    <Text
                        sx={{
                            color: "#fff",
                            fontSize: "12px",
                            fontWeight: 600,
                        }}
                    >
                        Check the leaderboards and see where your peers are at.{" "}
                    </Text>
                    <Flex
                        align={"center"}
                        sx={{
                            width: "fit-content",
                            marginTop: "12px",
                            color: "#fff",
                            height: "24px",
                            padding: "4px 10px",
                            borderRadius: "8px",
                            background: "rgba(217, 217, 217, 0.50)",
                            fontSize: "12px",
                        }}
                    >
                        More on mileadge
                        <Image
                            src={WhiteArrowIcon}
                            sx={{
                                width: "12px",
                                marginLeft: "4px",
                            }}
                        ></Image>
                    </Flex>
                </Box>
            );
        },
    },
    {
        selector: ".rules",
        position: "bottom",
        content: () => {
            return (
                <Box>
                    <Text
                        sx={{
                            color: "#fff",
                            fontSize: "12px",
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
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [active, setActive] = useState(1);
    const [showAllActivities, setShowAllActivities] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    return (
        <TourProvider
            onClickMask={() => {}}
            key={isPc ? "pc" : "mobile"}
            steps={isPc ? tourConfig : mTourConfig}
            padding={{
                mask: 5,
                // popover: 35,
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
                        borderRadius: isPc ? "0.8333vw" : "8px",
                        background: "#4A4A4A",
                        border: "1px solid #F2D861",
                        padding: "0.625vw",
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
                <Box
                    h={"100%"}
                    w={"100vw"}
                    sx={{ color: "#000", fontWeight: 600 }}
                    onClick={() => {}}
                >
                    <Header
                        onNextRound={onNextRound}
                        onShowLeaderboard={() => {
                            setShowLeaderboard(true);
                        }}
                    ></Header>
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
                    <RightNav
                        onNextRound={onNextRound}
                        showLeaderboard={showLeaderboard}
                    ></RightNav>
                </Box>
            ) : (
                <MBttHome
                    onNextRound={onNextRound}
                    onShowLeaderboard={() => {
                        setShowLeaderboard(true);
                    }}
                ></MBttHome>
            )}
        </TourProvider>
    );
};

export default MissionRound;
