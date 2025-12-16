import React from "react";

const TicketHTML = React.forwardRef(({ usuario }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        width: "226px", // 80mm aprox
        padding: "10px",
        fontFamily: "Courier, monospace",
        fontSize: "10px",
        background: "#fff",
        color: "#000",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "8px" }}>
        TICKET DE INGRESO
      </h3>

      <p><b>Nombres:</b> {usuario.nombres}</p>
      <p><b>Apellidos:</b> {usuario.apellidos}</p>
      <p><b>Correo:</b> {usuario.correo_corporativo}</p>
      <p><b>Empresa:</b> {usuario.empresa}</p>
    </div>
  );
});

export default TicketHTML;
