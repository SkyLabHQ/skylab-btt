import api from "./index";

export const tournamentLogin = async () => {
    const response = await api.post("/tournament/login");
    return response.data;
};

export const updateUserInfo = async () => {
    const response = await api.post("/tournament/updateUserInfo");
    return response.data;
};

export const storeAccessToken = async () => {
    const response = await api.post("/tournament/storeAccessToken");
    return response.data;
};

export const getTokensGame = async (data: { tokens: string[] }) => {
    const response = await api.post("/tournament/getTokensGame", data);
    return response.data;
};

export const startGame = async (data: { tokenId: number }) => {
    const response = await api.post("/tournament/startGame", data);
    return response.data;
};

export const joinGame = async (data: { gameId: number }) => {
    const response = await api.post("/tournament/joinGame", data);
    return response.data;
};

export const bid = async (data: { gameId: number; amount: number }) => {
    const response = await api.post("/tournament/bid", data);
    return response.data;
};

// 退出匹配
export const quitMatch = async (data: { gameId: number }) => {
    const response = await api.post("/tournament/quitMatch", data);
    return response.data;
};

// 投降
export const surrender = async (data: { gameId: number }) => {
    const response = await api.post("/tournament/surrender", data);
    return response.data;
};

// 获取游戏信息
export const getGameInfo = async (gameId: number) => {
    const response = await api.get(`/tournament/gameInfo?gameId=${gameId}`);
    return response.data;
};

// 获取mint的签名
export const getMintSignature = async (
    referral: string,
    expirationTime: number,
) => {
    const response = await api.get(
        `/tournament/mintSignature?referral=${referral}&expirationTime=${expirationTime}`,
    );
    return response.data;
};
