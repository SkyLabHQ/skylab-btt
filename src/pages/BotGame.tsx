import { Box } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import "@reactour/popover/dist/index.css"; // arrow css
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";
import { getBotGameSigner } from "@/hooks/useSigner";
import ResultPlayBack from "@/components/BotGame/ResultPlayBack";
import TacToePage from "@/components/BotGame";
import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import {
    BoardItem,
    GameInfo,
    GameState,
    Info,
    RobotImg,
    UserMarkType,
    getWinState,
    initBoard,
    winPatterns,
} from "@/skyConstants/bttGameTypes";
import GameOver from "@/components/BotGame/GameOver";
import LoadingPage from "@/components/LoadingPage";
import {
    useMultiMercuryBaseContractTest,
    useMultiProvider,
    useMultiSkylabBidTacToeGameContract,
    useMultiTestSkylabBidTacToeFactoryContract,
} from "@/hooks/useMultiContract";
import { getMetadataImg } from "@/utils/ipfsImg";
import { ZERO_DATA } from "@/skyConstants";
import { useSCWallet } from "@/hooks/useSCWallet";
import Nest from "@/components/Nest";

const BotGame = () => {
    const navitate = useNavigate();
    const { search } = useLocation();
    const params = qs.parse(search) as any;
    const multiProvider = useMultiProvider(TESTFLIGHT_CHAINID);
    const [myInfo, setMyInfo] = useState<Info>({
        burner: "",
        address: "",
        level: 0,
        img: "",
        mark: UserMarkType.Empty,
    });
    const [opInfo, setOpInfo] = useState<Info>({
        burner: "",
        address: "",
        level: 0,
        img: "",
        mark: UserMarkType.Empty,
    });
    const [gameAddress] = useState<string>(params.gameAddress);
    const [tokenId, setTokenId] = useState<number>(null);
    const initRef = useRef<boolean>(false);
    const burnerWallet = getBotGameSigner(gameAddress);
    const { sCWAddress } = useSCWallet(burnerWallet.privateKey);
    const [showAnimateNumber, setShowAnimate] = useState<number>(-1);
    const [myGameInfo, setMyGameInfo] = useState<GameInfo>({
        balance: 0,
        gameState: GameState.Unknown,
        timeout: 0,
    });

    const [opGameInfo, setOpGameInfo] = useState<GameInfo>({
        balance: 0,
        gameState: GameState.Unknown,
        timeout: 0,
    });

    const [currentGrid, setCurrentGrid] = useState<number>(-1);
    const [step, setStep] = useState(0);
    const [list, setList] = useState<BoardItem[]>(initBoard()); // init board
    const [nextDrawWinner, setNextDrawWinner] = useState<string>("");
    const multiMercuryBaseContract = useMultiMercuryBaseContractTest();
    const multiSkylabBidTacToeGameContract =
        useMultiSkylabBidTacToeGameContract(gameAddress);
    const multiSkylabBidTacToeFactoryContract =
        useMultiTestSkylabBidTacToeFactoryContract();
    const handleStep = (step?: number) => {
        if (step === undefined) {
            setStep((step) => step + 1);
            return;
        }
        setStep(step);
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
        setTokenId(tokenId1.toNumber());

        const [account1, level1, mtadata1] = await multiProvider.all([
            multiMercuryBaseContract.ownerOf(tokenId1),
            multiMercuryBaseContract.aviationLevels(tokenId1),
            multiMercuryBaseContract.tokenURI(tokenId1),
        ]);

        if (playerAddress1.toLocaleLowerCase() !== sCWAddress) {
            navitate("/");
            return;
        }

        const player1Info = {
            burner: playerAddress1,
            address: account1,
            level: level1.toNumber(),
            img: getMetadataImg(mtadata1),
        };
        const botInfo = {
            burner: playerAddress2,
            address: playerAddress2,
            level: level1.toNumber(),
            img: RobotImg,
            isBot: true,
        };
        onChangeInfo("my", { ...player1Info, mark: UserMarkType.Circle });
        onChangeInfo("op", { ...botInfo, mark: UserMarkType.BotX });
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

    const handleGetAllPlayerInfo = async () => {
        try {
            const [playerAddress1, playerAddress2] = await multiProvider.all([
                multiSkylabBidTacToeGameContract.player1(),
                multiSkylabBidTacToeGameContract.player2(),
            ]);

            console.log("playerAddress1", playerAddress1);
            console.log("playerAddress2", playerAddress2);

            handleGetHuamnAndBotInfo(playerAddress1, playerAddress2);
        } catch (e) {
            console.log(e);
            navitate("/");
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

                opBalance,
                opGameState,
                opRevealedBid,
                opTimeout,

                nextDrawWinner,
            ] = await multiProvider.all([
                multiSkylabBidTacToeGameContract.currentSelectedGrid(),
                multiSkylabBidTacToeGameContract.getGrid(),
                multiSkylabBidTacToeGameContract.balances(myInfo.burner),
                multiSkylabBidTacToeGameContract.gameStates(myInfo.burner),
                multiSkylabBidTacToeGameContract.getRevealedBids(myInfo.burner),
                multiSkylabBidTacToeGameContract.timeouts(myInfo.burner),
                multiSkylabBidTacToeGameContract.balances(opInfo.burner),
                multiSkylabBidTacToeGameContract.gameStates(opInfo.burner),
                multiSkylabBidTacToeGameContract.getRevealedBids(opInfo.burner),
                multiSkylabBidTacToeGameContract.timeouts(opInfo.burner),
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
            });

            onChangeGame("op", {
                balance: opBalance.toNumber(),
                gameState: opGameState.toNumber(),
                timeout: opTimeout.toNumber(),
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
            !multiSkylabBidTacToeFactoryContract ||
            !sCWAddress
        ) {
            return;
        }

        handleGetAllPlayerInfo();
    }, [
        multiProvider,
        multiSkylabBidTacToeGameContract,
        multiSkylabBidTacToeFactoryContract,
        sCWAddress,
    ]);

    useEffect(() => {
        if (
            !multiSkylabBidTacToeGameContract ||
            !multiProvider ||
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
        multiProvider,
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
                    {step === 0 && (
                        <TacToePage
                            showAnimateNumber={showAnimateNumber}
                            currentGrid={currentGrid}
                            nextDrawWinner={nextDrawWinner}
                            handleGetGameInfo={handleGetGameInfo}
                            onChangeGame={onChangeGame}
                            myInfo={myInfo}
                            opInfo={opInfo}
                            myGameInfo={myGameInfo}
                            opGameInfo={opGameInfo}
                            gameAddress={gameAddress}
                            tokenId={tokenId}
                            list={list}
                            onStep={handleStep}
                        ></TacToePage>
                    )}
                    {step === 1 && (
                        <GameOver
                            myInfo={myInfo}
                            opInfo={opInfo}
                            myGameInfo={myGameInfo}
                            opGameInfo={opGameInfo}
                            list={list}
                            onStep={handleStep}
                        ></GameOver>
                    )}
                    {step === 2 && (
                        <ResultPlayBack
                            gameAddress={gameAddress}
                            myInfo={myInfo}
                            myGameInfo={myGameInfo}
                            opInfo={opInfo}
                            opGameInfo={opGameInfo}
                        ></ResultPlayBack>
                    )}
                </Box>
            )}

            <Nest />
        </Box>
    );
};

export default BotGame;
