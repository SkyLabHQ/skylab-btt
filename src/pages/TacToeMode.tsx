import { useCheckBurnerBalanceAndApprove } from "@/hooks/useBurnerWallet";
import { Box, Text, useMediaQuery, Flex, Image } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBidTacToeFactoryRetry } from "@/hooks/useRetryContract";
import { handleError } from "@/utils/error";
import { mercuryJarTournamentAddress } from "@/hooks/useContract";
import BttHelmet from "@/components/Helmet/BttHelmet";
import {
    useMultiProvider,
    useMultiSkylabBidTacToeFactoryContract,
} from "@/hooks/useMultiContract";
import { DEAFAULT_CHAINID } from "@/utils/web3Utils";
import { PlayButtonGroup } from "@/components/TacToeMode/PlayButtonGroup";
import { motion } from "framer-motion";
import useSkyToast from "@/hooks/useSkyToast";
import { Toolbar } from "@/components/TacToeMode/Toolbar";
import {
    getDefaultWithProvider,
    getPlaneGameSigner,
    savePlaneGamePrivateKey,
} from "@/hooks/useSigner";
import { bttFactoryIface } from "@/skyConstants/iface";
import { useChainId } from "wagmi";
import { ZERO_DATA } from "@/skyConstants";
import { useSubmitRequest } from "@/contexts/SubmitRequest";
import GameMp3 from "@/assets/game.mp3";
import SelectPlane from "@/components/TacToeMode/SelectPlane";
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
    const tacToeFactoryRetryWrite = useBidTacToeFactoryRetry();
    const multiSkylabBidTacToeFactoryContract =
        useMultiSkylabBidTacToeFactoryContract(DEAFAULT_CHAINID);

    const handleTournament = async () => {
        const tokenId = selectPlane?.tokenId;

        try {
            if (selectPlane.state) {
                const account = getPlaneGameSigner(tokenId);
                if (!account) {
                    return;
                }
                const [gameAddress, defaultGameQueue] = await multiProvider.all(
                    [
                        multiSkylabBidTacToeFactoryContract.gamePerPlayer(
                            account.address,
                        ),
                        multiSkylabBidTacToeFactoryContract.defaultGameQueue(
                            mercuryJarTournamentAddress[DEAFAULT_CHAINID],
                        ),
                    ],
                );

                if (gameAddress !== ZERO_DATA) {
                    navigate(
                        `/btt/game?gameAddress=${gameAddress}&tokenId=${tokenId}`,
                    );
                    return;
                }

                if (defaultGameQueue === account.address) {
                    navigate(`/btt/match?tokenId=${tokenId}`);
                    return;
                }
            }

            openLoading();
            let account = getPlaneGameSigner(tokenId);
            if (!account) {
                account = ethers.Wallet.createRandom();
            }
            await checkBurnerBalanceAndApprove(
                mercuryJarTournamentAddress[chainId],
                tokenId,
                account.address,
            );

            const createGameReceipt = await tacToeFactoryRetryWrite(
                "createOrJoinDefault",
                [],
                {
                    gasLimit: 1000000,
                    signer: account.privateKey,
                },
            );
            const startGameTopic0 = bttFactoryIface.getEventTopic("StartGame");
            const startGameLog = createGameReceipt.logs.find((item: any) => {
                return item.topics[0] === startGameTopic0;
            });

            savePlaneGamePrivateKey(tokenId, account.privateKey);
            if (startGameLog) {
                const startGameData = bttFactoryIface.parseLog({
                    data: startGameLog.data,
                    topics: startGameLog.topics,
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
                                <i
                                    style={{
                                        width: isPc ? "124px" : "75px",
                                    }}
                                ></i>
                                <Box
                                    sx={{
                                        paddingBottom: isPc ? "12px" : "4px",
                                    }}
                                >
                                    <PlayButtonGroup
                                        tournamentDisabled={
                                            !selectPlane?.tokenId
                                        }
                                        onPlayTournament={() => {
                                            gameAudio.play();
                                            handleTournament();
                                        }}
                                    ></PlayButtonGroup>
                                </Box>

                                <Flex
                                    flexDir={"column"}
                                    align={"center"}
                                    sx={{
                                        marginTop: "10px",
                                    }}
                                    onClick={() => {
                                        navigate("/plane/market");
                                    }}
                                >
                                    <Image
                                        src={MarketIcon}
                                        sx={{
                                            width: isPc ? "100px" : "48px",
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
                        height: isPc
                            ? "calc(100% - 400px)"
                            : "calc(100% - 220px)",
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
