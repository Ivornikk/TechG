import { $authHost } from "."

export const getOneWishlist = async (userId) => {
    const {data} = await $authHost.get(`api/wishlist/${userId}`)
    return data
}

export const getAllWishlists = async () => {
    const {data} = await $authHost.get('api/wishlist')
    return data
}

export const createWishlist = async (userId) => {
    const {data} = await $authHost.post('api/wishlist', {userId})
    return data
}

export const addProductToWishlist = async ({userId, productId}) => {
    const {data} = await $authHost.get('api/wishlist/add-product', {
        userId, productId
    })
    return data
}

export const removeProductFromWishlist = async ({userId, productId}) => {
    const {data} = await $authHost.get('api/wishlist/remove-product', {
        userId, productId
    })
    return data
}

export const removeWishlist = async ({userId, productId}) => {
    const {data} = await $authHost.get('api/wishlist/remove-product', {
        userId, productId
    })
    return data
}