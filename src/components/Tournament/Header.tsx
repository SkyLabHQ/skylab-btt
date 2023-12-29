import {
    Box,
    Button,
    Flex,
    IconButton,
    Image,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    SimpleGrid,
    Text,
} from "@chakra-ui/react";
import React from "react";
import Discord from "./assets/discord.svg";
import Tw from "./assets/tw.svg";
import Telegram from "./assets/telegram.svg";
import SkylabIcon from "./assets/skylab-icon.svg";
import Airdrop from "./assets/airdrop-icon.svg";
import MenuIcon from "./assets/menu.svg";
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

const Header = ({
    onNextRound,
}: {
    onNextRound: (step: number | string) => void;
}) => {
    const { setIsOpen, setCurrentStep } = useTour();
    const menuList = [
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
        {
            icon: Airdrop,
            title: "Reward History",
            onClick: () => {
                onNextRound(0);
            },
        },
        {
            icon: SkylabIcon,
            title: "About",
            onClick: () => {
                window.open("https://app.projmercury.io", "_blank");
            },
        },
    ];

    const menuList2 = [
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
                <Menu>
                    <MenuButton
                        as={Button}
                        leftIcon={
                            <Image
                                src={MenuIcon}
                                sx={{ width: "1.0417vw", height: "1.0417vw" }}
                            ></Image>
                        }
                        sx={{
                            width: "6.5104vw",
                            height: "2.2917vw",
                            flexShrink: 0,
                            marginTop: "1.875vw",
                            borderRadius: "0.7813vw",
                            background: "transparent !important",
                            border: "2px solid #F2D861",
                            boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                            fontSize: "1.0417vw",
                            display: "flex",
                            alignItems: "center",
                            color: "#F2D861",
                            fontWeight: 700,
                            cursor: "pointer",
                            padding: "0 0.8333vw",
                            "&:hover": {
                                boxShadow: "0px 4px 4px #fbc53e",
                                background: "transparent",
                            },
                            "&:focus": {
                                boxShadow: "none",
                            },
                        }}
                    >
                        Menu
                    </MenuButton>

                    <MenuList
                        sx={{
                            background: "rgb(135,135,135)",
                            color: "#F2D861",
                            width: "11.4583vw",
                            padding: "0.5208vw",
                            borderRadius: "1.0417vw",
                        }}
                    >
                        <Box>
                            <SimpleGrid columns={3} spacing={0} spacingY={2}>
                                {menuList.map((item, index) => {
                                    return (
                                        <MenuItem
                                            key={index}
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                background: "transparent",
                                                cursor: item.onClick
                                                    ? "pointer"
                                                    : "no-drop",
                                                padding: "0",
                                                "&:hover": {
                                                    background: "transparent",
                                                },
                                            }}
                                            onClick={() => {
                                                item?.onClick();
                                            }}
                                        >
                                            <Image
                                                sx={{
                                                    width: "2.7083vw",
                                                    height: "2.7083vw",
                                                }}
                                                src={item.icon}
                                            ></Image>
                                            <Text
                                                sx={{
                                                    fontSize: "0.6771vw",
                                                    textAlign: "center",
                                                    lineHeight: "0.6771vw",
                                                    marginTop: "2px",
                                                }}
                                            >
                                                {item.title}
                                            </Text>
                                        </MenuItem>
                                    );
                                })}
                            </SimpleGrid>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                margin: "0.5208vw 0",
                            }}
                        >
                            <Box
                                sx={{
                                    flex: 1,
                                    height: "1px",
                                    background: "#FDDC2D",
                                }}
                            ></Box>
                            <Text>SNS</Text>
                            <Box
                                sx={{
                                    flex: 1,
                                    height: "1px",
                                    background: "#FDDC2D",
                                }}
                            ></Box>
                        </Box>
                        <SimpleGrid columns={3} spacing={0}>
                            {menuList2.map((item, index) => {
                                return (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Image
                                            sx={{
                                                width: "2.7083vw",
                                                height: "2.7083vw",
                                                cursor: "pointer",
                                            }}
                                            src={item.icon}
                                            onClick={() => {
                                                item?.onClick();
                                            }}
                                        ></Image>
                                    </Box>
                                );
                            })}
                        </SimpleGrid>
                    </MenuList>
                </Menu>
            </Box>
            <Box
                sx={{
                    position: "fixed",
                    zIndex: 9999999,
                    left: "9.375vw",
                    top: "6.875vw",
                }}
                onMouseLeave={() => {
                    setIsOpen(false);
                }}
            >
                <Menu>
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
                                    }}
                                    align={"center"}
                                    justifyContent={"center"}
                                    sx={{
                                        width: "14.5833vw",
                                        height: "2.6042vw",
                                        borderRadius: "0.5208vw",
                                        border: "1px solid #F2D861",
                                        background: "#4A4A4A",
                                        color: "#F2D861",
                                        marginBottom: "0.3125vw",
                                        fontSize: "1.0417vw",
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
            </Box>
        </Box>
    );
};

export default Header;
