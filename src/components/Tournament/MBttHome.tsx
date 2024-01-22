import {
    Box,
    Text,
    Image,
    useDisclosure,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    SimpleGrid,
    MenuItem,
    MenuButton,
    MenuList,
    Menu,
    Button,
} from "@chakra-ui/react";
import ProMerTab from "@/components/Tournament/assets/proMerTab.png";
import MileageIcon from "./assets/mileage-icon.svg";
import RulesIcon from "./assets/rules-icon.svg";
import DownArrow from "./assets/down-arrow.svg";
import LeaderboardIcon from "./assets/leaderboard-icon.svg";
import { useNavigate } from "react-router-dom";
import { ImgButton, YellowButton } from "../Button/Index";
import { usePilotInfo } from "@/hooks/usePilotInfo";
import GameLeaderboard from "./GameLeaderboard";
import MyPilot from "./MyPilot";
import MileageArrow from "./assets/mileage-arrow.svg";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { useEffect } from "react";
import MenuIcon from "./assets/menu.svg";
import { menuList, menuList2 } from "./MissionRound";
import TopMenu from "./TopMenu";
import Tutorialcon from "./Tutorialcon";

const Mileage = ({
    value,
    onNextRound,
}: {
    value: number;
    onNextRound: (value: string) => void;
}) => {
    const navigate = useNavigate();
    const { address } = useAccount();
    const { activePilot } = usePilotInfo(address);

    return (
        <Box
            sx={{
                position: "relative",
                height: "66px",
                background: "rgba(177, 177, 177, 0.50)",
                display: "flex",
                borderRadius: "20px",
                justifyContent: "space-between",
                padding: "4px",
            }}
        >
            <ConnectKitButton.Custom>
                {({ show }) => {
                    return (
                        <MyPilot
                            sx={{
                                width: "58px !important",
                                height: "58px !important",
                            }}
                            className="pilot-avatar"
                            img={activePilot.img}
                            showSupport={activePilot.owner !== address}
                            onClick={async () => {
                                if (!address) {
                                    show();
                                    return;
                                }

                                onNextRound("currentPilot");
                            }}
                        ></MyPilot>
                    );
                }}
            </ConnectKitButton.Custom>

            <Popover>
                <PopoverTrigger>
                    <Box
                        className="pilot-mileage"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "220px",
                            padding: "0 2.6042vw 0 4.1667vw",
                            position: "relative",
                            cursor: "pointer",
                            height: "25px",
                            borderRadius: "48px",
                            background:
                                "linear-gradient(90deg, rgba(177, 177, 177, 0.80) 18.37%, rgba(255, 255, 255, 0.47) 58.15%, rgba(255, 255, 255, 0.00) 101.72%)",
                        }}
                    >
                        <Image
                            src={MileageIcon}
                            sx={{
                                width: "25px",
                                height: "25px",
                                position: "absolute",
                                left: "-10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                            }}
                        ></Image>
                        <Text
                            sx={{
                                color: "#4A4A4A",
                                fontSize: "12px",
                                fontWeight: 500,
                                marginLeft: "25px",
                            }}
                        >
                            Mileage
                        </Text>
                        <Text
                            sx={{
                                color: "#2B2B2B",
                                fontSize: "12px",
                                fontWeight: 500,
                            }}
                        >
                            {address ? value : "?"}
                        </Text>
                    </Box>
                </PopoverTrigger>
                <PopoverContent
                    sx={{
                        background: "rgba(142, 180, 189, 0.95)",
                        padding: "0.7292vw",
                        border: "none !important",
                        fontFamily: "Quantico",
                        boxShadow: "none !important",
                        "&:focus": {
                            outline: "none !important",
                        },
                        width: "240px",
                    }}
                >
                    <PopoverBody>
                        <Box
                            sx={{
                                borderBottom: "1px solid #2b2b2b",
                                paddingBottom: "20px",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text>Mileage</Text>
                                <Box
                                    sx={{
                                        width: "120px",
                                        display: "flex",
                                        alignItems: "center",
                                        border: "1px solid #000",
                                        textAlign: "center",
                                        fontSize: "14px",
                                        height: "20px",
                                    }}
                                >
                                    <Text
                                        sx={{
                                            flex: 1,
                                        }}
                                    >
                                        Holding
                                    </Text>
                                    <Box
                                        sx={{
                                            height: "16px",
                                            width: "1px",
                                            background: "#000",
                                        }}
                                    ></Box>
                                    <Text
                                        sx={{
                                            flex: 1,
                                        }}
                                    >
                                        134
                                    </Text>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginTop: "24px",
                                }}
                            >
                                <Image
                                    src={MileageIcon}
                                    sx={{
                                        width: "48px",
                                        height: "48px",
                                    }}
                                ></Image>
                                <Text
                                    sx={{
                                        fontSize: "12px",
                                        fontStyle: "italic",
                                        width: "146px",
                                        color: "#4a4a4a",
                                    }}
                                >
                                    Mileage is an attribute tied to pilot. It
                                    helps you earn Cosmetics and grow Baby Mercs
                                    into Mercs.
                                </Text>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                paddingTop: "12px",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "80px",
                                    height: "16px",
                                    borderRadius: "30px",
                                    background: "rgba(74, 74, 74, 0.50)",
                                    textAlign: "center",
                                    lineHeight: "16px",
                                    fontSize: "12px",
                                    color: "#ababab",
                                }}
                            >
                                How to Get
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginTop: "8px",
                                }}
                            >
                                <Text
                                    sx={{
                                        fontSize: "12px",
                                        color: "#2b2b2b",
                                    }}
                                >
                                    Play Games
                                </Text>
                                <Image
                                    onClick={() => {
                                        navigate(`/btt`);
                                    }}
                                    src={MileageArrow}
                                    sx={{
                                        width: "24px",
                                        cursor: "pointer",
                                    }}
                                ></Image>
                            </Box>
                        </Box>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Box>
    );
};

const MBttHome = ({
    onNextRound,
    onShowLeaderboard,
}: {
    onNextRound: (value: string) => void;
    onShowLeaderboard: () => void;
}) => {
    const { address } = useAccount();
    const { activePilot } = usePilotInfo(address);
    return (
        <Box
            sx={{
                height: "100%",
                padding: "20px 10px",
            }}
        >
            <Mileage value={activePilot.xp} onNextRound={onNextRound}></Mileage>
            <Box
                sx={{
                    marginTop: "24px",
                }}
            >
                <TopMenu></TopMenu>
            </Box>
            <Box
                sx={{
                    position: "fixed",
                    zIndex: 9999999,
                    left: "20px",
                    bottom: "20px",
                }}
            >
                <Tutorialcon
                    onShowLeaderboard={onShowLeaderboard}
                ></Tutorialcon>
            </Box>
        </Box>
    );
};

export default MBttHome;
