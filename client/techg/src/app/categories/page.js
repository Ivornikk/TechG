'use client'

import { useContext, useEffect, useState } from "react"
import { fetchCategories } from "../http/ProductAPI"
import { StoreContext } from "../store/StoreProvider"
import { observer } from "mobx-react-lite"

const Categories = observer(() => {
    const { product } = useContext(StoreContext)
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        fetchCategories(true)
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
        console.log(id)
        let res = product.categoriesObject.rows.map(el => {
            if (el.id == id) return el
        })
        res = Object(res)
        console.log(res[0])
        return res[0]
    }

    return (
        <div className="md:m-10">
            { isMobile ?
            <div>
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
                <div>
                    <ul>
                        {console.log(getCategoryId(selectedCategory))}
                        { getCategoryId(selectedCategory)?.types.map(type => {
                            return (
                                <li key={type.id}>
                                    {type.name}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            :
            <div>

            </div>
            }
        </div>
    )
})

export default Categories