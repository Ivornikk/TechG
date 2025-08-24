import './envConf.mjs'
import models from './models/models.mjs'
const { Product } = models
import { osClient } from './openSearch.mjs'
import sequelize from './db.mjs'

async function syncProducts() {
  await sequelize.authenticate()
  await sequelize.sync({allter: false})

  const products = await Product.findAll()
  const body = products.flatMap(product => [
    { index: { _index: 'products', _id: product.id.toString() } },
    {
      title: product.title,
      price: product.price,
      description: product.description
    }
  ])
  const { body: bulkResponse } = await osClient.bulk({ refresh: true, body })

  if (bulkResponse.errors) {
    console.error('Indexing error:', bulkResponse)
  } else {
    console.log(`${products.length} product${products.length > 1?'s':''} synchronized`)
  }
}

syncProducts().then(() => process.exit())