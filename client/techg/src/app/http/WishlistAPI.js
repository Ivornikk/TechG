import { $authHost, $host } from "."

export const fetchOneWishlist = async (userId) => {
    const {data} = await $authHost.get(`api/wishlist/${userId}`)
    return data
}

export const fetchAllWishlists = async () => {
    const {data} = await $authHost.get('api/wishlist')
    return data
}

export const createWishlist = async (userId) => {
    const {data} = await $authHost.post('api/wishlist', {userId})
    return data
}

export const addProductToWishlist = async ({userId, productId}) => {
    const {data} = await $authHost.post('api/wishlist/add-product', {
        userId, productId
    })
    return data
}

export const removeProductFromWishlist = async ({userId, productId}) => {
    const {data} = await $authHost.delete('api/wishlist/remove-product', {
        data: {userId, productId}
    })
    return data
}

export const removeWishlist = async ({userId, productId}) => {
    const {data} = await $authHost.delete('api/wishlist/remove-product', {
        userId, productId
    })
    return data
}

export const fetchNumberOfFavorites = async productId => {
    const {data} = await $host.get(`api/wishlist/${productId}/get-favorites`)
    return data.count
}