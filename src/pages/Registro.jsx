
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
    <div>

      <h1>Crear cuenta</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

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
            minLength={6}
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={cargando}>
          {cargando ? "Registrando..." : "Registrarse"}
        </button>

      </form>

      <p>
        ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
      </p>

    </div>
  );
}
