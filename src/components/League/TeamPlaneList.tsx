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
import { LeagueInfo, TokenIdInfo } from "@/pages/League";
import { useUserInfo } from "@/contexts/UserInfo";
const RateData = ({
    leagueInfo,
    onLeaderRateModalOpen,
}: {
    leagueInfo: LeagueInfo;
    onLeaderRateModalOpen: () => void;
}) => {
    const { address } = useUserInfo();
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
            <Flex gap={"6px"} align={"center"}>
                <Text
                    sx={{
                        fontSize: "40px",
                    }}
                >
                    {leagueInfo.leagueOwnerPercentage}
                    <span
                        style={{
                            fontSize: "12px",
                        }}
                    >
                        %
                    </span>
                </Text>

                <Box
                    sx={{
                        width: "16px",
                        height: "16px",
                    }}
                >
                    {address == leagueInfo.leader && (
                        <Image
                            sx={{
                                width: "100%",
                                height: "100%",
                            }}
                            src={SettingIcon}
                            onClick={onLeaderRateModalOpen}
                        ></Image>
                    )}
                </Box>
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
            <Flex gap={"6px"} align={"center"}>
                <Text
                    sx={{
                        fontSize: "40px",
                    }}
                >
                    {leagueInfo.newComerPercentage}
                    <span
                        style={{
                            fontSize: "12px",
                        }}
                    >
                        %
                    </span>
                </Text>
                <Box
                    sx={{
                        width: "16px",
                        height: "16px",
                    }}
                >
                    {address == leagueInfo.leader && (
                        <Image
                            sx={{
                                width: "100%",
                                height: "100%",
                            }}
                            src={SettingIcon}
                            onClick={onLeaderRateModalOpen}
                        ></Image>
                    )}
                </Box>
            </Flex>
        </Flex>
    );
};

const TeamPlaneList = ({
    leagueConfig,
    leagueInfo,
    onLeaderRateModalOpen,
}: {
    leagueConfig: any;
    leagueInfo: LeagueInfo;
    onLeaderRateModalOpen: () => void;
}) => {
    return (
        <Flex
            sx={{
                maxWidth: "800px",
                margin: "0 auto",
                width: "100%",
                height: "calc(100vh - 400px)",
                position: "relative",
                background: "rgba(0, 0, 0, 0.39)",
                border: `1px solid ${leagueConfig.color}`,
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
                    color: `${leagueConfig.color}`,
                    width: "50px",
                    height: "50px",
                }}
            ></LbIcon>
            <RbIcon
                style={{
                    position: "absolute",
                    right: "-5px",
                    bottom: "-10px",
                    color: `${leagueConfig.color}`,
                    width: "50px",
                    height: "50px",
                }}
            ></RbIcon>
            <RateData
                leagueInfo={leagueInfo}
                onLeaderRateModalOpen={onLeaderRateModalOpen}
            ></RateData>
            <Box
                sx={{
                    width: "100%",
                    padding: "0 40px",
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
                {leagueInfo.tokenIdsInfo.map((item, index) => {
                    return (
                        <Flex
                            key={index}
                            sx={{
                                background: `linear-gradient(90deg, ${leagueConfig.color} 31%, rgba(0, 0, 0, 0.00) 100%)`,
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
                                    {item.level}
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
                                    <Image src={item.img}></Image>
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
                                        {item.point}
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
                                            width:
                                                ((item.point - item.prePoint) /
                                                    (item.nextPoint -
                                                        item.prePoint)) *
                                                    100 +
                                                "%",
                                            borderRadius: "5px",
                                        }}
                                    ></Box>
                                </Box>
                            </Flex>
                        </Flex>
                    );
                })}
            </Box>
        </Flex>
    );
};

export default TeamPlaneList;
