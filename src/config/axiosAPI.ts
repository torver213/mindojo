import axios from "axios";

const axiosAPI = axios.create({baseURL: "/api"})

export default axiosAPI