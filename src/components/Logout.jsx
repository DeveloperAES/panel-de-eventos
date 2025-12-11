import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const MiBotonLogout = () => {
  const { logout } = useContext(AuthContext);

  return <button 
  className="bg-red-600 text-white p-2 rounded-2xl"
  onClick={logout}>Cerrar sesión</button>;
};
export default MiBotonLogout