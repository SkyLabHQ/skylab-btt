import { Box } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";
import BttHelmet from "@/components/Helmet/BttHelmet";
import PlayGame from "@/components/PrivateRoom/PlayGame";
import {
    BoardItem,
    initBoard,
    PvpGameStatus,
    UserMarkType,
} from "@/skyConstants/bttGameTypes";
import GameOver from "@/components/PrivateRoom/GameOver";
import ResultPlayBack from "@/components/PrivateRoom/ResultPlayBack";
import Nest from "@/components/Nest";
import { bid, getGameInfo, joinGame, surrender } from "@/api/pvpGame";
import { useInitData } from "@tma.js/sdk-react";
import useSkyToast from "@/hooks/useSkyToast";
import PvpMatch from "@/components/PrivateRoom/PvpMatch";
import Accept from "@/components/PrivateRoom/Accept";
import LoadingPage from "@/components/LoadingPage";
import Invited from "@/components/PrivateRoom/Invited";

export enum PLayerStatus {
    Player1,
    Player2,
}

export interface PvpGameInfo {
    tgId: number;
    nickname: string;
    balance: number;
    isBid: boolean;
    mark: UserMarkType;
    winMark: UserMarkType;
    playerStatus: PLayerStatus;
    gameState: PvpGameStatus;
}
const PvpGameContext = createContext<{
    myGameInfo: PvpGameInfo;
    opGameInfo: PvpGameInfo;
    list: BoardItem[];
    gameId: number;
    step: number;
    handleStepChange: (step?: number) => void;
    onList: (list: BoardItem[]) => void;
}>(null);
export const usePvpGameContext = () => useContext(PvpGameContext);

