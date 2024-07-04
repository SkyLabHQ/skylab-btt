import { ethers } from "ethers";
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { CHAINS } from "@/skyConstants/chains";

export const BOT_KEYS = "botPrivateKey";

export const PLANE_KEYS = "tactoePrivateKey";

export const PVP_KEYS = "pvpPrivateKeys";

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

export const getBotGameSigner = (storageKey: string) => {
    if (!storageKey) {
        return null;
    }
    let stringPrivateKey = localStorage.getItem(BOT_KEYS);
    let objPrivateKey;
    try {
        objPrivateKey = stringPrivateKey ? JSON.parse(stringPrivateKey) : {};
    } catch (e) {
        objPrivateKey = {};
    }
    if (!objPrivateKey[storageKey]) {
        // 随机创建一个私钥账户
        return null;
    }
    const account = new ethers.Wallet(objPrivateKey[storageKey]);
    return account;
};

export const saveBotGamePrivateKey = (tokenId: number, privateKey: string) => {
    if (!tokenId || !privateKey) return;

    let stringPrivateKey = localStorage.getItem(BOT_KEYS);
    let objPrivateKey;
    try {
        objPrivateKey = stringPrivateKey ? JSON.parse(stringPrivateKey) : {};
    } catch (e) {
        objPrivateKey = {};
    }
    const key = tokenId;
    objPrivateKey[key] = privateKey;
    localStorage.setItem(BOT_KEYS, JSON.stringify(objPrivateKey));
};

export const getPlaneGameSigner = (tokenId: number) => {
    if (!tokenId) {
        return null;
    }
    let stringPrivateKey = localStorage.getItem(PLANE_KEYS);
    let objPrivateKey;
    try {
        objPrivateKey = stringPrivateKey ? JSON.parse(stringPrivateKey) : {};
    } catch (e) {
        objPrivateKey = {};
    }
    const key = tokenId;
    if (!objPrivateKey[key]) {
        // 随机创建一个私钥账户
        return null;
    }
    const account = new ethers.Wallet(objPrivateKey[key]);
    return account;
};

export const savePlaneGamePrivateKey = (
    tokenId: number,
    privateKey: string,
) => {
    if (!tokenId || !privateKey) return;

    let stringPrivateKey = localStorage.getItem(PLANE_KEYS);
    let objPrivateKey;
    try {
        objPrivateKey = stringPrivateKey ? JSON.parse(stringPrivateKey) : {};
    } catch (e) {
        objPrivateKey = {};
    }
    const key = tokenId;
    objPrivateKey[key] = privateKey;
    localStorage.setItem(PLANE_KEYS, JSON.stringify(objPrivateKey));
};

export const getPvpGameSigner = (gameAddress: string) => {
    if (!gameAddress) {
        return null;
    }
    let stringPrivateKey = localStorage.getItem(PVP_KEYS);
    let objPrivateKey;
    try {
        objPrivateKey = stringPrivateKey ? JSON.parse(stringPrivateKey) : {};
    } catch (e) {
        objPrivateKey = {};
    }
    if (!objPrivateKey[gameAddress]) {
        // 随机创建一个私钥账户
        return null;
    }
    const account = new ethers.Wallet(objPrivateKey[gameAddress]);
    return account;
};

export const savePvpGamePrivateKey = (
    gameAddress: string,
    privateKey: string,
) => {
    if (!gameAddress || !privateKey) return;

    let stringPrivateKey = localStorage.getItem(PVP_KEYS);
    let objPrivateKey;
    try {
        objPrivateKey = stringPrivateKey ? JSON.parse(stringPrivateKey) : {};
    } catch (e) {
        objPrivateKey = {};
    }
    objPrivateKey[gameAddress] = privateKey;
    localStorage.setItem(PVP_KEYS, JSON.stringify(objPrivateKey));
};
