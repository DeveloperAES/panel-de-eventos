// Rutas + rutas protegidas
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
// import TicketPreview from "../pages/TicketPreview";
import AdminLayout from "../layouts/AdminLayout";

function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const { token } = useContext(AuthContext);
  return token ? <Navigate to="/dashboard" /> : children;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirigir raíz → login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login (solo si NO estás logueado) */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Vista de prueba PDF (PROTEGIDA) */}
        {/* <Route
          path="/ticket-preview"
          element={
            <PrivateRoute>
              <TicketPreview />
            </PrivateRoute>
          }
        /> */}

        {/* Dashboard protegido */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
