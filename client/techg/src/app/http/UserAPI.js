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
    
    return data.user
}

export const logIn = async (email, password) => {
    const {data} = await $host.post('api/user/login', {
        email,
        password
    })
    
    return data.user
}

export const auth = async () => {
    const {data} = await $authHost.get('api/user/auth')
    return data
}

export const logOut = async () => {
    const {data} = await $authHost.delete('api/user/log-out')
    return data
}

export const editUser = async ({
    id, email, username, oldPassword, newPassword
}) => {
    const {data} = await $authHost.patch(`api/user/${id}/edit`, {
        email, username, oldPassword, newPassword
    })
    return data
}