import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Login = () => {

  const { user,logoutUser } = useAuth();


  const handleClick = async() => {
    await logoutUser();

  };
  return (
    <div className=" w-full mt-1 h-28 gap-3 flex justify-center items-center flex-col ">
      <div className=" outline-3 border-4 w-full text-center border-custom-green p-1 rounded-xl " >{`Usuario: ${user.full_name}`}</div>
      <div className="flex gap-2 w-full">
        <Link className="w-[60%] h-10 text-center hover:bg-[#ffff] hover:text-custom-blue bg-custom-green text-[#ffff] p-2 rounded " to="/ypfprofile"><button>Perfil</button></Link>
        <button className="w-[60%] h-10 text-center hover:bg-[#ffff] hover:text-custom-blue bg-custom-green text-[#ffff] p-2 rounded "  onClick={handleClick}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export const Logout = () => {
  return (
    <div className=" w-[100%] ">
      <Link
        className="w-full h-28 flex justify-center items-center"
        to="/login"
      >
        <button className="w-[60%] hover:bg-[#ffff] hover:text-custom-blue bg-custom-green text-[#ffff] p-2 rounded">
          Ingresar
        </button>
      </Link>
    </div>
  );
};
