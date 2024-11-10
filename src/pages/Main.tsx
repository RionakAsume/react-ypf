import Headermain from "../components/Headermain";
import Followcard from "../components/Followcard";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { useOrden } from "../context/OrdenContext";
import { useStatus } from "../context/StatusContext";
import BotonRegistro from "../components/BotonRegistro";



export const Main = () => {

  const { user } = useAuth()
  const { orden } = useOrden()
  const { status } = useStatus()


  const [filtro, setFiltro] = useState("todos");
  const [busqueda, setBusqueda] = useState("");



  const handleSearchChange = (e:any) => {
    setBusqueda(e.target.value);
  };


  const filtrarOrdenes = () => {
    return orden.filter((orde) => {
      // Buscar el estado relacionado de cada orden 
      const estadoCorrespondiente = status.find((s) => s.orders_id === orde.id);
  
      // Validar filtro de estado 
      const cumpleEstado =
        filtro === "todos" ||
        estadoCorrespondiente?.shipment_status_id === parseInt(filtro);
  
      // búsqueda por nombre o apellido del cliente
      const clienteCoincide =
        orde.cliente.user.full_name.toLowerCase().includes(busqueda.toLowerCase()) ||
        orde.cliente.user.surname.toLowerCase().includes(busqueda.toLowerCase());
  
      // Devolver la orden si cumple con ambos criterios
      return cumpleEstado && clienteCoincide;
    });
  };


  if (user && ![1, 3].includes(user.roleId)) return <Navigate to='/' replace />


  return (
    <div>
      <section>
        <Headermain nombre={"PEDIDOS"}>
          <nav className=" bg-custom-blue w-full h-20 flex rounded-b-2xl justify-between items-center">
            <div>
              <button
                onClick={() => setFiltro("1")}
                className="ml-10 font-bold hover:bg-white hover:text-custom-blue bg-custom-green text-white p-2 rounded"
              >
                Nuevo
              </button>
              <button
                onClick={() => setFiltro("5")}
                className="ml-3 font-bold hover:bg-white hover:text-custom-blue bg-custom-green text-white p-2 rounded"
              >
                Entregado
              </button>
              <button
                onClick={() => setFiltro("2")}
                className="ml-3 font-bold hover:bg-white hover:text-custom-blue bg-custom-green text-white p-2 rounded"
              >
                En Proceso
              </button>
              <button
                onClick={() => setFiltro("todos")}
                className="ml-3 font-bold hover:bg-white hover:text-custom-blue bg-custom-green text-white p-2 rounded"
              >
                Todos
              </button>
              <BotonRegistro />
            </div>
            <div>
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  type="search"
                  placeholder="Buscar por cliente"
                  value={busqueda}
                  onChange={handleSearchChange}
                  className="border border-gray-200 p-2 rounded w-52 mr-10"
                />
              </form>
            </div>
          </nav>
        </Headermain>
      </section>



      <section className="h-auto w-full flex items-center flex-col">
        {Array.isArray(orden) && filtrarOrdenes().length > 0 ? (
          filtrarOrdenes().map((orde) => {
            const estadoCorrespondiente = status.find(
              (s) => s.orders_id === orde.id
            );

            return (
              <div className="w-[70%] min-w-min flex justify-center" key={orde.id}>
                <Followcard orden={orde} status={estadoCorrespondiente} />
              </div>
            );
          })
        ) : (
          <p>No hay pedidos disponibles</p>
        )}
      </section>
    </div>
  );
};


