import { useCheckBurnerBalanceAndApprove } from "@/hooks/useBurnerWallet";
import {
    Box,
    Text,
    useBoolean,
    useDisclosure,
    useMediaQuery,
    Image,
    Flex,
    BoxProps,
    SimpleGrid,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    useBidTacToeFactoryRetry,
    useBttFactoryRetry,
    useBttPrivateLobbyContract,
    useBurnerRetryContract,
    useTestflightRetryContract,
} from "@/hooks/useRetryContract";
import { handleError } from "@/utils/error";
import {
    botAddress,
    mercuryJarTournamentAddress,
    skylabTestFlightAddress,
    useMercuryBaseContract,
    useSkylabBidTacToeContract,
} from "@/hooks/useContract";
import BttHelmet from "@/components/Helmet/BttHelmet";
import {
    useMultiMercuryBTTPrivateLobby,
    useMultiProvider,
    useMultiSkylabBidTacToeFactoryContract,
} from "@/hooks/useMultiContract";
import { DEAFAULT_CHAINID, TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import { PlayButtonGroup } from "@/components/TacToeMode/PlayButtonGroup";
import { motion, useAnimation } from "framer-motion";
import useSkyToast from "@/hooks/useSkyToast";
import { Toolbar } from "@/components/TacToeMode/Toolbar";
import {
    getDefaultWithProvider,
    getPrivateLobbySigner,
    getTestflightSigner,
} from "@/hooks/useSigner";
import { getSCWallet, useSCWallet } from "@/hooks/useSCWallet";
import {
    erc721iface,
    topic0PrivateLobbyCreated,
    topic0Transfer,
} from "@/skyConstants/iface";
import { useChainId, useWalletClient } from "wagmi";
import { decodeEventLog } from "viem";
import PrivateLobbyButtons from "@/components/TacToeMode/PrivateLobbyButtons";
import Back, { BackWithText } from "@/components/Back";
import PreviousLobbyModal from "@/components/TacToeMode/PreviousLobbyModal";
import { ZERO_DATA } from "@/skyConstants";
import ReactCanvasNest from "react-canvas-nest";
import useCountDown from "react-countdown-hook";
import EnterLoadingIcon from "@/assets/enter-loading.gif";
import DotLoading from "@/components/Loading/DotLoading";
import styled from "@emotion/styled";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import AvaitionDrawer from "@/components/TacToeMode/AvaitionDrawer";
import CurrentPlane from "@/components/TacToeMode/CurrentPlane";
import { useSubmitRequest } from "@/contexts/SubmitRequest";
import { usePrivy } from "@privy-io/react-auth";

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

export const GrayButtonStyle = styled(Box)`
    text-align: center;
    position: relative;
    align-items: center;
    display: flex;
    border: 3px solid #bcbbbe;
    border-radius: 0.9375vw;
    height: 3.3333vw;
    fontsize: 1.25vw;
    textalign: left;
    outline: none;
    width: 20.8333vw;
    box-shadow: 0.2083vw 0.2083vw 0vw 0px rgba(255, 255, 255, 0.5);
    justify-content: flex-start;
    padding: 0;
    cursor: pointer;
    &:focus {
        box-shadow: 0.2083vw 0.2083vw 0vw 0px rgba(255, 255, 255, 0.5);
    }
    &: [data-focus] {
        box-shadow: 0.2083vw 0.2083vw 0px 0px rgba(255, 255, 255, 0.5);
    }
    & .chakra-button__icon {
        position: absolute;
        right: 0.7813vw;
    }
`;

export const GrayButton = (props: BoxProps) => {
    return <GrayButtonStyle {...props}></GrayButtonStyle>;
};

const ScrollNum = ({
    fontSize = "95px",
    maxNumber = 9,
    number = -1,
}: {
    fontSize?: string;
    maxNumber?: number;
    number?: number;
}) => {
    const [init, setInit] = React.useState(false);
    const numAnimate = useAnimation();

    useEffect(() => {
        const handle = async () => {
            if (init) {
                await numAnimate.stop();
                if (number === maxNumber) {
                    await numAnimate.start({
                        transform: [
                            `translateY(-${(maxNumber + 1) * 9.09}%)`,
                            `translateY(-${number * 9.09}%)`,
                        ],

                        transition: {
                            duration: init ? 0.5 : 0,
                            ease: "linear",
                        },
                    });
                } else {
                    numAnimate.start({
                        transform: `translateY(-${number * 9.09}%)`,
                        transition: {
                            duration: init ? 0.5 : 0,
                            ease: "linear",
                        },
                    });
                }
            } else {
                await numAnimate.set({
                    transform: [
                        `translateY(-${(maxNumber + 1) * 9.09}%)`,
                        `translateY(-${number * 9.09}%)`,
                    ],
                });
                setInit(true);
            }
        };
        handle();
    }, [number]);

    return (
        <Box sx={{}}>
            <Box
                sx={{
                    height: fontSize,
                    overflow: "hidden",
                    fontSize: fontSize,
                    lineHeight: "1",
                }}
            >
                <motion.div animate={numAnimate}>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item, index) => {
                        return <Box key={index}>{item}</Box>;
                    })}
                </motion.div>
            </Box>
        </Box>
    );
};

