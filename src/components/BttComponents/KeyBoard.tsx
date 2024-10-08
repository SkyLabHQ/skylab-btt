import {
    Box,
    Button,
    Image,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Text,
} from "@chakra-ui/react";
import React from "react";
import KeyboardIcon from "./assets/keyboard.svg";
import UpArrowIcon from "./assets/up-arrow.svg";
import DownArrowIcon from "./assets/down-arrow.svg";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";

const KeyItem = ({ children }: { children: React.ReactNode }) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");

    return (
        <Box
            sx={{
                height: isPc ? "1.0417vw" : "20px",
                mixWidth: isPc ? "1.0417vw" : "40px",
                borderRadius: isPc ? "0.2604vw" : "4px",
                border: "1px solid #000",
                backgroundColor: "rgba(0, 0, 0, 0.20)",
                width: isPc ? "3.125vw" : "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isPc ? "0.7292vw" : "12px",
                fontWeight: "bold",
                padding: "0 0.5208vw",
            }}
        >
            {children}
        </Box>
    );
};

const Content = () => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    return (
        <PopoverContent
            sx={{
                backgroundColor: "#fff",
                color: "#000",
                width: isPc ? "14.5833vw" : "210px",
                padding: "0px",
                "& .chakra-popover__arrow": {
                    background: "#fff !important",
                },
                "&:focus": {
                    outline: "none !important",
                    boxShadow: "none !important",
                },
            }}
        >
            <PopoverArrow />
            <PopoverBody>
                <Box sx={{}}>
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "90px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <KeyItem>Shift</KeyItem>
                                <Text
                                    sx={{
                                        fontSize: isPc ? "0.7292vw" : "12px",
                                    }}
                                >
                                    +
                                </Text>
                                <KeyItem>Enter</KeyItem>
                            </Box>

                            <Text
                                sx={{
                                    fontSize: isPc ? "0.7292vw" : "12px",
                                    fontWeight: "bold",
                                    width: isPc ? "5.2083vw" : "90px",
                                    textAlign: "center",
                                }}
                            >
                                Confirm Bid
                            </Text>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                marginTop: "8px",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flex: 1,
                                }}
                            >
                                <Image src={UpArrowIcon} sx={{}}></Image>
                            </Box>
                            <Text
                                sx={{
                                    fontSize: isPc ? "0.7292vw" : "12px",
                                    fontWeight: "bold",
                                    width: isPc ? "5.2083vw" : "90px",
                                    textAlign: "center",
                                }}
                            >
                                Add Bid
                            </Text>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                marginTop: "8px",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flex: 1,
                                }}
                            >
                                <Image src={DownArrowIcon} sx={{}}></Image>
                            </Box>
                            <Text
                                sx={{
                                    fontSize: isPc ? "0.7292vw" : "12px",
                                    fontWeight: "bold",
                                    width: isPc ? "5.2083vw" : "90px",
                                    textAlign: "center",
                                }}
                            >
                                Reduce Bid
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </PopoverBody>
        </PopoverContent>
    );
};

const KeyBoard = ({
    onToggle,
    onClose,
}: {
    onToggle: () => void;
    onClose: () => void;
}) => {
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");

    return (
        <Box>
            <Popover
                onClose={() => {
                    onClose();
                }}
            >
                <PopoverTrigger>
                    <Button
                        onClick={() => {
                            onToggle();
                        }}
                        variant={"unstyled"}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            height: isPc ? "48px" : "40px",
                            width: isPc ? "48px" : "40px",
                            "&:focus": {
                                boxShadow: "none",
                            },
                            minWidth: "unset",
                        }}
                    >
                        <Image
                            src={KeyboardIcon}
                            sx={{
                                height: isPc ? "48px" : "40px",
                                width: isPc ? "48px" : "40px",
                            }}
                        ></Image>
                    </Button>
                </PopoverTrigger>
                <Content></Content>
            </Popover>
        </Box>
    );
};

export default KeyBoard;
