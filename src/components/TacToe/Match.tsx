import { useEffect, useState } from "react";
import {
    Box,
    Flex,
    Image,
    Text,
    useDisclosure,
    useMediaQuery,
} from "@chakra-ui/react";
import { useGameContext } from "@/pages/Match";
import { motion } from "framer-motion";
import LoadingIcon from "@/assets/loading.svg";
import { getMetadataImg } from "@/utils/ipfsImg";
import {
    useMultiProvider,
    useMultiSkylabBidTacToeFactoryContract,
    useMultiSkylabBidTacToeGameContract,
    useMultiMercuryBaseContract,
} from "@/hooks/useMultiContract";
import { botAddress } from "@/hooks/useContract";
import QuitModal from "@/components/BttComponents/QuitModal";
import { getDefaultWithProvider, useTacToeSigner } from "@/hooks/useSigner";
import { ZERO_DATA } from "@/skyConstants";
import { useNavigate } from "react-router-dom";
import { handleError } from "@/utils/error";
import { useBidTacToeFactoryRetry } from "@/hooks/useRetryContract";
import ToolBar from "../BttComponents/Toolbar";
import useSkyToast from "@/hooks/useSkyToast";
import DotLoading from "../Loading/DotLoading";
import PlayWithBot from "./assets/playbot.png";
import { useSubmitRequest } from "@/contexts/SubmitRequest";
import { bttFactoryIface } from "@/skyConstants/iface";
import ArrowIcon from "./assets/arrow-up.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { TG_URL } from "@/skyConstants/tgConfig";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import { Info, UserMarkType } from "@/skyConstants/bttGameTypes";

const randomText = [
    ["*When the game starts, ", "you have 12 hours to make each move"],
    [
        "* Link wallet with Bid Tac Toe telegram bot to ",
        "receive game status notification",
    ],
];

