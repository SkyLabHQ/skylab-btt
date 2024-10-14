import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import Line from "./assets/line.svg";
import { ReactComponent as LbIcon } from "@/assets/l-b.svg";
import { ReactComponent as RbIcon } from "@/assets/r-b.svg";
import { GameOverNewComer, Newcomer } from ".";
import Countdown from "react-countdown";

const renderer = ({
    formatted,
}: {
    formatted: {
        minutes: string;
        seconds: string;
    };
}) => {
    return (
        <Flex
            sx={{
                border: "1px solid #FFF",
                borderLeft: "none",
                borderRight: "none",
                flex: 1,
                fontSize: "36px",
                lineHeight: "1",
            }}
            align={"center"}
        >
            <span>
                {formatted.minutes}:{formatted.seconds}
            </span>
        </Flex>
    );
};

const Status = ({
    gameOverFlag,
    oldNewcomer,
    leagueConfig,
}: {
    oldNewcomer: Newcomer;
    leagueConfig: any;
    gameOverFlag: boolean;
}) => {
    return (
        <Flex
            sx={{
                position: "absolute",
                left: "50%",
                top: "0%",
                transform: "translate(-50%, 0)",
            }}
            flexDir={"column"}
            align={"center"}
        >
            <Image src={Line}></Image>
            <Flex
                sx={{
                    position: "relative",
                    width: "206px",
                    height: "55px",
                    border: "1px solid #fff",
                }}
                align={"center"}
                justify={"center"}
            >
                <LbIcon
                    style={{
                        position: "absolute",
                        left: "-2px",
                        top: "-2px",
                        width: "20px",
                    }}
                ></LbIcon>
                <RbIcon
                    style={{
                        position: "absolute",
                        right: "-2px",
                        bottom: "-2px",
                        width: "20px",
                    }}
                ></RbIcon>
                {gameOverFlag && (
                    <Text
                        sx={{
                            color: leagueConfig.color,
                            textAlign: "center",
                            fontFamily: "Quantico",
                            fontSize: "24px",
                            fontWeight: 700,
                        }}
                    >
                        GAME OVER
                    </Text>
                )}
            </Flex>
            {!gameOverFlag && oldNewcomer && (
                <Flex
                    sx={{
                        position: "relative",
                        width: "206px",
                        height: "50px",
                        border: "1px solid #FF2D2D",
                        background:
                            "linear-gradient(180deg, rgba(255, 45, 45, 0.50) 6.67%, rgba(255, 45, 45, 0.20) 100%)",
                        color: "#D9D9D9",
                        textAlign: "center",
                        fontFamily: "Quantico",
                        fontSize: "16px",
                    }}
                    align={"center"}
                    justify={"center"}
                >
                    <Text>
                        Shortest Timer Lvl.{" "}
                        <span
                            style={{
                                fontSize: "30px",
                            }}
                        >
                            1
                        </span>
                    </Text>

                    <Flex
                        sx={{
                            position: "absolute",
                            width: "100px",
                            height: "50px",
                            left: "100%",
                            top: "-8px",
                        }}
                        flexDir={"column"}
                    >
                        <Text
                            sx={{
                                textAlign: "center",
                                fontSize: "12px",
                                color: "#fff",
                            }}
                        >
                            COUNTDOWN
                        </Text>

                        <Countdown
                            zeroPadTime={2}
                            date={oldNewcomer.claimTIme * 1000}
                            renderer={renderer}
                        />
                    </Flex>
                </Flex>
            )}
        </Flex>
    );
};
export default Status;
