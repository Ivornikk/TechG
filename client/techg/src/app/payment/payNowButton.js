'use client'

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { createIntent } from "../http/paymentAPI"
import { useContext } from "react"
import { StoreContext } from "../store/StoreProvider"

const PayNowButton = () => {
    const stripe = useStripe()
    const elements = useElements()
    const { user } = useContext(StoreContext)

    const pay = async () => {

        const amount = 1200
        const currency = 'eur'
        const description = "Test"
        const data = await createIntent({ amount, currency, description})
        const clientSecret = data.data.clientSecret
        const cardElement = elements.getElement(CardElement)
        console.log(cardElement)
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: user.user.username
                }
            }
        })

        if (error) {
            alert(error.message)
        } else if (paymentIntent.status === 'succeeded')
            alert("Success!")
    }

    return (
            <button className="mt-10 text-center bg-brand border border-brand text-white rounded-xl w-full py-4 text-xl hover:bg-categories hover:text-brand cursor-pointer transition"
                onClick={pay}>
                Pay Now
            </button>
    )
}

export default PayNowButton