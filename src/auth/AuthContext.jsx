
import {
  createContext,
  useContext,
  useReducer,
  useEffect
} from "react";

import {
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import { auth } from "../firebase/config";

// Estado inicial
const estadoInicial = {
  usuario: null,
  autenticado: false,
  cargando: true
};

// Reducer
function authReducer(estado, accion) {
  switch (accion.type) {

    case "AUTH_STATE_CHANGED":
      return {
        usuario: accion.payload,
        autenticado: !!accion.payload,
        cargando: false
      };

    default:
      return estado;
  }
}

// Contexto
const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [estado, dispatch] = useReducer(
    authReducer,
    estadoInicial
  );

  // Escuchar cambios de autenticación
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (usuario) => {

      dispatch({
        type: "AUTH_STATE_CHANGED",
        payload: usuario
      });

    });

    return () => unsubscribe();

  }, []);

  // Cerrar sesión
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        ...estado,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado
export function useAuth() {
  return useContext(AuthContext);
}
