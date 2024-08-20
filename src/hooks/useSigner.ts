import { ethers } from "ethers";

export const BOT_KEYS = "botPrivateKey";

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
