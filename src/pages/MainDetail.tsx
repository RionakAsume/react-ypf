import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { Orden_detallado } from "../components/Orden_detallado";
import { useParams } from "react-router-dom";
import { useDetalle } from "../context/DetalleordenContext";
import { useOrden } from "../context/OrdenContext";
import { useStatus } from "../context/StatusContext";
import { Formik, Form } from "formik";
import { YpfFactura } from "../assets/logo";




export const MainDetail = () => {
  const [cambioStatus, setCambioStatus] = useState(false)
  const { ordenDetalle, getOrdenDetalleId, updateStatus } = useDetalle();
  const { orden} = useOrden();
  const { status, getStatus } = useStatus();
  const params:any = useParams();
  const { orders_details = [] } = ordenDetalle || {};

  const ordenCorrespondiente = orden.find((orde) =>
    orders_details.some((detalle:any) => detalle.order_id === orde.id)
  );

  const statusCorrespondiente = status.find(
    (stat) => stat.orders_id === parseInt(params.id, 10)
  );

  const clienteCorrespondiente = ordenCorrespondiente?.cliente || null;

  console.log("asdas", ordenCorrespondiente);



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



  useEffect(() => {
    if (params.id) {
      getOrdenDetalleId(params.id).catch((error) =>
        console.error("Error al obtener la orden:", error)
      );
    }
  }, [params.id]);


  const navigate = useNavigate();
  useEffect(() => {
    if (cambioStatus) navigate("/main");
  }, [cambioStatus]);

  if (!ordenDetalle || !orders_details) {
    return <p>Cargando detalles de la orden...</p>;
  }

  const handleSubmit = async (values:any) => {



    if (params.id) {
      await updateStatus(params.id, values);
      getStatus();
      setCambioStatus(true);


    }

  };

  console.log("cliente recuperado", clienteCorrespondiente);
  return (
    <div>
      <Header />
      <nav className="w-full h-[4vh] bg-custom-blue"></nav>

      <div className="flex flex-col justify-center items-center">
        <div className="h-auto w-3/4 flex justify-center flex-col items-center rounded-lg my-4 mx-4 py-4 border-solid border-2 shadow-xl ">
          <div>
            <p className="font-bold mb-3 text-2xl" >
              {params.id
                ? `Pedido N°${params.id}`
                : "Cargando Numero del Pedido..."}
            </p>
          </div>
          <div className=" h-auto flex justify-around">
            <div className="flex items-center w-[50%]">
              <div className="w-[50%] h-full">

                <YpfFactura />
              </div>
            </div>
            <div className="flex w-full justify-between">

              <div className="text-justify">
                <p>
                <span className="font-bold">Cliente</span>
                  {clienteCorrespondiente
                    ? `: ${clienteCorrespondiente.user.full_name} ${clienteCorrespondiente.user.surname}`
                    : "Cargando cliente..."}
                </p>
                <p><span className="font-bold">Dirección</span>
                  {clienteCorrespondiente
                    ? `: ${clienteCorrespondiente.user.address}`
                    : "Cargando Direccion..."}
                </p>
                <p><span className="font-bold">Razón Social</span>
                  {clienteCorrespondiente
                    ? `: ${clienteCorrespondiente.razonSocial}`
                    : "Cargando Razón Social..."}
                </p>
                <p><span className="font-bold">Cuit </span>
                  {clienteCorrespondiente
                    ? `: ${clienteCorrespondiente.cuit}`
                    : "Cargando Cuit..."}
                </p>
              </div>
              <div>

                {/*<h3 className="text-justify flex justify-center font-bold">Datos de envio</h3>*/}
                <p className="flex justify-start">
                <span className="font-bold">Vendedor</span> { ordenCorrespondiente
                    ? `: ${ordenCorrespondiente.vendedor.full_name} ${ordenCorrespondiente.vendedor.
                      surname
                    }`
                    : "Cargando vendedor..."}
                </p>
                <p className="flex justify-start">
                <span className="font-bold">Destino</span>
                  {ordenCorrespondiente
                    ? `: ${ordenCorrespondiente.router.destination}`
                    : "Cargando Destino..."}
                </p>
                <p className="flex justify-start">
                <span className="font-bold">Teléfono</span>
                  {ordenCorrespondiente
                    ?  `: ${ordenCorrespondiente.vendedor.phone}`
                    : "Cargando Teléfono..."}
                </p>
                <p className="flex justify-start">
                <span className="font-bold">Transportista</span>
                  {ordenCorrespondiente
                    ? `: ${ordenCorrespondiente.transportista.full_name} ${ordenCorrespondiente.transportista.
                      surname} `
                    : "Cargando Transportista..."}
                </p>
              </div>
            </div>

          </div>
                      <h1 className="font-bold mt-10 text-2xl">Detalle</h1>
          {orders_details.length > 0 ? (
            orders_details.map((detalle:any) => (
              <section
                className="flex justify-center flex-col items-center w-[100%]"
                key={detalle.id}
              >

                <Orden_detallado detalle={detalle} />
              </section>
            ))
          ) : (
            <p>Cargando detalles de la orden...</p>
          )}
          <p className="font-bold my-5 text-2xl">Estado Actual</p>
          <p
            className={`h-auto w-28 text-base text-white p-2 rounded ${getStatusColor(
              statusCorrespondiente.shipment_status.description
            )}`}
          >
            {statusCorrespondiente.shipment_status.description}
          </p>

          <Formik
            initialValues={{ status: "" }}
            onSubmit={handleSubmit}
            
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <select
                  name="status"
                  value={values.status}
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "status",
                        value: parseInt(e.target.value, 10),
                      },
                    })
                  }
                  className="form-select w-full p-2 h-[40px] rounded-[5px] my-5 border border-black"
                >
                  <option value={""}>Selecciona un Estado a cambiar</option>
                  {["Nuevo", "En Proceso", "En Camino", "Cancelado", "Entregado", "Finalizado"].map((description, index) => (
                    <option
                      key={index}
                      
                      value={index + 1}
                      hidden={description === statusCorrespondiente.shipment_status.description}
                    >
                      {description}
                    </option>
                  ))}
                </select>

                <button
                  type="submit"
                  className=" ml-3 h-10 font-bold hover:bg-custom-blue hover:bg-[#ffff] bg-custom-green text-[#ffff] p-2 rounded"
                >
                  Guardar
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
