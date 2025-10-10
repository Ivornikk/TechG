import { $authHost } from "."

export const setToken = async () => {
    const {data} = await $authHost.get('/api/supplier/get-token')
    localStorage.setItem('accessToken', data.access_token)
    return data
}

export const updateCategories = async () => {
    const {data} = await $authHost.patch('/api/supplier/update-categories', {
        Access_token: localStorage.getItem('accessToken')
    })
    return data
}