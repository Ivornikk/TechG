const MyOrders = () => {

    const orders = [
        {
            id: 1,
            products: [
                {
                    id: 1,
                    name: 'Xiaomi Smart Camera C500 Dual 4MP UHD,BHR8755EU' ,
                    quantity: 2,
                    price: 12.43,
                    shippingDate: 'Jun 26th 2025',
                    orderNo: 132857
                }
            ],
            OrderTime: '2025-06-19 13:43:58',
            Address: {
                    id: 1,
                    firstName: "Ivelin",
                    lastName: "Metodiev",
                    phone: '0895757519',
                    addressLine: 'Burgas, Meden Rudnik Vustanicheska 487',
                    country: 'Bulgaria',
                    region: 'Burgas',
                    City: 'Burgas',
                    ZIP: '5000'
                },
            status: 'pending'
        },
        {
            id: 2,
            products: [
                {
                    id: 1,
                    name: 'Xiaomi Smart Camera C500 Dual 4MP UHD,BHR8755EU' ,
                    quantity: 2,
                    price: 12.43,
                    shippingDate: 'Jun 26th 2025',
                    orderNo: 132857
                },
                {
                    id: 2,
                    name: 'Xiaomi Smart Camera C500 Dual 4MP UHD,BHR8755EU' ,
                    quantity: 2,
                    price: 12.43,
                    shippingDate: 'Jun 26th 2025',
                    orderNo: 132857
                },
            ],
            OrderTime: '2025-06-19 13:43:58',
            Address: {
                    id: 1,
                    firstName: "Ivelin",
                    lastName: "Metodiev",
                    phone: '0895757519',
                    addressLine: 'Burgas, Meden Rudnik Vustanicheska 487',
                    country: 'Bulgaria',
                    region: 'Burgas',
                    City: 'Burgas',
                    ZIP: '5000'
                },
            status: 'pending'
        }
    ]

    const estimateOrderCost = (orderId) => {
        const targetOrder = orders.filter(order => order.id == orderId)
        let sum = 0
        targetOrder[0].products.map(el => {
            sum = sum + (Number(el.quantity) * Number(el.price))
        })
        return sum.toFixed(2)
    }

    return (
        <div className="bg-categories shadow-xl px-10 py-3">
            <h1 className="text-[1.7em] mb-5">My Orders</h1>
            <div className="flex gap-10">
                <button className="text-[1.5em] cursor-pointer hover:underline">
                    All
                </button>
                <button className="text-[1.5em] cursor-pointer hover:underline">
                    Pending
                </button>
                <button className="text-[1.5em] cursor-pointer hover:underline">
                    Processing
                </button>
                <button className="text-[1.5em] cursor-pointer hover:underline">
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
                    orders.map(order => {
                        return (
                            order.products.length == 1 ?
                            <div key={order.id}
                                className="flex flex-col gap-3 border border-stroke">
                                <div className="grid grid-cols-6 p-3">
                                    <div className="col-span-3 flex gap-2">
                                        <img src="https://iot.ilifesmart.com/data/watermark/20200527/5ecdbf16240dd.jpg"
                                            className="w-[150px]"></img>
                                        <div className="flex flex-col gap-3">
                                            <p>{order.products[0].name}</p>
                                            <p>{order.products[0].quantity} pcs</p>
                                            <p>{order.products[0].price} $ x{order.products[0].quantity}</p>
                                            <p>Delivery expected before {order.products[0].shippingDate}</p>
                                        </div>
                                    </div>
                                    <h3 className="text-[1.2em]">
                                        {(order.products[0].price * order.products[0].quantity).toFixed(2)} $
                                    </h3>
                                    <h3 className="text-[1.2em]">
                                        {order.status}
                                    </h3>
                                    <button className="text-xl bg-brand border border-brand text-white h-[40%] py-2 rounded-xl cursor-pointer hover:bg-categories hover:text-brand transition">
                                        Cancel order
                                    </button>
                                </div>
                                <hr className="border-stroke w-full" />
                                <div className="flex gap-10 p-3">
                                    <p>Order No: {order.products[0].orderNo}</p>
                                    <p>Order Time: {order.OrderTime}</p>
                                    <p>Order Address: {order.Address.firstName} {order.Address.lastName}</p>
                                </div>
                            </div>
                            :
                                <div key={order.id}
                                    className="border border-stroke">
                                    <div className="grid grid-cols-6 flex items-center p-5">
                                        <div className="col-span-3 flex flex-col gap-2">
                                            <p>Order Time: {order.OrderTime}</p>
                                            <p>Order Address: {order.Address.firstName} {order.Address.lastName}</p>
                                        </div>
                                        <h2 className="text-xl">
                                            {estimateOrderCost(order.id)} $
                                        </h2>
                                        <h3 className="text-[1.2em]">
                                            {order.status}
                                        </h3>
                                        <button className="text-xl bg-brand border border-brand text-white py-2 rounded-xl cursor-pointer hover:bg-categories hover:text-brand transition">
                                            Cancel order
                                        </button>
                                    </div>
                                    <hr className="border-stroke w-full" />
                                    <ul>
                                        {
                                            order.products.map(product => {
                                                return (
                                                    <li key={product.id}
                                                        className="flex flex-col gap-5">
                                                        <div className="gap-3 grid grid-cols-6 p-5">
                                                            <div className="col-span-3 flex gap-2">
                                                                <img src="https://iot.ilifesmart.com/data/watermark/20200527/5ecdbf16240dd.jpg"
                                                                    className="w-[150px]"></img>
                                                                <div className="flex flex-col gap-3">
                                                                    <p>{product.name}</p>
                                                                    <p>{product.quantity} pcs</p>
                                                                    <p>{product.price} $ x{product.quantity}</p>
                                                                    <p>Delivery expected before {product.shippingDate}</p>
                                                                </div>
                                                            </div>
                                                            <h3 className="text-[1.2em]">
                                                                {(product.price * product.quantity).toFixed(2)} $
                                                            </h3>
                                                        </div>
                                                        <hr className="border-stroke w-full" />
                                                        <p className="px-5">Order No: {order.products[0].orderNo}</p>
                                                        <hr className="border-stroke w-full" />
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
}

export default MyOrders