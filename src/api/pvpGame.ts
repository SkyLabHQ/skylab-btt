import api from "./index";

export const login = async (initData: any) => {
    const response = await api.post("/login", initData);
    return response.data;
};

export const startGame = async () => {
    const response = await api.post("/startGame", {});
    return response.data;
};

export const joinGame = async (data: { gameId: number }) => {
    const response = await api.post("/joinGame", data);
    return response.data;
};

export const bid = async (data: { gameId: number; amount: number }) => {
    const response = await api.post("/bid", data);
    return response.data;
};

export const quitMatch = async (data: { gameId: number }) => {
    const response = await api.post("/quitMatch", data);
    return response.data;
};

export const surrender = async (data: { gameId: number }) => {
    const response = await api.post("/surrender", data);
    return response.data;
};

export const getPoint = async () => {
    const response = await api.get(`/point`);
    return response.data;
};

export const getGameInfo = async (gameId: number) => {
    const response = await api.get(`/gameInfo?gameId=${gameId}`);
    return response.data;
};
