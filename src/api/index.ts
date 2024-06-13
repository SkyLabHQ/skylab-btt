import axios from "axios";

export const api = axios.create({
    baseURL:
        process.env.NODE_ENV == "production"
            ? "http://118.139.164.191:3333"
            : "http://localhost:3333",
});

export const login = async (data: any) => {
    const response = await api.post("/login", data);
    return response.data;
};
