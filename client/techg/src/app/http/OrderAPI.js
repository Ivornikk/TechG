import { $authHost } from "."

export const fetchAllOrders = async ({page=1, limit=10, sort, filter}) => {
    const {data} = await $authHost.get('api/order', {
        params: {page, limit, sort: JSON.stringify(sort), filter: JSON.stringify(filter)},
    })
    return data
}

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
    const {data} = await $authHost.get(`api/order/${userId}/get-products`, {
        data: {status}
    })
    return data
}

export const fetchOneOrder = async (orderId) => {
    const {data} = await $authHost.get(`/api/order/${orderId}`)
    return data
}

export const deleteOrder = async id => {
    const {data} = await $authHost.delete('api/order', {
        data: {id}
    })
    return data
}

export const addTrackingNum = async ({id, trackingNumber}) => {
    const {data} = await $authHost.patch('api/order/add-track-number', {
        id, trackingNumber
    })
    return data
}