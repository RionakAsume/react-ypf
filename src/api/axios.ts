import axios from "axios";


const instance = axios.create({
    baseURL: 'https://nodejs-ypfagro.onrender.com',
    withCredentials:true
})

export default instance