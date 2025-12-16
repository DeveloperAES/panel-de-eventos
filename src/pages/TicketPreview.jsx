import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Printer } from "lucide-react";
import TicketDoc from "../components/ui/TicketDoc";

export default function TicketPreview() {
  const ticketRef = useRef();

  const usuario = {
    nombres: "Juan",
    apellidos: "Pérez",
    correo_corporativo: "juan@empresa.com",
    empresa: "BOOOM",
    estado: "asistio",
  };

  const handlePrint = useReactToPrint({
    contentRef: ticketRef,
    documentTitle: `Ticket_${usuario.nombres}_${usuario.apellidos}`,
  });

  return (
    <div className="p-8">
      <div className="mb-4">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Printer size={18} />
          Imprimir Ticket
        </button>
      </div>
      
      <div className="border border-gray-300 inline-block">
        <TicketDoc ref={ticketRef} usuario={usuario} />
      </div>
    </div>
  );
}