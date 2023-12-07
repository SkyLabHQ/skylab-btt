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
    [ChainId.BASEGOERLI]: ["https://goerli.base.org"],
    [ChainId.BASE]: ["https://base.llamarpc.com"],
};
