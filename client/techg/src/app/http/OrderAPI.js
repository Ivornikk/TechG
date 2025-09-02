import { $authHost } from "."

export const createOrder = async ({
    status,
    paymentMethod,
    userId,
    addressId,
    products
}) => {
    const {data} = await $authHost.post('api/order', {
        status,
        paymentMethod,
        userId,
        addressId,
        products
    })
    return data
}

export const fetchByUser = async ({userId, status}) => {
    const {data} = await $authHost.get(`api/order/${userId}`, {
        status
    })
    return data
}