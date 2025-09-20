'use client'
import Link from "next/link"
import Pages from "./pages"
import { getSoldCount, searchProducts } from "../http/ProductAPI"
import { useEffect, useContext } from "react"
import { useSearchParams } from "next/navigation"
import { StoreContext } from "../store/StoreProvider"
import { observer } from "mobx-react-lite"

const ProductsGrid = observer(() => {
    const limit = 1
    const searchParams = useSearchParams().get('q')
    const {product} = useContext(StoreContext)

    useEffect(() => {
        try {
            searchProducts({q: searchParams, page: 1, limit}).then(async data => {
                data.rows = await Promise.all (
                    data.rows.flatMap(async searchResult => {
                        const soldCount = await getSoldCount(searchResult.id)
                        searchResult.soldNum = soldCount
                        return searchResult
                    })
                )
                product.setProducts(data.rows)
                product.setTotalProductsCount(data.count)
            })
        } catch (err) {
            alert('ERROR: ', err.responce.data.message)
        }
    }, [])

        return (
            <div className="m-10 min-h-[80vh]">
                <ul className="md:w-[1500px] w-500px grid md:grid-cols-5 grid-cols-1 md:gap-13 gap-5 mx-auto">
                    { product.totalProductsCount <= 0 ?
                        <div className="text-[2em] text-center w-full m-auto">
                            No results found for {searchParams}
                        </div>
                    : 
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
                { product.totalProductsCount > 0 && 
                    <Pages pagesNum={Math.ceil(product.totalProductsCount / limit)} />
                }
            </div>
        )
})

export default ProductsGrid