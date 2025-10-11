import express from 'express'
import userRouter from './userRoute.mjs'
import productRouter from './productRoute.mjs'
import categoryRoute from './categoryRoute.mjs'
import addressRoute from './addressRoute.mjs'
import basketRoute from './basketRoute.mjs'
import orderRoute from './orderRoute.mjs'
import promotionRoute from './promotionRoute.mjs'
import promotionTypeRoute from './promotionTypeRoute.mjs'
import ratingRouter from './ratingRoute.mjs'
import wishlistRouter from './wishlistRouter.mjs'
import attributeRoute from './attributeRoute.mjs'
import stripeRoute from './stripeRoute.mjs'
import supplierRouter from './supplierRouter.mjs'

const route = new express()
route.use('/user', userRouter)
route.use('/product', productRouter)
route.use('/category', categoryRoute)
route.use('/address', addressRoute)
route.use('/basket', basketRoute)
route.use('/order', orderRoute)
route.use('/promotion', promotionRoute)
route.use('/promotion-type', promotionTypeRoute)
route.use('/rating', ratingRouter)
route.use('/wishlist', wishlistRouter)
route.use('/attribute', attributeRoute)
route.use('/payment', stripeRoute)
route.use('/supplier', supplierRouter)

export default route