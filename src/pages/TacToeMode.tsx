import { useCheckBurnerBalanceAndApprove } from "@/hooks/useBurnerWallet";
import { Box, Text, useMediaQuery, Flex, Image } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    useBidTacToeFactoryRetry,
    useBttFactoryRetryPaymaster,
    useTestflightRetryPaymaster,
} from "@/hooks/useRetryContract";
import { handleError } from "@/utils/error";
import {
    botAddress,
    mercuryJarTournamentAddress,
    skylabTestFlightAddress,
} from "@/hooks/useContract";
import BttHelmet from "@/components/Helmet/BttHelmet";
import {
    useMultiProvider,
    useMultiSkylabBidTacToeFactoryContract,
} from "@/hooks/useMultiContract";
import { DEAFAULT_CHAINID, TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import { PlayButtonGroup } from "@/components/TacToeMode/PlayButtonGroup";
import { motion } from "framer-motion";
import useSkyToast from "@/hooks/useSkyToast";
import { Toolbar } from "@/components/TacToeMode/Toolbar";
import {
    getDefaultWithProvider,
    saveBotGamePrivateKey,
} from "@/hooks/useSigner";
import { useSCWallet } from "@/hooks/useSCWallet";
import {
    bttFactoryIface,
    erc721iface,
    topic0Transfer,
} from "@/skyConstants/iface";
import { useChainId } from "wagmi";
import { ZERO_DATA } from "@/skyConstants";
import { useSubmitRequest } from "@/contexts/SubmitRequest";
import GameMp3 from "@/assets/game.mp3";
import SelectPlane from "@/components/TacToeMode/SelectPlane";
import MRobotIcon from "@/components/TacToeMode/assets/bot-icon.png";
import MarketIcon from "@/components/TacToeMode/assets/market-icon.png";
import { privateKeyToAccount } from "viem/accounts";
import Nest from "@/components/Nest";
import { ethers } from "ethers";

const gameAudio = new Audio(GameMp3);

const TacToeMode = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const { openLoading, closeLoading } = useSubmitRequest();

    const navigate = useNavigate();
    const chainId = useChainId();
    const [selectPlane, setSelectPlane] = useState<any>({});

    const checkBurnerBalanceAndApprove = useCheckBurnerBalanceAndApprove();

    const toast = useSkyToast();

    const multiProvider = useMultiProvider(chainId);
    const [privateKey] = useState<string>(
        ethers.Wallet.createRandom().privateKey,
    );
    const { sCWAddress: botAccount } = useSCWallet(privateKey);
    const tacToeFactoryRetryWrite = useBidTacToeFactoryRetry();
    const testflightRetryPaymaster = useTestflightRetryPaymaster({
        privateKey,
    });

    const bttFactoryRetryPaymaster = useBttFactoryRetryPaymaster({
        privateKey,
    });

    const multiSkylabBidTacToeFactoryContract =
        useMultiSkylabBidTacToeFactoryContract(DEAFAULT_CHAINID);

    const handleMintPlayTest = async () => {
        if (!botAccount) {
            return;
        }
        try {
            openLoading();
            const receipt = await testflightRetryPaymaster("playTestMint", []);
            const transferLog = receipt.logs.find((item: any) => {
                return item.topics[0] === topic0Transfer;
            });
            const transferData = erc721iface.parseLog({
                data: transferLog.data,
                topics: transferLog.topics,
            });
            const tokenId = transferData.args.tokenId.toNumber();
            await bttFactoryRetryPaymaster("approveForGame", [
                botAccount,
                tokenId,
                skylabTestFlightAddress[TESTFLIGHT_CHAINID],
            ]);
            const createBotGameReceipt = await bttFactoryRetryPaymaster(
                "createBotGame",
                [botAddress[TESTFLIGHT_CHAINID]],
            );

            const startBotGameTopic0 =
                bttFactoryIface.getEventTopic("StartBotGame");

            const startBotGameLog = createBotGameReceipt.logs.find(
                (item: any) => {
                    return item.topics[0] === startBotGameTopic0;
                },
            );

            const startBotGameData = bttFactoryIface.parseLog({
                data: startBotGameLog.data,
                topics: startBotGameLog.topics,
            });

            saveBotGamePrivateKey(tokenId, privateKey);
            const url = `/free/botGame?tokenId=${tokenId}&gameAddress=${startBotGameData.args.gameAddress}`;
            closeLoading();
            navigate(url);
        } catch (error) {
            console.log(error);
            toast(handleError(error, true));
            closeLoading();
        }
    };

    const handleTournament = async () => {
        const tokenId = selectPlane?.tokenId;
        try {
            if (selectPlane.state) {
                let objPrivateKey = {};
                let stringPrivateKey = localStorage.getItem("tactoePrivateKey");
                try {
                    objPrivateKey = stringPrivateKey
                        ? JSON.parse(stringPrivateKey)
                        : {};
                } catch (e) {
                    objPrivateKey = {};
                }
                const key = chainId + "-" + tokenId;
                const account = privateKeyToAccount(objPrivateKey[key]);
                if (!account) {
                    return;
                }
                const [bidTacToeGameAddress, defaultGameQueue] =
                    await multiProvider.all([
                        multiSkylabBidTacToeFactoryContract.gamePerPlayer(
                            account.address,
                        ),
                        multiSkylabBidTacToeFactoryContract.defaultGameQueue(
                            mercuryJarTournamentAddress[DEAFAULT_CHAINID],
                        ),
                    ]);

                if (bidTacToeGameAddress !== ZERO_DATA) {
                    navigate(
                        `/btt/game?gameAddress=${bidTacToeGameAddress}&tokenId=${tokenId}`,
                    );
                    return;
                }

                if (defaultGameQueue === account.address) {
                    navigate(`/btt/match?tokenId=${tokenId}`);
                    return;
                }
            }

            openLoading();
            const defaultSinger = getDefaultWithProvider(tokenId, chainId);

            await checkBurnerBalanceAndApprove(
                mercuryJarTournamentAddress[chainId],
                tokenId,
                defaultSinger.account.address,
            );

            const createGameReceipt = await tacToeFactoryRetryWrite(
                "createOrJoinDefault",
                [],
                {
                    gasLimit: 1000000,
                    signer: defaultSinger,
                },
            );
            const startGameTopic0 = bttFactoryIface.getEventTopic("StartGame");

            const startBotGameLog = createGameReceipt.logs.find((item: any) => {
                return item.topics[0] === startGameTopic0;
            });

            if (startBotGameLog) {
                const startGameData = bttFactoryIface.parseLog({
                    data: startBotGameLog.data,
                    topics: startBotGameLog.topics,
                });
                const gameAddress = startGameData.args.gameAddress;
                const url = `/btt/game?gameAddress=${gameAddress}&tokenId=${tokenId}`;
                closeLoading();
                navigate(url);
                return;
            }

            closeLoading();
            const url = `/btt/match?tokenId=${tokenId}`;
            navigate(url);
        } catch (e) {
            closeLoading();
            console.log(e);
            toast(handleError(e));
        }
    };

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
                    paddingTop: isPc ? "120px" : "40px",
                    flexDirection: "column",
                    height: "100%",
                    fontFamily: "Orbitron",
                    width: "100%",
                }}
            >
                <Toolbar></Toolbar>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: isPc ? "798px" : "100%",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        sx={{
                            paddingTop: "30px",
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
                            <Flex
                                sx={{
                                    width: "100%",
                                    padding: "0 12px",
                                }}
                                justify={"space-between"}
                                align={"flex-end"}
                            >
                                <Flex
                                    flexDir={"column"}
                                    align={"center"}
                                    onClick={() => {
                                        gameAudio.play();
                                        handleMintPlayTest();
                                    }}
                                >
                                    <Image
                                        src={MRobotIcon}
                                        sx={{
                                            width: isPc ? "100px" : "42px",
                                        }}
                                    ></Image>
                                    <Text
                                        sx={{
                                            fontSize: isPc ? "20px" : "12px",
                                            fontFamily: "Quantico",
                                        }}
                                    >
                                        Bot Game
                                    </Text>
                                </Flex>
                                <PlayButtonGroup
                                    tournamentDisabled={!selectPlane?.tokenId}
                                    onPlayTournament={() => {
                                        gameAudio.play();
                                        handleTournament();
                                    }}
                                ></PlayButtonGroup>
                                <Flex
                                    flexDir={"column"}
                                    align={"center"}
                                    onClick={() => {
                                        gameAudio.play();
                                        handleMintPlayTest();
                                    }}
                                >
                                    <Image
                                        src={MarketIcon}
                                        sx={{
                                            width: isPc ? "100px" : "42px",
                                        }}
                                    ></Image>
                                    <Text
                                        sx={{
                                            fontSize: isPc ? "20px" : "12px",
                                            fontFamily: "Quantico",
                                        }}
                                    >
                                        Plane Market
                                    </Text>
                                </Flex>
                            </Flex>
                        </motion.div>
                    </Box>
                </Box>

                <Box
                    sx={{
                        position: "absolute",
                        left: "50%",
                        bottom: 0,
                        transform: "translate(-50%, 0)",
                        width: isPc ? "800px" : "100%",
                        display: "block",
                    }}
                >
                    <SelectPlane
                        selectPlane={selectPlane}
                        onSelectPlane={(plane: any) => {
                            if (plane.tokenId === selectPlane.tokenId) {
                                setSelectPlane({});
                                return;
                            }
                            setSelectPlane(plane);
                        }}
                    ></SelectPlane>
                </Box>
            </Box>
            <Nest />
        </Box>
    );
};

export default TacToeMode;
