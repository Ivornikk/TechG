'use client'

import { fetchCategories } from '@/app/http/ProductAPI'
import { StoreContext } from '@/app/store/StoreProvider'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import {useContext, useEffect, useState} from 'react'

const Categories = observer(() => {

    const [shown, setShown] = useState(false)
    const [selectedCategoryId, setSelectedCategoryId] = useState(0)
    const [typesShown, setTypesShown] = useState(true)
    
    const { product } = useContext(StoreContext)

    useEffect(() => {
        fetchCategories()
        .then(data => {
            product.setCategoriesObject(data)
        })
    }, [])

    return (
        <div className="self-start justify-self-start flex-shrink-0 flex flex-col relative">
            <div onClick={() => {
                setShown(!shown); setTypesShown(false)
            }}
                className="group md:translate-y-0 w-[195px] md:w-57 cursor-pointer flex bg-button rounded-lg p-1 flex-shrink-0">
                <img className='ml-2'
                    src="/categories-icon.svg"></img>
                <button className="ml-2 mr-10 md:mr-18 md:mr-15 cursor-pointer text-lg">
                    Categories
                </button>
                <img className={`mr-2 ${shown ? '-rotate-90' : ''} transition`}
                    src="/dropdown-arrow.svg"></img>
            </div>
            <div className={''}>
                <div className=' '>
                    <ul className={`bg-categories shadow-2xl text-black text-lg fixed pr-29 min-h-100 transition-all duration-300 origin-top ${shown ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                        {
                            product.categoriesObject.rows?.map((elem, index) => {
                                return (
                                    <li onClick={() => {
                                        setSelectedCategoryId(index)
                                        setTypesShown(true)
                                        if (selectedCategoryId == index && typesShown)
                                            setTypesShown(false)
                                    }}
                                        className='category cursor-pointer hover:text-button transition ml-4 p-1'
                                        key={elem.id}>
                                        {elem.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
                    { typesShown &&
                        <div className={`bg-categories max-w-[60vw] text-black fixed translate-x-65 translate-y-10 p-3 transition-all duration-300 origin-left ${typesShown ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                            <ul className='grid grid-cols-4 gap-2'>
                                {
                                    product.categoriesObject.rows?.[selectedCategoryId]?.children?.map(category => {
                                        return (
                                            <li className='mx-10' key={category.id}>
                                                <h3 className='font-semibold text-center mb-2'>{category.name}</h3>
                                                <ul>
                                                    {category.children?.map(group => {
                                                        return (
                                                        <li key={group.id}
                                                            className='cursor-pointer hover:text-gray-text'
                                                            onClick={() => {
                                                                setShown(false)
                                                                setTypesShown(false)
                                                            }}>
                                                            <Link href={`/category/${group.id}`}>
                                                                {group.name}
                                                            </Link>
                                                        </li>
                                                        )
                                                    })}
                                                </ul>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
})

export default Categories