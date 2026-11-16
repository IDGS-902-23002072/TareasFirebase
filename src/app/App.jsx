import { Link, NavLink, Route, Routes } from "react-router-dom";
import Inicio  from "../pages/Inicio";
import Login from "../pages/Login"; 
import NotFound  from "../pages/NotFound";
import { useAuth } from "../auth/AuthContext";

function App() {
  const { autenticado, usuario, logout } = useAuth();
  return (
    <div>
      <nav>
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/login">Login</NavLink>
        <br />

        {autenticado ? (
          <>
            <span>Hola {usuario}</span>
            <button onClick={logout}>Salir de la sesion</button>
          </>
        ) : (
          <>
            <Link to="/login">Entrar a la sesion</Link>
          </>
        )}
      </nav>
      <div>
        <Routes>
        <Route path="/" element={<Inicio/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* <Route path="/perfil" element={
          <RutaPrivada>
            <Perfil />
          </RutaPrivada>
          }></Route> */}
        <Route path="*" element={<NotFound />}></Route>

        </Routes>
      </div>
    </div>
  );
}

export default App
