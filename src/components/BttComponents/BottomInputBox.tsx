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
} from "@chakra-ui/react";
import React from "react";
import { GameState, MESSAGES } from "@/skyConstants/bttGameTypes";
import AddIcon from "@/components/BttComponents/assets/add.svg";
import SubIcon from "@/components/BttComponents/assets/sub.svg";
import MessageIcon1 from "./assets/message-dot.svg";

const BottomInputBox = ({
    myBalance,
    bidAmount,
    loading,
    myGameState,
    onSubClick,
    onAddClick,
    onConfirm,
    onSetMessage,
    onMessageClick,
    onInputAmountClick,
    onIuputAmount,
}: {
    myBalance?: number;
    bidAmount: string;
    loading: boolean;
    myGameState: GameState;
    onSubClick: () => void;
    onAddClick: () => void;
    onConfirm: () => void;
    onMessageClick: () => void;
    onInputAmountClick: () => void;
    onIuputAmount?: (amount: number) => void;
    onSetMessage?: (
        type: "setMessage" | "setEmote",
        emoteIndex?: number,
    ) => void;
}) => {
    const [selectMessageIndex, setSelectMessageIndex] = React.useState(-1);
    const { onOpen, onClose, isOpen } = useDisclosure();

    return (
        <Flex
            sx={{
                height: "55px",
                background: "#787878",
                padding: "0 12px",
            }}
            justify={"space-between"}
            align={"center"}
        >
            <Box>
                <Flex
                    sx={{
                        height: "20px",
                        width: "160px",
                    }}
                    justify={"space-between"}
                >
                    <Flex
                        sx={{
                            width: "24px",
                        }}
                        align={"center"}
                        justify={"center"}
                        flexDir={"column"}
                        onClick={onSubClick}
                    >
                        <Image
                            src={SubIcon}
                            sx={{
                                width: "16px",
                            }}
                        ></Image>
                    </Flex>
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
                    <Flex
                        sx={{
                            width: "24px",
                        }}
                        align={"center"}
                        justify={"center"}
                        flexDir={"column"}
                        onClick={onAddClick}
                    >
                        <Image
                            src={AddIcon}
                            sx={{
                                width: "16px",
                            }}
                        ></Image>
                    </Flex>
                </Flex>
                <Box sx={{}}>
                    <Slider
                        value={Number(bidAmount)}
                        onChange={(e) => {
                            onIuputAmount(e);
                        }}
                        max={myBalance}
                        min={0}
                    >
                        <SliderTrack
                            bg="#545454"
                            height={"10px"}
                            borderRadius={"10px"}
                            sx={{
                                padding: "0 20px",
                            }}
                        >
                            <SliderFilledTrack bg="#545454" />
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

            <Box>
                {loading ? (
                    <Text
                        sx={{
                            color: "#fff",
                            fontSize: "16px",
                            width: "104px",
                            textAlign: "center",
                        }}
                    >
                        Confirming
                    </Text>
                ) : (
                    <Text
                        onClick={() => {
                            onConfirm();
                        }}
                        sx={{
                            color:
                                myGameState === GameState.WaitingForBid
                                    ? "#FDDC2D"
                                    : "#414141",
                            fontSize: "18px",
                            width: "114px",
                            textAlign: "center",
                            fontWeight: "bold",
                        }}
                    >
                        {myGameState === GameState.Commited ||
                        myGameState === GameState.Revealed
                            ? "Confirmed"
                            : "Confirm"}
                    </Text>
                )}
            </Box>
            <Popover
                gutter={38}
                arrowSize={20}
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
            >
                <PopoverTrigger>
                    <Image
                        tabIndex={0}
                        role="button"
                        src={MessageIcon1}
                        // onClick={onMessageClick}
                        sx={{
                            width: "32px",
                        }}
                    ></Image>
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
                            right: "20px",
                            bottom: "-20px",
                        }}
                    ></Box>
                </PopoverContent>
            </Popover>
        </Flex>
    );
};

export default BottomInputBox;
