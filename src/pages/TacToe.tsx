import { Box } from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useKnobVisibility } from "@/contexts/KnobVisibilityContext";
import "@reactour/popover/dist/index.css"; // arrow css
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";
import { useTacToeSigner } from "@/hooks/useSigner";
import {
    useMultiProvider,
    useMultiSkylabBidTacToeFactoryContract,
    useMultiMercuryBaseContract,
} from "@/hooks/useMultiContract";
import { useBlockNumber } from "@/contexts/BlockNumber";
import ResultPage from "@/components/TacToe/ResultPage";
import TacToePage, { GameState } from "@/components/TacToe";
import Match from "@/components/TacToe/Match";
import SettlementPage from "@/components/TacToe/SettlementPage";
import LevelInfo from "@/components/TacToe/LevelInfo";
import CircleIcon from "@/components/TacToe/assets/circle.svg";
import CrossIcon from "@/components/TacToe/assets/x.svg";
import YellowCircle from "@/components/TacToe/assets/yellow-circle.svg";
import YellowCross from "@/components/TacToe/assets/yellow-x.svg";
import BotX from "@/components/TacToe/assets/bot-x.svg";
import YellowBotX from "@/components/TacToe/assets/yellow-bot-x.svg";
import BttHelmet from "@/components/Helmet/BttHelmet";
import { PilotInfo, usePilotInfo } from "@/hooks/usePilotInfo";
import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import { useAccount, useChainId } from "wagmi";
import { getViemClients } from "@/utils/viem";
import {
    skylabTestFlightAddress,
    skylabTournamentAddress,
} from "@/hooks/useContract";

export enum UserMarkType {
    Empty = -1,
    Square = 0,
    Circle = 1,
    Cross = 2,
    YellowCircle = 3,
    YellowCross = 4,
    BotX = 5,
    YellowBotX = 6,
}

export const UserMarkIcon = {
    Circle: CircleIcon,
    Cross: CrossIcon,
    YellowCircle: YellowCircle,
    YellowCross: YellowCross,
    BotX: BotX,
    YellowBotX: YellowBotX,
};

export const initBoard = () => {
    return Array(9)
        .fill("")
        .map(() => ({
            mark: -1,
            myValue: 0,
            opValue: 0,
            myMark: UserMarkType.Empty,
            opMark: UserMarkType.Empty,
        }));
};

// plane related info
export interface Info {
    burner: string;
    address: string;
    level: number;
    point: number;
    img: string;
    mark: UserMarkType;
    isBot?: boolean;
}

export interface BoardItem {
    mark: UserMarkType;
    myValue: number;
    opValue: number;
    myMark: UserMarkType;
    opMark: UserMarkType;
    showAnimate?: boolean;
}

// user state in game
export interface GameInfo {
    balance: number;
    gameState: number;
    timeout: number;
    message: number;
    emote: number;
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
    onStep: (step: number) => void;
    onList: (list: BoardItem[]) => void;
    handleGetGas: () => void;
    setBidTacToeGameAddress: (address: string) => void;
}>(null);
export const useGameContext = () => useContext(GameContext);

const TacToe = () => {
    const chainId = useChainId();
    const { address: account } = useAccount();

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

    const navigate = useNavigate();
    const { search } = useLocation();
    const params = qs.parse(search) as any;
    const istest = params.testflight === "true";
    const { setIsKnobVisible } = useKnobVisibility();
    const [tokenId, setTokenId] = useState<number>(params.tokenId);
    const [myNewInfo, setMyNewInfo] = useState<MyNewInfo>(null); // if game over update my info
    const realChainId = istest ? TESTFLIGHT_CHAINID : chainId;
    const avaitionAddress = istest
        ? skylabTestFlightAddress[TESTFLIGHT_CHAINID]
        : skylabTournamentAddress[realChainId];
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

    const handleStep = (step: number) => {
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

    useEffect(() => {
        setIsKnobVisible(false);
        return () => setIsKnobVisible(true);
    }, []);

    console.log(opConfirmTimeout, "opConfirmTimeout");

    return (
        <>
            <BttHelmet></BttHelmet>
            <Box
                sx={{
                    background: "#303030",
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
                        onList: handleChangeList,
                        handleGetGas: handleGetGas,
                        setBidTacToeGameAddress,
                    }}
                >
                    <Box>
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
                        {step === 2 && (
                            <TacToePage
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
                                onChangeNewInfo={(info: MyNewInfo) => {
                                    setMyNewInfo(info);
                                }}
                            ></TacToePage>
                        )}
                        {step === 3 && <ResultPage></ResultPage>}
                        {step === 4 && <SettlementPage></SettlementPage>}
                    </Box>
                </GameContext.Provider>
            </Box>
        </>
    );
};

export default TacToe;
