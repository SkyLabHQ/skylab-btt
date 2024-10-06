import {
    Text,
    Img,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Flex,
    Box,
    SliderThumb,
    Slider,
    SliderFilledTrack,
    SliderTrack,
    Image,
} from "@chakra-ui/react";

import useSkyToast from "@/hooks/useSkyToast";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";
import { LButton } from "../Button/Index";
import LineCircleWrap from "../Tower/LineCircleWrap";
import { useState } from "react";
import SubIcon from "./assets/sub.svg";
import AddIcon from "./assets/add.svg";

const LeaderRateModal = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    const toast = useSkyToast();

    const [value, setValue] = useState("0");
    const handleAdd = () => {
        if (Number(value) >= 10) {
            return;
        }
        setValue(String(Number(value) + 1));
    };

    const handleSub = () => {
        if (Number(value) <= 0) {
            return;
        }
        setValue(String(Number(value) - 1));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered autoFocus={false}>
            <ModalOverlay backdropFilter={"blur(35px)"} />
            <ModalContent
                bg="rgba(0, 0, 0, 0.5)"
                border="1px solid #FDDC2D"
                borderRadius="8px"
                maxW={isPc ? "800px" : "300px"}
            >
                <ModalBody pb="20px" pt={"20px"}>
                    <Flex
                        sx={{
                            width: "100%",
                            height: "100%",
                        }}
                        flexDir={"column"}
                        align={"center"}
                    >
                        <Text
                            fontSize={isPc ? "24px" : "20px"}
                            fontWeight="700"
                            fontFamily={"Orbitron"}
                            textAlign={"center"}
                            sx={{
                                color: "#FDDC2D",
                            }}
                        >
                            Set reward take rate
                        </Text>
                        <LineCircleWrap
                            sx={{
                                marginTop: "20px",
                            }}
                        >
                            <Box
                                sx={{
                                    textAlign: "center",
                                    fontSize: "20px",
                                    fontStyle: "normal",
                                    fontWeight: 700,
                                    lineHeight: 1,
                                }}
                            >
                                <Text>TEAM</Text>
                                <Text>LEADER</Text>
                            </Box>
                            <Flex
                                align={"center"}
                                gap={"8px"}
                                sx={{
                                    marginTop: "8px",
                                }}
                            >
                                <Image
                                    src={SubIcon}
                                    sx={{
                                        width: "20px",
                                        cursor: "pointer",
                                    }}
                                    onClick={handleSub}
                                ></Image>
                                <Box
                                    sx={{
                                        border: "1px solid #999",
                                        background: "#000",
                                        borderRadius: 0,
                                        width: "60px",
                                        height: "30px",
                                        textAlign: "center",
                                        lineHeight: "30px",
                                    }}
                                >
                                    <Text>
                                        {value}

                                        <span
                                            style={{
                                                fontSize: "12px",
                                            }}
                                        >
                                            %
                                        </span>
                                    </Text>
                                </Box>
                                <Image
                                    src={AddIcon}
                                    sx={{
                                        width: "20px",
                                        cursor: "pointer",
                                    }}
                                    onClick={handleAdd}
                                ></Image>
                            </Flex>
                            <Box
                                sx={{
                                    marginTop: "2px",
                                }}
                            >
                                <Slider
                                    value={Number(value)}
                                    onChange={(e) => {
                                        console.log(e);
                                        setValue(String(e));
                                    }}
                                    max={10}
                                    min={0}
                                    sx={{
                                        width: "100px",
                                    }}
                                >
                                    <SliderTrack
                                        bg="#545454"
                                        height={"10px"}
                                        sx={{
                                            padding: "0 20px",
                                        }}
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
                                                transform:
                                                    "translateY(-50%) !important",
                                            },
                                        }}
                                    ></SliderThumb>
                                </Slider>
                            </Box>
                        </LineCircleWrap>

                        <Box
                            sx={{
                                textAlign: "center",
                                marginTop: "20px",
                            }}
                        >
                            <Text
                                sx={{
                                    fontSize: "16px",
                                }}
                            >
                                *Team leader's take rate
                            </Text>
                            <Text
                                sx={{
                                    fontSize: "20px",
                                }}
                            >
                                (0% - 10%)
                            </Text>
                        </Box>
                        <Flex
                            align={"center"}
                            gap={"20px"}
                            sx={{
                                marginTop: "24px",
                            }}
                        >
                            <LButton
                                sx={{
                                    width: "150px",
                                    height: "62px",
                                    marginTop: "10px",
                                }}
                            >
                                <Text
                                    sx={{
                                        color: "#fff",
                                        fontSize: "18px",
                                        fontWeight: "700",
                                    }}
                                >
                                    Join
                                </Text>
                            </LButton>
                            <LButton
                                sx={{
                                    width: "150px",
                                    height: "62px",
                                    marginTop: "10px",
                                }}
                            >
                                <Text
                                    sx={{
                                        color: "#fff",
                                        fontSize: "18px",
                                        fontWeight: "700",
                                    }}
                                >
                                    Confirm
                                </Text>
                            </LButton>
                        </Flex>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default LeaderRateModal;
