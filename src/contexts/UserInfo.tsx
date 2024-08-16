import { Box, useDisclosure } from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import UserInfoDrawer from "@/components/UserInfoDrawer";
import usePrivyAccounts from "@/hooks/usePrivyAccount";
import axios from "axios";
import { useMercuryJarTournamentContract } from "@/hooks/useContract";
import { useChainId, usePublicClient } from "wagmi";
import {
    useMultiMercuryJarTournamentContract,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { levelRanges } from "@/utils/level";
import { aviationImg } from "@/utils/aviationImg";
import { handleError } from "@/utils/error";
import useSkyToast from "@/hooks/useSkyToast";
import { useLocation } from "react-router-dom";
import Click1Wav from "@/assets/click1.wav";
import { usePrivy } from "@privy-io/react-auth";
import { getTokensGame } from "@/api/tournament";

const audio = new Audio(Click1Wav);

const UserInfoContext = createContext<{
    loading: boolean;
    isUserInfoOpen: boolean;
    onUserInfoOpen: () => void;
    onUserInfoClose: () => void;
    blockOpen: boolean;
    isBlock: boolean;
    userName: string;
    planeList: any[];
    planeInit: boolean;
    userNameInit: boolean;
    handleBlock: (block: boolean) => void;
    handleGetUserPaper: () => void;
    handleLogin: () => void;
    handleGetUserPlane: () => void;
}>(null);

const whiteList = ["/", "/plane/my"];

export const UserInfoProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { ready, user, login, linkWallet, getAccessToken } = usePrivy();
    const { pathname } = useLocation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const mercuryJarTournamentContract = useMercuryJarTournamentContract();
    const publicClient = usePublicClient();
    const chainId = useChainId();
    const multiProvider = useMultiProvider(chainId);
    const multiMercuryJarTournamentContract =
        useMultiMercuryJarTournamentContract();
    const { address } = usePrivyAccounts();
    const [isBlock, setIsBlock] = useState(false);
    const [blockOpen, setIsBlockOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const [userNameInit, setUserNameInit] = useState(false);
    const [planeList, setPlaneList] = useState([] as any[]);
    const [planeInit, setPlaneInit] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useSkyToast();

    const handleLogin = async () => {
        audio.play();
        if (!ready) {
            toast("Please wait for the wallet to be ready");
            return;
        }
        console.log(user, "user");

        if (user && user.wallet.walletClientType !== "privy") {
            linkWallet();
            return;
        }

        login();
    };

    const handleBlock = (block: boolean) => {
        setIsBlockOpen(block);
    };

    const handleGetUserPaper = async () => {
        if (!multiMercuryJarTournamentContract || !multiProvider || !address) {
            setPlaneList([]);
            return;
        }
        if (loading) {
            return;
        }

        try {
            setLoading(true);
            const [planeBalance, userName] = await multiProvider.all([
                multiMercuryJarTournamentContract.balanceOf(address),
                multiMercuryJarTournamentContract.userName(address),
            ]);
            setUserName(userName);
            setUserNameInit(true);
            const p = [];
            for (let i = 0; i < Number(planeBalance.toString()); i++) {
                p.push(
                    multiMercuryJarTournamentContract.tokenOfOwnerByIndex(
                        address,
                        i,
                    ),
                );
            }

            const tokenIds = await multiProvider.all(p);
            const res = await getTokensGame({
                tokens: tokenIds.map((item) => {
                    return item.toString();
                }),
            });

            const tokensGame = res.data.tokensGame;

            const p2: any = [];
            tokenIds.forEach((item) => {
                p2.push(multiMercuryJarTournamentContract.aviationPoints(item));
                p2.push(
                    multiMercuryJarTournamentContract.isAviationLocked(item),
                );
            });

            const levels = await multiProvider.all(p2);

            const planeList = tokenIds.map((item, index) => {
                const points = Number(levels[index * 2].toString());
                const levelItem = levelRanges.find((item) => {
                    return points < item.maxPoints && points >= item.minPoints;
                });
                const state = levels[index * 2 + 1];
                const level = levelItem.level;
                const nextPoints = levelItem.maxPoints;
                const prePoints = levelItem.minPoints;
                const inGame = tokensGame.find((item1: any) => {
                    return (
                        item1.tokenId1 === Number(item.toString()) ||
                        item1.tokenId2 === Number(item.toString())
                    );
                });
                return {
                    tokenId: item.toString(),
                    points,
                    level: level,
                    img: aviationImg(level),
                    nextPoints,
                    prePoints,
                    state,
                    gameId: inGame ? inGame.id : 0,
                };
            });

            setPlaneInit(true);
            setPlaneList(planeList);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            setPlaneInit(true);
        }
    };

    const handleSetUserName = async (name: string) => {
        try {
            const hash =
                await mercuryJarTournamentContract.write.registerUserName([
                    name,
                ]);

            // @ts-ignore
            await publicClient.waitForTransactionReceipt({ hash });
            setUserName(name);
        } catch (e) {
            toast(handleError(e));
        }
    };

    const handleGetUserPlane = async () => {
        const [planeBalance] = await multiProvider.all([
            multiMercuryJarTournamentContract.balanceOf(address),
        ]);
        const p = [];
        for (let i = 0; i < Number(planeBalance.toString()); i++) {
            p.push(
                multiMercuryJarTournamentContract.tokenOfOwnerByIndex(
                    address,
                    i,
                ),
            );
        }

        const tokenIds = await multiProvider.all(p);

        const p2: any = [];
        tokenIds.forEach((item) => {
            p2.push(multiMercuryJarTournamentContract.aviationPoints(item));
            p2.push(multiMercuryJarTournamentContract.isAviationLocked(item));
        });

        const levels = await multiProvider.all(p2);

        const planeList = tokenIds.map((item, index) => {
            const points = Number(levels[index * 2].toString());
            const levelItem = levelRanges.find((item) => {
                return points < item.maxPoints && points >= item.minPoints;
            });
            const state = levels[index * 2 + 1];
            const level = levelItem.level;
            const nextPoints = levelItem.maxPoints;
            const prePoints = levelItem.minPoints;
            return {
                tokenId: item.toString(),
                points,
                level: level,
                img: aviationImg(level),
                nextPoints,
                prePoints,
                state,
            };
        });
        setPlaneList(planeList);
    };

    useEffect(() => {
        axios.get("https://ipapi.co/json/").then(async (res: any) => {
            if (res.data.country_code === "US") {
                setIsBlock(true);
            } else {
                setIsBlock(false);
            }
        });

        getAccessToken().then((res) => {
            console.log(res, "res");
        });
    }, []);

    useEffect(() => {
        if (whiteList.includes(pathname)) {
            handleGetUserPaper();
        }
    }, [multiMercuryJarTournamentContract, multiProvider, address, pathname]);

    return (
        <UserInfoContext.Provider
            value={{
                isUserInfoOpen: isOpen,
                onUserInfoOpen: onOpen,
                onUserInfoClose: onClose,
                blockOpen,
                isBlock,
                handleBlock,
                userName,
                planeList,
                planeInit,
                userNameInit,
                handleGetUserPaper,
                handleGetUserPlane,
                handleLogin,
                loading,
            }}
        >
            <Box
                sx={{
                    height: "100%",
                }}
            >
                {children}
                <UserInfoDrawer
                    onUserNameChange={handleSetUserName}
                    isOpen={isOpen}
                    onClose={onClose}
                ></UserInfoDrawer>
            </Box>
        </UserInfoContext.Provider>
    );
};

export const useUserInfo = () => {
    return useContext(UserInfoContext);
};
