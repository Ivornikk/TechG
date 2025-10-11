import express from 'express'
import controller from '../controllers/categoryController.mjs'

const route = new express()
route.get('/', controller.getFirstThreeLayers)
route.get('/:id', controller.getOne)
route.post('/', controller.create)
route.delete('/', controller.remove)

export default route