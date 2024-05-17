import { Box, Flex, Text, Image, useMediaQuery } from "@chakra-ui/react";
import PairingIcon from "./assets/pairing.svg";
import RightArrow from "./assets/right-arrow.svg";
import WRightArrow from "./assets/w-right-arrow.svg";
import EnterLoadingIcon from "@/assets/enter-loading.gif";
import InGameIcon from "./assets/in-game.svg";
import React, { useEffect, useState } from "react";
import { usePrivateLobbyContext } from "@/pages/PrivateLobby";
import {
    getMultiSkylabBidTacToeGameContract,
    useMultiMercuryBTTPrivateLobby,
    useMultiProvider,
    useMultiSkylabBidTacToeFactoryContract,
} from "@/hooks/useMultiContract";
import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import { useBttPrivateLobbyContract } from "@/hooks/useRetryContract";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import avatars from "@/skyConstants/avatars";
import { useNavigate } from "react-router-dom";
import { getPrivateLobbySigner } from "@/hooks/useSigner";
import { useSCWallet } from "@/hooks/useSCWallet";
import { useBlockNumber } from "@/contexts/BlockNumber";
import Vacant from "./Vacant";
import { useSubmitRequest } from "@/contexts/SubmitRequest";

const ListBorder = () => {
    return (
        <Box
            sx={{
                marginTop: "0.625vw",
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
    color = "#303030",
    borderColor = "#FDDC2D",
    backgroundColor = "#FDDC2D",
}: {
    label: string;
    color?: string;
    onClick?: () => void;
    borderColor?: string;
    backgroundColor?: string;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Box
            sx={{
                border: `1px solid ${borderColor}`,
                padding: "2px",
                borderRadius: isPc ? "0.5208vw" : "10px",
            }}
            onClick={onClick}
        >
            <Flex
                align={"center"}
                justify={"space-between"}
                sx={{
                    width: isPc ? "9.4792vw" : "96px",
                    height: isPc ? "2.1875vw" : "36px",
                    fontSize: "1.25vw",
                    padding: "0 0.5208vw",
                    borderRadius: isPc ? "0.5208vw" : "8px",
                    color: color,
                    cursor: "pointer",
                    background: backgroundColor,
                    border: `1px solid ${borderColor}`,
                }}
            >
                <Text
                    sx={{
                        fontSize: isPc ? "1.25vw" : "20px",
                    }}
                >
                    {label}
                </Text>
                <Image
                    src={color === "#fff" ? WRightArrow : RightArrow}
                    sx={{
                        width: isPc ? "0.8333vw" : "16px",
                    }}
                ></Image>
            </Flex>
        </Box>
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
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const { avatarIndex, nickname } = usePrivateLobbyContext();

    return (
        <Flex
            sx={{
                height: isPc ? "6.5104vw" : "76px",
                borderRadius: "1.0417vw 1.0417vw 0 0",
                background:
                    "linear-gradient(180deg, #303030 0%, rgba(120, 120, 120, 0.30) 100%)",
                padding: isPc ? "0 1.0417vw" : "0 18px",
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
                        width: isPc ? "5vw" : "54px",
                        height: isPc ? "5vw" : "54px",
                        borderRadius: isPc ? "1.1458vw" : "10px",
                        marginRight: "1.25vw",
                    }}
                >
                    <Box
                        sx={{
                            background: avatars[avatarIndex],
                            height: "100%",
                            width: "100%",
                            borderRadius: isPc ? "1.1458vw" : "10px",
                        }}
                    ></Box>
                </Box>
                <Text
                    sx={{
                        fontSize: isPc ? "1.25vw" : "12px",
                        fontWeight: 700,
                        marginRight: "5.2083vw",
                        color: "#FDDC2D",
                    }}
                >
                    {nickname}
                </Text>
                <Text
                    sx={{
                        fontSize: isPc ? "1.25vw" : "12px",
                        color: "#FDDC2D",
                    }}
                >
                    {gameCount.winCount} win/{" "}
                    {gameCount.winCount + gameCount.loseCount} games
                </Text>
            </Flex>
            <GameButton
                label={isPc ? "Start Game" : "Start"}
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
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Flex align={"center"}>
            <Image
                src={type === GameStatusEnum.pairing ? PairingIcon : InGameIcon}
                sx={{
                    width: isPc ? "1.25vw" : "16px",
                    marginRight: isPc ? "0.2083vw" : "2px",
                }}
            ></Image>
            <Text
                sx={{
                    fontSize: isPc ? "1.25vw" : "12px",
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
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Flex sx={{}} direction={"column"} align={"center"}>
            <Box
                sx={{
                    width: isPc ? "4.6875vw" : "48px",
                    height: isPc ? "4.6875vw" : "48px",
                    borderRadius: isPc ? "1.0417vw" : "10px",
                    border: "1px solid #FFF",
                    background: avatars[avatar],
                }}
            ></Box>

            <Text
                sx={{
                    color: "#BCBBBE",
                    fontSize: isPc ? "0.8333vw" : "12px",
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
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Box
            w="100%"
            sx={{
                padding: isPc ? "1.0417vw" : "12px 18px",
            }}
        >
            <Flex align={"center"} justify={"space-between"}>
                <Flex align={"center"}>
                    <ListUserProfile
                        name={detail.name1}
                        avatar={detail.avatar1}
                    ></ListUserProfile>
                    <Text
                        sx={{
                            fontSize: isPc ? "1.25vw" : "20px",
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
                                width: isPc ? "4.6875vw" : "52px",
                                height: isPc ? "4.6875vw" : "52px",
                                borderRadius: isPc ? "1.0417vw" : "10px",
                                border: "1px solid #787878",
                                background: "transparent",
                            }}
                        ></Box>

                        <Text
                            sx={{
                                color: "#BCBBBE",
                                fontSize: isPc ? "0.8333vw" : "12px",
                            }}
                        >
                            ...
                        </Text>
                    </Flex>
                </Flex>
                <Flex>
                    <GameStatus type={GameStatusEnum.pairing}></GameStatus>
                    <GameButton
                        label={isPc ? "Join Game" : "Join"}
                        onClick={onButtonClick}
                        borderColor="#fff"
                        backgroundColor="#fff"
                    ></GameButton>
                </Flex>
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
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Box
            w="100%"
            sx={{
                padding: isPc ? "1.0417vw" : "12px 18px",
            }}
        >
            <Flex align={"center"} justify={"space-between"}>
                <Flex align={"center"}>
                    <ListUserProfile
                        name={detail.name1}
                        avatar={detail.avatar1}
                    ></ListUserProfile>
                    <Text
                        sx={{
                            fontSize: isPc ? "1.25vw" : "20px",
                            margin: "0 1.0417vw",
                        }}
                    >
                        VS
                    </Text>
                    <ListUserProfile
                        name={detail.name2}
                        avatar={detail.avatar2}
                    ></ListUserProfile>
                </Flex>
                <Flex>
                    <GameStatus type={GameStatusEnum.inGame}></GameStatus>
                    <GameButton
                        label="Watch"
                        onClick={onButtonClick}
                        color="#fff"
                        borderColor="#fff"
                        backgroundColor="transparent"
                    ></GameButton>
                </Flex>
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
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <Box
            sx={{
                overflowY: "auto",
                position: "relative",
                height: "100%",
            }}
        >
            {loading ? (
                <Flex
                    justify={"center"}
                    align={"center"}
                    sx={{
                        height: "100%",

                        width: "100%",
                    }}
                >
                    <Image
                        src={EnterLoadingIcon}
                        sx={{
                            width: "60px",
                        }}
                    ></Image>
                </Flex>
            ) : (
                <Box
                    sx={{
                        height: "100%",
                        margin: "0 auto",
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
                </Box>
            )}
        </Box>
    );
};

const Games = () => {
    const [listInit, setListInit] = useState(false);
    const { isLoading, openLoading, closeLoading } = useSubmitRequest();
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const { blockNumber } = useBlockNumber();
    const [queueList, setQueueList] = useState([]);
    const [onGameList, setOnGameList] = useState([]);
    const navigate = useNavigate();
    const toast = useSkyToast();
    const [vacantList, setVacantList] = useState([]);
    const [listLoading, setListLoading] = useState(false);
    const { lobbyAddress, setGameCount, lobbyName, myGameCount } =
        usePrivateLobbyContext();

    const multiProvider = useMultiProvider(TESTFLIGHT_CHAINID);
    const bttPrivateLobbyContract = useBttPrivateLobbyContract(lobbyAddress);
    const multiSkylabBidTacToeFactoryContract =
        useMultiSkylabBidTacToeFactoryContract(TESTFLIGHT_CHAINID);
    const localSinger = getPrivateLobbySigner();
    const { sCWAddress } = useSCWallet(localSinger.privateKey);

    const multiMercuryBTTPrivateLobby =
        useMultiMercuryBTTPrivateLobby(lobbyAddress);

    const handleStartGame = async () => {
        if (isLoading) {
            return;
        }

        try {
            openLoading();
            await bttPrivateLobbyContract(
                "createRoom",
                [[3, 3, 3, 100, 1, 0, false, 12 * 60 * 60]],
                {
                    usePaymaster: true,
                    signer: localSinger,
                },
            );

            const [gameAddress] = await multiProvider.all([
                multiSkylabBidTacToeFactoryContract.gamePerPlayer(sCWAddress),
            ]);

            closeLoading();
            navigate(
                `/btt/lobbyRoom?gameAddress=${gameAddress}&lobbyAddress=${lobbyAddress}`,
            );
        } catch (e) {
            console.log(e);
            closeLoading();
            toast(handleError(e, true));
        }
    };

    const handleJoinGame = async (gameAddress: string) => {
        if (isLoading) {
            return;
        }
        const privateLobbySigner = getPrivateLobbySigner();
        try {
            openLoading();
            await bttPrivateLobbyContract("joinRoom", [gameAddress], {
                usePaymaster: true,
                signer: privateLobbySigner,
            });
            navigate(
                `/btt/lobbyRoom?gameAddress=${gameAddress}&lobbyAddress=${lobbyAddress}`,
            );
            closeLoading();
        } catch (e) {
            closeLoading();
            toast(handleError(e));
        }
    };

    const handleWatchGame = async (gameAddress: string) => {
        navigate(
            `/btt/lobbyLive?gameAddress=${gameAddress}&lobbyAddress=${lobbyAddress}`,
        );
    };

    const handleGetGameList = async () => {
        if (!listInit) {
            setListLoading(true);
        }
        const [queueList, onGameList, players] = await multiProvider.all([
            multiMercuryBTTPrivateLobby.getLobbyGameQueue(),
            multiMercuryBTTPrivateLobby.getLobbyOnGoingGames(),
            multiMercuryBTTPrivateLobby.getPlayers(),
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

        const vacantAddresses = players.filter((item: string) => {
            const findItem = playerAddresses.find((item1: string) => {
                return item1 === item;
            });

            return !findItem;
        });

        const p2: any = [];
        players.forEach((item: string) => {
            p2.push(multiMercuryBTTPrivateLobby.userInfo(item));
        });

        const playerInfos = await multiProvider.all(p2);

        const allValidPlayers = playerInfos
            .map((item: any, index: number) => {
                return {
                    avatar: item.avatar.toNumber() - 1,
                    name: item.name,
                    address: players[index],
                };
            })
            .filter((item: any) => {
                return item.avatar !== -1;
            });

        const userInfos = await multiProvider.all(p2);
        const queueUserList = queueList.map((item: any, index: number) => {
            const user = allValidPlayers.find((item1: any) => {
                return item1.address === playerAddresses[index];
            });

            return {
                address1: user.address,
                gameAddress: item,
                avatar1: user.avatar,
                name1: user.name,
            };
        });
        const onGameUserList = onGameList.map((item: any, index: number) => {
            const player1Index = index * 2 + queueList.length;
            const player2Index = index * 2 + queueList.length + 1;
            const address1 = playerAddresses[player1Index];
            const address2 = playerAddresses[player2Index];
            const user1 = allValidPlayers.find((item1: any) => {
                return item1.address === address1;
            });
            const user2 = allValidPlayers.find((item1: any) => {
                return item1.address === address2;
            });

            return {
                gameAddress: item,
                address1: address1,
                avatar1: user1.avatar,
                name1: user1.name,
                address2: address2,
                avatar2: user2.avatar,
                name2: user2.name,
            };
        });

        const vacantUserList = vacantAddresses.map(
            (item: any, index: number) => {
                const playerIndex =
                    index + queueList.length + onGameList.length;
                return {
                    address: item,
                    avatar: userInfos[playerIndex].avatar.toNumber() - 1,
                    name: userInfos[playerIndex].name,
                };
            },
        );

        setQueueList(queueUserList);
        setOnGameList(onGameUserList);
        setVacantList(
            vacantUserList.filter((item: any) => {
                return item.avatar !== -1;
            }),
        );

        setGameCount({
            allGameCount: allValidPlayers.length,
            inGameCount: queueList.length + onGameList.length * 2,
        });
        setListLoading(false);
        if (!listInit) {
            setListInit(true);
        }
    };

    useEffect(() => {
        if (!multiMercuryBTTPrivateLobby || !multiProvider || !blockNumber) {
            return;
        }

        handleGetGameList();
    }, [multiMercuryBTTPrivateLobby, multiProvider, blockNumber]);

    return (
        <Box
            sx={{
                height: "100%",
            }}
        >
            <Box
                sx={{
                    height: "100%",
                }}
            >
                <Header
                    gameCount={myGameCount}
                    onStartGame={handleStartGame}
                ></Header>
                {isPc ? (
                    <Flex
                        sx={{
                            height: "100%",
                        }}
                    >
                        <Box
                            sx={{
                                height: "100%",
                                flex: 1,
                                overflowY: "auto",
                            }}
                        >
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
                        <Box
                            sx={{
                                width: "26.0417vw",
                                height: "100%",
                            }}
                        >
                            <Vacant list={vacantList}></Vacant>
                        </Box>
                    </Flex>
                ) : (
                    <Box>
                        <Box
                            sx={{
                                height: "274px",
                            }}
                        >
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
                        <Box
                            sx={{
                                height: "98px",
                            }}
                        >
                            <Vacant list={vacantList}></Vacant>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Games;
