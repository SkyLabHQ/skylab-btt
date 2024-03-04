import { Box, Image, Flex, Text, Input } from "@chakra-ui/react";
import React, { useMemo } from "react";
import LeftArrow from "./assets/left-arrow.png";
import { shortenAddress } from "@/utils";
import CopyIcon from "@/assets/copy-icon.svg";
import { usePrivy } from "@privy-io/react-auth";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import DeafaultIcon from "./assets/default-icon.png";
import UnkonwPilot from "./assets/unknow-pilot.png";
import ExchangeIcon from "./assets/exchange.png";
import { useChainId } from "wagmi";
import AllPilotList from "@/skyConstants/pilots";
import OpenSeaLink from "./assets/opensea-link.svg";

const SetPilot = ({
    onChangeMode,
}: {
    onChangeMode: (mode: number) => void;
}) => {
    const chainId = useChainId();
    const pilotList = useMemo(() => {
        if (!chainId) {
            return [];
        }
        return AllPilotList[chainId];
    }, [chainId]);

    return (
        <Flex
            sx={{
                height: "100%",
                paddingBottom: "20px",
            }}
            flexDir={"column"}
            justifyContent={"space-between"}
        >
            <Box>
                <Flex
                    align={"center"}
                    sx={{
                        height: "30px",
                    }}
                >
                    <Image
                        onClick={() => onChangeMode(0)}
                        src={LeftArrow}
                        sx={{
                            width: "24px",
                        }}
                    ></Image>
                </Flex>
                <Flex flexDir={"column"} align={"center"}>
                    <Flex align={"center"}>
                        <Image
                            src={DeafaultIcon}
                            sx={{
                                width: "78px",
                            }}
                        ></Image>
                        <Image
                            src={ExchangeIcon}
                            sx={{
                                width: "36px",
                                margin: "0 16px",
                            }}
                        ></Image>
                        <Image
                            src={UnkonwPilot}
                            sx={{
                                width: "78px",
                            }}
                        ></Image>
                    </Flex>

                    <Text
                        sx={{
                            fontSize: "16px",
                            marginTop: "20px",
                            fontFamily: "Orbitron",
                        }}
                    >
                        Select Pilot from these collections
                    </Text>
                </Flex>
                <Box
                    sx={{
                        marginTop: "40px",
                    }}
                >
                    {pilotList.length > 0 &&
                        pilotList.map((item: any) => {
                            return (
                                <Flex
                                    align={"center"}
                                    justify={"space-between"}
                                    sx={{
                                        border: "2px solid #fff",
                                        marginBottom: "15px",
                                        borderRadius: "10px",
                                        padding: "6px 12px",
                                        background: "rgba(0, 0, 0, 0.50)",
                                    }}
                                >
                                    <Flex align={"center"}>
                                        <Image
                                            src={item.img}
                                            sx={{
                                                width: "54px",
                                                height: "54px",
                                                borderRadius: "10px",
                                                border: "2px solid #fff",
                                                marginRight: "22px",
                                            }}
                                        ></Image>
                                        <Text
                                            sx={{
                                                fontSize: "20px",
                                            }}
                                        >
                                            {item.name}
                                        </Text>
                                    </Flex>

                                    <Image
                                        sx={{
                                            borderRadius: "40px",
                                            width: "76px",
                                        }}
                                        src={OpenSeaLink}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();

                                            // window.open(openSeaUrl, "_blank");
                                        }}
                                    ></Image>
                                </Flex>
                            );
                        })}
                </Box>
            </Box>

            <Box>
                <Flex
                    align={"center"}
                    justify={"center"}
                    sx={{
                        background: "#F2D861",
                        height: "64px",
                        width: "280px",
                        borderRadius: "24px",
                        fontSize: "28px",
                        fontWeight: 700,
                        color: "#1b1b1b",
                        margin: "0 auto",
                        backdropFilter: "blur(6.795704364776611px)",
                        fontFamily: "Orbitron",
                    }}
                >
                    Preview
                </Flex>
                <Flex
                    align={"center"}
                    justify={"center"}
                    sx={{
                        background: "#F2D861",
                        height: "64px",
                        width: "280px",
                        borderRadius: "24px",
                        fontSize: "28px",
                        fontWeight: 700,
                        color: "#1b1b1b",
                        margin: "28px auto 0",
                        backdropFilter: "blur(6.795704364776611px)",
                        fontFamily: "Orbitron",
                    }}
                >
                    Set Active
                </Flex>
            </Box>
        </Flex>
    );
};
export default SetPilot;
