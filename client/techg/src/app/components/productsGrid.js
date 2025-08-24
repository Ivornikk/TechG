'use client'
import Link from "next/link"
import Pages from "./pages"
import { searchProducts } from "../http/ProductAPI"
import { useEffect, useContext } from "react"
import { useSearchParams } from "next/navigation"
import { StoreContext } from "../store/StoreProvider"
import { observer } from "mobx-react-lite"

const ProductsGrid = observer(() => {
    const limit = 20
    const searchParams = useSearchParams().get('q')
    const {product} = useContext(StoreContext)

    useEffect(() => {
        searchProducts({q: searchParams, page: 1, limit}).then(data => {
            product.setProducts(data)
            product.setTotalProductsCount(data)
            console.log("VALUES UPDATED")
        })
    }, [])

    return (
        <div>
            <ul className="md:w-[1500px] w-500px grid grid-cols-5 gap-13 mx-auto">
                {console.log(product.products)}
                {
                    product.products.map(product => {
                        return (
                            <Link href={`/product/${product.id}`}
                                key={product.id}>
                                <li className="text-black w-[300px] bg-white hover:shadow-xl transition">
                                    <div className="w-[300px] h-[315px] flex items-center justify-center text-3xl bg-gray-300">
                                        Product pic
                                    </div>
                                    <div>{product.title}</div>
                                    <div className="mt-5">${product.price}</div>
                                    <div className="flex">
                                        <div className="mr-5">{product.soldNum} sold</div>
                                        <div className="flex">
                                            <img src="/star.svg"></img>{product.rating}
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        )
                    })
                }
            </ul>
            <Pages pagesNum={(product.totalProductsCount % limit)} />
        </div>
    )
})

export default ProductsGrid