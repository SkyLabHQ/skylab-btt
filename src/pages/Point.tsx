import Nest from "@/components/Nest";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import React, { useEffect } from "react";
import LineBg from "@/assets/line.png";
import { Toolbar } from "@/components/TacToeMode/Toolbar";
import PointIcon from "@/assets/point.svg";
import { BackWithText } from "@/components/Back";
import { useNavigate } from "react-router-dom";
import {
    useMultiPointContract,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { DEAFAULT_CHAINID } from "@/utils/web3Utils";
import { shortenAddress } from "@/utils";
import useSkyMediaQuery from "@/hooks/useSkyMediaQuery";

const Point = () => {
    const navigate = useNavigate();
    const [isPc] = useSkyMediaQuery("(min-width: 800px)");
    const multiProvider = useMultiProvider(DEAFAULT_CHAINID);
    const multiPointContract = useMultiPointContract();
    const [list, setList] = React.useState([]);

    const handleGetPointList = async () => {
        const [result] = await multiProvider.all([
            multiPointContract.pointList(),
        ]);

        const pointList = result[1];
        const addressList = result[0];
        const list = addressList.map((address: string, index: number) => {
            return {
                point: pointList[index].toString(),
                address,
            };
        });

        setList(list);
    };

    useEffect(() => {
        if (!multiPointContract || !multiProvider) return;

        handleGetPointList();
    }, [multiProvider, multiPointContract]);

    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                }}
            >
                <BackWithText
                    onClick={() => {
                        navigate("/btt");
                    }}
                    textContent="Back"
                ></BackWithText>
            </Box>
            <Toolbar></Toolbar>
            <Box
                sx={{
                    maxWidth: "800px",
                    width: "100%",
                    margin: "0 auto",
                    height: "100%",
                    padding: "10vh 40px 0",
                }}
            >
                <Flex
                    sx={{
                        width: "100%",
                        padding: "0 20px",
                    }}
                    align={"center"}
                >
                    <Box
                        sx={{
                            flex: 1,
                            height: "3px",
                            background: `url(${LineBg})`,
                        }}
                    ></Box>
                    <Text
                        sx={{
                            fontSize: isPc ? "30px" : "16px",
                            fontWeight: 700,
                            WebkitTextStrokeWidth: 1,
                            WebkitTextStrokeColor: "#FDDC2D",
                            textAlign: "center",
                            margin: "0 10px",
                            fontFamily: "Orbitron",
                        }}
                    >
                        Points Leaderboard
                    </Text>
                    <Box
                        sx={{
                            flex: 1,
                            height: "3px",
                            background: `url(${LineBg})`,
                        }}
                    ></Box>
                </Flex>
                <Flex
                    sx={{
                        gap: isPc ? "20px" : "12px",
                        marginTop: isPc ? "40px" : "18px",
                        overflow: "auto",
                        height: isPc
                            ? "calc(100% - 100px)"
                            : "calc(100% - 60px)",
                        padding: isPc ? "0 10px" : "0 5px",
                        "&::-webkit-scrollbar-thumb": {
                            background: "#8C8C8C",
                            margin: "10px",
                            borderRadius: "10px",
                        },
                        "::-webkit-scrollbar": {
                            width: "8px",
                        },
                        "&::-webkit-scrollbar-track": {
                            display: "none",
                        },
                    }}
                    flexDir={"column"}
                >
                    {list.map((item, index) => {
                        let color = "#FFF";
                        if (index === 0) {
                            color = "#FF7246";
                        } else if (index === 1) {
                            color = "#F2D861";
                        } else if (index === 2) {
                            color = "#57BA35";
                        }

                        return (
                            <Flex
                                key={index}
                                sx={{
                                    background: "#4E4E4E",
                                    borderRadius: "16px",
                                    height: isPc ? "100px" : "38px",
                                }}
                            >
                                <Flex
                                    align={"center"}
                                    justify={"center"}
                                    sx={{
                                        width: isPc ? "100px" : "38px",
                                        height: isPc ? "100px" : "38px",
                                        color: color,
                                        textAlign: "center",
                                        fontFamily: "Anton",
                                        fontSize: isPc ? "40px" : "20px",
                                        borderRight: "1px solid #1B1B1B",
                                        fontWeight: 700,
                                    }}
                                >
                                    {index + 1}
                                </Flex>
                                <Flex
                                    justify={"space-between"}
                                    sx={{
                                        flex: 1,
                                        padding: isPc
                                            ? "0 20px 0 44px"
                                            : "0 16px 0 14px",
                                    }}
                                >
                                    <Flex align={"center"}>
                                        <Box
                                            sx={{
                                                border: "1px solid #FFF",
                                                background: "#FF7246",
                                                width: isPc ? "42px" : "18px",
                                                height: isPc ? "42px" : "18px",
                                                borderRadius: "50%",
                                                marginRight: isPc
                                                    ? "10px"
                                                    : "6px",
                                            }}
                                        ></Box>
                                        <Text
                                            sx={{
                                                fontFamily: "Quantico",
                                                fontSize: isPc
                                                    ? "20px"
                                                    : "12px",
                                            }}
                                        >
                                            {shortenAddress(item.address)}
                                        </Text>
                                    </Flex>
                                    <Flex align={"center"}>
                                        <Image
                                            src={PointIcon}
                                            sx={{
                                                width: isPc ? "30px" : "10px",
                                                marginRight: isPc
                                                    ? "10px"
                                                    : "4px",
                                            }}
                                        ></Image>
                                        <Text
                                            sx={{
                                                fontFamily: "Quantico",
                                                fontSize: isPc
                                                    ? "30px"
                                                    : "12px",
                                                fontWeight: 700,
                                            }}
                                        >
                                            {item.point}
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        );
                    })}
                </Flex>
            </Box>

            <Nest></Nest>
        </Box>
    );
};
export default Point;
