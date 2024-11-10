import axios from "axios";


const instance = axios.create({
    baseURL: 'https://nodejs-ypfagro.onrender.com/api',
    withCredentials:true
})

export default instance