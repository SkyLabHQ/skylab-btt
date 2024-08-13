import axios from "axios";

export const api = axios.create({
    baseURL:
        process.env.NODE_ENV == "production"
            ? "https://richer.social"
            : "http://localhost:3333",
});

api.interceptors.request.use(
    (config) => {
        let token = "";
        if (config.url.startsWith("/pvp")) {
            token = sessionStorage.getItem("jwtToken");
        } else if (config.url.startsWith("/tournament")) {
            token = localStorage.getItem("privy:token");
            if (token) {
                token = token.replace(/\"/g, "");
            }
        }
        token && (config.headers.Authorization = `Bearer ${token}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
        }
        return Promise.reject(error);
    },
);

export const bindBurner = async (data: any) => {
    const response = await api.post("/bindBurner", data);
    return response.data;
};

export default api;
