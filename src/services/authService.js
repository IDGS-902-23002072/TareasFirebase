
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";

import { auth } from "../firebase/config";

// Proveedor de Google
const googleProvider = new GoogleAuthProvider();

// REGISTRO con correo y contraseña
export async function registrarUsuario(nombre, email, password) {

  const resultado = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  // Guardar nombre del usuario
  await updateProfile(resultado.user, {
    displayName: nombre
  });

  return resultado.user;
}

// LOGIN con correo y contraseña
export async function iniciarSesion(email, password) {

  const resultado = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return resultado.user;
}

// LOGIN con Google
export async function iniciarSesionGoogle() {

  const resultado = await signInWithPopup(
    auth,
    googleProvider
  );

  return resultado.user;
}

// CERRAR SESIÓN
export async function cerrarSesion() {

  await signOut(auth);

}
