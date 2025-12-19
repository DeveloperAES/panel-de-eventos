import { useState, useEffect } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { SlEvent } from "react-icons/sl";
import { Menu } from "lucide-react";

export default function Sidebar({
  expanded,
  eventos = [],
  loading,
  onEventoClick,
  toggleSidebar,
  eventoActivo,
}) {
  const [openEventos, setOpenEventos] = useState(false);

  // Bloquear scroll SOLO en mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (expanded && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [expanded]);

  return (
    <>
      {/* OVERLAY (solo mobile) */}
      {expanded && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          bg-white text-[#49454F] h-full p-3
          transition-all duration-300 ease-in-out
          z-50

          fixed top-0 left-0
          w-64
          ${expanded ? "translate-x-0" : "-translate-x-full"}

          md:static md:translate-x-0
          md:rounded-xl 
          md:${expanded ? "w-78" : "w-64"}
        `}
      >
        {/* BOTÓN SIDEBAR */}
        <button
          onClick={toggleSidebar}
          className=" hidden  p-2 hover:bg-gray-200 rounded md:flex"
        >
          <Menu size={22} />
        </button>

        {/* MIS EVENTOS */}
        <div
          className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-gray-100"
          onClick={() => setOpenEventos(!openEventos)}
        >
          <div className="flex items-center space-x-2">
            <SlEvent />
            {expanded && <span className="flex text-nowrap">Mis eventos</span>}
          </div>

          {expanded && (
            <span>
              {openEventos ? <BsChevronUp /> : <BsChevronDown />}
            </span>
          )}
        </div>

        {/* LISTA EVENTOS */}
        {openEventos && expanded && (
          <ul className="mt-2 space-y-2">
            {loading ? (
              <li className="text-sm text-gray-500">Cargando...</li>
            ) : (
              eventos.map((e) => (
                <li
                  key={e.id}
                  onClick={() => onEventoClick(e.id)}
                  className={`
                    p-2 rounded cursor-pointer whitespace-nowrap overflow-hidden
                    hover:bg-[#F4F4F4]
                    ${
                      eventoActivo === e.id
                        ? "bg-[#E3F2FD] font-semibold text-blue-700"
                        : ""
                    }
                  `}
                >
                  {e.nombre}
                </li>
              ))
            )}
          </ul>
        )}
      </aside>
    </>
  );
}
