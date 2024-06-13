import axios from "axios";

export const api = axios.create({
    baseURL:
        process.env.NODE_ENV == "production"
            ? "https://richer.social"
            : "http://localhost:3333",
});

export const login = async (data: any) => {
    const response = await api.post("/login", data);
    return response.data;
};
