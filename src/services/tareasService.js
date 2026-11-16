
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase/config";

// Obtener la colección de tareas de un usuario
function obtenerColeccion(uid) {
  return collection(db, "usuarios", uid, "tareas");
}

// CREAR TAREA
export async function crearTarea(uid, titulo, descripcion) {

  const nuevaTarea = {
    titulo: titulo.trim(),
    descripcion: descripcion.trim(),
    completada: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  return await addDoc(obtenerColeccion(uid), nuevaTarea);
}

// LISTAR TAREAS EN TIEMPO REAL
export function escucharTareas(uid, callback, callbackError) {

  const consulta = query(
    obtenerColeccion(uid),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    consulta,
    (snapshot) => {

      const tareas = snapshot.docs.map((documento) => ({
        id: documento.id,
        ...documento.data()
      }));

      callback(tareas);
    },
    callbackError
  );
}

// EDITAR TAREA
export async function editarTarea(uid, id, titulo, descripcion) {

  const referencia = doc(
    db,
    "usuarios",
    uid,
    "tareas",
    id
  );

  await updateDoc(referencia, {
    titulo: titulo.trim(),
    descripcion: descripcion.trim(),
    updatedAt: serverTimestamp()
  });
}

// MARCAR COMO COMPLETADA O PENDIENTE
export async function cambiarEstadoTarea(uid, id, completada) {

  const referencia = doc(
    db,
    "usuarios",
    uid,
    "tareas",
    id
  );

  await updateDoc(referencia, {
    completada: completada,
    updatedAt: serverTimestamp()
  });
}

// ELIMINAR TAREA
export async function eliminarTarea(uid, id) {

  const referencia = doc(
    db,
    "usuarios",
    uid,
    "tareas",
    id
  );

  await deleteDoc(referencia);
}
