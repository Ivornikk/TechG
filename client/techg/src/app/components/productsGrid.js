'use client'
import Link from "next/link"
import Pages from "./pages"
import { fetchProducts } from "../http/ProductAPI"
import { useEffect } from "react"
import { useStore } from "../store/StoreProvider"

const ProductsGrid = () => {
    const store = useStore()
    const limit = 20

    useEffect(() => {
        fetchProducts({page: 1, limit}).then(data => {
            store.productStore.setProducts(data.rows)
            store.productStore.setTotalProductsCount(data.count)
        })
    }, [])

    return (
        <div>
            <ul className="md:w-[1500px] w-500px grid grid-cols-5 gap-13 mx-auto">
                {
                    store.productStore.products.map(product => {
                        return (
                            <Link href={`/product/${product.id}`} key={product.id}>
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
            <Pages pagesNum={(store.productStore.totalProductsCount % limit)} />
        </div>
    )
}

export default ProductsGrid