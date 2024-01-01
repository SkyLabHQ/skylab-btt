import { Box } from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useKnobVisibility } from "@/contexts/KnobVisibilityContext";
import "@reactour/popover/dist/index.css"; // arrow css
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";
import { getTestflightSigner, useTacToeSigner } from "@/hooks/useSigner";
import {
    useMultiProvider,
    useMultiSkylabBidTacToeFactoryContract,
    useMultiMercuryBaseContract,
} from "@/hooks/useMultiContract";
import { getMetadataImg } from "@/utils/ipfsImg";
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
import {
    skylabTestFlightAddress,
    skylabTournamentAddress,
} from "@/hooks/useContract";
import BttHelmet from "@/components/Helmet/BttHelmet";
import { ZERO_DATA } from "@/skyConstants";
import { PilotInfo, usePilotInfo } from "@/hooks/usePilotInfo";
import { getSCWallet } from "@/hooks/useSCWallet";
import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import { useAccount, useChainId } from "wagmi";
import { getViemClients } from "@/utils/viem";

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
    const [tokenId, setTokenId] = useState<number>(0);
    const [myNewInfo, setMyNewInfo] = useState<MyNewInfo>(null); // if game over update my info
    const realChainId = istest ? TESTFLIGHT_CHAINID : chainId;
    const multiProvider = useMultiProvider(realChainId);
    const [myInfo, setMyInfo] = useState<Info>({
        burner: "",
        address: "",
        level: 0,
        point: 0,
        img: "",
        mark: UserMarkType.Empty,
    });
    const [opInfo, seOpInfo] = useState<Info>({
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
    const { blockNumber } = useBlockNumber();
    const multiMercuryBaseContract = useMultiMercuryBaseContract(realChainId);
    const [bidTacToeGameAddress, setBidTacToeGameAddress] =
        useState<string>(null);
    const [step, setStep] = useState(0);
    const [tacToeBurner] = useTacToeSigner(tokenId);

    const [list, setList] = useState<BoardItem[]>(initBoard()); // init board
    const multiSkylabBidTacToeFactoryContract =
        useMultiSkylabBidTacToeFactoryContract(realChainId);

    const handleStep = (step: number) => {
        setStep(step);
    };

    // get my and op info
    const handleGetGameInfo = async () => {
        try {
            let operateAddress = "";
            if (istest) {
                const testflightSinger = getTestflightSigner(realChainId);
                const { sCWAddress } = await getSCWallet(
                    testflightSinger.privateKey,
                );
                operateAddress = sCWAddress;
                console.log("sCWAddress", sCWAddress);
            } else {
                operateAddress = tacToeBurner.account.address;
            }
            console.log(operateAddress, "operateAddress");
            const [bidTacToeGameAddress, defaultGameQueue] =
                await multiProvider.all([
                    multiSkylabBidTacToeFactoryContract.gamePerPlayer(
                        operateAddress,
                    ),
                    multiSkylabBidTacToeFactoryContract.defaultGameQueue(
                        istest
                            ? skylabTestFlightAddress[TESTFLIGHT_CHAINID]
                            : skylabTournamentAddress[realChainId],
                    ),
                ]);

            console.log("Game Address", bidTacToeGameAddress);
            console.log("DefaultGameQueue", defaultGameQueue);

            if (bidTacToeGameAddress === ZERO_DATA) {
                if (operateAddress !== defaultGameQueue) {
                    navigate("/btt");
                    return;
                }

                const [account, level, mtadata, point] =
                    await multiProvider.all([
                        multiMercuryBaseContract.ownerOf(tokenId),
                        multiMercuryBaseContract.aviationLevels(tokenId),
                        multiMercuryBaseContract.tokenURI(tokenId),
                        multiMercuryBaseContract.aviationPoints(tokenId),
                    ]);

                setMyInfo({
                    burner: operateAddress,
                    address: account,
                    level: level.toNumber(),
                    point: point.toNumber(),
                    img: getMetadataImg(mtadata),
                    mark: null,
                });
            } else {
                setBidTacToeGameAddress(bidTacToeGameAddress);
            }
        } catch (e: any) {
            console.log(e);
            if (e.code === "CALL_EXCEPTION") {
                navigate("/", { replace: true });
            }
        }
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

    useEffect(() => {
        if (
            !blockNumber ||
            !tokenId ||
            !tacToeBurner ||
            bidTacToeGameAddress ||
            !multiSkylabBidTacToeFactoryContract ||
            !multiProvider
        ) {
            return;
        }
        handleGetGameInfo();
    }, [
        multiProvider,
        blockNumber,
        tokenId,
        tacToeBurner,
        multiMercuryBaseContract,
    ]);

    useEffect(() => {
        const params = qs.parse(search) as any;
        if (tokenId === 0) {
            setTokenId(params.tokenId);
        } else if (!params.tokenId) {
            navigate(`/`);
        } else if (tokenId != params.tokenId) {
            navigate(`/`);
        }
    }, [search, tokenId]);

    useEffect(() => {
        if (!myInfo.address || !opInfo.address) {
            return;
        }
        setTimeout(() => {
            handleStep(1);
        }, 1000);
    }, [myInfo, opInfo]);

    useEffect(() => {
        if (istest) {
            return;
        }

        if (myInfo.address) {
            if (myInfo.address !== account) {
                navigate("/");
                return;
            }
        }
    }, [myInfo, account]);

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
                        onStep: handleStep,
                        onList: handleChangeList,
                        handleGetGas: handleGetGas,
                    }}
                >
                    <Box>
                        {step === 0 && (
                            <Match
                                onGameType={(type: GameType) => {
                                    setGameType(type);
                                }}
                                onChangeInfo={(position, info) => {
                                    if (position === "my") {
                                        setMyInfo(info);
                                        return;
                                    }
                                    if (position === "op") {
                                        seOpInfo(info);
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
                        {step === 1 && <LevelInfo></LevelInfo>}
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
