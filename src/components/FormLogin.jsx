import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FaSpinner, FaEye, FaEyeSlash, FaExclamationTriangle } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";

export default function Login() {
    const { login } = useContext(AuthContext);

    const [form, setForm] = useState({ dni: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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

            const loadingToast = toast.loading("Iniciando sesión...", {
                style: { background: "#3b82f6", color: "#fff" },
            });

            await login(form);

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
        <section className="bg-white">
            <div className="w-full min-h-screen h-screen relative flex justify-center items-center p-6 z-1 sm:p-0">

                {/* LEFT */}
                <div className="h-full w-full md:w-1/2 flex justify-center items-center">
                    <div className="max-w-md flex flex-col gap-5 justify-center items-center">

                        <div className="flex flex-col">
                            <h2 className="text-2xl text-center md:text-4xl text-gray-800">
                                Iniciar sesión
                            </h2>
                            <p className="text-center text-gray-400">
                                ¡Introduce tu DNI y contraseña para iniciar sesión!
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-5 flex flex-col gap-4">

                            {/* DNI */}
                            <div>
                                <label className="text-sm font-medium text-gray-600">
                                    DNI <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Escribe tu dni"
                                    className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition pr-12 placeholder-gray-400 md:placeholder-gray-600"
                                    value={form.dni}
                                    disabled={loading}
                                    onChange={(e) => setForm({ ...form, dni: e.target.value })}
                                />
                            </div>

                            {/* PASSWORD */}
                            <div className="relative">
                                <label className="text-sm font-medium text-gray-600">
                                    Contraseña <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Ingresa tu contraseña"
                                    className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition pr-12 placeholder-gray-400 md:placeholder-gray-600"
                                    value={form.password}
                                    disabled={loading}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                />

                                <button
                                    type="button"
                                    className="absolute right-3 top-12 text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            {/* SUBMIT */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center items-center p-3 rounded-lg text-white font-semibold transition ${
                                    loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                                }`}
                            >
                                {loading ? <FaSpinner className="animate-spin text-lg" /> : "Entrar"}
                            </button>

                        </form>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="hidden md:flex items-center h-full w-1/2 bg-[#161950]">
                    <div className="w-full text-white flex flex-col gap-4 justify-center items-center py-10">
                        <div className="flex flex-col items-center gap-4">
                            <img
                                src="https://www.booombtl.com/wp-content/uploads/2025/05/LOGO-BOOOM-1.png"
                                alt="Logo eventos BOOOMBTL"
                            />
                            <h1 className="text-4xl font-bold">
                                EVENTOS BOOOM
                            </h1>
                        </div>

                        <p className="text-center text-gray-400">
                            Panel de administración para administradores asignados
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
