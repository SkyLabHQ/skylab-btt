import { Box } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";
import BttHelmet from "@/components/Helmet/BttHelmet";

import PlayGame from "@/components/PrivateRoom/PlayGame";
import {
    BoardItem,
    GameInfo,
    GameState,
    initBoard,
} from "@/skyConstants/bttGameTypes";
import GameOver from "@/components/PrivateRoom/GameOver";
import ResultPlayBack from "@/components/PrivateRoom/ResultPlayBack";
import Nest from "@/components/Nest";

export interface PvpGameInfo {
    balance: number;
    isBid: boolean;
    timeout: number;
}
const PvpGameContext = createContext<{
    myGameInfo: PvpGameInfo;
    opGameInfo: PvpGameInfo;
    list: BoardItem[];
    gameId: string;
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
    const [gameId] = useState<string>(params.gameId);

    const [myGameInfo, setMyGameInfo] = useState<PvpGameInfo>({
        balance: 0,
        isBid: false,
        timeout: 0,
    });
    const [opGameInfo, setOpGameInfo] = useState<PvpGameInfo>({
        balance: 0,
        isBid: false,
        timeout: 0,
    });
    const [myInfo, setMyInfo] = useState<any>({});
    const [opInfo, setOpInfo] = useState<any>({});

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
                        myInfo,
                        opInfo,
                        handleStepChange: handleStep,
                        onList: handleChangeList,
                    }}
                >
                    {step === 0 && (
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
                    {/* {step === 1 && <GameOver></GameOver>} */}
                    {/* {step === 2 && <ResultPlayBack></ResultPlayBack>} */}
                </PvpGameContext.Provider>
            </Box>
            <Nest />
        </Box>
    );
};

export default PvpRoom;
