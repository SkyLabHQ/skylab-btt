import {
    Box,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Text,
    Image,
    useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import ArrowIcon from "./assets/arrow.png";
import ArrowIcon1 from "./assets/arrow1.png";

import GrayArrowIcon from "./assets/gray-arrow.png";
import GrayArrowIcon1 from "./assets/gray-arrow1.png";

import Rule1Img from "./assets/rule1.png";
import Rule2Img from "./assets/rule2.png";
import Rule3Img from "./assets/rule3.png";
import Rule4Img from "./assets/rule4.png";
import CloseIcon from "./assets/close.png";

const Rule1 = () => {
    return <Image src={Rule1Img}></Image>;
};

const Rule2 = () => {
    return <Image src={Rule2Img}></Image>;
};
const Rule3 = () => {
    return <Image src={Rule3Img}></Image>;
};
const Rule4 = () => {
    return <Image src={Rule4Img}></Image>;
};

const length = 4;
const Indicator = ({
    currentIndex,
    onIndexChange,
}: {
    currentIndex: number;
    onIndexChange: (index: number) => void;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Box
            sx={{
                position: "absolute",
                bottom: isPc ? "-120px" : "-120px",
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
                    <Text
                        sx={{
                            fontSize: isPc ? "16px" : "12px",
                        }}
                    >
                        *Disclaimer: 99 eth pool is for{" "}
                        <span
                            style={{
                                color: "#F2D861",
                            }}
                        >
                            demonstration purpose only
                        </span>{" "}
                        . The real pool size is displayed on the main page and
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
    const [isPc] = useMediaQuery("(min-width: 800px)");
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
                        padding: "20px",
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
                    position: "relative",
                }}
            >
                {isPc && (
                    <Image
                        src={currentIndex === 0 ? GrayArrowIcon1 : ArrowIcon1}
                        sx={{
                            width: "48px",
                            transform: `${
                                currentIndex !== 0 ? "rotate(180deg)" : ""
                            }`,
                            position: "absolute",
                            left: "-80px",
                            top: "50%",
                            cursor:
                                currentIndex === 0 ? "not-allowed" : "pointer",
                        }}
                        onClick={() => {
                            if (currentIndex > 0) {
                                handleChangeIndex(currentIndex - 1);
                            }
                        }}
                    ></Image>
                )}
                <ModalBody
                    sx={{
                        maxWidth: "800px",
                        width: "100%",
                        aspectRatio: "13/12",
                        padding: isPc ? "54px 20px 30px" : "20px 4px 30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "&:img": {
                            width: "100%",
                            height: "100%",
                        },
                    }}
                >
                    {currentIndex === 0 && <Rule1></Rule1>}
                    {currentIndex === 1 && <Rule2></Rule2>}
                    {currentIndex === 2 && <Rule3></Rule3>}
                    {currentIndex === 3 && <Rule4></Rule4>}
                </ModalBody>
                {isPc && (
                    <Image
                        src={
                            currentIndex === length - 1
                                ? GrayArrowIcon1
                                : ArrowIcon1
                        }
                        sx={{
                            width: "48px",
                            transform:
                                currentIndex === length - 1 && "rotate(180deg)",
                            position: "absolute",
                            right: "-80px",
                            top: "50%",
                            cursor:
                                currentIndex === length - 1
                                    ? "not-allowed"
                                    : "pointer",
                        }}
                        onClick={() => {
                            if (currentIndex < length - 1) {
                                handleChangeIndex(currentIndex + 1);
                            }
                        }}
                    ></Image>
                )}
                <Text
                    sx={{
                        position: "absolute",
                        top: isPc ? "-60px" : "-40px",
                        left: "50%",
                        transform: "translate(-50%, 0)",
                        color: "#F2D861",
                        textAlign: "center",
                        fontFamily: "Orbitron",
                        fontSize: isPc ? "34px" : "18px",
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
                        width: isPc ? "30px" : "18px",
                        height: isPc ? "30px" : "18px",
                        position: "absolute",
                        right: "0",
                        top: isPc ? "-48px" : "-32px",
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
