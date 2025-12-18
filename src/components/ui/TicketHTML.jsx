import React from "react";

const TicketHTML = React.forwardRef(({ usuario }, ref) => {
    return (
        <div
            ref={ref}
            style={{
                // width: "350px", // 80mm aprox altura del PDF CONTENEDOR DE IMAGEN
                width:350,
                padding: "10px",
                fontFamily: "Courier, monospace",
                fontSize: "10px",
                background: "#000",
                color: "#FFF",
            }}
        >
            <h3 style={{ textAlign: "center", marginBottom: "8px" }}>
                TICKET DE INGRESO
            </h3>

            <p><b>Nombres:</b> {usuario.nombres}</p>
            <p><b>Apellidos:</b> {usuario.apellidos}</p>
            <p><b>Correo:</b> {usuario.correo_corporativo}</p>
            <p><b>Empresa:</b> {usuario.empresa}</p>
            <img
                src={usuario.qr_code_url}
                alt="Código QR"
                style={{
                    maxHeight: 100,
                    maxWidth: 100,
                    height: "auto",
                    width: "auto",
                    display: "block", // para que no genere espacio extra debajo si quieres
                    margin: "0 auto"  // para centrar horizontalmente si está en un contenedor con display block
                }}
            />

        </div>
    );
});

export default TicketHTML;
