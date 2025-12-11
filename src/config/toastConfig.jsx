// src/config/toastConfig.js
import { Toaster } from "react-hot-toast";

export default function ToastConfig() {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      toastOptions={{
        duration: 3000,
        style: {
          background: "#1e293b",       // Slate-800
          color: "#fff",
          borderRadius: "8px",
          padding: "12px 16px",
        },

        success: {
          icon: "🚀",
          style: {
            background: "#16a34a",     // Verde éxito
            color: "white",
          },
        },

        error: {
          style: {
            background: "#dc2626",     // Rojo error
            color: "white",
          },
        },
      }}
    />
  );
}
