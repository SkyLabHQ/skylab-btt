import { Box } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
import { bid, getGameInfo } from "@/api/pvpGame";
import { useInitData } from "@tma.js/sdk-react";
import useSkyToast from "@/hooks/useSkyToast";

export enum PLayerStatus {
    Player1,
    Player2,
}

export interface PvpGameInfo {
    tgId: number;
    username: string;
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
    const [nextDrawWinner, setNextDrawWinner] = useState<string>("");
    const toast = useSkyToast();
    const initData = useInitData();
    const [list, setList] = useState<BoardItem[]>(initBoard()); // init board
    const { search } = useLocation();
    const [step, setStep] = useState<number>(0);
    const params = qs.parse(search) as any;
    const [gameId] = useState<number>(params.gameId);
    const [showAnimateNumber, setShowAnimate] = useState<number>(-1);
    const [currentGrid, setCurrentGrid] = useState<number>(-1);
    const [gameInfo, setGameInfo] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentRound, setCurrentRound] = useState<number>(0);

    const [gameTimeout, setGameTimeout] = useState<number>(0);

    const [myGameInfo, setMyGameInfo] = useState<PvpGameInfo>({
        tgId: 0,
        username: "",
        mark: UserMarkType.Empty,
        winMark: UserMarkType.Empty,
        balance: 0,
        isBid: false,
        playerStatus: null,
        gameState: PvpGameStatus.InProgress,
    });
    const [opGameInfo, setOpGameInfo] = useState<PvpGameInfo>({
        tgId: 0,
        username: "",
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
            username: gameInfo.username1,
            playerStatus: PLayerStatus.Player1,
            gameState: gameInfo.gameStatus1,
        };

        const player2GameInfo = {
            balance: gameInfo.balance2,
            isBid: boardGrids[resCurrentGrid].isBid2,
            mark: UserMarkType.Cross,
            winMark: UserMarkType.YellowCross,
            tgId: gameInfo.player2,
            username: gameInfo.username2,
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

        console.log(player1GameInfo, "player1GameInfo");

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
    };

    const handleBid = async (amount: number) => {
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

            console.log(`currentGrid: ${currentGrid} bidAmount: ${amount} `);
            const res = await bid({
                gameId,
                amount,
            });
            if (res.code == 200) {
                const game = res.data.game;
                setGameInfo(game);
            }

            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
            toast(e + "");
        }
    };

    useEffect(() => {
        if (!gameId || myGameInfo.gameState !== PvpGameStatus.InProgress)
            return;

        const timer = setInterval(() => {
            handleGetGameInfo();
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    }, [gameId, myGameInfo.gameState]);

    useEffect(() => {
        if (!gameInfo) {
            return;
        }
        handleGameInfo(gameInfo);
    }, [gameInfo]);

    useEffect(() => {
        if (myGameInfo.gameState > PvpGameStatus.InProgress) {
            setStep(1);
        }
    }, [myGameInfo.gameState]);

    return (
        <Box
            sx={{
                height: "100%",
            }}
        >
            <BttHelmet></BttHelmet>
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
                    {step === 0 && (
                        <PlayGame
                            currentRound={currentRound}
                            gameTimeout={gameTimeout}
                            loading={loading}
                            onBid={(amount: number) => {
                                handleBid(amount);
                            }}
                            showAnimateNumber={showAnimateNumber}
                        ></PlayGame>
                    )}
                    {step === 1 && (
                        <GameOver gameState={myGameInfo.gameState}></GameOver>
                    )}
                    {step === 2 && (
                        <ResultPlayBack gameInfo={gameInfo}></ResultPlayBack>
                    )}
                </PvpGameContext.Provider>
            </Box>
            <Nest />
        </Box>
    );
};

export default PvpRoom;
