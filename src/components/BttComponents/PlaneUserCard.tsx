import { useMemo } from "react";
import {
    Box,
    Image,
    Text,
    useClipboard,
    NumberInput,
    NumberInputField,
    keyframes,
    Flex,
    SliderThumb,
    SliderFilledTrack,
    SliderTrack,
    Slider,
} from "@chakra-ui/react";
import GoldIcon from "./assets/gold-icon.svg";
import AddIcon from "./assets/add-icon.svg";
import SubIcon from "./assets/sub-icon.svg";
import ConfirmVideo from "@/assets/confirm.wav";
import { UserMarkType } from "@/skyConstants/bttGameTypes";
import useBidIcon from "@/hooks/useBidIcon";
import { TournamentGameInfo } from "@/pages/TacToe";
import { aviationImg } from "@/utils/aviationImg";

const move = keyframes`
    0% {
        background: #fddc2d;
        border: 3px solid #fddc2d;
       
    }
    
    100% {
        background: rgba(255, 255, 255, 0.40);
        border: 3px solid rgba(255, 255, 255, 0.40);

    }
`;

interface UserCardProps {
    userGameInfo: TournamentGameInfo;
    showAnimateConfirm?: number;
    markIcon: UserMarkType;
    bidAmount?: number;
    showAdvantageTip?: boolean;
    planeUrl?: string;
    onConfirm?: () => void;
    onInputChange?: (value: number) => void;
}

export const MyInputBid = ({
    myIsBid,
    balance,
    bidAmount,
    onInputChange,
    onConfirm,
    showAnimateConfirm,
}: {
    myIsBid: boolean;
    balance: number;
    bidAmount: number;
    showAnimateConfirm?: number;
    onInputChange?: (value: number) => void;
    onConfirm: () => void;
}) => {
    const [commitButtonText, status] = useMemo(() => {
        return myIsBid ? ["Committed", 0] : ["Commit", 1];
    }, [myIsBid]);

    const handleSumbit = async () => {
        const audio = new Audio(ConfirmVideo);
        audio.play();
        onConfirm();
    };
    return (
        <Box
            sx={{
                width: "240px",
            }}
        >
            <Box
                sx={{
                    background: "#787878",
                    borderRadius: "20px",
                    padding: "12px 25px 12px 25px",
                    position: "relative",
                    height: "105px",
                }}
            >
                <Flex
                    sx={{
                        position: "relative",
                    }}
                    align={"center"}
                >
                    <Image
                        src={SubIcon}
                        sx={{
                            cursor: "pointer",
                            width: "24px",
                        }}
                        onClick={() => {
                            if (bidAmount - 1 < 0) return;

                            onInputChange(bidAmount - 1);
                        }}
                    ></Image>
                    <Box
                        key={showAnimateConfirm + ""}
                        sx={{
                            height: "44px",
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            animationIterationCount: "2",
                        }}
                        animation={`${
                            showAnimateConfirm !== 0 ? move : ""
                        } 0.5s linear alternate`}
                    >
                        <NumberInput
                            isDisabled={myIsBid}
                            variant="unstyled"
                            max={balance}
                            min={0}
                            value={bidAmount}
                            sx={{
                                "& input": {
                                    color: "#fff",
                                    lineHeight: "1",
                                    padding: 0,
                                    fontSize: "32px",
                                    width: "100%",
                                    textAlign: "center",
                                    background: "transparent",
                                },
                            }}
                            onChange={(e) => {
                                if (Number(e) > balance) {
                                    onInputChange(balance);
                                    return;
                                }
                                onInputChange(Number(e));
                            }}
                        >
                            <NumberInputField />
                        </NumberInput>
                    </Box>
                    <Image
                        src={AddIcon}
                        onClick={() => {
                            if (bidAmount + 1 > balance) return;

                            onInputChange(bidAmount + 1);
                        }}
                        sx={{
                            cursor: "pointer",
                            width: "24px",
                        }}
                    ></Image>
                </Flex>
                <Slider
                    key={balance}
                    value={Number(bidAmount)}
                    onChange={(e) => {
                        onInputChange(e);
                    }}
                    max={balance}
                    min={0}
                >
                    <SliderTrack
                        key={showAnimateConfirm + ""}
                        bg="#545454"
                        height={"10px"}
                        borderRadius={"10px"}
                        sx={{
                            padding: "0 20px",
                            animationIterationCount: "2",
                        }}
                        animation={`${
                            showAnimateConfirm !== 0 ? move : ""
                        } 0.5s linear alternate`}
                    >
                        <SliderFilledTrack bg="transparent" />
                    </SliderTrack>
                    <SliderThumb
                        sx={{
                            width: "8px",
                            height: "26px !important",
                            borderRadius: "100px",
                            border: "none",
                            background:
                                "linear-gradient(180deg, rgba(253, 220, 45, 0) 0%, rgba(253, 220, 45, 1) 49.24%, rgba(253, 220, 45, 0) 100%)",
                            outline: "none",
                            boxShadow: "none !important",
                            "&:focus-visible": {
                                boxShadow: "none",
                            },
                            "&:active": {
                                transform: "translateY(-50%) !important",
                            },
                        }}
                    ></SliderThumb>
                </Slider>
            </Box>
            <Flex flexDir={"column"} align={"center"}>
                <Flex
                    onClick={handleSumbit}
                    sx={{
                        marginTop: "10px",
                        fontSize: "16px",
                        height: "44px",
                        width: "120px",
                        background: status === 0 ? "transparent" : "#FDDC2D",
                        borderRadius: "16px",
                        color: status === 0 ? "#414141" : "#1b1b1b",
                        fontWeight: "bold",
                        animationIterationCount: "2",
                        cursor: status === 0 ? "not-allowed" : "pointer",
                    }}
                    align={"center"}
                    justify={"center"}
                >
                    {commitButtonText}
                </Flex>
            </Flex>
        </Box>
    );
};

