import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { obtenerMisEventos } from "../api/auth";
import UsuariosPorEvento from "../components/UsuariosPorEvento";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [hoveringSidebar, setHoveringSidebar] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [eventoActivo, setEventoActivo] = useState(null);


  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const { data } = await obtenerMisEventos();
       
        setEventos(data.eventos);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  const isExpanded = sidebarOpen;

  return (
    <div className="flex flex-col h-screen  bg-gray-100">
      <Header

        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />




      {/* CONTENIDO */}
      <main className="flex gap-3  min-h-[calc(100vh-73px)] bg-[#F4F4F4] p-4">
        {/* SIDEBAR */}
        <Sidebar
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          expanded={isExpanded}
          eventos={eventos}
          loading={loading}
          onEventoClick={(id) => setEventoSeleccionado(id)}
          eventoActivo={eventoSeleccionado}   // ← NUEVO
        />
        {
          eventoSeleccionado ? (
            <UsuariosPorEvento eventoId={eventoSeleccionado} />
          ) : (
            children
          )
        }
      </main>


    </div>
  );
}
