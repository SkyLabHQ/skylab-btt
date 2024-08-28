import { Box, useDisclosure } from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import UserInfoDrawer from "@/components/UserInfoDrawer";
import axios from "axios";
import { useChainId } from "wagmi";
import {
    useMultiMercuryJarTournamentContract,
    useMultiProvider,
} from "@/hooks/useMultiContract";
import { levelRanges } from "@/utils/level";
import { aviationImg } from "@/utils/aviationImg";
import useSkyToast from "@/hooks/useSkyToast";
import { useLocation } from "react-router-dom";
import Click1Wav from "@/assets/click1.wav";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { getTokensGame } from "@/api/tournament";
import { bindTelegram, getUserTgInfo } from "@/api/user";
import { avatarImg } from "@/utils/avatars";
import { createWalletClient, custom } from "viem";
import { baseSepolia } from "viem/chains";

const audio = new Audio(Click1Wav);

interface TgInfo {
    tgId: string;
    firstName: string;
    lastName: string;
    username: string;
    photoUrl: string;
}

const UserInfoContext = createContext<{
    loading: boolean;
    tgInfo: TgInfo;
    isUserInfoOpen: boolean;
    onUserInfoOpen: () => void;
    onUserInfoClose: () => void;
    blockOpen: boolean;
    isBlock: boolean;
    planeList: any[];
    planeInit: boolean;
    signer: any;
    address: string;
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
    const { ready, user, login, linkWallet, getAccessToken, authenticated } =
        usePrivy();

    const { wallets } = useWallets();
    const [walletAddress, setWalletAddress] = useState("");
    const [address, setAddress] = useState("");
    const [signer, setSigner] = useState(null);
    const { pathname } = useLocation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const chainId = useChainId();
    const multiProvider = useMultiProvider(chainId);
    const multiMercuryJarTournamentContract =
        useMultiMercuryJarTournamentContract();
    const [isBlock, setIsBlock] = useState(false);
    const [blockOpen, setIsBlockOpen] = useState(false);
    const [planeList, setPlaneList] = useState([] as any[]);
    const [planeInit, setPlaneInit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tgInfo, setTgInfo] = useState({
        tgId: "",
        firstName: "",
        lastName: "",
        username: "",
        photoUrl: "",
    });
    const toast = useSkyToast();

    const handleLogin = async () => {
        audio.play();
        if (!ready) {
            toast("Please wait for the wallet to be ready");
            return;
        }

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

    const handleAutoBindTelegram = async () => {
        try {
            const res = await bindTelegram({
                ...user.telegram,
                address: user.wallet.address,
            });
            const info = {
                ...res.data.userTgInfo,
                photoUrl: res.data.userTgInfo.photoUrl
                    ? res.data.userTgInfo.photoUrl
                    : avatarImg(user.wallet.address),
            };

            setTgInfo(info);
        } catch (e) {
            console.log(e);
        } finally {
            setAddress(walletAddress);
        }
    };

    const handleGetUserTgInfo = async () => {
        try {
            const res = await getUserTgInfo();

            console.log(res.data, "res.data.");
            const info = {
                ...res.data.userTgInfo,
                photoUrl: res.data.userTgInfo.photoUrl
                    ? res.data.userTgInfo.photoUrl
                    : avatarImg(user.wallet.address),
            };

            setTgInfo(info);
        } catch (e) {
            console.log(e);
        } finally {
            setAddress(walletAddress);
        }
    };

    // useEffect(() => {
    //     axios.get("https://ipapi.co/json/").then(async (res: any) => {
    //         if (res.data.country_code === "US") {
    //             setIsBlock(true);
    //         } else {
    //             setIsBlock(false);
    //         }
    //     });
    // }, []);

    useEffect(() => {
        if (whiteList.includes(pathname)) {
            handleGetUserPaper();
        }
    }, [multiMercuryJarTournamentContract, multiProvider, address, pathname]);

    useEffect(() => {
        if (!walletAddress) {
            return;
        }
        if (!user) {
            return;
        }

        if (user?.wallet?.walletClientType === "privy" && user?.telegram) {
            handleAutoBindTelegram();
        } else {
            handleGetUserTgInfo();
        }
    }, [walletAddress]);

    // 定时获取token 防止token过期
    useEffect(() => {
        const timer = setInterval(() => {
            getAccessToken().then((res) => {
                const localAc = localStorage.getItem("privy:token");
                const resAc = `"${res}"`;
                if (localAc !== res) {
                    localStorage.setItem("privy:token", resAc);
                }
            });
        }, 1000 * 60);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                getAccessToken().then((res) => {
                    const localAc = localStorage.getItem("privy:token");
                    const resAc = `"${res}"`;
                    if (localAc !== res) {
                        localStorage.setItem("privy:token", resAc);
                    }
                });
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange,
            );
        };
    }, []);

    useEffect(() => {
        const handleGetSigner = async () => {
            if (wallets.length === 0) {
                setWalletAddress("");
                setAddress("");
                setSigner(null);
                return;
            }

            const wallet = wallets.find((item) => {
                return item.address === user.wallet.address;
            });

            if (!wallet) {
                return;
            }

            setWalletAddress(user.wallet.address);
            const provider = await wallet.getEthereumProvider();
            const walletClient = createWalletClient({
                chain: baseSepolia,
                transport: custom(provider),
                account: wallet.address as `0x${string}`,
            });

            setSigner(walletClient);
        };

        if (wallets.length === 0 || !ready || !user || !authenticated) {
            setWalletAddress("");
            setAddress("");
            setSigner(null);
            return;
        }
        handleGetSigner();
    }, [wallets, ready, user, authenticated]);

    return (
        <UserInfoContext.Provider
            value={{
                tgInfo,
                isUserInfoOpen: isOpen,
                onUserInfoOpen: onOpen,
                onUserInfoClose: onClose,
                blockOpen,
                isBlock,
                handleBlock,
                planeList,
                planeInit,
                handleGetUserPaper,
                handleGetUserPlane,
                handleLogin,
                loading,
                signer,
                address,
            }}
        >
            <Box
                sx={{
                    height: "100%",
                }}
            >
                {children}
                <UserInfoDrawer
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
