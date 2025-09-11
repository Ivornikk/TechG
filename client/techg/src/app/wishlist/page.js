'use client'

import { useContext, useEffect } from "react"
import { StoreContext } from "../store/StoreProvider"
import { observer } from "mobx-react-lite"
import { fetchOneWishlist, removeProductFromWishlist } from "../http/WishlistAPI"
import { addProductToBasket } from "../http/BasketAPI"
import { redirect } from "next/navigation"

const Wishlist = observer(() => {

    const {wishlist, user} = useContext(StoreContext)
    const userId = user.user.id

    useEffect(() => {
        fetchOneWishlist(userId).then(data => {
            wishlist.setItems(data[0].products)
        })
    }, [])

    const removeProduct = productId => {
        removeProductFromWishlist({
            userId: userId,
            productId: productId
        })
        .then(() => {
            fetchOneWishlist(userId).then(data => {
                wishlist.setItems(data[0].products)
            })
        })
    }

    const addToCart = (productId) => {
        if (!user.isAuth) {
            alert('Please, log in or register first')
            return
        }
        addProductToBasket({
            userId, productId, quantity: 1
        })
        .then(() => {
            alert('Product added successfully')
        })
    }

    return (
        <div className="max-w-[1500px] mx-auto my-10">
            <h1 className="text-[2.5em]">My Wishlist</h1>
            <div className="bg-categories m-auto shadow-xl my-35">
                {
                    wishlist.items.length === 0 ?
                    <div className="m-auto w-full h-full flex items-center justify-center py-10">
                        <div className="flex flex-col gap-5">
                            <h1 className="text-[2em] text-gray-text">
                                There are no itmes in your wishlist
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
                        wishlist.items.map(product => {
                            return (
                                <li key={product.id}
                                    className="flex justify-between">
                                    <div className="grid grid-rows-4 gap-5 grid-flow-col-dense cursor-pointer hover:underline p-3 transition-all"
                                        onClick={() => {redirect(`/product/${product.id}`)}}>
                                        <img className="w-[200px] row-span-4"
                                            src={`http://localhost:5000/${product.preview_image}`}></img>
                                        <h2 className="text-[1.2em] col-span-3">{product.title}</h2>
                                        <p className=" col-span-3">Estimated delivery time: {product.shippingDate || "Not estimated"}</p>
                                        <div className="flex items-center row-span-2 col-span-3">
                                            <h2 className="text-[1.4em]">${product.price}</h2>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-evenly">
                                        <button className="px-10 py-3 cursor-pointer rounded-xl bg-button-active text-white border border-button-active hover:bg-categories hover:text-button-active transition"
                                            onClick={() => addToCart(product.id)}>
                                            Add to cart
                                        </button>
                                        <button className="row-span-2 text-center text-brand cursor-pointer text-xl hover:text-2xl transition-all"
                                            onClick={() => removeProduct(product.id)}>
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                }
            </div>
        </div>
    )
})

export default Wishlist