import express from 'express'
import userRouter from './userRoute.mjs'

const route = express()
route.use('/user', userRouter)

export default route