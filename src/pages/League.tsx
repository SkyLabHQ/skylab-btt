import Back from "@/components/Back";
import RuleWrap from "@/components/Introduce/RuleWrap";
import { Toolbar } from "@/components/Tower/Toolbar";
import { Box, Flex, Text, Image, color } from "@chakra-ui/react";
import React from "react";
import { ReactComponent as LbIcon } from "@/assets/l-b.svg";
import { ReactComponent as RbIcon } from "@/assets/r-b.svg";
import Avatar from "@/components/Avatar";
import { useNavigate } from "react-router-dom";
import DataInfo from "@/components/League/DataInfo";
import TeamPlaneList from "@/components/League/TeamPlaneList";
import leagueConfigList from "@/utils/league";

const League = () => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const navigate = useNavigate();
    return (
        <Flex
            sx={{
                width: "100%",
                height: "100%",
                position: "relative",
                paddingTop: "100px",
            }}
            flexDirection={"column"}
            align={"center"}
        >
            <Box
                sx={{
                    position: "absolute",
                    left: "24px",
                    top: "24px",
                }}
            >
                <Back
                    onClick={() => {
                        navigate("/tower");
                    }}
                ></Back>
            </Box>
            <Toolbar showLeague={false}></Toolbar>
            <Box>
                <Text
                    sx={{
                        textShadow: leagueConfigList[activeIndex].textShadow,
                        WebkitTextStrokeWidth: 2,
                        WebkitTextStrokeColor:
                            leagueConfigList[activeIndex].color,
                        fontFamily: "Quantico",
                        fontSize: "32px",
                        fontStyle: "normal",
                        fontWeight: 700,
                        color: "#000",
                        textAlign: "center",
                    }}
                >
                    {leagueConfigList[activeIndex].name}
                </Text>
                <Flex
                    sx={{
                        gap: "16px",
                    }}
                    align={"center"}
                >
                    {leagueConfigList.map((item, index) => {
                        return (
                            <Box
                                sx={{
                                    "&:hover div:nth-of-type(1)": {
                                        display: "block",
                                    },
                                    "&:hover div:nth-of-type(2)": {
                                        display: "none",
                                    },
                                }}
                                onClick={() => {
                                    setActiveIndex(index);
                                }}
                            >
                                <Box
                                    key={index}
                                    sx={{
                                        position: "relative",
                                        width: "36px",
                                        height: "36px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <Avatar
                                        borderColor={item.color}
                                        hornColor={item.color}
                                        sx={{
                                            display: "none",
                                            width: "36px",
                                            height: "36px",
                                            position: "absolute",
                                            left: "50%",
                                            top: "50%",
                                            transform: "translate(-50%, -50%)",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                background: item.color,
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        ></Box>
                                    </Avatar>
                                    <Box
                                        sx={{
                                            background: item.color,
                                            width: "20px",
                                            height: "20px",
                                            display: "block",
                                            position: "absolute",
                                            left: "50%",
                                            top: "50%",
                                            transform: "translate(-50%, -50%)",
                                        }}
                                    ></Box>
                                </Box>
                            </Box>
                        );
                    })}
                </Flex>
            </Box>
            <DataInfo></DataInfo>
            <TeamPlaneList></TeamPlaneList>
        </Flex>
    );
};

export default League;
