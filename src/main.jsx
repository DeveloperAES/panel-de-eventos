import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import { LoadingProvider } from "./context/LoadingContext";
import AppRouter from "./router/AppRouter";
// import Loader from "./components/Loader";    // 👈 loader global
import ToastConfig from "./config/toastConfig";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>

      <AppRouter />
      <ToastConfig />

    </AuthProvider>
  </React.StrictMode>
);
