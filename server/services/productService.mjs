import models from '../models/models.mjs'
const {Product} = models
import { osClient } from '../openSearch.mjs'

export async function createProduct(data) {
    const product = await Product.create(data)

    await osClient.index({
        index: 'products',
        id: product.id.toString(),
        body: {
            title: product.title,
            price: product.price,
            description: product.description
        }
    })

    await osClient.indices.refresh({ index: 'products' })

    return product
}

export async function searchProducts(query) {
    const result = await osClient.search({
        index: 'products',
        body: {
            query: {
                multi_match: {
                    query: query,
                    fields: ['title', 'description']
                }
            }
        }
    })

    return result.body.hits.hits.map(hit => hit._source)
}