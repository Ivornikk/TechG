// app/orders/[id]/page.js
import { fetchOneOrder } from "@/app/http/OrderAPI"
import OrderActions from "./OrderActions"

export default async function OrderPage({ params }) {
  const order = await fetchOneOrder(params.id)
  const address = order.address || {}
  const items = order.items || []

  const estimateOrderCost = () => {
    let sum = 0
    order.items.forEach(item => {
      sum += Number(item.quantity) * Number(item.product.price)
    })
    return sum.toFixed(2)
  }

  return (
    <div className="max-w-[1300px] m-auto">
      <div className="bg-categories shadow-xl w-full p-10 flex items-center justify-between my-10">
        <h1 className="text-[2em]">{order.status || "N/A"}</h1>

        <OrderActions orderId={order.id} status={order.status} />
      </div>

      <div className="bg-categories shadow-xl w-full p-10 my-20">
        <h1 className="text-[2em]">Order Information</h1>
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
            <h3>{order.paymentMethod}</h3>
            <h3>{order.trackingNumber || "N/A"}</h3>
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
                <p>Order Time: {order.createdAt}</p>
              </div>
              <h2 className="text-xl">{estimateOrderCost()} $</h2>
              <h3 className="text-[1.2em]">{order.status}</h3>

              <OrderActions orderId={order.id} status={order.status} inline />
            </div>

            <hr className="border-stroke w-full" />
            <ul>
              {items.map(item => (
                <li key={item.id} className="flex flex-col gap-5">
                  <div className="gap-3 grid grid-cols-6 p-5">
                    <div className="col-span-3 flex gap-2">
                      <img
                        src={process.env.NEXT_PUBLIC_STATIC_BASE_URL + item.product.preview_image}
                        className="w-[150px]"
                      />
                      <div className="flex flex-col gap-3">
                        <p>{item.product.title}</p>
                        <p>{item.quantity} pcs</p>
                        <p>{item.product.price} $ x{item.quantity}</p>
                        <p>Delivery expected before {item.shippingDate || "Not estimated"}</p>
                      </div>
                    </div>
                    <h3 className="text-[1.2em]">{item.priceAtPurchase} $</h3>
                  </div>
                  <hr className="border-stroke w-full" />
                  <p className="px-5">Order No: N/A</p>
                  <hr className="border-stroke w-full" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
