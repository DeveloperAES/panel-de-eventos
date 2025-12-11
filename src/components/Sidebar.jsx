import { useState } from "react";
import { BsCalendar3Event, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { SlEvent } from "react-icons/sl";
import { Menu, Search } from "lucide-react";

export default function Sidebar({ expanded, eventos = [], loading, onEventoClick, sidebarOpen, toggleSidebar, eventoActivo }) {
  const [openEventos, setOpenEventos] = useState(false); // controla si se despliegan



  return (
    <aside

      className={`bg-white text-[#49454F] border border-[rgba(74, 68, 88, 0.25)] rounded-xl h-full p-3 transition-all duration-300 ${expanded ? "w-78" : "w-20"}`}
    >
      {/* BOTÓN DEL SIDEBAR */}
      <button
        onClick={toggleSidebar}
        className="p-2 hover:bg-gray-200 rounded"
      >
        <Menu size={22} />
      </button>
      {/* Ítem para desplegar eventos */}
      <div
        className="flex items-center justify-between cursor-pointer p-2  rounded"
        onClick={() => setOpenEventos(!openEventos)}
      >
        <div className="flex items-center space-x-2">
          <SlEvent />
          {expanded && <span>Mis eventos</span>}
        </div>
        {expanded && (
          <span>{openEventos ? <BsChevronUp /> : <BsChevronDown />}</span>
        )}
      </div>

      {/* Lista de eventos desplegable */}
      {openEventos && expanded && (
        <ul className="mt-2 space-y-2">
          {loading ? (
            <li>Cargando...</li>
          ) : (
            eventos.map((e) => (
              <li
                key={e.id}
                onClick={() => onEventoClick(e.id)}
                className={`
                    p-2 rounded cursor-pointer whitespace-nowrap overflow-hidden
                    hover:bg-[#F4F4F4]
                    ${eventoActivo === e.id ? "bg-[#E3F2FD] font-semibold text-blue-700" : ""}
                  `}
              >
                {e.nombre}
              </li>


            ))
          )}
        </ul>
      )}


     

    </aside>
  );
}
