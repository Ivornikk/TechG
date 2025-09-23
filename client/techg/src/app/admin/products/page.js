'use client'
import CreateCategoryForm from "@/app/components/forms/createCategoryForm"
import CreateGroupForm from "@/app/components/forms/createGroupForm"
import CreateProuctForm from "@/app/components/forms/createProductForm"
import CreateTypeForm from "@/app/components/forms/createTypeForm"
import { removeProduct, fetchCategories, fetchGroups, fetchProducts, fetchTypes, removeCategory, removeGroup, removeType } from "@/app/http/ProductAPI"
import { StoreContext } from "@/app/store/StoreProvider"
import { observer } from "mobx-react-lite"
import { redirect } from "next/navigation"
import { useContext, useEffect, useState } from "react"

const Product = observer(() => {
    const [view, setView] = useState('products')
    const [createProduct, setCreateProduct] = useState(false)
    const [createCategory, setCreateCategory] = useState(false)
    const [createType, setCreateType] = useState(false)
    const [createGroup, setCreateGroup] = useState(false)
    
    const { product } = useContext(StoreContext)

    const getProducts = async () => {
        const data = await fetchProducts({ page: 1 , currency: product.currency})
        product.setProducts(data.rows)
    }
    const getCategories = () => {
        fetchCategories()
        .then(data => {
            product.setCategories(data.rows)
        })
    }

    const getTypes = async () => {
        const data = await fetchTypes()
        product.setTypes(data.rows)
    }

    const getGroups = async () => {
        const data = await fetchGroups()
        product.setGroups(data.rows)
    }

    useEffect(() => {
        getProducts()
        getCategories()
        getTypes()
        getGroups()
    }, [product.currency])

    const deleteProduct = id => {
        try {
            removeProduct(id)
            .then(res => {
                getProducts()
                alert(res.message)
            })
        } catch (err) {
            alert(err.message)
        }
    }
    const deleteCategory = id => {
        try {
            removeCategory(id)
            .then (res => {
                getCategories()
                alert(res.message)
            })
        }  catch (err) {
            alert(err.message)
        }
    }
    const deleteType = async id => {
        try {
            const res = await removeType(id)
            getTypes()
            alert(res.message)
        } catch (err) {
            alert(err.message)
        }
    }
    const deleteGroup = async id => {
        try {
            const res = await removeGroup(id)
            getGroups()
            alert(res.message)
        } catch (err) {
            alert(err.message)
        }
    }

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
                                    onClick={() => setCreateProduct(true)}>
                                    Create Product
                                </button>
                            </div>
                            { createProduct &&
                                <CreateProuctForm onHide={() => setCreateProduct(false)} />
                            }
                            <ul className="flex flex-col gap-3 mt-10">
                                {
                                    product.products.map(elem => {
                                        return (
                                            <li key={elem.id}
                                                className="flex justify-between grid grid-rows-3 grid-flow-col-dense">
                                                <div className="flex gap-3 row-span-3 cursor-pointer"
                                                    onClick={ () => redirect(`/product/${elem.id}`)}>
                                                    <img src={`http://localhost:5000/${elem.preview_image}`}
                                                        className="w-50"></img>
                                                    <div>
                                                        <h2 className="text-[1.3em]">
                                                            {elem.title}
                                                        </h2>
                                                        <h2 className="text-[1.2em]">
                                                            {elem.price} {product.currency}
                                                        </h2>
                                                    </div>
                                                </div>
                                                <button className="cursor-pointer"
                                                    onClick={() => deleteProduct(elem.id)}>
                                                    <img src="/binIcon.svg">
                                                    </img>
                                                </button>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        : view === 'categories' ?
                            <div>
                                <div className="flex justify-between items-center">
                                    <h1 className="text-[2em] mb-5">Categories</h1>
                                    { createCategory ?
                                        <CreateCategoryForm onHide={() => setCreateCategory(false)} fetchCategories={getCategories} />
                                     :
                                        <button onClick={() => setCreateCategory(true)}
                                                className="py-1 px-3 text-white bg-brand border border-brand rounded-xl cursor-pointer hover:bg-white hover:text-brand transition">
                                            Create
                                        </button>
                                    }
                                </div>
                                <ul className="flex flex-col gap-3">
                                    {
                                        product.categories.map(category => {
                                            return (
                                                <li key={category.id}
                                                    className="flex justify-between">
                                                    <div className="flex gap-5 items-center">
                                                        <button className="cursor-pointer"
                                                            onClick={() => deleteCategory(category.id)}>
                                                            <img src="/binIcon.svg" width={30}/>
                                                        </button>
                                                        <div>{category.name}</div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            : view === 'types' ?
                                <div>
                                    <div className="flex justify-between items-center">
                                        <h1 className="text-[2em] mb-5">Types</h1>
                                        { createType ?
                                            <CreateTypeForm onHide={() => setCreateType(false)} fetchTypes={getTypes} />
                                        :
                                            <button onClick={() => setCreateType(true)}
                                                className="py-1 px-3 text-white bg-brand border border-brand rounded-xl cursor-pointer hover:bg-white hover:text-brand transition">
                                                Create
                                            </button>
                                        }
                                    </div>
                                    <div className="flex justify-between text-gray-text">
                                        <p>Type name:</p>
                                        <p>Belongs to category:</p>
                                    </div>
                                    <hr className="border-stroke mb-5" />
                                    <ul className="flex flex-col gap-3">
                                        {
                                            product.types.map(type => {
                                                return (
                                                    <li key={type.id}
                                                        className="flex gap-5 items-center1">
                                                        <button className="cursor-pointer"
                                                            onClick={() => deleteType(type.id)}>
                                                            <img src="/binIcon.svg" width={30}/>
                                                        </button>
                                                        <div className="flex justify-between w-full">
                                                            <div>{type.name}</div>
                                                            <div>{type.category.name}</div>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                :
                                <div>
                                    <div className="flex justify-between items-center">
                                        <h1 className="text-[2em] mb-5">Groups</h1>
                                        { createGroup ?
                                            <CreateGroupForm onHide={() => setCreateGroup(false)} fetchGroups={getGroups} />
                                        :
                                            <button onClick={() => setCreateGroup(true)}
                                                className="py-1 px-3 text-white bg-brand border border-brand rounded-xl cursor-pointer hover:bg-white hover:text-brand transition">
                                                Create
                                            </button>
                                        }
                                    </div>
                                    <div className="flex justify-between text-gray-text">
                                        <p>Group name:</p>
                                        <p>Belongs to type:</p>
                                    </div>
                                    <hr className="border-stroke mb-5" />
                                    <ul className="flex flex-col gap-3">
                                        {
                                            product.groups.map(group => {
                                                return (
                                                    <li key={group.id}
                                                        className="flex gap-5 items-center">
                                                        <button className="cursor-pointer"
                                                            onClick={() => deleteGroup(group.id)}>
                                                            <img src="/binIcon.svg" width={30}/>
                                                        </button>
                                                        <div className="flex justify-between w-full">
                                                            <div>{group.name}</div>
                                                            <div>{group.type.name}</div>
                                                        </div>
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
})

export default Product