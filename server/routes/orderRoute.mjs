import express from 'express'
import controller from '../controllers/orderController.mjs'

const route = new express()
route.get('/', controller.getAll)
route.get('/:id', controller.getOne)
route.post('/', controller.create)
route.delete('/', controller.remove)

export default route