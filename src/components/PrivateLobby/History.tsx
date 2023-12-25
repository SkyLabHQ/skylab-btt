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
import React, { useState } from "react";
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

const GameStatus = () => {
    return (
        <Flex>
            <Image
                src={PairingIcon}
                sx={{
                    width: "24px",
                    marginLeft: "24px",
                }}
            ></Image>
        </Flex>
    );
};

const GameList = () => {
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
                {Array(10)
                    .fill(0)
                    .map((_, index) => {
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
                                                background: "#C96F9D",
                                            }}
                                        ></Box>

                                        <Text
                                            sx={{
                                                color: "#BCBBBE",
                                                fontSize: "16px",
                                            }}
                                        >
                                            Alhasit
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
                                                background: "#C96F9D",
                                            }}
                                        ></Box>

                                        <Text
                                            sx={{
                                                color: "#BCBBBE",
                                                fontSize: "16px",
                                            }}
                                        >
                                            Alhasit
                                        </Text>
                                    </Flex>
                                    <GameStatus></GameStatus>
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
            </SimpleGrid>
        </Box>
    );
};

const History = () => {
    const { onCopy } = useClipboard(window.location.href ?? "");

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
        const [gameHistory, onGameList] = await multiProvider.all([
            multiMercuryBTTPrivateLobby.getGameHistory(),
        ]);

        const p1 = [];
        for (let i = 0; i < queueList.length; i++) {
            const multiSkylabBidTacToeGameContract =
                getMultiSkylabBidTacToeGameContract(queueList[i]);
            p1.push(multiSkylabBidTacToeGameContract.player1());
        }

        for (let i = 0; i < onGameList.length; i++) {
            const multiSkylabBidTacToeGameContract =
                getMultiSkylabBidTacToeGameContract(onGameList[i]);
            p1.push(multiSkylabBidTacToeGameContract.player1());
            p1.push(multiSkylabBidTacToeGameContract.player2());
        }

        const playerAddresses = await multiProvider.all(p1);
        const p2 = playerAddresses.map((item) => {
            return multiMercuryBTTPrivateLobby.userInfo(item);
        });
        const userInfos = await multiProvider.all(p2);
        const queueUserList = queueList.map((item: any, index: number) => {
            return {
                address1: playerAddresses[index],
                gameAddress: item,
                avatar1: userInfos[index].avatar.toNumber() - 1,
                name1: userInfos[index].name,
            };
        });
        const onGameUserList = onGameList.map((item: any, index: number) => {
            const player1Index = index * 2 + queueList.length;
            const player2Index = index * 2 + queueList.length + 1;
            return {
                gameAddress: item,
                address1: playerAddresses[player1Index],
                avatar1: userInfos[player1Index].avatar.toNumber() - 1,
                name1: userInfos[player1Index].name,
                address2: playerAddresses[player2Index],
                avatar2: userInfos[player2Index].avatar.toNumber() - 1,
                name2: userInfos[player2Index].name,
            };
        });

        setQueueList(queueUserList);
        setOnGameList(onGameUserList);
        handleSetGameCount({
            allGameCount: (queueList.length + onGameList.length) * 2,
            inGameCount: queueList.length + onGameList.length * 2,
        });
    };
    return (
        <Box>
            <GameList></GameList>
            <LobbyInfo></LobbyInfo>
        </Box>
    );
};

export default History;
