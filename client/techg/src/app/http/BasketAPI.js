import { $authHost, $host } from "."

export const createBasket = async (userId) => {
    const {data} = await $authHost.post('api/basket', {params: userId})
    return data
}

export const fetchOneBasket = async (userId) => {
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
    const {data} = await $authHost.delete(`api/basket/remove-product`, {
        data: {userId, productId}
    })
    return data
}

export const fetchCartItemsByUser = async userId => {
    if (!userId) return {count: 0}
    const {data} = await $host.get('api/basket/items-count-by-user', {
        params: {userId}
    })
    return data
}