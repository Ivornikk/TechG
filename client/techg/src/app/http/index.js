import axios from "axios";

const $host = axios.create({
    baseURL: process.env.API_BASE_URL,
    withCredentials: true
})

const $authHost = axios.create({
    baseURL: process.env.API_BASE_URL,
    withCredentials: true
})

const authInterceptor = config => {
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}