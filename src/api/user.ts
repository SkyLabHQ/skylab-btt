import api from ".";

export const getUserTgInfo = async () => {
    const response = await api.get("/user/userTgInfo");
    return response.data;
};

export const bindTelegram = async (data: {
    telegramUserId: string;
    address: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    photoUrl?: string;
}) => {
    const response = await api.post("/user/bindTelegram", data);
    return response.data;
};
