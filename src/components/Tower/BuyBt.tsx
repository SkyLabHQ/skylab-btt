import React from "react";
import Buycon from "./assets/buy.png";
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
const BuyBt = () => {
    const { onOpen, onClose, isOpen } = useDisclosure();

    return (
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
                    src={Buycon}
                    sx={{
                        width: "313px",
                        position: "absolute",
                        left: "0",
                        bottom: "0",
                    }}
                ></Image>
            </PopoverTrigger>
            <PopoverContent
                width={"220px"}
                sx={{
                    height: "75px",
                    border: "2px solid #F2D861",
                    borderRadius: "10px",
                    background: "rgb(61,61,61)",
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
                        111
                    </Box>
                </PopoverBody>
                <Box
                    sx={{
                        height: "0",
                        width: "0",
                        borderTop: "12px solid #F2D861",
                        borderRight: "12px solid transparent",
                        borderBottom: "12px solid transparent",
                        borderLeft: "12px solid transparent",
                        position: "absolute",
                        left: "18px",
                        bottom: "-24px",
                    }}
                ></Box>
                <Box
                    sx={{
                        height: "0",
                        width: "0",
                        borderTop: "10px solid rgb(61,61,61)",
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
    );
};

export default BuyBt;
