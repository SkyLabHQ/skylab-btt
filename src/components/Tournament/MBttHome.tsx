import {
    Box,
    Text,
    Image,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    Flex,
    useDisclosure,
} from "@chakra-ui/react";
import MileageIcon from "./assets/mileage-icon.svg";
import { useNavigate } from "react-router-dom";
import { usePilotInfo } from "@/hooks/usePilotInfo";
import MyPilot from "./MyPilot";
import MileageArrow from "./assets/mileage-arrow.svg";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import TopMenu from "./TopMenu";
import Tutorialcon from "./Tutorialcon";
import GrayPlanet from "@/components/Tournament/assets/gray-planet.png";
import BttTitle from "@/components/Tournament/assets/btt-title.png";
import EnterBt from "@/components/Tournament/assets/enter-bt.png";
import GrayPlanetBg from "./assets/gray-planet-bg.svg";
import { motion, useAnimation } from "framer-motion";
import { YellowButton } from "../Button/Index";
import LeaderboardIcon from "./assets/leaderboard-icon.svg";
import RulesIcon from "./assets/rules-icon.svg";
import MGameLeaderboard from "./MGameLeaderboard";
import DownArrow from "./assets/down-arrow.svg";
import useSkyToast from "@/hooks/useSkyToast";

const MileagePopover = ({ value }: { value: any }) => {
    const navigate = useNavigate();

    return (
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
                        {value}
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
                                Mileage is an attribute tied to pilot. It helps
                                you earn Cosmetics and grow Baby Mercs into
                                Mercs.
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
                                    navigate(`/`);
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
    );
};

const Mileage = ({
    value,
    onNextRound,
}: {
    value: number;
    onNextRound: (value: string) => void;
}) => {
    const toast = useSkyToast();
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
                                    if (window.ethereum) {
                                        show();
                                    } else {
                                        toast(
                                            "Please open this page in wallet browser",
                                        );
                                    }
                                    return;
                                }

                                onNextRound("currentPilot");
                            }}
                        ></MyPilot>
                    );
                }}
            </ConnectKitButton.Custom>

            <MileagePopover value={address ? value : "?"}></MileagePopover>
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
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
    const { address } = useAccount();
    const { activePilot } = usePilotInfo(address);
    const imgAnimation = useAnimation();

    const handleToBtt = async () => {
        navigate(`/`);
    };

    return (
        <Box
            sx={{
                height: "100%",
                padding: "20px 10px",
            }}
        >
            <Mileage value={activePilot.xp} onNextRound={onNextRound}></Mileage>
            <Flex
                sx={{
                    marginTop: "24px",
                }}
            >
                <TopMenu></TopMenu>
                <Box
                    sx={{
                        position: "relative",
                        marginLeft: "10px",
                    }}
                >
                    <Image
                        src={DownArrow}
                        sx={{
                            position: "absolute",
                            left: "50%",
                            bottom: "-8px",
                            transform: isOpen
                                ? "translateX(-50%) "
                                : "translateX(-50%) rotate(180deg)",
                            transition: "all 0.3s",
                            transformOrigin: "center center",
                            width: "24px",
                            zIndex: 9,
                        }}
                    ></Image>
                    <YellowButton
                        className="leaderboard"
                        sx={{
                            // width: "150px",
                            height: "40px",
                            borderRadius: "8px !important",
                        }}
                        onClick={() => {
                            if (isOpen) {
                                onClose();
                            } else {
                                onOpen();
                            }
                        }}
                    >
                        <Image
                            src={LeaderboardIcon}
                            sx={{
                                width: "20px",
                                marginRight: "5px",
                            }}
                        ></Image>
                        <Text
                            sx={{
                                fontSize: "14px",
                            }}
                        >
                            Leaderboard
                        </Text>
                    </YellowButton>
                </Box>

                <YellowButton
                    className="rules"
                    sx={{
                        // width: "150px",
                        height: "40px",
                        marginLeft: "10px",
                        borderRadius: "8px !important",
                    }}
                    onClick={() => {
                        navigate("/btt/rules");
                    }}
                >
                    <Image
                        src={RulesIcon}
                        sx={{
                            width: "20px",
                            marginRight: "5px",
                        }}
                    ></Image>
                    <Text
                        sx={{
                            fontSize: "14px",
                        }}
                    >
                        Detailed Rules
                    </Text>
                </YellowButton>
            </Flex>
            <Box
                sx={{
                    position: "relative",
                    marginTop: "50px",
                }}
            >
                <motion.div
                    style={{
                        background: `url(${GrayPlanetBg}) no-repeat`,
                        width: "335px",
                        height: "335px",
                        backgroundSize: "100% 100%",
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                    }}
                    animate={{
                        rotate: "360deg",
                    }}
                    transition={{
                        duration: 50,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    <motion.img
                        src={GrayPlanet}
                        style={{
                            width: "90%",
                            background: "transparent",
                            scale: 1,
                        }}
                        variants={{
                            rotation: {
                                rotate: "360deg",
                                scale: 1.1,
                                transition: {
                                    scale: {
                                        duration: 1,
                                        ease: "linear",
                                        repeatType: "reverse",
                                        repeat: Infinity,
                                    },
                                    rotate: {
                                        duration: 50,
                                        repeat: Infinity,
                                        ease: "linear",
                                        repeatType: "loop",
                                    },
                                },
                            },
                            oneScale: {
                                scale: 1,
                                transition: {
                                    scale: {
                                        duration: 1,
                                        ease: "linear",
                                    },
                                },
                            },
                            twoScale: {
                                scale: 1.1,
                                transition: {
                                    scale: {
                                        duration: 0.1,
                                        ease: "linear",
                                    },
                                },
                            },
                        }}
                        animate={imgAnimation}
                    ></motion.img>
                </motion.div>
                <Box
                    sx={{
                        width: "95%",
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-49%, -50%)",
                    }}
                >
                    <Image src={BttTitle}></Image>
                </Box>
                <Flex
                    className="bid-tac-toe"
                    sx={{
                        justifyContent: "center",
                        position: "absolute",
                        left: "50%",
                        top: "60%",
                        transform: "translate(-49%, -50%)",
                    }}
                    onClick={() => {
                        handleToBtt();
                    }}
                >
                    <Image
                        src={EnterBt}
                        sx={{
                            width: "200px",
                            cursor: "pointer",
                        }}
                    ></Image>
                </Flex>
            </Box>
            <Box
                sx={{
                    position: "absolute",
                    top: "160px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100%",
                    zIndex: 9999999999,
                    padding: "0 12px",
                }}
            >
                <MGameLeaderboard show={isOpen}></MGameLeaderboard>
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
