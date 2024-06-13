import { ethers } from "ethers";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { useChainId } from "wagmi";
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { CHAINS } from "@/skyConstants/chains";

export const useTacToeSigner = (
    tokenId: number,
    propTestflight: boolean = false,
): [any] => {
    const chainId = useChainId();
    const { search } = useLocation();

    const params = qs.parse(search) as any;
    const istest = propTestflight
        ? propTestflight
        : params.testflight === "true";
    const singer = useMemo(() => {
        if (!tokenId || !chainId) {
            return null;
        }
        let stringPrivateKey = istest
            ? sessionStorage.getItem("testflightPrivateKey")
            : localStorage.getItem("tactoePrivateKey");
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
            istest
                ? sessionStorage.setItem(
                      "testflightPrivateKey",
                      JSON.stringify(objPrivateKey),
                  )
                : localStorage.setItem(
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
export const getTestflightWithProvider = (tokenId: number, chainId: number) => {
    if (!tokenId || !chainId) {
        return null;
    }
    let stringPrivateKey = sessionStorage.getItem("testflightPrivateKey");

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
        sessionStorage.setItem(
            "testflightPrivateKey",
            JSON.stringify(objPrivateKey),
        );
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

export const getTestflightSigner = (chainId: number, useNew?: boolean) => {
    if (!chainId) {
        return null;
    }

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
            return item.id === chainId;
        }),
        transport: http(),
    });

    return { ...client, privateKey: stringPrivateKey };
};
