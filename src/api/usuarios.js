import axiosClient from "./axiosClient";

export const registrarInvitadoEspecial = (data) => {
  return axiosClient.post("/registros/registrar-invitado-especial", data);
};
