import { $authHost, $host } from ".";

export const createProduct = async product => {
    const {data} = await $authHost.post('api/product', product)
    return data
}

export const fetchProducts = async ({page, limit = 5}) => {
    const {data} = await $host.get('api/product', {params: {
        page, limit
    }})
    return data
}