import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function RutaPrivada({children}) {
const {autenticado} = useAuth()

if(!autenticado) return <Navigate to='/login' replace />

return(
<>
<h1>{children}</h1>
</>
);
}