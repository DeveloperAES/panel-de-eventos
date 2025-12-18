import React from "react";
import { jsPDF } from "jspdf";

const QR_URL =
  "https://xplorabob.blob.core.windows.net/blob-eventos/qr_34320f0d-0845-4c50-827d-9ad372b8b807.png";

export default function GafetePdfDemo() {
  const anchoMM = 60; // ancho físico del gafete
  const altoMM = 80;  // alto físico del gafete

  // Carga la imagen del QR como objeto <img> (para usarla en jsPDF)
  const cargarImagen = (src) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });

  const generarPdf = async () => {
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [anchoMM, altoMM], // [width, height] en mm
      });

      // Margen interno básico
      const margin = 4;
      const usableWidth = anchoMM - margin * 2;

      // Marco del gafete (opcional)
      doc.setLineWidth(0.3);
      doc.rect(0.5, 0.5, anchoMM - 1, altoMM - 1);

      // Header
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("EVENTO DEMO", anchoMM / 2, 10, { align: "center" });

      // Nombre
      doc.setFontSize(12);
      doc.text("Juan Pérez", anchoMM / 2, 25, { align: "center" });

      // Rol
      doc.setFontSize(11);
      doc.text("INVITADO", anchoMM / 2, 32, { align: "center" });

      // Cargar QR
      try {
        const img = await cargarImagen(QR_URL);

        const qrSize = 24; // mm
        const qrX = (anchoMM - qrSize) / 2;
        const qrY = 38;

        doc.addImage(img, "PNG", qrX, qrY, qrSize, qrSize);
      } catch (e) {
        console.warn("No se pudo cargar la imagen del QR:", e);
      }

      // ID
      doc.setFontSize(9);
      doc.text("ID: DEMO-001", anchoMM / 2, altoMM - 8, { align: "center" });

      // 👉 En tablet es cómodo abrir el PDF en una nueva pestaña
      const blobUrl = doc.output("bloburl");
      window.open(blobUrl, "_blank");

      // Si prefieres descarga directa, usa:
      // doc.save("gafete-demo.pdf");
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error generando el PDF.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          border: "1px dashed #bbb",
          padding: "16px",
          textAlign: "center",
          maxWidth: "260px",
        }}
      >
        <p style={{ marginBottom: 8 }}>
          Este botón generará un PDF de <b>60mm x 80mm</b> con un gafete de
          prueba.
        </p>
        <p style={{ fontSize: 12, color: "#555" }}>
          En tablet se abrirá en una pestaña nueva. Desde ahí podrás imprimirlo.
        </p>
      </div>

      <button
        onClick={generarPdf}
        style={{
          padding: "14px 24px",
          fontSize: "18px",
          borderRadius: "9999px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Generar PDF del gafete
      </button>
    </div>
  );
}
