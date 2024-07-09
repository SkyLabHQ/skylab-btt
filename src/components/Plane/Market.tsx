import { aviationImg } from "@/utils/aviationImg";
import { Box, Image, Flex, Text, Grid, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import Bg from "./assets/card-bg.png";

const Market = () => {
    const [list, setList] = React.useState([
        {
            price: `$100`,
            title: `title`,
        },
        {
            price: `$100`,
            title: `title`,
        },
        {
            price: `$100`,
            title: `title`,
        },
        {
            price: `$100`,
            title: `title`,
        },
        {
            price: `$100`,
            title: `title`,
        },
        {
            price: `$100`,
            title: `title`,
        },
        {
            price: `$100`,
            title: `title`,
        },
        {
            price: `$100`,
            title: `title`,
        },
    ]);

    return (
        <Box
            sx={{
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, 320px)",
                gap: "24px",
                maxWidth: "1700px",
                justifyContent: "center",
                // width: "fit-content",
            }}
        >
            {list.map((item, index) => {
                return (
                    <Box
                        sx={{
                            borderRadius: "20px",
                            border: "4px solid #1B1B1B",
                            overflow: "hidden",
                            width: "320px",
                        }}
                    >
                        <Box
                            sx={{
                                background: `url(${Bg}) no-repeat`,
                                backgroundSize: "cover",
                                position: "relative",
                            }}
                        >
                            <Flex
                                sx={{
                                    position: "absolute",
                                    left: "0",
                                    top: "0",
                                    background: "rgba(0, 0, 0, 0.40)",
                                    width: "102px",
                                    height: "60px",
                                    borderRadius: "0px 24px 24px 0",
                                    fontWeight: "bold",
                                    fontSize: "24px",
                                }}
                                justify={"center"}
                                align={"center"}
                            >
                                <Box>
                                    Lvl.{" "}
                                    <span
                                        style={{
                                            fontSize: "32px",
                                        }}
                                    >
                                        {" "}
                                        1
                                    </span>
                                </Box>
                            </Flex>
                            <Image src={aviationImg(1)}></Image>
                        </Box>
                        <Box
                            sx={{
                                background: "#2D240C",
                                padding: "24px 12px",
                            }}
                        >
                            <Flex
                                justify={"space-between"}
                                sx={{
                                    fontSize: "14px",
                                }}
                            >
                                <Text>Hignest Price</Text>
                                <Text>My Price</Text>
                            </Flex>
                            <Flex
                                justify={"space-between"}
                                align={"flex-end"}
                                sx={{
                                    fontFamily: "Helvetica",
                                    fontWeight: "bold",
                                    marginTop: "4px",
                                    verticalAlign: "bottom",
                                    lineHeight: "1",
                                }}
                            >
                                <Text
                                    sx={{
                                        fontSize: "30px",
                                    }}
                                >
                                    44.40 ETH
                                </Text>
                                <Text
                                    sx={{
                                        fontSize: "24px",
                                    }}
                                >
                                    44.40 ETH
                                </Text>
                            </Flex>
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
};

export default Market;
