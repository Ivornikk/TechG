import { $authHost } from "."
const exchangeRates = require('../../exchangeRates.json')

export const setToken = async () => {
    const {data} = await $authHost.get('/api/supplier/get-token')
    if (!data.result)
        localStorage.setItem('accessToken', data.access_token)
    else
        localStorage.setItem('accessToken', data.result.access_token)
    return data
}

export const updateCategories = async () => {
    const {data} = await $authHost.patch('/api/supplier/update-categories', {
        Access_token: localStorage.getItem('accessToken')
    })
    return data
}

export const updateProducts = async () => {
    const {data} = await $authHost.patch('/api/supplier/update-products', {
        Access_token: localStorage.getItem('accessToken')
    })
    return data
}

export const updateOneProduct = async ({id, currency = 'EUR'}) => {
    const {data} = await $authHost.patch('/api/supplier/update-one-product', {
        accessToken: localStorage.getItem('accessToken'),
        id
    })
    return data
}