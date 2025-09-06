'use client'

import { addTrackingNum } from "@/app/http/OrderAPI"
import { useState } from "react"

const EditTrackingNumber = ({orderId, onHide}) => {
    const [trackingNumber, setTrackingNumber] = useState('')

    const addTrackingNumber = async () => {
        try {
            const res = await addTrackingNum({id: orderId, trackingNumber})
            if (res.TrackingNumber != null) alert('Tracking number added successfully!')
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    return (
        <form className="flex gap-5 my-3"
            onSubmit={e => e.preventDefault()}>
            <input className="border border-brand px-3 rounded"
                onChange={e => setTrackingNumber(e.target.value)} />
            <button className="px-3 bg-brand text-white border border-brand rounded-xl cursor-pointer hover:bg-white hover:text-brand transition"
                onClick={addTrackingNumber}>
                Add
            </button>
            <button className="px-3 bg-brand text-white border border-brand rounded-xl cursor-pointer hover:bg-white hover:text-brand transition"
                onClick={onHide}>
                cancel
            </button>
        </form>
    )
}

export default EditTrackingNumber