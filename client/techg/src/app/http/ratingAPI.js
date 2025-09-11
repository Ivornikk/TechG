import { $authHost } from "."

export const createRating = async ({
    rate, review, images, userId, productId
}) => {
    const {data} = await $authHost.post('/api/review', {
        rate, review, images, userId, productId
    })
    return data
}

export const fetchByProduct = async ({productId, rate, sort}) => {
    const {data} = await $authHost.get(`/api/review/get-by-product/${productId}`, {
        params: {rate, sort: JSON.stringify(sort)}
    })
    return data
}

export const fetchByUser = async (userId) => {
    const {data} = await $authHost.get(`/api/review/get-by-user/${userId}`)
    return data
}