export const MyUserCard = ({
    userGameInfo,
    markIcon,
    bidAmount,
    onConfirm,
    onInputChange,
    showAnimateConfirm,
}: UserCardProps) => {
    const { onCopy } = useClipboard(userGameInfo.address);
    const MarkIcon = useBidIcon();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    width: "144px",
                }}
            >
                <Image
                    sx={{
                        width: "100%",
                    }}
                    src={aviationImg(userGameInfo.level)}
                ></Image>
                <Text
                    sx={{
                        position: "absolute",
                        bottom: "0px",
                        fontFamily: "Orbitron",
                        fontSize: "24px",
                    }}
                >
                    Level {userGameInfo.level}
                </Text>
            </Box>
            <Flex
                align={"center"}
                sx={{
                    marginTop: "20px",
                }}
            >
                <Image
                    sx={{
                        width: "52px",
                        height: "52px",
                        flexShrink: 0,
                        borderRadius: "50%",
                        border: "1px solid #FFF",
                        marginRight: "10px",
                    }}
                    src={userGameInfo.photo}
                ></Image>
                <Text>@{userGameInfo.username}</Text>
            </Flex>
            <Flex align={"center"}>
                <Image src={GoldIcon}></Image>
                <Text
                    sx={{
                        fontFamily: "Quantico",
                        fontSize: "40px",
                        marginRight: "10px",
                    }}
                >
                    {userGameInfo.balance}
                </Text>
                <Image
                    width={"24px"}
                    height={"24px"}
                    src={
                        markIcon === UserMarkType.Circle
                            ? MarkIcon.Circle
                            : markIcon === UserMarkType.BotX
                            ? MarkIcon.BotX
                            : MarkIcon.Cross
                    }
                ></Image>
            </Flex>
            <MyInputBid
                myIsBid={userGameInfo.isBid}
                balance={userGameInfo.balance}
                bidAmount={bidAmount}
                onInputChange={onInputChange}
                onConfirm={onConfirm}
                showAnimateConfirm={showAnimateConfirm}
            ></MyInputBid>
        </Box>
    );
};

export const OpUserCard = ({ markIcon, userGameInfo }: UserCardProps) => {
    const MarkIcon = useBidIcon();
    const { onCopy } = useClipboard(userGameInfo.address ?? "");

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                width: "240px",
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    width: "144px",
                }}
            >
                <Image
                    sx={{
                        width: "100%",
                        transform: "scaleX(-1)",
                    }}
                    src={aviationImg(userGameInfo.level)}
                ></Image>
                <Text
                    sx={{
                        position: "absolute",
                        bottom: "0px",
                        fontFamily: "Orbitron",
                        fontSize: "24px",
                        right: "0",
                    }}
                >
                    Level {userGameInfo.level}
                </Text>
            </Box>
            <Flex
                align={"center"}
                sx={{
                    marginTop: "20px",
                }}
            >
                <Text>@{userGameInfo.username}</Text>
                <Image
                    sx={{
                        width: "52px",
                        height: "52px",
                        flexShrink: 0,
                        borderRadius: "50%",
                        border: "1px solid #FFF",
                        marginLeft: "10px",
                    }}
                    src={userGameInfo.photo}
                ></Image>
            </Flex>
            <Flex align={"center"}>
                <Image
                    width={"24px"}
                    height={"24px"}
                    src={
                        markIcon === UserMarkType.Circle
                            ? MarkIcon.Circle
                            : markIcon === UserMarkType.BotX
                            ? MarkIcon.BotX
                            : MarkIcon.Cross
                    }
                ></Image>
                <Image
                    src={GoldIcon}
                    sx={{
                        marginLeft: "10px",
                    }}
                ></Image>
                <Text
                    sx={{
                        fontFamily: "Quantico",
                        fontSize: "40px",
                    }}
                >
                    {userGameInfo.balance}
                </Text>
            </Flex>
        </Box>
    );
};
