import axios from "axios";

export const api = axios.create({
    baseURL:
        process.env.NODE_ENV == "production"
            ? "https://richer.social"
            : "http://localhost:3333",
});

export const login = async (initData: any) => {
    const response = await api.post("/login", initData);
    return response.data;
};

export const bindBurner = async (data: any) => {
    const response = await api.post("/bindBurner", data);
    return response.data;
};

export default api;
