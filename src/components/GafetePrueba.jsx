export default function GafetePrueba({ nombre, cargo, empresa, qr, id }) {
  return (
    <div id="gafete-print-root">

        <style>
        {`
        /* Contenedor general del gafete en pantalla */
        #gafete-print-root {
          // width: 100vw;
          // height: 100vh;
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
      <div className="gafete">
        <div className="gafete-header">{empresa || "EVENTO DEMO"}</div>

        <div>
          <div className="gafete-nombre">{nombre}</div>
          <div className="gafete-rol">{cargo || "INVITADO"}</div>
        </div>

        <div className="gafete-qr">
          <img src={qr} alt="Código QR de acceso" />
        </div>

        <div style={{ fontSize: "10px", marginTop: "2mm" }}>
          ID: {id}
        </div>
      </div>
    </div>
  );
}
