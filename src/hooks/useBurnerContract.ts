import { useMemo } from "react";
import SKYLABBIDTACTOE_ABI from "@/skyConstants/abis/SkylabBidTacToe.json";
import SKYLABBIDTACTOEGAME_ABI from "@/skyConstants/abis/SkylabBidTacToeGame.json";
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

export const useTestSkylabBidTacToeContract = () => {
    const chainId = TESTFLIGHT_CHAINID;
    return useContract(skylabBidTacToeAddress[chainId], SKYLABBIDTACTOE_ABI);
};

export const useBurnerSkylabBidTacToeGameContract = (address: string) => {
    return useContract(address, SKYLABBIDTACTOEGAME_ABI);
};
