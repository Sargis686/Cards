import axios from "axios";

const api  = axios.create({
  baseURL: "https://test-task-api.allfuneral.com",
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = token;  
         }
    return config;
  },
    (error) => Promise.reject(error)

);

export default api ; 