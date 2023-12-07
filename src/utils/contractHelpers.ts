import {
    Abi,
    Address,
    PublicClient,
    WalletClient,
    getContract as viemGetContract,
} from "viem";
import { ChainId } from "./web3Utils";
import { viemClients } from "./viem";

export const getContract = <
    TAbi extends Abi | unknown[],
    TWalletClient extends WalletClient,
>({
    abi,
    address,
    chainId = ChainId.BASE,
    publicClient,
    signer,
}: {
    abi: TAbi;
    address: Address;
    chainId?: ChainId;
    signer?: TWalletClient;
    publicClient?: PublicClient;
}) => {
    // @ts-ignore
    const c = viemGetContract({
        abi,
        address,
        // TODO: Fix viem
        // @ts-ignore
        publicClient: publicClient ?? viemClients[chainId],
        // TODO: Fix viem
        // @ts-ignore
        walletClient: signer,
    });
    return {
        ...c,
        account: signer?.account,
        chain: signer?.chain,
    };
};
