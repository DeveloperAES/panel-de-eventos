import axiosClient from "./axiosClient";

export const obtenerMisEventos = () => axiosClient.get("/eventos/mis-eventos");
