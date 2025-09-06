"use client"

import { deleteOrder } from "@/app/http/OrderAPI"
import { useRouter } from "next/navigation"

export default function OrderActions({ orderId, status, inline }) {
  const router = useRouter()

  const removeOrder = async () => {
    const res = await deleteOrder(orderId)
    alert(res.message)
    router.push("/account/my-orders")
  }

  return (
    <div className={inline ? "flex gap-3" : "flex flex-col gap-4"}>
      <button
        onClick={removeOrder}
        className="px-7 py-3 text-[1.2em] bg-button-active text-white rounded-xl border border-button-active hover:bg-categories hover:text-button-active cursor-pointer transition"
      >
        Cancel Order
      </button>

      {status === "Payment pending" && (
        <button
          onClick={() => router.push(`/payment/${orderId}`)}
          className="px-7 py-3 text-[1.2em] bg-button-active text-white rounded-xl border border-button-active hover:bg-categories hover:text-button-active cursor-pointer transition"
        >
          Pay Now
        </button>
      )}
    </div>
  )
}
