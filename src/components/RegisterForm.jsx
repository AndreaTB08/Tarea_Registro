
import { useState } from "react";
import Toast from "./Toast";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
  });

  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const isUsernameValid = username.trim().length >= 3;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
  const isPasswordValid = passwordRegex.test(password);

  const isFormValid = isUsernameValid && isEmailValid && isPasswordValid;

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ username: true, email: true, password: true });

    if (!isFormValid) {
      setToast({
        type: "error",
        message: "Completa todos los campos correctamente.",
      });
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));

    setToast({
      type: "success",
      message: `¡Registro exitoso! ¡Bienvenido, ${username}!`,
    });

    setUsername("");
    setEmail("");
    setPassword("");
    setTouched({ username: false, email: false, password: false });
    setLoading(false);
  };

  return (
    <div className="max-w-xl w-full bg-white shadow-lg p-8 rounded-2xl border border-blue-100">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <h2 className="text-3xl font-extrabold mb-6 text-blue-700 tracking-tight">
        Registro de Usuario
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de usuario
          </label>
          <input
            placeholder="Escribe tu nombre"
            className="w-full border border-blue-200 focus:border-blue-500 focus:ring-blue-400 p-3 rounded-xl shadow-sm transition"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() => handleBlur("username")}
          />
          {touched.username && !isUsernameValid && (
            <p className="text-red-500 text-sm mt-1">
              Debe tener al menos 3 caracteres.
            </p>
          )}
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            placeholder="tu@email.com"
            className="w-full border border-blue-200 focus:border-blue-500 focus:ring-blue-400 p-3 rounded-xl shadow-sm transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur("email")}
          />
          {touched.email && !isEmailValid && (
            <p className="text-red-500 text-sm mt-1">Ingresa un email válido.</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            placeholder="Mínimo 6 caracteres, 1 mayúscula y 1 número"
            className="w-full border border-blue-200 focus:border-blue-500 focus:ring-blue-400 p-3 rounded-xl shadow-sm transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => handleBlur("password")}
          />
          {touched.password && !isPasswordValid && (
            <p className="text-red-500 text-sm mt-1">
              Debe tener 6+ caracteres, 1 mayúscula y 1 número.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isFormValid || loading}
          className={`w-full py-3 rounded-xl text-white text-lg font-semibold transition ${
            !isFormValid || loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg"
          }`}
        >
          {loading ? "Registrando..." : "Registrar"}
        </button>
      </form>
    </div>
  );
}
