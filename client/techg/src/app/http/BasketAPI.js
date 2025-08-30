import { $authHost } from "."

export const createBasket = async (userId) => {
    const {data} = await $authHost.post('api/basket', {params: userId})
    return data
}

export const getOneBasket = async (userId) => {
    const {data} = await $authHost.get(`api/basket/${userId}`)
    return data
}

export const addProductToBasket = async ({productId, userId, quantity}) => {
    const {data} = await $authHost.post('api/basket/add-product', {
        productId, userId, quantity
    })
    return data
}

export const removeProductFromBasket = async ({userId, productId}) => {
    const {data} = await $authHost.delete('api/basket/remove-product', {params: {
        userId, productId
    }})
    return data
}