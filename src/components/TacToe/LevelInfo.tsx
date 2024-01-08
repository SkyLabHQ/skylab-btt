import { GameType, Info, useGameContext } from "@/pages/TacToe";
import { Box, Text, Image } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import LevelUpIcon from "./assets/level-up.svg";
import LevelDownIcon from "./assets/level-down.svg";
import useCountDown from "react-countdown-hook";
import { getLevel } from "@/utils/level";
import { PilotInfo } from "@/hooks/usePilotInfo";
import { GrayButton } from "../Button/Index";
import { useBttFactoryRetry } from "@/hooks/useRetryContract";
import { getTestflightSigner, useTacToeSigner } from "@/hooks/useSigner";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import Loading from "../Loading";
import { getSCWallet } from "@/hooks/useSCWallet";
import {
    useMultiMercuryBaseContract,
    useMultiProvider,
    useMultiSkylabBidTacToeFactoryContract,
    useMultiSkylabBidTacToeGameContract,
} from "@/hooks/useMultiContract";
import { ZERO_DATA } from "@/skyConstants";
import { useNavigate } from "react-router-dom";
import { useBlockNumber } from "@/contexts/BlockNumber";
import { getMetadataImg } from "@/utils/ipfsImg";
import { UserMarkType } from "@/skyConstants/bttGameTypes";

