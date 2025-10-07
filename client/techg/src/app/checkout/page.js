'use client'

import { useContext, useEffect, useState } from "react"
import AddressCardCheckout from "../components/addressCardCheckout"
import { StoreContext } from "../store/StoreProvider"
import { fetchOneBasket } from "../http/BasketAPI"
import { observer } from "mobx-react-lite"
import { createOrder } from "../http/OrderAPI"
import { redirect } from "next/navigation"
const Checkout = observer(() => {
    
    const {basket, user} = useContext(StoreContext)
    const userId = user.user.id
    const [addressId, setAddressId] = useState(0)

    useEffect(() => {
        fetchOneBasket(userId).then(data => {
            basket.setItems(data[0].products)
        })
    }, [])

    const discounts = [
        {id: 1, name: 'New User Bonus', percentage: 10},
        {id: 2, name: 'Summer Discount', percentage: 5},
    ]

    // Price at purchase without any discounts
    const estimateSubtotal = () => {
        let sum = 0
        basket.items.map(product => {
            sum = sum + (Number(product.shippingFee) + Number(product.quantity) * Number(product.price))
        })
        return sum.toFixed(2)
    }

    const subTotal = estimateSubtotal()
    
    // Price at purchase with discounts
    const estimateTotal = () => {
        let res = Number(subTotal)

        let discountsPercentage = 0
        discounts.forEach(el => discountsPercentage += el.percentage)

        res -= res * (discountsPercentage / 100)

        return res.toFixed(2)
    }

    const placeOrder = () => {
        if (addressId == 0) {
            alert("Please, select address")
            return
        }
        const products = basket.items
        products.flatMap(product => {
            product.priceAtPurchase = (Number(product.price) * Number(product.quantity)).toFixed(2)
            return product
        })
        createOrder({
            status: "Payment pending",
            paymentMethod: "Online payment",
            userId: userId,
            addressId: addressId,
            products: products
        })
        .then(() => redirect('/payment'))
    }
    return (
        <div className="max-w-1600 m-auto">
            <h1 className="text-[2em] ml-20">Checkout</h1>
            <div className="grid grid-cols-4 gap-10 my-10 mx-20">
                <div className="col-span-3">
                    <AddressCardCheckout setSelectedAddressId={setAddressId} />
                    <div className="flex gap-5 py-5 items-center px-20 shadow-xl bg-categories my-10">
                        <h2 className="text-[1.5em]">Payment method</h2>
                        <div className="border border-brand px-10 py-5 rounded-xl text-xl">
                            Online payment
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 py-5 items-center px-20 shadow-xl bg-categories my-10">
                        <h2 className="text-[1.5em]">Order Previews</h2>
                        <ul className="w-full flex flex-col gap-5">
                            {
                                basket.items.map(product => {
                                    return (
                                        <li key={product.id}
                                        className="w-full">
                                            <hr className="border-stroke w-full mb-10" />
                                            <div className="grid grid-rows-3 grid-cols-4 grid-flow-col-dense">
                                                <img src={`${process.env.NEXT_PUBLIC_STATIC_BASE_URL}/${product.preview_image}`}
                                                    className="row-span-3 w-[200px]"></img>
                                                <h3 className="text-xl">{product.title.substring(0, 50) + `${product.title.length > 50?'...':''}`}</h3>
                                                <ul className="flex gap-5">
                                                    {/* Attributes */}
                                                </ul>
                                                <h3 className="flex items-center text-xl">{product.price}$</h3>
                                                <h3 className="col-span-3 flex justify-end text-2xl">x{product.quantity}</h3>
                                            </div>
                                            <div className="flex flex-row justify-end gap-10 text-lg">
                                                <div className="flex flex-col justify-between">
                                                    <h4>{product.quantity} {product.quantity == 1 ? 'item' : 'items'}</h4>
                                                    <h4>Shipping: Special economic shipping/Estimated delivery: {product.shippingDate}</h4>
                                                    <h4>Subtotal:</h4>
                                                </div>
                                                <div className="flex flex-col justify-between items-end">
                                                    <h4>{(Number(product.quantity) * Number(product.price)).toFixed(2)}$</h4>
                                                    <h4>
                                                        {Number(product.shippingFee) || 'not estimated'}{!product.shippingFee || '$'}
                                                    </h4>
                                                    <h4 className="mt-2">
                                                        {(Number(product.quantity) * Number(product.price)).toFixed(2)}$
                                                    </h4>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="bg-categories shadow-xl h-100 py-5 px-5 text-lg flex flex-col">
                    <h2 className="text-[2em] text-center mb-5">Total</h2>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col justify-between">
                            <h3>Subtotal:</h3>
                            <div className="mt-1">
                                {
                                    discounts.map(discount => {
                                        return <h3 key={discount.id}>{discount.name}</h3>
                                    })
                                }
                            </div>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <h3>{subTotal}$</h3>
                            <div className="mt-1">
                                {
                                    discounts.map(discount => {
                                        return <h3 key={discount.id}>
                                            -{(subTotal * (discount.percentage / 100)).toFixed(2)}$
                                            </h3>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <hr className="border-stroke w-full my-3" />
                    <div className="flex justify-between text-2xl">
                        <h3>Total:</h3>
                        <h3>{estimateTotal()}$</h3>
                    </div>
                    <button className="mt-10 text-center bg-button-active border border-button-active text-white rounded-xl w-full py-4 text-xl hover:bg-categories hover:text-brand cursor-pointer transition"
                        onClick={placeOrder}>
                        Place order
                    </button>
                </div>
            </div>
        </div>
    )
})

export default Checkout