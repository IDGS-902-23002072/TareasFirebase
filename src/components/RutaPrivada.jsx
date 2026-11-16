
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RutaPrivada({ children }) {

  const { autenticado, cargando } = useAuth();

  // Esperar a que Firebase compruebe la sesión
  if (cargando) {
    return <h2>Verificando sesión...</h2>;
  }

  // Si no está autenticado, regresar al login
  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, mostrar el contenido
  return children;
}
