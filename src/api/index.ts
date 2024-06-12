import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3333",
});

export const login = async (data: any) => {
    const response = await api.post("/login", data);
    return response.data;
};
