import { createContext, useState } from "react";
import { loginAdminRequest } from "../api/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("admin")) || null
  );

  const login = async ({ dni, password }) => {
    const { data } = await loginAdminRequest({ dni, password });

    localStorage.setItem("token", data.token);
    localStorage.setItem("admin", JSON.stringify(data.admin));

    setToken(data.token);
    setAdmin(data.admin);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ token, admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
