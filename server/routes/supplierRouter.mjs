import express from 'express'
const router = new express()
import { supplierController } from '../controllers/supplierController.mjs'

router.get('/get-token', supplierController.getToken)
router.patch('/update-categories', supplierController.UpdateCategories)
router.patch('/update-products', supplierController.updateProducts)

export default router