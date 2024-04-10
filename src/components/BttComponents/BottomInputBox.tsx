import {
    Box,
    Image,
    Flex,
    Text,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    useDisclosure,
    keyframes,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { GameState, MESSAGES } from "@/skyConstants/bttGameTypes";
import AddIcon from "@/components/BttComponents/assets/add.svg";
import SubIcon from "@/components/BttComponents/assets/sub.svg";
import MessageIcon1 from "./assets/message-dot.svg";
import ConfirmVideo from "@/assets/confirm.wav";

const move = keyframes`
    0% {
        background: #FDDC2D;
    }
    
    100% {
        background: transparent;
    }
`;

const bt = keyframes`
    0% {
        color: #FDDC2D;
    }
    
    100% {
        color: transparent;
    }

`;

const BottomInputBox = ({
    myBalance,
    bidAmount,
    loading,
    myGameState,
    onSubClick,
    onAddClick,
    onConfirm,
    onSetMessage,
    onInputAmountClick,
    onIuputAmount,
    showAnimateConfirm,
}: {
    myBalance?: number;
    bidAmount: string;
    loading: boolean;
    myGameState: GameState;
    onSubClick: () => void;
    onAddClick: () => void;
    onConfirm: () => void;
    onInputAmountClick: () => void;
    onIuputAmount?: (amount: number) => void;
    onSetMessage?: (
        type: "setMessage" | "setEmote",
        emoteIndex?: number,
    ) => void;
    showAnimateConfirm?: number;
}) => {
    const [selectMessageIndex, setSelectMessageIndex] = React.useState(-1);
    const { onOpen, onClose, isOpen } = useDisclosure();

    return (
        <Flex
            sx={{
                height: "65px",
                background: "#787878",
                padding: "0 12px 12px 12px",
                position: "relative",
            }}
            justify={"space-between"}
            align={"center"}
        >
            <Popover
                gutter={38}
                arrowSize={20}
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
            >
                <PopoverTrigger>
                    <Box
                        sx={{
                            flex: 1,
                        }}
                    >
                        <Image
                            tabIndex={0}
                            role="button"
                            src={MessageIcon1}
                            sx={{
                                width: "32px",
                            }}
                        ></Image>
                    </Box>
                </PopoverTrigger>
                <PopoverContent
                    width={"220px"}
                    sx={{
                        height: "75px",
                        border: "none",
                        borderRadius: "10px",
                        background: "#ffffffe6 !important",
                    }}
                >
                    <PopoverBody
                        sx={{
                            color: "#303030",
                            padding: 0,
                            border: "none",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        <Box
                            sx={{
                                overflowY: "auto",
                                height: "100%",
                            }}
                        >
                            {MESSAGES.map((message, index) => {
                                return (
                                    <Flex
                                        onClick={() => {
                                            onSetMessage(
                                                "setMessage",
                                                index + 1,
                                            );
                                            setSelectMessageIndex(index);
                                            onClose();
                                        }}
                                        key={index + 1}
                                        sx={{
                                            paddingLeft: "20px",
                                            fontSize: "12px",
                                            width: "100%",
                                            height: "28px",
                                            color:
                                                selectMessageIndex === index
                                                    ? "#fff"
                                                    : "#303030",
                                            background:
                                                selectMessageIndex === index &&
                                                "#00000059",
                                            fontFamily: "Quantico",
                                        }}
                                        align={"center"}
                                    >
                                        {message}
                                    </Flex>
                                );
                            })}
                        </Box>
                    </PopoverBody>
                    <Box
                        sx={{
                            height: "0",
                            width: "0",
                            borderTop: "10px solid #ffffffe6",
                            borderRight: "10px solid transparent",
                            borderBottom: "10px solid transparent",
                            borderLeft: "10px solid transparent",
                            position: "absolute",
                            left: "20px",
                            bottom: "-20px",
                        }}
                    ></Box>
                </PopoverContent>
            </Popover>
            <Box
                sx={{
                    width: "160px",
                }}
            >
                <Flex
                    sx={{
                        height: "24px",
                        width: "184px",
                        position: "absolute",
                        top: "-15px",
                        left: "50%",
                        background: "#787878",
                        borderRadius: "16px 16px 0 0",
                        padding: "0px 12px",
                        transform: "translateX(-50%)",
                    }}
                    justify={"space-between"}
                >
                    <Image
                        onClick={onSubClick}
                        src={SubIcon}
                        sx={{
                            width: "16px",
                        }}
                    ></Image>
                    <Box
                        onClick={(e) => {
                            onInputAmountClick();
                        }}
                        sx={{
                            flex: 1,
                            textAlign: "center",
                        }}
                    >
                        <Text
                            sx={{
                                color: "#fff",
                                fontSize: "16px",
                            }}
                        >
                            {bidAmount}
                        </Text>
                    </Box>

                    <Image
                        onClick={onAddClick}
                        src={AddIcon}
                        sx={{
                            width: "16px",
                        }}
                    ></Image>
                </Flex>
                <Box sx={{ width: "160px", marginTop: "10px" }}>
                    <Slider
                        key={myBalance}
                        value={Number(bidAmount)}
                        onChange={(e) => {
                            onIuputAmount(e);
                        }}
                        max={myBalance}
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
            </Box>
            <Box
                sx={{
                    flex: 1,
                    fontSize: "14px",
                    fontWeight: "bold",
                    textAlign: "right",
                }}
            >
                {loading ? (
                    <Text
                        sx={{
                            color: "#fff",
                        }}
                    >
                        Confirming
                    </Text>
                ) : (
                    <Text
                        onClick={() => {
                            const audio = new Audio(ConfirmVideo);
                            audio.play();
                            onConfirm();
                        }}
                        key={showAnimateConfirm + ""}
                        sx={{
                            color:
                                myGameState === GameState.WaitingForBid
                                    ? "#FDDC2D"
                                    : "#414141",
                            // width: "114px",
                        }}
                        animation={`${
                            showAnimateConfirm !== 0 ? bt : ""
                        } 0.5s linear alternate`}
                    >
                        {myGameState === GameState.Commited ||
                        myGameState === GameState.Revealed
                            ? "Confirmed"
                            : "Confirm"}
                    </Text>
                )}
            </Box>
        </Flex>
    );
};

export default BottomInputBox;
