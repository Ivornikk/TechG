import { $host } from ".";
import { jwtDecode } from "jwt-decode";

export const signUp = async ({
    username,
    gender,
    phoneNumber,
    email,
    password,
    country,
    currency,
    language,
    role,
    avatar
}) => {
    const {data} = await $host.post('api/user/registration', {
        username,
        gender,
        phoneNumber,
        email,
        password,
        country,
        currency,
        language,
        role,
        avatar
    })
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const logIn = async (email, password) => {
    const {data} = await $host.post('api/user/login', {
        email,
        password
    })
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const auth = async () => {
    const {data} = await $host.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}