import { Box } from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";
import BttHelmet from "@/components/Helmet/BttHelmet";
import Profile from "@/components/PrivateLobby/Profile";
import Preparation from "@/components/PrivateLobby/Preparation";
import {
    getMultiSkylabBidTacToeGameContract,
    useMultiMercuryBTTPrivateLobby,
    useMultiProvider,
    useMultiSkylabBidTacToeFactoryContract,
} from "@/hooks/useMultiContract";
import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import Loading from "@/components/Loading";
import { getPrivateLobbySigner } from "@/hooks/useSigner";
import { useSCWallet } from "@/hooks/useSCWallet";
import Back from "@/components/Back";
import { useBttPrivateLobbyContract } from "@/hooks/useRetryContract";
import { ZERO_DATA } from "@/skyConstants";

interface GameCount {
    allGameCount: number;
    inGameCount: number;
}

interface MyGameCount {
    winCount: number;
    loseCount: number;
}

const PrivateLobbyContext = createContext<{
    myGameCount: MyGameCount;
    lobbyName: string;
    lobbyAddress: string;
    nickname: string;
    avatarIndex: number;
    activeLobbyAddress: string;
    step: number;
    gameCount: GameCount;
    handleStepChange: (step: number) => void;
    setGameCount: (gameCount: GameCount) => void;
}>(null);

export const usePrivateLobbyContext = () => useContext(PrivateLobbyContext);

