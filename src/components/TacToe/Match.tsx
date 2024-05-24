import React, { useEffect, useState } from "react";
import {
    Box,
    Image,
    Text,
    useDisclosure,
    useMediaQuery,
} from "@chakra-ui/react";
import { Info, useGameContext, GameType } from "@/pages/Match";
import { motion } from "framer-motion";
import LoadingIcon from "@/assets/loading.svg";
import { getMetadataImg } from "@/utils/ipfsImg";
import {
    useMultiProvider,
    useMultiSkylabBidTacToeFactoryContract,
    useMultiSkylabBidTacToeGameContract,
    useMultiMercuryBaseContract,
} from "@/hooks/useMultiContract";
import { PilotInfo } from "@/hooks/usePilotInfo";
import { botAddress } from "@/hooks/useContract";
import { GrayButton } from "../Button/Index";
import QuitModal from "@/components/BttComponents/QuitModal";
import {
    getDefaultWithProvider,
    getTestflightSigner,
    useTacToeSigner,
} from "@/hooks/useSigner";
import { getSCWallet } from "@/hooks/useSCWallet";
import { ZERO_DATA } from "@/skyConstants";
import { useNavigate } from "react-router-dom";
import { handleError } from "@/utils/error";
import { useBidTacToeFactoryRetry } from "@/hooks/useRetryContract";
import { RobotImg, UserMarkType } from "@/skyConstants/bttGameTypes";
import ToolBar from "../BttComponents/Toolbar";
import useSkyToast from "@/hooks/useSkyToast";
import DotLoading from "../Loading/DotLoading";
import PlayWithBot from "./assets/playbot.png";
import { useSubmitRequest } from "@/contexts/SubmitRequest";

export const PlaneImg = ({
    detail,
    flip,
    pilotInfo,
}: {
    detail: Info;
    flip?: boolean;
    pilotInfo: PilotInfo;
}) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");
    return (
        <>
            {detail?.level ? (
                <Box
                    sx={{
                        position: "relative",
                    }}
                >
                    <Image
                        src={detail?.img}
                        sx={{
                            width: isPc
                                ? detail?.isBot
                                    ? "9vw"
                                    : "14.5833vw"
                                : "136px",
                            // height: isPc ? "14.5833vw" : "136px",
                            transform: flip ? "scaleX(-1)" : "",
                            /*兼容IE*/
                            filter: "FlipH",
                        }}
                    ></Image>
                    {pilotInfo.img && (
                        <Image
                            sx={{
                                width: isPc ? "3.3333vw" : "34px",
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%,-50%)",
                                borderRadius: "50%",
                                border: "2px solid #000",
                            }}
                            src={pilotInfo.img}
                        ></Image>
                    )}
                </Box>
            ) : (
                <Box
                    sx={{
                        width: isPc ? "14.5833vw" : "136px",
                        height: isPc ? "14.5833vw" : "136px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <motion.img
                        src={LoadingIcon}
                        style={{
                            width: isPc ? "6.25vw" : "58px",
                            rotate: 0,
                        }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 3,
                        }}
                        animate={{ rotate: 360 }}
                    />
                </Box>
            )}
        </>
    );
};

