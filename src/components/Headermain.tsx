import { Logoblanco } from "../assets/logo";
import { FaRegUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";




const Headermain = ({nombre,children}:any) => {

  const { logoutUser } = useAuth();

  const handleClick = async() => {
    await logoutUser();

  };
  return (
    <>
      <header className=" w-full h-auto">
      <section className=" bg-custom-green w-full h-16 flex justify-between items-center px-10 ">
          <Link to={"/"} className="w-1/3 mt-1">

            <Logoblanco />
          </Link>
          <div className="w-1/3 mb-1">
            <h1 className="text-white font-bold text-4xl">{nombre}</h1>

          </div>
          <div className="w-1/3 flex justify-end items-center gap-4">
          <button onClick={handleClick} className="text-white font-bold text-2xl mb-1 hover:text-custom-blue ">Cerrar Sesión</button>
            <FaRegUserCircle className="text-3xl text-white" />
          </div>
        </section>
        {children}
      </header>
    </>
  );
};

export default Headermain;
