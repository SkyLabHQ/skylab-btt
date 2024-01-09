import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import GoldIcon from "@/assets/gold.svg";

const MBalance = ({ balance }: { balance: number }) => {
    return (
        <Flex
            sx={{
                width: "80px",
                height: "30px",
                borderRadius: "26px",
                background: "#BCBBBE",
            }}
        >
            <Image
                src={GoldIcon}
                sx={{
                    width: "30px",
                    margin: "0 4px",
                }}
            ></Image>
            <Text
                sx={{
                    fontSize: "20px",
                    color: "#303030",
                }}
            >
                {balance}
            </Text>
        </Flex>
    );
};

export default MBalance;
