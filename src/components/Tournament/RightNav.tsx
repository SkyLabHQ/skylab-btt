import {
    Box,
    Text,
    Image,
    useDisclosure,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
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
import { useEffect } from "react";
import BMileageIcon from "./assets/b-mileage.png";
import usePrivyAccounts from "@/hooks/usePrivyAccount";

const Mileage = ({
    value,
    onNextRound,
}: {
    value: number;
    onNextRound: (value: string) => void;
}) => {
    const navigate = useNavigate();
    const { signer, address } = usePrivyAccounts();
    const { activePilot } = usePilotInfo(address);

    return (
        <Box
            sx={{
                position: "relative",
                height: "4.6875vw",
                display: "flex",
                borderRadius: "1.4583vw",
                justifyContent: "space-between",
                padding: "0.2083vw",
                alignItems: "center",
            }}
        >
            <MyPilot
                sx={{
                    width: "4.6875vw !important",
                    height: "4.6875vw !important",
                }}
                className="pilot-avatar"
                img={activePilot.img}
                showSupport={activePilot.owner !== address}
                onClick={async () => {
                    if (!address) {
                        // show();
                        return;
                    }

                    onNextRound("currentPilot");
                }}
            ></MyPilot>

            <Popover>
                <PopoverTrigger>
                    <Box
                        className="pilot-mileage"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "15.625vw",
                            height: "4.1667vw",
                            padding: "0 2.6042vw 0 4.7667vw",
                            position: "relative",
                            cursor: "pointer",
                            background: "rgba(255, 255, 255, 0.6)",
                            borderRadius: "2.5vw",
                        }}
                    >
                        <Image
                            src={BMileageIcon}
                            sx={{
                                width: "4.6875vw",
                                height: "4.6875vw",
                                position: "absolute",
                                left: "-0.5208vw",
                                top: "50%",
                                transform: "translateY(-50%)",
                            }}
                        ></Image>
                        <Text
                            sx={{
                                color: "#4A4A4A",
                                fontSize: "0.9375vw",
                                fontWeight: "bold",
                                textAlign: "center",
                            }}
                        >
                            Mileage
                        </Text>
                        <Text
                            sx={{
                                color: "#2B2B2B",
                                fontSize: "1.0417vw",
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
                    }}
                >
                    <PopoverBody>
                        <Box
                            sx={{
                                borderBottom: "1px solid #2b2b2b",
                                paddingBottom: "1.0417vw",
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
                                        width: "6.25vw",
                                        display: "flex",
                                        alignItems: "center",
                                        border: "1px solid #000",
                                        textAlign: "center",
                                        fontSize: "0.7292vw",
                                        height: "1.3542vw",
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
                                            height: "0.8333vw",
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
                                    marginTop: "1.8229vw",
                                }}
                            >
                                <Image
                                    src={MileageIcon}
                                    sx={{
                                        width: "3.5417vw",
                                        height: "3.5417vw",
                                    }}
                                ></Image>
                                <Text
                                    sx={{
                                        fontSize: "0.8333vw",
                                        fontStyle: "italic",
                                        width: "9.1667vw",
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
                                paddingTop: "0.7813vw",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "5.2083vw",
                                    height: "1.0417vw",
                                    borderRadius: "2.0833vw",
                                    background: "rgba(74, 74, 74, 0.50)",
                                    textAlign: "center",
                                    lineHeight: "1.0417vw",
                                    fontSize: "0.8333vw",
                                    color: "#ababab",
                                }}
                            >
                                How to Get
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginTop: "0.7813vw",
                                }}
                            >
                                <Text
                                    sx={{
                                        fontSize: "0.8333vw",
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
                                        width: "2.5vw",
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

const RightNav = ({
    showLeaderboard,
    onNextRound,
}: {
    showLeaderboard: boolean;
    onNextRound: (step: number | string) => void;
}) => {
    const { signer, address } = usePrivyAccounts();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
    const { activePilot } = usePilotInfo(address);

    useEffect(() => {
        if (showLeaderboard) {
            onOpen();
        } else {
            onClose();
        }
    }, [showLeaderboard]);

    return (
        <Box
            right="1.1979vw"
            top="1.8229vw"
            pos={"absolute"}
            sx={{
                width: "22.3958vw",
            }}
        >
            <Mileage value={activePilot.xp} onNextRound={onNextRound}></Mileage>
            <Box className="leaderboard">
                <Box
                    sx={{
                        position: "relative",
                        marginTop: "1.8519vh",
                        height: "75vh",
                    }}
                >
                    <GameLeaderboard show={isOpen}></GameLeaderboard>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "0.7292vw",
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                        }}
                    >
                        <Image
                            src={DownArrow}
                            sx={{
                                position: "absolute",
                                left: "50%",
                                top: "-0.7813vw",
                                transform: isOpen
                                    ? "translateX(-50%)"
                                    : "translateX(-50%) rotate(180deg)",
                                transition: "all 0.3s",
                                transformOrigin: "center center",
                                width: "2.0833vw",
                                zIndex: 9,
                            }}
                        ></Image>
                        <YellowButton
                            sx={{
                                width: "11.0417vw",
                                height: "2.7083vw",
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
                                    width: "1.8229vw",
                                    marginRight: "0.1042vw",
                                }}
                            ></Image>
                            <Text>Leaderboard</Text>
                        </YellowButton>
                    </Box>

                    <YellowButton
                        className="rules"
                        sx={{
                            width: "11.0417vw",
                            height: "2.7083vw",
                        }}
                        onClick={() => {
                            navigate("/btt/rules");
                        }}
                    >
                        <Image
                            src={RulesIcon}
                            sx={{
                                width: "1.8229vw",
                                marginRight: "0.1042vw",
                            }}
                        ></Image>
                        <Text>Detailed Rules</Text>
                    </YellowButton>
                </Box>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    position: "relative",
                }}
            >
                <ImgButton
                    sx={{
                        width: "14.5833vw",
                        left: "-16.8333vw",
                        position: "absolute",
                        bottom: "0",
                        height: "5.7292vw",
                    }}
                >
                    <Image
                        onClick={() => {
                            window.open("/?part=primitives", "_blank");
                        }}
                        src={ProMerTab}
                    ></Image>
                </ImgButton>
            </Box>
        </Box>
    );
};

export default RightNav;
