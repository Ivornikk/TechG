'use client'

import { useState } from "react"
import AddressCardCheckout from "../components/addressCardCheckout"
import Link from "next/link"
const Checkout = () => {
    
    const products = [
        { id: 1, quantity: 2, attributes: 
            [
                {id: 4, name: 'color', value: 'red'},
                {id: 2, name: 'RAM', value: '64GB'},
            ],
             price: 13.54, shippingDate: 'Aug 25th 2025', shippingFee: 2.14, name: 'Samsung Galaxy S25 Pro Max', img: 'https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25626687/DSC08433.jpg?quality=90&strip=all&crop=16.675%2C0%2C66.65%2C100&w=2400' },
        { id: 2, quantity: 1, attributes: 
            [
                {id: 4, name: 'color', value: 'red'},
                {id: 2, name: 'RAM', value: '64GB'},
            ],
             price: 24.64, shippingDate: 'Aug 27th 2025', shippingFee: 2.14, name: 'Xiaomi Realme C55', img: 'https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25626687/DSC08433.jpg?quality=90&strip=all&crop=16.675%2C0%2C66.65%2C100&w=2400' },
        { id: 3, quantity: 5, attributes: 
            [
                {id: 4, name: 'color', value: 'white'},
                {id: 2, name: 'RAM', value: '32GB'},
            ],
             price: 17.05, shippingDate: 'Aug 24th 2025', shippingFee: 2.14, name: 'Sony Xperia', img: 'https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25626687/DSC08433.jpg?quality=90&strip=all&crop=16.675%2C0%2C66.65%2C100&w=2400' },
        { id: 4, quantity: 4, attributes: 
            [
                {id: 4, name: 'color', value: 'black'},
                {id: 2, name: 'RAM', value: '128GB'},
            ],
             price: 56.73, shippingDate: 'Aug 25th 2025', shippingFee: 2.14, name: 'Iphone 15 Pro', img: 'https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25626687/DSC08433.jpg?quality=90&strip=all&crop=16.675%2C0%2C66.65%2C100&w=2400' },
    ]

    const discounts = [
        {id: 1, name: 'New User Bonus', percentage: 10},
        {id: 2, name: 'Summer Discount', percentage: 5},
    ]

    // Price at purchase without any discounts
    const estimateSubtotal = () => {
        let sum = 0
        products.map (product => {
            sum = sum + (Number(product.shippingFee) + Number(product.quantity) * Number(product.price))
        })
        return sum.toFixed(2)
    }

    const subTotal = estimateSubtotal()
    
    // Price at purchase with discounts
    const estimateTotal = () => {
        let res = Number(subTotal)

        let discountsPercentage = 0
        discounts.map(el => discountsPercentage += el.percentage)

        res -= res * (discountsPercentage / 100)

        return res.toFixed(2)
    }
    return (
        <div className="max-w-1600 m-auto">
            <h1 className="text-[2em] ml-20">Checkout</h1>
            <div className="grid grid-cols-4 gap-10 my-10 mx-20">
                <div className="col-span-3">
                    <AddressCardCheckout />
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
                                products.map(product => {
                                    return (
                                        <li key={product.id}
                                        className="w-full">
                                            <hr className="border-stroke w-full mb-10" />
                                            <div className="grid grid-rows-3 grid-cols-4 grid-flow-col-dense">
                                                <img src={product.img}
                                                    className="row-span-3 w-[200px]"></img>
                                                <h3 className="text-xl">{product.name}</h3>
                                                <ul className="flex gap-5">
                                                    {
                                                        product.attributes.map(attribute => {
                                                            return (
                                                                <li key={attribute.id}
                                                                    className="px-3 py-1 bg-brand text-white rounded-xl flex justify-center items-center">
                                                                    {attribute.name}: {attribute.value}
                                                                </li>
                                                            )
                                                        })
                                                    }
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
                                                    <h4>{Number(product.quantity) * Number(product.price)}$</h4>
                                                    <h4>{Number(product.shippingFee)}$</h4>
                                                    <h4 className="mt-2">
                                                        {(Number(product.shippingFee) + Number(product.quantity) * Number(product.price)).toFixed(2)}$
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
                    <Link href={'/payment'}
                        className="mt-10 text-center bg-brand border border-brand text-white rounded-xl w-full py-4 text-xl hover:bg-categories hover:text-brand cursor-pointer transition">
                        Place order
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Checkout