'use client'
import { useState } from "react"
import ProductVariations from "@/app/components/productVariations"

const ProductPage = () => {
    const productSample = {
        id: 5124,
        name: '16.8V Brushless 75mm Angle Grinder Cutting Machine 1PC Cutting Blade 0.5A Charger 1500mAh Battery Current Display Function - two battery & EU plug',
        brand: 'Bosch',
        price: 50.99,
        soldNum: 321,
        rating: 4.7
    }

    const sampleVariations = [
        {
            id: 1,
            name: 'color',
            types: [
                {
                    id: 1,
                    name: 'white'
                },
                {
                    id: 2,
                    name: 'dark'
                },
                {
                    id: 4,
                    name: 'Yellow'
                },
                {
                    id: 5,
                    name: 'Purple'
                },
                {
                    id: 6,
                    name: 'Red'
                },
            ]
        },
        {
            id: 2,
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

    const [quantity, setQuantity] = useState(0)
    const [shippingFee, setShippingFee] = useState(3.12)
    const favorites = 3
    return (
            <div className="w-[1350px] m-auto mb-10 shadow-2xl">
                <div className="p-5 bg-categories flex flex-row">
                    <div>
                        <div className="bg-gray-300 flex text-4xl w-[730px] h-[630px] items-center justify-between">
                            <img className="w-[36px]" src="/arrow-left.svg"></img>
                            Product Picture
                            <img className="w-[36px]" src="/arrow-right.svg"></img>
                        </div>
                    </div>
                    <div className="px-5 text-lg">
                        <h2>{productSample.name}</h2>
                        <h2 className="pt-3">Brand: {productSample.brand}</h2>
                        <h1 className="text-brand text-4xl py-4">{productSample.price}$</h1>
                        <hr className="border-stroke" />
                        <ProductVariations variations={sampleVariations} />
                        <div className="flex flex-row justify-between">
                            <div className="float-center h-[174px]">
                                <h1 className="text-3xl my-3">Quantity:</h1>
                                <div className="text-[30px] w-[200px] flex items-center border border-stroke rounded-lg overflow-hidden">
                                    <button onClick={() => quantity > 0 ? 
                                                        setQuantity(quantity-1) : 
                                                        setQuantity(0)}
                                            className="cursor-pointer text-[30px] bg-contain">
                                                <img src="/minus-icon.svg"></img>
                                            </button>
                                    <p className="px-10 border-x border-stroke w-[118px] flex justify-center">{quantity}</p>
                                    <button onClick={() => {setQuantity(quantity + 1)}} 
                                            className=" cursor-pointer"><img className="h-full" src="/plus-icon.svg"></img></button>
                                </div>
                                <div className="mt-3">
                                    Shipping: {shippingFee}$
                                </div>
                            </div>
                            <div className="flex flex-col mx-20 w-full">
                                <button className="bg-stroke my-3 w-full h-[42px]">Add to cart</button>
                                <button className="bg-stroke my-3 w-full h-[43px]">Buy now</button>
                                <button className="bg-stroke my-3 w-full flex h-[43px] items-center justify-center">
                                    <img className="mr-3" src="/heart-icon.svg"></img>
                                    <div className="">{favorites}</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default ProductPage