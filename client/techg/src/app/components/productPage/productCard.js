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
    const userId = user.user.id
    const [quantity, setQuantity] = useState(1)
    const [favorites, setFavorites] = useState(0)

    useEffect(() => {
        fetchOneProduct(id).then(data => {
            product.setCurrentProduct(data)
            product.setPictures(data.description_images.split(','))
        })
        fetchNumberOfFavorites(id)
        .then(data => setFavorites(data))
    }, [])

    const addToCart = () => {
        addProductToBasket({
            userId, productId: product.currentProduct.id, quantity: quantity
        })
    }

    const addToWishlist = () => {
        addProductToWishlist({
            userId, productId: product.currentProduct.id
        })
    }

    const sampleVariations = [
        {
            id: 0,
            name: 'color',
            types: [
                {
                    id: 1,
                    name: 'white'
                },
                {
                    id: 2,
                    name: 'Black'
                },
                {
                    id: 3,
                    name: 'Yellow'
                },
                {
                    id: 4,
                    name: 'Purple'
                },
                {
                    id: 5,
                    name: 'Red'
                },
            ]
        },
        {
            id: 1,
            name: 'RAM',
            types: [
                {
                    id: 1,
                    name: '32GB'
                },
                {
                    id: 2,
                    name: '64GB'
                },
                {
                    id: 3,
                    name: '128GB'
                },
            ]
        },
    ]

    return (
        <div className="p-5 bg-categories flex flex-row shadow-xl my-10">
            <div className="max-w-[80%] flex m-auto">
                <div>
                    <ProductPicturesCarousel pictures={product.pictures} />
                </div>
                <div className="px-5 text-lg">
                    <h2>{product.currentProduct.title}</h2>
                    <h2 className="pt-3">Brand: </h2>
                    <h1 className="text-brand text-4xl py-4">{product.currentProduct.price}$</h1>
                    <hr className="border-stroke" />
                    <ProductVariations variations={sampleVariations} />
                    <div className="flex flex-row justify-between">
                        <div className="float-center h-[174px]">
                            <h1 className="text-3xl my-3">Quantity:</h1>
                            <QuantityCounter defaultValue={1}
                                increment={() => setQuantity(quantity + 1)}
                                decrement={() => quantity > 1 ?
                                            setQuantity(quantity - 1) :
                                            setQuantity(1)}
                            />
                            <div className="mt-3">
                                Shipping: 3.15$
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
                                onClick={addToWishlist}>
                                <img className="mr-3"
                                src="/heart-icon.svg"></img>
                                <div className="">{favorites}</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default ProductCard