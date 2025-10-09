'use client'

import { deleteOrder, fetchAllOrders } from "@/app/http/OrderAPI"
import { StoreContext } from "@/app/store/StoreProvider"
import { DownArrow, UpArrow } from "@/app/utils/symbols"
import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"
import dayjs from "dayjs"
import EditTrackingNumber from "@/app/components/forms/editTrackingNumber"
import EditOrderStatus from "@/app/components/forms/editOrderStatus"

const Orders = observer(() => {
    const {order} = useContext(StoreContext)

    const [sort, setSort] = useState(['createdAt', 'ASC'])
    const [trackingNumFilter, setTrackingNumfilter] = useState('all')
    const [statusFilter, setStatusFilter] = useState('all')
    const [trackEditing, setTrackEditing] = useState({orderId: 0, state: false})
    const [statusEditing, setStatusEditing] = useState({orderId: 0, state: false})

    const refreshOrders = async () => {
        const data = await fetchAllOrders({
            page: 1, limit: 10, sort: sort, filter: {
                trackingNum: trackingNumFilter,
                status: statusFilter
            }
        })
        order.setOrders(data.rows)
        order.setOrdersCount(data.count)
    }

    const RemoveOrder = async id => {
        await deleteOrder(id)
        .then(alert('Successfully removed!'))
        refreshOrders()
        
    }

    useEffect(() => {
        refreshOrders()
    }, [sort, trackingNumFilter, statusFilter])

    return (
        <div className="max-w-[1300px] flex flex-col gap-5">
            <div className="bg-categories shadow-xl my-5 p-5 flex gap-10">
                <div>
                    <h3 className="text-gray-text text-md">Sort by:</h3>
                    <div className="flex gap-5 text-[1.3em] my-2">
                        <button className={`hover:underline cursor-pointer flex`}
                            onClick={() => setSort(['createdAt', sort[1]=='ASC'?'DESC':'ASC'])}>
                            Date ({sort[1]=='ASC'?<UpArrow />:<DownArrow />})
                        </button>
                    </div>
                </div>
                <div>
                    <h3 className="text-gray-text text-md">Filter:</h3>
                    <div className="flex  gap-5 text-[1.1em] my-2">
                        <div className="flex flex-col">
                            <label className="text-gray-text text-sm">Tracking number</label>
                            <select className="border border-black rounded p-1"
                                onChange={e => {setTrackingNumfilter(e.target.value)}}>
                                <option
                                    value={'all'}>
                                    All
                                </option>
                                <option
                                    value={false}>
                                    Without tracking number
                                </option>
                                <option
                                    value={true}>
                                    With tracking number
                                </option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-text text-sm">Status</label>
                            <select className="border border-black rounded p-1"
                                onChange={e => {setStatusFilter(e.target.value)}}>
                                <option
                                    value={'all'}>
                                        All
                                </option>
                                <option
                                    value={'Payment pending'}>
                                    Payment pending
                                </option>
                                <option
                                    value={'pending'}>
                                    pending
                                </option>
                                <option
                                    value={'processing'}>
                                    processing
                                </option>
                                <option
                                    value={'shipped'}>
                                    shipped
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="text-[2em] text-center">{order.ordersCount} Results</h1>
            <div className="bg-categories shadow-xl my-5 p-5">
                <ul className="flex flex-col gap-5">
                    { order.orders.length == 0 ?
                        <div className="text-[2em] flex justify-center items-center p-20">
                            No Orders Found
                        </div>
                        :
                        order.orders.map(order => {
                            return (
                                <li key={order.id}
                                    className="border border-stroke p-5 text-xl">
                                        <div className="flex gap-3">
                                        <h2 className="text-[1.2em] my-5">Order ID: {order.id}</h2>
                                        <button className="px-5 bg-brand border border-brand text-white rounded-xl cursor-pointer hover:bg-white hover:text-brand transition"
                                            onClick={() => RemoveOrder(order.id)}>
                                            Delete order
                                        </button>
                                        </div>
                                    <div className="grid grid-rows-3 grid-flow-col-dense">
                                        <div>User id: {order.userId}</div>
                                        <div>Status: {order.status}</div>
                                        <div>Date: {dayjs(order.createdAt).format("DD.MM.YYYY HH:mm")}</div>
                                        <div>Tracking Number: {order.trackingNumber || 'N/A'}</div>
                                        <div>Payment Method: {order.paymentMethod}</div>
                                        <div>Address id: {order.addressId}</div>
                                        <button className="my-3 px-4 py-1 bg-brand text-white border border-brand rounded-xl cursor-pointer hover:text-brand hover:bg-white transition">
                                            Order details
                                        </button>
                                        { trackEditing.orderId == order.id && trackEditing.state ?
                                            <EditTrackingNumber orderId={order.id} onHide={() => setTrackEditing({orderId: 0, state: false})} fetchOrders={refreshOrders} />
                                            :
                                            <button className="my-3 px-4 py-1 bg-brand text-white border border-brand rounded-xl cursor-pointer hover:text-brand hover:bg-white transition"
                                                onClick={() => setTrackEditing({orderId: order.id, state: true})}>
                                                {order.trackingNumber ? 'Edit' : 'Add'} tracking number
                                            </button>
                                        }
                                        { statusEditing.orderId == order.id && statusEditing.state ?
                                            <EditOrderStatus orderId={order.id} onHide={() => setStatusEditing({orderId: 0, state: false})} fetchOrders={refreshOrders} />
                                            :    
                                            <button className="my-3 px-4 py-1 bg-brand text-white border border-brand rounded-xl cursor-pointer hover:text-brand hover:bg-white transition"
                                                onClick={() => setStatusEditing({orderId: order.id, state: true})}>
                                                Change status
                                            </button>
                                        }
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
})

export default Orders