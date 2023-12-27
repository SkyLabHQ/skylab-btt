import { useCheckBurnerBalanceAndApprove } from "@/hooks/useBurnerWallet";
import { Box, Text, useBoolean, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    useBidTacToeFactoryRetry,
    useBttFactoryRetry,
    useBttPrivateLobbyContract,
    useBurnerRetryContract,
    useTestflightRetryContract,
} from "@/hooks/useRetryContract";
import Loading from "@/components/Loading";
import { handleError } from "@/utils/error";
import {
    botAddress,
    skylabTestFlightAddress,
    skylabTournamentAddress,
    useMercuryBaseContract,
    useSkylabBidTacToeContract,
} from "@/hooks/useContract";
import BttHelmet from "@/components/Helmet/BttHelmet";
import {
    getMultiSkylabBidTacToeGameContract,
    useMultiMercuryBTTPrivateLobby,
    useMultiMercuryBaseContract,
    useMultiProvider,
    useMultiSkylabBidTacToeFactoryContract,
} from "@/hooks/useMultiContract";
import { DEAFAULT_CHAINID, TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import RequestNextButton from "@/components/RequrestNextButton";
import { Contract } from "ethers-multicall";
import SKYLABTOURNAMENT_ABI from "@/skyConstants/abis/SkylabTournament.json";
import { getMetadataImg } from "@/utils/ipfsImg";
import PlaneList, { NoPlaneContent } from "@/components/TacToeMode/PlaneList";
import { LiveGame } from "@/components/TacToeMode/LiveGameList";
import { PlayButtonGroup } from "@/components/TacToeMode/PlayButtonGroup";
import { motion } from "framer-motion";
import useSkyToast from "@/hooks/useSkyToast";
import { Toolbar } from "@/components/TacToeMode/Toolbar";
import {
    getDefaultWithProvider,
    getPrivateLobbySigner,
    getTestflightSigner,
} from "@/hooks/useSigner";
import { getSCWallet, useSCWallet } from "@/hooks/useSCWallet";
import ConnectWalletBg from "@/components/TacToeMode/assets/connect-wallet.svg";
import {
    erc721iface,
    topic0PrivateLobbyCreated,
    topic0Transfer,
} from "@/skyConstants/iface";
import { ConnectKitButton } from "connectkit";
import { useAccount, useChainId, useWalletClient } from "wagmi";
import { decodeEventLog } from "viem";
import PrivateLobbyButtons from "@/components/TacToeMode/PrivateLobbyButtons";
import Back from "@/components/Back";
import PreviousLobbyModal from "@/components/TacToeMode/PreviousLobbyModal";
import { ZERO_DATA } from "@/skyConstants";

export interface PlaneInfo {
    tokenId: number;
    level: number;
    img: string;
    round: number;
    state: boolean;
}

export interface onGoingGame {
    gameAddress: string;
    player1: string;
    player2: string;
    tokenId1: number;
    tokenId2: number;
    level1: number;
    level2: number;
}

const TacToeMode = () => {
    const [isPrivateLobbyMode, setIsPrivateLobbyMode] = useBoolean();
    const {
        isOpen: isPreviousLobbyModalOpen,
        onOpen: onPreviousLobbyModalOpen,
        onClose: onPreviousLobbyModalClose,
    } = useDisclosure();
    const navigate = useNavigate();
    const { address } = useAccount();
    const chainId = useChainId();
    const [currentPlaneIndex, setCurrentPlaneIndex] = useState(0); // 当前选中的飞机
    const multiProvider = useMultiProvider(DEAFAULT_CHAINID);
    const multiMercuryBaseContract = useMultiMercuryBaseContract();

    const checkBurnerBalanceAndApprove = useCheckBurnerBalanceAndApprove();
    const [planeList, setPlaneList] = useState<PlaneInfo[]>([]);
    const contract = useSkylabBidTacToeContract();

    const toast = useSkyToast();

    const deafaultMercuryBaseContract = useMercuryBaseContract();
    const mercuryBaseContract = useMercuryBaseContract(true);
    const [loading, setLoading] = useState(false);
    const ethcallProvider = useMultiProvider(DEAFAULT_CHAINID);
    const testProvider = useMultiProvider(TESTFLIGHT_CHAINID);
    const localSinger = getPrivateLobbySigner();

    const [activeLobbyAddress, setActiveLobbyAddress] = useState<string>("");

    const [lobbyName, setLobbyName] = useState<string>("");
    const { sCWAddress: privateLobbySCWAddress } = useSCWallet(
        localSinger.privateKey,
    );
    const { data: signer } = useWalletClient();

    const [onGoingGames, setOnGoingGames] = useState<any>([]);

    const tacToeFactoryRetryWrite = useBidTacToeFactoryRetry();
    const burnerRetryContract = useBurnerRetryContract(contract);
    const testflightContract = useTestflightRetryContract();

    const bttFactoryRetryTest = useBttFactoryRetry(true, signer);

    const multiSkylabBidTacToeFactoryContract =
        useMultiSkylabBidTacToeFactoryContract(DEAFAULT_CHAINID);

    const testMultiSkylabBidTacToeFactoryContract =
        useMultiSkylabBidTacToeFactoryContract(TESTFLIGHT_CHAINID);

    const multiMercuryBTTPrivateLobby = useMultiMercuryBTTPrivateLobby(
        activeLobbyAddress !== ZERO_DATA ? activeLobbyAddress : "",
    );
    const bttPrivateLobbyContract = useBttPrivateLobbyContract(
        activeLobbyAddress && activeLobbyAddress !== ZERO_DATA
            ? activeLobbyAddress
            : "",
    );

    const handleGetLobbyOnGoingGames = async () => {
        const avaitionAddress = skylabTournamentAddress[DEAFAULT_CHAINID];

        const [onGoingGames] = await multiProvider.all([
            multiSkylabBidTacToeFactoryContract.getLobbyOnGoingGames(
                avaitionAddress,
            ),
        ]);

        const p: any = [];

        onGoingGames.forEach((gameAddress: string) => {
            const multiSkylabBidTacToeGameContract =
                getMultiSkylabBidTacToeGameContract(gameAddress);
            p.push(
                multiSkylabBidTacToeGameContract.player1(),
                multiSkylabBidTacToeGameContract.player2(),
            );
        });

        const players = await multiProvider.all(p);

        const p1: any = [];

        onGoingGames.forEach((gameAddress: string, index: number) => {
            p1.push(
                multiSkylabBidTacToeFactoryContract.burnerAddressToTokenId(
                    players[index * 2],
                ),
                multiSkylabBidTacToeFactoryContract.burnerAddressToTokenId(
                    players[index * 2 + 1],
                ),
            );
        });
        const tokenIds = await multiProvider.all(p1);

        const p2: any = [];

        onGoingGames.forEach((gameAddress: string, index: number) => {
            p2.push(
                multiMercuryBaseContract.aviationPoints(tokenIds[index * 2]),
                multiMercuryBaseContract.aviationPoints(
                    tokenIds[index * 2 + 1],
                ),
            );
        });

        const levels = await multiProvider.all(p2);

        setOnGoingGames(
            onGoingGames.map((gameAddress: string, index: number) => {
                return {
                    gameAddress,
                    player1: players[index * 2],
                    player2: players[index * 2 + 1],
                    tokenId1: tokenIds[index * 2].toNumber(),
                    tokenId2: tokenIds[index * 2 + 1].toNumber(),
                    level1: levels[index * 2].toNumber(),
                    level2: levels[index * 2 + 1].toNumber(),
                };
            }),
        );
    };

    const handleGetPlaneBalance = async () => {
        const tournamentContract = new Contract(
            skylabTournamentAddress[DEAFAULT_CHAINID],
            SKYLABTOURNAMENT_ABI,
        );

        const [balance, round] = await ethcallProvider.all([
            tournamentContract.balanceOf(address),
            tournamentContract._currentRound(),
        ]);

        const p = new Array(balance.toNumber()).fill("").map((item, index) => {
            return tournamentContract.tokenOfOwnerByIndex(address, index);
        });
        const planeTokenIds = await ethcallProvider.all(p);
        const p1: any = [];
        planeTokenIds.forEach((tokenId) => {
            p1.push(tournamentContract.aviationLevels(tokenId));
            p1.push(tournamentContract.tokenURI(tokenId));
            p1.push(tournamentContract.aviationRounds(tokenId));
            p1.push(tournamentContract.isAviationLocked(tokenId));
        });

        const levels: any = await ethcallProvider.all(p1);

        const list = planeTokenIds.map((item: any, index: number) => {
            const level = levels[index * 4].toNumber();
            const metadata = levels[index * 4 + 1];
            const round = levels[index * 4 + 2];
            const state = levels[index * 4 + 3];
            return {
                tokenId: item.toNumber(),
                level: level,
                img: getMetadataImg(metadata),
                round:
                    round.toNumber() >= 3
                        ? round.toNumber() - 1
                        : round.toNumber(),
                state,
            };
        });

        const _list = list
            .filter((item) => {
                return item.round === round.toNumber();
            })
            .sort((item1, item2) => {
                return item2.level - item1.level; //  大的 level 排在前面
            })
            .reverse();

        setPlaneList(_list);
    };

    const handleMintPlayTest = async (type: string) => {
        try {
            const testflightSinger = getTestflightSigner(
                TESTFLIGHT_CHAINID,
                true,
            );
            const { sCWAddress } = await getSCWallet(
                testflightSinger.privateKey,
            );
            setLoading(true);
            const receipt = await testflightContract("playTestMint", [], {
                usePaymaster: true,
            });

            const transferLog = receipt.logs.find((item: any) => {
                return item.topics[0] === topic0Transfer;
            });

            const transferData = erc721iface.parseLog({
                data: transferLog.data,
                topics: transferLog.topics,
            });
            const tokenId = transferData.args.tokenId.toNumber();

            if (type === "bot") {
                await bttFactoryRetryTest(
                    "approveForGame",
                    [
                        sCWAddress,
                        tokenId,
                        skylabTestFlightAddress[TESTFLIGHT_CHAINID],
                    ],
                    {
                        usePaymaster: true,
                    },
                );

                await bttFactoryRetryTest(
                    "createBotGame",
                    [botAddress[TESTFLIGHT_CHAINID]],
                    {
                        usePaymaster: true,
                    },
                );
                const url = `/btt/game?tokenId=${tokenId}&testflight=true`;
                navigate(url);
            } else if (type === "human") {
                await checkBurnerBalanceAndApprove(
                    mercuryBaseContract.address,
                    tokenId,
                    testflightSinger.account.address,
                );
                await burnerRetryContract("createOrJoinDefault", [], {
                    gasLimit: 1000000,
                    signer: testflightSinger,
                });

                const url = `/btt/game?tokenId=${tokenId}&testflight=true`;
                navigate(url);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast(handleError(error, true));
        }
    };

    const handleCreateOrJoinDefault = async () => {
        if (!address) {
            toast("Connect wallet to enter tournament");
            return;
        }

        if (!planeList?.[currentPlaneIndex]?.tokenId) {
            return;
        }

        try {
            if (planeList[currentPlaneIndex].state) {
                navigate(
                    `/btt/game?tokenId=${planeList[currentPlaneIndex].tokenId}`,
                );
                return;
            }

            const tokenId = planeList[currentPlaneIndex].tokenId;
            if (loading) return;
            setLoading(true);

            const defaultSinger = getDefaultWithProvider(tokenId, chainId);
            await checkBurnerBalanceAndApprove(
                deafaultMercuryBaseContract.address,
                tokenId,
                defaultSinger.account.address,
            );

            await tacToeFactoryRetryWrite("createOrJoinDefault", [], {
                gasLimit: 1000000,
                signer: defaultSinger,
            });

            setTimeout(() => {
                setLoading(false);
                const url = `/btt/game?tokenId=${tokenId}`;
                navigate(url);
            }, 1000);
        } catch (e) {
            console.log(e);
            setLoading(false);
            toast(handleError(e));
        }
    };

    const handleCreatePrivateLobby = async () => {
        try {
            setLoading(true);
            const privateLobbySigner = getPrivateLobbySigner();
            if (bttPrivateLobbyContract) {
                await bttPrivateLobbyContract("quitPrivateLobby", [], {
                    usePaymaster: true,
                    signer: privateLobbySigner,
                });
            }

            const receipt = await bttFactoryRetryTest(
                "createPrivateLobby",
                [],
                {
                    usePaymaster: true,
                    signer: privateLobbySigner,
                },
            );

            const logs = receipt.logs.find((item: any) => {
                return item.topics[0] === topic0PrivateLobbyCreated;
            });

            // @ts-ignore
            const result: any = decodeEventLog({
                abi: [
                    {
                        anonymous: false,
                        inputs: [
                            {
                                indexed: false,
                                internalType: "address",
                                name: "privateLobbyAddress",
                                type: "address",
                            },
                            {
                                indexed: false,
                                internalType: "string",
                                name: "name",
                                type: "string",
                            },
                            {
                                indexed: false,
                                internalType: "address",
                                name: "admin",
                                type: "address",
                            },
                        ],
                        name: "PrivateLobbyCreated",
                        type: "event",
                    },
                ],
                data: logs.data,
                topics: logs.topics,
            });

            const url =
                `/btt/privatelobby?lobbyAddress=` +
                result.args.privateLobbyAddress;
            navigate(url);
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast(handleError(error, true));
        }
    };

    const handleJoinPrivateLobby = async () => {
        navigate("/btt/joinlobby");
    };

    const handleGetActiveLobby = async () => {
        const [activeLobbyAddress] = await testProvider.all([
            testMultiSkylabBidTacToeFactoryContract.activeLobbyPerPlayer(
                privateLobbySCWAddress,
            ),
        ]);
        setActiveLobbyAddress(activeLobbyAddress);
    };

    const handleGetLoobyName = async () => {
        const [lobbyName] = await testProvider.all([
            multiMercuryBTTPrivateLobby.lobbyName(),
        ]);

        setLobbyName(lobbyName);
    };

    const handlePreviousLobbyClose = () => {
        onPreviousLobbyModalClose();
        setIsPrivateLobbyMode.on();
    };

    const handlePreviousLobbyConfirm = async () => {
        navigate(`/btt/privatelobby?lobbyAddress=${activeLobbyAddress}`);
    };

    useEffect(() => {
        if (!multiProvider || !multiSkylabBidTacToeFactoryContract) return;
        // handleGetLobbyOnGoingGames();
    }, [multiProvider, multiSkylabBidTacToeFactoryContract]);

    useEffect(() => {
        if (!address) {
            setPlaneList([]);
            return;
        }
        handleGetPlaneBalance();
    }, [address]);

    useEffect(() => {
        if (
            !testMultiSkylabBidTacToeFactoryContract ||
            !testProvider ||
            !privateLobbySCWAddress
        )
            return;

        handleGetActiveLobby();
    }, [
        testProvider,
        testMultiSkylabBidTacToeFactoryContract,
        privateLobbySCWAddress,
    ]);

    useEffect(() => {
        if (
            !activeLobbyAddress ||
            !testProvider ||
            !multiMercuryBTTPrivateLobby
        )
            return;

        handleGetLoobyName();
    }, [activeLobbyAddress, testProvider, multiMercuryBTTPrivateLobby]);

    return (
        <>
            <BttHelmet></BttHelmet>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    paddingTop: "10vh",
                    flexDirection: "column",
                    height: "100vh",
                    background: "rgb(54,54,54)",
                    fontFamily: "Orbitron",
                    position: "relative",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        left: "1.0417vw",
                        top: "1.0417vw",
                    }}
                >
                    <Back onClick={() => navigate("/")}></Back>
                </Box>
                <Toolbar></Toolbar>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <LiveGame list={onGoingGames}></LiveGame>
                    <Box
                        sx={{
                            paddingTop: "1.8229vw",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: 100 }} // 初始状态：透明且在原位置右边100px的位置
                            animate={{ opacity: 1, x: 0 }} // 结束状态：完全不透明且在原位置
                            exit={{ opacity: 0, x: -100 }} // 退出状态：透明且在原位置左边100px的位置
                            transition={{ duration: 0.5 }}
                        >
                            {isPrivateLobbyMode ? (
                                <PrivateLobbyButtons
                                    onBack={() => {
                                        setIsPrivateLobbyMode.off();
                                    }}
                                    onCreateLobby={handleCreatePrivateLobby}
                                    onJoinLobby={handleJoinPrivateLobby}
                                ></PrivateLobbyButtons>
                            ) : (
                                <PlayButtonGroup
                                    tournamentDisabled={planeList.length === 0}
                                    onPlayTournament={handleCreateOrJoinDefault}
                                    onPlayTestLobby={async () => {
                                        if (activeLobbyAddress === "") {
                                            toast(
                                                "Querying lobby address, please try again later",
                                            );
                                        } else if (
                                            activeLobbyAddress === ZERO_DATA
                                        ) {
                                            setIsPrivateLobbyMode.on();
                                        } else {
                                            onPreviousLobbyModalOpen();
                                        }
                                    }}
                                    onPlayWithBot={() => {
                                        handleMintPlayTest("bot");
                                    }}
                                ></PlayButtonGroup>
                            )}
                        </motion.div>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "10vh",
                            height: "44px",
                        }}
                    >
                        {loading && (
                            <>
                                <Text
                                    sx={{
                                        fontSize: "24px",
                                        marginRight: "20px",
                                    }}
                                >
                                    Entering lobby
                                </Text>
                                <Box
                                    sx={{
                                        position: "relative",
                                        width: "44px",
                                        height: "44px",
                                    }}
                                >
                                    <Loading size={44}></Loading>
                                </Box>
                            </>
                        )}
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        position: "absolute",
                        bottom: "2.6042vw",
                        left: "6.25vw",
                    }}
                >
                    {planeList.length === 0 ? (
                        <NoPlaneContent></NoPlaneContent>
                    ) : (
                        <PlaneList
                            planeList={planeList}
                            onPlaneChange={(index) => {
                                setCurrentPlaneIndex(index);
                            }}
                        ></PlaneList>
                    )}

                    {address ? (
                        <RequestNextButton
                            sx={{
                                background: "transparent !important",
                                borderRadius: "0.9375vw",
                                border: "1px solid #616161",
                                height: "2.6042vw !important",
                                lineHeight: "2.6042vw !important",
                                color: "#D9D9D9 !important",
                                width: "25vw !important",
                                fontSize: "1.25vw !important",
                                "&:hover": {
                                    boxShadow: "0px 4px 4px #fbc53e !important",
                                },
                            }}
                            onClick={() => {
                                window.open(
                                    "https://docs.google.com/forms/d/1NUrQ8185o6lJlQzpgFlhGraHsnHbd7J4qJMN5HDcEiM/edit",
                                    "_blank",
                                );
                            }}
                        ></RequestNextButton>
                    ) : (
                        <ConnectKitButton.Custom>
                            {({ show }) => {
                                return (
                                    <Box
                                        onClick={() => {
                                            show();
                                        }}
                                        sx={{
                                            background: `url(${ConnectWalletBg}) no-repeat center`,
                                            backgroundSize: "100% 100%",
                                            height: "2.6042vw !important",

                                            width: "25vw !important",
                                            display: "flex",
                                            justifyContent: "center",
                                            fontSize: "1.0417vw",
                                            paddingTop: "2px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Connect Wallet
                                    </Box>
                                );
                            }}
                        </ConnectKitButton.Custom>
                    )}
                </Box>
                <PreviousLobbyModal
                    lobbyName={lobbyName}
                    isOpen={isPreviousLobbyModalOpen}
                    onConfirm={handlePreviousLobbyConfirm}
                    onClose={handlePreviousLobbyClose}
                ></PreviousLobbyModal>
            </Box>
        </>
    );
};

export default TacToeMode;
