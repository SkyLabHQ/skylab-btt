import { Box } from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";
import BttHelmet from "@/components/Helmet/BttHelmet";
import {
    useMultiProvider,
    useMultiSkylabBidTacToeGameContract,
} from "@/hooks/useMultiContract";
import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import { ZERO_DATA } from "@/skyConstants";
import Match from "@/components/PrivateRoom/Match";
import PlayGame from "@/components/PrivateRoom/PlayGame";
import {
    BoardItem,
    GameInfo,
    GameState,
    UserMarkType,
    initBoard,
} from "@/skyConstants/bttGameTypes";
import GameOver from "@/components/PrivateRoom/GameOver";
import ResultPlayBack from "@/components/PrivateRoom/ResultPlayBack";
import Nest from "@/components/Nest";
import { usePvpInfo } from "@/contexts/PvpContext";

const PvpGameContext = createContext<{
    myGameInfo: GameInfo;
    opGameInfo: GameInfo;
    list: BoardItem[];
    bidTacToeGameAddress: string;
    step: number;
    myInfo: any;
    opInfo: any;
    handleStepChange: (step?: number) => void;
    onList: (list: BoardItem[]) => void;
}>(null);
export const usePvpGameContext = () => useContext(PvpGameContext);

const PvpRoom = () => {
    const [list, setList] = useState<BoardItem[]>(initBoard()); // init board
    const { search } = useLocation();
    const [step, setStep] = useState<number>(0);
    const params = qs.parse(search) as any;
    const [bidTacToeGameAddress] = useState<string>(params.gameAddress);
    const multiSkylabBidTacToeGameContract =
        useMultiSkylabBidTacToeGameContract(bidTacToeGameAddress);

    const navigate = useNavigate();

    const { pvpAddress } = usePvpInfo();
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

    const handleGetAllPlayerInfo = async () => {
        const [playerAddress1, playerAddress2] = await multiProvider.all([
            multiSkylabBidTacToeGameContract.player1(),
            multiSkylabBidTacToeGameContract.player2(),
        ]);

        console.log("playerAddress1", playerAddress1);
        console.log("playerAddress2", playerAddress2);
        console.log("pvpAddress", pvpAddress);
        if (playerAddress1 !== ZERO_DATA && playerAddress2 !== ZERO_DATA) {
            if (playerAddress1.toLowerCase() === pvpAddress) {
                setMyInfo({
                    address: playerAddress1,
                    mark: UserMarkType.Circle,
                });
                setOpInfo({
                    address: playerAddress2,
                    mark: UserMarkType.Cross,
                });
            } else {
                setMyInfo({
                    address: playerAddress2,
                    mark: UserMarkType.Circle,
                });
                setOpInfo({
                    address: playerAddress1,
                    mark: UserMarkType.Cross,
                });
            }
        } else if (playerAddress1.toLowerCase() !== pvpAddress) {
            navigate("/pvp");
        }
    };

    console.log(myGameInfo, pvpAddress, "setMyInfo");

    useEffect(() => {
        if (
            !multiSkylabBidTacToeGameContract ||
            !multiProvider ||
            (myInfo.address && opInfo.address)
        )
            return;

        const timer = setInterval(() => {
            handleGetAllPlayerInfo();
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    }, [
        multiSkylabBidTacToeGameContract,
        multiProvider,
        myInfo.address,
        opInfo.address,
    ]);

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
                </PvpGameContext.Provider>
            </Box>
            <Nest />
        </Box>
    );
};

export default PvpRoom;
