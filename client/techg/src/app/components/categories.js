'use client'

import {useState} from 'react'
import Link from 'next/link'

const Categories = () => {

    const [shown, setShown] = useState(false)
    const [typesShown, setTypesShown] = useState(false)
    

    const categories = [
        {id: 1, name: "Smart gadgets"},
        {id: 2, name: "lamps"},
        {id: 3, name: "TVs"},
        {id: 4, name: "Mouses"},
        {id: 5, name: "Keyboards"},
    ]
    const types = [
        {id: 1, name: "Smart gadgets t"},
        {id: 2, name: "lamps"},
        {id: 3, name: "TVs"},
        {id: 4, name: "Mouses"},
        {id: 5, name: "Keyboards"},
    ]

    const groups = [
        {id: 1, name: "Smart gadgets g"},
        {id: 2, name: "lamps"},
        {id: 3, name: "TVs"},
        {id: 4, name: "Mouses"},
        {id: 5, name: "Keyboards"},
    ]

    return (
        <div className="mr-30 self-start justify-self-start flex-shrink-0 flex flex-col relative ">
            <div onClick={() => {setShown(!shown); setTypesShown(false)}} className="group translate-y-19 md:translate-y-0 w-[195px] md:w-57 cursor-pointer flex bg-button rounded-lg p-1 flex-shrink-0">
                <img className='ml-2' src="/categories-icon.svg"></img>
                <button className="ml-2 mr-10 md:mr-18 md:mr-15 cursor-pointer text-lg">Categories</button>
                <img className={`mr-2 ${shown ? '-rotate-90' : ''} transition`} src="/dropdown-arrow.svg"></img>
            </div>
            <div className={''}>
                <div className=''>
                    <ul className={`bg-categories text-black text-lg fixed pr-29 min-h-100 transition-all duration-300 origin-top ${shown ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                        {
                            categories.map(elem => {
                                return (
                                <Link href={'/'} key={elem.id}>
                                    <li onClick={() => setTypesShown(!typesShown)} className='category hover:text-button transition ml-4 p-1' key={elem.id}>{elem.name}</li>
                                </Link>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className={`bg-categories text-black fixed translate-x-65 translate-y-10 p-3 transition-all duration-300 origin-left ${typesShown ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                <ul className='grid grid-cols-3 gap-4'>
                    {
                        types.map(type => {
                            return (
                                <li className='mx-10' key={type.id}>
                                    <h3 className='font-semibold text-center mb-2'>{type.name}</h3>
                                    <ul>
                                        {groups.map(group => {
                                            return (
                                            <li key={group.id}>
                                                {group.name}
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
        </div>
    )
}

export default Categories