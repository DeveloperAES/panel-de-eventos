//# Config global de Axios

import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://eventosbooomapi-aub8evccgse4aye8.eastus-01.azurewebsites.net/api",
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClient;
