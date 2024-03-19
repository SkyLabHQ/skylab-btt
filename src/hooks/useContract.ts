import { useMemo } from "react";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import SKYLABTESSTFLIGHT_ABI from "@/skyConstants/abis/SkylabTestFlight.json";
import SKYLABTOURNAMENT_ABI from "@/skyConstants/abis/SkylabTournament.json";
import SKYLABBIDTACTOE_ABI from "@/skyConstants/abis/SkylabBidTacToe.json";
import MERCURYPILOTS_ABI from "@/skyConstants/abis/MercuryPilots.json";
import BABYMERCS_ABI from "@/skyConstants/abis/BabyMercs.json";
import qs from "query-string";
import SKYLABBIDTACTOEGAME_ABI from "@/skyConstants/abis/SkylabBidTacToeGame.json";
import MERCURYJARTOURNAMENT_ABI from "@/skyConstants/abis/MercuryJarTournament.json";
import { ChainId, TESTFLIGHT_CHAINID } from "@/utils/web3Utils";
import { useLocation } from "react-router-dom";
import { useChainId } from "wagmi";
import { getContract } from "@/utils/contractHelpers";
import usePrivyAccounts from "./usePrivyAccount";

type ChainIdToAddressMap = { [chainId in ChainId]?: string };

export const skylabTestFlightAddress: ChainIdToAddressMap = {
    [ChainId.MUMBAI]: "0x505b66109a1112dB5DF85884aB75F28A258d755b",
    [ChainId.BASE]: "0x93d9a16e4D67D9471C65c3c8B8B40621d380f24f",
    [ChainId.SEPOLIA]: "0x360F2Eb6750F8a77B41F99967CF15E2C03FbB987",
};
export const skylabTournamentAddress: ChainIdToAddressMap = {
    [ChainId.MUMBAI]: "0x12CAc51DD11aa2C3f20A2855b454553D73a293d7",
    [ChainId.POLYGON]: "0xb806EFDba9DB957b5960B7a58b5F7d57187dFF17",
    [ChainId.BASE]: "0xe0f81c4004A15439d390aBFa412DE51A311F9919",
    [ChainId.SEPOLIA]: "0xd62AB961033D1468Fb962beb114A32205e7eC7B7",
};

export const skylabBidTacToeAddress: ChainIdToAddressMap = {
    [ChainId.MUMBAI]: "0x89e61F9dCa2336a67d9131ad094f2202913c577d",
    [ChainId.POLYGON]: "0xb0D5AB79F5A0e6023861e45692C66BC0B87f1658",
    [ChainId.BASE]: "0x22b0B94541D4De8B94cE10B7493a2cF7D10F2059",
    [ChainId.SEPOLIA]: "0xa9558d38BA30c4e807505C10bF0d58f1ADea2D66",
};

export const mercuryPilotsAddress: ChainIdToAddressMap = {
    [ChainId.MUMBAI]: "0x3a2e43c675F4da9aF823366261697d9efEFF2447",
    [ChainId.POLYGON]: "0xe13013cBCc3ee016e020544B691882A14Bdf3ee9",
    [ChainId.BASE]: "0x8C4bA8210C2a022E60641808553151f29c737045",
    [ChainId.SEPOLIA]: "0xc6B4AF6B7C944a4C43755b83753D292Ac3447b19",
};

export const babyMercsAddress: ChainIdToAddressMap = {
    [ChainId.MUMBAI]: "0x5aeA85A1469D5CCAaeE0Da6e92E39A9F65b30bf9",
    [ChainId.POLYGON]: "0x7F37F3bb0610410189C792bab5C8a94bff880E04",
    [ChainId.BASE]: "0x0110ED48D661Fd78FF4b22224350A5d9876CC281",
    [ChainId.SEPOLIA]: "0x1c90796e31ae9690880751baF7e2Da3e9c181F58",
};

export const delegateERC721Address: ChainIdToAddressMap = {
    [ChainId.MUMBAI]: "0x940d94B2af1718dD284BDcBc2264e97e97C12F93",
    [ChainId.POLYGON]: "0xc058fd46391f69758434B49AA17073eD00F17D8C",
    [ChainId.ETHEREUM]: "0xc6B4AF6B7C944a4C43755b83753D292Ac3447b19",
    [ChainId.BASE]: "0xc6B4AF6B7C944a4C43755b83753D292Ac3447b19",
    [ChainId.SEPOLIA]: "0xD827b59aE7b13aD50Df9DC35c11e49496077F573",
};

export const pilotMileageAddress: ChainIdToAddressMap = {
    [ChainId.MUMBAI]: "0xBAA0aD275a12e0b1b887497103884E5474286D2d",
    [ChainId.POLYGON]: "0x743AC85caf73DcB362951658421116809A299b53",
    [ChainId.BASE]: "0x2cCee5bbA7BC5DF4972b6a07f394aFE38826d932",
    [ChainId.SEPOLIA]: "0xeff451DeA1686C1B1006b1eAdAC8b4050DDba99D",
};

export const pilotNetPointsAddress: ChainIdToAddressMap = {
    [ChainId.MUMBAI]: "0x3C41918442e54A4e8ece229BCE0e3320f8068b6b",
    [ChainId.POLYGON]: "0x44A4ee1bD559A55398f8533C8c8848032Ef44305",
    [ChainId.BASE]: "0x4C2bc8a9451A91667CFD54A82D809B11D2754100",
    [ChainId.SEPOLIA]: "0xA14913aC1Fde587b9BbC162dFa39D952f210Ab7d",
};

export const pilotWinStreakAddress: ChainIdToAddressMap = {
    [ChainId.MUMBAI]: "0xd28A68A83d3F9F511DD058eC96B806D255764d07",
    [ChainId.POLYGON]: "0xdf2b732D9fafA6D306a905b3B5BDB385280bd6a3",
    [ChainId.BASE]: "0x38f8E872F40B2c7e195d8ed2c58A95FA75e567db",
    [ChainId.SEPOLIA]: "0x78dc8f9A143469285B2a1e14A5Eb200b510201D9",
};

export const botAddress: ChainIdToAddressMap = {
    [ChainId.MUMBAI]: "0x3BEe8B4854CeDc91dc5315f9ae8bC57f403E8eBb",
    [ChainId.BASE]: "0x4De2F93dc9ff51E2177faB92C5dE9d19C2b79359",
    [ChainId.SEPOLIA]: "0x51Cd3F6801C19cCdfaF850ff5C5178Fc06A91316",
};

export const mercuryJarTournamentAddress: ChainIdToAddressMap = {
    [ChainId.SEPOLIA]: "0xe9FAF538B759a7a1a7c7BFFEe7cDe527100b7402",
};

function useContract(address: any, abi: any) {
    const chainId = useChainId();
    const { signer } = usePrivyAccounts();

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

export const useMercuryPilotsContract = () => {
    const chainId = useChainId();
    return useContract(mercuryPilotsAddress[chainId], MERCURYPILOTS_ABI);
};

export const useBabyMercsContract = () => {
    const chainId = useChainId();
    return useContract(babyMercsAddress[chainId], BABYMERCS_ABI);
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
