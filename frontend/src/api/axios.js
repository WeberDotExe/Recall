import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const axiosPublic = axios.create({
    baseURL:baseUrl,
    withCredentials:true,
    headers:{
        "Content-Type":"application/json"
    },
});

export default axiosPublic;