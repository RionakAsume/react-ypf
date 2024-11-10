import { LogoWhite } from "../assets/logo";
import { Link } from "react-router-dom";

export const YpfProfile = () => {
    
    return (
        <section className="h-screen w-full bg-[url('./assets/banner-1.jpg')] bg-cover bg-center flex items-center justify-center">
        <div className="w-[300px] rounded-xl h-[30vh] bg-custom-blue hover:border-4 hover:outline-4 hover:border-custom-[#ffff] flex flex-col gap-2 justify-between items-center"> <div className="w-full py-4 rounded-t-xl bg-custom-green flex flex-col gap-4  justify-center items-center" ><LogoWhite/></div>
        <h1 className="text-[#ffff] font-bold" > PÁGINA EN CONSTRUCCIÓN </h1>
        <Link to={"/"} className="w-1/3 mt-1">
            <button className="hover:bg-[#ffff] font-bold bg-custom-green text-[#ffff] hover:text-custom-blue px-2 mb-5 py-1 rounded" >Volver</button>
          </Link>
         </div>
        </section>
    )
}
