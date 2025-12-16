import { useState, useRef } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { X, Printer } from "lucide-react";
import toast from "react-hot-toast";
import { useReactToPrint } from "react-to-print";

import { ingresarAlEventoPorQR } from "../../api/eventos";
import TicketTermico from "../TicketTermico";

const LectorQR = ({ idUsuarioAdministrador, idEvento, isOpen, onClose, onSuccess }) => {
  const [resultado, setResultado] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);
  const [usuarioData, setUsuarioData] = useState(null);
  const ticketRef = useRef();

  const handleDecode = async (result) => {
    // El escáner puede devolver un objeto o un array
    let decodedText = null;
    
    console.log("🔍 Resultado RAW del escáner:", result);
    console.log("🔍 Tipo de resultado:", typeof result);
    
    if (typeof result === 'string') {
      decodedText = result;
    } else if (result && typeof result === 'object') {
      console.log("🔍 Es un objeto, explorando propiedades:", Object.keys(result));
      
      // Si es un array, tomar el primer elemento
      if (Array.isArray(result) && result.length > 0) {
        console.log("🔍 Es un array, primer elemento:", result[0]);
        decodedText = result[0]?.rawValue || result[0]?.text || result[0]?.data || result[0];
      } else {
        // Si es un objeto, buscar la propiedad correcta
        decodedText = result.rawValue || result.text || result.data || String(result);
      }
    }

    console.log("✅ Texto decodificado:", decodedText);
    console.log("✅ Longitud del texto:", decodedText?.length);
    console.log("✅ Primeros 50 caracteres:", decodedText?.substring(0, 50));

    if (!decodedText || scanned) return;

    setScanned(true);
    setResultado(null);
    setError(null);

    const qrCodeToSend = String(decodedText).trim();
    
    console.log("📤 Enviando al backend:");
    console.log("   - qrCode:", qrCodeToSend);
    console.log("   - qrCode length:", qrCodeToSend.length);
    console.log("   - id_usuario_administrador:", idUsuarioAdministrador);
    console.log("   - id_evento:", idEvento);

    // Guardar info de debug
    setDebugInfo({
      qrCode: qrCodeToSend,
      qrLength: qrCodeToSend.length,
      idAdmin: idUsuarioAdministrador,
      idEvento: idEvento,
      timestamp: new Date().toLocaleTimeString()
    });

    try {
      const response = await ingresarAlEventoPorQR({
        qrCode: qrCodeToSend,
        id_usuario_administrador: idUsuarioAdministrador,
        id_evento: idEvento
      });
      
      console.log("📥 Respuesta del backend:", response.data);

      const { ok, estado, usuario } = response.data;

      if (ok && estado === "ASISTENCIA_CONFIRMADA") {
        setResultado(estado);
        setUsuarioData(usuario); // Guardar datos del usuario para el ticket
        toast.success("✅ Asistencia confirmada exitosamente");
        
        if (onSuccess) {
          setTimeout(() => {
            onSuccess();
          }, 1500);
        }
      } else {
        setError(estado);
        
        // Mensajes específicos según el estado
        const mensajes = {
          "DATOS_INCOMPLETOS": "❌ Datos incompletos en el QR",
          "NO_EXISTE_REGISTRO": "❌ No existe registro para este usuario",
          "USUARIO_NO_CONFIRMADO": "⚠️ Usuario no confirmado en el evento",
          "ASISTENCIA_YA_REGISTRADA": "ℹ️ La asistencia ya fue registrada",
          "QR_EVENTO_INCORRECTO": "❌ Este QR no corresponde a este evento",
          "ESTADO_DESCONOCIDO": "❌ Estado desconocido",
          "RESPUESTA_INVALIDA": "❌ Respuesta inválida del servidor"
        };
        
        toast.error(mensajes[estado] || "Error al procesar el QR");
      }
    } catch (err) {
      console.error("Error al escanear QR:", err);
      setError("ERROR_INTERNO");
      toast.error("❌ Error interno al procesar el QR");
    }
  };

  const handleError = (err) => {
    console.error("Error en escáner:", err);
    setError("ERROR_ESCANEO");
  };

  const resetScanner = () => {
    setScanned(false);
    setResultado(null);
    setError(null);
    setDebugInfo(null);
    setUsuarioData(null);
  };

  const handlePrint = useReactToPrint({
    contentRef: ticketRef,
    documentTitle: usuarioData 
      ? `Ticket_${usuarioData.nombres}_${usuarioData.apellidos}`
      : 'Ticket_Asistencia',
  });

  const handleClose = () => {
    resetScanner();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg mx-4 overflow-scroll  bg-white rounded-xl shadow-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Escanear QR de ingreso
          </h3>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Scanner */}
        <div className="mb-4 rounded-lg overflow-hidden border-2 border-gray-200">
          <Scanner
            onScan={handleDecode}
            onError={handleError}
            constraints={{ facingMode: "environment" }}
            styles={{ container: { width: "100%" } }}
          />
        </div>

        {/* Resultado exitoso */}
        {resultado && (
          <div className="p-4 mb-4 bg-green-50 border-2 border-green-300 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div className="flex-1">
                <p className="text-green-800 font-semibold text-lg">
                  ¡Asistencia confirmada!
                </p>
                <p className="text-green-700 text-sm mb-3">
                  El usuario ha ingresado al evento exitosamente
                </p>
                {usuarioData && (
                  <div className="text-sm text-green-800 space-y-1 mb-3">
                    <p><strong>Nombre:</strong> {usuarioData.nombres} {usuarioData.apellidos}</p>
                    <p><strong>Empresa:</strong> {usuarioData.empresa}</p>
                  </div>
                )}
                {usuarioData && (
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <Printer size={18} />
                    Imprimir Ticket
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Ticket oculto para impresión */}
        {usuarioData && (
          <div style={{ display: 'none' }}>
            <TicketTermico ref={ticketRef} usuario={usuarioData} />
          </div>
        )}

        {/* Mensajes de error */}
        {error && (
          <div className={`p-4 mb-4 border-2 rounded-lg ${
            error === "ASISTENCIA_YA_REGISTRADA" 
              ? "bg-blue-50 border-blue-300" 
              : error === "USUARIO_NO_CONFIRMADO"
              ? "bg-yellow-50 border-yellow-300"
              : "bg-red-50 border-red-300"
          }`}>
            <div className="flex items-start gap-2">
              <span className="text-2xl">
                {error === "ASISTENCIA_YA_REGISTRADA" ? "ℹ️" : 
                 error === "USUARIO_NO_CONFIRMADO" ? "⚠️" : "❌"}
              </span>
              <div>
                <p className={`font-semibold text-lg ${
                  error === "ASISTENCIA_YA_REGISTRADA" 
                    ? "text-blue-800" 
                    : error === "USUARIO_NO_CONFIRMADO"
                    ? "text-yellow-800"
                    : "text-red-800"
                }`}>
                  {error === "DATOS_INCOMPLETOS" && "Datos incompletos"}
                  {error === "NO_EXISTE_REGISTRO" && "Registro no encontrado"}
                  {error === "USUARIO_NO_CONFIRMADO" && "Usuario no confirmado"}
                  {error === "ASISTENCIA_YA_REGISTRADA" && "Asistencia ya registrada"}
                  {error === "QR_EVENTO_INCORRECTO" && "QR de otro evento"}
                  {error === "ESTADO_DESCONOCIDO" && "Estado desconocido"}
                  {error === "RESPUESTA_INVALIDA" && "Respuesta inválida"}
                  {error === "ERROR_INTERNO" && "Error interno"}
                  {error === "ERROR_ESCANEO" && "Error al escanear"}
                </p>
                <p className={`text-sm mt-1 ${
                  error === "ASISTENCIA_YA_REGISTRADA" 
                    ? "text-blue-700" 
                    : error === "USUARIO_NO_CONFIRMADO"
                    ? "text-yellow-700"
                    : "text-red-700"
                }`}>
                  {error === "DATOS_INCOMPLETOS" && "El código QR no contiene toda la información necesaria"}
                  {error === "NO_EXISTE_REGISTRO" && "Este usuario no está registrado en el evento"}
                  {error === "USUARIO_NO_CONFIRMADO" && "El usuario debe confirmar su registro primero"}
                  {error === "ASISTENCIA_YA_REGISTRADA" && "Este usuario ya ingresó al evento anteriormente"}
                  {error === "QR_EVENTO_INCORRECTO" && "Este código QR pertenece a otro evento, no puede ser usado aquí"}
                  {error === "ESTADO_DESCONOCIDO" && "Se recibió un estado no reconocido del servidor"}
                  {error === "RESPUESTA_INVALIDA" && "La respuesta del servidor no es válida"}
                  {error === "ERROR_INTERNO" && "Ocurrió un error al procesar la solicitud"}
                  {error === "ERROR_ESCANEO" && "No se pudo leer el código QR correctamente"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Debug Info */}
        {debugInfo && (
          <div className="p-3 mb-4 bg-gray-100 border border-gray-300 rounded-lg text-xs font-mono">
            <p className="font-bold text-gray-700 mb-2">🐛 Debug Info ({debugInfo.timestamp})</p>
            <div className="space-y-1 text-gray-600">
              <p><strong>QR Length:</strong> {debugInfo.qrLength} caracteres</p>
              <p><strong>ID Admin:</strong> {debugInfo.idAdmin}</p>
              <p><strong>ID Evento:</strong> {debugInfo.idEvento}</p>
              <p className="break-all"><strong>QR (primeros 100):</strong> {debugInfo.qrCode.substring(0, 100)}...</p>
            </div>
          </div>
        )}

        {/* Botones */}
        <div className="flex gap-3">
          {scanned && (
            <button
              onClick={resetScanner}
              className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              Escanear de nuevo
            </button>
          )}
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LectorQR;
