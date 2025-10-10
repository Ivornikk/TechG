import express from 'express'
const router = new express()
import { supplierController } from '../controllers/supplierController.mjs'

router.get('/get-token', supplierController.getToken)
router.patch('/updateCategories', supplierController.UpdateCategories)

export default router