import { Box } from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";
import BttHelmet from "@/components/Helmet/BttHelmet";
import {
    useMultiMercuryBTTPrivateLobby,
    useMultiProvider,
    useMultiSkylabBidTacToeGameContract,
} from "@/hooks/useMultiContract";
import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import { ZERO_DATA } from "@/skyConstants";
import Match from "@/components/PrivateRoom/Match";
import PlayGame from "@/components/PrivateRoom/PlayGame";
import { getPrivateLobbySigner } from "@/hooks/useSigner";
import { useSCWallet } from "@/hooks/useSCWallet";
import {
    BoardItem,
    GameInfo,
    GameState,
    UserMarkType,
    initBoard,
} from "@/skyConstants/bttGameTypes";
import GameOver from "@/components/PrivateRoom/GameOver";
import ResultPlayBack from "@/components/PrivateRoom/ResultPlayBack";
import ReactCanvasNest from "react-canvas-nest";

const PrivateGameContext = createContext<{
    lobbyName: string;
    myGameInfo: GameInfo;
    opGameInfo: GameInfo;
    list: BoardItem[];
    lobbyAddress: string;
    bidTacToeGameAddress: string;
    step: number;
    myInfo: any;
    opInfo: any;
    handleStepChange: (step?: number) => void;
    onList: (list: BoardItem[]) => void;
}>(null);
export const usePrivateGameContext = () => useContext(PrivateGameContext);

