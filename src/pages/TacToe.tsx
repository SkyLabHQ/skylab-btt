import { Box } from "@chakra-ui/react";
import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import "@reactour/popover/dist/index.css"; // arrow css
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";
import { getTestflightSigner, useTacToeSigner } from "@/hooks/useSigner";
import ResultPlayBack from "@/components/TacToe/ResultPlayBack";
import TacToePage from "@/components/TacToe";
import SettlementPage from "@/components/TacToe/SettlementPage";
import BttHelmet from "@/components/Helmet/BttHelmet";
import { PilotInfo, usePilotInfo } from "@/hooks/usePilotInfo";
import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import { useChainId } from "wagmi";
import { getViemClients } from "@/utils/viem";
import {
    botAddress,
    mercuryJarTournamentAddress,
    skylabTestFlightAddress,
} from "@/hooks/useContract";
import {
    BoardItem,
    GameInfo,
    GameState,
    RobotImg,
    UserMarkType,
    getWinState,
    initBoard,
    winPatterns,
} from "@/skyConstants/bttGameTypes";
import GameOver from "@/components/TacToe/GameOver";
import ReactCanvasNest from "react-canvas-nest";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import LoadingPage from "@/components/PrivateLobby/LoadingPage";
import {
    useMultiMercuryBaseContract,
    useMultiProvider,
    useMultiSkylabBidTacToeFactoryContract,
    useMultiSkylabBidTacToeGameContract,
} from "@/hooks/useMultiContract";
import { getMetadataImg } from "@/utils/ipfsImg";
import { ZERO_DATA } from "@/skyConstants";
import { getSCWallet } from "@/hooks/useSCWallet";
import Nest from "@/components/Nest";

export interface Info {
    burner: string;
    address: string;
    level: number;
    point: number;
    img: string;
    mark: UserMarkType;
    isBot?: boolean;
}

export interface MyNewInfo {
    level: number;
    point: number;
    img?: string;
}

export enum GameType {
    Unkown,
    HumanWithHuman,
    HumanWithBot,
}

const GameContext = createContext<{
    realChainId: number;
    istest: boolean;
    gameType: GameType;
    list: BoardItem[];
    tokenId: number;
    myNewInfo: MyNewInfo;
    myInfo: Info;
    opInfo: Info;
    myGameInfo: GameInfo;
    opGameInfo: GameInfo;
    bidTacToeGameAddress: string;
    myActivePilot: PilotInfo;
    opActivePilot: PilotInfo;
    avaitionAddress: string;
    mileages: {
        winMileage: number;
        loseMileage: number;
    };
    points: {
        winPoint: number;
        losePoint: number;
    };
    onStep: (step?: number) => void;
    handleGetGas: () => void;
    setBidTacToeGameAddress: (address: string) => void;
}>(null);
export const useGameContext = () => useContext(GameContext);

