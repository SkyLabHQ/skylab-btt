import {
    Box,
    Flex,
    Image,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Text,
} from "@chakra-ui/react";
import React from "react";
import GoldIcon from "@/assets/gold.svg";
import { UserMarkIcon, UserMarkType } from "@/skyConstants/bttGameTypes";
import AdvantageIcon from "@/assets/advantage-icon.svg";
import { Lose, Win } from "./ResultFlag";

const MBalance = ({
    balance,
    status = "my",
    mark,
    showAdvantageTip,
    showResult,
    win,
}: {
    balance: number;
    status?: "op" | "my";
    mark?: number;
    showAdvantageTip?: boolean;
    showResult?: boolean;
    win?: boolean;
}) => {
    const popoverDirection = status === "my" ? "right" : "left";

    return (
        <Flex
            align={"center"}
            flexDir={status === "my" ? "row" : "row-reverse"}
        >
            <Flex
                sx={{
                    width: "98px",
                    height: "24px",
                    borderRadius:
                        status == "my" ? "0 26px 26px 0" : "26px 0 0 26px",
                    background: "rgba(96, 96, 96, 1)",
                }}
                align={"center"}
            >
                <Image
                    src={GoldIcon}
                    sx={{
                        width: "36px",
                        margin: "0 6px",
                    }}
                ></Image>
                <Text
                    sx={{
                        fontSize: "20px",
                        color: "#fff",
                    }}
                >
                    {balance}
                </Text>
            </Flex>
            <Box
                sx={{
                    margin: status === "my" ? "0 0 0 10px" : "0 10px 0 0",
                }}
            >
                {mark === UserMarkType.Circle && (
                    <Image
                        width={"18px"}
                        height={"18px"}
                        src={UserMarkIcon.Circle}
                    ></Image>
                )}
                {mark === UserMarkType.Cross && (
                    <Image
                        width={"18px"}
                        height={"18px"}
                        src={UserMarkIcon.Cross}
                    ></Image>
                )}
            </Box>

            {showAdvantageTip && (
                <Popover placement={popoverDirection}>
                    <PopoverTrigger>
                        <Image
                            src={AdvantageIcon}
                            sx={{
                                cursor: "pointer",
                                marginTop: "-1.5625vw",
                                width: "1.6667vw",
                            }}
                        ></Image>
                    </PopoverTrigger>
                    <PopoverContent
                        sx={{
                            background: "#D9D9D9",
                            borderRadius: "0.5208vw",
                            border: "none",
                            color: "#000",
                            textAlign: "center",
                            "&:focus": {
                                outline: "none !important",
                                boxShadow: "none !important",
                            },
                        }}
                    >
                        <PopoverBody
                            sx={{
                                textAlign: "left",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: "0.8333vw",
                                }}
                            >
                                <span style={{ fontWeight: 600 }}>
                                    [Draw Advantage]
                                </span>
                                If your next bid equals to your opponent,
                                {status === "op"
                                    ? "your opponent will win the grid"
                                    : "your will win the grid."}
                            </Text>
                            <Text
                                style={{
                                    fontSize: "0.7292vw",
                                    marginTop: "1.0417vw",
                                }}
                            >
                                Draw advantage belongs to loser of the previous
                                grid. The first draw advantage of each game is
                                given randomly.
                            </Text>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            )}
            {showResult && (
                <Box
                    sx={{
                        margin: "0 10px",
                    }}
                >
                    {win ? <Win></Win> : <Lose></Lose>}
                </Box>
            )}
        </Flex>
    );
};

export default MBalance;
