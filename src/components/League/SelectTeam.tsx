import { Box, Flex, Text } from "@chakra-ui/react";
import Avatar from "../Avatar";
import leagueConfigList from "@/utils/league";

const SelectTeam = ({
    activeIndex,
    onActiveIndex,
}: {
    activeIndex: number;
    onActiveIndex: (index: number) => void;
}) => {
    return (
        <Box>
            <Text
                sx={{
                    textShadow: leagueConfigList[activeIndex].textShadow,
                    WebkitTextStrokeWidth: 2,
                    WebkitTextStrokeColor: leagueConfigList[activeIndex].color,
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
                    gap: "8px",
                    marginTop: "10px",
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
                                onActiveIndex(index);
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
    );
};
export default SelectTeam;
