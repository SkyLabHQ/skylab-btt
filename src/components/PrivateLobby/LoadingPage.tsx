import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import BiddingIcon from "./assets/bidding.gif";
import LoadingText from "../BttComponents/LoadingText";

const LoadingPage = () => {
    return (
        <Flex
            sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: "0",
                left: "0",
            }}
            align={"center"}
            justify={"center"}
            flexDir={"column"}
        >
            <Image
                src={BiddingIcon}
                sx={{
                    width: "60px",
                }}
            ></Image>
            <LoadingText></LoadingText>
        </Flex>
    );
};

export default LoadingPage;
