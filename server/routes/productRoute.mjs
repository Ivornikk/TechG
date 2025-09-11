import express from 'express'
import controller from '../controllers/productController.mjs'

const route = new express()
route.get('/', controller.getAll)
route.get('/search', controller.search)
route.get('/:id/get-sold-count', controller.getSoldCount)
route.get('/:id', controller.getOne)
route.post('/', controller.create)
route.delete('/', controller.remove)
route.patch('/:id/edit', controller.edit)

export default route