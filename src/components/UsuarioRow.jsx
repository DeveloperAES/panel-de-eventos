
import { Check, Loader2, Printer } from "lucide-react";
import { useRef, useState } from "react";
import jsPDF from "jspdf";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
import TicketHTML from "../components/ui/TicketHTML";




export default function UsuarioRow({ usuario, confirmandoId, onConfirmar }) {


  const { registroId, nombres, apellidos, correo_corporativo, estado, empresa, fecha_registro, fecha_confirmacion, fecha_asistencia, fecha_salida, porcentaje_participacion_evento, qr_code_url } = usuario;




  const [descargando, setDescargando] = useState(false);


  const ticketRef = useRef();
  const descargarPDF = async () => {
    if (descargando) return;

    const toastId = toast.loading("Generando ticket...");

    try {
      setDescargando(true);

      const element = ticketRef.current;
      if (!element) throw new Error("Ticket no encontrado");

      // const canvas = await html2canvas(element, {
      //   scale: 2,
      //   useCORS: true,
      // });



      // const imgData = canvas.toDataURL("image/png");


      // const pdf = new jsPDF({
      //   orientation: "portrait",
      //   unit: "mm",
      //   format: [150, (canvas.height * 350) / canvas.width],
      // });

      // pdf.addImage(
      //   imgData,
      //   "PNG",
      //   10,
      //   50,
      //   80,
      //   (canvas.height * 80) / canvas.width
      // );

      // pdf.save(`Ticket_${nombres}.pdf`);

      toast.success("Ticket descargado", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Error al generar el PDF", { id: toastId });
    } finally {
      setDescargando(false);
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
      <td>
        {porcentaje_participacion_evento !== null
          ? `${porcentaje_participacion_evento}%`
          : '-'}
      </td>
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
