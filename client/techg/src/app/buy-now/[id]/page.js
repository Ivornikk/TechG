'use client'

import AddressCardCheckout from "@/app/components/addressCardCheckout"
import { fetchOneProduct } from "@/app/http/ProductAPI"
import { StoreContext } from "@/app/store/StoreProvider"
import { observer } from "mobx-react-lite"
import { useParams } from "next/navigation"
import { useContext, useEffect, useState } from "react"

const BuyNow = observer(() => {

    const { id } = useParams()
    const { product } = useContext(StoreContext)
    const [address, setAddress] = useState()

    useEffect(() => {
        fetchOneProduct({id, currency: product.currency})
        .then(data => product.setCurrentProduct(data))
    }, [])

    const submit = async () => {
        try {



        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <div className="my-10 min-h-[100vh] mx-10 grid grid-cols-4">
            <div className="col-span-4">
                <AddressCardCheckout setSelectedAddressId={setAddress} />
            </div>
            <div className="col-span-4 md:col-span-3 flex bg-categories shadow-xl p-5 mx-5">
                <div className="flex gap-5">
                    <img src={`http://localhost:5000/${product.currentProduct.preview_image}`}
                        className="w-75 h-75">
                    </img>
                    <div className="flex flex-col">
                        <h3 className="text-[1.2em]">
                            {product.currentProduct.title}
                        </h3>
                        <p className="text-[1.5em]">
                            {product.currentProduct.price} {product.currency}
                        </p>

                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center bg-categories shadow-xl p-5 mx-5">
                <h2 className="text-[1.6em]">
                    Summary
                </h2>
                <hr className="w-full border-stroke my-5" />
                <h2 className="text-[1.3em]">
                    Total:
                </h2>
                <h2 className="text-[1.3em]">
                    {product.currentProduct.price * product.currentProduct.quantity}
                </h2>
                <button className="px-10 py-3 text-[1.2em] bg-brand text-white border border-brand rounded-xl cursor-pointer hover:bg-white hover:text-brand transition"
                    onClick={submit}>
                    Place Order
                </button>
            </div>
        </div>
    )
})

export default BuyNow