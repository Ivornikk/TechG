import axios from "axios";

const $host = axios.create({
    baseURL: "/",
    withCredentials: true
})

const $authHost = axios.create({
    baseURL: "/",
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