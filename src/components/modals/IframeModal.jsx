import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ExternalLink } from "lucide-react";

export default function IframeModal({ 
  open, 
  url, 
  title = "Vista previa", 
  onClose,
  showOpenButton = true,
  height = "75vh",
  width = "min(1100px,95vw)"
}) {
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

  const handleOpenNewTab = () => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-3"
      onMouseDown={(e) => {
        // click fuera para cerrar
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div 
        className="overflow-hidden rounded-2xl bg-white shadow-2xl"
        style={{ width }}
      >
        <div className="flex items-center justify-between gap-3 border-b p-4">
          <div className="min-w-0">
            <div className="text-base font-semibold color-gray">{title}</div>
          </div>

          <div className="flex items-center gap-2">
            {showOpenButton && (
              <button
                onClick={handleOpenNewTab}
                className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
                title="Abrir en otra pestaña"
              >
                <ExternalLink className="h-4 w-4" />
                Abrir
              </button>
            )}

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
            src={url || "about:blank"}
            title={title}
            className="w-full"
            style={{ height, border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>,
    document.body
  );
}