const animationObj = {
    color: [
        "rgba(56, 248, 255, 1)",
        "rgba(255, 236, 199, 1)",
        "rgba(255, 214, 214, 1)",
    ],
    textShadow: "0px 0px 19px  #00CCFF",
    transition: {
        duration: 2,
        yoyo: Infinity,
    },
};

const handleDateNumber = (number: number) => {
    if (number >= 10) {
        return [Math.floor(number / 10), number % 10];
    } else {
        return [0, number];
    }
};

const CountDown = () => {
    const [timeLeft, { start }] = useCountDown(5000000, 1000);

    const { d1, d2, h1, h2, m1, m2, s1, s2 } = useMemo(() => {
        const seconds = Math.floor((timeLeft / 1000) % 60);
        const mintues = Math.floor((timeLeft / 1000 / 60) % 60);
        const hours = Math.floor((timeLeft / 1000 / 60 / 60) % 60);
        const days = Math.floor((timeLeft / 1000 / 60 / 60 / 60) % 24);

        let s1,
            s2,
            m1,
            m2,
            h1,
            h2,
            d1,
            d2 = 0;
        [s1, s2] = handleDateNumber(seconds);
        [m1, m2] = handleDateNumber(mintues);
        [h1, h2] = handleDateNumber(hours);
        [d1, d2] = handleDateNumber(days);

        return {
            s1,
            s2,
            m1,
            m2,
            h1,
            h2,
            d1,
            d2,
        };
    }, [timeLeft]);

    useEffect(() => {
        start();
    }, []);

    return (
        <motion.div
            style={{
                color: "rgba(56, 248, 255, 1)",
                fontSize: "70px",
                textAlign: "center",
                margin: "20px auto 0",
                width: "100%",
                lineHeight: "1",
                fontFamily: "neon",
            }}
            animate={animationObj}
        >
            <SimpleGrid columns={4} width={"100%"}>
                <Box>
                    <Flex
                        align={"center"}
                        justify={"center"}
                        sx={{
                            position: "relative",
                            "&::after": {
                                content: "':'",
                                position: "absolute",
                                right: "0",
                                top: "50%",
                                transform: "translateY(-50%)",
                            },
                        }}
                    >
                        <ScrollNum
                            maxNumber={6}
                            number={d1}
                            fontSize={"70px"}
                        ></ScrollNum>
                        <ScrollNum
                            maxNumber={9}
                            number={d2}
                            fontSize={"70px"}
                        ></ScrollNum>{" "}
                    </Flex>
                    <Text
                        sx={{
                            fontSize: "18px",
                        }}
                    >
                        DAYS
                    </Text>
                </Box>

                <Box>
                    <Flex
                        align={"center"}
                        justify={"center"}
                        sx={{
                            position: "relative",
                            "&::after": {
                                content: "':'",
                                position: "absolute",
                                right: "0",
                                top: "50%",
                                transform: "translateY(-50%)",
                            },
                        }}
                    >
                        <ScrollNum
                            maxNumber={6}
                            number={h1}
                            fontSize={"70px"}
                        ></ScrollNum>
                        <ScrollNum
                            maxNumber={9}
                            number={h2}
                            fontSize={"70px"}
                        ></ScrollNum>
                    </Flex>
                    <Text
                        sx={{
                            fontSize: "18px",
                        }}
                    >
                        HOURS
                    </Text>
                </Box>
                <Box>
                    <Flex
                        align={"center"}
                        justify={"center"}
                        sx={{
                            position: "relative",
                            "&::after": {
                                content: "':'",
                                position: "absolute",
                                right: "0",
                                top: "50%",
                                transform: "translateY(-50%)",
                            },
                        }}
                    >
                        <ScrollNum
                            maxNumber={6}
                            number={m1}
                            fontSize={"70px"}
                        ></ScrollNum>
                        <ScrollNum
                            maxNumber={9}
                            number={m2}
                            fontSize={"70px"}
                        ></ScrollNum>
                    </Flex>
                    <Text
                        sx={{
                            fontSize: "18px",
                        }}
                    >
                        MINS
                    </Text>
                </Box>
                <Box>
                    <Flex align={"center"} justify={"center"}>
                        <ScrollNum
                            maxNumber={6}
                            number={s1}
                            fontSize={"70px"}
                        ></ScrollNum>
                        <ScrollNum
                            maxNumber={9}
                            number={s2}
                            fontSize={"70px"}
                        ></ScrollNum>
                    </Flex>
                    <Text
                        sx={{
                            fontSize: "18px",
                        }}
                    >
                        SECS
                    </Text>
                </Box>
            </SimpleGrid>
        </motion.div>
    );
};

