import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import TutorirlIcon from "@/assets/tutorial.svg";
import ETHIcon from "@/assets/eth.svg";
import APYUp from "@/assets/apy-up.svg";
import Border from "./assets/border.png";
import A1 from "@/assets/a1.png";
import RArrow from "./assets/r-arrow.svg";
import XP from "@/assets/xp.svg";

const DataInfo = () => {
    return (
        <Flex
            align={"center"}
            gap={"20px"}
            sx={{
                lineHeight: 1,
            }}
        >
            <Flex flexDir={"column"} align={"center"}>
                <Text
                    sx={{
                        fontSize: "16px",
                    }}
                >
                    TEAM
                </Text>
                <Flex align={"center"}>
                    <Image
                        src={TutorirlIcon}
                        sx={{
                            width: "14px",
                            height: "14px",
                            marginRight: "2px",
                        }}
                    ></Image>
                    <Text
                        sx={{
                            fontSize: "16px",
                        }}
                    >
                        PREMIUM
                    </Text>
                </Flex>
                <Flex align={"center"}>
                    <Image
                        src={ETHIcon}
                        sx={{
                            width: "14px",
                            marginRight: "2px",
                        }}
                    ></Image>
                    <Text
                        sx={{
                            fontSize: "30px",
                        }}
                    >
                        0.0005
                    </Text>
                </Flex>
                <Flex align={"center"} gap={"4px"}>
                    <Image
                        src={TutorirlIcon}
                        sx={{
                            width: "14px",
                            marginRight: "2px",
                        }}
                    ></Image>
                    <Text
                        sx={{
                            fontSize: "16px",
                            lineHeight: 1,
                        }}
                    >
                        APY
                    </Text>
                    <Text
                        sx={{
                            fontSize: "30px",
                            lineHeight: 1,
                        }}
                    >
                        400%
                    </Text>
                    <Image
                        src={APYUp}
                        sx={{
                            width: "14px",
                        }}
                    ></Image>
                </Flex>
            </Flex>
            <Image
                src={Border}
                sx={{
                    height: "80px",
                }}
            ></Image>
            <Flex align={"flex-end"}>
                <Text
                    sx={{
                        color: "#24FF00",
                        textAlign: "center",
                        fontFamily: "Quantico",
                        fontSize: "32px",
                        fontWeight: 700,
                    }}
                >
                    2
                    <span
                        style={{
                            fontSize: "16px",
                        }}
                    >
                        X
                    </span>
                </Text>
                <Flex flexDir={"column"} align={"center"}>
                    <Image
                        src={A1}
                        sx={{
                            width: "55px",
                        }}
                    ></Image>
                    <Text
                        sx={{
                            fontSize: "12px",
                        }}
                    >
                        Lvl. 1
                    </Text>
                    <Text>PRICE</Text>
                    <Flex>
                        <Image
                            src={ETHIcon}
                            sx={{
                                width: "12px",
                                marginRight: "4px",
                            }}
                        ></Image>
                        <Text
                            sx={{
                                fontSize: "32px",
                            }}
                        >
                            2.99
                        </Text>
                    </Flex>
                </Flex>
                <Image
                    src={RArrow}
                    sx={{
                        margin: "0 20px 10px 12px",
                    }}
                ></Image>
                <Flex flexDir={"column"} align={"center"}>
                    <Text
                        sx={{
                            fontSize: "18px",
                        }}
                    >
                        PER.{" "}
                        <Image
                            src={XP}
                            sx={{
                                display: "inline-block",
                                width: "27px",
                            }}
                        ></Image>
                    </Text>

                    <Text
                        sx={{
                            fontSize: "20px",
                        }}
                    >
                        PAYOUT
                    </Text>
                    <Flex>
                        <Image
                            src={ETHIcon}
                            sx={{
                                width: "12px",
                                marginRight: "4px",
                            }}
                        ></Image>
                        <Text
                            sx={{
                                fontSize: "32px",
                            }}
                        >
                            2.99
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default DataInfo;
