'use client'

import { deleteOrder, fetchOrderByUser } from "@/app/http/OrderAPI"
import { StoreContext } from "@/app/store/StoreProvider"
import { observer } from "mobx-react-lite"
import { redirect } from "next/navigation"
import { useContext, useEffect, useState } from "react"

const MyOrders = observer(() => {

    const {user, order} = useContext(StoreContext)
    console.log(user.user)
    const userId = user.user.id
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        fetchOrderByUser({
            userId: userId,
            status: filter
        })
        .then(data => {
            order.setOrders(data.rows)
            order.setOrdersCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchOrderByUser({
            userId: userId,
            status: filter
        })
        .then(data => {
            order.setOrders(data.rows)
            order.setOrdersCount(data.count)
        })
    }, [filter])

    const cancelOrder = (orderId) => {
        deleteOrder(orderId)
        .then(() => {
            fetchOrderByUser({
                userId: userId,
                status: filter
            })
            .then(data => {
                order.setOrders(data.rows)
                order.setOrdersCount(data.count)
            })
        })
    }

    const estimateOrderCost = (orderId) => {
        const targetOrder = order.orders.filter(order => order.id == orderId)
        let sum = 0
        targetOrder[0].items.map(item => {
            sum = sum + (Number(item.quantity) * Number(item.product.price))
        })
        return sum.toFixed(2)
    }

    return (
        <div className="bg-categories shadow-xl px-10 py-3">
            <h1 className="text-[1.7em] mb-5">My Orders</h1>
            <div className="flex gap-10">
                <button className="text-[1.5em] cursor-pointer hover:underline"
                    onClick={() => setFilter('all')}>
                    All
                </button>
                <button className="text-[1.5em] cursor-pointer hover:underline"
                    onClick={() => setFilter('payment pending')}>
                    Payment pending
                </button>
                <button className="text-[1.5em] cursor-pointer hover:underline"
                    onClick={() => setFilter('pending')}>
                    Pending
                </button>
                <button className="text-[1.5em] cursor-pointer hover:underline"
                    onClick={() => setFilter('processing')}>
                    Processing
                </button>
                <button className="text-[1.5em] cursor-pointer hover:underline"
                    onClick={() => setFilter('shipped')}>
                    Shipped
                </button>
            </div>
            <hr className="border-stroke w-full" />
            <div className="mx-10 flex flex-col gap-10">
                <div className="grid grid-cols-6 mt-10 text-label-gray">
                    <h3 className="text-[1.3em] col-span-3">Product</h3>
                    <h3 className="text-[1.3em]">Amount</h3>
                    <h3 className="text-[1.3em]">Status</h3>
                    <h3 className="text-[1.3em]">Options</h3>
                </div>
                {
                    order.orders.map(order => {
                        return (
                            order.items.length == 1 ?
                            <div key={order.id}
                                className="group flex flex-col gap-3 border border-stroke cursor-pointer hover:bg-stroke transition"
                                onClick={() => redirect(`/order/${order.id}`)}>
                                <div className="grid grid-cols-6 p-3">
                                    <div className="col-span-3 flex gap-2">
                                        <img src={`http://localhost:5000/${order.items[0].product.preview_image}`}
                                            className="w-[150px]"></img>
                                        <div className="flex flex-col gap-3">
                                            <p>{order.items[0].product.title}</p>
                                            <p>{order.items[0].quantity} pcs</p>
                                            <p>{order.items[0].product.price} $ x{order.items[0].quantity}</p>
                                            <p>Delivery expected before {order.items[0].shippingDate || 'Not estimated'}</p>
                                        </div>
                                    </div>
                                    <h3 className="text-[1.2em]">
                                        {order.items[0].priceAtPurchase} $
                                    </h3>
                                    <h3 className="text-[1.2em]">
                                        {order.status}
                                    </h3>
                                    <button className="text-xl bg-brand border border-brand text-white h-[40%] py-2 rounded-xl cursor-pointer hover:bg-categories hover:text-brand transition"
                                        onClick={() => cancelOrder(order.id)}>
                                        Cancel order
                                    </button>
                                </div>
                                <hr className="border-stroke w-full group-hover:border-categories" />
                                <div className="flex gap-10 p-3">
                                    <p>Order No: {order.items[0].orderNo || 'N/A'}</p>
                                    <p>Order Time: {order.createdAt}</p>
                                    <p>Order Address: {order.address.firstName} {order.address.lastName}</p>
                                </div>
                            </div>
                            :
                                <div key={order.id}
                                    className="group border border-stroke cursor-pointer hover:bg-stroke transition"
                                    onClick={() => redirect(`/order/${order.id}`)}>
                                    <div className="grid grid-cols-6 flex items-center p-5">
                                        <div className="col-span-3 flex flex-col gap-2">
                                            <p>Order Time: {order.createdAt}</p>
                                            <p>Order Address: {order.address.firstName} {order.address.lastName}</p>
                                        </div>
                                        <h2 className="text-xl">
                                            {estimateOrderCost(order.id)} $
                                        </h2>
                                        <h3 className="text-[1.2em]">
                                            {order.status}
                                        </h3>
                                        <button className="text-xl bg-brand border border-brand text-white py-2 rounded-xl cursor-pointer hover:bg-categories hover:text-brand transition"
                                            onClick={() => cancelOrder(order.id)}>
                                            Cancel order
                                        </button>
                                    </div>
                                    <hr className="border-stroke w-full group-hover:border-categories" />
                                    <ul>
                                        {
                                            order.items.map(item => {
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
                                                        <hr className="border-stroke w-full group-hover:border-categories" />
                                                        <p className="px-5">Order No: {order.items[0].orderNo || 'N/A'}</p>
                                                        <hr className="border-stroke w-full group-hover:border-categories" />
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                        )
                    })
                }
            </div>
        </div>
    )
})

export default MyOrders