import axiosClient from "./axiosClient";

export const obtenerMisEventos = () => axiosClient.get("/eventos/mis-eventos");


export const ingresarAlEventoPorQR = (data) => {
  return axiosClient.post("/registros/ingresarAlEventoPorQR", data);
};