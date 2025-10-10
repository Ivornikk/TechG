'use client'

import { useContext, useEffect, useState } from "react"
import { fetchCategories } from "../http/ProductAPI"
import { StoreContext } from "../store/StoreProvider"
import { observer } from "mobx-react-lite"
import Link from "next/link"

const Categories = observer(() => {
    const { product } = useContext(StoreContext)
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [selectedType, setSelectedType] = useState(0)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        fetchCategories()
        .then(data => {
            product.setCategoriesObject(data)
            setSelectedCategory(data.rows[0].id)
        })
    }, [])

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768)
        };

        checkScreenSize()
        window.addEventListener("resize", checkScreenSize)

        return () => {
            window.removeEventListener("resize", checkScreenSize)
        };
    }, []);

    const getCategoryId = (id) => {
        let res = product.categoriesObject.rows.map(el => {
            if (el.id == id) return el
        })
        res = Object(res)
        return res[0]
    }

    return (
        <div className="md:m-10">
            { isMobile ?
            <div className="flex">
                <aside className="min-h-[100vh] bg-categories w-25">
                    <ul className="flex flex-col items-center">
                        { product.categoriesObject.rows?.map(category => {
                            return (
                                <li key={category.id}
                                    className={`h-25 w-full text-center justify-between flex flex-col ${
                                        category.id == selectedCategory && 'bg-white border-l-5 border-brand'
                                    }`}
                                    onClick={() => setSelectedCategory(category.id)}>
                                    <div className="h-full flex justify-center items-center">
                                        {category.name}
                                    </div>
                                    <hr className="border-stroke w-full mt-1" />
                                </li>
                            )
                        })}
                    </ul>
                </aside>
                <div className="m-3 w-full">
                    <ul>
                        {console.log(getCategoryId(selectedCategory))}
                        { getCategoryId(selectedCategory)?.types.map(type => {
                            return (
                                <li key={type.id}
                                    className="py-3 flex flex-col"
                                    onClick={() => setSelectedType(type.id)}>
                                    <div className="w-full flex justify-between">
                                        {type.name}
                                        <img src="/dropdown-arrow.svg"
                                            className={`invert mx-5 -rotate-90 transition-all ${
                                                type.id == selectedType && 'rotate-0'
                                            }`}>
                                        </img>
                                    </div>
                                    { selectedType == type.id &&
                                        <ul className="grid grid-cols-2 gap-3 mt-3">
                                            { type.groups.map(group => {
                                                return (
                                                    <li key={group.id}
                                                        className="h-12 border border-brand rounded-xl flex items-center justify-center">
                                                        <Link href={`/category/${group.id}`}
                                                            className=" text-center">
                                                            {group.name}
                                                        </Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    }
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            :
            <div className="xl:max-w-[60vw] max-w-[70vw] m-auto min-h-[100vh]">
                <ul className="grid xl:grid-cols-3 grid-cols-2 gap-10">
                    { product.categoriesObject.rows?.map(category => {
                        return(
                            <li key={category.id} 
                                className="bg-categories flex flex-col items-center px-5">
                                <h1 className="text-[1.4em] mb-5">
                                    {category.name}
                                </h1>
                            </li>
                        )
                    })}
                </ul>
            </div>
            }
        </div>
    )
})

export default Categories