const PvpRoom = () => {
    const navigate = useNavigate();
    const [nextDrawWinner, setNextDrawWinner] = useState<string>("");
    const toast = useSkyToast();
    const initData = useInitData();
    const [init, setInit] = useState<boolean>(false);
    const [list, setList] = useState<BoardItem[]>(initBoard()); // init board
    const { search } = useLocation();
    const [step, setStep] = useState<number>(0);
    const params = qs.parse(search) as any;
    const [gameId] = useState<number>(params.gameId);
    const [invited] = useState<string>(params.invited);
    const [showAnimateNumber, setShowAnimate] = useState<number>(-1);
    const [currentGrid, setCurrentGrid] = useState<number>(-1);
    const [gameInfo, setGameInfo] = useState<any>({
        player1: 0,
        player2: 0,
        balance1: 0,
        balance2: 0,
        gameStatus1: PvpGameStatus.InProgress,
        gameStatus2: PvpGameStatus.InProgress,
        boards: [],
        nickname1: "",
        nickname2: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [currentRound, setCurrentRound] = useState<number>(0);
    const [bidAmount, setBidAmount] = useState<number>(0);

    const [gameTimeout, setGameTimeout] = useState<number>(0);

    const [myGameInfo, setMyGameInfo] = useState<PvpGameInfo>({
        tgId: 0,
        nickname: "",
        mark: UserMarkType.Empty,
        winMark: UserMarkType.Empty,
        balance: 0,
        isBid: false,
        playerStatus: null,
        gameState: PvpGameStatus.InProgress,
    });
    const [opGameInfo, setOpGameInfo] = useState<PvpGameInfo>({
        tgId: 0,
        nickname: "",
        mark: UserMarkType.Empty,
        winMark: UserMarkType.Empty,
        balance: 0,
        isBid: false,
        playerStatus: null,
        gameState: PvpGameStatus.InProgress,
    });

    const handleStep = (step?: number) => {
        if (step === undefined) {
            setStep((step) => step + 1);
            return;
        }
        setStep(step);
    };

    const handleBidAmount = (value: number) => {
        if (loading) return;
        if (myGameInfo.isBid) return;

        if (value < 0) return;
        if (value > myGameInfo.balance) return;
        setBidAmount(value);
    };

    const handleJoinGame = async () => {
        try {
            const res = await joinGame({ gameId: Number(gameId) });
            if (res.code === 200) {
                setGameInfo(res.data.game);
            }
        } catch (e) {
            toast(e + "");
        }
    };

    const handleChangeList = (list: any) => {
        setList(list);
    };

    const handleGameInfo = (gameInfo: any) => {
        const gridIndex = gameInfo.gridIndex;
        const gridOrder = gameInfo.gridOrder;
        const resCurrentGrid = gridOrder[gridIndex];

        if (showAnimateNumber === -1) {
            setShowAnimate(resCurrentGrid);
        } else if (resCurrentGrid !== currentGrid) {
            setShowAnimate(currentGrid);
        }

        setCurrentRound(gridIndex);
        const _list = JSON.parse(JSON.stringify(list));
        const boardGrids = gameInfo.boards;
        const isPlayer1 = initData.user.id == gameInfo.player1;

        const player1GameInfo = {
            balance: gameInfo.balance1,
            isBid: boardGrids[resCurrentGrid].isBid1,
            mark: UserMarkType.Circle,
            winMark: UserMarkType.YellowCircle,
            tgId: gameInfo.player1,
            nickname: gameInfo.nickname1,
            playerStatus: PLayerStatus.Player1,
            gameState: gameInfo.gameStatus1,
        };

        const player2GameInfo = {
            balance: gameInfo.balance2,
            isBid: boardGrids[resCurrentGrid].isBid2,
            mark: UserMarkType.Cross,
            winMark: UserMarkType.YellowCross,
            tgId: gameInfo.player2,
            nickname: gameInfo.nickname2,
            playerStatus: PLayerStatus.Player2,
            gameState: gameInfo.gameStatus2,
        };
        setGameTimeout(boardGrids[resCurrentGrid].timeout);
        const myGameInfo = isPlayer1 ? player1GameInfo : player2GameInfo;
        const opGameInfo = isPlayer1 ? player2GameInfo : player1GameInfo;

        for (let i = 0; i < boardGrids.length; i++) {
            const winAddress = boardGrids[i].win;
            if (winAddress == 0) {
                _list[i].mark = UserMarkType.Empty;
            } else {
                _list[i].mark =
                    winAddress === 1 ? UserMarkType.Circle : UserMarkType.Cross;
            }
            _list[i].myValue = isPlayer1
                ? boardGrids[i].bid1
                : boardGrids[i].bid2;
            _list[i].opValue = isPlayer1
                ? boardGrids[i].bid2
                : boardGrids[i].bid1;
            _list[i].myMark = myGameInfo.mark;
            _list[i].opMark = opGameInfo.mark;
        }

        if (PvpGameStatus.InProgress === player1GameInfo.gameState) {
            _list[resCurrentGrid].mark = UserMarkType.Square;
        }

        setCurrentGrid(resCurrentGrid);
        setMyGameInfo(myGameInfo);
        setOpGameInfo(opGameInfo);
        setNextDrawWinner(nextDrawWinner);
        setList(_list);
    };

    const handleGetGameInfo = async () => {
        if (!gameId) return;

        const res = await getGameInfo(Number(gameId));

        if (res.code != 200) {
            return;
        }

        const gameInfo = res.data.game;
        setGameInfo(gameInfo);
        if (!init) {
            setInit(true);
        }
    };

    const handleBid = async () => {
        try {
            if (currentGrid < 0) {
                console.log("currentGrid is not valid");
                return;
            }
            if (loading) {
                console.log("loading");
                return;
            }
            if (myGameInfo.isBid) {
                console.log("isBid");
                return;
            }

            setLoading(true);

            console.log(`currentGrid: ${currentGrid} bidAmount: ${bidAmount} `);
            const res = await bid({
                gameId,
                amount: bidAmount,
            });
            setLoading(false);
            if (res.code == 200) {
                const game = res.data.game;
                setGameInfo(game);
                setBidAmount(0);
            }
        } catch (e) {
            console.log(e);
            setLoading(false);
            toast(e + "");
        }
    };

    const handleQuit = async () => {
        try {
            const res = await surrender({
                gameId: Number(gameId),
            });

            if (res.code === 200) {
                setGameInfo(res.data.game);
            }
        } catch (e) {
            console.log(e);
            toast(e + "");
        }
    };

    useEffect(() => {
        if (
            !gameId ||
            myGameInfo.gameState !== PvpGameStatus.InProgress ||
            !initData.user.id
        )
            return;

        handleGetGameInfo();

        const timer = setInterval(() => {
            handleGetGameInfo();
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    }, [gameId, myGameInfo.gameState, initData.user.id]);

    useEffect(() => {
        if (!gameInfo.player1 || !gameInfo.player2) {
            return;
        }
        handleGameInfo(gameInfo);
    }, [gameInfo]);

    useEffect(() => {
        console.log("gameInfo", gameInfo);

        if (!gameInfo.player1 || !initData.user.id) return;
        if (gameInfo.gameStatus1 === PvpGameStatus.QuitByPlayer1) {
            navigate("/free/pvp/home");
            return;
        }

        if (!gameInfo.player2) {
            if (gameInfo.player1 == initData.user.id) {
                // match with myself
                setStep(0);
            } else {
                // join to match
                setStep(1);
            }
            return;
        }

        if (gameInfo.gameStatus1 === PvpGameStatus.InProgress) {
            setStep(2);
            return;
        }

        if (gameInfo.gameStatus1 > PvpGameStatus.InProgress) {
            setStep(3);
            return;
        }
    }, [
        gameInfo.gameStatus1,
        gameInfo.player1,
        gameInfo.player2,
        initData.user.id,
    ]);

    console.log(gameInfo.gameStatus1, "数据-----");

    return (
        <Box
            sx={{
                height: "100%",
            }}
        >
            <BttHelmet></BttHelmet>
            {init ? (
                <Box
                    sx={{
                        height: "100%",
                        fontFamily: "Quantico",
                        width: "100%",
                    }}
                >
                    <PvpGameContext.Provider
                        value={{
                            list,
                            myGameInfo,
                            opGameInfo,
                            gameId,
                            step,
                            handleStepChange: handleStep,
                            onList: handleChangeList,
                        }}
                    >
                        {step === 0 &&
                            (invited == "true" ? (
                                <Invited myGameInfo={myGameInfo}></Invited>
                            ) : (
                                <PvpMatch></PvpMatch>
                            ))}
                        {step === 1 && (
                            <Accept
                                gameInfo={gameInfo}
                                handleJoinGame={handleJoinGame}
                            ></Accept>
                        )}
                        {step === 2 && (
                            <PlayGame
                                bidAmount={bidAmount}
                                onBidAmount={(value) => {
                                    handleBidAmount(value);
                                }}
                                currentRound={currentRound}
                                gameTimeout={gameTimeout}
                                loading={loading}
                                onBid={handleBid}
                                showAnimateNumber={showAnimateNumber}
                                handleQuit={handleQuit}
                            ></PlayGame>
                        )}
                        {step === 3 && (
                            <GameOver
                                gameState={myGameInfo.gameState}
                            ></GameOver>
                        )}
                        {step === 4 && (
                            <ResultPlayBack
                                gameInfo={gameInfo}
                            ></ResultPlayBack>
                        )}
                    </PvpGameContext.Provider>
                </Box>
            ) : (
                <LoadingPage></LoadingPage>
            )}

            <Nest />
        </Box>
    );
};

export default PvpRoom;
