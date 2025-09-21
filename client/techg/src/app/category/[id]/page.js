'use client'

import { fetchGroup, getSoldCount } from "@/app/http/ProductAPI"
import { StoreContext } from "@/app/store/StoreProvider"
import { observer } from "mobx-react-lite"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useContext, useEffect } from "react"

const CategoryPage = observer(() => {
    const { id } = useParams()
    const { product } = useContext(StoreContext)

    useEffect(() => {
        fetchGroup(id)
        .then(async data => {
            data.products.rows = await Promise.all (
                data.products.rows.flatMap(async searchResult => {
                    const soldCount = await getSoldCount(searchResult.id)
                    searchResult.soldNum = soldCount
                    return searchResult
                })
            )
            product.setProducts(data.products.rows)
            product.setTotalProductsCount(data.products.count)
        })
    }, [])

    return (
        <div className="md:w-[1500px] w-[500px] m-auto">
            <ul className=" grid md:grid-cols-5 grid-cols-1 gap-3">
                {
                    product.products.map(product => {
                        return (
                            <Link href={`/product/${product.id}`}
                                key={product.id}
                                className="m-auto">
                                <li className="p-5 flex bg-categories flex-col gap-5 text-black hover:shadow-xl transition">
                                        <img src={`http://192.168.1.2:5000/${product.preview_image}`}>
                                        </img>
                                    <div className="">
                                        <div>{product.title}</div>
                                        <div className="mt-5">${product.price}</div>
                                        <div className="flex">
                                            <div className="mr-5">{product.soldNum} sold</div>
                                            <div className="flex">
                                                <img src="/star.svg"></img>{product.rating}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        )
                    })
                }
            </ul>
        </div>
    )
})

export default CategoryPage