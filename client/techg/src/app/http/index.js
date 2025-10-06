import axios from "axios";


let baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
// Removes the '/api' from the end of URL
baseUrl = baseUrl.slice(0, -4)

const $host = axios.create({
    baseURL: baseUrl,
    withCredentials: true
})

const $authHost = axios.create({
    baseURL: baseUrl,
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