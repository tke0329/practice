import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:8081/api",
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 5000,
    withCredentials: true
});
let isRefreshing = false;
let refreshQueue: Array<() => void> = [];

const processQueue = () => {
    refreshQueue.forEach(cb => cb());
    refreshQueue = [];
};

client.interceptors.response.use(
    (res) => res,
    async (err) => {
        const original = err.config;

        if (err.response?.status === 401 && !original._retry) {
            original._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    await client.post("/user/refresh");
                    processQueue();
                } catch (e) {
                    refreshQueue = [];
                    return Promise.reject(e);
                } finally {
                    isRefreshing = false;
                }
            }

            return new Promise((resolve) => {
                refreshQueue.push(() => resolve(client(original)));
            });
        }

        return Promise.reject(err);
    }
);

export default client;