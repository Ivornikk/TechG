'use client'
import ProductVariations from "@/app/components/productPage/productVariations"
import QuantityCounter from "../quantityCounter"
import ProductPicturesCarousel from "./productPicturesCarousel"
import { useParams } from "next/navigation"
import { fetchOneProduct } from "@/app/http/ProductAPI"
import { useContext, useEffect, useState } from "react"
import { StoreContext } from "@/app/store/StoreProvider"
import { observer } from "mobx-react-lite"
import { addProductToBasket } from "@/app/http/BasketAPI"
import { addProductToWishlist, fetchNumberOfFavorites } from "@/app/http/WishlistAPI"

const ProductCard = observer(() => {
    const {id} = useParams()
    const {product, user} = useContext(StoreContext)
    const userId = user.user?.id
    const [quantity, setQuantity] = useState(1)
    const [favorites, setFavorites] = useState(0)

    useEffect(() => {
        fetchOneProduct({id, currency: product.currency}).then(data => {
            product.setCurrentProduct(data)
            product.setPictures(data.description_images.split(','))
        })
        fetchNumberOfFavorites(id)
        .then(data => setFavorites(data))
    }, [product.currency])

    const addToCart = () => {
        if (!user.isAuth) {
            alert('Please, log in or register first')
            return
        }
        addProductToBasket({
            userId, productId: product.currentProduct.id, quantity: quantity
        })
        .then(() => {
            alert('Product added successfully')
        })
    }

    const addToWishlist = () => {
        if (!user.isAuth) {
            alert('Please, log in or register first')
            return
        }
        addProductToWishlist({
            userId, productId: product.currentProduct.id
        })
        .then(() => {
            fetchNumberOfFavorites(id)
            .then(data => setFavorites(data))
        })
        .finally(() => {
            alert('Product added successfully')
        })
    }

    return (
        <>
        { product.currentProduct && 

        <div className="p-5 bg-categories flex flex-row shadow-xl my-10">
            <div className="max-w-[80%] flex m-auto">
                <div>
                    <ProductPicturesCarousel pictures={product.pictures} />
                </div>
                <div className="px-5 text-lg">
                    <h2>{product.currentProduct.title}</h2>
                    <h2 className="pt-3">Brand: </h2>
                    <h1 className="text-brand text-4xl py-4">{product.currentProduct.price} {product.currency}</h1>
                    <hr className="border-stroke" />
                    <ProductVariations variations={product.currentProduct.attributes} />
                    <div className="flex flex-row justify-between">
                        <div className="float-center h-[174px]">
                            <h1 className="text-3xl my-3">Quantity:</h1>
                            <QuantityCounter defaultValue={1}
                                changeQuantity={setQuantity}/>
                            <div className="mt-3">
                                Shipping: {product.currentProduct.shippingFee} {product.currency}
                            </div>
                        </div>
                        <div className="flex flex-col mx-20 w-full">
                            <button className="my-3 w-full h-[42px] cursor-pointer rounded-xl bg-button-active text-white border border-button-active hover:text-button-active hover:bg-categories transition"
                                onClick={addToCart}>
                                Add to cart
                            </button>
                            <button className="my-3 w-full h-[43px] cursor-pointer rounded-xl bg-button-active text-white border border-button-active hover:text-button-active hover:bg-categories transition">
                                Buy now
                            </button>
                            <button className="my-3 w-full flex h-[43px] items-center justify-center cursor-pointer rounded-xl bg-button-active text-white border border-button-active hover:text-button-active hover:bg-categories transition"
                                onClick={() => {
                                    addToWishlist()
                                }}>
                                <img className="mr-3"
                                src="/heart-icon.svg"></img>
                                <div className="">{favorites}</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        }
    </>
    )
})

export default ProductCard