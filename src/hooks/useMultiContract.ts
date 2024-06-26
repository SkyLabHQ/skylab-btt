import { useMemo } from "react";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { AddressZero } from "@ethersproject/constants";
import SKYLABTESSTFLIGHT_ABI from "@/skyConstants/abis/SkylabTestFlight.json";
import { Contract, Provider, setMulticallAddress } from "ethers-multicall";
import MERCURYPILOTS_ABI from "@/skyConstants/abis/MercuryPilots.json";
import SKYLABTOURNAMENT_ABI from "@/skyConstants/abis/SkylabTournament.json";
import SKYLABBIDTACTOEGAME_ABI from "@/skyConstants/abis/SkylabBidTacToeGame.json";
import SKYLABBIDTACTOE_ABI from "@/skyConstants/abis/SkylabBidTacToe.json";
import DELEGATEERC721_ABI from "@/skyConstants/abis/DelegateERC721.json";
import ERC721_ABI from "@/skyConstants/abis/ERC721.json";
import MERCURYJARTOURNAMENT_ABI from "@/skyConstants/abis/MercuryJarTournament.json";
import PILOTMILEAGE_ABI from "@/skyConstants/abis/PilotMileage.json";
import PILOTNETPOINTS_ABI from "@/skyConstants/abis/PilotNetPoints.json";
import PILOTWINSTREAK_ABI from "@/skyConstants/abis/PilotWinStreak.json";
import MERCURYBTTPRIVATELOBBY_ABI from "@/skyConstants/abis/MercuryBTTPrivateLobby.json";
import qs from "query-string";
import { ChainId, randomRpc } from "@/utils/web3Utils";
import { useLocation } from "react-router-dom";
import {
    skylabBidTacToeAddress,
    skylabTestFlightAddress,
    mercuryPilotsAddress,
    delegateERC721Address,
    pilotMileageAddress,
    pilotNetPointsAddress,
    pilotWinStreakAddress,
    mercuryJarTournamentAddress,
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
// account is optional
export function getProviderOrSigner(
    library: Web3Provider,
    account?: string,
): Web3Provider | JsonRpcSigner {
    return account ? getSigner(library, account) : library;
}
// account is not optional
export function getSigner(
    library: Web3Provider,
    account: string,
): JsonRpcSigner {
    return library.getSigner(account).connectUnchecked();
}

export const useMultiMercuryTouramentContract = (propChainId?: number) => {
    const activeChainId = useChainId();
    const chainId = propChainId || activeChainId;

    return useContract(
        mercuryJarTournamentAddress[chainId],
        SKYLABTOURNAMENT_ABI,
    );
};

export const useMultiMercuryBaseContract = (propChainId?: number) => {
    const activeChainId = useChainId();
    const chainId = propChainId || activeChainId;
    const { search } = useLocation();
    const params = qs.parse(search) as any;
    const istest = params.testflight === "true";
    return useContract(
        chainId &&
            (istest
                ? skylabTestFlightAddress[chainId]
                : mercuryJarTournamentAddress[chainId]),
        istest ? SKYLABTESSTFLIGHT_ABI : SKYLABTOURNAMENT_ABI,
    );
};

export const useMultiSkylabBidTacToeFactoryContract = (
    propChainId?: number,
) => {
    const activeChainId = useChainId();
    const chainId = propChainId || activeChainId;

    return useContract(skylabBidTacToeAddress[chainId], SKYLABBIDTACTOE_ABI);
};

export const useMultiSkylabBidTacToeGameContract = (address: string) => {
    return useContract(address, SKYLABBIDTACTOEGAME_ABI);
};

export const getMultiSkylabBidTacToeGameContract = (address: string) => {
    return getContract(address, SKYLABBIDTACTOEGAME_ABI);
};

export const useMultiERC721Contract = (address: string) => {
    return useContract(address, SKYLABTESSTFLIGHT_ABI);
};

export const useMultiMercuryPilotsContract = (chainId: number) => {
    return useContract(mercuryPilotsAddress[chainId], MERCURYPILOTS_ABI);
};

export const getMultiDelegateERC721Contract = (chainId: number) => {
    return getContract(delegateERC721Address[chainId], DELEGATEERC721_ABI);
};

export const getMultiERC721Contract = (address: string) => {
    return getContract(address, ERC721_ABI);
};

export const useMultiPilotMileageContract = (chainId: number) => {
    return useContract(pilotMileageAddress[chainId], PILOTMILEAGE_ABI);
};

export const useMultiPilotNetPointsContract = (chainId: number) => {
    return useContract(pilotNetPointsAddress[chainId], PILOTNETPOINTS_ABI);
};

export const useMultiPilotWinStreakContract = (chainId: number) => {
    return useContract(pilotWinStreakAddress[chainId], PILOTWINSTREAK_ABI);
};

export const useMultiMercuryBTTPrivateLobby = (address: string) => {
    return useContract(address, MERCURYBTTPRIVATELOBBY_ABI);
};

export const useMultiMercuryJarTournamentContract = () => {
    const chainId = useChainId();
    return useContract(
        mercuryJarTournamentAddress[chainId],
        MERCURYJARTOURNAMENT_ABI,
    );
};

export const getMultiMercuryBTTPrivateLobby = (address: string) => {
    return getContract(address, MERCURYBTTPRIVATELOBBY_ABI);
};

export const useMultiProvider = (chainId: number) => {
    return useMemo(() => {
        if (!chainId) return null;
        const rpcList = randomRpc[chainId];
        const provider = new ethers.providers.JsonRpcProvider(rpcList[0]);
        return new Provider(provider as any, chainId);
    }, [chainId]);
};

export const getMultiProvider = (chainId: number) => {
    const rpcList = randomRpc[chainId];
    const provider = new ethers.providers.JsonRpcProvider(rpcList[0]);
    return new Provider(provider, chainId);
};
