import { useMemo } from "react";
import SKYLABBIDTACTOE_ABI from "@/skyConstants/abis/SkylabBidTacToe.json";
import SKYLABBIDTACTOEGAME_ABI from "@/skyConstants/abis/SkylabBidTacToeGame.json";
import MERCURYBTTPRIVATELOBBY_ABI from "@/skyConstants/abis/MercuryBTTPrivateLobby.json";
import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import { skylabBidTacToeAddress } from "./useContract";
import { useChainId } from "wagmi";
import { getContract } from "@/utils/contractHelpers";

function useContract(address: any, abi: any) {
    const chainId = useChainId();

    return useMemo(() => {
        if (!address || !abi) return null;
        try {
            return getContract({
                abi,
                address,
                chainId,
                signer: undefined,
            });
        } catch (error) {
            console.error("Failed to get contract", error);
            return null;
        }
    }, [address, abi, chainId]);
}

export const useBurnerSkylabBidTacToeContract = (istest: boolean = false) => {
    const activeChainId = useChainId();
    const chainId = istest ? TESTFLIGHT_CHAINID : activeChainId;
    return useContract(
        skylabBidTacToeAddress[istest ? chainId : TESTFLIGHT_CHAINID],
        SKYLABBIDTACTOE_ABI,
    );
};

export const useBurnerSkylabBidTacToeGameContract = (address: string) => {
    return useContract(address, SKYLABBIDTACTOEGAME_ABI);
};

export const useBurnerMercuryBTTPrivateLobbyContract = (address: string) => {
    return useContract(address, MERCURYBTTPRIVATELOBBY_ABI);
};
