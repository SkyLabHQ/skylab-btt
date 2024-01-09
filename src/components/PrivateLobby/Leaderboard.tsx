import { Box, Flex, Text, Image, useMediaQuery } from "@chakra-ui/react";
import Medal1 from "@/assets/medal1.svg";
import Medal2 from "@/assets/medal2.svg";
import Medal3 from "@/assets/medal3.svg";

import React, { useEffect, useState } from "react";
import LobbyInfo from "./LobbyInfo";
import {
    useMultiMercuryBTTPrivateLobby,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { usePrivateLobbyContext } from "@/pages/PrivateLobby";
import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import avatars from "@/skyConstants/avatars";
import Loading from "../Loading";

const Top3Item = ({ detail }: { detail: any }) => {
    const { avatar, rank, name, win, game } = detail;
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Flex align={"flex-end"}>
            <Box
                sx={{
                    position: "relative",
                    marginRight: "10px",
                }}
            >
                <Box
                    sx={{
                        width: isPc ? "90px" : "40px",
                        height: isPc ? "90px" : "40px",
                        background: avatars[avatar],
                        border: "1px solid #FFF",
                        borderRadius: isPc ? "20px" : "4px",
                    }}
                ></Box>
                <Image
                    src={rank === 1 ? Medal1 : rank === 2 ? Medal2 : Medal3}
                    sx={{
                        position: "absolute",
                        top: isPc ? "-10px" : "-5px",
                        right: "0",
                        width: isPc ? "40px" : "20px",
                        transform: "translateX(50%)",
                    }}
                ></Image>
            </Box>
            <Box
                sx={{
                    background:
                        rank === 1
                            ? "var(--champion, linear-gradient(257deg, #FDCE49 61.28%, #EBD85B 64.38%, #FFF 68.02%, #FFF 70.38%, #FDCE49 81.84%))"
                            : rank === 2
                            ? "linear-gradient(180deg, #8EB4BD 0%, #FFF 100%)"
                            : "linear-gradient(180deg, #C96F9D 0%, #FFF 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                <Text sx={{ fontSize: isPc ? "16px" : "12px" }}>{name}</Text>
                <Text
                    sx={{
                        fontSize: isPc ? "16px" : "12px",
                    }}
                >
                    Win {win}/Game {game}
                </Text>
            </Box>
        </Flex>
    );
};

const GameList = ({ list }: { list: any[] }) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Box sx={{ marginTop: "40px" }}>
            {list.map((item, index) => {
                return (
                    <Box
                        key={index}
                        sx={{
                            height: isPc ? "4.0625vw" : "40px",
                        }}
                    >
                        <Flex align={"center"} justify={"space-between"}>
                            <Flex align={"center"}>
                                <Text
                                    sx={{
                                        fontSize: isPc ? "0.8333vw" : "16px",
                                        width: isPc ? "100px" : "50px",
                                    }}
                                >
                                    {index + 4}
                                </Text>
                                <Flex sx={{}} align={"center"}>
                                    <Box
                                        sx={{
                                            width: isPc ? "70px" : "32px",
                                            height: isPc ? "70px" : "32px",
                                            borderRadius: isPc
                                                ? "20px"
                                                : "10px",
                                            border: "1px solid #FFF",
                                            background: "#C96F9D",
                                            marginRight: "12px",
                                        }}
                                    ></Box>
                                    <Text
                                        sx={{
                                            color: "#BCBBBE",
                                            fontSize: isPc
                                                ? "0.8333vw"
                                                : "16px",
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                </Flex>
                            </Flex>

                            <Flex>
                                <Text
                                    sx={{
                                        fontSize: isPc ? "0.8333vw" : "16px",
                                    }}
                                >
                                    {item.win} win/ {item.game} games
                                </Text>
                            </Flex>
                        </Flex>
                        <Box
                            sx={{
                                height: "1px",
                                background:
                                    "linear-gradient(270deg, rgba(255, 255, 255, 0.00) 0%, #FFF 9.44%, rgba(255, 255, 255, 0.39) 85.56%, rgba(255, 255, 255, 0.00) 100%)",
                            }}
                        ></Box>
                    </Box>
                );
            })}
        </Box>
    );
};

const Leaderboard = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [list, setList] = useState<any[]>([]);
    const { lobbyAddress } = usePrivateLobbyContext();
    const [loading, setLoading] = useState<boolean>(false);
    const multiProvider = useMultiProvider(TESTFLIGHT_CHAINID);

    const multiMercuryBTTPrivateLobby =
        useMultiMercuryBTTPrivateLobby(lobbyAddress);
    const handleGetGameList = async () => {
        setLoading(true);
        const [players] = await multiProvider.all([
            multiMercuryBTTPrivateLobby.getPlayers(),
        ]);

        const p = [];

        for (let i = 0; i < players.length; i++) {
            p.push(multiMercuryBTTPrivateLobby.winCountPerPlayer(players[i]));
            p.push(multiMercuryBTTPrivateLobby.loseCountPerPlayer(players[i]));
            p.push(multiMercuryBTTPrivateLobby.userInfo(players[i]));
        }

        const counts = await multiProvider.all(p);

        const playersCounts = players
            .map((player: string, index: number) => {
                return {
                    address: player,
                    win: counts[index * 3].toNumber(),
                    lose: counts[index * 3 + 1].toNumber(),
                    avatar: counts[index * 3 + 2].avatar.toNumber() - 1,
                    name: counts[index * 3 + 2].name,
                };
            })
            .filter((item: any) => {
                return item.avatar !== -1;
            })
            .sort((a: any, b: any) => {
                return b.win - a.win;
            });

        setList(playersCounts);
        setLoading(false);
    };

    useEffect(() => {
        handleGetGameList();
    }, []);

    return (
        <Box
            sx={{
                overflow: "scroll",
                position: "relative",
                height: "100%",
                padding: isPc ? "70px 0 0" : "20px 18px",
            }}
        >
            {loading ? (
                <Loading></Loading>
            ) : (
                <Box
                    sx={{
                        width: isPc ? "36.4583vw" : "100%",
                        margin: "0 auto",
                    }}
                >
                    {list?.[0] && (
                        <Flex justify={"center"}>
                            <Top3Item
                                detail={{
                                    avatar: list[0].avatar,
                                    name: list[0].name,
                                    win: list[0].win,
                                    game: list[0].win + list[0].lose,
                                    rank: 1,
                                }}
                            ></Top3Item>
                        </Flex>
                    )}
                    <Flex
                        justify={"space-between"}
                        sx={{
                            marginTop: isPc ? "5.2083vw" : "42px",
                        }}
                    >
                        {list?.[1] && (
                            <Top3Item
                                detail={{
                                    avatar: list[1].avatar,
                                    name: list[1].name,
                                    win: list[1].win,
                                    game: list[1].win + list[1].lose,
                                    rank: 2,
                                }}
                            ></Top3Item>
                        )}
                        {list?.[2] && (
                            <Top3Item
                                detail={{
                                    avatar: list?.[2].avatar,
                                    name: list?.[2].name,
                                    win: list?.[2].win,
                                    game: list?.[2].win + list[2].lose,
                                    rank: 3,
                                }}
                            ></Top3Item>
                        )}
                    </Flex>
                    <GameList list={list.slice(3)}></GameList>
                </Box>
            )}
        </Box>
    );
};

export default Leaderboard;
