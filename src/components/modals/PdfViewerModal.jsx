import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, Download, Printer, X } from "lucide-react";

export default function PdfViewerModal({ open, pdfUrl, fileName, title, onClose }) {
  const iframeRef = useRef(null);

  // Cerrar con ESC
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handlePrint = () => {
    try {
      const win = iframeRef.current?.contentWindow;
      win?.focus();
      win?.print();
      if (!win && pdfUrl) window.open(pdfUrl, "_blank", "noopener,noreferrer");
    } catch {
      if (pdfUrl) window.open(pdfUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleOpenNewTab = () => {
    if (pdfUrl) window.open(pdfUrl, "_blank", "noopener,noreferrer");
  };

  const handleDownload = async () => {
    if (!pdfUrl) return;
    const res = await fetch(pdfUrl);
    const blob = await res.blob();

    const a = document.createElement("a");
    const url = URL.createObjectURL(blob);

    a.href = url;
    a.download = fileName || "ticket.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-3"
      onMouseDown={(e) => {
        // click fuera para cerrar
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="w-[min(1100px,95vw)] overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between gap-3 border-b p-4">
          <div className="min-w-0">
            <div className="text-base font-semibold">{title || "Vista previa"}</div>
            <div className="truncate text-xs text-gray-500">{fileName}</div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-lg bg-[#14AE5C] px-3 py-2 text-sm font-medium text-white hover:opacity-90"
              title="Imprimir"
            >
              <Printer className="h-4 w-4" />
              Imprimir
            </button>

            <button
              onClick={handleOpenNewTab}
              className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
              title="Abrir en otra pestaña"
            >
              <ExternalLink className="h-4 w-4" />
              Abrir
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
              title="Descargar"
            >
              <Download className="h-4 w-4" />
              Descargar
            </button>

            <button
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-lg p-2 hover:bg-gray-100"
              title="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="bg-black/5">
          <iframe
            ref={iframeRef}
            src={pdfUrl || "about:blank"}
            title="PDF Viewer"
            className="w-full"
            style={{ height: "75vh", border: 0 }}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
