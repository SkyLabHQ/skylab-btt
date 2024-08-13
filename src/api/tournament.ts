import api from "./index";

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

export const quitMatch = async (data: { gameId: number }) => {
    const response = await api.post("/tournament/quitMatch", data);
    return response.data;
};

export const surrender = async (data: { gameId: number }) => {
    const response = await api.post("/tournament/surrender", data);
    return response.data;
};

export const getGameInfo = async (gameId: number) => {
    const response = await api.get(`/tournament/gameInfo?gameId=${gameId}`);
    return response.data;
};
