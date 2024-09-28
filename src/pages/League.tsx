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
                        textShadow:
                            "0px -1px 27.7px rgba(255, 63, 66, 0.54), 0px 2px 0px rgba(255, 97, 97, 0.97), 0px 0px 39.4px #FF0404",
                        WebkitTextStrokeWidth: 2,
                        WebkitTextStrokeColor: "#000",
                        fontFamily: "Quantico",
                        fontSize: "32px",
                        fontStyle: "normal",
                        fontWeight: 700,
                    }}
                >
                    RED TEAM
                </Text>
                <Flex
                    sx={{
                        gap: "16px",
                    }}
                    align={"center"}
                >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
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
                            >
                                <Box
                                    key={index}
                                    sx={{
                                        position: "relative",
                                        width: "36px",
                                        height: "36px",
                                    }}
                                >
                                    <Avatar
                                        borderColor="red"
                                        hornColor="red"
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
                                                background: "blue",
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        ></Box>
                                    </Avatar>
                                    <Box
                                        sx={{
                                            background: "green",
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
            <Box>
                <Flex>
                    <Text>TEAM</Text>
                    <Flex>
                        <Image src={TutorirlIcon}></Image>
                    </Flex>
                </Flex>
            </Box>
            <Box
                sx={{
                    maxWidth: "800px",
                    margin: "0 auto",
                    width: "100%",
                    height: "200px",
                    position: "relative",
                    background: "rgba(0, 0, 0, 0.39)",
                    border: "1px solid #D60000",
                }}
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
            </Box>
        </Flex>
    );
};

export default League;
