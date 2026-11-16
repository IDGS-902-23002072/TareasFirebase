import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registrarUsuario } from "../services/authService";

export default function Registro() {

  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setCargando(true);

    try {

      await registrarUsuario(nombre, email, password);

      navigate("/tasks");

    } catch (error) {

      console.error(error);
      setError("No fue posible registrar el usuario. Verifica los datos.");

    } finally {

      setCargando(false);

    }
  };

  return (
    <div className="flex-1 grid lg:grid-cols-[7fr_5fr] bg-base-100">

      {/* Formulario */}
      <main className="flex items-start lg:items-center px-6 py-12 sm:px-12 lg:px-20 xl:px-28">

        <div className="w-full max-w-md">

          <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-3">
            Empieza hoy
          </p>

          <h1 className="font-display text-4xl sm:text-5xl leading-tight mb-10">
            Crear cuenta
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm">Nombre:</legend>

              <input
                type="text"
                className="input input-lg w-full"
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </fieldset>

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
              <legend className="fieldset-legend text-sm">Contraseña:</legend>

              <input
                type="password"
                className="input input-lg w-full"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
              <p className="label text-xs">Usa al menos 6 caracteres.</p>
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
              {cargando ? "Registrando..." : "Registrarse"}
            </button>

          </form>

          <p className="mt-10 text-sm text-base-content/70">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="link link-primary font-semibold">
              Inicia sesión
            </Link>
          </p>

        </div>

      </main>

      {/* Panel lateral (solo escritorio) */}
      <aside className="hidden lg:flex flex-col justify-end bg-neutral text-neutral-content p-12 xl:p-16">

        <p className="text-xs uppercase tracking-[0.25em] opacity-60 mb-6">
          Cuenta nueva
        </p>

        <h2 className="font-display text-5xl xl:text-6xl leading-[1.05] max-w-sm">
          Menos ruido, más hecho.
        </h2>

        <ol className="mt-10 space-y-4 text-sm opacity-80 max-w-xs">
          <li className="flex gap-4">
            <span className="font-display text-primary text-lg leading-none">01</span>
            Crea tu cuenta en segundos.
          </li>
          <li className="flex gap-4">
            <span className="font-display text-primary text-lg leading-none">02</span>
            Anota lo que tienes pendiente.
          </li>
          <li className="flex gap-4">
            <span className="font-display text-primary text-lg leading-none">03</span>
            Márcalo como hecho y sigue.
          </li>
        </ol>

      </aside>

    </div>
  );
}