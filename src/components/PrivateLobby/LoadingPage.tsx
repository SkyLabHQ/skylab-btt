import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import BiddingIcon from "./assets/bidding.gif";

const LoadingPage = () => {
    return (
        <Flex
            sx={{
                width: "100%",
                height: "100%",
            }}
            align={"center"}
            justify={"center"}
            direction={"column"}
        >
            <Image
                src={BiddingIcon}
                sx={{
                    width: "60px",
                }}
            ></Image>
            <Text
                sx={{
                    fontSize: "16px",
                    marginTop: "16px",
                }}
            >
                We are cleaning the lobby floor...
            </Text>
        </Flex>
    );
};

export default LoadingPage;
