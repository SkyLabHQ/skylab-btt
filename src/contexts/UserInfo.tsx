import { Box, useDisclosure } from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import UserInfoDrawer from "@/components/UserInfoDrawer";
import { PilotInfo, usePilotInfo } from "@/hooks/usePilotInfo";
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

const UserInfoContext = createContext<{
    isUserInfoOpen: boolean;
    onUserInfoOpen: () => void;
    onUserInfoClose: () => void;
    activePilot: PilotInfo;
    handleGetActivePilot: () => void;
    pilotIsInit: boolean;
    blockOpen: boolean;
    isBlock: boolean;
    bidIconType: string;
    userName: string;
    paperBalance: string;
    planeList: any[];
    planeInit: boolean;
    userNameInit: boolean;
    handleBlock: (block: boolean) => void;
    handleToggleType: () => void;
    handleGetUserPaper: () => void;
}>(null);

export const UserInfoProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const mercuryJarTournamentContract = useMercuryJarTournamentContract();
    const publicClient = usePublicClient();
    const chainId = useChainId();
    const multiProvider = useMultiProvider(chainId);
    const multiMercuryJarTournamentContract =
        useMultiMercuryJarTournamentContract();
    const { address } = usePrivyAccounts();
    const { activePilot, handleGetActivePilot, init } = usePilotInfo(address);
    const [isBlock, setIsBlock] = useState(false);
    const [blockOpen, setIsBlockOpen] = useState(false);
    const [bidIconType, setBidIconType] = useState("0");
    const [paperBalance, setPaperBalance] = useState("0");
    const [userName, setUserName] = useState("");
    const [userNameInit, setUserNameInit] = useState(false);
    const [planeList, setPlaneList] = useState([] as any[]);
    const [planeInit, setPlaneInit] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useSkyToast();

    const handleBlock = (block: boolean) => {
        setIsBlockOpen(block);
    };

    const handleToggleType = () => {
        if (bidIconType === "0") {
            setBidIconType("1");
            localStorage.setItem("bidIconType", "1");
        } else {
            setBidIconType("0");
            localStorage.setItem("bidIconType", "0");
        }
    };

    const handleGetUserPaper = async () => {
        if (!multiMercuryJarTournamentContract || !multiProvider || !address) {
            return;
        }
        if (loading) {
            return;
        }
        setLoading(true);
        const [planeBalance, paperBalance, userName] = await multiProvider.all([
            multiMercuryJarTournamentContract.balanceOf(address),
            multiMercuryJarTournamentContract.paperBalance(address),
            multiMercuryJarTournamentContract.userName(address),
        ]);
        setUserName(userName);
        setUserNameInit(true);
        setPaperBalance(paperBalance.toString());
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

        setPlaneInit(true);
        setPlaneList(planeList);
        setLoading(false);
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

    const handleMintPlane = async () => {
        if (isBlock && !blockOpen) {
            handleBlock(true);
        }

        if (Number(paperBalance) === 0) {
            return;
        }
        try {
            const hash = await mercuryJarTournamentContract.write.mintWithPaper(
                [1],
                {},
            );
            console.log(hash, "hash");
            // @ts-ignore
            const receipt = await publicClient.waitForTransactionReceipt({
                hash,
            });
            if (receipt.status !== "success") {
                toast("Transaction failed");
                return;
            }
            handleGetUserPaper();
        } catch (e) {
            toast(handleError(e));
        }
    };

    useEffect(() => {
        const _bidIconType = localStorage.getItem("bidIconType");
        if (_bidIconType && bidIconType !== _bidIconType) {
            setBidIconType("1");
        }

        axios.get("https://ipapi.co/json/").then(async (res: any) => {
            if (res.data.country_code === "US") {
                setIsBlock(true);
            } else {
                setIsBlock(false);
            }
        });
    }, []);

    useEffect(() => {
        handleGetUserPaper();
    }, [multiMercuryJarTournamentContract, multiProvider, address]);

    return (
        <UserInfoContext.Provider
            value={{
                isUserInfoOpen: isOpen,
                onUserInfoOpen: onOpen,
                onUserInfoClose: onClose,
                activePilot,
                handleGetActivePilot,
                pilotIsInit: init,
                blockOpen,
                isBlock,
                handleBlock,
                bidIconType,
                handleToggleType,
                userName,
                paperBalance,
                planeList,
                planeInit,
                userNameInit,
                handleGetUserPaper,
            }}
        >
            <Box
                sx={{
                    height: "100%",
                }}
            >
                {children}
                <UserInfoDrawer
                    onMintPlane={handleMintPlane}
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
