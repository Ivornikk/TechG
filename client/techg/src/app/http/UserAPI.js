import { $host, $authHost } from ".";
import { jwtDecode } from "jwt-decode";

export const signUp = async ({
    username,
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
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const editUser = async ({
    id, email, username, oldPassword, newPassword
}) => {
    const {data} = await $authHost.patch(`api/user/${id}/edit`, {
        email, username, oldPassword, newPassword
    })
    return data
}