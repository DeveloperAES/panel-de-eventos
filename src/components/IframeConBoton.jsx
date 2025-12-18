import React, { useRef } from "react";

export default function IframeConBoton() {
  const iframeRef = useRef(null);

  const handlePrint = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  };

  return (
    <div style={{ padding: 20 }}>
      <iframe
        ref={iframeRef}
        title="certificado"
        style={{
          width: "100%",
          height: 500,
          border: "1px solid #333",
        }}
        srcDoc={`
          <!doctype html>
          <html lang="es">
            <head>
              <meta charset="utf-8" />
              <title>Certificado</title>
              <style>
                body {
                  margin: 0;
                  padding: 20px;
                  font-family: Arial, sans-serif;
                }
                img {
                  max-width: 100%;
                  height: auto;
                  display: block;
                  margin: 0 auto;
                }
              </style>
            </head>
            <body>
              <img
                src="https://xplorabob.blob.core.windows.net/blob-eventos/certificados/2_15_20251218120235.svg"
                alt="Certificado"
              />
            </body>
          </html>
        `}
      />

      <button
        onClick={handlePrint}
        style={{
          marginTop: 16,
          padding: "10px 16px",
          fontSize: 14,
          cursor: "pointer",
        }}
      >
        Imprimir certificado
      </button>
    </div>
  );
}
