import { ChainId } from "@/utils/web3Utils";

export const PUBLIC_NODES = {
    [ChainId.ETHEREUM]: [
        "https://eth.llamarpc.com",
        "https://rpc.ankr.com/eth",
    ],
    [ChainId.POLYGON]: [
        "https://rpc.ankr.com/polygon",
        "https://polygon.llamarpc.com",
    ],
    [ChainId.MUMBAI]: ["https://polygon-mumbai.blockpi.network/v1/rpc/public"],
    [ChainId.SEPOLIA]: [
        "https://base-sepolia.g.alchemy.com/v2/Po63cIaqf7U_j1Q7Z0mUB3lOwaF8Sn3D",
    ],
    [ChainId.BASE]: ["https://base.llamarpc.com"],
};
