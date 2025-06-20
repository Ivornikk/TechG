import express from 'express'
import controller from '../controllers/userController.mjs'

const route = new express()
route.post('/registration', controller.registration)
route.post('/login', controller.login)
route.get('/auth', controller.check)

export default route