import { Box } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import "@reactour/popover/dist/index.css"; // arrow css
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";
import ResultPlayBack from "@/components/TacToe/ResultPlayBack";
import TacToePage from "@/components/TacToe";
import SettlementPage from "@/components/TacToe/SettlementPage";
import BttHelmet from "@/components/Helmet/BttHelmet";
import {
    BoardItem,
    Game2Status,
    UserMarkType,
    initBoard,
} from "@/skyConstants/bttGameTypes";
import GameOver from "@/components/TacToe/GameOver";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import LoadingPage from "@/components/LoadingPage";
import Nest from "@/components/Nest";
import { bid, getGameInfo, surrender } from "@/api/tournament";
import { PLayerStatus } from "./PvpRoom";
import useSkyToast from "@/hooks/useSkyToast";
import Match from "@/components/TacToe/Match";

export interface TournamentGameInfo {
    address: string;
    userId: string;
    balance: number;
    isBid: boolean;
    mark: UserMarkType;
    winMark: UserMarkType;
    playerStatus: PLayerStatus;
    gameState: Game2Status;
}
const GameContext = createContext<{
    myGameInfo: TournamentGameInfo;
    opGameInfo: TournamentGameInfo;
    list: BoardItem[];
    gameId: number;
    step: number;
    handleStepChange: (step?: number) => void;
    onList: (list: BoardItem[]) => void;
}>(null);
export const useGameContext = () => useContext(GameContext);

const TacToe = () => {
    const navigate = useNavigate();
    const toast = useSkyToast();
    const { address } = usePrivyAccounts();
    const [nextDrawWinner, setNextDrawWinner] = useState<string>("");
    const [init, setInit] = useState<boolean>(false);
    const [list, setList] = useState<BoardItem[]>(initBoard()); // init board
    const { search } = useLocation();
    const [step, setStep] = useState<number>(0);
    const params = qs.parse(search) as any;
    const [gameId] = useState<number>(params.gameId);
    const [showAnimateNumber, setShowAnimate] = useState<number>(-1);
    const [currentGrid, setCurrentGrid] = useState<number>(-1);
    const [gameInfo, setGameInfo] = useState<any>({
        player1: 0,
        player2: 0,
        balance1: 0,
        balance2: 0,
        gameStatus1: Game2Status.InProgress,
        gameStatus2: Game2Status.InProgress,
        boards: [],
        nickname1: "",
        nickname2: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [currentRound, setCurrentRound] = useState<number>(0);
    const [bidAmount, setBidAmount] = useState<number>(0);

    const [gameTimeout, setGameTimeout] = useState<number>(0);

    const [myGameInfo, setMyGameInfo] = useState<TournamentGameInfo>({
        address: "",
        userId: "",
        mark: UserMarkType.Empty,
        winMark: UserMarkType.Empty,
        balance: 0,
        isBid: false,
        playerStatus: null,
        gameState: Game2Status.InProgress,
    });
    const [opGameInfo, setOpGameInfo] = useState<TournamentGameInfo>({
        address: "",
        userId: "",
        mark: UserMarkType.Empty,
        winMark: UserMarkType.Empty,
        balance: 0,
        isBid: false,
        playerStatus: null,
        gameState: Game2Status.InProgress,
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
        const isPlayer1 =
            address.toLocaleLowerCase() == gameInfo.player1.toLocaleLowerCase();

        const player1GameInfo = {
            address: gameInfo.player1,
            userId: gameInfo.userId1,
            balance: gameInfo.balance1,
            isBid: boardGrids[resCurrentGrid].isBid1,
            mark: UserMarkType.Circle,
            winMark: UserMarkType.YellowCircle,
            playerStatus: PLayerStatus.Player1,
            gameState: gameInfo.gameStatus1,
        };

        const player2GameInfo = {
            address: gameInfo.player2,
            userId: gameInfo.userId2,
            balance: gameInfo.balance2,
            isBid: boardGrids[resCurrentGrid].isBid2,
            mark: UserMarkType.Cross,
            winMark: UserMarkType.YellowCross,
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

        console.log("---------", _list, "------------");
        if (Game2Status.InProgress === player1GameInfo.gameState) {
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
            myGameInfo.gameState !== Game2Status.InProgress ||
            !address
        )
            return;

        handleGetGameInfo();

        const timer = setInterval(() => {
            handleGetGameInfo();
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    }, [gameId, myGameInfo.gameState, address]);

    useEffect(() => {
        if (!gameInfo.player1 || !gameInfo.player2) {
            return;
        }
        handleGameInfo(gameInfo);
    }, [gameInfo]);

    useEffect(() => {
        console.log(gameInfo, "gameInfo");
        if (!gameInfo.player1 || !address) return;
        if (gameInfo.gameStatus1 === Game2Status.QuitByPlayer1) {
            navigate("/");
            return;
        }

        if (!gameInfo.player2) {
            if (
                gameInfo.player1.toLocaleLowerCase() ==
                address.toLocaleLowerCase()
            ) {
                setStep(0);
            }
            return;
        }

        if (gameInfo.gameStatus1 === Game2Status.InProgress) {
            setStep(1);
            return;
        }

        if (gameInfo.gameStatus1 > Game2Status.InProgress) {
            setStep(2);
            return;
        }
    }, [gameInfo.gameStatus1, gameInfo.player1, gameInfo.player2, address]);

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
                    <GameContext.Provider
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
                        <Box
                            sx={{
                                height: "100%",
                            }}
                        >
                            {step === 0 && <Match></Match>}
                            {step === 1 && (
                                <TacToePage
                                    showAnimateNumber={showAnimateNumber}
                                    bidAmount={bidAmount}
                                    onBidAmount={(value: number) => {
                                        handleBidAmount(value);
                                    }}
                                    currentRound={currentRound}
                                    gameTimeout={gameTimeout}
                                    loading={loading}
                                    onBid={handleBid}
                                    handleQuit={handleQuit}
                                ></TacToePage>
                            )}
                            {step === 2 && (
                                <GameOver
                                    gameState={myGameInfo.gameState}
                                ></GameOver>
                            )}
                            {step === 3 && (
                                <ResultPlayBack
                                    gameInfo={gameInfo}
                                ></ResultPlayBack>
                            )}
                            {/* {step === 3 && <SettlementPage></SettlementPage>} */}
                        </Box>
                    </GameContext.Provider>
                </Box>
            ) : (
                <LoadingPage></LoadingPage>
            )}

            <Nest />
        </Box>
    );
};

export default TacToe;
