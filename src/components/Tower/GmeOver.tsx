import leagueConfigList from "@/utils/league";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { GameOverNewComer } from ".";
import { useMemo } from "react";
import EthIcon from "./assets/eth.svg";
import { LButton } from "../Button/Index";
import EnterIcon from "@/assets/enter.svg";
import { useUserInfo } from "@/contexts/UserInfo";
import { formatAmount } from "@/utils/formatBalance";

const GameOver = ({
    leagueConfig,
    onClaimReward,
    reward,
}: {
    leagueConfig: any;
    onClaimReward: () => void;
    reward: string;
}) => {
    const { address } = useUserInfo();

    return (
        <Flex sx={{}} flexDir={"column"} align={"center"} justify={"center"}>
            <Text
                sx={{
                    color: "#F2D861",
                    textAlign: "center",
                    fontSize: "34px",
                }}
            >
                Congratulations!
            </Text>
            <Text
                sx={{
                    textShadow: leagueConfig.textShadow,
                    WebkitTextStrokeWidth: 2,
                    WebkitTextStrokeColor: leagueConfig.color,
                    fontFamily: "Quantico",
                    fontStyle: "normal",
                    fontWeight: 700,
                    color: "#000",
                    textAlign: "center",
                    lineHeight: 1,
                    fontSize: "46px",
                    marginTop: "10px",
                }}
            >
                {leagueConfig.name}
            </Text>
            <Text
                sx={{
                    fontSize: "96px",
                    fontWeight: 700,
                    textShadow: leagueConfig.textShadow,
                    WebkitTextStrokeWidth: 2,
                    WebkitTextStrokeColor: leagueConfig.color,
                    fontFamily: "Quantico",
                    lineHeight: 1,
                    color: "#000",
                    textAlign: "center",
                }}
            >
                WIN!
            </Text>
            <Image
                src={""}
                sx={{
                    width: "200px",
                    height: "200px",
                }}
            ></Image>

            {address && (
                <>
                    <Text
                        sx={{
                            fontSize: "20px",
                            fontWeight: 900,
                            marginTop: "20px",
                        }}
                    >
                        REWARDS
                    </Text>
                    <Flex align={"center"}>
                        <Image
                            src={EthIcon}
                            sx={{
                                width: "20px",
                                marginRight: "10px",
                            }}
                        ></Image>
                        <Text
                            sx={{
                                color: "#FFF",
                                textAlign: "center",
                                fontFamily: "Quantico",
                                fontSize: "40px",
                                fontStyle: "normal",
                                fontWeight: 700,
                            }}
                        >
                            {formatAmount(reward)}
                        </Text>
                    </Flex>
                    <LButton
                        sx={{
                            width: "190px",
                            height: "46px",
                        }}
                        onClick={onClaimReward}
                    >
                        <Image
                            src={EnterIcon}
                            sx={{
                                width: "12px",
                                marginRight: "10px",
                            }}
                        ></Image>
                        <Text
                            sx={{
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 700,
                            }}
                        >
                            Claim
                        </Text>
                    </LButton>
                </>
            )}
        </Flex>
    );
};

export default GameOver;
