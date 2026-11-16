
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
    <div>

      <h1>Iniciar sesión</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Correo electrónico:</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Contraseña:</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={cargando}>
          {cargando ? "Ingresando..." : "Iniciar sesión"}
        </button>

      </form>

      <hr />

      <button onClick={handleGoogle} disabled={cargando}>
        Continuar con Google
      </button>

      <p>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>

    </div>
  );
}
