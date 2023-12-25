import {
    Box,
    Flex,
    Text,
    Image,
    Button,
    SimpleGrid,
    useClipboard,
} from "@chakra-ui/react";
import PairingIcon from "./assets/pairing.svg";
import RightArrow from "./assets/right-arrow.svg";
import FriendIcon from "./assets/friend.svg";
import PlayBackIcon from "./assets/playback.svg";
import React, { useEffect, useState } from "react";
import LobbyInfo from "./LobbyInfo";
import { useBlockNumber } from "wagmi";
import { useNavigate } from "react-router-dom";
import useSkyToast from "@/hooks/useSkyToast";
import { usePrivateLobbyContext } from "@/pages/PrivateLobby";
import {
    getMultiSkylabBidTacToeGameContract,
    useMultiMercuryBTTPrivateLobby,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { useBttPrivateLobbyContract } from "@/hooks/useRetryContract";
import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import { useSCWallet } from "@/hooks/useSCWallet";
import { getPrivateLobbySigner } from "@/hooks/useSigner";
import avatars from "@/skyConstants/avatars";

const GameList = ({ list }: { list: any[] }) => {
    const { lobbyAddress } = usePrivateLobbyContext();

    const navigate = useNavigate();

    const handleToPlayBack = (item: any) => {
        navigate(
            `/btt/privatePlayback?lobbyAddress=${lobbyAddress}&gameAddress=${item.room}`,
        );
    };
    return (
        <Box
            sx={{
                padding: "20px",
                height: "594px",
                overflowY: "scroll",
                border: "1px solid #FFF",
                borderRadius: "20px",
                marginTop: "10px",
            }}
        >
            <SimpleGrid
                justifyContent={"space-between"}
                columns={2}
                spacingX={"110px"}
                spacingY={"20px"}
            >
                {list.map((item, index) => {
                    return (
                        <Box w="400px" key={index}>
                            <Flex align={"center"}>
                                <Flex
                                    sx={{}}
                                    direction={"column"}
                                    align={"center"}
                                >
                                    <Box
                                        sx={{
                                            width: "90px",
                                            height: "90px",
                                            borderRadius: "20px",
                                            border: "1px solid #FFF",
                                            position: "relative",

                                            background:
                                                avatars[item.loseUserAvatar],
                                        }}
                                    >
                                        <Flex
                                            sx={{
                                                position: "absolute",
                                                bottom: "10px",
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                width: "54px",
                                                height: "24px",
                                                borderRadius: "10px",
                                                background: "#D9D9D9",
                                                color: "#303030",
                                                fontSize: "16px",
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
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {item.loseUserName}
                                    </Text>
                                </Flex>
                                <Text
                                    sx={{
                                        fontSize: "24px",
                                        margin: "0 20px",
                                    }}
                                >
                                    VS
                                </Text>
                                <Flex
                                    sx={{
                                        marginRight: "24px",
                                    }}
                                    direction={"column"}
                                    align={"center"}
                                >
                                    <Box
                                        sx={{
                                            width: "90px",
                                            height: "90px",
                                            borderRadius: "20px",
                                            border: "1px solid #FFF",
                                            position: "relative",
                                            background:
                                                avatars[item.winUserAvatar],
                                        }}
                                    >
                                        {" "}
                                        <Flex
                                            sx={{
                                                position: "absolute",
                                                bottom: "10px",
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                width: "54px",
                                                height: "24px",
                                                borderRadius: "10px",
                                                background: "#FDDC2D",
                                                color: "#303030",
                                                fontSize: "16px",
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
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {item.winUserName}
                                    </Text>
                                </Flex>
                                <Image
                                    onClick={() => handleToPlayBack(item)}
                                    src={PlayBackIcon}
                                    sx={{
                                        width: "30px",
                                        marginLeft: "30px",
                                        cursor: "pointer",
                                    }}
                                ></Image>
                            </Flex>
                            <Box
                                sx={{
                                    height: "1px",
                                    marginTop: "12px",
                                    background:
                                        "linear-gradient(270deg, rgba(255, 255, 255, 0.00) 0%, #FFF 9.44%, rgba(255, 255, 255, 0.39) 85.56%, rgba(255, 255, 255, 0.00) 100%)",
                                }}
                            ></Box>
                        </Box>
                    );
                })}
            </SimpleGrid>
        </Box>
    );
};

const History = () => {
    const { onCopy } = useClipboard(window.location.href ?? "");

    const [list, setList] = useState([]);
    const [queueList, setQueueList] = useState([]);
    const [onGameList, setOnGameList] = useState([]);
    const navigate = useNavigate();
    const toast = useSkyToast();
    const [listLoading, setListLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const { lobbyAddress, handleSetGameCount, lobbyName, myGameCount } =
        usePrivateLobbyContext();

    const multiProvider = useMultiProvider(TESTFLIGHT_CHAINID);
    const bttPrivateLobbyContract = useBttPrivateLobbyContract(lobbyAddress);
    const localSinger = getPrivateLobbySigner();
    const { sCWAddress } = useSCWallet(localSinger.privateKey);

    const multiMercuryBTTPrivateLobby =
        useMultiMercuryBTTPrivateLobby(lobbyAddress);
    const handleGetGameList = async () => {
        const [gameHistory] = await multiProvider.all([
            multiMercuryBTTPrivateLobby.getGameHistory(),
        ]);

        const p: any = [];

        gameHistory.map((item: any) => {
            p.push(multiMercuryBTTPrivateLobby.userInfo(item.winnerBurner));
            p.push(multiMercuryBTTPrivateLobby.userInfo(item.loserBurner));
        });

        const userInfos = await multiProvider.all(p);

        console.log(gameHistory, "gameHistory");
        console.log(userInfos, "userInfos");
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
        console.log(list, "list");
    };

    useEffect(() => {
        handleGetGameList();
    }, []);

    return (
        <Box>
            <GameList list={list}></GameList>
            <LobbyInfo></LobbyInfo>
        </Box>
    );
};

export default History;
