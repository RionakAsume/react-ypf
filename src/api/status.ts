import axios from "./axios"

export const getStatusRequest = ()=> axios.get('/status')

export const putStatusRequest = (id:number, estado:Estado) => axios.put(`/status/${id}`, { shipment_status_id: estado.status });


interface Estado {
    status: number; 
  }