// components/ModalInvitadoEspecial.jsx
import { useState } from "react";
import { registrarInvitadoEspecial } from "../../api/usuarios";

import toast from "react-hot-toast";

export default function ModalInvitadoEspecial({ eventoId, onClose, onSuccess }) {
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    correo_corporativo: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registrarInvitadoEspecial({
        evento_id: eventoId,
        ...form,
      });

      toast.success("Invitado registrado correctamente");
      onSuccess(); // Recargar tabla
      onClose();   // Cerrar modal

    } catch (err) {
      toast.error("Error al registrar invitado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md relative">
        <h2 className="text-lg font-semibold mb-4">Registrar invitado especial</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="nombres"
            placeholder="Nombres"
            className="border px-3 py-2 rounded"
            value={form.nombres}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="apellidos"
            placeholder="Apellidos"
            className="border px-3 py-2 rounded"
            value={form.apellidos}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="correo_corporativo"
            placeholder="Correo corporativo"
            className="border px-3 py-2 rounded"
            value={form.correo_corporativo}
            onChange={handleChange}
            required
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700"
            >
              {loading ? "Registrando..." : "Registrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
