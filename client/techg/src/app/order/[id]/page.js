'use client'

import { deleteOrder, fetchOneOrder } from "@/app/http/OrderAPI"
import { StoreContext } from "@/app/store/StoreProvider"
import { observer } from "mobx-react-lite"
import { redirect, useParams } from "next/navigation"
import { useContext, useEffect, useState } from "react"


const Order = observer(() => {
    const {id} = useParams()
    const {order} = useContext(StoreContext)
    const [address, setAddress] = useState({})
    const [items, setItems] = useState([])

    useEffect(() => {
        fetchOneOrder(id)
        .then(data => {
            order.setCurrentOrder(data)
            setAddress(data.address)
            setItems(data.items)
        })
    }, [])

    const removeOrder = () =>  {
        deleteOrder(id)
        .then(data => {
            alert(data.message)
        })
        .finally(() => redirect('/account/my-orders'))
    }

    const estimateOrderCost = () => {
        let sum = 0
        order.currentOrder.items.map(item => {
            sum = sum + (Number(item.quantity) * Number(item.product.price))
        })
        return sum.toFixed(2)
    }

    return (
        <div className="max-w-[1300px] m-auto">
            <div className="bg-categories shadow-xl w-full p-10 flex items-center justify-between my-10">
                <h1 className="text-[2em]">
                    {order.currentOrder.status || 'N/A'}
                </h1>
                <div className="flex flex-col gap-4">
                    <button className="px-7 py-3 text-[1.2em] bg-button-active text-white rounded-xl border border-button-active hover:bg-categories hover:text-button-active cursor-pointer transition"
                        onClick={removeOrder}>
                        Cancel Order
                    </button>
                    { order.currentOrder.status === 'Payment pending' &&
                        <button className="px-7 py-3 text-[1.2em] bg-button-active text-white rounded-xl border border-button-active hover:bg-categories hover:text-button-active cursor-pointer transition"
                            onClick={() => redirect(`/payment/${order.currentOrder.id}`)}>
                            Pay Now
                        </button>
                    }
                </div>
            </div>
            <div className="bg-categories shadow-xl w-full p-10 my-20">
                <h1 className="text-[2em]">
                    Order Information
                </h1>
                <hr className="border-stroke w-full my-5" />
                <div className="m-auto flex gap-10 text-xl my-15">
                    <div className="flex flex-col gap-3 text-gray-text">
                        <h3>Contact Name</h3>
                        <h3>Phone Number</h3>
                        <h3>Address</h3>
                        <h3>ZIP Code</h3>
                        <h3>Payment Method</h3>
                        <h3>Tracking Number</h3>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h3>{address.firstName} {address.lastName}</h3>
                        <h3>{address.telephone}</h3>
                        <h3>{address.country}, {address.region}, {address.city}, {address.addressLine}</h3>
                        <h3>{address.ZipCode}</h3>
                        <h3>{order.currentOrder.paymentMethod}</h3>
                        <h3>{order.currentOrder.trackingNumber || 'N/A'}</h3>
                    </div>
                </div>
                <div className="mx-10 flex flex-col gap-10">
                    <div className="grid grid-cols-6 mt-10 text-label-gray">
                        <h3 className="text-[1.3em] col-span-3">Product</h3>
                        <h3 className="text-[1.3em]">Amount</h3>
                        <h3 className="text-[1.3em]">Status</h3>
                        <h3 className="text-[1.3em]">Options</h3>
                    </div>
                    <div className="border border-stroke">
                        <div className="grid grid-cols-6 flex items-center p-5">
                            <div className="col-span-3 flex flex-col gap-2">
                                <p>Order Time: {order.currentOrder.createdAt}</p>
                            </div>
                            <h2 className="text-xl">
                                {estimateOrderCost()} $
                            </h2>
                            <h3 className="text-[1.2em]">
                                {order.currentOrder.status}
                            </h3>
                            <button className="text-xl bg-brand border border-brand text-white py-2 rounded-xl cursor-pointer hover:bg-categories hover:text-brand transition"
                                onClick={removeOrder}>
                                Cancel order
                            </button>
                        </div>
                        <hr className="border-stroke w-full" />
                        <ul>
                            {
                                items.map(item => {
                                    return (
                                        <li key={item.id}
                                            className="flex flex-col gap-5">
                                            <div className="gap-3 grid grid-cols-6 p-5">
                                                <div className="col-span-3 flex gap-2">
                                                    <img src={`http://localhost:5000/${item.product.preview_image}`}
                                                        className="w-[150px]"></img>
                                                    <div className="flex flex-col gap-3">
                                                        <p>{item.product.title}</p>
                                                        <p>{item.quantity} pcs</p>
                                                        <p>{item.product.price} $ x{item.quantity}</p>
                                                        <p>Delivery expected before {item.shippingDate || 'Not estimated'}</p>
                                                    </div>
                                                </div>
                                                <h3 className="text-[1.2em]">
                                                    {item.priceAtPurchase} $
                                                </h3>
                                            </div>
                                            <hr className="border-stroke w-full" />
                                            <p className="px-5">Order No: {'N/A'}</p>
                                            <hr className="border-stroke w-full" />
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
            </div>
            </div>
        </div>
    )
})

export default Order