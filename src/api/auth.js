import axiosClient from "./axiosClient";

export const loginAdminRequest = (data) => axiosClient.post("/admins/login", data);

export const obtenerMisEventos = (data) => axiosClient.get("/admins/mis-eventos", data);


export const obtenerUsuariosPorEvento = (eventoId, params = {}) => {
  return axiosClient.get(`/usuarios/evento/${eventoId}`, { params });
};




export const confirmarRegistro = (id) => {
  return axiosClient.put(`/registros/${id}/confirmar`);
};
