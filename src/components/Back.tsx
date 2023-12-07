import React from "react";
import BackIcon from "@/assets/back-arrow.svg";
import { Flex, Text, Image } from "@chakra-ui/react";

const Back = ({ onClick }: { onClick?: () => void }) => {
    return (
        <Flex flexDir={"column"} align={"center"} onClick={onClick}>
            <Image
                src={BackIcon}
                sx={{
                    width: "2.0833vw",
                    cursor: "pointer",
                }}
            ></Image>
        </Flex>
    );
};
export default Back;
