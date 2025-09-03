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

export const fetchOrderByUser = async ({userId, status}) => {
    console.log(userId, status)
    const {data} = await $authHost.get(`api/order/${userId}/get-products`, {
        data: {status}
    })
    return data
}

export const deleteOrder = async id => {
    const {data} = await $authHost.delete('api/order', {
        data: {id}
    })
    return data
}