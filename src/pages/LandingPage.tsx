import { LogoLand } from "../assets/logo";
import { useAuth } from "../context/AuthContext";
import { Login, Logout } from "../components/LoginLandingPage"; 

import { Link } from "react-router-dom";

export const LandingPage = () => {
    const { isAutheticaded } = useAuth();
   
    const userLogin = isAutheticaded ? <Login/> : <Logout/>

    

  return (
    <section className="h-screen w-full bg-[url('./assets/banner-1.jpg')] bg-cover bg-center flex items-center justify-center">
      <div className="flex w-[70vw] h-[80vh] gap-4">
        <article className="w-1/2 h-full">
          <div className=" w-full">
            <img className="w-full h-[50vh] object-cover" src="../src/assets/video_1.png" alt="" />
          </div>
          <Link to={`/main/`} className="w-full h-[30vh] bg-custom-green flex justify-center items-center" >
            < LogoLand/>
          </Link>
        </article>

        <article className="w-1/2 h-full bg-custom-blue text-white p-7">
        <div className="text-left h-full flex flex-col font-semibold justify-around " >
          <div><p className="text-xl" >
            Somos <b>YPF Agro</b>, el negocio de <b>YPF</b> enfocado en brindar soluciones integrales para potenciar el campo argentino.
          </p><br />
          <p className="text-xl">
            Proveemos los insumos y la energía necesaria para producir más y mejor, en compromiso con la sustentabilidad y el medio ambiente.
          </p></div>
          <div className="w-full" >{userLogin}</div> 
          </div>
        </article>
      </div>
    </section>
  );
};
