import ApiError from '../errors/ApiError.mjs'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET)

class StripeController {

    async createIntent(req, res, next) {
        try {
            const { amount, currency, description } = req.body

            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency,
                description,
                automatic_payment_methods: { enabled: true }
            })

            return res.json({ clientSecret: paymentIntent.client_secret})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

}

export const stripeController = new StripeController()