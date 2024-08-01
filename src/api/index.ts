import axios from "axios";

export const api = axios.create({
    baseURL:
        process.env.NODE_ENV == "production"
            ? "https://richer.social"
            : "http://localhost:3333",
});

api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("jwtToken");

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

export const login = async (initData: any) => {
    const response = await api.post("/login", initData);
    return response.data;
};

export const bindBurner = async (data: any) => {
    const response = await api.post("/bindBurner", data);
    return response.data;
};

export default api;
