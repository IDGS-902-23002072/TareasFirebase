
import { useState, useEffect } from "react";

import { useAuth } from "../context/AuthContext";

import {
  crearTarea,
  escucharTareas,
  editarTarea,
  cambiarEstadoTarea,
  eliminarTarea
} from "../services/tareasService";

export default function Tareas() {

  const { usuario } = useAuth();

  const [tareas, setTareas] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [editando, setEditando] = useState(null);

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // tareas en tiempo real
  useEffect(() => {

    if (!usuario?.uid) return;

    const unsubscribe = escucharTareas(
      usuario.uid,

      (nuevasTareas) => {
        setTareas(nuevasTareas);
        setCargando(false);
      },

      (error) => {
        console.error(error);
        setError("Error al consultar las tareas.");
        setCargando(false);
      }
    );

    // Cancelar suscripción al salir
    return () => unsubscribe();

  }, [usuario?.uid]);

  // se elije entre crear o editar una tarea
  const handleSubmit = async (e) => {

    e.preventDefault();
    setError("");

    try {

      if (editando) {

        await editarTarea(
          usuario.uid,
          editando,
          titulo,
          descripcion
        );

        setEditando(null);

      } else {

        await crearTarea(
          usuario.uid,
          titulo,
          descripcion
        );

      }

      setTitulo("");
      setDescripcion("");

    } catch (error) {

      console.error(error);
      setError("No fue posible guardar la tarea.");

    }
  };

  // edicion
  const prepararEdicion = (tarea) => {

    setEditando(tarea.id);
    setTitulo(tarea.titulo);
    setDescripcion(tarea.descripcion);

  };

  const cancelarEdicion = () => {

    setEditando(null);
    setTitulo("");
    setDescripcion("");

  };

  // Manejar el estado de la tarea
  const handleEstado = async (tarea) => {

    try {

      await cambiarEstadoTarea(
        usuario.uid,
        tarea.id,
        !tarea.completada
      );

    } catch (error) {

      console.error(error);
      setError("No fue posible actualizar la tarea.");

    }
  };

  // eliminaciones
  const handleEliminar = async (id) => {

    const confirmar = window.confirm(
      "¿Estás seguro de eliminar esta tarea?"
    );

    if (!confirmar) return;

    try {

      await eliminarTarea(usuario.uid, id);

    } catch (error) {

      console.error(error);
      setError("No fue posible eliminar la tarea.");

    }
  };

  if (cargando) {
    return <h2>Cargando tareas...</h2>;
  }

  return (

    <div>

      <h1>Mis tareas</h1>

      <p>Bienvenido: {usuario?.email}</p>

      <h2>{editando ? "Editar tarea" : "Nueva tarea"}</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Título:</label>

          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            maxLength={120}
            required
          />
        </div>

        <div>
          <label>Descripción:</label>

          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            maxLength={500}
          />
        </div>

        <button type="submit">
          {editando ? "Guardar cambios" : "Crear tarea"}
        </button>

        {editando && (
          <button type="button" onClick={cancelarEdicion}>
            Cancelar
          </button>
        )}

      </form>

      {error && (
        <p style={{ color: "red" }}>{error}</p>
      )}

      <hr />

      <h2>Lista de tareas ({tareas.length})</h2>

      {tareas.length === 0 ? (

        <p>No tienes tareas registradas.</p>

      ) : (

        tareas.map((tarea) => (

          <div
            key={tarea.id}
            style={{
              border: "1px solid gray",
              padding: "15px",
              marginBottom: "10px"
            }}
          >

            <h3
              style={{
                textDecoration: tarea.completada
                  ? "line-through"
                  : "none"
              }}
            >
              {tarea.titulo}
            </h3>

            <p>{tarea.descripcion}</p>

            <label>
              <input
                type="checkbox"
                checked={tarea.completada}
                onChange={() => handleEstado(tarea)}
              />

              Completada
            </label>

            <br />

            <button
              onClick={() => prepararEdicion(tarea)}
            >
              Editar
            </button>

            <button
              onClick={() => handleEliminar(tarea.id)}
            >
              Eliminar
            </button>

          </div>

        ))

      )}

    </div>
  );
}
