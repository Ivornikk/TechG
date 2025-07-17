import express from 'express'
import controller from '../controllers/orderController.mjs'

const route = new express()
route.get('/', controller.getAll)
route.get('/:id', controller.getOne)
route.get('/:id/get-products', controller.getProducts)
route.post('/', controller.create)
route.patch('/:id/add-product', controller.addProduct)
route.delete('/', controller.remove)

export default route