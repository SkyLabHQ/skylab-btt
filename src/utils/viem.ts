import { ChainId } from "./web3Utils";
import { CHAINS } from "@/skyConstants/chains";
import { PUBLIC_NODES } from "@/skyConstants/nodes";
import { createPublicClient, http, fallback, PublicClient } from "viem";

console.log(ChainId, "ChainId");
export const viemClients = CHAINS.reduce((prev, cur) => {
    return {
        ...prev,
        [cur.id]: createPublicClient({
            chain: cur,
            transport: fallback(
                (PUBLIC_NODES[cur.id] as string[]).map((url) =>
                    http(url, {
                        timeout: 10_000,
                    }),
                ),
                {
                    rank: false,
                },
            ),
        }),
    };
}, {} as Record<ChainId, PublicClient>);

export const getViemClients = ({
    chainId,
}: {
    chainId?: ChainId;
}): PublicClient | undefined => {
    return viemClients[chainId as ChainId];
};
