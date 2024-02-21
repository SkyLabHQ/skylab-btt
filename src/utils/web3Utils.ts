import { BigNumber } from "@ethersproject/bignumber";
import { ethers } from "ethers";

/** SUPPORTED CHAINS */
export enum ChainId {
    ETHEREUM = 1,
    POLYGON = 137,
    MUMBAI = 80001,
    BASE = 8453,
    SEPOLIA = 84532,
}

export type ChainInfo = {
    rpcUrls: string[];
    chainName: string;
    nativeCurrency?: { name: string; decimals: number; symbol: string };
    blockExplorerUrls?: string[];
    iconUrls?: string[];
};

export const RPC_URLS = {
    [ChainId.ETHEREUM]: [
        "https://eth.llamarpc.com",
        "https://rpc.ankr.com/eth",
    ],
    [ChainId.POLYGON]: [
        "https://rpc.ankr.com/polygon",
        "https://polygon.llamarpc.com",
    ],
    [ChainId.MUMBAI]: [
        "https://polygon-mumbai.blockpi.network/v1/rpc/public",
        // "https://polygon-mumbai.blockpi.network/v1/rpc/public",
        // "https://polygon-mumbai-bor.publicnode.com",
        // "https://rpc.ankr.com/polygon_mumbai",
        // "https://rpc-mumbai.maticvigil.com",
    ],
    [ChainId.BASE]: ["https://base.llamarpc.com"],
};

export const BURNER_RPC_URLS = {
    [ChainId.ETHEREUM]: [
        "https://eth.llamarpc.com",
        "https://rpc.ankr.com/eth",
    ],
    [ChainId.POLYGON]: [
        "https://rpc.ankr.com/polygon",
        "https://polygon.llamarpc.com",
    ],
    [ChainId.MUMBAI]: [
        "https://polygon-mumbai.g.alchemy.com/v2/LiVNRJ2a_S9tx3uwWTdMLfZ6GmBrG324",
    ],

    [ChainId.BASE]: [
        "https://base-mainnet.g.alchemy.com/v2/eeIqX9BroszId4tnmaeDlBAIH0KAvCgz",
    ],
    [ChainId.SEPOLIA]: [
        "https://base-sepolia.g.alchemy.com/v2/Po63cIaqf7U_j1Q7Z0mUB3lOwaF8Sn3D",
    ],
};

const getRandomRpc = () => {
    const _RPC_URLS = JSON.parse(JSON.stringify(BURNER_RPC_URLS));
    for (const chainId in BURNER_RPC_URLS) {
        _RPC_URLS[chainId] = _RPC_URLS[chainId].sort(() => Math.random() - 0.5);
    }
    return _RPC_URLS;
};
export const randomRpc = getRandomRpc();

export const getRandomProvider = (chainId: ChainId) => {
    return new ethers.providers.JsonRpcProvider(randomRpc[chainId][0]);
};

export const CHAIN_NAMES = {
    [ChainId.POLYGON]: "Polygon",
    [ChainId.MUMBAI]: "Mumbai",
    [ChainId.BASE]: "Base",
    [ChainId.SEPOLIA]: "Base Sepolia",
};

export const SUPPORTED_NETWORKS: { [chainId in ChainId]?: ChainInfo } = {
    [ChainId.POLYGON]: {
        rpcUrls: RPC_URLS[ChainId.POLYGON],
        chainName: "Polygon",
        nativeCurrency: {
            name: "MATIC",
            decimals: 18,
            symbol: "MATIC",
        },
        blockExplorerUrls: ["https://polygonscan.com/"],
    },
    [ChainId.MUMBAI]: {
        rpcUrls: RPC_URLS[ChainId.MUMBAI],
        chainName: "Mumbai",
        nativeCurrency: {
            name: "MATIC",
            decimals: 18,
            symbol: "MATIC",
        },
        blockExplorerUrls: ["https://mumbai.polygonscan.com"],
    },
    [ChainId.SEPOLIA]: {
        rpcUrls: RPC_URLS[ChainId.SEPOLIA],
        chainName: CHAIN_NAMES[ChainId.SEPOLIA],
        nativeCurrency: {
            name: "ETHER",
            decimals: 18,
            symbol: "ETH",
        },
        blockExplorerUrls: ["https://base-sepolia.blockscout.com"],
    },
    [ChainId.BASE]: {
        rpcUrls: RPC_URLS[ChainId.BASE],
        chainName: CHAIN_NAMES[ChainId.BASE],
        nativeCurrency: {
            name: "ETHER",
            decimals: 18,
            symbol: "ETH",
        },
        blockExplorerUrls: ["https://basescan.org/"],
    },
};

export const NETWORK_CONTEXT_NAME = "SkyLabNetworkContext";

export const TESTFLIGHT_CHAINID = ChainId.SEPOLIA;

export const DEAFAULT_CHAINID =
    ChainId.SEPOLIA || Number(process.env.REACT_APP_CHAIN_ID);
export const NETWORK_URL = randomRpc[DEAFAULT_CHAINID][0];

// add 10%
export function calculateGasMargin(
    value: BigNumber | number | string,
    margin = 1000,
): BigNumber {
    return BigNumber.from(value)
        .mul(BigNumber.from(10000).add(BigNumber.from(margin)))
        .div(BigNumber.from(10000));
}
