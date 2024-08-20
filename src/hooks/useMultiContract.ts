import { useMemo } from "react";
import { AddressZero } from "@ethersproject/constants";
import SKYLABTESSTFLIGHT_ABI from "@/skyConstants/abis/SkylabTestFlight.json";
import { Contract, Provider, setMulticallAddress } from "ethers-multicall";
import SKYLABBIDTACTOEGAME_ABI from "@/skyConstants/abis/SkylabBidTacToeGame.json";
import SKYLABBIDTACTOE_ABI from "@/skyConstants/abis/SkylabBidTacToe.json";
import MERCURYJARTOURNAMENT_ABI from "@/skyConstants/abis/MercuryJarTournament.json";
import MARKETPLACE_ABI from "@/skyConstants/abis/MarketPlace.json";
import LOYALTY_ABI from "@/skyConstants/abis/LoyaltyPoints.json";
import { ChainId, TESTFLIGHT_CHAINID, randomRpc } from "@/utils/web3Utils";
import {
    skylabBidTacToeAddress,
    skylabTestFlightAddress,
    mercuryJarTournamentAddress,
    marketPlaceAddress,
} from "./useContract";
import { ethers } from "ethers";
import { isAddress } from "@/utils/isAddress";
import { useChainId } from "wagmi";

setMulticallAddress(ChainId.BASE, "0xcA11bde05977b3631167028862bE2a173976CA11");

setMulticallAddress(
    ChainId.SEPOLIA,
    "0xcA11bde05977b3631167028862bE2a173976CA11",
);

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

// account is optional
export function getContract(address: string, ABI: any): Contract {
    if (!isAddress(address) || address === AddressZero) {
        throw Error(`Invalid 'address' parameter '${address}'.`);
    }

    return new Contract(address, ABI);
}

export const useMultiMercuryBaseContractTest = () => {
    return useContract(
        skylabTestFlightAddress[TESTFLIGHT_CHAINID],
        SKYLABTESSTFLIGHT_ABI,
    );
};

export const useMultiSkylabBidTacToeFactoryContract = (
    propChainId?: number,
) => {
    const activeChainId = useChainId();
    const chainId = propChainId || activeChainId;

    return useContract(skylabBidTacToeAddress[chainId], SKYLABBIDTACTOE_ABI);
};

export const useMultiTestSkylabBidTacToeFactoryContract = () => {
    return useContract(
        skylabBidTacToeAddress[TESTFLIGHT_CHAINID],
        SKYLABBIDTACTOE_ABI,
    );
};

export const useMultiSkylabBidTacToeGameContract = (address: string) => {
    return useContract(address, SKYLABBIDTACTOEGAME_ABI);
};

export const useMultiMercuryJarTournamentContract = () => {
    const chainId = useChainId();
    return useContract(
        mercuryJarTournamentAddress[chainId],
        MERCURYJARTOURNAMENT_ABI,
    );
};

export const useMultiMarketPlaceContract = () => {
    const chainId = useChainId();
    return useContract(marketPlaceAddress[chainId], MARKETPLACE_ABI);
};

export const useMultiPointContract = () => {
    const chainId = useChainId();
    return useContract(marketPlaceAddress[chainId], LOYALTY_ABI);
};

export const useMultiProvider = (chainId: number) => {
    return useMemo(() => {
        if (!chainId) return null;
        const rpcList = randomRpc[chainId];
        const provider = new ethers.providers.JsonRpcProvider(rpcList[0]);
        return new Provider(provider as any, chainId);
    }, [chainId]);
};
