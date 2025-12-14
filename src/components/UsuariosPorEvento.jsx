import { useEffect, useState, useContext } from "react";
import { obtenerUsuariosPorEvento } from "../api/auth";
import axiosClient from "../api/axiosClient";
import toast from "react-hot-toast";
import UsuarioRow from "./UsuarioRow";
import ModalInvitadoEspecial from "../components/modals/ModalInvitadoEspecial";
import LectorQR from "./ui/LectorQR";
import { AuthContext } from "../context/AuthContext";

import { FileSpreadsheet, ArrowDownToLine, CirclePlus, QrCode } from "lucide-react";

export default function UsuariosPorEvento({ eventoId }) {
  const { admin } = useContext(AuthContext);
  console.log(admin);
  const [usuarios, setUsuarios] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalQRAbierto, setModalQRAbierto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eventName, setEventName] = useState("");

  //  Filtros
  const [filtros, setFiltros] = useState({
    search: "",
    estado: "",
    page: 1,
    limit: 15,
  });

  const [totalPaginas, setTotalPaginas] = useState(1);
  const [confirmandoId, setConfirmandoId] = useState(null);

  useEffect(() => {
    if (!eventoId) return;

    cargarUsuarios();
  }, [eventoId, filtros]);

  const cargarUsuarios = async () => {
    try {
      setLoading(true);

      const params = {
        page: filtros.page,
        limit: filtros.limit,
      };

      if (filtros.search.trim()) {
        params.nombre = filtros.search;
        params.correo = filtros.search;
      }

      if (filtros.estado) {
        params.estado = filtros.estado;
      }

      const { data } = await obtenerUsuariosPorEvento(eventoId, params);

      setUsuarios(data.usuarios);
      console.log(data.usuarios)
      setTotalPaginas(data.totalPages);
      setEventName(data.eventName)
    } catch (err) {
      toast.error("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  // ✔ Confirma un registro y recarga tabla
  const confirmarRegistro = async (id) => {
    try {
      setConfirmandoId(id);
      await axiosClient.put(`/registros/${id}/confirmar`);
      toast.success("Registro confirmado");

      cargarUsuarios(); // recargar con filtros

    } catch {
      toast.error("Error al confirmar");
    } finally {
      setConfirmandoId(null);
    }
  };


  // Exportar CVS
  const exportarCSV = () => {
    if (usuarios.length === 0)
      return toast.error("No hay registros para exportar");

    const headers = [
      "ID Registro",
      "Nombres",
      "Apellidos",
      "Correo",
      "Estado",
      "Empresa",
    ];

    const rows = usuarios.map((u) => [
      u.registroId,
      u.nombres,
      u.apellidos,
      u.correo_corporativo,
      u.estado,
      u.empresa,
    ]);

    const csv =
      headers.join(",") +
      "\n" +
      rows.map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `usuarios_evento_${eventoId}.csv`;
    a.click();
  };

  return (
    <div className="w-full flex flex-col gap-4  overflow-hidden p-4 md:ml-24">
      <div className="w-full flex flex-col justify-between gap-3 md:flex-row">
        <h3 className="mb-4 font-semibold text-lg">
          Usuarios del evento <span className="hidden">{eventoId}</span> <span>
            {eventName}
          </span>
        </h3>

        <div className="flex gap-2 w-fit ">
          <button
            onClick={exportarCSV}
            className="w-full flex  items-center gap-2 px-4 py-2 border border-emerald-600 text-emerald-600 rounded hover:bg-emerald-600 hover:text-white md:w-fit"
          >
            <ArrowDownToLine size={20} />
            Exportar CSV
          </button>
          <button
            onClick={() => setModalAbierto(true)}
            className="w-full flex items-center gap-2 px-4 py-2 border border-emerald-600 text-emerald-600 rounded hover:bg-emerald-600 hover:text-white md:w-fit"
          >
            <CirclePlus size={20} />
            Agregar
          </button>

          <button
            onClick={() => setModalQRAbierto(true)}
            className="w-full flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 md:w-fit"
          >
            <QrCode size={20}   />
            Escanear QR
          </button>
        </div>

        {modalAbierto && (
          <ModalInvitadoEspecial
            eventoId={eventoId}
            onClose={() => setModalAbierto(false)}
            onSuccess={cargarUsuarios}
          />
        )}

        <LectorQR
          idUsuarioAdministrador={admin?.id}
          idEvento={eventoId}
          isOpen={modalQRAbierto}
          onClose={() => setModalQRAbierto(false)}
          onSuccess={cargarUsuarios}
        />
      </div>


      {/* 🔍 Filtros */}
      <div className="flex justify-between items-center flex-wrap gap-3 w-full px-4 py-2 bg-white border border-[rgba(74, 68, 88, 0.25)] rounded-xl ">
        <div className="flex flex-wrap gap-3 justify-start items-center md:flex-nowrap">
          <input
            type="text"
            placeholder="Buscar nombre"
            className="border px-3 py-2 rounded w-full max-w-sm"
            value={filtros.search}
            onChange={(e) =>
              setFiltros((f) => ({ ...f, search: e.target.value, page: 1 }))
            }
          />

          <select
            className="border  px-3 py-2 rounded w-full max-w-sm"
            value={filtros.estado}
            onChange={(e) =>
              setFiltros((f) => ({ ...f, estado: e.target.value, page: 1 }))
            }
          >
            <option value="">Todos los estados</option>
            <option value="registrado">Registrado</option>
            <option value="confirmado">Confirmado</option>
            <option value="asistio">Asistió</option>
          </select>
        </div>




      </div>

      {/* TABLA */}
      {loading ? (
        <p>Cargando...</p>
      ) : usuarios.length === 0 ? (
        <p>No hay usuarios para mostrar</p>
      ) : (
        <div className="wrapper-table overflow-x-auto h-full border border-[#CAC4D0] rounded-xl">
          <table className="tableUsers min-w-full bg-white border">
            <thead>
              <tr>
                <th className="border-0 border-b border-[#CAC4D0] px-4 py-2">Nombre</th>
                <th className="border-0 border-b border-[#CAC4D0] px-4 py-2">Apellidos</th>
                <th className="border-0 border-b border-[#CAC4D0] px-4 py-2">Correo</th>


                <th className="border-0 border-b border-[#CAC4D0] px-4 py-2">Empresa</th>
                <th className="border-0 border-b border-[#CAC4D0] px-4 py-2">Fech de <br /> Registro</th>
                <th className="border-0 border-b  border-[#CAC4D0] px-4 py-2">Fecha de <br /> Confirmación</th>
                <th className="border-0 border-b border-[#CAC4D0] px-4 py-2">Hora de <br />asistencia</th>
                <th className="border-0 border-b border-[#CAC4D0] px-4 py-2">Hora de salida</th>
                <th className="border-0 border-b  border-[#CAC4D0] border-l px-4 py-2 bg-white sticky right-0 z-20">
                  Estado
                </th>
                {/* <th className="border px-4 py-2">Acciones</th> */}
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <UsuarioRow
                  key={u.registroId}
                  usuario={u}
                  confirmandoId={confirmandoId}
                  onConfirmar={confirmarRegistro}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PAGINACIÓN */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          disabled={filtros.page === 1}
          onClick={() =>
            setFiltros((f) => ({ ...f, page: f.page - 1 }))
          }
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          ← Anterior
        </button>

        <span>Página {filtros.page} de {totalPaginas}</span>

        <button
          disabled={filtros.page >= totalPaginas}
          onClick={() =>
            setFiltros((f) => ({ ...f, page: f.page + 1 }))
          }
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