const PlaneImg = ({ detail, flip }: { detail: Info; flip?: boolean }) => {
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
                            width: isPc ? "280px" : "136px",
                            transform: flip ? "scaleX(-1)" : "",
                            /*兼容IE*/
                            filter: "FlipH",
                        }}
                    ></Image>
                </Box>
            ) : (
                <Box
                    sx={{
                        width: isPc ? "280px" : "136px",
                        height: isPc ? "280px" : "136px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <motion.img
                        src={LoadingIcon}
                        style={{
                            width: isPc ? "120px" : "58px",
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
    const { address } = usePrivyAccounts();

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <Flex
                onClick={onClick}
                align={"center"}
                justify={"center"}
                sx={{
                    border: "3px solid #bcbbbe",
                    width: isPc ? "320px " : "180px !important",
                    height: isPc ? "64px !important" : "50px !important",
                    background: "#303030",
                    marginTop: isPc ? "150px" : "20px",
                    borderRadius: isPc ? "12px" : "10px !important",
                    fontSize: isPc ? "24px" : "14px",
                    cursor: "pointer",
                }}
            >
                Quit Matching
            </Flex>
            <Flex
                onClick={() => {
                    window.open(`${TG_URL}?start=${address}`, "_blank");
                }}
                align={"center"}
                justify={"center"}
                sx={{
                    border: "3px solid #bcbbbe",
                    width: isPc ? "320px" : "180px !important",
                    height: isPc ? "64px !important" : "50px !important",
                    background: "#303030",
                    marginTop: isPc ? "32px" : "16px",
                    borderRadius: isPc ? "12px" : "10px !important",
                    fontSize: isPc ? "24px" : "14px",
                    cursor: "pointer",
                }}
            >
                Link Wallet with TG Bot
            </Flex>
            <Flex
                flexDir={"column"}
                align={"center"}
                sx={{
                    marginTop: isPc ? "16px" : "10px",
                }}
            >
                <Image
                    src={ArrowIcon}
                    sx={{
                        width: isPc ? "16px" : "12px",
                    }}
                ></Image>
                <Text
                    sx={{
                        fontSize: isPc ? "18px" : "12px",
                        marginTop: "4px",
                    }}
                >
                    You can click to go to TG-Bot to bind your wallet
                </Text>
            </Flex>
        </Box>
    );
};

export const MatchPage = ({
    onChangeInfo,
    onChangeMileage,
    onChangePoint,
}: {
    onChangeMileage: (winMileage: number, loseMileage: number) => void;
    onChangePoint: (winPoint: number, losePoint: number) => void;
    onChangeInfo: (position: "my" | "op", info: Info) => void;
}) => {
    const [gameAddress, setGameAddress] = useState("");
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
        tokenId,
        avaitionAddress,
        handleGetGas,
    } = useGameContext();

    const tacToeFactoryRetryWrite = useBidTacToeFactoryRetry(tokenId);
    const multiProvider = useMultiProvider(realChainId);
    const [tacToeBurner] = useTacToeSigner(tokenId);

    const multiMercuryBaseContract = useMultiMercuryBaseContract(realChainId);
    const multiSkylabBidTacToeGameContract =
        useMultiSkylabBidTacToeGameContract(gameAddress);
    const multiSkylabBidTacToeFactoryContract =
        useMultiSkylabBidTacToeFactoryContract(realChainId);

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
            mark: UserMarkType.Circle,
        };
        const player2Info = {
            burner: playerAddress2,
            address: account2,
            point: point2.toNumber(),
            level: level2.toNumber(),
            img: getMetadataImg(mtadata2),
            mark: UserMarkType.Cross,
        };

        if (player1Info.burner === tacToeBurner.account.address) {
            onChangePoint(player1Move.toNumber(), player2Move.toNumber());
            onChangeMileage(
                player1WinMileage.toNumber(),
                player1LoseMileage.toNumber(),
            );
            onChangeInfo("my", { ...player1Info });
            onChangeInfo("op", { ...player2Info });
        } else {
            onChangeMileage(
                player2WinMileage.toNumber(),
                player2LoseMileage.toNumber(),
            );
            onChangePoint(player2Move.toNumber(), player1Move.toNumber());
            onChangeInfo("my", { ...player2Info });
            onChangeInfo("op", { ...player1Info });
        }
        setTimeout(() => {
            const url = `/btt/game?gameAddress=${gameAddress}&tokenId=${tokenId}`;
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
        handleGetHuamnAndHumanInfo(playerAddress1, playerAddress2);
    };

    // get my and op info
    const handleGetGameInfo = async () => {
        try {
            let operateAddress = tacToeBurner.account.address;

            const [bidTacToeGameAddress, defaultGameQueue] =
                await multiProvider.all([
                    multiSkylabBidTacToeFactoryContract.gamePerPlayer(
                        operateAddress,
                    ),
                    multiSkylabBidTacToeFactoryContract.defaultGameQueue(
                        avaitionAddress,
                    ),
                ]);

            if (bidTacToeGameAddress === ZERO_DATA) {
                if (operateAddress !== defaultGameQueue) {
                    navigate("/");
                    return;
                }

                const [account, level, mtadata, point, joinDefaultQueueTime] =
                    await multiProvider.all([
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

                if (Number(joinDefaultQueueTime.toString()) + 45 <= current) {
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
                    mark: UserMarkType.Empty,
                });
                onChangeInfo("op", {
                    burner: "",
                    address: "",
                    level: 0,
                    point: 0,
                    img: "",
                    mark: UserMarkType.Empty,
                });
            } else {
                setShowPlayWithBot(false);
                setGameAddress(bidTacToeGameAddress);
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
            const createBotGameReceipt = await tacToeFactoryRetryWrite(
                "playWithBotAfterDefaultQueueTimer",
                [avaitionAddress, botAddress[realChainId]],
                {
                    gasLimit: 1550000,
                    signer: defaultSinger,
                },
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

            navigate(
                `/btt/game?gameAddress=${startBotGameData.args.gameAddress}&tokenId=${tokenId}`,
            );
            closeLoading();
        } catch (error) {
            console.log(error);
            closeLoading();
            toast(handleError(error));
        }
    };

    const handleQuit = async () => {
        try {
            await tacToeFactoryRetryWrite("withdrawFromQueue", [], {
                gasLimit: 250000,
            });
            const url = `/btt?tokenId=${tokenId}`;
            handleGetGas();
            navigate(url);
            onClose();
        } catch (error) {
            console.log(error);
            toast(handleError(error));
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
            !multiProvider ||
            isLoading
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
        isLoading,
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
                padding: "24px 24px",
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

            <Box
                sx={{
                    fontWeight: 700,
                }}
            >
                <DotLoading
                    text={"Matching"}
                    fontSize={isPc ? "28px" : "20px"}
                ></DotLoading>
            </Box>
            <Swiper
                style={{
                    width: "100%",
                    position: "relative",
                    marginTop: "16px",
                }}
                modules={[Autoplay]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
            >
                {randomText.map((item, index) => {
                    return (
                        <SwiperSlide
                            key={index}
                            style={{
                                background: "transparent",
                                textAlign: "center",
                                color: "#FDDC2D",
                            }}
                        >
                            <Box>
                                {item.map((item1, index1) => {
                                    return (
                                        <Text
                                            sx={{
                                                fontSize: isPc
                                                    ? "16px"
                                                    : "12px",
                                            }}
                                            key={index1}
                                        >
                                            {item1}
                                        </Text>
                                    );
                                })}
                            </Box>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "1vh",
                }}
            >
                <PlaneImg detail={myInfo}></PlaneImg>
                <Text
                    sx={{
                        fontSize: isPc ? "32px" : "20px",
                        margin: "0 30px",
                    }}
                >
                    VS
                </Text>
                <PlaneImg detail={opInfo} flip={true}></PlaneImg>
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
