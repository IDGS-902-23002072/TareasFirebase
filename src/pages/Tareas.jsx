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
    return (
      <div className="flex-1 px-6 py-12 lg:px-12">
        <h2 className="flex items-center gap-3 font-display text-2xl">
          <span className="loading loading-spinner loading-md text-primary" />
          Cargando tareas...
        </h2>
      </div>
    );
  }

  return (

    <div className="flex-1 px-6 py-10 lg:px-12 lg:py-14">

      <div className="max-w-6xl">

        {/* Encabezado */}
        <header className="mb-12 border-b border-base-300 pb-8">

          <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-3">
            Panel personal
          </p>

          <h1 className="font-display text-4xl sm:text-5xl leading-tight">
            Mis tareas
          </h1>

          <p className="mt-3 text-sm text-base-content/70">
            Bienvenido: <span className="font-semibold">{usuario?.email}</span>
          </p>

        </header>

        <div className="grid lg:grid-cols-[22rem_1fr] gap-12 xl:gap-16 items-start">

          {/* Formulario */}
          <section
            className={
              "lg:sticky lg:top-8 border bg-base-200/60 p-6 rounded-box " +
              (editando
                ? "border-primary border-l-4"
                : "border-base-300")
            }
          >

            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-2xl">
                {editando ? "Editar tarea" : "Nueva tarea"}
              </h2>

              {editando && (
                <span className="badge badge-primary badge-soft badge-sm">
                  Editando
                </span>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm">Título:</legend>

                <input
                  type="text"
                  className="input w-full"
                  placeholder="¿Qué hay que hacer?"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  maxLength={120}
                  required
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm">Descripción:</legend>

                <textarea
                  className="textarea w-full h-28"
                  placeholder="Detalles (opcional)"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  maxLength={500}
                />
              </fieldset>

              <div className="flex gap-2 pt-1">

                <button type="submit" className="btn btn-primary flex-1">
                  {editando ? "Guardar cambios" : "Crear tarea"}
                </button>

                {editando && (
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={cancelarEdicion}
                  >
                    Cancelar
                  </button>
                )}

              </div>

            </form>

            {error && (
              <div role="alert" className="alert alert-error alert-soft mt-5">
                <span>{error}</span>
              </div>
            )}

          </section>

          {/* Lista */}
          <section>

            <h2 className="font-display text-2xl mb-5 flex items-baseline gap-3">
              Lista de tareas
              <span className="badge badge-neutral badge-sm">
                {tareas.length}
              </span>
            </h2>

            {tareas.length === 0 ? (

              <div className="border border-dashed border-base-300 p-10 rounded-box">
                <p className="font-display text-xl">Todo despejado.</p>
                <p className="text-sm text-base-content/60 mt-1">
                  No tienes tareas registradas.
                </p>
              </div>

            ) : (

              <ul className="border border-base-300 divide-y divide-base-300 rounded-box overflow-hidden">

                {tareas.map((tarea) => (

                  <li
                    key={tarea.id}
                    className={
                      "p-5 flex flex-col sm:flex-row sm:items-start gap-4 " +
                      (tarea.completada ? "bg-base-200/50" : "bg-base-100")
                    }
                  >

                    <div className="flex-1 min-w-0">

                      <h3
                        className={
                          "font-display text-xl leading-snug wrap-break-word " +
                          (tarea.completada ? "line-through opacity-50" : "")
                        }
                      >
                        {tarea.titulo}
                      </h3>

                      {tarea.descripcion && (
                        <p className="mt-1 text-sm text-base-content/70 wrap-break-word">
                          {tarea.descripcion}
                        </p>
                      )}

                      <label className="mt-4 flex items-center gap-2 text-sm cursor-pointer w-fit">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary checkbox-sm"
                          checked={tarea.completada}
                          onChange={() => handleEstado(tarea)}
                        />
                        Completada
                      </label>

                    </div>

                    <div className="flex sm:flex-col gap-1 shrink-0">

                      <button
                        className="btn btn-ghost btn-sm justify-start"
                        onClick={() => prepararEdicion(tarea)}
                      >
                        Editar
                      </button>

                      <button
                        className="btn btn-ghost btn-sm justify-start text-error"
                        onClick={() => handleEliminar(tarea.id)}
                      >
                        Eliminar
                      </button>

                    </div>

                  </li>

                ))}

              </ul>

            )}

          </section>

        </div>

      </div>

    </div>
  );
}