const PrivateLobby = () => {
    const [avatarIndex, setAvatarIndex] = useState<number>(
        Math.floor(Math.random() * 12),
    );
    const [nickname, setNickname] = useState<string>("");
    const localSinger = getPrivateLobbySigner();
    const { sCWAddress } = useSCWallet(localSinger.privateKey);
    const [init, setInit] = useState<boolean>(false);
    const [init2, setInit2] = useState<boolean>(false);

    const [gameCount, setGameCount] = useState({
        allGameCount: 0,
        inGameCount: 0,
    });

    const navigate = useNavigate();
    const { search } = useLocation();
    const [step, setStep] = useState<number>(0);
    const params = qs.parse(search) as any;
    const [lobbyName, setLobbyName] = useState<string>("");
    const [lobbyAddress] = useState<string>(params.lobbyAddress);
    const [activeLobbyAddress, setActiveLobbyAddress] = useState<string>("");
    const [myGameCount, setMyGameCount] = useState({
        winCount: 0,
        loseCount: 0,
    });

    const multiProvider = useMultiProvider(TESTFLIGHT_CHAINID);
    const multiSkylabBidTacToeFactoryContract =
        useMultiSkylabBidTacToeFactoryContract(TESTFLIGHT_CHAINID);

    const bttPrivateLobbyContract = useBttPrivateLobbyContract(lobbyAddress);
    const activeBttPrivateLobbyContract =
        useBttPrivateLobbyContract(activeLobbyAddress);

    const multiMercuryBTTPrivateLobby =
        useMultiMercuryBTTPrivateLobby(lobbyAddress);

    const handleStepChange = (step: number) => {
        setStep(step);
    };

    const handleNicknameChange = (e: any) => {
        setNickname(e);
    };

    const handleColorChange = (color: number) => {
        setAvatarIndex(color);
    };

    const handleInitLobby = async () => {
        const [
            userInfo,
            winCount,
            loseCount,
            queueList,
            onGameList,
            lobbyName,
            activeLobbyAddress,
            players,
        ] = await multiProvider.all([
            multiMercuryBTTPrivateLobby.userInfo(sCWAddress),
            multiMercuryBTTPrivateLobby.winCountPerPlayer(sCWAddress),
            multiMercuryBTTPrivateLobby.loseCountPerPlayer(sCWAddress),
            multiMercuryBTTPrivateLobby.getLobbyGameQueue(),
            multiMercuryBTTPrivateLobby.getLobbyOnGoingGames(),
            multiMercuryBTTPrivateLobby.lobbyName(),
            multiSkylabBidTacToeFactoryContract.activeLobbyPerPlayer(
                sCWAddress,
            ),
            multiMercuryBTTPrivateLobby.getPlayers(),
        ]);

        setMyGameCount({
            winCount: winCount.toNumber(),
            loseCount: loseCount.toNumber(),
        });
        setLobbyName(lobbyName);

        const p1 = [];

        for (let i = 0; i < queueList.length; i++) {
            const multiSkylabBidTacToeGameContract =
                getMultiSkylabBidTacToeGameContract(queueList[i]);
            p1.push(multiSkylabBidTacToeGameContract.player1());
        }

        for (let i = 0; i < onGameList.length; i++) {
            const multiSkylabBidTacToeGameContract =
                getMultiSkylabBidTacToeGameContract(onGameList[i]);
            p1.push(multiSkylabBidTacToeGameContract.player1());
            p1.push(multiSkylabBidTacToeGameContract.player2());
        }

        const p2: any = [];
        players.forEach((item: string) => {
            p2.push(multiMercuryBTTPrivateLobby.userInfo(item));
        });

        const playerInfos = await multiProvider.all(p2);

        const allValidPlayers = playerInfos.filter((item: any) => {
            return item.avatar.toNumber() >= 1;
        });

        setGameCount({
            allGameCount: allValidPlayers.length,
            inGameCount: queueList.length + onGameList.length * 2,
        });

        const playerAddresses = await multiProvider.all(p1);
        const isOnGameIndex = playerAddresses.findIndex((item: any) => {
            return item === sCWAddress;
        });

        if (isOnGameIndex !== -1) {
            let gameAddress = "";
            if (isOnGameIndex < queueList.length) {
                gameAddress = queueList[isOnGameIndex];
            } else {
                gameAddress = onGameList[isOnGameIndex - queueList.length];
            }

            navigate(
                `/btt/lobbyRoom?gameAddress=${gameAddress}&lobbyAddress=${lobbyAddress}`,
            );
            return;
        }
        if (userInfo.avatar.toNumber() - 1 >= 0) {
            setNickname(userInfo.name);
            setAvatarIndex(userInfo.avatar.toNumber() - 1);
        }

        setActiveLobbyAddress(activeLobbyAddress);
        setInit(true);
    };

    const handleBack = () => {
        navigate("/btt");
    };

    useEffect(() => {
        const handleJoin = async () => {
            const privateLobbySigner = getPrivateLobbySigner();
            if (
                activeLobbyAddress !== ZERO_DATA &&
                activeLobbyAddress.toLocaleLowerCase() !==
                    lobbyAddress.toLocaleLowerCase()
            ) {
                await activeBttPrivateLobbyContract("quitPrivateLobby", [], {
                    usePaymaster: true,
                    signer: privateLobbySigner,
                });
            }

            if (
                activeLobbyAddress.toLocaleLowerCase() !==
                lobbyAddress.toLocaleLowerCase()
            ) {
                await bttPrivateLobbyContract("joinPrivateLobby", [], {
                    usePaymaster: true,
                    signer: privateLobbySigner,
                });
            }

            if (nickname) {
                setStep(1);
            } else {
                setStep(0);
            }
            setInit2(true);
        };

        if (init && activeLobbyAddress && !init2) {
            handleJoin();
        }
    }, [init, activeLobbyAddress, init2]);

    useEffect(() => {
        if (!lobbyAddress) {
            navigate("/btt/joinlobby");
            return;
        }
    }, [lobbyAddress]);

    useEffect(() => {
        if (
            !lobbyAddress ||
            !multiMercuryBTTPrivateLobby ||
            !multiProvider ||
            !sCWAddress ||
            !multiSkylabBidTacToeFactoryContract
        ) {
            return;
        }
        handleInitLobby();
    }, [
        lobbyAddress,
        multiMercuryBTTPrivateLobby,
        multiProvider,
        sCWAddress,
        multiSkylabBidTacToeFactoryContract,
    ]);

    return (
        <>
            <BttHelmet></BttHelmet>
            <Box
                sx={{
                    background: "#303030",
                    padding: "32px 12px 0",
                    height: "100%",
                    overflow: "hidden",
                }}
            >
                {!init2 ? (
                    <Loading></Loading>
                ) : (
                    <PrivateLobbyContext.Provider
                        value={{
                            myGameCount,
                            lobbyName,
                            gameCount,
                            lobbyAddress,
                            activeLobbyAddress,
                            step,
                            nickname,
                            avatarIndex,
                            handleStepChange,
                            setGameCount,
                        }}
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                left: "1.0417vw",
                                top: "1.0417vw",
                            }}
                        >
                            <Back onClick={handleBack}></Back>
                        </Box>
                        {step === 0 && (
                            <Profile
                                onNicknameChange={handleNicknameChange}
                                onAvatarChange={handleColorChange}
                            ></Profile>
                        )}
                        {step === 1 && <Preparation></Preparation>}
                    </PrivateLobbyContext.Provider>
                )}
            </Box>
        </>
    );
};

export default PrivateLobby;
