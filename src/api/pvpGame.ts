import api from "./index";

export const login = async (initData: any) => {
    const response = await api.post("/login", initData);
    return response.data;
};

export const startGame = async () => {
    const jwtToken = sessionStorage.getItem("jwtToken");
    const response = await api.post(
        "/startGame",
        {},
        {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        },
    );
    return response.data;
};

export const joinGame = async (data: { gameId: number }) => {
    const jwtToken = sessionStorage.getItem("jwtToken");
    const response = await api.post("/joinGame", data, {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
    });
    return response.data;
};

export const bid = async (data: { gameId: number; amount: number }) => {
    const jwtToken = sessionStorage.getItem("jwtToken");
    const response = await api.post("/bid", data, {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
    });
    return response.data;
};

export const quitMatch = async (data: { gameId: number }) => {
    const jwtToken = sessionStorage.getItem("jwtToken");
    const response = await api.post("/quitMatch", data, {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
    });
    return response.data;
};

export const getGameInfo = async (gameId: number) => {
    const jwtToken = sessionStorage.getItem("jwtToken");
    const response = await api.get(`/gameInfo?gameId=${gameId}`, {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
    });
    return response.data;
};