export const PlaneImg = ({
    detail,
    flip,
    pilotInfo,
}: {
    detail: Info;
    flip?: boolean;
    pilotInfo: PilotInfo;
}) => {
    return (
        <Box>
            <Box
                sx={{
                    position: "relative",
                }}
            >
                <Image
                    src={detail.img}
                    sx={{
                        width: "14.5833vw",
                        height: "14.5833vw",
                        transform: flip ? "scaleX(-1)" : "",
                        /*兼容IE*/
                        filter: "FlipH",
                    }}
                ></Image>
                {pilotInfo.img && (
                    <Image
                        sx={{
                            width: "3.3333vw",
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

            <Box
                sx={{
                    textAlign: "center",
                }}
            >
                <Text
                    sx={{
                        fontSize: "0.8333vw",
                        fontWeight: "bold",
                    }}
                >
                    Level {detail.level}{" "}
                </Text>
                <Text
                    sx={{
                        fontSize: "0.8333vw",
                        fontWeight: "bold",
                    }}
                >
                    {detail.point} pt
                </Text>
            </Box>
        </Box>
    );
};

const LevelInfo = ({
    myConfirmTimeout,
    opConfirmTimeout,
    onGameType,
    onChangeInfo,
    onSetConfirmTimeout,
}: {
    myConfirmTimeout: number;
    opConfirmTimeout: number;
    onGameType: (type: GameType) => void;
    onChangeInfo: (position: "my" | "op", info: Info) => void;
    onSetConfirmTimeout: (
        myConfirmTimeout: number,
        opConfirmTimeout: number,
    ) => void;
}) => {
    const {
        myInfo,
        opInfo,
        realChainId,
        points,
        myActivePilot,
        opActivePilot,
        tokenId,
        onStep,
        istest,
        avaitionAddress,
        bidTacToeGameAddress,
        setBidTacToeGameAddress,
    } = useGameContext();
    const navigate = useNavigate();
    const multiProvider = useMultiProvider(realChainId);
    const [timeLeft, { start }] = useCountDown(0, 1000);

    const { winPoint, losePoint } = points;
    console.log(points, "points");
    const toast = useSkyToast();
    const [loading, setLoading] = React.useState(false);
    const [tacToeBurner] = useTacToeSigner(tokenId);
    const { blockNumber } = useBlockNumber();
    const multiMercuryBaseContract = useMultiMercuryBaseContract(realChainId);
    const multiSkylabBidTacToeGameContract =
        useMultiSkylabBidTacToeGameContract(bidTacToeGameAddress);
    const multiSkylabBidTacToeFactoryContract =
        useMultiSkylabBidTacToeFactoryContract(realChainId);

    const bttFactoryContract = useBttFactoryRetry(false);

    // activeQueueTimeout
    const handleConfirmMatch = async () => {
        if (loading) return;
        setLoading(true);
        try {
            await bttFactoryContract("setActiveQueue", [], {
                signer: tacToeBurner,
                gasLimit: 1200000,
            });
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
            toast(handleError(e));
        }
    };

    const handleGetAllPlayerInfo = async () => {
        const [playerAddress1, playerAddress2] = await multiProvider.all([
            multiSkylabBidTacToeGameContract.player1(),
            multiSkylabBidTacToeGameContract.player2(),
        ]);
        if (playerAddress1 === tacToeBurner.account.address) {
            onChangeInfo("my", { ...myInfo, mark: UserMarkType.Circle });
            onChangeInfo("op", { ...opInfo, mark: UserMarkType.Cross });
        } else {
            onChangeInfo("my", { ...myInfo, mark: UserMarkType.Cross });
            onChangeInfo("op", { ...opInfo, mark: UserMarkType.Circle });
        }
        onGameType(GameType.HumanWithHuman);
        onStep(2);
    };

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

            console.log(bidTacToeGameAddress, "bidTacToeGameAddress");
            console.log(defaultGameQueue, "defaultGameQueue");
            console.log(opPlayer, "opPlayer");
            if (bidTacToeGameAddress === ZERO_DATA) {
                if (
                    operateAddress !== defaultGameQueue &&
                    opPlayer === ZERO_DATA
                ) {
                    navigate("/btt");
                    return;
                }

                if (opPlayer === ZERO_DATA) {
                    onSetConfirmTimeout(-1, -1);
                    onChangeInfo("op", {
                        burner: "",
                        address: "",
                        level: 0,
                        point: 0,
                        img: "",
                        mark: UserMarkType.Empty,
                    });
                    onStep(0);
                    return;
                }

                const [myConfirmTimeout, opConfirmTimeout] =
                    await multiProvider.all([
                        multiSkylabBidTacToeFactoryContract.playerToTimeout(
                            operateAddress,
                        ),
                        multiSkylabBidTacToeFactoryContract.playerToTimeout(
                            opPlayer,
                        ),
                    ]);

                onSetConfirmTimeout(
                    myConfirmTimeout.toNumber() * 1000,
                    opConfirmTimeout.toNumber() * 1000,
                );
            } else {
                setBidTacToeGameAddress(bidTacToeGameAddress);
                onSetConfirmTimeout(0, 0);
            }
        } catch (e: any) {
            console.log(e);
            navigate("/btt");
        }
    };

    // activeQueueTimeout
    const handleActiveQueueTimeout = async () => {
        try {
            await bttFactoryContract("activeQueueTimeout", [], {
                signer: tacToeBurner,
                gasLimit: 500000,
            });
        } catch (e) {
            console.log(e);
            toast(handleError(e));
        }
    };

    const [myWinNewLevel, myWinNewPoint, myLoseNewLevel, myLoseNewPoint] =
        useMemo(() => {
            const myWinNewPoint = myInfo.point + winPoint;
            const myWinNewLevel = getLevel(myWinNewPoint);
            const myLoseNewPoint = myInfo.point - losePoint;
            const myLoseNewLevel = getLevel(myLoseNewPoint);

            return [
                myWinNewLevel,
                myWinNewPoint,
                myLoseNewLevel,
                myLoseNewPoint,
            ];
        }, [winPoint, losePoint, myInfo, opInfo]);

    useEffect(() => {
        if (myConfirmTimeout <= 0 && opConfirmTimeout <= 0) {
            return;
        }
        const now = Date.now();

        if (myConfirmTimeout > now) {
            start(Math.floor((myConfirmTimeout - now) / 1000) * 1000);
        } else if (opConfirmTimeout > now) {
            start(Math.floor((opConfirmTimeout - now) / 1000) * 1000);
        }

        let timer: any = null;
        if (opConfirmTimeout < now && myConfirmTimeout < now) {
            handleActiveQueueTimeout();
        } else {
            const delOp = opConfirmTimeout - now + 1000;
            const delMy = myConfirmTimeout - now + 1000;
            timer = setTimeout(
                () => {
                    handleActiveQueueTimeout();
                },
                delOp > delMy ? delOp : delMy,
            );
        }

        return () => {
            timer && clearTimeout(timer);
        };
    }, [myConfirmTimeout, opConfirmTimeout]);

    useEffect(() => {
        if (
            !blockNumber ||
            !tokenId ||
            !tacToeBurner ||
            !multiSkylabBidTacToeFactoryContract ||
            !multiProvider
        ) {
            return;
        }
        handleGetGameInfo();
    }, [
        multiProvider,
        blockNumber,
        tokenId,
        tacToeBurner,
        multiMercuryBaseContract,
    ]);

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

    return (
        <Box
            sx={{
                fontFamily: "Orbitron",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            {loading && <Loading></Loading>}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "1vh",
                }}
            >
                <PlaneImg detail={myInfo} pilotInfo={myActivePilot}></PlaneImg>
                <Text sx={{ fontSize: "2.5vw", margin: "0 1.5625vw" }}>VS</Text>
                <PlaneImg
                    detail={opInfo}
                    flip={true}
                    pilotInfo={opActivePilot}
                ></PlaneImg>
            </Box>
            <Box
                sx={{
                    fontWeight: "bold",
                    marginTop: "10vh",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid #fff",
                        paddingBottom: "0.7813vw",
                    }}
                >
                    <Text
                        sx={{
                            color: "#FDDC2D",
                            fontSize: "1.0417vw",
                            width: "13.0208vw",
                        }}
                    >
                        Victory reward
                    </Text>
                    <Text
                        sx={{
                            marginRight: "0.5208vw",
                        }}
                    >
                        +{winPoint} pt
                    </Text>
                    <Image
                        src={LevelUpIcon}
                        sx={{
                            width: "1.25vw",
                            marginRight: "1.0417vw",
                        }}
                    ></Image>
                    <Box sx={{ textAlign: "center" }}>
                        <Text
                            sx={{
                                fontSize: "1.0417vw",
                            }}
                        >
                            Level {myWinNewLevel}
                        </Text>
                        <Text>{myWinNewPoint} pt</Text>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "3.125vw",
                        borderBottom: "1px solid #fff",
                        paddingBottom: "0.7813vw",
                    }}
                >
                    <Text
                        sx={{
                            color: "#fff",
                            fontSize: "1.0417vw",
                            width: "13.0208vw",
                        }}
                    >
                        Defeat penalty
                    </Text>
                    <Text
                        sx={{
                            marginRight: "0.5208vw",
                        }}
                    >
                        -{losePoint} pt
                    </Text>
                    <Image
                        src={LevelDownIcon}
                        sx={{
                            width: "1.25vw",
                            marginRight: "1.0417vw",
                        }}
                    ></Image>
                    <Box sx={{ textAlign: "center" }}>
                        <Text
                            sx={{
                                fontSize: "1.0417vw",
                            }}
                        >
                            Level {myLoseNewLevel}
                        </Text>
                        <Text>{myLoseNewPoint} pt</Text>
                    </Box>
                </Box>
            </Box>
            <GrayButton
                onClick={handleConfirmMatch}
                sx={{
                    width: "21.875vw !important",
                    height: "3.3333vw !important",
                    marginTop: "40px",
                }}
                isDisabled={myConfirmTimeout === 0}
                variant="outline"
            >
                <Box
                    sx={{
                        textAlign: "center",
                        width: "100%",
                    }}
                >
                    <Text
                        sx={{
                            fontSize: "1.25vw",

                            fontWeight: "400",
                        }}
                    >
                        Confirm entering
                    </Text>
                </Box>
            </GrayButton>

            <Text
                sx={{
                    fontSize: "1.25vw",
                    marginTop: "10px",
                }}
            >
                ({timeLeft / 1000}s)
            </Text>
            <Box
                sx={{
                    width: "21.875vw",
                    height: "0.2083vw",
                    display: "flex",
                    justifyContent: "flex-end",
                    background: "#616161",
                    marginTop: "0.4167vw",
                }}
            >
                <Box
                    sx={{
                        width: (timeLeft / 30000) * 100 + "%",
                        transition: "width 0.5s",
                        height: "0.2083vw",
                        background: "#BCBBBE",
                    }}
                ></Box>
            </Box>
        </Box>
    );
};

export default LevelInfo;
