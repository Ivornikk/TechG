import express from 'express'
import controller from '../controllers/userController.mjs'
import authMiddleware from '../middlewares/authMiddleware.mjs'

const route = new express()
route.post('/registration', controller.registration)
route.post('/login', controller.login)
route.get('/auth', authMiddleware, controller.check)
route.get('/get-all', controller.getAll)
route.delete('/log-out', controller.logOut)
route.patch('/:id/edit', controller.edit)

export default route