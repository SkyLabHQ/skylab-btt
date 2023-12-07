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
import React, { useEffect, useState } from "react";
import { usePrivateLobbyContext } from "@/pages/PrivateLobby";
import {
    getMultiSkylabBidTacToeGameContract,
    useMultiMercuryBTTPrivateLobby,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import { useBttPrivateLobbyContract } from "@/hooks/useRetryContract";
import LobbyInfo from "./LobbyInfo";
import Loading from "../Loading";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import avatars from "@/skyConstants/avatars";
import { useNavigate } from "react-router-dom";
import { getPrivateLobbySigner } from "@/hooks/useSigner";
import { useSCWallet } from "@/hooks/useSCWallet";
import { useBlockNumber } from "@/contexts/BlockNumber";

const ListBorder = () => {
    return (
        <Box
            sx={{
                height: "1px",
                background:
                    "linear-gradient(270deg, rgba(255, 255, 255, 0.00) 0%, #FFF 9.44%, rgba(255, 255, 255, 0.39) 85.56%, rgba(255, 255, 255, 0.00) 100%)",
            }}
        ></Box>
    );
};

const GameButton = ({
    label,
    onClick,
}: {
    label: string;
    onClick?: () => void;
}) => {
    return (
        <Flex
            onClick={onClick}
            align={"center"}
            justify={"space-between"}
            sx={{
                width: "9.4792vw",
                height: "2.1875vw",
                fontSize: "1.25vw",
                borderRadius: "0.5208vw",
                border: "2px solid #303030",
                padding: "0 0.5208vw",
                color: "#303030",
                cursor: "pointer",
                background:
                    "linear-gradient(95deg, #BCBBBE 0.99%, #FFF 0.99%, #D7C878 46.9%, rgba(216, 209, 169, 0.49) 68.71%, #FFF 104.68%)",
            }}
        >
            <Text>{label}</Text>
            <Image src={RightArrow}></Image>
        </Flex>
    );
};

const Header = ({
    gameCount,
    onStartGame,
}: {
    onStartGame: () => void;
    gameCount: {
        winCount: number;
        loseCount: number;
    };
}) => {
    const { avatarIndex, nickname } = usePrivateLobbyContext();

    return (
        <Flex
            sx={{
                height: "6.5104vw",
                borderRadius: "1.0417vw 1.0417vw 0 0",
                background:
                    "linear-gradient(180deg, #303030 0%, rgba(120, 120, 120, 0.30) 100%)",
                padding: "0 1.0417vw",
                borderBottom: "1px solid #FFF",
            }}
            align={"center"}
            justify={"space-between"}
        >
            <Flex align={"center"}>
                <Box
                    sx={{
                        border: "1px solid #FDDC2D",
                        padding: "0.1563vw",
                        width: "5vw",
                        height: "5vw",
                        borderRadius: "1.1458vw",
                        marginRight: "1.25vw",
                    }}
                >
                    <Box
                        sx={{
                            background: avatars[avatarIndex],
                            height: "100%",
                            width: "100%",
                            borderRadius: "1.0417vw",
                        }}
                    ></Box>
                </Box>
                <Text
                    sx={{
                        fontSize: "1.25vw",
                        fontWeight: 700,
                        marginRight: "5.2083vw",
                        color: "#FDDC2D",
                    }}
                >
                    {nickname}
                </Text>
                <Text
                    sx={{
                        fontSize: "1.25vw",
                        color: "#FDDC2D",
                    }}
                >
                    {gameCount.winCount} win/{" "}
                    {gameCount.winCount + gameCount.loseCount} games
                </Text>
            </Flex>
            <GameButton
                label="Start Game"
                onClick={() => {
                    onStartGame();
                }}
            ></GameButton>
        </Flex>
    );
};
enum GameStatusEnum {
    pairing = "Pairing",
    inGame = "In-game",
}

const GameStatus = ({ type }: { type: GameStatusEnum }) => {
    return (
        <Flex>
            <Image
                src={PairingIcon}
                sx={{
                    width: "1.25vw",
                    marginRight: "0.2083vw",
                }}
            ></Image>
            <Text
                sx={{
                    fontSize: "1.25vw",
                    marginRight: "0.5208vw",
                }}
            >
                {type}
            </Text>
        </Flex>
    );
};

const ListUserProfile = ({
    avatar,
    name,
}: {
    avatar: number;
    name: string;
}) => {
    return (
        <Flex sx={{}} direction={"column"} align={"center"}>
            <Box
                sx={{
                    width: "4.6875vw",
                    height: "4.6875vw",
                    borderRadius: "1.0417vw",
                    border: "1px solid #FFF",
                    background: avatars[avatar],
                }}
            ></Box>

            <Text
                sx={{
                    color: "#BCBBBE",
                    fontSize: "0.8333vw",
                }}
            >
                {name}
            </Text>
        </Flex>
    );
};

const QueueItem = ({
    detail,
    onButtonClick,
}: {
    detail: any;
    onButtonClick: () => void;
}) => {
    return (
        <Box w="100%">
            <Flex align={"center"}>
                <ListUserProfile
                    name={detail.name1}
                    avatar={detail.avatar1}
                ></ListUserProfile>
                <Text
                    sx={{
                        fontSize: "1.25vw",
                        margin: "0 1.0417vw",
                    }}
                >
                    VS
                </Text>
                <Flex
                    sx={{
                        marginRight: "1.25vw",
                    }}
                    direction={"column"}
                    align={"center"}
                >
                    <Box
                        sx={{
                            width: "4.6875vw",
                            height: "4.6875vw",
                            borderRadius: "1.0417vw",
                            border: "1px solid #787878",
                            background: "transparent",
                        }}
                    ></Box>

                    <Text
                        sx={{
                            color: "#BCBBBE",
                            fontSize: "0.8333vw",
                        }}
                    >
                        ...
                    </Text>
                </Flex>
                <GameStatus type={GameStatusEnum.pairing}></GameStatus>
                <GameButton
                    label="Join Game"
                    onClick={onButtonClick}
                ></GameButton>
            </Flex>
            <ListBorder></ListBorder>
        </Box>
    );
};

const OnGameItem = ({
    detail,
    onButtonClick,
}: {
    detail: any;
    onButtonClick: () => void;
}) => {
    return (
        <Box w="100%">
            <Flex align={"center"}>
                <ListUserProfile
                    name={detail.name1}
                    avatar={detail.avatar1}
                ></ListUserProfile>
                <Text
                    sx={{
                        fontSize: "1.25vw",
                        margin: "0 1.0417vw",
                    }}
                >
                    VS
                </Text>
                <ListUserProfile
                    name={detail.name2}
                    avatar={detail.avatar2}
                ></ListUserProfile>
                <GameStatus type={GameStatusEnum.inGame}></GameStatus>
                <GameButton label="Watch" onClick={onButtonClick}></GameButton>
            </Flex>
            <ListBorder></ListBorder>
        </Box>
    );
};

const GameList = ({
    queueList,
    onGameList,
    loading,
    onJoinGame,
    onWatchGame,
}: {
    queueList: any;
    onGameList: any;
    loading: boolean;
    onJoinGame: (gameAddress: string) => void;
    onWatchGame: (gameAddress: string) => void;
}) => {
    return (
        <Box
            sx={{
                padding: "1.0417vw",
                display: "flex",
                flexWrap: "wrap",
                height: "24.375vw",
                overflowY: "scroll",
                position: "relative",
            }}
        >
            {loading ? (
                <Loading></Loading>
            ) : (
                <SimpleGrid
                    columns={2}
                    spacingX={"5.2083vw"}
                    spacingY={"1.0417vw"}
                    sx={{
                        height: "100%",
                    }}
                >
                    {queueList.map((item: any, index: number) => {
                        return (
                            <QueueItem
                                key={index}
                                detail={item}
                                onButtonClick={() => {
                                    onJoinGame(item.gameAddress);
                                }}
                            ></QueueItem>
                        );
                    })}
                    {onGameList.map((item: any, index: number) => {
                        return (
                            <OnGameItem
                                key={index}
                                detail={item}
                                onButtonClick={() => {
                                    onWatchGame(item.gameAddress);
                                }}
                            ></OnGameItem>
                        );
                    })}
                </SimpleGrid>
            )}
        </Box>
    );
};

const Games = () => {
    const { onCopy } = useClipboard(window.location.href ?? "");

    const { blockNumber } = useBlockNumber();
    const [queueList, setQueueList] = useState([]);
    const [onGameList, setOnGameList] = useState([]);
    const navigate = useNavigate();
    const toast = useSkyToast();
    const [listLoading, setListLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const { lobbyAddress, handleSetGameCount, lobbyName } =
        usePrivateLobbyContext();
    const [myGameCount, setMyGameCount] = useState({
        winCount: 0,
        loseCount: 0,
    });
    const multiProvider = useMultiProvider(TESTFLIGHT_CHAINID);
    const bttPrivateLobbyContract = useBttPrivateLobbyContract(lobbyAddress);
    const localSinger = getPrivateLobbySigner();
    const { sCWAddress } = useSCWallet(localSinger.privateKey);

    const multiMercuryBTTPrivateLobby =
        useMultiMercuryBTTPrivateLobby(lobbyAddress);

    const handleGetUserGameCount = async () => {
        const [winCount, loseCount] = await multiProvider.all([
            multiMercuryBTTPrivateLobby.winCountPerPlayer(sCWAddress),
            multiMercuryBTTPrivateLobby.loseCountPerPlayer(sCWAddress),
        ]);

        setMyGameCount({
            winCount: winCount.toNumber(),
            loseCount: loseCount.toNumber(),
        });
    };

    const handleStartGame = async () => {
        if (loading) {
            return;
        }

        const privateLobbySigner = getPrivateLobbySigner();
        try {
            setLoading(true);
            await bttPrivateLobbyContract(
                "createRoom",
                [[3, 3, 3, 100, 1, 0, false]],
                {
                    usePaymaster: true,
                    signer: privateLobbySigner,
                },
            );

            const [queueList] = await multiProvider.all([
                multiMercuryBTTPrivateLobby.getLobbyGameQueue(),
            ]);

            const p1 = queueList.map((item: any) => {
                const multiSkylabBidTacToeGameContract =
                    getMultiSkylabBidTacToeGameContract(item);
                return multiSkylabBidTacToeGameContract.player1();
            });

            const playerAddresses = await multiProvider.all(p1);
            const p2 = playerAddresses.map((item) => {
                return multiMercuryBTTPrivateLobby.userInfo(item);
            });
            const userInfos = await multiProvider.all(p2);
            const queueUserList = queueList.map((item: any, index: number) => {
                return {
                    address: playerAddresses[index],
                    gameAddress: item,
                    avatar: userInfos[index].avatar.toNumber() - 1,
                    name: userInfos[index].name,
                };
            });

            const isOnGame = queueUserList.find((item: any) => {
                return item.address === sCWAddress;
            });

            if (isOnGame) {
                navigate(
                    `/btt/privateRoom?gameAddress=${isOnGame.gameAddress}&lobbyAddress=${lobbyAddress}`,
                );
                return;
            }
            setLoading(false);
        } catch (e) {
            setLoading(false);
            toast(handleError(e, true));
        }
    };

    const handleJoinGame = async (gameAddress: string) => {
        if (loading) {
            return;
        }
        const privateLobbySigner = getPrivateLobbySigner();
        try {
            setLoading(true);
            await bttPrivateLobbyContract("joinRoom", [gameAddress], {
                usePaymaster: true,
                signer: privateLobbySigner,
            });
            navigate(
                `/btt/privateRoom?gameAddress=${gameAddress}&lobbyAddress=${lobbyAddress}`,
            );
            setLoading(false);
        } catch (e) {
            setLoading(false);
            toast(handleError(e));
        }
    };

    const handleWatchGame = async (gameAddress: string) => {
        navigate(
            `/btt/privateRoom?gameAddress=${gameAddress}&lobbyAddress=${lobbyAddress}`,
        );
    };

    const handleGetGameList = async () => {
        const [queueList, onGameList] = await multiProvider.all([
            multiMercuryBTTPrivateLobby.getLobbyGameQueue(),
            multiMercuryBTTPrivateLobby.getLobbyOnGoingGames(),
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

    useEffect(() => {
        if (!sCWAddress || !multiMercuryBTTPrivateLobby || !multiProvider) {
            return;
        }
        handleGetUserGameCount();
    }, [multiMercuryBTTPrivateLobby, sCWAddress, multiProvider]);

    useEffect(() => {
        if (!multiMercuryBTTPrivateLobby || !multiProvider || !blockNumber) {
            return;
        }

        handleGetGameList();
    }, [multiMercuryBTTPrivateLobby, multiProvider, blockNumber]);

    return (
        <Box>
            {loading && <Loading></Loading>}
            <Box
                sx={{
                    border: "1px solid #FFF",
                    borderRadius: "1.0417vw",
                    marginTop: "0.5208vw",
                    overflow: "hidden",
                }}
            >
                <Header
                    gameCount={myGameCount}
                    onStartGame={handleStartGame}
                ></Header>
                <GameList
                    onJoinGame={(gameAddress: string) => {
                        handleJoinGame(gameAddress);
                    }}
                    onWatchGame={(gameAddress: string) => {
                        handleWatchGame(gameAddress);
                    }}
                    loading={listLoading}
                    queueList={queueList}
                    onGameList={onGameList}
                ></GameList>
            </Box>
            <LobbyInfo></LobbyInfo>
            <Flex justify={"center"}>
                <Button
                    onClick={() => {
                        onCopy();
                    }}
                    sx={{
                        width: "12.5vw",
                        height: "2.8646vw",
                        borderRadius: "0.9375vw",
                        border: "2px solid #FFF",
                        background: "#303030",
                        fontSize: "1.25vw",
                        marginTop: "3.8542vw",
                    }}
                >
                    <Image
                        src={FriendIcon}
                        sx={{
                            width: "1.7708vw",
                            marginRight: "0.5208vw",
                        }}
                    ></Image>
                    <Text>Invite Friend</Text>
                </Button>
            </Flex>
        </Box>
    );
};

export default Games;
