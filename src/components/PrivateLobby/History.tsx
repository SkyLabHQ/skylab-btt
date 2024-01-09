import {
    Box,
    Flex,
    Text,
    Image,
    SimpleGrid,
    useMediaQuery,
} from "@chakra-ui/react";
import PlayBackIcon from "./assets/playback.svg";
import React, { useEffect, useState } from "react";
import LobbyInfo from "./LobbyInfo";
import { useNavigate } from "react-router-dom";
import { usePrivateLobbyContext } from "@/pages/PrivateLobby";
import {
    useMultiMercuryBTTPrivateLobby,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import avatars from "@/skyConstants/avatars";
import Loading from "../Loading";

const GameList = ({ list, loading }: { list: any[]; loading: boolean }) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const { lobbyAddress } = usePrivateLobbyContext();

    const navigate = useNavigate();

    const handleToPlayBack = (item: any) => {
        navigate(
            `/btt/lobbyPlayback?lobbyAddress=${lobbyAddress}&gameAddress=${item.room}`,
        );
    };
    return (
        <Box
            sx={{
                padding: "20px",
                height: "100%",
                overflowY: "scroll",
                position: "relative",
            }}
        >
            {loading ? (
                <Loading></Loading>
            ) : (
                <SimpleGrid
                    justifyContent={"space-between"}
                    columns={isPc ? 2 : 1}
                    spacingX={"110px"}
                    spacingY={"20px"}
                >
                    {list.map((item, index) => {
                        return (
                            <Box w={isPc ? "400px" : "100%"} key={index}>
                                <Flex justify={"space-between"}>
                                    <Flex align={"center"}>
                                        <Flex
                                            sx={{}}
                                            direction={"column"}
                                            align={"center"}
                                        >
                                            <Box
                                                sx={{
                                                    width: isPc
                                                        ? "90px"
                                                        : "52px",
                                                    height: isPc
                                                        ? "90px"
                                                        : "52px",
                                                    borderRadius: isPc
                                                        ? "20px"
                                                        : "10px",
                                                    border: "1px solid #FFF",
                                                    position: "relative",

                                                    background:
                                                        avatars[
                                                            item.loseUserAvatar
                                                        ],
                                                }}
                                            >
                                                <Flex
                                                    sx={{
                                                        position: "absolute",
                                                        bottom: "0px",
                                                        left: "50%",
                                                        transform:
                                                            "translateX(-50%)",
                                                        borderRadius: "10px",
                                                        background: "#D9D9D9",
                                                        color: "#303030",
                                                        padding: "2px 4px",
                                                        fontSize: isPc
                                                            ? "16px"
                                                            : "12px",
                                                    }}
                                                    align={"center"}
                                                    justify={"center"}
                                                >
                                                    Lose
                                                </Flex>
                                            </Box>

                                            <Text
                                                sx={{
                                                    color: "#BCBBBE",
                                                    fontSize: isPc
                                                        ? "0.8333vw"
                                                        : "12px",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {item.loseUserName}
                                            </Text>
                                        </Flex>
                                        <Text
                                            sx={{
                                                fontSize: isPc
                                                    ? "24px"
                                                    : "20px",
                                                margin: isPc
                                                    ? "0 20px"
                                                    : "0 10px",
                                            }}
                                        >
                                            VS
                                        </Text>
                                        <Flex
                                            direction={"column"}
                                            align={"center"}
                                        >
                                            <Box
                                                sx={{
                                                    width: isPc
                                                        ? "90px"
                                                        : "52px",
                                                    height: isPc
                                                        ? "90px"
                                                        : "52px",
                                                    borderRadius: isPc
                                                        ? "20px"
                                                        : "10px",
                                                    border: "1px solid #FFF",
                                                    position: "relative",
                                                    background:
                                                        avatars[
                                                            item.winUserAvatar
                                                        ],
                                                }}
                                            >
                                                {" "}
                                                <Flex
                                                    sx={{
                                                        position: "absolute",
                                                        bottom: "0px",
                                                        left: "50%",
                                                        transform:
                                                            "translateX(-50%)",
                                                        borderRadius: "10px",
                                                        background: "#FDDC2D",
                                                        color: "#303030",
                                                        padding: "2px 4px",
                                                        fontSize: isPc
                                                            ? "16px"
                                                            : "12px",
                                                    }}
                                                    align={"center"}
                                                    justify={"center"}
                                                >
                                                    Win
                                                </Flex>
                                            </Box>

                                            <Text
                                                sx={{
                                                    color: "#BCBBBE",
                                                    fontSize: isPc
                                                        ? "0.8333vw"
                                                        : "12px",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {item.winUserName}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                    <Image
                                        onClick={() => handleToPlayBack(item)}
                                        src={PlayBackIcon}
                                        sx={{
                                            width: isPc ? "1.5625vw" : "30px",
                                            marginRight: isPc
                                                ? "1.5625vw"
                                                : "30px",
                                            cursor: "pointer",
                                        }}
                                    ></Image>
                                </Flex>

                                <Box
                                    sx={{
                                        height: "1px",
                                        marginTop: isPc ? "0.625vw" : "12px",
                                        background:
                                            "linear-gradient(270deg, rgba(255, 255, 255, 0.00) 0%, #FFF 9.44%, rgba(255, 255, 255, 0.39) 85.56%, rgba(255, 255, 255, 0.00) 100%)",
                                    }}
                                ></Box>
                            </Box>
                        );
                    })}
                </SimpleGrid>
            )}
        </Box>
    );
};

const History = () => {
    const [list, setList] = useState([]);
    const { lobbyAddress } = usePrivateLobbyContext();
    const [loading, setLoading] = useState(false);
    const multiProvider = useMultiProvider(TESTFLIGHT_CHAINID);

    const multiMercuryBTTPrivateLobby =
        useMultiMercuryBTTPrivateLobby(lobbyAddress);
    const handleGetGameList = async () => {
        setLoading(true);
        const [gameHistory] = await multiProvider.all([
            multiMercuryBTTPrivateLobby.getGameHistory(),
        ]);

        const p: any = [];

        gameHistory.map((item: any) => {
            p.push(multiMercuryBTTPrivateLobby.userInfo(item.winnerBurner));
            p.push(multiMercuryBTTPrivateLobby.userInfo(item.loserBurner));
        });

        const userInfos = await multiProvider.all(p);

        const list = gameHistory.map((item: any, index: number) => {
            return {
                winUserName: userInfos[index * 2].name,
                winUserAvatar: userInfos[index * 2].avatar.toNumber() - 1,
                loseUserName: userInfos[index * 2 + 1].name,
                loseUserAvatar: userInfos[index * 2 + 1].avatar.toNumber() - 1,
                winBurner: item.winnerBurner,
                loseBurner: item.loserBurner,
                room: item.room,
            };
        });

        setList(list);
        setLoading(false);
    };

    useEffect(() => {
        handleGetGameList();
    }, []);

    return <GameList loading={loading} list={list}></GameList>;
};

export default History;
