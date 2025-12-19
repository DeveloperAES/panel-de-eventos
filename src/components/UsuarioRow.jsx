
import { Check, Loader2, Printer,FileText } from "lucide-react";
import { useRef, useState } from "react";
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";
import GafetePrueba from "./GafetePrueba";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
// import TicketHTML from "../components/ui/TicketHTML";




export default function UsuarioRow({ usuario, confirmandoId, onConfirmar }) {


  const { registroId, nombres, apellidos, correo_corporativo, estado, 
    empresa, cargo, fecha_registro, fecha_confirmacion, fecha_asistencia, fecha_salida, porcentaje_participacion_evento, qr_code_url } = usuario;

  const gafeteRef = useRef();

  const imprimirComponente = useReactToPrint({
    contentRef: gafeteRef,                      // ✅ API nueva
    documentTitle: `Gafete_${nombres}_${apellidos}`,
  });


  const [descargando, setDescargando] = useState(false);

  const generarGafeteThermal = async (anchoMM) => {
    const altoMM = 100;

    const cargarImagen = (src) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });

    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [anchoMM, altoMM],
      });

      doc.setLineWidth(0.3);
      doc.rect(1, 1, anchoMM - 2, altoMM - 2);

      // HEADER (EMPRESA/EVENTO)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(empresa || "EVENTO", anchoMM / 2, 10, { align: "center" });

      // NOMBRE COMPLETO
      const nombreCompleto = `${nombres ?? ""} ${apellidos ?? ""}`.trim();
      doc.setFontSize(12);
      doc.text(nombreCompleto || "SIN NOMBRE", anchoMM / 2, 28, {
        align: "center",
      });

      // TEXTO SECUNDARIO
      doc.setFontSize(11);
      doc.text("INVITADO", anchoMM / 2, 35, { align: "center" });

      // QR
      try {
        const img = await cargarImagen(qr_code_url);
        const qrSize = anchoMM * 0.6;
        const qrX = (anchoMM - qrSize) / 2;
        doc.addImage(img, "PNG", qrX, 40, qrSize, qrSize);
      } catch (e) {
        console.warn("QR no cargó", e);
      }

      // ID
      doc.setFontSize(9);
      doc.text(`ID: ${registroId}`, anchoMM / 2, altoMM - 8, {
        align: "center",
      });

      // Abrir PDF (ideal tablet)
      const blobUrl = doc.output("bloburl");
      window.open(blobUrl, "_blank");
    } catch (err) {
      console.error(err);
      alert("Error generando PDF");
    }
  };


  function formatearFecha(fecha) {
    if (!fecha) return ""; // si es null, undefined o ""

    const d = new Date(fecha);
    if (isNaN(d.getTime())) return ""; // si es inválida

    return d.toLocaleString("es-PE", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  function formatearFechaHora(fecha) {
    if (!fecha) return ""; // si es null, undefined o ""

    const d = new Date(fecha);
    if (isNaN(d.getTime())) return ""; // si es inválida

    return d.toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // si quieres formato 12h con am/pm
    });
  }



  // const handlePrint = useReactToPrint({
  //   contentRef: ticketRef,
  //   documentTitle: `Ticket_${nombres}_${apellidos}`,
  // });

  return (
    <tr className="hover:bg-gray-100">
      <td className="border-0 border-b border-[#CAC4D0] px-4 py-2">{nombres}</td>
      <td className="border-0 border-b border-[#CAC4D0] px-4 py-2">{apellidos}</td>
      <td className="border-0 border-b border-[#CAC4D0] px-4 py-2">{correo_corporativo}</td>



      <td className="border-0 border-b  border-[#CAC4D0] px-4 py-2">{empresa}</td>
      <td className="border-0 border-b border-[#CAC4D0]  px-4 py-2">{formatearFecha(fecha_registro)}</td>
      <td className="border-0 border-b border-[#CAC4D0] px-4 py-2">{formatearFecha(fecha_confirmacion)}</td>
      <td className="border-0 border-b border-[#CAC4D0] px-4 py-2">{formatearFechaHora(fecha_asistencia)}</td>
      <td className="border-0 border-b  border-[#CAC4D0] px-4 py-2">{formatearFechaHora(fecha_salida)}</td>
      <td className="border-0 border-b  border-[#CAC4D0] px-4 py-2">
        {porcentaje_participacion_evento !== null
          ? `${porcentaje_participacion_evento}%`
          : '-'}
      </td>

      <td className="border-0 border-b border-l border-[#CAC4D0] px-4 py-2 bg-white sticky right-0 z-10">
        {estado === "registrado" ? (
          <select
            className="border-0  px-2 py-1 rounded bg-[#EBFFEE]"
            onChange={(e) => {
              if (e.target.value === "confirmado") {
                onConfirmar(registroId);
              }
            }}
          >
            <option value="registrado">Registrado</option>
            <option value="confirmado">Confirmar →</option>
          </select>
        ) : (
          <div className="flex gap-2 items-center">
            <span
              className={`font-semibold capitalize flex justify-center flex-1 text-center rounded-[0.375rem]  p-2 ${estado === 'asistio' ? 'bg-[#14AE5C] text-white' : 'bg-[#CFF7D3]'}`}
            >
              {estado}

            </span>
            <button
              onClick={() => generarGafeteThermal(58)}   // ⭐ 58mm térmica
              disabled={descargando}
              className="flex items-center gap-2 text-[#49454F] hover:text-[#14AE5C] disabled:opacity-50"
              title="Descargar PDF"
            >
              {descargando ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Printer />
              )}
            </button>

            <button
              onClick={imprimirComponente}
              className="flex items-center gap-1 text-[#49454F] hover:text-[#0F62FE]"
              title="Imprimir gafete HTML"
              type="button"
            >
              <FileText size={20} />
            </button>
          </div>
        )}

        <div
          style={{ position: "absolute", left: "-9999px", top: 0 }} // mejor que display:none
        >
          <div ref={gafeteRef}>
            <GafetePrueba
              nombre={`${nombres} ${apellidos}`}
              rol="INVITADO"
              empresa={empresa}
              qr={qr_code_url}
              id={registroId}
            />
          </div>
        </div>

      </td>
    </tr>
  );
}
