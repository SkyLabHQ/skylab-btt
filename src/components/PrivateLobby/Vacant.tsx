import avatars from "@/skyConstants/avatars";
import { Box, Flex, SimpleGrid, Text, useMediaQuery } from "@chakra-ui/react";
import React from "react";

const Vacant = ({ list }: { list: any }) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Box
            sx={{
                border: "1px solid #FFF",
                background:
                    "linear-gradient(90deg, #000 -20.03%, rgba(0, 0, 0, 0.00) 43.82%)",
                height: "100%",
                padding: isPc ? "1.0417vw 1.5625vw" : "10px 18px",
                overflow: "auto",
            }}
        >
            <Text
                sx={{
                    fontSize: isPc ? "1.25vw" : "12px",
                }}
            >
                Vacant Member
            </Text>

            <SimpleGrid
                columns={isPc ? 4 : 6}
                spacingY={isPc ? "1.0417vw" : "20px"}
                sx={{
                    marginTop: "0.625vw",
                }}
            >
                {list.map((item: any, index: number) => {
                    return (
                        <Box
                            key={index}
                            sx={{
                                width: "100%",
                            }}
                        >
                            <Box
                                sx={{
                                    width: isPc ? "4.1667vw" : "38px",
                                    height: isPc ? "4.1667vw" : "38px",
                                    borderRadius: isPc ? "0.8333vw" : "10px",
                                    border: "1px solid #FFF",
                                    background: avatars[item.avatar],
                                    position: "relative",
                                }}
                            >
                                <Text
                                    sx={{
                                        color: "#BCBBBE",
                                        fontSize: isPc ? "0.8333vw" : "12px",
                                        position: "absolute",
                                        bottom: "-20px",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                    }}
                                >
                                    {item.name}
                                </Text>
                            </Box>
                        </Box>
                    );
                })}
            </SimpleGrid>
        </Box>
    );
};

export default Vacant;
