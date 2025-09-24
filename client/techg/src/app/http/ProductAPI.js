import { $authHost, $host } from ".";
const exchangeRates = require('../../exchangeRates.json')

export const createProduct = async (product) => {
    const {data} = await $authHost.post('api/product', product, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return data
}

export const fetchProducts = async ({page, limit = 5, currency = 'EUR'}) => {
    const {data} = await $host.get('api/product', {params: {
        page, limit
    }})

    try {
        if (currency != 'EUR') {
            const rate = exchangeRates[currency]

            data.rows = data.rows.map(product => {
                product.price = (product.price*Number(rate)).toFixed(2)
                return product
            })
        }
    } catch (err) {
        alert("Error! See console for info")
        console.log(err)
    }

    return data
}

export const fetchOneProduct = async ({id, currency = 'EUR'}) => {
    const {data} = await $host.get(`api/product/${id}`)
    data.shippingFee = 3.15
    try {
        const rate = exchangeRates[currency]
        data.price = (data.price * Number(rate)).toFixed(2)
        data.shippingFee = (data.shippingFee * Number(rate)).toFixed(2)
    } catch (err) {
        alert("Error! See console for info!")
        console.log(err)
    }

    return data
}

export const searchProducts = async ({page, limit=5, q}) => {
    try {
        const {data} = await $host.get(`api/product/search?q=${q}`, {params: {
            page, limit
        }})
        return data
    } catch (err) {
        return err
    }
}

export const removeProduct = async id => {
    const {data} = await $authHost.delete('api/product', {
        data: {id}
    })
    return data
}

export const fetchCategories = async includeSub => {
    const {data} = await $host.get('/api/category', {
        params: {includeSub}
    })
    return data
}

export const createCategory = async name => {
    const {data} = await $authHost.post('api/category', {name})
    return data
}

export const removeCategory = async id => {
    const {data} = await $authHost.delete('api/category', {
        data: {id}
    })
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('/api/type')
    return data
}

export const createType = async ({name, categoryId}) => {
    const {data} = await $authHost.post('api/type', {
        name, categoryId
    })
    return data
}
export const removeType = async id => {
    const {data} = await $authHost.delete('api/type', {
        data: {id}
    })
    return data
}


export const fetchGroups = async () => {
    const {data} = await $host.get('/api/group')
    return data
}

export const createGroup = async ({name, typeId}) => {
    const {data} = await $authHost.post('/api/group', {
        name, typeId
    })
    return data
}
export const removeGroup = async id => {
    const {data} = await $authHost.delete('api/group', {
        data: {id}
    })
    return data
}

export const getSoldCount = async id => {
    const {data} = await $host.get(`api/product/${id}/get-sold-count`)
    return data
}

export const fetchGroup = async id => {
    const {data} = await $host.get(`api/group/${id}`)
    return data
}

export const editProduct = async ({inputData, id}) => {
    const {data} = await $authHost.patch(`api/product/${id}/edit`, inputData)
    return data
}