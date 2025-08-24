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

export const searchProducts = async ({page, limit=5, q}) => {
    const {data} = await $host.get(`api/product/search?q=${q}`, {params: {
        page, limit
    }})
    console.log(data)
    return data
}