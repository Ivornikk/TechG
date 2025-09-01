'use client'
import Link from "next/link"
import QuantityCounter from "../components/quantityCounter"
import { useContext, useEffect } from "react"
import { StoreContext } from "../store/StoreProvider"
import { getOneBasket, removeProductFromBasket } from "../http/BasketAPI"
import { observer } from "mobx-react-lite"
import { redirect } from "next/navigation"

const Cart = observer(() => {

    const {user, basket} = useContext(StoreContext)
    useEffect(() => {
        getOneBasket(user.user.id).then(data => {
            basket.setItems(data[0].products)
        })
    }, [])

    const estimateTotalPrice = () => {
        let sum = 0
        basket.items.map(item => {
            sum += item.price * item.quantity
        })
        return sum.toFixed(2)
    }

    const deleteItem = id => {
        removeProductFromBasket({userId: user.user.id, productId: id})
        .then(() => {
            getOneBasket(user.user.id).then(data => {
                basket.setItems(data[0].products)
            })
        })
    }

    return (
        <div className="max-w-[1600px] m-auto">
            <h1 className="text-[2.5em]">Shopping cart</h1>
            <div className="grid grid-cols-4 gap-5">
                <div className="bg-categories shadow-xl my-10 col-span-3">
                    {
                        basket.items.length === 0 ?
                        <div className="m-auto w-full h-full flex items-center justify-center">
                            <div className="flex flex-col gap-5">
                                <h1 className="text-[2em] text-gray-text">
                                    There are no itmes in your cart
                                </h1>
                                <button className="py-2 text-[1.5em] bg-brand border border-brand text-white rounded-xl cursor-pointer hover:bg-white hover:text-brand transition"
                                    onClick={() => redirect('/')}>
                                    Go back shopping
                                </button>
                            </div>
                        </div>
                        :
                        <ul className="flex flex-col p-5 gap-5">
                        {
                            basket.items.map(item => {
                                return (
                                    <li key={item.id}
                                        className="grid grid-cols-5 grid-rows-4 grid-flow-col-dense">
                                        <img className="w-[200px] row-span-4"
                                            src={`http://192.168.1.2:5000/${item.preview_image}`}></img>
                                        <h2 className="text-[1.2em] col-span-3">{item.title}</h2>
                                        <p className=" col-span-3">Estimated delivery time: {item.shippingDate || 'Not estimated'}</p>
                                        <div className="flex items-center row-span-2 col-span-3">
                                            <h2 className="text-[1.4em]">${item.price}</h2>
                                        </div>
                                        <QuantityCounter defaultValue={item.quantity} productId={item.id} />
                                        <button className="flex justify-end row-span-3"
                                            onClick={() => deleteItem(item.id)}>
                                            <img
                                                className="w-[30px] cursor-pointer"
                                                src="/binIcon.svg"
                                            ></img>
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    }
                </div>
                <div className="w-100 h-100 bg-categories shadow-xl">
                    <h1 className="text-[1.8em] text-center my-5">Order Summary</h1>
                    <div className="flex justify-between mx-10 text-[1.2em]">
                        <p>Subtotal</p>
                        <p>${estimateTotalPrice()}</p>
                    </div>
                    <hr className="border-stroke mx-7 my-2"></hr>
                    <div className="flex justify-between mx-10 text-[1.3em]">
                        <p>Total</p>
                        <p>${estimateTotalPrice()}</p>
                    </div>
                    <Link href={'/checkout'}
                        className="py-3 px-5 flex cursor-pointer justify-self-center rounded-xl border hover:border-button-active bg-button-active text-white hover:bg-categories hover:text-button-active transition">
                        Proceed to checkout
                    </Link>
                </div>
            </div>
        </div>
    )
})

export default Cart