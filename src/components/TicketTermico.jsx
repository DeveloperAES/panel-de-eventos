import { forwardRef } from "react";
import fondo from '../assets/portada.webp';
import { CopyCheck } from "lucide-react";


const TicketTermico = forwardRef(({ usuario }, ref) => {
  const { nombres, apellidos, correo_corporativo, empresa, estado, fecha_asistencia, qr_code_url } = usuario;

  function formatearFechaHora(fecha) {
    if (!fecha) return "";
    const d = new Date(fecha);
    if (isNaN(d.getTime())) return "";

    return d.toLocaleString("es-PE", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }
  // console.log(fondo);
  return (
    <div
      ref={ref}
      className="ticket-termico flex flex-col text-white"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      <style>{`
        @media print {
          @page {
            size: 80mm auto;
            margin: 0;
            
          }
          
          body {
            margin: 0;
            padding: 0;
          }
          
          .ticket-termico {
            width: 80mm;
            padding: 10mm;
            font-family: 'Courier New', monospace;
            font-size: 12pt;
            line-height: 1.4;
         
          }
          
          .ticket-header {
            text-align: center;
            border-bottom: 2px dashed #000;
            padding-bottom: 8px;
            margin-bottom: 12px;
          }
          
          .ticket-title {
            font-size: 16pt;
            font-weight: bold;
            margin-bottom: 4px;
          }
          
          .ticket-subtitle {
            font-size: 10pt;
            margin-bottom: 8px;
          }
          
          .ticket-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 6px;
            font-size: 11pt;
          }
          
          .ticket-label {
            font-weight: bold;
            text-transform: uppercase;
          }
          
          .ticket-value {
            text-align: right;
            max-width: 60%;
            word-wrap: break-word;
          }
          
          .ticket-qr {
            text-align: center;
            margin: 12px 0;
            padding: 8px 0;
            border-top: 2px dashed #000;
            border-bottom: 2px dashed #000;
          }
          
          .ticket-qr img {
            max-width: 150px;
            height: auto;
          }
          
          .ticket-footer {
            text-align: center;
            font-size: 9pt;
            margin-top: 12px;
            padding-top: 8px;
            border-top: 2px dashed #000;
          }
          
          .ticket-estado {
            text-align: center;
            font-size: 14pt;
            font-weight: bold;
            text-transform: uppercase;
            padding: 8px;
            margin: 12px 0;
            background-color: #f0f0f0;
            border: 2px solid #000;
          }
        }
        
        /* Estilos para vista previa en pantalla */
        .ticket-termico {
          width: 80mm;
          padding: 10mm;
          font-family: 'Courier New', monospace;
          font-size: 12pt;
          line-height: 1.4;
          // background: white;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        
        .ticket-header {
          text-align: center;
          border-bottom: 2px dashed #000;
          padding-bottom: 8px;
          margin-bottom: 12px;
        }
        
        .ticket-title {
          font-size: 16pt;
          font-weight: bold;
          margin-bottom: 4px;
        }
        
        .ticket-subtitle {
          font-size: 10pt;
          margin-bottom: 8px;
        }
        
        .ticket-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
          font-size: 11pt;
        }
        
        .ticket-label {
          font-weight: bold;
          text-transform: uppercase;
        }
        
        .ticket-value {
          text-align: right;
          max-width: 60%;
          word-wrap: break-word;
        }
        
        .ticket-qr {
          text-align: center;
          margin: 12px 0;
          padding: 8px 0;
          border-top: 2px dashed #000;
          border-bottom: 2px dashed #000;
        }
        
        .ticket-qr img {
          max-width: 150px;
          height: auto;
        }
        
        .ticket-footer {
          text-align: center;
          font-size: 9pt;
          margin-top: 12px;
          padding-top: 8px;
          border-top: 2px dashed #fff;
        }
        
        .ticket-estado {
          text-align: center;
          font-size: 14pt;
          font-weight: bold;
          text-transform: uppercase;
          padding: 8px;
          margin: 12px 0;
          background-color: #f0f0f0;
          border: 2px solid #000;
        }
      `}</style>


      <div className="ticket-header">
        <div className="ticket-title">TICKET DE INGRESO</div>
        <div className="ticket-subtitle ">Evento Corporativo</div>
      </div>

      <div className="ticket-row">
        <span className="ticket-label">Nombres:</span>
        <span className="ticket-value">{nombres}</span>
      </div>

      <div className="ticket-row">
        <span className="ticket-label">Apellidos:</span>
        <span className="ticket-value">{apellidos}</span>
      </div>

      <div className="ticket-row">
        <span className="ticket-label">Correo:</span>
        <span className="ticket-value">{correo_corporativo}</span>
      </div>

      <div className="ticket-row">
        <span className="ticket-label">Empresa:</span>
        <span className="ticket-value">{empresa}</span>
      </div>

      {fecha_asistencia && (
        <div className="ticket-row">
          <span className="ticket-label">Fecha:</span>
          <span className="ticket-value">{formatearFechaHora(fecha_asistencia)}</span>
        </div>
      )}

      <div className="ticket-estado hidden ">{estado}</div>

      {qr_code_url && (
        <div className="ticket-qr flex flex-col justify-center items-center">
          <img src={qr_code_url} alt="Código QR" />
          <div style={{ fontSize: '8pt', marginTop: '4px' }}>Marca tu salida</div>
        </div>
      )}

      <div className="ticket-footer">
        <div>Gracias por su asistencia</div>
        <div style={{ marginTop: '4px' }}>https://www.booombtl.com/</div>
      </div>
    </div>
  );
});

TicketTermico.displayName = "TicketTermico";

export default TicketTermico;