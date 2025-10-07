import express from 'express'
import { stripeController } from '../controllers/stripeController.mjs'

const router = new express()

router.post('/create-intent', stripeController.createIntent)

export default router