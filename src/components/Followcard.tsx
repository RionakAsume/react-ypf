import { FaBox } from "react-icons/fa";
import { Link } from "react-router-dom";

const Followcard = ({ orden, status }:any) => {
  const { id, createdAt, cliente, router, vendedor } = orden;

  const { shipment_status = { description: "Sin estado" } } = status;
  const formattedDate = new Date(createdAt).toLocaleDateString("es-ES"); //la fecha y hora es toLocaleString

  const getStatusColor = (description:string) => {
    switch (description) {
      case "Entregado":
        return "bg-green-500";
      case "En Proceso":
        return "bg-yellow-500";
      case "Cancelado":
        return "bg-red-500";
      case "Nuevo":
        return "bg-blue-500";
      case "En Camino":
        return "bg-orange-500";
      case "Finalizado":
        return "bg-purple-800";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <>
      <Link
        to={`/main/${id}`}
        className=" h-auto w-full flex justify-start rounded-lg my-4 mx-4 py-4  border-solid border-2 shadow-xl gap-4 hover:border-4 hover:outline-4 hover:border-custom-blue "
      >
        <div className=" w-[15%] flex  justify-center items-center">
          <FaBox className="text-amber-800 text-8xl" />
        </div>
        <div className="flex w-[80%] justify-between items-center">
          <div className="flex">
            <div className="w-auto border-solid border-e-2 border-black flex justify-between flex-col gap-3  text-left pe-4">
              <h1 className=" text-xl  text-custom-green font-bold ">{`Pedido N°${id}`}</h1>
              <h1 className=" text-base ">
               
                <span className="font-bold"> Vendedor: </span>
                {`${vendedor.full_name}`}
              </h1>
              <h1 className=" text-base ">
              
                <span className="font-bold"> Fecha de creación: </span>
                {`${formattedDate}`}
              </h1>
            </div>
            <div className=" w-auto flex justify-center flex-col gap-3  text-left ps-4">
              <h1 className=" text-lg ">
              
                <span className="font-bold"> Cliente: </span>
                {`${cliente.user.full_name} ${cliente.user.surname}`}
              </h1>
              <h1 className=" text-base text-custom-blue">
                
                <span className="font-bold"> Destino: </span>
                {`${router.destination}`}
              </h1>
            </div>
          </div>
          <div>
            <div className="w-auto  flex justify-center flex-col items-center ">
              <h1
                className={`h-auto w-28 text-base text-white p-2 rounded ${getStatusColor(
                  shipment_status.description
                )}`}
              >
                {shipment_status.description}
              </h1>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Followcard;
