import { Link, NavLink, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Inicio from "../pages/Inicio";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import RutaPrivada from "../components/RutaPrivada";
import Registro from "../pages/Registro";
import Tareas from "../pages/Tareas";

function App() {
  const { autenticado, usuario, cargando, logout } = useAuth();

  return (
    <div>
      <nav>
        <NavLink to="/">Inicio</NavLink>
        {" | "}
        <NavLink to="/login">Login</NavLink>
        {" | "}
        <NavLink to="/register">Registro</NavLink>

        <br />

        {cargando ? (
          <span>Verificando sesión...</span>
        ) : autenticado ? (
          <>
            <span>Hola {usuario?.email}</span>

            <button onClick={logout}>Salir de la sesión</button>
          </>
        ) : (
          <Link to="/login">Entrar a la sesión</Link>
        )}
      </nav>

      <div>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Inicio />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Registro />} />

          {/* Ruta privada */}
          <Route
            path="/tasks"
            element={
              <RutaPrivada>
                <Tareas />
              </RutaPrivada>
            }
          />

          {/* Página no encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
