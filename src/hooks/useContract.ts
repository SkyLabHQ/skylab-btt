import { useMemo } from "react";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import SKYLABTESSTFLIGHT_ABI from "@/skyConstants/abis/SkylabTestFlight.json";
import SKYLABTOURNAMENT_ABI from "@/skyConstants/abis/SkylabTournament.json";
import SKYLABBIDTACTOE_ABI from "@/skyConstants/abis/SkylabBidTacToe.json";
import qs from "query-string";
import SKYLABBIDTACTOEGAME_ABI from "@/skyConstants/abis/SkylabBidTacToeGame.json";
import MERCURYJARTOURNAMENT_ABI from "@/skyConstants/abis/MercuryJarTournament.json";
import MARKETPLACE_ABI from "@/skyConstants/abis/MarketPlace.json";
import { ChainId, TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import { useLocation } from "react-router-dom";
import { useChainId } from "wagmi";
import { getContract } from "@/utils/contractHelpers";
import { useUserInfo } from "@/contexts/UserInfo";

type ChainIdToAddressMap = { [chainId: number]: string };

export const skylabTestFlightAddress: ChainIdToAddressMap = {
    [ChainId.BASE]: "0x93d9a16e4D67D9471C65c3c8B8B40621d380f24f",
    [ChainId.SEPOLIA]: "0x360F2Eb6750F8a77B41F99967CF15E2C03FbB987",
};
export const skylabTournamentAddress: ChainIdToAddressMap = {
    [ChainId.POLYGON]: "0xb806EFDba9DB957b5960B7a58b5F7d57187dFF17",
    [ChainId.BASE]: "0xe0f81c4004A15439d390aBFa412DE51A311F9919",
    [ChainId.SEPOLIA]: "0xd62AB961033D1468Fb962beb114A32205e7eC7B7",
};

export const skylabBidTacToeAddress: ChainIdToAddressMap = {
    [ChainId.POLYGON]: "0xb0D5AB79F5A0e6023861e45692C66BC0B87f1658",
    [ChainId.BASE]: "0x22b0B94541D4De8B94cE10B7493a2cF7D10F2059",
    [ChainId.SEPOLIA]: "0x01C180cEa33CB091717D244A6109944995e67E01",
};

export const botAddress: ChainIdToAddressMap = {
    [ChainId.BASE]: "0x4De2F93dc9ff51E2177faB92C5dE9d19C2b79359",
    [ChainId.SEPOLIA]: "0x51Cd3F6801C19cCdfaF850ff5C5178Fc06A91316",
};

export const mercuryJarTournamentAddress: ChainIdToAddressMap = {
    [ChainId.SEPOLIA]: "0xBCD70B8557A120d4025C90dE4D6705B04754Ca0B",
};

export const marketPlaceAddress: ChainIdToAddressMap = {
    [ChainId.SEPOLIA]: "0xc6B4AF6B7C944a4C43755b83753D292Ac3447b19",
};

function useContract(address: any, abi: any) {
    const chainId = useChainId();
    const { signer } = useUserInfo();

    return useMemo(() => {
        if (!address || !abi) return null;
        try {
            return getContract({
                abi,
                address,
                chainId,
                signer: signer ?? undefined,
            });
        } catch (error) {
            console.error("Failed to get contract", error);
            return null;
        }
    }, [address, abi, chainId, signer]);
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

export const useTestflightContract = () => {
    return useContract(
        skylabTestFlightAddress[TESTFLIGHT_CHAINID],
        SKYLABTESSTFLIGHT_ABI,
    );
};

export const useMercuryBaseContract = (usetest?: boolean) => {
    const chainId = useChainId();
    const { search } = useLocation();
    const params = qs.parse(search) as any;
    const istest = usetest
        ? usetest
        : params.testflight
        ? params.testflight === "true"
        : false;
    return useContract(
        chainId &&
            (istest
                ? skylabTestFlightAddress[chainId]
                : skylabTournamentAddress[chainId]),
        istest ? SKYLABTESSTFLIGHT_ABI : SKYLABTOURNAMENT_ABI,
    );
};

export const useSkylabBidTacToeContract = () => {
    const chainId = useChainId();
    return useContract(skylabBidTacToeAddress[chainId], SKYLABBIDTACTOE_ABI);
};

export const useSkylabBidTacToeGameContract = (address: string) => {
    return useContract(address, SKYLABBIDTACTOEGAME_ABI);
};

export const useMercuryJarTournamentContract = () => {
    const chainId = useChainId();
    return useContract(
        mercuryJarTournamentAddress[chainId],
        MERCURYJARTOURNAMENT_ABI,
    );
};

export const useMarketPlaceContract = () => {
    const chainId = useChainId();
    return useContract(marketPlaceAddress[chainId], MARKETPLACE_ABI);
};
