import { Box, Image, Text, Flex } from "@chakra-ui/react";
import PwaLogo from "../assets/pwa-logo.svg";
import React from "react";

const AddToHome = ({ onSkip }: { onSkip: () => void }) => {
    return (
        <Flex
            sx={{
                height: "100%",
                flexDirection: "column",
                alignItems: "center",
                padding: "140px 20px 0",
                textAlign: "center",
                position: "relative",
            }}
        >
            <Flex
                onClick={onSkip}
                sx={{
                    border: "1px solid rgba(242, 216, 97, 1)",
                    position: "absolute",
                    right: "20px",
                    top: "20px",
                    width: "77px",
                    height: "35px",
                    borderRadius: "12px",
                    fontSize: "16px",
                    color: " rgba(253, 220, 45, 1)",
                }}
                justify={"center"}
                align={"center"}
            >
                Skip
            </Flex>
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
                </span>{" "}
                options. Then open the Bid Tac Toe app on your home screen
            </Text>
        </Flex>
    );
};

export default AddToHome;
