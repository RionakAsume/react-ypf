import { createContext, useState, useContext, ReactNode } from "react";
import { getOrdenIdRequest } from "../api/orden";
import { putStatusRequest } from "../api/status";

interface DetalleContextType {
  ordenDetalle: OrdenDetalle | null;
  getOrdenDetalleId: (Id: number) => Promise<void>;
  updateStatus: (id:  number, estado: { status: number }) => Promise<void>;
}

interface DetalleProviderProps {
  children: ReactNode;
}

interface OrdenDetalle {
  orders_details: any[]; 
}


export const DetalleordenContext = createContext<DetalleContextType | null>(null);

export const useDetalle = () => {
  const context = useContext(DetalleordenContext);
  if (!context) {
    throw new Error("useDetalle deberia estar dentro de un DetalleProvider");
  }
  return context;
};

export const DetalleProvider = ({ children }:DetalleProviderProps) => {

  const [ordenDetalle, setOrdenDetalle] = useState<OrdenDetalle | null>(null);

    const getOrdenDetalleId = async (Id:number) => {
        try {

            const res = await getOrdenIdRequest(Id);
            console.log('Respuesta de la Ordendetallado:', res.data); 
            setOrdenDetalle(res.data.data || null)
        } catch (error) {
            console.log(error)
            setOrdenDetalle(null);
        }

    }
    const updateStatus = async (id:number, estado:{ status: number }) => {
      try {
        const res = await putStatusRequest(id, estado);
       console.log("Estado de shipment_status actualizado", res.data);
    
       
  
      } catch (error) {
        console.log(error);
      }
    };

    
    return (
        <DetalleordenContext.Provider
          value={{
            getOrdenDetalleId,
            ordenDetalle,
            updateStatus,

          }}
        >
          {children}
        </DetalleordenContext.Provider>
      );
    };
    

