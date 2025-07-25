import express from 'express'
import controller from '../controllers/wishlistController.mjs'

const route = new express()
route.get('/', controller.getAll)
route.get('/:id', controller.getOne)
route.post('/', controller.create)

export default route