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