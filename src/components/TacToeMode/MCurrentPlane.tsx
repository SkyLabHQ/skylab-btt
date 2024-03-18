import { Box, Text, Image, Flex } from "@chakra-ui/react";
import React from "react";
import PlaneBorder from "./assets/plane-border.png";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import NoPlane from "./assets/no-plane.png";

const CurrentPlane = ({ selectPlane }: { selectPlane: any }) => {
    const { address } = usePrivyAccounts();
    return (
        <Flex
            justify={"center"}
            flexDir={"column"}
            align={"center"}
            sx={{
                marginTop: "20px",
            }}
        >
            <Text
                sx={{
                    color: address ? "#f2d861" : "#fff",
                    textAlign: "center",
                    fontSize: "12px",
                    fontWeight: "bold",
                }}
            >
                {address ? "Current Plane" : "Not Conncet Wallet yet"}
            </Text>
            <Flex
                sx={{
                    background: `url(${PlaneBorder})`,
                    width: "65px",
                    height: "48px",
                    backgroundSize: "100%",
                    marginTop: "10px",
                    position: "relative",
                }}
                justify={"center"}
                align={"center"}
            >
                {selectPlane?.tokenId ? (
                    <Box sx={{}}>
                        <Image
                            src={selectPlane.img}
                            sx={{
                                width: "50px",
                            }}
                        ></Image>
                    </Box>
                ) : (
                    <Image
                        src={NoPlane}
                        sx={{
                            width: "20px",
                        }}
                    ></Image>
                )}

                {selectPlane.tokenId && (
                    <>
                        <Text
                            sx={{
                                position: "absolute",
                                bottom: "0px",
                                fontSize: "10px",
                            }}
                        >
                            Lvl. {selectPlane.level}
                        </Text>
                        <Flex
                            sx={{
                                position: "absolute",
                                bottom: "-40px",
                                left: "50%",
                                transform: "translate(-50%, 0)",
                                width: "100%",
                                fontSize: "12px",
                            }}
                            flexDirection={"column"}
                            align={"center"}
                        >
                            <Box
                                sx={{
                                    width: "80px",
                                    height: "8px",
                                    padding: "2px",
                                    border: "1px solid #FFF",
                                    borderRadius: "6px",
                                }}
                            >
                                <Box
                                    sx={{
                                        width:
                                            ((selectPlane.points -
                                                selectPlane.prePoints) /
                                                (selectPlane.nextPoints -
                                                    selectPlane.prePoints)) *
                                                100 +
                                            "%",
                                        height: "100%",
                                        background: "#fff",
                                        borderRadius: "6px",
                                    }}
                                ></Box>
                            </Box>
                            <Text
                                sx={{
                                    fontSize: "10px",
                                }}
                            >
                                Next Lvl:
                                <span
                                    style={{
                                        color: "#CCC",
                                    }}
                                >
                                    {selectPlane.nextPoints -
                                        selectPlane.points}
                                    pt
                                </span>
                            </Text>
                        </Flex>
                    </>
                )}
            </Flex>
        </Flex>
    );
};

export default CurrentPlane;
