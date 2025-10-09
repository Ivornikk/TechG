import express from 'express'
import controller from '../controllers/userController.mjs'
import authMiddleware from '../middlewares/authMiddleware.mjs'

const route = new express()
route.post('/registration', controller.registration)
route.post('/login', controller.login)
route.get('/auth', authMiddleware, controller.check)
route.get('/get-all', controller.getAll)
route.delete('/', controller.remove)
route.delete('/log-out', controller.logOut)
route.patch('/:id/edit', controller.edit)
route.patch('/change-country', controller.changeCountry)
route.patch('/change-currency', controller.changeCurrency)

export default route