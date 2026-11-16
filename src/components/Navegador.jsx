import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navegador from "../components/Navegador";

export default function Navegador() {
      const { autenticado, usuario, cargando, logout } = useAuth();
    return(
        
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

        
    );
}