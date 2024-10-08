import {
    Box,
    Image,
    Flex,
    Text,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    keyframes,
} from "@chakra-ui/react";
import { useMemo } from "react";
import AddIcon from "@/components/BttComponents/assets/add.svg";
import SubIcon from "@/components/BttComponents/assets/sub.svg";
import ConfirmVideo from "@/assets/confirm.wav";

const move = keyframes`
    0% {
        background: #FDDC2D;
    }
    
    100% {
        background: #545454;
    }
`;

const PvpBottomInputBox = ({
    myBalance,
    bidAmount,
    loading,
    myIsBid,
    onSubClick,
    onAddClick,
    onConfirm,
    onIuputAmount,
    showAnimateConfirm,
}: {
    myBalance?: number;
    bidAmount: string;
    loading: boolean;
    myIsBid: boolean;
    onSubClick: () => void;
    onAddClick: () => void;
    onConfirm: () => void;
    onIuputAmount?: (amount: number) => void;
    showAnimateConfirm?: number;
}) => {
    const [commitButtonText, status] = useMemo(() => {
        if (loading) {
            return ["Committing", 0];
        }

        return myIsBid ? ["Committed", 0] : ["Commit", 1];
    }, [loading, myIsBid]);

    return (
        <Flex
            sx={{
                height: "65px",
                background: "#787878",
                padding: "0 12px 12px 12px",
                position: "relative",
            }}
            justify={"space-between"}
            // align={"center"}
        >
            <Box
                sx={{
                    flex: 1,
                }}
            >
                <Flex
                    sx={{
                        height: "30px",
                        width: "184px",
                        position: "absolute",
                        top: "-30px",
                        left: "0%",
                        background: "#787878",
                        borderRadius: "24px 24px 0 0",
                        padding: "0px 12px",
                        // transform: "translateX(-50%)",
                    }}
                    justify={"space-between"}
                >
                    <Image
                        onClick={onSubClick}
                        src={SubIcon}
                        sx={{
                            width: "16px",
                            cursor: "pointer",
                        }}
                    ></Image>
                    <Box
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
                            cursor: "pointer",
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

            <Flex
                sx={{
                    flex: 1,
                    paddingTop: "16px",
                }}
                justify={"flex-end"}
            >
                <Flex
                    key={showAnimateConfirm + ""}
                    animation={`${
                        showAnimateConfirm !== 0 ? move : ""
                    } 0.5s linear alternate`}
                    onClick={() => {
                        if (!myIsBid) {
                            const audio = new Audio(ConfirmVideo);
                            audio.play();
                            onConfirm();
                        }
                    }}
                    sx={{
                        width: "78px",
                        height: "28px",
                        background: status === 0 ? "transparent" : "#FDDC2D",
                        borderRadius: "16px",
                        fontSize: "12px",
                        color: status === 0 ? "#414141" : "#1b1b1b",
                        fontWeight: "bold",
                        animationIterationCount: "2",
                    }}
                    align={"center"}
                    justify={"center"}
                >
                    {commitButtonText}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default PvpBottomInputBox;
