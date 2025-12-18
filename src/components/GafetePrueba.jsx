import React from "react";

const QR_URL =
  "https://xplorabob.blob.core.windows.net/blob-eventos/qr_34320f0d-0845-4c50-827d-9ad372b8b807.png";

export default function GafetePrueba() {
  const imprimir = () => window.print();

  return (
    <>
      {/* ESTILOS INTERNOS */}
      <style>
        {`
        /* Contenedor general del gafete en pantalla */
        #gafete-print-root {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .gafete {
          width: 60mm;
          height: 80mm;
          border: 1px solid #000;
          border-radius: 4mm;
          padding: 4mm;
          box-sizing: border-box;
          font-family: system-ui, sans-serif;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-align: center;
        }

        .gafete-header {
          font-size: 11px;
          font-weight: 600;
        }

        .gafete-nombre {
          font-size: 14px;
          font-weight: 700;
        }

        .gafete-rol {
          font-size: 12px;
        }

        .gafete-qr {
          display: flex;
          justify-content: center;
          margin-top: 4mm;
        }

        .gafete-qr img {
          width: 22mm;
          height: 22mm;
          object-fit: contain;
        }

        .actions {
          position: fixed;
          bottom: 16px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 8px;
        }

        .actions button {
          padding: 8px 16px;
          font-size: 14px;
          cursor: pointer;
        }

        /* --- SOLO IMPRESIÓN --- */
        @media print {
          @page {
            size: A4;   /* o "Letter" si usas carta */
            margin: 0;
          }

          body {
            margin: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          /* 1) Oculta TODO */
          body * {
            visibility: hidden;
          }

          /* 2) Muestra SOLO el gafete */
          #gafete-print-root,
          #gafete-print-root * {
            visibility: visible;
          }

          /* 3) Centra el gafete en la hoja */
          #gafete-print-root {
            position: fixed;
            inset: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            page-break-after: always;
          }

          /* 4) Oculta los botones */
          .actions {
            display: none !important;
          }
        }
      `}
      </style>

      {/* SOLO ESTE DIV SE IMPRIME */}
      <div id="gafete-print-root">
        <div className="gafete">
          <div className="gafete-header">EVENTO DEMO</div>

          <div>
            <div className="gafete-nombre">Juan Pérez</div>
            <div className="gafete-rol">INVITADO</div>
          </div>

          <div className="gafete-qr">
            <img src={QR_URL} alt="Código QR de acceso" />
          </div>

          <div style={{ fontSize: "10px", marginTop: "2mm" }}>
            ID: DEMO-001
          </div>
        </div>
      </div>

      {/* Botones solo para pantalla */}
      <div className="actions">
        <button onClick={imprimir}>Imprimir gafete</button>
      </div>
    </>
  );
}
