'use client'

import { EditStatus } from "@/app/http/OrderAPI"
import { useState } from "react"

const EditOrderStatus = ({orderId, onHide, fetchOrders}) => {
    const [status, setStatus] = useState('')

    const editStatus = async () => {
        try {
            await EditStatus({id: orderId, status})
            alert('Status changed successfully!')
            fetchOrders()
            onHide()

        } catch (err) {
            alert(err.response.data.message)
        }
    }

    return (
        <form className="flex gap-3 my-3"
            onSubmit={e => e.preventDefault()}>
            <input className="border border-brand px-3 rounded"
                onChange={e => setStatus(e.target.value)} />
            <button className="px-3 bg-brand text-white border border-brand rounded-xl cursor-pointer hover:bg-white hover:text-brand transition"
                onClick={editStatus}>
                Change
            </button>
            <button className="px-3 bg-brand text-white border border-brand rounded-xl cursor-pointer hover:bg-white hover:text-brand transition"
                onClick={onHide}>
                cancel
            </button>
        </form>
    )
}

export default EditOrderStatus