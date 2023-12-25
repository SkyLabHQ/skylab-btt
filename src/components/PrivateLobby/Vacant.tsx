import avatars from "@/skyConstants/avatars";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

const Vacant = ({ list }: { list: any }) => {
    return (
        <Box
            sx={{
                width: "26.0417vw",
                border: "1px solid #FFF",
                background:
                    "linear-gradient(90deg, #000 -20.03%, rgba(0, 0, 0, 0.00) 43.82%)",
                height: "100%",
                padding: "1.0417vw 1.5625vw",
            }}
        >
            <Text
                sx={{
                    fontSize: "1.25vw",
                }}
            >
                Vacant Member
            </Text>

            <SimpleGrid
                columns={4}
                sx={{
                    marginTop: "0.625vw",
                }}
            >
                {list.map((item: any) => {
                    return (
                        <Flex
                            align={"center"}
                            flexDir={"column"}
                            sx={{
                                width: "4.1667vw",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "4.1667vw",
                                    height: "4.1667vw",
                                    borderRadius: "1.0417vw",
                                    border: "1px solid #FFF",
                                    background: avatars[item.avatar],
                                }}
                            ></Box>
                            <Text
                                sx={{
                                    color: "#BCBBBE",
                                    fontSize: "0.8333vw",
                                }}
                            >
                                {item.name}
                            </Text>
                        </Flex>
                    );
                })}
            </SimpleGrid>
        </Box>
    );
};

export default Vacant;
