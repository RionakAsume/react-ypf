import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const BotonRegistro = () => {
    const { user } = useAuth();
  
    if (user?.roleId !== 1) return null; // Si no es admin, no renderiza nada
  
    return (
      <Link 
        to={'/register'} 
        className="ml-3 font-bold hover:bg-white hover:text-custom-blue bg-custom-green text-white text-base p-2 rounded"
        >
        Nuevo Registro
      </Link>
    );
  };
  
  export default BotonRegistro;