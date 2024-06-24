import { useCheckBurnerBalanceAndApprove } from "@/hooks/useBurnerWallet";
import {
    Box,
    Text,
    useMediaQuery,
    BoxProps,
    Flex,
    Image,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    useBidTacToeFactoryRetry,
    useBttFactoryRetry,
    useBttFactoryRetryPaymaster,
    useTestflightRetryContract,
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
import { getDefaultWithProvider } from "@/hooks/useSigner";
import { useSCWallet } from "@/hooks/useSCWallet";
import {
    bttFactoryIface,
    erc721iface,
    topic0Transfer,
} from "@/skyConstants/iface";
import { useChainId } from "wagmi";
import { ZERO_DATA } from "@/skyConstants";
import useCountDown from "react-countdown-hook";
import styled from "@emotion/styled";
import { useSubmitRequest } from "@/contexts/SubmitRequest";
import StartCountDown from "@/components/StartCountDown";
import useStartGame from "@/hooks/useStartGame";
import GameMp3 from "@/assets/game.mp3";
import LeftButton from "@/components/TacToeMode/LeftButton";
import SelectPlane from "@/components/TacToeMode/SelectPlane";
import MRobotIcon from "@/components/TacToeMode/assets/m-robot.svg";
import { privateKeyToAccount } from "viem/accounts";
import Nest from "@/components/Nest";
import { ethers } from "ethers";

const gameAudio = new Audio(GameMp3);

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

const TacToeMode = () => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [timeLeft, { start }] = useCountDown(30000, 1000);
    const { timeLeft: timeLeft1 } = useStartGame();
    // const timeLeft1 = 0;
    const { openLoading, closeLoading, isLoading } = useSubmitRequest();

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

    const handleMintPlayTest = async () => {
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

            sessionStorage.setItem("testflight", privateKey);
            const url = `/btt/game?tokenId=${tokenId}&gameAddress=${startBotGameData.args.gameAddress}&testflight=true`;
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
                const [bidTacToeGameAddress] = await multiProvider.all([
                    multiSkylabBidTacToeFactoryContract.gamePerPlayer(
                        account.address,
                    ),
                ]);

                if (bidTacToeGameAddress !== ZERO_DATA) {
                    navigate(
                        `/btt/game?gameAddress=${bidTacToeGameAddress}&tokenId=${tokenId}`,
                    );
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

            await tacToeFactoryRetryWrite(
                "createOrJoinDefault",
                [[3, 3, 3, 100, 1, 0, false, 12 * 60 * 60], false],
                {
                    gasLimit: 1000000,
                    signer: defaultSinger,
                },
            );

            setTimeout(() => {
                closeLoading();
                const url = `/btt/match?tokenId=${tokenId}`;
                navigate(url);
            }, 1000);
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
                {/* <Box
                    sx={{
                        position: "absolute",
                        left: "12px",
                        top: "12px",
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
                </Box> */}
                <Toolbar></Toolbar>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: isPc ? "390px" : "100%",
                        justifyContent: "center",
                    }}
                >
                    {/* {isPc  && (
                        <StartCountDown timeLeft={timeLeft1}></StartCountDown>
                    )} */}
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
                                {!isPc && (
                                    <Flex
                                        flexDir={"column"}
                                        align={"center"}
                                        onClick={() => {
                                            gameAudio.play();
                                            handleMintPlayTest();
                                        }}
                                    >
                                        <Image src={MRobotIcon}></Image>
                                        <Text
                                            sx={{
                                                fontSize: "12px",
                                            }}
                                        >
                                            Bot Game
                                        </Text>
                                    </Flex>
                                )}
                                <PlayButtonGroup
                                    tournamentDisabled={!selectPlane?.tokenId}
                                    onPlayTournament={() => {
                                        gameAudio.play();
                                        handleTournament();
                                    }}
                                ></PlayButtonGroup>
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

                {isPc && (
                    <LeftButton
                        onPlayWithBot={() => {
                            gameAudio.play();
                            handleMintPlayTest();
                        }}
                    ></LeftButton>
                )}
            </Box>
            <Nest />
        </Box>
    );
};

export default TacToeMode;
