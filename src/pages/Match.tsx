import { Box } from "@chakra-ui/react";
import React, { createContext, useContext, useState } from "react";
import "@reactour/popover/dist/index.css"; // arrow css
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { useTacToeSigner } from "@/hooks/useSigner";
import Match from "@/components/TacToe/Match";
import LevelInfo from "@/components/TacToe/LevelInfo";
import BttHelmet from "@/components/Helmet/BttHelmet";
import { PilotInfo, usePilotInfo } from "@/hooks/usePilotInfo";
import { useChainId } from "wagmi";
import { getViemClients } from "@/utils/viem";
import { mercuryJarTournamentAddress } from "@/hooks/useContract";
import {
    BoardItem,
    GameInfo,
    GameState,
    UserMarkType,
    initBoard,
} from "@/skyConstants/bttGameTypes";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
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
    gameType: GameType;
    list: BoardItem[];
    tokenId: number;
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
    onList: (list: BoardItem[]) => void;
    handleGetGas: () => void;
    setBidTacToeGameAddress: (address: string) => void;
}>(null);
export const useGameContext = () => useContext(GameContext);

const MatchPage = () => {
    const chainId = useChainId();
    const { address: account } = usePrivyAccounts();

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
    const [tokenId] = useState<number>(params.tokenId);
    const realChainId = chainId;
    const avaitionAddress = mercuryJarTournamentAddress[realChainId];
    const [myConfirmTimeout, setMyConfirmTimeout] = useState(-1);
    const [opConfirmTimeout, setOpConfirmTimeout] = useState(-1);
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
    const [burnerWallet] = useTacToeSigner(tokenId);

    const { activePilot: myActivePilot } = usePilotInfo(account);

    const { activePilot: opActivePilot } = usePilotInfo(opInfo.address);

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

    const [bidTacToeGameAddress, setBidTacToeGameAddress] =
        useState<string>(null);
    const [step, setStep] = useState(0);

    const [list, setList] = useState<BoardItem[]>(initBoard()); // init board

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
            to: account,
            value: value,
            gasLimit: 21000,
            gasPrice: fasterGasPrice,
        });

        console.log("transfer remain balance", transferResult);
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
                <GameContext.Provider
                    value={{
                        realChainId,
                        gameType,
                        myActivePilot,
                        opActivePilot,
                        myInfo,
                        opInfo,
                        tokenId,
                        myGameInfo,
                        opGameInfo,
                        list,
                        bidTacToeGameAddress,
                        mileages,
                        points,
                        avaitionAddress,
                        onStep: handleStep,
                        onList: handleChangeList,
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
                            <Match
                                onSetConfirmTimeout={(
                                    myConfirmTimeout: number,
                                    opConfirmTimeout: number,
                                ) => {
                                    setMyConfirmTimeout(myConfirmTimeout);
                                    setOpConfirmTimeout(opConfirmTimeout);
                                }}
                                onGameType={(type: GameType) => {
                                    setGameType(type);
                                }}
                                onChangeInfo={(position, info) => {
                                    if (position === "my") {
                                        setMyInfo(info);
                                        return;
                                    }
                                    if (position === "op") {
                                        setOpInfo(info);
                                        return;
                                    }
                                }}
                                onChangeMileage={(winMileage, loseMileage) => {
                                    setMileages({
                                        winMileage,
                                        loseMileage,
                                    });
                                }}
                                onChangePoint={(winPoint, losePoint) => {
                                    setPoints({
                                        winPoint,
                                        losePoint,
                                    });
                                }}
                            ></Match>
                        )}
                        {step === 1 && (
                            <LevelInfo
                                myConfirmTimeout={myConfirmTimeout}
                                opConfirmTimeout={opConfirmTimeout}
                                onSetConfirmTimeout={(
                                    myConfirmTimeout: number,
                                    opConfirmTimeout: number,
                                ) => {
                                    setMyConfirmTimeout(myConfirmTimeout);
                                    setOpConfirmTimeout(opConfirmTimeout);
                                }}
                                onGameType={(type: GameType) => {
                                    setGameType(type);
                                }}
                                onChangeInfo={(position, info) => {
                                    if (position === "my") {
                                        setMyInfo(info);
                                        return;
                                    }
                                    if (position === "op") {
                                        setOpInfo(info);
                                        return;
                                    }
                                }}
                            ></LevelInfo>
                        )}
                    </Box>
                </GameContext.Provider>
            </Box>
            <Nest />
        </Box>
    );
};

export default MatchPage;
