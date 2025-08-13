import Link from "next/link"

const Cart = () => {
    const products = [
        {id: 1, quantity: 2, price: 13.54, shippingDate: 'Aug 25th 2025', name: 'Samsung Galaxy S25 Pro Max', img: 'https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25626687/DSC08433.jpg?quality=90&strip=all&crop=16.675%2C0%2C66.65%2C100&w=2400'},
        {id: 2, quantity: 1, price: 24.64, shippingDate: 'Aug 27th 2025', name: 'Xiaomi Realme C55', img: 'https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25626687/DSC08433.jpg?quality=90&strip=all&crop=16.675%2C0%2C66.65%2C100&w=2400'},
        {id: 3, quantity: 5, price: 17.05, shippingDate: 'Aug 24th 2025', name: 'Sony Xperia', img: 'https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25626687/DSC08433.jpg?quality=90&strip=all&crop=16.675%2C0%2C66.65%2C100&w=2400'},
        {id: 4, quantity: 4, price: 56.73, shippingDate: 'Aug 25th 2025', name: 'Iphone 15 Pro', img: 'https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25626687/DSC08433.jpg?quality=90&strip=all&crop=16.675%2C0%2C66.65%2C100&w=2400'},
    ]

    const estimateTotalPrice = () => {
        let sum = 0
        products.map(product => {
            sum += product.price
        })
        return sum.toFixed(2)
    }

    return (
        <div className="max-w-[1600px] m-auto">
            <h1 className="text-[2.5em]">Shopping cart</h1>
            <div className="grid grid-cols-4 gap-5">
                <div className="bg-categories shadow-xl my-10 col-span-3">
                    <ul className="flex flex-col p-5 gap-5">
                        {
                            products.map(product => {
                                return (
                                    <li key={product.id}
                                        className="grid grid-cols-5 grid-rows-4 grid-flow-col-dense">
                                            <img className="w-[200px] row-span-4"
                                                src={product.img}></img>
                                            <h2 className="text-[1.2em] col-span-3">{product.name}</h2>
                                            <p className=" col-span-3">Estimated delivery time: {product.shippingDate}</p>
                                            <div className="flex items-center row-span-2 col-span-3">
                                                <h2 className="text-[1.4em]">${product.price}</h2>
                                            </div>

                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="w-100 h-100 bg-categories shadow-xl">
                    <h1 className="text-[1.8em] text-center my-5">Order Summary</h1>
                    <div className="flex justify-between mx-10 text-[1.2em]">
                        <p>Subtotal</p>
                        <p>{estimateTotalPrice()}</p>
                    </div>
                    <hr className="border-stroke mx-7 my-2"></hr>
                    <div className="flex justify-between mx-10 text-[1.3em]">
                        <p>Total</p>
                        <p>{estimateTotalPrice()}</p>
                    </div>
                    <Link href={'/checkout'}
                          className="py-3 px-5 flex cursor-pointer justify-self-center rounded-xl border hover:border-button-active bg-button-active text-white hover:bg-categories hover:text-button-active transition">
                        Proceed to checkout
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Cart