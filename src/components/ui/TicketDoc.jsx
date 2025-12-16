import { forwardRef } from "react";

const TicketDoc = forwardRef(({ usuario }, ref) => {
  return (
    <div ref={ref} style={{ padding: "20px", fontFamily: "monospace", fontSize: "12px" }}>
      <style>{`
        @media print {
          @page {
            size: 80mm 200mm;
            margin: 5mm;
          }
          
          body {
            margin: 0;
            padding: 0;
          }
        }
      `}</style>
      
      <h3 style={{ textAlign: "center", marginBottom: "16px" }}>TICKET DE INGRESO</h3>

      <p><b>Nombres:</b> {usuario.nombres}</p>
      <p><b>Apellidos:</b> {usuario.apellidos}</p>
      <p><b>Correo:</b> {usuario.correo_corporativo}</p>
      <p><b>Empresa:</b> {usuario.empresa}</p>
      <p><b>Estado:</b> {usuario.estado}</p>
    </div>
  );
});

TicketDoc.displayName = "TicketDoc";

export default TicketDoc;