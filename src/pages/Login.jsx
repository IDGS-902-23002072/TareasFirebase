import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  iniciarSesion,
  iniciarSesionGoogle
} from "../services/authService";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  // Login con correo
  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setCargando(true);

    try {

      await iniciarSesion(email, password);

      navigate("/tasks");

    } catch (error) {

      console.error(error);
      setError("Correo o contraseña incorrectos.");

    } finally {

      setCargando(false);

    }
  };

  // Login con Google
  const handleGoogle = async () => {

    setError("");
    setCargando(true);

    try {

      await iniciarSesionGoogle();

      navigate("/tasks");

    } catch (error) {

      console.error(error);
      setError("No fue posible iniciar sesión con Google.");

    } finally {

      setCargando(false);

    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-[5fr_7fr] bg-base-100">

      {/* Panel lateral (solo escritorio) */}
      <aside className="hidden lg:flex flex-col justify-between bg-neutral text-neutral-content p-12 xl:p-16">

        <span className="font-display text-xl tracking-tight">
          Tareas<span className="text-primary">.</span>
        </span>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] opacity-60 mb-6">
            Tu espacio de trabajo
          </p>

          <h2 className="font-display text-5xl xl:text-6xl leading-[1.05] max-w-sm">
            Lo pendiente, por fin en orden.
          </h2>

          <ul className="mt-10 space-y-3 text-sm opacity-80 border-l border-neutral-content/20 pl-5">
            <li>Organiza tus tareas por prioridad.</li>
            <li>Retoma justo donde lo dejaste.</li>
            <li>Todo sincronizado en tu cuenta.</li>
          </ul>
        </div>

        <p className="text-xs opacity-40">
          © {new Date().getFullYear()} Tareas
        </p>

      </aside>

      {/* Formulario */}
      <main className="flex items-start lg:items-center px-6 py-12 sm:px-12 lg:px-20 xl:px-28">

        <div className="w-full max-w-md">

          <span className="font-display text-xl tracking-tight lg:hidden block mb-12">
            Tareas<span className="text-primary">.</span>
          </span>

          <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-3">
            Bienvenido de vuelta
          </p>

          <h1 className="font-display text-4xl sm:text-5xl leading-tight mb-10">
            Iniciar sesión
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm">
                Correo electrónico:
              </legend>

              <input
                type="email"
                className="input input-lg w-full"
                placeholder="nombre@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm">
                Contraseña:
              </legend>

              <input
                type="password"
                className="input input-lg w-full"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </fieldset>

            {error && (
              <div role="alert" className="alert alert-error alert-soft">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-lg w-full"
              disabled={cargando}
            >
              {cargando && <span className="loading loading-spinner loading-sm" />}
              {cargando ? "Ingresando..." : "Iniciar sesión"}
            </button>

          </form>

          <div className="divider my-8 text-xs uppercase tracking-widest">o</div>

          <button
            onClick={handleGoogle}
            className="btn btn-outline btn-lg w-full"
            disabled={cargando}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
              />
            </svg>
            Continuar con Google
          </button>

          <p className="mt-10 text-sm text-base-content/70">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="link link-primary font-semibold">
              Regístrate
            </Link>
          </p>

        </div>

      </main>

    </div>
  );
}