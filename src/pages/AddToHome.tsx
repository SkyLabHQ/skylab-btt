import { Box, Image, Text, Flex } from "@chakra-ui/react";
import PwaLogo from "../assets/pwa-logo.svg";
import React from "react";

const AddToHome = () => {
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
                An onchain drawing game
            </Text>
            <Text
                sx={{
                    fontSize: "24px",
                    marginTop: "100px",
                }}
            >
                Add to Home Screen to Play
            </Text>
            <Text
                sx={{
                    marginTop: "10px",
                    fontSize: "12px",
                }}
            >
                In your Safari browser menu, choose{" "}
                <span
                    style={{
                        color: "#FDDC2D",
                    }}
                >
                    Add to Home Screen in the
                </span>
                options. Then open the Bid Tac Toe app on your home screen
            </Text>
        </Flex>
    );
};

export default AddToHome;
