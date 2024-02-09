import { Box, Image, Text, Flex, Checkbox } from "@chakra-ui/react";
import PwaLogo from "../assets/pwa-logo.svg";
import React from "react";

const Service = ({
    onEnter,
    checked,

    onChecked,
}: {
    onEnter: () => void;
    checked: boolean;
    onChecked: (checked: boolean) => void;
}) => {
    return (
        <Flex
            sx={{
                height: "100%",
                flexDirection: "column",
                alignItems: "center",
                padding: "140px 20px 0",
                textAlign: "center",
            }}
        >
            <Image
                src={PwaLogo}
                sx={{
                    width: "90px",
                    height: "90px",
                }}
            ></Image>
            <Text
                sx={{
                    fontSize: "24px",
                    fontWeight: 700,
                    marginTop: "10px",
                }}
            >
                Bid Tac Toe
            </Text>
            <Text
                sx={{
                    fontSize: "12px",
                }}
            >
                A Bidding Strategy Game
            </Text>

            <Box
                onClick={onEnter}
                sx={{
                    width: "220px",
                    height: "62px",
                    fill: "rgba(61, 61, 61, 0.10)",
                    strokeWidth: "3px",
                    backdropFilter: "blur(5px)",
                    border: "3px solid #F2D861",
                    borderRadius: "16px",
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "#F2D861",
                    lineHeight: "56px",
                    marginTop: "100px",
                }}
            >
                Enter
            </Box>
            <Flex
                align={"flex-start"}
                sx={{
                    marginTop: "20px",
                }}
            >
                <Checkbox
                    onChange={(e) => {
                        onChecked(e.target.checked);
                    }}
                    checked={checked}
                    size="lg"
                    sx={{
                        "--chakra-shadows-outline": "none",
                        marginRight: "0.5208vw",
                        background: "#d9d9d9",
                        borderRadius: "4px",
                        "& span": {
                            borderRadius: "4px",
                        },
                        "& span[data-checked]": {
                            background: "#d9d9d9 !important",
                            borderColor: "#d9d9d9 !important",
                            borderRadius: "4px",
                        },
                        "& span:hover": {
                            background: "#d9d9d9 !important",
                            borderColor: "#d9d9d9 !important",
                            borderRadius: "4px",
                        },
                    }}
                    variant="no-outline"
                ></Checkbox>
                <Text
                    sx={{
                        fontSize: "12px",
                        width: "220px",
                        textAlign: "left",
                        marginLeft: "10px",
                    }}
                >
                    Before entering, you agree to the Terms of Service.
                </Text>
            </Flex>
        </Flex>
    );
};

export default Service;
