import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import moneyBg from "./assets/money.png";
import ETHIcon from "./assets/eth.svg";
import { formatAmount, toFixed } from "@/utils/formatBalance";

const PrizeMoney = ({ pot }: { pot: string }) => {
    return (
        <Flex
            sx={{
                position: "absolute",
                top: "0",
                left: "0",
                background: `url(${moneyBg}) no-repeat`,
                // background: "green",
                width: "290px",
                height: "192px",
                backgroundSize: "100% 100%",
                zIndex: 2,
            }}
            align={"center"}
            justify={"center"}
            flexDir={"column"}
        >
            <Text
                sx={{
                    fontSize: "24px",
                    fontWeight: 700,
                    textAlign: "center",
                }}
            >
                PRIZE MONEY
            </Text>
            <Flex align={"center"}>
                <Image
                    src={ETHIcon}
                    sx={{
                        width: "30px",
                        marginRight: "24px",
                    }}
                ></Image>
                <Text
                    sx={{
                        color: "#FFF",
                        fontFamily: "Quantico",
                        fontSize: "60px",
                        fontWeight: 700,
                        lineHeight: 1,
                    }}
                >
                    {toFixed(formatAmount(pot), 2)}
                </Text>
            </Flex>
        </Flex>
    );
};

export default PrizeMoney;
