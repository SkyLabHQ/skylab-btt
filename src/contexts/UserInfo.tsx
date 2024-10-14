import { Box, useDisclosure } from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import UserInfoDrawer from "@/components/UserInfoDrawer";
import useSkyToast from "@/hooks/useSkyToast";
import { usePrivy, useWallets, useLogin } from "@privy-io/react-auth";
import { tournamentLogin } from "@/api/tournament";
import { avatarImg } from "@/utils/avatars";
import { createWalletClient, custom } from "viem";
import { baseSepolia } from "viem/chains";
import ChooseTeamModal from "@/components/Tower/ChooseTeamModal";

interface TgInfo {
    tgId: string;
    firstName: string;
    lastName: string;
    username: string;
    photoUrl: string;
}

const UserInfoContext = createContext<{
    tgInfo: TgInfo;
    isUserInfoOpen: boolean;
    onUserInfoOpen: () => void;
    onUserInfoClose: () => void;
    blockOpen: boolean;
    isBlock: boolean;
    signer: any;
    address: string;
    loginInit: boolean;
    handleBlock: (block: boolean) => void;
    handleLogin: () => void;
    setTgInfo: (info: TgInfo) => void;
}>(null);

export const UserInfoProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [loginInit, setLoginInit] = useState(false);
    const { ready, user, linkWallet, logout, authenticated } = usePrivy();

    const { login } = useLogin({
        onComplete: async (user: any) => {
            try {
                const res = await tournamentLogin();
                const { userInfo, jwtToken } = res.data;
                localStorage.setItem("tournamentToken", jwtToken);
                const info = {
                    ...userInfo,
                    photoUrl: userInfo.photoUrl
                        ? userInfo.photoUrl
                        : avatarImg(user.wallet.address),
                };

                setTgInfo(info);
                setLoginInit(true);
            } catch (e) {
                console.log(e);
                toast("Failed to get user info");
                logout();
                localStorage.removeItem("tournamentToken");
            }
        },
    });
    const { wallets } = useWallets();
    const [address, setAddress] = useState("");
    const [signer, setSigner] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isBlock, setIsBlock] = useState(false);
    const [blockOpen, setIsBlockOpen] = useState(false);

    const [tgInfo, setTgInfo] = useState({
        tgId: "",
        firstName: "",
        lastName: "",
        username: "",
        photoUrl: "",
    });
    const toast = useSkyToast();

    const handleLogin = async () => {
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

    useEffect(() => {
        const handleGetSigner = async () => {
            if (wallets.length === 0) {
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

            const provider = await wallet.getEthereumProvider();
            const walletClient = createWalletClient({
                chain: baseSepolia,
                transport: custom(provider),
                account: wallet.address as `0x${string}`,
            });

            setAddress(wallet.address);
            setSigner(walletClient);
        };

        if (
            wallets.length === 0 ||
            !ready ||
            !user ||
            !authenticated ||
            !loginInit
        ) {
            setAddress("");
            setSigner(null);
            return;
        }
        handleGetSigner();
    }, [wallets, ready, user, authenticated, loginInit]);

    return (
        <UserInfoContext.Provider
            value={{
                tgInfo,
                setTgInfo,
                isUserInfoOpen: isOpen,
                onUserInfoOpen: onOpen,
                onUserInfoClose: onClose,
                blockOpen,
                loginInit,
                isBlock,
                handleBlock,
                handleLogin,
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
