import express from 'express'
import controller from '../controllers/basketController.mjs'

const route = new express()
route.get('/', controller.getAll)
route.get('/items-count-by-user', controller.getItemsCountByUser)
route.get('/:userId', controller.getOne)
route.post('/', controller.create)
route.post('/add-product', controller.addProduct)
route.delete('/remove-product', controller.removeProduct)
route.delete('/', controller.remove)

export default route