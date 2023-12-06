import { Contract, ethers } from "ethers";
import { useMemo } from "react";
import { AddressZero } from "@ethersproject/constants";
import SKYLABBIDTACTOE_ABI from "@/skyConstants/abis/SkylabBidTacToe.json";
import SKYLABBIDTACTOEGAME_ABI from "@/skyConstants/abis/SkylabBidTacToeGame.json";
import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import { isAddress } from "@/utils/isAddress";
import { skylabBidTacToeAddress } from "./useContract";
import { useChainId } from "wagmi";

// account is optional
export function getContract(address: string, ABI: any): Contract {
    if (!isAddress(address) || address === AddressZero) {
        throw Error(`Invalid 'address' parameter '${address}'.`);
    }

    return new Contract(address, ABI);
}
// returns null on errors
function useContract(address: string | undefined, ABI: any): Contract | null {
    return useMemo(() => {
        if (!address || !ABI) return null;
        try {
            return getContract(address, ABI);
        } catch (error) {
            console.error("Failed to get contract", error);
            return null;
        }
    }, [address, ABI]);
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
