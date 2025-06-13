import express from 'express'
import userRouter from './userRoute.mjs'
import productRouter from './productRoute.mjs'

const route = new express()
route.use('/user', userRouter)
route.use('/product', productRouter)

export default route