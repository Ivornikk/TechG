import express from 'express'
import controller from '../controllers/attributeController.mjs'

const route = new express()

route.get('/', controller.getByGroup)
route.post('/', controller.create)
route.delete('/', controller.deleteAttribute)

export default route