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

            <LoadingText></LoadingText>
        </Flex>
    );
};

export default LoadingPage;
