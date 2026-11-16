import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navegador() {

  const { autenticado, usuario, cargando, logout } = useAuth();

  // Clase para el enlace activo del menú
  const claseEnlace = ({ isActive }) =>
    isActive ? "menu-active font-semibold" : "";

  return (
    <nav className="navbar flex-wrap gap-y-2 bg-base-100 border-b border-base-300 px-6 lg:px-12 min-h-16">

      {/* Marca + enlaces */}
      <div className="flex-1 flex flex-wrap items-center gap-x-8 gap-y-1">

        <Link to="/" className="font-display text-xl tracking-tight">
          Tareas<span className="text-primary">.</span>
        </Link>

        <ul className="menu menu-horizontal menu-sm gap-1 p-0">
          <li>
            <NavLink to="/" end className={claseEnlace}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={claseEnlace}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" className={claseEnlace}>
              Registro
            </NavLink>
          </li>
        </ul>

      </div>

      {/* Estado de la sesión */}
      <div className="flex-none flex items-center gap-3">

        {cargando ? (
          <span className="flex items-center gap-2 text-sm text-base-content/60">
            <span className="loading loading-dots loading-sm" />
            Verificando sesión...
          </span>
        ) : autenticado ? (
          <>
            <div className="avatar avatar-placeholder">
              <div className="bg-neutral text-neutral-content w-8 rounded-sm text-sm">
                <span>{usuario?.email?.[0]?.toUpperCase()}</span>
              </div>
            </div>

            <span className="hidden sm:block text-sm max-w-48 truncate">
              Hola <strong className="font-semibold">{usuario?.email}</strong>
            </span>

            <button onClick={logout} className="btn btn-outline btn-sm">
              Salir de la sesión
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary btn-sm">
            Entrar a la sesión
          </Link>
        )}

      </div>

    </nav>
  );
}