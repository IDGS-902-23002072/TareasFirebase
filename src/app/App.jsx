import { Route, Routes } from "react-router-dom";
import Inicio from "../pages/Inicio";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import RutaPrivada from "../components/RutaPrivada";
import Registro from "../pages/Registro";
import Tareas from "../pages/Tareas";
import Navegador from "../components/Navegador";

function App() {

  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content font-sans">

      <Navegador />

      <main className="flex-1 flex flex-col">
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
      </main>

    </div>
  );
}

export default App;