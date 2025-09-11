import { $authHost } from "."

export const createRating = async (rating) => {
    const {data} = await $authHost.post('/api/rating', rating, {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    })
    return data
}

export const fetchReviewsByProduct = async ({productId, rate, sort}) => {
    const {data} = await $authHost.get(`/api/rating/${productId}/get-by-product`, {
        params: {rate, sort: JSON.stringify(sort)}
    })
    return data
}

export const fetchReviewsByUser = async (userId) => {
    const {data} = await $authHost.get(`/api/rating/${userId}/get-by-user`)
    return data
}