
import { Check, Loader2, Printer } from "lucide-react";
import { useRef } from "react";

import TicketTermico from "./TicketTermico";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import TicketHTML from "../components/ui/TicketHTML";




export default function UsuarioRow({ usuario, confirmandoId, onConfirmar }) {
  const ticketRef = useRef();

  const { registroId, nombres, apellidos, correo_corporativo, estado, empresa, fecha_registro, fecha_confirmacion, fecha_asistencia, qr_code_url } = usuario;
  const descargarPDF = async () => {
    const element = ticketRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2, // mejora calidad
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [80, canvas.height * 80 / canvas.width],
    });

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      80,
      canvas.height * 80 / canvas.width
    );

    pdf.save(`Ticket_${usuario.nombres}.pdf`);
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
      <td className="border-0 border-b  border-[#CAC4D0] px-4 py-2">{formatearFechaHora(fecha_asistencia)}</td>
      {/* <td className="border px-4 py-2">
        {estado === "registrado" ? (
          <div className="flex items-center gap-2">
            <span className="font-medium">Registrado</span>

            <button
              onClick={() => onConfirmar(registroId)}
              disabled={confirmandoId === registroId}
              className="
          bg-green-500 hover:bg-green-600 
          text-white 
          p-1 rounded-full 
          disabled:opacity-50
          transition
          flex items-center justify-center
        "
              title="Confirmar registro"
            >
              {confirmandoId === registroId ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
            </button>
          </div>
        ) : (
          <span className="font-semibold capitalize">{estado}</span>
        )}
      </td> */}

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
              onClick={descargarPDF}
              className="flex items-center gap-2 text-[#49454F] hover:text-[#14AE5C]"
              title="Descargar PDF"
            >
              <Printer />
            </button>



          </div>
        )}
      </td>

      {/* Componente oculto para impresión */}
      {/* Ticket oculto */}
      <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
        <TicketHTML ref={ticketRef} usuario={usuario} />
      </div>

      {/* 
      <td className="border px-4 py-2">
        {estado === "registrado" && (
          <button
            disabled={confirmandoId === registroId}
            onClick={() => onConfirmar(registroId)}
            className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
          >
            {confirmandoId === registroId ? "Confirmando..." : "Confirmar"}
          </button>
        )}
      </td> */}
    </tr>
  );
}
