import { createContext, useContext, useState,useEffect,ReactNode  } from "react";
import { getOrdenRequest } from "../api/orden";

interface OrdenContextType {
    orden: any[]; 
    getOrden: () => Promise<void>;
  }
  

  interface OrdenProviderProps {
    children: ReactNode;
  }
  

const OrdenContext = createContext<OrdenContextType | null>(null);

export const useOrden = () => {
    const context = useContext(OrdenContext)

    if (!context) {
        throw new Error("useOrden deberia estar dentro de un OrdenProvider")
    }

    return context
}

export function OrdenProvider({ children }:OrdenProviderProps) {

    const [orden, setOrden] = useState([])

    const getOrden = async () => {
        try {

            const res = await getOrdenRequest();
           // console.log('Respuesta de la API:', res.data); 
            setOrden(res.data.data || [])
        } catch (error) {
            console.log(error)
            setOrden([]);
        }

    }

    useEffect(() => {
        getOrden();
    }, []);

    return (
        <OrdenContext.Provider value={{
            orden,
            getOrden,
        }}>
            {children}
        </OrdenContext.Provider>
    )
}