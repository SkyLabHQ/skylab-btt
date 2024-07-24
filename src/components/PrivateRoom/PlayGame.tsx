import { Box, Flex, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import Board from "@/components/BttComponents/Board";
import useSkyToast from "@/hooks/useSkyToast";
import { handleError } from "@/utils/error";
import { PvpGameInfo, usePvpGameContext } from "@/pages/PvpRoom";
import { CHAIN_NAMES, TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import UserProfile from "./UserProfile";
import {
    GameState,
    getWinState,
    UserMarkType,
    winPatterns,
} from "@/skyConstants/bttGameTypes";
import MLayout from "./MLayout";
import QuitModal from "../BttComponents/QuitModal";
import Timer from "../BttComponents/Timer";
import ToolBar from "../BttComponents/Toolbar";
import StatusProgress from "../BttComponents/StatusProgress";
import { shortenAddressWithout0x } from "@/utils";
import { MINI_APP_URL } from "@/skyConstants/tgConfig";
import { getGameInfo } from "@/api/pvpGame";
import { useInitData } from "@tma.js/sdk-react";
import { PvpMyUserCard, PvpOpInputBid } from "../BttComponents/PvpUserCard";

const PlayGame = ({
    onChangeGame,
}: {
    onChangeGame: (position: "my" | "op", info: PvpGameInfo) => void;
}) => {
    const initData = useInitData();
    const [showAnimateConfirm, setShowAnimateConfirm] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isPc] = useMediaQuery("(min-width: 800px)");
    const [loading, setLoading] = useState<boolean>(false);
    const [surrenderLoading, setSurrenderLoading] = useState<boolean>(false);
    const toast = useSkyToast();
    const [currentGrid, setCurrentGrid] = useState<number>(-1);
    const [autoCommitTimeoutTime, setAutoCommitTimeoutTime] = useState(0);
    const { myGameInfo, opGameInfo, gameId, myInfo, opInfo, list } =
        usePvpGameContext();

    const [showAnimateNumber, setShowAnimate] = useState<number>(-1);
    const [bidAmount, setBidAmount] = useState<number>(0);
    const [nextDrawWinner, setNextDrawWinner] = useState<string>("");
    const [gameInfo, setGameInfo] = useState<any>(null);

    const inviteLink = useMemo(() => {
        return "";
    }, []);

    const handleGetGameInfo = async () => {
        if (!gameId) return;

        const res = await getGameInfo(Number(gameId));

        if (res.code != 200) {
            return;
        }

        const gameInfo = res.data.game;

        const gridIndex = gameInfo.gridIndex;
        if (showAnimateNumber === -1) {
            setShowAnimate(gridIndex);
        } else if (gridIndex !== currentGrid) {
            setShowAnimate(currentGrid);
        }

        const _list = JSON.parse(JSON.stringify(list));
        const gameState = gameInfo.gameStatus;
        const boardGrids = gameInfo.boards;
        const isPlayer1 = initData.user.id == gameInfo.player1;

        for (let i = 0; i < boardGrids.length; i++) {
            const winAddress = boardGrids[i].win;
            if (winAddress === 0) {
                _list[i].mark = UserMarkType.Empty;
            } else if (winAddress === myInfo.address) {
                _list[i].mark = myInfo.mark;
            } else if (winAddress === opInfo.address) {
                _list[i].mark = opInfo.mark;
            }
            _list[i].myValue = boardGrids[i];
            _list[i].opValue = boardGrids[i];
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
            _list[gridIndex].mark = UserMarkType.Square;
        }

        // game over result
        if (gameState > GameState.Revealed) {
            const myIsWin = getWinState(gameState);
            const address = myIsWin ? myInfo.address : opInfo.address;
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
                        boardGrids[index0] === address &&
                        boardGrids[index1] === address &&
                        boardGrids[index2] === address
                    ) {
                        _list[index0].mark = mark;
                        _list[index1].mark = mark;
                        _list[index2].mark = mark;
                        break;
                    }
                }
            } else {
                for (let i = 0; i < boardGrids.length; i++) {
                    if (boardGrids[i] === address) {
                        _list[i].mark = mark;
                    }
                }
            }
        }
        setCurrentGrid(gridIndex);
        const currentBoard = boardGrids[gridIndex];

        onChangeGame("my", {
            balance: isPlayer1 ? gameInfo.balance1 : gameInfo.balance2,
            isBid: isPlayer1 ? currentBoard.isBid1 : currentBoard.isBid2,
            timeout: currentBoard.timeout,
        });

        onChangeGame("op", {
            balance: isPlayer1 ? gameInfo.balance2 : gameInfo.balance1,
            isBid: isPlayer1 ? currentBoard.isBid2 : currentBoard.isBid1,
            timeout: currentBoard.timeout,
        });
        setNextDrawWinner(nextDrawWinner);
    };

    const handleBid = async () => {
        try {
            if (currentGrid < 0) return;
            if (loading) return;
            if (myGameInfo.isBid) return;

            setLoading(true);

            console.log(`currentGrid: ${currentGrid} bidAmount: ${bidAmount} `);

            // await bid({
            //     bidAmount
            // })
            onChangeGame("my", {
                ...myGameInfo,
                isBid: true,
            });
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
            toast(handleError(e, true));
        }
    };

    const handleBoardClick = () => {
        setShowAnimateConfirm((number) => {
            return number + 1;
        });
    };

    const handleBidAmount = (value: number) => {
        if (loading) return;
        if (myGameInfo.isBid) return;

        if (value < 0) return;
        if (value > myGameInfo.balance) return;
        setBidAmount(value);
    };

    const handleQuit = async () => {
        if (surrenderLoading) {
            return;
        }
        try {
            setSurrenderLoading(true);
            // await  surrender()
            setSurrenderLoading(false);
        } catch (e) {
            setSurrenderLoading(false);
            console.log(e);
            toast(handleError(e, true));
        }
    };

    const handleShareTw = () => {
        const text = `${MINI_APP_URL}?startapp=live-${gameId}-${shortenAddressWithout0x(
            myInfo.burner,
        )}
⭕️❌⭕️❌Watch me play Bid tac toe and crush the opponent！⭕️❌⭕️❌
Bid tac toe, a fully on-chain PvP game of psychology and strategy, on ${
            CHAIN_NAMES[TESTFLIGHT_CHAINID]
        }
(Twitter)@skylabHQ`;

        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
        );
    };

    useEffect(() => {
        const timer = setInterval(() => {
            handleGetGameInfo();
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    }, [gameId]);

    return (
        <Box
            style={{
                height: "100%",
            }}
        >
            <MLayout
                inviteLink={inviteLink}
                handleShareTw={handleShareTw}
                nextDrawWinner={nextDrawWinner}
                autoCommitTimeoutTime={autoCommitTimeoutTime}
                showAnimateNumber={showAnimateNumber}
                bidAmount={bidAmount}
                onInputChange={handleBidAmount}
                onConfirm={handleBid}
                handleQuitClick={() => {
                    onOpen();
                }}
                loading={loading}
                handleBoardClick={handleBoardClick}
                showAnimateConfirm={showAnimateConfirm}
            ></MLayout>
            <QuitModal
                onConfirm={handleQuit}
                isOpen={isOpen}
                onClose={onClose}
                quitType={"wait"}
            ></QuitModal>
        </Box>
    );
};

export default PlayGame;
