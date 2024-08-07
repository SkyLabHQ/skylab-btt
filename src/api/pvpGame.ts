import api from "./index";

export const login = async (initData: any) => {
    const response = await api.post("/pvp/login", initData);
    return response.data;
};

export const startGame = async () => {
    const response = await api.post("/pvp/startGame", {});
    return response.data;
};

export const joinGame = async (data: { gameId: number }) => {
    const response = await api.post("/pvp/joinGame", data);
    return response.data;
};

export const bid = async (data: { gameId: number; amount: number }) => {
    const response = await api.post("/pvp/bid", data);
    return response.data;
};

export const quitMatch = async (data: { gameId: number }) => {
    const response = await api.post("/pvp/quitMatch", data);
    return response.data;
};

export const surrender = async (data: { gameId: number }) => {
    const response = await api.post("/pvp/surrender", data);
    return response.data;
};

export const getPoint = async () => {
    const response = await api.get(`/pvp/point`);
    return response.data;
};

export const getGameInfo = async (gameId: number) => {
    const response = await api.get(`/pvp/gameInfo?gameId=${gameId}`);
    return response.data;
};
