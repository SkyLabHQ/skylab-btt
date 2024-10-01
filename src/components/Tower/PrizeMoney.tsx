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
                width: "385px",
                height: "256px",
                backgroundSize: "100% 100%",
                zIndex: 2,
            }}
            align={"center"}
            justify={"center"}
        >
            <Flex align={"center"}>
                <Image
                    src={ETHIcon}
                    sx={{
                        width: "40px",
                        marginRight: "24px",
                    }}
                ></Image>
                <Box
                    sx={{
                        lineHeight: "1",
                        position: "relative",
                    }}
                >
                    <Text
                        sx={{
                            fontSize: "30px",
                            fontWeight: 700,
                            position: "absolute",
                            top: "-30px",
                            width: "100%",
                            textAlign: "center",
                        }}
                    >
                        PRIZE MONEY
                    </Text>
                    <Text
                        sx={{
                            color: "#FFF",
                            fontFamily: "Quantico",
                            fontSize: "96px",
                            fontWeight: 700,
                        }}
                    >
                        {toFixed(formatAmount(pot), 2)}
                    </Text>
                </Box>
            </Flex>
        </Flex>
    );
};

export default PrizeMoney;