const TacToe = () => {
    const navitate = useNavigate();
    const chainId = useChainId();
    const { address } = usePrivyAccounts();
    const [gameType, setGameType] = useState<GameType>(GameType.Unkown);
    const [mileages, setMileages] = useState<{
        winMileage: number;
        loseMileage: number;
    }>({
        winMileage: 0,
        loseMileage: 0,
    });

    const [points, setPoints] = useState<{
        winPoint: number;
        losePoint: number;
    }>({
        winPoint: 0,
        losePoint: 0,
    });

    const { search } = useLocation();
    const params = qs.parse(search) as any;
    const istest = params.testflight === "true";
    const realChainId = istest ? TESTFLIGHT_CHAINID : chainId;
    const multiProvider = useMultiProvider(realChainId);
    const [myNewInfo, setMyNewInfo] = useState<MyNewInfo>(null); // if game over update my info
    const avaitionAddress = istest
        ? skylabTestFlightAddress[TESTFLIGHT_CHAINID]
        : mercuryJarTournamentAddress[realChainId];
    const [myInfo, setMyInfo] = useState<Info>({
        burner: "",
        address: "",
        level: 0,
        point: 0,
        img: "",
        mark: UserMarkType.Empty,
    });
    const [opInfo, setOpInfo] = useState<Info>({
        burner: "",
        address: "",
        level: 0,
        point: 0,
        img: "",
        mark: UserMarkType.Empty,
    });
    const ethcallProvider = useMultiProvider(realChainId);
    const [tokenId] = useState<number>(params.tokenId);
    const initRef = useRef<boolean>(false);
    const [burnerWallet] = useTacToeSigner(tokenId, istest);
    const { activePilot: myActivePilot } = usePilotInfo(address);
    const { activePilot: opActivePilot } = usePilotInfo(opInfo.address);
    const [showAnimateNumber, setShowAnimate] = useState<number>(-1);
    const [myGameInfo, setMyGameInfo] = useState<GameInfo>({
        balance: 0,
        gameState: GameState.Unknown,
        timeout: 0,
        message: 0,
        emote: 0,
    });

    const [opGameInfo, setOpGameInfo] = useState<GameInfo>({
        balance: 0,
        gameState: GameState.Unknown,
        timeout: 0,
        message: 0,
        emote: 0,
    });

    const [bidTacToeGameAddress, setBidTacToeGameAddress] = useState<string>(
        params.gameAddress,
    );

    const [currentGrid, setCurrentGrid] = useState<number>(-1);
    const [step, setStep] = useState(0);
    const [list, setList] = useState<BoardItem[]>(initBoard()); // init board
    const [nextDrawWinner, setNextDrawWinner] = useState<string>("");
    const multiMercuryBaseContract = useMultiMercuryBaseContract(realChainId);
    const multiSkylabBidTacToeGameContract =
        useMultiSkylabBidTacToeGameContract(bidTacToeGameAddress);
    const multiSkylabBidTacToeFactoryContract =
        useMultiSkylabBidTacToeFactoryContract(realChainId);
    const handleStep = (step?: number) => {
        if (step === undefined) {
            setStep((step) => step + 1);
            return;
        }
        setStep(step);
    };

    const handleGetGas = async () => {
        console.log("start transfer gas");

        const publicClient: any = getViemClients({ chainId: realChainId });
        const balance = await publicClient.getBalance({
            address: burnerWallet.account.address,
        });
        const gasPrice = await publicClient.getGasPrice();
        const fasterGasPrice = (gasPrice * BigInt(110)) / BigInt(100);
        const gasFee = fasterGasPrice * BigInt(21000);
        const l1Fees = BigInt(100000000000000);

        if (balance - l1Fees < gasFee) {
            return;
        }

        const value = balance - gasFee - l1Fees;
        const transferResult = await burnerWallet.sendTransaction({
            to: address,
            value: value,
            gasLimit: 21000,
            gasPrice: fasterGasPrice,
        });

        console.log("transfer remain balance", transferResult);
    };

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

        const testflightSinger = getTestflightSigner(TESTFLIGHT_CHAINID);

        const { sCWAddress } = await getSCWallet(testflightSinger.privateKey);

        if (playerAddress1 !== sCWAddress) {
            navitate("/");
            return;
        }

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
    };

    const onChangeGame = (position: "my" | "op", info: GameInfo) => {
        if (position === "my") {
            setMyGameInfo(info);
            return;
        }
        if (position === "op") {
            setOpGameInfo(info);
            return;
        }
    };

    const onGameType = (gameType: GameType) => {
        setGameType(gameType);
    };

    const onChangeMileage = (winMileage: number, loseMileage: number) => {
        setMileages({
            winMileage,
            loseMileage,
        });
    };

    const onChangePoint = (winPoint: number, losePoint: number) => {
        setPoints({
            winPoint,
            losePoint,
        });
    };

    const onChangeInfo = (position: "my" | "op", info: Info) => {
        if (position === "my") {
            setMyInfo(info);
            return;
        }
        if (position === "op") {
            setOpInfo(info);
            return;
        }
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

        if (player1Info.burner === burnerWallet.account.address) {
            onChangePoint(player1Move.toNumber(), player2Move.toNumber());
            onChangeMileage(
                player1WinMileage.toNumber(),
                player1LoseMileage.toNumber(),
            );
            onChangeInfo("my", { ...player1Info, mark: UserMarkType.Circle });
            onChangeInfo("op", { ...player2Info, mark: UserMarkType.Cross });
        } else if (player2Info.burner === burnerWallet.account.address) {
            onChangeMileage(
                player2WinMileage.toNumber(),
                player2LoseMileage.toNumber(),
            );
            onChangePoint(player2Move.toNumber(), player1Move.toNumber());
            onChangeInfo("my", { ...player2Info, mark: UserMarkType.Cross });
            onChangeInfo("op", { ...player1Info, mark: UserMarkType.Circle });
        } else {
            navitate("/");
            return;
        }
        onGameType(GameType.HumanWithHuman);
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

    const handleGetGameInfo = async () => {
        try {
            const [
                resCurrentGrid,
                boardGrids,
                myBalance,
                myGameState,
                myRevealedBid,
                myTimeout,
                myMessage,
                myEmote,
                opBalance,
                opGameState,
                opRevealedBid,
                opTimeout,
                opMessage,
                opEmote,
                nextDrawWinner,
            ] = await ethcallProvider.all([
                multiSkylabBidTacToeGameContract.currentSelectedGrid(),
                multiSkylabBidTacToeGameContract.getGrid(),
                multiSkylabBidTacToeGameContract.balances(myInfo.burner),
                multiSkylabBidTacToeGameContract.gameStates(myInfo.burner),
                multiSkylabBidTacToeGameContract.getRevealedBids(myInfo.burner),
                multiSkylabBidTacToeGameContract.timeouts(myInfo.burner),
                multiSkylabBidTacToeGameContract.playerMessage(myInfo.burner),
                multiSkylabBidTacToeGameContract.playerEmote(myInfo.burner),
                multiSkylabBidTacToeGameContract.balances(opInfo.burner),
                multiSkylabBidTacToeGameContract.gameStates(opInfo.burner),
                multiSkylabBidTacToeGameContract.getRevealedBids(opInfo.burner),
                multiSkylabBidTacToeGameContract.timeouts(opInfo.burner),
                multiSkylabBidTacToeGameContract.playerMessage(opInfo.burner),
                multiSkylabBidTacToeGameContract.playerEmote(opInfo.burner),
                multiSkylabBidTacToeGameContract.nextDrawWinner(),
            ]);

            if (showAnimateNumber === -1) {
                setShowAnimate(resCurrentGrid.toNumber());
            } else if (resCurrentGrid.toNumber() !== currentGrid) {
                setShowAnimate(currentGrid);
            }
            const _list = JSON.parse(JSON.stringify(list));
            const gameState = myGameState.toNumber();
            for (let i = 0; i < boardGrids.length; i++) {
                if (boardGrids[i] === ZERO_DATA) {
                    _list[i].mark = UserMarkType.Empty;
                } else if (boardGrids[i] === myInfo.burner) {
                    _list[i].mark = myInfo.mark;
                } else if (boardGrids[i] === opInfo.burner) {
                    _list[i].mark = opInfo.mark;
                }
                _list[i].myValue = myRevealedBid[i].toNumber();
                _list[i].opValue = opRevealedBid[i].toNumber();
                _list[i].myMark = myInfo.mark;
                _list[i].opMark = opInfo.mark;
            }
            if (
                [
                    GameState.WaitingForBid,
                    GameState.Commited,
                    GameState.Revealed,
                ].includes(gameState)
            ) {
                _list[resCurrentGrid.toNumber()].mark = UserMarkType.Square;
            }

            // game over result
            if (gameState > GameState.Revealed) {
                const myIsWin = getWinState(gameState);
                const burner = myIsWin ? myInfo.burner : opInfo.burner;
                let mark;
                if (myIsWin) {
                    mark =
                        myInfo.mark === UserMarkType.Circle
                            ? UserMarkType.YellowCircle
                            : myInfo.mark === UserMarkType.Cross
                            ? UserMarkType.YellowCross
                            : UserMarkType.YellowBotX;
                } else {
                    mark =
                        opInfo.mark === UserMarkType.Circle
                            ? UserMarkType.YellowCircle
                            : opInfo.mark === UserMarkType.Cross
                            ? UserMarkType.YellowCross
                            : UserMarkType.YellowBotX;
                }
                if (
                    gameState === GameState.WinByConnecting ||
                    gameState === GameState.LoseByConnecting
                ) {
                    for (let i = 0; i < winPatterns.length; i++) {
                        const index0 = winPatterns[i][0];
                        const index1 = winPatterns[i][1];
                        const index2 = winPatterns[i][2];
                        if (
                            boardGrids[index0] === burner &&
                            boardGrids[index1] === burner &&
                            boardGrids[index2] === burner
                        ) {
                            _list[index0].mark = mark;
                            _list[index1].mark = mark;
                            _list[index2].mark = mark;
                            break;
                        }
                    }
                } else {
                    for (let i = 0; i < boardGrids.length; i++) {
                        if (boardGrids[i] === burner) {
                            _list[i].mark = mark;
                        }
                    }
                }
            }
            setCurrentGrid(resCurrentGrid.toNumber());
            setList(_list);
            onChangeGame("my", {
                balance: myBalance.toNumber(),
                gameState: myGameState.toNumber(),
                timeout: myTimeout.toNumber(),
                message: myMessage.toNumber(),
                emote: myEmote.toNumber(),
            });

            onChangeGame("op", {
                balance: opBalance.toNumber(),
                gameState: opGameState.toNumber(),
                timeout: opTimeout.toNumber(),
                message: opMessage.toNumber(),
                emote: opEmote.toNumber(),
            });
            setNextDrawWinner(nextDrawWinner);
            if (!initRef.current) {
                initRef.current = true;
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (
            !multiProvider ||
            !multiSkylabBidTacToeGameContract ||
            !multiSkylabBidTacToeFactoryContract
        ) {
            return;
        }
        handleGetAllPlayerInfo();
    }, [
        multiProvider,
        multiSkylabBidTacToeGameContract,
        multiSkylabBidTacToeFactoryContract,
    ]);

    useEffect(() => {
        if (
            !multiSkylabBidTacToeGameContract ||
            !ethcallProvider ||
            !myInfo.burner ||
            !opInfo.burner ||
            step !== 0
        )
            return;

        const timer = setInterval(() => {
            handleGetGameInfo();
        }, 3000);
        return () => {
            clearInterval(timer);
        };
    }, [
        multiSkylabBidTacToeGameContract,
        ethcallProvider,
        myInfo.burner,
        opInfo.burner,
        step,
    ]);

    return (
        <Box
            sx={{
                height: "100%",
            }}
        >
            <BttHelmet></BttHelmet>
            {!initRef.current ? (
                <LoadingPage></LoadingPage>
            ) : (
                <Box
                    sx={{
                        height: "100%",
                        fontFamily: "Quantico",
                        width: "100%",
                    }}
                >
                    <GameContext.Provider
                        value={{
                            realChainId,
                            gameType,
                            istest,
                            myActivePilot,
                            opActivePilot,
                            myInfo,
                            opInfo,
                            myNewInfo,
                            tokenId,
                            myGameInfo,
                            opGameInfo,
                            list,
                            bidTacToeGameAddress,
                            mileages,
                            points,
                            avaitionAddress,
                            onStep: handleStep,
                            handleGetGas: handleGetGas,
                            setBidTacToeGameAddress,
                        }}
                    >
                        <Box
                            sx={{
                                height: "100%",
                            }}
                        >
                            {step === 0 && (
                                <TacToePage
                                    showAnimateNumber={showAnimateNumber}
                                    currentGrid={currentGrid}
                                    nextDrawWinner={nextDrawWinner}
                                    handleGetGameInfo={handleGetGameInfo}
                                    onChangeGame={onChangeGame}
                                    onChangeNewInfo={(info: MyNewInfo) => {
                                        setMyNewInfo(info);
                                    }}
                                ></TacToePage>
                            )}
                            {step === 1 && <GameOver></GameOver>}
                            {step === 2 && <ResultPlayBack></ResultPlayBack>}
                            {step === 3 && <SettlementPage></SettlementPage>}
                        </Box>
                    </GameContext.Provider>
                </Box>
            )}

            <Nest />
        </Box>
    );
};

export default TacToe;
