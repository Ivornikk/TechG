import express from 'express'
import controller from '../controllers/wishlistController.mjs'

const route = new express()
route.get('/', controller.getAll)
route.get('/:userId', controller.getOne)
route.get('/:productId/get-favorites', controller.getFavorites)
route.post('/', controller.create)
route.post('/add-product', controller.addProduct)
route.delete('/remove-product', controller.removeProduct)
route.delete('/:userId', controller.remove)

export default route