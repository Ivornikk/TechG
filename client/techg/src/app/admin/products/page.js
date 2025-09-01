'use client'
import { fetchCategories, fetchGroups, fetchProducts, fetchTypes } from "@/app/http/ProductAPI"
import { StoreContext } from "@/app/store/StoreProvider"
import { redirect } from "next/navigation"
import { useContext, useEffect, useState } from "react"

const Product = () => {
    const [view, setView] = useState('products')
    const [editProduct, setEditProduct] = useState(0)
    const { product } = useContext(StoreContext)
    useEffect(() => {
        fetchProducts({ page: 1 }).then(data => {
            product.setProducts(data.rows)
        })
        fetchCategories().then(data => {
            product.setCategories(data.rows)
        })
        fetchTypes().then(data => {
            product.setTypes(data.rows)
        })
        fetchGroups().then(data => {
            product.setGroups(data.rows)
        })
    }, [])

    return (
        <div className="bg-categories shadow-xl p-10 pt-5">
            <nav className="text-gray-text">
                <ul className="flex gap-5">
                    <li className="px-2 py-1">
                        <button className="cursor-pointer hover:text-black hover:underline transition"
                            onClick={() => setView('products')}>
                            Products
                        </button>
                    </li>
                    <li className="px-2 py-1">
                        <button className="cursor-pointer hover:text-black hover:underline transition"
                            onClick={() => setView('categories')}>
                            Categories
                        </button>
                    </li>
                    <li className="px-2 py-1">
                        <button className="cursor-pointer hover:text-black hover:underline transition"
                            onClick={() => setView('types')}>
                            Types
                        </button>
                    </li>
                    <li className="px-2 py-1">
                        <button className="cursor-pointer hover:text-black hover:underline transition"
                            onClick={() => setView('groups')}>
                            Groups
                        </button>
                    </li>
                </ul>
            </nav>
            <hr className="border-stroke" />
            <div className="m-10">
                {
                    view === 'products' ?
                        <div>
                            <h1 className="text-[2em] mb-5">Products</h1>
                            <div className="border-y border-stroke text-center">
                                <button className="bg-brand text-white px-5 py-2 text-[1.5em] rounded-xl cursor-pointer border border-brand hover:bg-categories hover:text-brand transition my-3"
                                    onClick={() => console.log('hello world')}>
                                    Create Product
                                </button>
                            </div>
                            <ul className="flex flex-col gap-3">
                                {
                                    product.products.map(product => {
                                        return (
                                            <li key={product.id}
                                                className="flex cursor-pointer"
                                                onClick={ () => redirect(`/product/${product.id}`)}>
                                                <img src={`http://192.168.1.2:5000/${product.preview_image}`}
                                                    className="w-50"></img>
                                                <div>
                                                    <h2 className="text-[1.3em]">
                                                        {product.title}
                                                    </h2>
                                                    <h2 className="text-[1.2em]">
                                                        {product.price}$
                                                    </h2>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        : view === 'categories' ?
                            <div>
                                <h1 className="text-[2em] mb-5">Categories</h1>
                                <ul>
                                    {
                                        product.categories.map(category => {
                                            return (
                                                <li key={category.id}
                                                    className="flex justify-between">
                                                    <div>{category.name}</div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            : view === 'types' ?
                                <div>
                                    <h1 className="text-[2em] mb-5">Types</h1>
                                    <div className="flex justify-between text-gray-text">
                                        <p>Type name:</p>
                                        <p>Belongs to category:</p>
                                    </div>
                                    <hr className="border-stroke mb-5" />
                                    <ul>
                                        {
                                            product.types.map(type => {
                                                return (
                                                    <li key={type.id}
                                                        className="flex justify-between">
                                                            <div>{type.name}</div>
                                                            <div>{type.category.name}</div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                :
                                <div>
                                    <h1 className="text-[2em] mb-5">Groups</h1>
                                    <div className="flex justify-between text-gray-text">
                                        <p>Group name:</p>
                                        <p>Belongs to type:</p>
                                    </div>
                                    <hr className="border-stroke mb-5" />
                                    <ul>
                                        {
                                            product.groups.map(group => {
                                                return (
                                                    <li key={group.id}
                                                        className="flex justify-between">
                                                        <div>{group.name}</div>
                                                        <div>{group.type.name}</div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                }
            </div>
        </div>
    )
}

export default Product