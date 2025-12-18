import { useState } from "react";
import IframeModal from "./IframeModal";

/**
 * Ejemplo de uso del componente IframeModal
 * 
 * Este archivo muestra cómo usar el modal de iframe en tus componentes.
 * Puedes eliminar este archivo después de entender cómo funciona.
 */
export default function IframeModalExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {/* Botón para abrir el modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded-lg bg-blue-main px-4 py-2 text-white hover:opacity-90"
      >
        Abrir Modal con Iframe
      </button>

      {/* Modal de Iframe */}
      <IframeModal
        open={isModalOpen}
        url="https://www.example.com" // Cambia esto por tu URL
        title="Mi Contenido en Iframe"
        onClose={() => setIsModalOpen(false)}
        showOpenButton={true} // Opcional: mostrar botón para abrir en nueva pestaña
        height="75vh" // Opcional: altura del iframe
        width="min(1100px,95vw)" // Opcional: ancho del modal
      />
    </div>
  );
}