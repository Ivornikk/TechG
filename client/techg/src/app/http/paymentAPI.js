import { $authHost } from "."

export const createIntent = async ({ amount, currency, description }) => {
    const {data} = await $authHost.post('api/payment/create-intent', {
        amount, currency, description
    })

    return {data}
}