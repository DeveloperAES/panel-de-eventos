import { Check, Loader2, Printer, X, ExternalLink } from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
import TicketHTML from "../components/ui/TicketHTML";

export default function UsuarioRow({ usuario, confirmandoId, onConfirmar }) {
  const {
    registroId,
    nombres,
    apellidos,
    correo_corporativo,
    estado,
    empresa,
    fecha_registro,
    fecha_confirmacion,
    fecha_asistencia,
    fecha_salida,
    porcentaje_participacion_evento,
  } = usuario;

  const [descargando, setDescargando] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  const ticketRef = useRef(null);
  const iframeRef = useRef(null);

  // Limpieza del blobUrl anterior (evita memory leaks)
  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  const cerrarViewer = () => {
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfUrl(null);
  };

  const descargarPDF = async () => {
    if (descargando) return;

    const toastId = toast.loading("Generando ticket...");

    try {
      setDescargando(true);

      const element = ticketRef.current;
      if (!element) throw new Error("Ticket no encontrado");

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      // Ticket tipo “térmico” (ajusta si quieres)
      const pdfWidthMm = 80; // ancho “ticket”
      const pdfHeightMm = (canvas.height * pdfWidthMm) / canvas.width;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [pdfWidthMm, pdfHeightMm],
      });

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidthMm, pdfHeightMm);

      // Generamos URL en memoria (viewer)
      const blobUrl = pdf.output("bloburl");

      // Si había uno anterior, lo liberamos
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);

      setPdfUrl(blobUrl);

      toast.success("Ticket generado", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Error al generar el PDF", { id: toastId });
    } finally {
      setDescargando(false);
    }
  };

  const imprimirPDF = () => {
    try {
      const iframe = iframeRef.current;
      const win = iframe?.contentWindow;

      // En algunos iOS/Safari el print() puede fallar si no es “user gesture” o por políticas
      win?.focus();
      win?.print();

      // Fallback: si no existe contentWindow, abrir en nueva pestaña
      if (!win && pdfUrl) window.open(pdfUrl, "_blank", "noopener,noreferrer");
    } catch (e) {
      // Fallback seguro
      if (pdfUrl) window.open(pdfUrl, "_blank", "noopener,noreferrer");
    }
  };

  const abrirEnOtraPestana = () => {
    if (pdfUrl) window.open(pdfUrl, "_blank", "noopener,noreferrer");
  };

  function formatearFecha(fecha) {
    if (!fecha) return "";
    const d = new Date(fecha);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleString("es-PE", { dateStyle: "medium", timeStyle: "short" });
  }

  function formatearFechaHora(fecha) {
    if (!fecha) return "";
    const d = new Date(fecha);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  return (
    <Fragment>
      <tr className="hover:bg-gray-100">
        <td className="border-0 border-b border-[#CAC4D0] px-4 py-2">{nombres}</td>
        <td className="border-0 border-b border-[#CAC4D0] px-4 py-2">{apellidos}</td>
        <td className="border-0 border-b border-[#CAC4D0] px-4 py-2">{correo_corporativo}</td>
        <td className="border-0 border-b border-[#CAC4D0] px-4 py-2">{empresa}</td>
        <td className="border-0 border-b border-[#CAC4D0] px-4 py-2">{formatearFecha(fecha_registro)}</td>
        <td className="border-0 border-b border-[#CAC4D0] px-4 py-2">{formatearFecha(fecha_confirmacion)}</td>
        <td className="border-0 border-b border-[#CAC4D0] px-4 py-2">{formatearFechaHora(fecha_asistencia)}</td>
        <td className="border-0 border-b border-[#CAC4D0] px-4 py-2">{formatearFechaHora(fecha_salida)}</td>
        <td className="border-0 border-b border-[#CAC4D0] px-4 py-2">
          {porcentaje_participacion_evento !== null ? `${porcentaje_participacion_evento}%` : "-"}
        </td>

        <td className="border-0 border-b border-l border-[#CAC4D0] px-4 py-2 bg-white sticky right-0 z-10">
          {estado === "registrado" ? (
            <select
              className="border-0 px-2 py-1 rounded bg-[#EBFFEE]"
              onChange={(e) => {
                if (e.target.value === "confirmado") onConfirmar(registroId);
              }}
            >
              <option value="registrado">Registrado</option>
              <option value="confirmado">Confirmar →</option>
            </select>
          ) : (
            <div className="flex gap-2 items-center">
              <span
                className={`font-semibold capitalize flex justify-center flex-1 text-center rounded-[0.375rem] p-2 ${
                  estado === "asistio" ? "bg-[#14AE5C] text-white" : "bg-[#CFF7D3]"
                }`}
              >
                {estado}
              </span>

              <button
                onClick={descargarPDF}
                disabled={descargando}
                className="flex items-center gap-2 text-[#49454F] hover:text-[#14AE5C] disabled:opacity-50"
                title="Ver/Imprimir ticket"
              >
                {descargando ? <Loader2 className="w-4 h-4 animate-spin" /> : <Printer />}
              </button>
            </div>
          )}
        </td>
      </tr>

      {/* ROW para el viewer (se muestra solo cuando pdfUrl existe) */}
      {pdfUrl && (
        <tr className="bg-white">
          {/* Ajusta colSpan al número total de columnas reales de tu tabla */}
          <td colSpan={11} className="border-0 border-b border-[#CAC4D0] px-4 py-3">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="font-medium text-sm text-[#49454F]">
                Vista previa: Ticket_{nombres}_{apellidos}.pdf
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={imprimirPDF}
                  className="px-3 py-1 rounded bg-[#14AE5C] text-white hover:opacity-90 flex items-center gap-2"
                  title="Imprimir"
                >
                  <Printer className="w-4 h-4" />
                  Imprimir
                </button>

                <button
                  onClick={abrirEnOtraPestana}
                  className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 flex items-center gap-2"
                  title="Abrir en otra pestaña (útil en iOS)"
                >
                  <ExternalLink className="w-4 h-4" />
                  Abrir
                </button>

                <button
                  onClick={cerrarViewer}
                  className="p-2 rounded hover:bg-gray-100"
                  title="Cerrar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <iframe
              ref={iframeRef}
              src={pdfUrl}
              title={`Ticket_${registroId}`}
              className="w-full"
              style={{ height: 520, border: "1px solid #eee", borderRadius: 8 }}
            />
          </td>
        </tr>
      )}

      {/* Ticket oculto (válido en tablas usando TR oculto) */}
      <tr style={{ position: "absolute", left: "-9999px", top: 0 }}>
        <td>
          <TicketHTML ref={ticketRef} usuario={usuario} />
        </td>
      </tr>
    </Fragment>
  );
}
