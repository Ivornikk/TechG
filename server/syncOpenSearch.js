import './envConf.mjs'
import models from './models/models.mjs'
const { Product } = models
import { osClient } from './openSearch.mjs'
import sequelize from './db.mjs'

async function syncProducts() {
  await sequelize.authenticate()

  const indexName = 'products'

  // 1. Удаляем старый индекс (если есть)
  try {
    await osClient.indices.delete({ index: indexName })
    console.log(`Old index "${indexName}" deleted`)
  } catch (err) {
    if (err.meta?.body?.error?.type === 'index_not_found_exception') {
      console.log(`Index "${indexName}" not found, skipping delete`)
    } else {
      throw err
    }
  }

  // 2. Создаем новый индекс с mapping
  await osClient.indices.create({
    index: indexName,
    body: {
      settings: {
        number_of_shards: 1,
        number_of_replicas: 1
      },
      mappings: {
        properties: {
          id: { type: 'keyword' },
          title: { type: 'text' },
          description: { type: 'text' }
        }
      }
    }
  })
  console.log(`New index "${indexName}" created`)

  // 3. Забираем данные из БД
  const products = await Product.findAll()

  const body = products.flatMap(product => [
    { index: { _index: indexName, _id: product.id.toString() } },
    {
      id: product.id,
      title: product.title,
      description: product.description
    }
  ])

  // 4. Bulk-загрузка данных в OpenSearch
  const { body: bulkResponse } = await osClient.bulk({ refresh: true, body })

  if (bulkResponse.errors) {
    console.error('Indexing error:', bulkResponse)
  } else {
    console.log(`${products.length} product${products.length !== 1 ? 's' : ''} synchronized`)
  }
}

syncProducts()
  .then(() => process.exit())
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
