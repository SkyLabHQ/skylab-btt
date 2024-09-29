import Back from "@/components/Back";
import RuleWrap from "@/components/Introduce/RuleWrap";
import { Toolbar } from "@/components/Tower/Toolbar";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import React from "react";
import { ReactComponent as LbIcon } from "@/assets/l-b.svg";
import { ReactComponent as RbIcon } from "@/assets/r-b.svg";
import Avatar from "@/components/Avatar";
import { useNavigate } from "react-router-dom";
import TutorirlIcon from "@/assets/tutorial.svg";
import SettingIcon from "./assets/setting.svg";
import A1 from "@/assets/a1.png";
import XP from "@/assets/xp.svg";
const RateData = () => {
    return (
        <Flex align={"center"} gap={"20px"} sx={{}}>
            <Flex align={"center"} gap={"10px"}>
                <Image
                    src={TutorirlIcon}
                    sx={{
                        width: "14px",
                    }}
                ></Image>
                <Box
                    sx={{
                        textAlign: "center",
                    }}
                >
                    <Text>TEAM LEADER</Text>
                    <Text>TAKE RATE</Text>
                </Box>
            </Flex>
            <Flex gap={"6px"}>
                <Text
                    sx={{
                        fontSize: "40px",
                    }}
                >
                    8
                    <span
                        style={{
                            fontSize: "12px",
                        }}
                    >
                        %
                    </span>
                </Text>
                <Image src={SettingIcon}></Image>
            </Flex>
            <Flex align={"center"} gap={"10px"}>
                <Image
                    src={TutorirlIcon}
                    sx={{
                        width: "14px",
                    }}
                ></Image>
                <Box
                    sx={{
                        textAlign: "center",
                    }}
                >
                    <Text>CHAMPION</Text>
                    <Text>TAKE RATE</Text>
                </Box>
            </Flex>
            <Flex gap={"6px"}>
                <Text
                    sx={{
                        fontSize: "40px",
                    }}
                >
                    8
                    <span
                        style={{
                            fontSize: "12px",
                        }}
                    >
                        %
                    </span>
                </Text>
                <Image src={SettingIcon}></Image>
            </Flex>
        </Flex>
    );
};

const TeamPlaneList = () => {
    return (
        <Flex
            sx={{
                maxWidth: "800px",
                margin: "0 auto",
                width: "100%",
                height: "calc(100vh - 400px)",
                position: "relative",
                background: "rgba(0, 0, 0, 0.39)",
                border: "1px solid #D60000",
                marginTop: "15px",
                lineHeight: 1,
                padding: "20px 0",
            }}
            align={"center"}
            flexDir={"column"}
        >
            <LbIcon
                style={{
                    position: "absolute",
                    left: "-5px",
                    top: "-10px",
                    color: "#D60000",
                    width: "50px",
                    height: "50px",
                }}
            ></LbIcon>
            <RbIcon
                style={{
                    position: "absolute",
                    right: "-5px",
                    bottom: "-10px",
                    color: "#D60000",
                    width: "50px",
                    height: "50px",
                }}
            ></RbIcon>
            <RateData></RateData>
            <Box
                sx={{
                    width: "100%",
                    padding: "0 40px",
                    // height:
                    flex: 1,
                    overflowY: "auto",
                    marginTop: "30px",
                    "&::-webkit-scrollbar-thumb": {
                        background: "transparent",
                        margin: "10px",
                        borderRadius: "10px",
                    },
                    "::-webkit-scrollbar": {
                        width: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                        display: "none",
                    },
                }}
            >
                {[1, 2, 3, 4, 5, 6, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(
                    (item, index) => {
                        return (
                            <Flex
                                key={index}
                                sx={{
                                    background:
                                        "linear-gradient(90deg, red 31%, rgba(0, 0, 0, 0.00) 100%)",
                                    height: "52px",
                                    marginBottom: "15px ",
                                    position: "relative",
                                }}
                                align={"center"}
                                justify={"space-between"}
                            >
                                <Image
                                    src={A1}
                                    sx={{
                                        position: "absolute",
                                        left: "-20px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        width: "80px",
                                    }}
                                ></Image>
                                <Text
                                    sx={{
                                        width: "140px",
                                        fontSize: "12px",
                                        textAlign: "right",
                                    }}
                                >
                                    Lvl.{" "}
                                    <span
                                        style={{
                                            fontSize: "24px",
                                        }}
                                    >
                                        16
                                    </span>
                                </Text>
                                <Flex align={"center"}>
                                    <Avatar
                                        hornSize="10px"
                                        sx={{
                                            width: "36px",
                                            height: "36px",
                                        }}
                                    >
                                        <Image src={A1}></Image>
                                    </Avatar>
                                    <Text
                                        sx={{
                                            fontSize: "16px",
                                            fontWeight: 700,
                                            marginLeft: "10px",
                                        }}
                                    >
                                        @ownername
                                    </Text>
                                </Flex>
                                <Flex flexDir={"column"} align={"center"}>
                                    <Flex align={"flex-end"}>
                                        <Image
                                            src={XP}
                                            sx={{
                                                width: "14px",
                                                marginBottom: "3px",
                                                marginRight: "4px",
                                            }}
                                        ></Image>
                                        <Text
                                            sx={{
                                                fontSize: "20px",
                                            }}
                                        >
                                            45
                                        </Text>
                                    </Flex>
                                    <Box
                                        sx={{
                                            padding: "2px",
                                            border: "2px solid #fff",
                                            borderRadius: "10px",
                                            width: "175px",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                background: "#FDDC2D",
                                                height: "10px",
                                                width: "80%",
                                                borderRadius: "5px",
                                            }}
                                        ></Box>
                                    </Box>
                                </Flex>
                            </Flex>
                        );
                    },
                )}
            </Box>
        </Flex>
    );
};

export default TeamPlaneList;
