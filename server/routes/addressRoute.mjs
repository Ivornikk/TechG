import express from 'express'
import controller from '../controllers/addressController.mjs'

const route = new express()
route.get('/', controller.getAll)
route.get('/:userId', controller.getByUser)
route.post('/', controller.create)
route.delete('/', controller.remove)
route.patch('/:id/edit', controller.edit)

export default route