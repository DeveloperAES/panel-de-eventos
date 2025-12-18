import { useState, useRef, useEffect, useContext } from "react";
import { Menu, Search, Bell } from "lucide-react";
import { AuthContext } from "../context/AuthContext"; // tu contexto de autenticación

export default function Header({ sidebarOpen, toggleSidebar }) {
  const { admin, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-blue-main border-b p-4 flex text-white  justify-between items-center gap-4 relative">



      {/* BUSCADOR */}
      <div className="flex justify-start items-center gap-4 flex-1 max-w-xl ">

        <button
          onClick={toggleSidebar}
          className="flex p-2 hover:bg-gray-200 rounded md:hidden"
        >
          <Menu size={22} />
        </button>

        {/* Título */}
        <h2 className="text-sm font-bold md:text-2xl">
          BOOOM EVENTOS
        </h2>


        <div className="hidden w-100 relative">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full  pl-10 pr-3 py-2 bg-gray-100 rounded focus:outline-none focus:ring"
          />
          <Search className="absolute right-10 top-2.5 text-gray-400" size={18} />

        </div>


      </div>

      {/* BOTÓN PERFIL */}
      <div className="relative flex gap-2 items-center" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className=" flex items-center gap-2 bg-white rounded-full px-3 py-1 hover:bg-gray-300 focus:outline-none"
          aria-haspopup="true"
          aria-expanded={menuOpen}
        >
          <img
            src={admin?.avatar || "https://i.pravatar.cc/40"} // avatar por defecto
            alt="Perfil"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="hidden md:block font-medium text-gray-700">{admin?.nombre || "Usuario"}</span>
          <svg
            className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${menuOpen ? "rotate-180" : "rotate-0"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* MENÚ DESPLEGABLE */}
        {menuOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200">
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
            >
              Cerrar sesión
            </button>
          </div>
        )}

        <div>
          <Bell size={20} />
        </div>
      </div>


    </header>
  );
}
