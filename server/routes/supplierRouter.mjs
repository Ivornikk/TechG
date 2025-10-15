import express from 'express'
const router = new express()
import { supplierController } from '../controllers/supplierController.mjs'

router.get('/get-token', supplierController.getToken)
router.patch('/update-categories', supplierController.UpdateCategories)
router.patch('/update-products', supplierController.updateProducts)
router.patch('/update-one-product', supplierController.updateOneProduct)
router.post('/place-order', supplierController.createOrder)

export default router