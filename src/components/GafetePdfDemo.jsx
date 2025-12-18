import React from "react";
import { jsPDF } from "jspdf";

const QR_URL =
  "https://xplorabob.blob.core.windows.net/blob-eventos/qr_34320f0d-0845-4c50-827d-9ad372b8b807.png";

export default function GafeteThermalDemo() {
  const cargarImagen = (src) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });

  const generarGafete = async (anchoMM) => {
    const altoMM = 100; // puedes ajustar este alto
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [anchoMM, altoMM],
      });

      doc.setLineWidth(0.3);
      doc.rect(1, 1, anchoMM - 2, altoMM - 2);

      // Header
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("EVENTO DEMO", anchoMM / 2, 10, { align: "center" });

      // Nombre
      doc.setFontSize(12);
      doc.text("Juan Pérez", anchoMM / 2, 28, { align: "center" });

      // Rol
      doc.setFontSize(11);
      doc.text("INVITADO", anchoMM / 2, 35, { align: "center" });

      // QR
      try {
        const img = await cargarImagen(QR_URL);
        const qrSize = anchoMM * 0.6;
        const qrX = (anchoMM - qrSize) / 2;
        doc.addImage(img, "PNG", qrX, 40, qrSize, qrSize);
      } catch {}

      doc.setFontSize(9);
      doc.text("ID: DEMO-001", anchoMM / 2, altoMM - 8, { align: "center" });

      const blobUrl = doc.output("bloburl");
      window.open(blobUrl, "_blank");
    } catch (err) {
      console.error(err);
      alert("Error generando PDF");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui",
      }}
    >
      <h2>Prueba para Impresoras Térmicas</h2>

      <p style={{ maxWidth: 300, textAlign: "center" }}>
        Estos botones generan PDFs con tamaño real para rollos térmicos.
        Ábrelos en tablet y envíalos a imprimir.
      </p>

      <button
        onClick={() => generarGafete(58)}
        style={{
          padding: "14px 22px",
          fontSize: 18,
          borderRadius: 12,
          border: "none",
          cursor: "pointer",
        }}
      >
        📏 Generar PDF 58mm
      </button>

      <button
        onClick={() => generarGafete(80)}
        style={{
          padding: "14px 22px",
          fontSize: 18,
          borderRadius: 12,
          border: "none",
          cursor: "pointer",
        }}
      >
        📐 Generar PDF 80mm
      </button>
    </div>
  );
}