const PrivateRoom = () => {
    const navigate = useNavigate();
    const localSinger = getPrivateLobbySigner();
    const { sCWAddress } = useSCWallet(localSinger.privateKey);
    const [list, setList] = useState<BoardItem[]>(initBoard()); // init board
    const { search } = useLocation();
    const [step, setStep] = useState<number>(0);
    const params = qs.parse(search) as any;
    const [lobbyName, setLobbyName] = useState<string>("");
    const [lobbyAddress] = useState<string>(params.lobbyAddress);
    const [bidTacToeGameAddress] = useState<string>(params.gameAddress);
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
    const [myInfo, setMyInfo] = useState<any>({});
    const [opInfo, setOpInfo] = useState<any>({});

    const multiProvider = useMultiProvider(TESTFLIGHT_CHAINID);

    const multiMercuryBTTPrivateLobby =
        useMultiMercuryBTTPrivateLobby(lobbyAddress);

    const handleStep = (step?: number) => {
        if (step === undefined) {
            setStep((step) => step + 1);
            return;
        }
        setStep(step);
    };

    const multiSkylabBidTacToeGameContract =
        useMultiSkylabBidTacToeGameContract(bidTacToeGameAddress);

    const handleGetPlayer1Info = async () => {
        const [playerAddress1, playerAddress2] = await multiProvider.all([
            multiSkylabBidTacToeGameContract.player1(),
            multiSkylabBidTacToeGameContract.player2(),
        ]);

        if (playerAddress1 !== sCWAddress && playerAddress2 !== sCWAddress) {
            navigate(`/btt/lobby?lobbyAddress=${params.lobbyAddress}`);
            return;
        }

        if (playerAddress2 === ZERO_DATA) {
            const p = [
                multiMercuryBTTPrivateLobby.userInfo(playerAddress1),
                multiMercuryBTTPrivateLobby.winCountPerPlayer(playerAddress1),
                multiMercuryBTTPrivateLobby.loseCountPerPlayer(playerAddress1),
            ];
            const [user1, winCount1, loseCount1] = await multiProvider.all(p);
            if (sCWAddress === playerAddress1) {
                setMyInfo({
                    address: playerAddress1,
                    avatar: user1.avatar.toNumber() - 1,
                    name: user1.name,
                    mark: UserMarkType.Circle,
                    winCount: winCount1.toNumber(),
                    loseCount: loseCount1.toNumber(),
                });
            } else {
                setOpInfo({
                    address: playerAddress1,
                    avatar: user1.avatar.toNumber() - 1,
                    name: user1.name,
                    mark: UserMarkType.Circle,
                    winCount: winCount1.toNumber(),
                    loseCount: loseCount1.toNumber(),
                });
            }
        } else {
            const p = [
                multiMercuryBTTPrivateLobby.userInfo(playerAddress1),
                multiMercuryBTTPrivateLobby.winCountPerPlayer(playerAddress1),
                multiMercuryBTTPrivateLobby.loseCountPerPlayer(playerAddress1),
                multiMercuryBTTPrivateLobby.userInfo(playerAddress2),
                multiMercuryBTTPrivateLobby.winCountPerPlayer(playerAddress2),
                multiMercuryBTTPrivateLobby.loseCountPerPlayer(playerAddress2),
            ];

            const [user1, winCount1, loseCount1, user2, winCount2, loseCount2] =
                await multiProvider.all(p);
            if (sCWAddress === playerAddress1) {
                setMyInfo({
                    address: playerAddress1,
                    avatar: user1.avatar.toNumber() - 1,
                    name: user1.name,
                    mark: UserMarkType.Circle,
                    winCount: winCount1.toNumber(),
                    loseCount: loseCount1.toNumber(),
                });
                setOpInfo({
                    address: playerAddress2,
                    avatar: user2.avatar.toNumber() - 1,
                    name: user2.name,
                    mark: UserMarkType.Cross,
                    winCount: winCount2.toNumber(),
                    loseCount: loseCount2.toNumber(),
                });
            } else {
                setMyInfo({
                    address: playerAddress2,
                    avatar: user2.avatar.toNumber() - 1,
                    name: user2.name,
                    mark: UserMarkType.Cross,
                    winCount: winCount2.toNumber(),
                    loseCount: loseCount2.toNumber(),
                });
                setOpInfo({
                    address: playerAddress1,
                    avatar: user1.avatar.toNumber() - 1,
                    name: user1.name,
                    mark: UserMarkType.Circle,
                    winCount: winCount1.toNumber(),
                    loseCount: loseCount1.toNumber(),
                });
            }
        }
    };

    const handleGetPlayer2Info = async () => {
        const [playerAddress] = await multiProvider.all([
            multiSkylabBidTacToeGameContract.player2(),
        ]);
        if (playerAddress !== ZERO_DATA) {
            const { user, winCount, loseCount } = await handleGetUserInfo(
                playerAddress,
            );
            if (sCWAddress === playerAddress) {
                setMyInfo({
                    address: playerAddress,
                    avatar: user.avatar.toNumber() - 1,
                    name: user.name,
                    mark: UserMarkType.Cross,
                    winCount,
                    loseCount,
                });
            } else {
                setOpInfo({
                    address: playerAddress,
                    avatar: user.avatar.toNumber() - 1,
                    name: user.name,
                    mark: UserMarkType.Cross,
                    winCount,
                    loseCount,
                });
            }
        }
    };

    const handleGetLobbyName = async () => {
        const [lobbyName] = await multiProvider.all([
            multiMercuryBTTPrivateLobby.lobbyName(),
        ]);
        setLobbyName(lobbyName);
    };

    useEffect(() => {
        if (!multiMercuryBTTPrivateLobby || !multiProvider) {
            return;
        }
        handleGetLobbyName();
    }, [multiProvider, multiMercuryBTTPrivateLobby]);

    useEffect(() => {
        if (
            !multiSkylabBidTacToeGameContract ||
            !multiProvider ||
            !sCWAddress
        ) {
            return;
        }

        if (myInfo.address && opInfo.address) {
            return;
        }

        const timer = setInterval(() => {
            if (!myInfo.address) {
                handleGetPlayer1Info();
            }

            if (!opInfo.address) {
                handleGetPlayer2Info();
            }
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    }, [
        multiSkylabBidTacToeGameContract,
        multiProvider,
        sCWAddress,
        myInfo.address,
        opInfo.address,
    ]);

    const handleGetUserInfo = async (playerAddress: string) => {
        const [user, winCount, loseCount] = await multiProvider.all([
            multiMercuryBTTPrivateLobby.userInfo(playerAddress),
            multiMercuryBTTPrivateLobby.winCountPerPlayer(playerAddress),
            multiMercuryBTTPrivateLobby.loseCountPerPlayer(playerAddress),
        ]);

        return {
            user,
            winCount: winCount.toNumber(),
            loseCount: loseCount.toNumber(),
        };
    };

    const handleChangeList = (list: any) => {
        setList(list);
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
                    background: "#36363680",
                    height: "100%",
                    fontFamily: "Quantico",
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                }}
            >
                <PrivateGameContext.Provider
                    value={{
                        list,
                        lobbyName,
                        myGameInfo,
                        opGameInfo,
                        lobbyAddress,
                        bidTacToeGameAddress,
                        step,
                        myInfo,
                        opInfo,
                        handleStepChange: handleStep,
                        onList: handleChangeList,
                    }}
                >
                    {step === 0 && <Match></Match>}
                    {step === 1 && (
                        <PlayGame
                            onChangeGame={(position, info) => {
                                if (position === "my") {
                                    setMyGameInfo(info);
                                    return;
                                }
                                if (position === "op") {
                                    setOpGameInfo(info);
                                    return;
                                }
                            }}
                        ></PlayGame>
                    )}
                    {step === 2 && <GameOver></GameOver>}
                    {step === 3 && <ResultPlayBack></ResultPlayBack>}
                </PrivateGameContext.Provider>
            </Box>
            <ReactCanvasNest
                className="canvasNest"
                config={{
                    count: 66,
                    pointColor: " 255, 255, 255 ",
                    lineColor: "255,255,255",
                    dist: 1500,
                }}
            />
        </Box>
    );
};

export default PrivateRoom;