const StopMatch = ({ onClick }: { onClick: () => void }) => {
    const [isPc] = useMediaQuery("(min-width: 800px)");

    const [show, setShow] = useState(false);

    useEffect(() => {
        const stopMatchTip = localStorage.getItem("stopMatchTip");
        if (stopMatchTip === "true") {
            setShow(false);
        } else {
            setShow(true);
        }
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <GrayButton
                onClick={onClick}
                sx={{
                    width: isPc ? "13.3333vw !important" : "210px !important",
                    height: isPc ? "3.3333vw !important" : "50px !important",
                    background: "transparent",
                    marginTop: isPc ? "20vh" : "85px",
                    borderRadius: isPc ? "0.8333vw" : "10px !important",
                }}
            >
                <Text
                    sx={{
                        fontSize: isPc ? "1.25vw" : "20px",
                        textAlign: "center !important",
                        flex: 1,
                    }}
                >
                    Quit Matching
                </Text>
            </GrayButton>

            {show && (
                <>
                    <Box
                        sx={{
                            width: 0,
                            height: 0,
                            borderLeft: `${
                                isPc ? "0.4427vw " : "8px"
                            } solid transparent`,
                            borderRight: `${
                                isPc ? "0.4427vw " : "8px"
                            } solid transparent`,
                            borderBottom: `${
                                isPc ? "0.7668vw " : "12px"
                            } solid #fff`,
                            marginTop: isPc ? "0.5208vw" : "4px",
                        }}
                    ></Box>
                    <Box
                        sx={{
                            width: isPc ? "35.8333vw" : "335px",
                            border: "0.0521vw solid #616161",
                            backdropFilter: "blur(1.3021vw)",
                            padding: isPc ? "1.0417vw 3.125vw" : "12px",
                            borderRadius: isPc ? "0.8333vw" : "8px",
                            marginTop: isPc ? "1.0417vw" : "9px",
                        }}
                    >
                        <Text
                            sx={{
                                fontSize: isPc ? "1.25vw" : "12px",
                                textAlign: "center",
                            }}
                        >
                            Make sure to{" "}
                            <span
                                style={{
                                    fontWeight: "bold",
                                }}
                            >
                                STOP MATCHING
                            </span>{" "}
                            before closing the browser to avoid accidentally
                            losing your aviation
                        </Text>
                    </Box>
                </>
            )}
        </Box>
    );
};

export const MatchPage = ({
    onGameType,
    onChangeInfo,
    onChangeMileage,
    onChangePoint,
    onSetConfirmTimeout,
}: {
    onGameType: (type: GameType) => void;
    onChangeMileage: (winMileage: number, loseMileage: number) => void;
    onChangePoint: (winPoint: number, losePoint: number) => void;
    onChangeInfo: (position: "my" | "op", info: Info) => void;
    onSetConfirmTimeout: (
        myConfirmTimeout: number,
        opConfirmTimeout: number,
    ) => void;
}) => {
    const { isLoading, openLoading, closeLoading } = useSubmitRequest();
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [showPlayWithBot, setShowPlayWithBot] = useState(false);
    const navigate = useNavigate();
    const toast = useSkyToast();
    const {
        realChainId,
        myInfo,
        opInfo,
        bidTacToeGameAddress,
        myActivePilot,
        opActivePilot,
        tokenId,
        istest,
        avaitionAddress,
        handleGetGas,
        onStep,
        setBidTacToeGameAddress,
    } = useGameContext();

    const tacToeFactoryRetryWrite = useBidTacToeFactoryRetry(tokenId);
    const multiProvider = useMultiProvider(realChainId);
    const [tacToeBurner] = useTacToeSigner(tokenId);

    const multiMercuryBaseContract = useMultiMercuryBaseContract(realChainId);
    const multiSkylabBidTacToeGameContract =
        useMultiSkylabBidTacToeGameContract(bidTacToeGameAddress);
    const multiSkylabBidTacToeFactoryContract =
        useMultiSkylabBidTacToeFactoryContract(realChainId);

    const handleGetHuamnAndBotInfo = async (
        playerAddress1: string,
        playerAddress2: string,
    ) => {
        const [tokenId1] = await multiProvider.all([
            multiSkylabBidTacToeFactoryContract.burnerAddressToTokenId(
                playerAddress1,
            ),
        ]);
        const [
            account1,
            level1,
            mtadata1,
            point1,
            player1Move,
            [player1WinMileage, player1LoseMileage],
        ] = await multiProvider.all([
            multiMercuryBaseContract.ownerOf(tokenId1),
            multiMercuryBaseContract.aviationLevels(tokenId1),
            multiMercuryBaseContract.tokenURI(tokenId1),
            multiMercuryBaseContract.aviationPoints(tokenId1),
            multiMercuryBaseContract.estimatePointsToMove(tokenId1, tokenId1),
            multiMercuryBaseContract.estimateMileageToGain(tokenId1, tokenId1),
        ]);

        const player1Info = {
            burner: playerAddress1,
            address: account1,
            point: point1.toNumber(),
            level: level1.toNumber(),
            img: getMetadataImg(mtadata1),
        };
        const botInfo = {
            burner: playerAddress2,
            address: playerAddress2,
            point: point1.toNumber(),
            level: level1.toNumber(),
            img: RobotImg,
            isBot: true,
        };
        onChangeInfo("my", { ...player1Info, mark: UserMarkType.Circle });
        onChangeInfo("op", { ...botInfo, mark: UserMarkType.BotX });
        onChangePoint(player1Move.toNumber(), player1Move.toNumber());
        onChangeMileage(
            player1WinMileage.toNumber(),
            player1LoseMileage.toNumber(),
        );
        onGameType(GameType.HumanWithBot);

        setTimeout(() => {
            const url = `/btt/game?gameAddress=${bidTacToeGameAddress}&tokenId=${tokenId}&testflight=${true}`;
            navigate(url);
        }, 1500);
    };

    const handleGetHuamnAndHumanInfo = async (
        playerAddress1: string,
        playerAddress2: string,
    ) => {
        const [tokenId1, tokenId2] = await multiProvider.all([
            multiSkylabBidTacToeFactoryContract.burnerAddressToTokenId(
                playerAddress1,
            ),
            multiSkylabBidTacToeFactoryContract.burnerAddressToTokenId(
                playerAddress2,
            ),
        ]);
        const [
            account1,
            level1,
            mtadata1,
            point1,
            account2,
            level2,
            mtadata2,
            point2,
            player1Move,
            player2Move,
            [player1WinMileage, player1LoseMileage],
            [player2WinMileage, player2LoseMileage],
        ] = await multiProvider.all([
            multiMercuryBaseContract.ownerOf(tokenId1),
            multiMercuryBaseContract.aviationLevels(tokenId1),
            multiMercuryBaseContract.tokenURI(tokenId1),
            multiMercuryBaseContract.aviationPoints(tokenId1),
            multiMercuryBaseContract.ownerOf(tokenId2),
            multiMercuryBaseContract.aviationLevels(tokenId2),
            multiMercuryBaseContract.tokenURI(tokenId2),
            multiMercuryBaseContract.aviationPoints(tokenId2),
            multiMercuryBaseContract.estimatePointsToMove(tokenId, tokenId2),
            multiMercuryBaseContract.estimatePointsToMove(tokenId2, tokenId),
            multiMercuryBaseContract.estimateMileageToGain(tokenId, tokenId2),
            multiMercuryBaseContract.estimateMileageToGain(tokenId2, tokenId1),
        ]);

        const player1Info = {
            burner: playerAddress1,
            address: account1,
            point: point1.toNumber(),
            level: level1.toNumber(),
            img: getMetadataImg(mtadata1),
        };
        const player2Info = {
            burner: playerAddress2,
            address: account2,
            point: point2.toNumber(),
            level: level2.toNumber(),
            img: getMetadataImg(mtadata2),
        };

        if (player1Info.burner === tacToeBurner.account.address) {
            onChangePoint(player1Move.toNumber(), player2Move.toNumber());
            onChangeMileage(
                player1WinMileage.toNumber(),
                player1LoseMileage.toNumber(),
            );
            onChangeInfo("my", { ...player1Info, mark: UserMarkType.Circle });
            onChangeInfo("op", { ...player2Info, mark: UserMarkType.Cross });
        } else {
            onChangeMileage(
                player2WinMileage.toNumber(),
                player2LoseMileage.toNumber(),
            );
            onChangePoint(player2Move.toNumber(), player1Move.toNumber());
            onChangeInfo("my", { ...player2Info, mark: UserMarkType.Cross });
            onChangeInfo("op", { ...player1Info, mark: UserMarkType.Circle });
        }
        onGameType(GameType.HumanWithHuman);
        setTimeout(() => {
            const url = `/btt/game?gameAddress=${bidTacToeGameAddress}&tokenId=${tokenId}`;
            navigate(url);
        }, 1500);
    };

    const handleGetAllPlayerInfo = async () => {
        const [playerAddress1, playerAddress2] = await multiProvider.all([
            multiSkylabBidTacToeGameContract.player1(),
            multiSkylabBidTacToeGameContract.player2(),
        ]);

        console.log("playerAddress1", playerAddress1);
        console.log("playerAddress2", playerAddress2);

        if (playerAddress2 === botAddress[realChainId]) {
            handleGetHuamnAndBotInfo(playerAddress1, playerAddress2);
        } else {
            handleGetHuamnAndHumanInfo(playerAddress1, playerAddress2);
        }
    };

    // get my and op info
    const handleGetGameInfo = async () => {
        try {
            let operateAddress = "";
            if (istest) {
                const testflightSinger = getTestflightSigner(realChainId);
                const { sCWAddress } = await getSCWallet(
                    testflightSinger.privateKey,
                );
                operateAddress = sCWAddress;
            } else {
                operateAddress = tacToeBurner.account.address;
            }

            const [bidTacToeGameAddress, defaultGameQueue, opPlayer] =
                await multiProvider.all([
                    multiSkylabBidTacToeFactoryContract.gamePerPlayer(
                        operateAddress,
                    ),
                    multiSkylabBidTacToeFactoryContract.defaultGameQueue(
                        avaitionAddress,
                    ),
                    multiSkylabBidTacToeFactoryContract.playerToOpponent(
                        operateAddress,
                    ),
                ]);

            if (bidTacToeGameAddress === ZERO_DATA) {
                if (
                    operateAddress !== defaultGameQueue &&
                    opPlayer === ZERO_DATA
                ) {
                    navigate("/");
                    return;
                }

                if (opPlayer === ZERO_DATA) {
                    const [
                        account,
                        level,
                        mtadata,
                        point,
                        joinDefaultQueueTime,
                    ] = await multiProvider.all([
                        multiMercuryBaseContract.ownerOf(tokenId),
                        multiMercuryBaseContract.aviationLevels(tokenId),
                        multiMercuryBaseContract.tokenURI(tokenId),
                        multiMercuryBaseContract.aviationPoints(tokenId),
                        multiSkylabBidTacToeFactoryContract.joinDefaultQueueTime(
                            avaitionAddress,
                            operateAddress,
                        ),
                    ]);

                    const current = Math.floor(new Date().getTime() / 1000);

                    if (
                        Number(joinDefaultQueueTime.toString()) + 45 <=
                        current
                    ) {
                        setShowPlayWithBot(true);
                    } else {
                        setShowPlayWithBot(false);
                    }

                    onChangeInfo("my", {
                        burner: operateAddress,
                        address: account,
                        level: level.toNumber(),
                        point: point.toNumber(),
                        img: getMetadataImg(mtadata),
                        mark: null,
                    });
                    onChangeInfo("op", {
                        burner: "",
                        address: "",
                        level: 0,
                        point: 0,
                        img: "",
                        mark: null,
                    });
                } else {
                    const [opTokenId] = await multiProvider.all([
                        multiSkylabBidTacToeFactoryContract.burnerAddressToTokenId(
                            opPlayer,
                        ),
                    ]);

                    const [
                        account,
                        level,
                        mtadata,
                        point,
                        opAccount,
                        opLevel,
                        opMtadata,
                        opPoint,
                        myWinMove,
                        myLoseMove,
                        [myWinMileage, myLoseMileage],
                        myConfirmTimeout,
                        opConfirmTimeout,
                    ] = await multiProvider.all([
                        multiMercuryBaseContract.ownerOf(tokenId),
                        multiMercuryBaseContract.aviationLevels(tokenId),
                        multiMercuryBaseContract.tokenURI(tokenId),
                        multiMercuryBaseContract.aviationPoints(tokenId),
                        multiMercuryBaseContract.ownerOf(opTokenId),
                        multiMercuryBaseContract.aviationLevels(opTokenId),
                        multiMercuryBaseContract.tokenURI(opTokenId),
                        multiMercuryBaseContract.aviationPoints(opTokenId),
                        multiMercuryBaseContract.estimatePointsToMove(
                            tokenId,
                            opTokenId,
                        ),
                        multiMercuryBaseContract.estimatePointsToMove(
                            opTokenId,
                            tokenId,
                        ),
                        multiMercuryBaseContract.estimateMileageToGain(
                            tokenId,
                            opTokenId,
                        ),
                        multiSkylabBidTacToeFactoryContract.playerToTimeout(
                            operateAddress,
                        ),
                        multiSkylabBidTacToeFactoryContract.playerToTimeout(
                            opPlayer,
                        ),
                    ]);

                    onChangeInfo("my", {
                        burner: operateAddress,
                        address: account,
                        level: level.toNumber(),
                        point: point.toNumber(),
                        img: getMetadataImg(mtadata),
                        mark: null,
                    });
                    onChangeInfo("op", {
                        burner: opPlayer,
                        address: opAccount,
                        level: opLevel.toNumber(),
                        point: opPoint.toNumber(),
                        img: getMetadataImg(opMtadata),
                        mark: null,
                    });
                    onSetConfirmTimeout(
                        myConfirmTimeout.toNumber() * 1000,
                        opConfirmTimeout.toNumber() * 1000,
                    );
                    onChangePoint(myWinMove.toNumber(), myLoseMove.toNumber());
                    onChangeMileage(
                        myWinMileage.toNumber(),
                        myLoseMileage.toNumber(),
                    );
                    onStep(1);
                }
            } else {
                setShowPlayWithBot(false);

                setBidTacToeGameAddress(bidTacToeGameAddress);
            }
        } catch (e: any) {
            console.log(e);
            navigate("/");
        }
    };

    const handlePlayWithBot = async () => {
        const defaultSinger = getDefaultWithProvider(tokenId, realChainId);
        try {
            openLoading();
            await tacToeFactoryRetryWrite(
                "playWithBotAfterDefaultQueueTimer",
                [avaitionAddress, botAddress[realChainId]],
                {
                    gasLimit: 1550000,
                    signer: defaultSinger,
                },
            );
            closeLoading();
        } catch (error) {
            console.log(error);
            closeLoading();
            toast(handleError(error, istest));
        }
    };

    const handleQuit = async () => {
        try {
            await tacToeFactoryRetryWrite("withdrawFromQueue", [], {
                gasLimit: 250000,
                usePaymaster: istest,
            });
            const url = istest
                ? `/btt?tokenId=${tokenId}&testflight=true`
                : `/btt?tokenId=${tokenId}`;
            if (!istest) {
                handleGetGas();
            }
            navigate(url);
            onClose();
        } catch (error) {
            console.log(error);
            toast(handleError(error, istest));
        }
    };

    useEffect(() => {
        if (
            !multiProvider ||
            !multiMercuryBaseContract ||
            !multiSkylabBidTacToeGameContract ||
            !multiSkylabBidTacToeFactoryContract
        )
            return;

        handleGetAllPlayerInfo();
    }, [
        multiProvider,
        multiMercuryBaseContract,
        multiSkylabBidTacToeGameContract,
        multiSkylabBidTacToeFactoryContract,
    ]);

    useEffect(() => {
        if (
            !tokenId ||
            !tacToeBurner ||
            !multiSkylabBidTacToeFactoryContract ||
            !multiProvider
        ) {
            return;
        }

        const timer = setInterval(() => {
            handleGetGameInfo();
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    }, [
        multiProvider,
        tokenId,
        tacToeBurner,
        multiMercuryBaseContract,
        multiSkylabBidTacToeFactoryContract,
    ]);

    return (
        <Box
            pos="relative"
            bgRepeat="no-repeat,no-repeat"
            height="100%"
            bgPos={"center bottom,center center"}
            bgSize={"100%,100% 100%"}
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
                padding: "1.4063vw 3.125vw",
            }}
            justifyContent={isPc ? "flex-start" : "center"}
        >
            <Box
                sx={{
                    height: "5.3704vh",
                    position: "relative",
                    width: "100%",
                }}
            >
                <ToolBar
                    quitType="wait"
                    onQuitClick={() => {
                        onOpen();
                    }}
                ></ToolBar>
            </Box>

            <DotLoading
                text={"Matching"}
                fontSize={isPc ? "16px" : "12px"}
            ></DotLoading>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "1vh",
                }}
            >
                <PlaneImg detail={myInfo} pilotInfo={myActivePilot}></PlaneImg>
                <Text
                    sx={{
                        fontSize: isPc ? "2.5vw" : "36px",
                        margin: "0 1.5625vw",
                    }}
                >
                    VS
                </Text>
                <PlaneImg
                    detail={opInfo}
                    flip={true}
                    pilotInfo={opActivePilot}
                ></PlaneImg>
            </Box>
            <StopMatch
                onClick={() => {
                    onOpen();
                }}
            ></StopMatch>
            {showPlayWithBot && (
                <Image
                    onClick={handlePlayWithBot}
                    src={PlayWithBot}
                    sx={{
                        position: "absolute",
                        right: 0,
                        bottom: 0,
                        cursor: "pointer",
                        width: isPc ? "300px" : "120px",
                    }}
                ></Image>
            )}
            <QuitModal
                onConfirm={handleQuit}
                isOpen={isOpen}
                onClose={onClose}
                quitType="wait"
            ></QuitModal>
        </Box>
    );
};

export default MatchPage;
