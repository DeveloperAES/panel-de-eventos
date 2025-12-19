import { useState } from "react";
import { registrarInvitadoEspecial } from "../../api/usuarios";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import toast from "react-hot-toast";

export default function ModalInvitadoEspecial({ eventoId, onClose, onSuccess }) {
  const [form, setForm] = useState({
    dni: "",
    nombres: "",
    apellidos: "",
    correo_corporativo: "",
    telefono: "",
    empresa: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const clearField = (field) => {
    setForm((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.nombres.trim()) newErrors.nombres = "El nombre es obligatorio.";
    if (!form.apellidos.trim()) newErrors.apellidos = "El apellido es obligatorio.";
    if (!form.dni.trim()) newErrors.dni = "El DNI es obligatorio.";

    if (!form.correo_corporativo.trim()) {
      newErrors.correo_corporativo = "El correo es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo_corporativo)) {
      newErrors.correo_corporativo = "El formato del correo no es válido.";
    }

    if (!form.telefono) {
      newErrors.telefono = "El número de teléfono es obligatorio.";
    } else if (!isValidPhoneNumber(form.telefono)) {
      newErrors.telefono = "El número de teléfono no es válido.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await registrarInvitadoEspecial({
        evento_id: eventoId,
        ...form,
      });

      toast.success("Invitado registrado correctamente");
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Error al registrar invitado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full  max-w-xl relative">
        <h2 className="text-2xl font-semibold mb-4">Registrar invitado especial</h2>

        <form onSubmit={handleSubmit} className="registro-form">
          {/* Nombres y Apellidos */}
          {["nombres", "apellidos"].map((name) => (
            <div key={name} className="input-group">
              <label>{name === "nombres" ? "Nombres" : "Apellidos"}</label>
              <div className={`input-wrapper ${errors[name] ? "input-error" : ""}`}>
                <input
                  type="text"
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                />
                {form[name] && (
                  <button
                    type="button"
                    className="clear-btn"
                    onClick={() => clearField(name)}
                  >
                    ✕
                  </button>
                )}
              </div>
              {errors[name] && <p className="error-message">{errors[name]}</p>}
            </div>
          ))}

          {/* Correo */}
          <div className="input-group">
            <label>Correo Corporativo</label>
            <div className={`input-wrapper ${errors.correo_corporativo ? "input-error" : ""}`}>
              <input
                type="email"
                name="correo_corporativo"
                value={form.correo_corporativo}
                onChange={handleChange}
              />
              {form.correo_corporativo && (
                <button
                  type="button"
                  className="clear-btn"
                  onClick={() => clearField("correo_corporativo")}
                >
                  ✕
                </button>
              )}
            </div>
            {errors.correo_corporativo && (
              <p className="error-message">{errors.correo_corporativo}</p>
            )}
          </div>

          {/* DNI + Teléfono */}
          <div className="flex-row">
            <div className="input-group flex-item">
              <label>DNI</label>
              <div className={`input-wrapper ${errors.dni ? "input-error" : ""}`}>
                <input
                  type="text"
                  name="dni"
                  value={form.dni}
                  onChange={handleChange}
                />
                {form.dni && (
                  <button
                    type="button"
                    className="clear-btn"
                    onClick={() => clearField("dni")}
                  >
                    ✕
                  </button>
                )}
              </div>
              {errors.dni && <p className="error-message">{errors.dni}</p>}
            </div>

            <div className="input-group flex-item">
              <label>Celular</label>
              <div className={`input-wrapper ${errors.telefono ? "input-error" : ""}`}>
                <PhoneInput
                  international
                  defaultCountry="PE"
                  value={form.telefono}
                  onChange={(value) =>
                    setForm((prev) => ({ ...prev, telefono: value || "" }))
                  }
                  className="phone-number-input"
                />
              </div>
              {errors.telefono && <p className="error-message">{errors.telefono}</p>}
            </div>
          </div>

          {/* Empresa */}
          <div className="input-group">
            <label>Empresa</label>
            <div className="input-wrapper">
              <input
                type="text"
                name="empresa"
                value={form.empresa}
                onChange={handleChange}
              />
              {form.empresa && (
                <button
                  type="button"
                  className="clear-btn"
                  onClick={() => clearField("empresa")}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2  md:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-cancelar w-full flex-1"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="btn btn-registrarse  w-full flex-1"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}
