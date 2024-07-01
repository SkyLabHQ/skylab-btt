import { ethers } from "ethers";
import { useMemo } from "react";
import { useChainId } from "wagmi";
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { CHAINS } from "@/skyConstants/chains";
import { TESTFLIGHT_CHAINID } from "@/utils/web3Utils";

export const useTacToeSigner = (tokenId: number): [any] => {
    const chainId = useChainId();
    const singer = useMemo(() => {
        if (!tokenId || !chainId) {
            return null;
        }
        let stringPrivateKey = localStorage.getItem("tactoePrivateKey");
        let objPrivateKey;
        try {
            objPrivateKey = stringPrivateKey
                ? JSON.parse(stringPrivateKey)
                : {};
        } catch (e) {
            objPrivateKey = {};
        }
        const key = chainId + "-" + tokenId;

        if (!objPrivateKey[key]) {
            // 随机创建一个私钥账户
            const randomAccount = ethers.Wallet.createRandom();
            objPrivateKey[key] = randomAccount.privateKey;
            localStorage.setItem(
                "tactoePrivateKey",
                JSON.stringify(objPrivateKey),
            );
        }
        const account = privateKeyToAccount(objPrivateKey[key]);

        const client = createWalletClient({
            account,
            chain: CHAINS.find((item) => {
                return item.id === chainId;
            }),
            transport: http(),
        });
        return { ...client, privateKey: objPrivateKey[key] };
    }, [tokenId, chainId]);

    return [singer];
};

export const getDefaultWithProvider = (tokenId: number, chainId: number) => {
    if (!tokenId || !chainId) {
        return null;
    }
    let stringPrivateKey = localStorage.getItem("tactoePrivateKey");

    let objPrivateKey;
    try {
        objPrivateKey = stringPrivateKey ? JSON.parse(stringPrivateKey) : {};
    } catch (e) {
        objPrivateKey = {};
    }
    const key = chainId + "-" + tokenId;

    if (!objPrivateKey[key]) {
        // 随机创建一个私钥账户
        const randomAccount = ethers.Wallet.createRandom();
        objPrivateKey[key] = randomAccount.privateKey;
        localStorage.setItem("tactoePrivateKey", JSON.stringify(objPrivateKey));
    }
    const account = privateKeyToAccount(objPrivateKey[key] as any);

    const client = createWalletClient({
        account,
        chain: CHAINS.find((item) => {
            return item.id === chainId;
        }),
        transport: http(),
    });
    return { ...client, privateKey: objPrivateKey[key] };
};

export const getTestflightSigner = (useNew?: boolean) => {
    let stringPrivateKey = sessionStorage.getItem("testflight");
    if (!stringPrivateKey || useNew) {
        const randomPrivateKey = ethers.Wallet.createRandom().privateKey;
        stringPrivateKey = randomPrivateKey;
    }
    sessionStorage.setItem("testflight", stringPrivateKey);
    const account = privateKeyToAccount(stringPrivateKey as any);

    const client = createWalletClient({
        account,
        chain: CHAINS.find((item) => {
            return item.id === TESTFLIGHT_CHAINID;
        }),
        transport: http(),
    });

    return { ...client, privateKey: stringPrivateKey };
};
