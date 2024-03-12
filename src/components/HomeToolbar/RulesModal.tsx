import {
    Box,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Text,
    Image,
} from "@chakra-ui/react";
import React from "react";

import ArrowIcon from "./assets/arrow.png";
import GrayArrowIcon from "./assets/gray-arrow.png";

import Rule1Img from "./assets/rule1.png";
import Rule2Img from "./assets/rule2.png";
import Rule3Img from "./assets/rule3.png";
import Rule4Img from "./assets/rule4.png";

import CloseIcon from "./assets/close.png";

const Rule1 = () => {
    return (
        <Flex
            align={"center"}
            sx={{
                padding: "54px 0 30px",
            }}
        >
            <Image src={Rule1Img}></Image>
        </Flex>
    );
};

const Rule2 = () => {
    return (
        <Flex
            align={"center"}
            sx={{
                padding: "54px 0 30px",
            }}
        >
            <Image src={Rule2Img}></Image>
        </Flex>
    );
};
const Rule3 = () => {
    return (
        <Flex
            align={"center"}
            sx={{
                padding: "54px 0 30px",
            }}
        >
            <Image src={Rule3Img}></Image>
        </Flex>
    );
};
const Rule4 = () => {
    return (
        <Flex
            align={"center"}
            sx={{
                padding: "54px 0 30px",
            }}
        >
            <Image src={Rule4Img}></Image>
        </Flex>
    );
};

const length = 4;
const Indicator = ({
    currentIndex,
    onIndexChange,
}: {
    currentIndex: number;
    onIndexChange: (index: number) => void;
}) => {
    return (
        <Box
            sx={{
                position: "absolute",
                bottom: "-120px",
                left: "50%",
                transform: "translate(-50%, 0)",
                width: "100%",
            }}
        >
            <Flex align={"center"} justify={"center"}>
                <Image
                    src={currentIndex === 0 ? GrayArrowIcon : ArrowIcon}
                    sx={{
                        width: "16px",
                        transform: currentIndex !== 0 && "rotate(180deg)",
                    }}
                    onClick={() => {
                        if (currentIndex > 0) {
                            onIndexChange(currentIndex - 1);
                        }
                    }}
                ></Image>

                {new Array(length).fill(0).map((_, index) => {
                    return (
                        <Flex
                            key={index}
                            onClick={() => onIndexChange(index)}
                            sx={{
                                width: "24px",
                                height: "24px",
                                borderRadius: "50%",
                                margin: "0 12px",
                                border: `1px solid ${
                                    currentIndex === index
                                        ? "#f2d861"
                                        : "transparent"
                                }`,
                                padding: "2px",
                            }}
                            align={"center"}
                            justify={"center"}
                        >
                            <Box
                                sx={{
                                    background:
                                        currentIndex === index
                                            ? "#f2d861"
                                            : "white",
                                    height: "12px",
                                    width: "12px",
                                    borderRadius: "50%",
                                }}
                            ></Box>
                        </Flex>
                    );
                })}

                <Image
                    src={
                        currentIndex === length - 1 ? GrayArrowIcon : ArrowIcon
                    }
                    sx={{
                        width: "16px",
                        transform:
                            currentIndex === length - 1 && "rotate(180deg)",
                    }}
                    onClick={() => {
                        if (currentIndex < length - 1) {
                            onIndexChange(currentIndex + 1);
                        }
                    }}
                ></Image>
            </Flex>
            <Box
                sx={{
                    height: "62px",
                    marginTop: "16px",
                }}
            >
                {(currentIndex === 0 || currentIndex === 3) && (
                    <Text>
                        *Disclaimer: 99 eth pot is for{" "}
                        <span
                            style={{
                                color: "#F2D861",
                            }}
                        >
                            demonstration purpose only
                        </span>{" "}
                        . The real pot size is displayed on the main page and
                        changes based on market{" "}
                        <span
                            style={{
                                color: "#F2D861",
                            }}
                        >
                            demands of paper and paper planes
                        </span>{" "}
                        .
                    </Text>
                )}
            </Box>
        </Box>
    );
};

const RulesModal = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const handleChangeIndex = (index: number) => {
        setCurrentIndex(index);
    };
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            closeOnOverlayClick={false}
        >
            <ModalOverlay
                sx={{
                    backdropFilter: "blur(13.591408729553223px)",
                    background: "rgba(0, 0, 0, 0.65)",
                }}
            />
            <ModalContent
                containerProps={{
                    sx: {
                        "&:focus-visible": {
                            outline: "none",
                        },
                    },
                }}
                sx={{
                    backdropFilter: "blur(33.97852325439453px)",
                    background: "rgba(255, 255, 255, 0.15)",
                    border: "1px solid #f2d861",
                    borderRadius: "24px",
                    width: "800px",
                    maxWidth: "800px",
                }}
            >
                <ModalBody sx={{ width: "800px" }}>
                    {currentIndex === 0 && <Rule1></Rule1>}
                    {currentIndex === 1 && <Rule2></Rule2>}{" "}
                    {currentIndex === 2 && <Rule3></Rule3>}
                    {currentIndex === 3 && <Rule4></Rule4>}
                </ModalBody>{" "}
                <Text
                    sx={{
                        position: "absolute",
                        top: "-60px",
                        left: "50%",
                        transform: "translate(-50%, 0)",
                        color: "#F2D861",
                        textAlign: "center",
                        fontFamily: "Orbitron",
                        fontSize: "34px",
                        width: "100%",
                    }}
                >
                    Tournament Rules
                </Text>
                <Image
                    onClick={() => {
                        onClose();
                    }}
                    src={CloseIcon}
                    sx={{
                        width: "30px",
                        height: "30px",
                        position: "absolute",
                        right: "0",
                        top: "-48px",
                        cursor: "pointer",
                    }}
                ></Image>
                <Indicator
                    currentIndex={currentIndex}
                    onIndexChange={handleChangeIndex}
                ></Indicator>
            </ModalContent>
        </Modal>
    );
};

export default RulesModal;