const TacToeMode = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [timeLeft, { start }] = useCountDown(30000, 1000);
    const { openLoading, closeLoading, isLoading } = useSubmitRequest();
    const { ready, login, user, connectWallet } = usePrivy();
    const {
        isOpen: isMyAviationOpen,
        onOpen: onMyAviationOpen,
        onClose: onMyAviationClose,
    } = useDisclosure();

    const [isPrivateLobbyMode, setIsPrivateLobbyMode] = useBoolean();
    const {
        isOpen: isPreviousLobbyModalOpen,
        onOpen: onPreviousLobbyModalOpen,
        onClose: onPreviousLobbyModalClose,
    } = useDisclosure();
    const navigate = useNavigate();
    const { address } = usePrivyAccounts();
    const chainId = useChainId();
    const [selectPlane, setSelectPlane] = useState<any>({});

    const checkBurnerBalanceAndApprove = useCheckBurnerBalanceAndApprove();
    const contract = useSkylabBidTacToeContract();

    const toast = useSkyToast();

    const [enterText, setEnterText] = useState("");
    const mercuryBaseContract = useMercuryBaseContract(true);
    const [loading, setLoading] = useState(false);
    const testProvider = useMultiProvider(TESTFLIGHT_CHAINID);
    const localSinger = getPrivateLobbySigner();

    const [activeLobbyAddress, setActiveLobbyAddress] = useState<string>("");
    const [lobbyGameAddress, setLobbyGameAddress] = useState<string>("");

    const [lobbyName, setLobbyName] = useState<string>("");
    const { sCWAddress: privateLobbySCWAddress } = useSCWallet(
        localSinger.privateKey,
    );
    const { data: signer } = useWalletClient();
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

    const { minutes, second } = useMemo(() => {
        let minutes: string | number = Math.floor(timeLeft / 60000);
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }

        let second: string | number = Math.floor((timeLeft / 1000) % 60);
        if (second < 10) {
            second = `0${second}`;
        }
        return { minutes, second };
    }, [timeLeft]);

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
            setEnterText("Entering bot game");
            start(60000);

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
            handleLogin();
            return;
        }
        onMyAviationOpen();
    };

    const handleTournament = async () => {
        if (!selectPlane?.tokenId) {
            return;
        }

        try {
            if (selectPlane.state) {
                navigate(`/btt/game?tokenId=${selectPlane.tokenId}`);
                return;
            }

            const tokenId = selectPlane?.tokenId;

            openLoading();
            const defaultSinger = getDefaultWithProvider(tokenId, chainId);

            await checkBurnerBalanceAndApprove(
                mercuryJarTournamentAddress[chainId],
                tokenId,
                defaultSinger.account.address,
            );

            await tacToeFactoryRetryWrite("createOrJoinDefault", [], {
                gasLimit: 1000000,
                signer: defaultSinger,
            });

            setTimeout(() => {
                closeLoading();
                const url = `/btt/game?tokenId=${tokenId}`;
                navigate(url);
            }, 1000);
        } catch (e) {
            closeLoading();
            console.log(e);
            toast(handleError(e));
        }
    };

    const handleCreatePrivateLobby = async () => {
        try {
            setLoading(true);
            setEnterText("Entering lobby");
            start();
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
                `/btt/lobby?lobbyAddress=` + result.args.privateLobbyAddress;
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
        const [activeLobbyAddress, gameAddress] = await testProvider.all([
            testMultiSkylabBidTacToeFactoryContract.activeLobbyPerPlayer(
                privateLobbySCWAddress,
            ),
            multiSkylabBidTacToeFactoryContract.gamePerPlayer(
                privateLobbySCWAddress,
            ),
        ]);
        setLobbyGameAddress(gameAddress);
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
        navigate(`/btt/lobby?lobbyAddress=${activeLobbyAddress}`);
    };

    const handleLogin = () => {
        if (!ready) {
            toast("Please wait for the wallet to be ready");
            return;
        }

        if (user && user.wallet.walletClientType !== "privy") {
            connectWallet();
            return;
        }
        login();
    };

    useEffect(() => {
        if (
            !testMultiSkylabBidTacToeFactoryContract ||
            !testProvider ||
            !privateLobbySCWAddress ||
            !multiSkylabBidTacToeFactoryContract
        )
            return;

        handleGetActiveLobby();
    }, [
        testProvider,
        testMultiSkylabBidTacToeFactoryContract,
        privateLobbySCWAddress,
        multiSkylabBidTacToeFactoryContract,
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
        <Box
            sx={{
                height: "100%",
            }}
        >
            <BttHelmet></BttHelmet>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    paddingTop: "10vh",
                    flexDirection: "column",
                    height: "100%",
                    background: "rgb(54,54,54,0.5)",
                    fontFamily: "Orbitron",
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        left: "1.0417vw",
                        top: "1.0417vw",
                    }}
                >
                    <BackWithText
                        onClick={() => navigate("/tower")}
                        textContent={
                            <Box
                                sx={{
                                    fontSize: isPc ? "16px" : "12px",
                                    textAlign: "center",
                                    lineHeight: "1",
                                    marginTop: "8px",
                                }}
                            >
                                <Text>Back</Text>
                                {isPc && <Text>To Arena</Text>}
                            </Box>
                        }
                    ></BackWithText>
                </Box>
                <Toolbar></Toolbar>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: isPc ? "378px" : "250px",
                        justifyContent: "center",
                        height: "100%",
                    }}
                >
                    <CountDown></CountDown>
                    <Box
                        sx={{
                            paddingTop: "1.8229vw",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: 100 }} // 初始状态：透明且在原位置右边100px的位置
                            animate={{ opacity: 1, x: 0 }} // 结束状态：完全不透明且在原位置
                            exit={{ opacity: 0, x: -100 }} // 退出状态：透明且在原位置左边100px的位置
                            transition={{ duration: 0.5 }}
                            style={{
                                width: "100%",
                            }}
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
                                    tournamentDisabled={false}
                                    onPlayTournament={handleCreateOrJoinDefault}
                                    onPlayTestLobby={async () => {
                                        if (activeLobbyAddress === "") {
                                            toast(
                                                "Querying lobby address, please try again later",
                                            );
                                        } else if (
                                            lobbyGameAddress !== ZERO_DATA
                                        ) {
                                            navigate(
                                                `/btt/lobbyRoom?gameAddress=${lobbyGameAddress}&lobbyAddress=${activeLobbyAddress}`,
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
                            height: "2.2917vw",
                        }}
                    >
                        {loading && (
                            <Flex
                                flexDir={"column"}
                                align={"center"}
                                sx={{
                                    marginTop: "10px",
                                }}
                            >
                                <DotLoading
                                    text={enterText}
                                    fontSize={isPc ? "1.25vw" : "16px"}
                                ></DotLoading>

                                <Image
                                    src={EnterLoadingIcon}
                                    sx={{
                                        width: "65px",
                                    }}
                                ></Image>
                                <Text
                                    sx={{
                                        fontSize: isPc ? "1.25vw" : "20px",
                                    }}
                                >
                                    {minutes}:{second}
                                </Text>
                                <Text
                                    sx={{
                                        fontSize: isPc ? "1.25vw" : "12px",
                                    }}
                                >
                                    Average time:{" "}
                                    {enterText === "Entering lobby"
                                        ? "20sec"
                                        : "30sec"}
                                </Text>
                            </Flex>
                        )}
                    </Box>
                </Box>
                {!isPrivateLobbyMode && isPc && (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            position: "absolute",
                            bottom: "6.6042vw",
                            left: "6.25vw",
                        }}
                    >
                        <CurrentPlane selectPlane={selectPlane}></CurrentPlane>
                    </Box>
                )}

                <PreviousLobbyModal
                    lobbyName={lobbyName}
                    isOpen={isPreviousLobbyModalOpen}
                    onConfirm={handlePreviousLobbyConfirm}
                    onClose={handlePreviousLobbyClose}
                ></PreviousLobbyModal>
                <AvaitionDrawer
                    selectPlane={selectPlane}
                    isOpen={isMyAviationOpen}
                    onClose={onMyAviationClose}
                    onSelectPlane={(plane: any) => {
                        if (plane.tokenId === selectPlane.tokenId) {
                            setSelectPlane({});
                            return;
                        }
                        setSelectPlane(plane);
                    }}
                    onPlay={handleTournament}
                ></AvaitionDrawer>
            </Box>
            <ReactCanvasNest
                className="canvasNest"
                style={{}}
                config={{
                    count: 66,
                    pointColor: " 255, 255, 255 ",
                    lineColor: "255,255,255",
                    dist: 1500,
                }}
            />
        </Box>
    );
};

export default TacToeMode;
