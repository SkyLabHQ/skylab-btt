import { ethers } from "ethers";
import { useMemo } from "react";
import SKYLABTESSTFLIGHT_ABI from "@/skyConstants/abis/SkylabTestFlight.json";
import MERCURYPILOTS_ABI from "@/skyConstants/abis/MercuryPilots.json";
import BABYMERCS_ABI from "@/skyConstants/abis/BabyMercs.json";

import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import { useEthersProvider, useEthersSigner } from "./useWagmiToEthers";
import { useChainId, useWalletClient } from "wagmi";
import { getContract } from "@/utils/contractHelpers";
import {
    babyMercsAddress,
    mercuryPilotsAddress,
    skylabTestFlightAddress,
} from "./useContract";

// returns null on errors
function useContract(address: any, abi: any) {
    const chainId = useChainId();
    const signer = useEthersSigner();
    const { data: walletClient } = useWalletClient();

    return useMemo(() => {
        if (!address || !abi) return null;
        try {
            return getContract({
                abi,
                address,
                chainId,
                signer: walletClient ?? undefined,
            });
        } catch (error) {
            console.error("Failed to get contract", error);
            return null;
        }
    }, [address, abi, chainId, signer]);
}

// 获取本地私钥账户
export function useLocalSigner(): ethers.Wallet {
    const library = useEthersProvider();
    const owner = useMemo(() => {
        if (!library) return null;
        let privateKey = localStorage.getItem("privateKey");
        if (!privateKey) {
            // 随机创建一个私钥账户
            const randomAccount = ethers.Wallet.createRandom();
            localStorage.setItem("privateKey", randomAccount.privateKey);
            privateKey = randomAccount.privateKey;
        }
        const owner = new ethers.Wallet(privateKey, library);
        return owner;
    }, [library]);
    return owner;
}

export const useTestflightContract = () => {
    return useContract(
        skylabTestFlightAddress[TESTFLIGHT_CHAINID],
        SKYLABTESSTFLIGHT_ABI,
    );
};

export const useMercuryPilotsContract = () => {
    const chainId = useChainId();
    return useContract(mercuryPilotsAddress[chainId], MERCURYPILOTS_ABI);
};

export const useBabyMercsContract = () => {
    const chainId = useChainId();
    return useContract(babyMercsAddress[chainId], BABYMERCS_ABI);
};
