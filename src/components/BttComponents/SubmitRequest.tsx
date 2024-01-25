import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import EnterLoadingIcon from "@/assets/enter-loading.gif";

const SubmitRequest = () => {
    return (
        <Flex
            sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: "0",
                left: "0",
            }}
        >
            <Image
                src={EnterLoadingIcon}
                sx={{
                    width: "60px",
                }}
            ></Image>
            <Text>Submit request...</Text>
        </Flex>
    );
};

export default SubmitRequest;
