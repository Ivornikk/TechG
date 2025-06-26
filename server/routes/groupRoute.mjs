import express from 'express'
import controller from '../controllers/groupController.mjs'

const route = new express()
route.get('/', controller.getAll)
route.post('/', controller.create)
route.delete('/', controller.remove)

export default route