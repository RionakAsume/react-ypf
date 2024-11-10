import axios from "./axios"

export const getOrdenRequest = ()=> axios.get('/order')

export const getOrdenIdRequest =(Id:number)=> axios.get(`/order/${Id}`) 


