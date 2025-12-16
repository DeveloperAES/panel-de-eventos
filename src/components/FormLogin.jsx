import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FaSpinner, FaEye, FaEyeSlash, FaExclamationTriangle } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";


export default function Login() {
    const { login } = useContext(AuthContext);

    const [form, setForm] = useState({ dni: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // Mostrar/ocultar contraseña

    const submit = async (e) => {
        e.preventDefault();

        if (!form.dni || !form.password) {
            toast.error("Completa todos los campos", {
                icon: <FaExclamationTriangle color="white" />,
                style: { background: "#ef4444", color: "#fff" },
            });
            return;
        }

        try {
            setLoading(true);

            // Toast temporal de carga
            const loadingToast = toast.loading("Iniciando sesión...", {
                style: { background: "#3b82f6", color: "#fff" },
            });

            await login(form); // Autenticación

            toast.dismiss(loadingToast);
            toast.success("Bienvenido 👋", {
                icon: <FaUserCheck color="#fff" />,
                style: { background: "#22c55e", color: "#fff" },
            });
        } catch (err) {
            toast.dismiss();
            toast.error(err.response?.data?.error || "Error al iniciar sesión", {
           
                style: { background: "#ef4444", color: "white" },
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="h-hull bg-white  ">

            <div className="w-full min-h-screen h-screen relative flex justify-center items-center p-6  z-1 dark:bg-gray-900 sm:p-0">

                <div className="left h-full w-full md:w-1/2 flex justify-center items-center ">

                    <div className="max-w-md  flex flex-col gap-5 justify-center items-center">
                        <div className="flex flex-col ">
                            <h2 className="text-2xl  md:text-4xl color-gray">Iniciar sesión</h2>
                            <p className="text-center text-gray-400 dark:text-white/60">¡Introduce tu DNI y contraseña para iniciar sesión!</p>
                        </div>
                        <form onSubmit={submit} className="space-y-5 flex flex-col gap-4">

                            {/* DNI */}
                            <div>
                                <label className="text-sm font-medium text-gray-600">DNI <span className="text-red-500 text-sm font-semibold">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Escribe tu dni"
                                        className="
                                                w-full mt-1 p-3  border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition pr-12
                                                placeholder-gray-400        
                                                md:placeholder-gray-600"
                                    value={form.dni}
                                    disabled={loading}
                                    onChange={(e) => setForm({ ...form, dni: e.target.value })}
                                />
                            </div>

                            {/* PASSWORD con mostrar/ocultar */}
                            <div className="relative">
                                <label className="text-sm font-medium text-gray-600"> Contraseña <span className="text-red-500 text-sm font-semibold">*</span></label>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Ingresa tu contraseña"
                                    className="
                                                w-full mt-1 p-3   border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition pr-12
                                                placeholder-gray-400        
                                                md:placeholder-gray-600     
                                    "
                                    value={form.password}
                                    disabled={loading}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                />


                                {/* Botón para mostrar/ocultar */}
                                <button
                                    type="button"
                                    className="absolute right-3 top-12 text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            {/* Botón Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center items-center p-3 rounded-lg text-white font-semibold transition ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                            >
                                {loading ? (
                                    <FaSpinner className="animate-spin text-lg" />
                                ) : (
                                    "Entrar"
                                )}
                            </button>
                        </form>

                    </div>

                </div>
                <div className="right hidden md:flex items-center h-full w-1/2 bg-[#161950]">
                    <div className="w-full text-white flex flex-col gap-4 justify-center items-center py-10">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <img src="https://www.booombtl.com/wp-content/uploads/2025/05/LOGO-BOOOM-1.png" alt="Logo eventos BOOOMBTL" />
                            <h1 className="text-white text-4xl font-bold" style={{ fontFamily: "Oufit-semibold" }}>
                                EVENTOS BOOOM
                            </h1>
                        </div>

                        <p className="text-center text-gray-400 dark:text-white/60">Panel de administración para adminsitrador asignados</p>
                    </div>
                </div>


            </div>
        </section>
    );
}
