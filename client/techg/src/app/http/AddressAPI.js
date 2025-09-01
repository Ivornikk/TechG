import { $authHost } from "."

export const fetchUserAddresses = async userId => {
    const {data} = await $authHost.get(`api/address/${userId}`)
    return data
}

export const createAddress = async ({
    firstName,
    lastName,
    telephone,
    addressLine,
    country,
    region,
    city,
    ZipCode,
    userId
}) => {
    const {data} = await $authHost.post('api/address', {
        firstName,
        lastName,
        telephone,
        addressLine,
        country,
        region,
        city,
        ZipCode,
        userId
    })
    return data
}

export const removeAddress = async id => {
    const {data} = await $authHost.delete(`api/address`, {
        data: {id}
    })
    return data
}