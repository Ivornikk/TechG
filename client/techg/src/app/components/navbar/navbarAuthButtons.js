'use client'
import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"
import Link from "next/link"
import { StoreContext } from "../../store/StoreProvider"

const NavbarAuthButtons = observer(({isMobile}) => {
    const { user, product } = useContext(StoreContext)

    const [currency, setCurrency] = useState('EUR')

    useEffect(() => {
        product.setCurrency(currency)
    }, [currency])

    const currencies = [
        { id: 1, name: "EUR" },
        { id: 2, name: "GBP" },
        { id: 3, name: "CHF" },
        { id: 4, name: "NOK" },
        { id: 5, name: "SEK" },
        { id: 6, name: "DKK" },
        { id: 7, name: "ISK" },
        { id: 8, name: "CZK" },
        { id: 9, name: "PLN" },
        { id: 10, name: "HUF" },
        { id: 11, name: "RON" },
        { id: 12, name: "BGN" },
        { id: 13, name: "RSD" },
        { id: 14, name: "MKD" },
        { id: 15, name: "ALL" },
        { id: 16, name: "BAM" },
        { id: 17, name: "MDL" },
        { id: 18, name: "UAH" },
        { id: 19, name: "BYN" },
        { id: 20, name: "RUB" },
        { id: 21, name: "GIP" },
        { id: 22, name: "IMP" },
        { id: 23, name: "JEP" },
        { id: 24, name: "GGP" }
    ]

    const languages = [
        { id: 1, name: 'English' },
        { id: 2, name: 'Russian' }
    ]

    return (
        <>
        { isMobile ?
        <div>
            { user.isAuth ?
                <div className="flex gap-2">
                    <Link href={'/cart'}
                        className="cursor-pointer">
                    <img
                        src="/cart-icon.svg"
                        width={35}>
                    </img>
                    </Link>
                </div>
            :
                <div className="text-[0.9em] text-center text-white flex flex-col gap-2">
                    <Link href={'/log-in'}
                        className="border border-white rounded px-5 py-2">
                            Log in
                    </Link>
                </div>
            }
        </div>
        : <>
        {
            user.isAuth ?
                <div className="sm:justify-evenly
                                flex flex-col items-center justify-end gap-1 flex-shrink-0">
                    <Link href={'/account/main'}
                        className="cursor-pointer flex-shrink-0">
                        <img src="/UserIcon.svg" className=" flex-shrink-0"></img>
                    </Link>
                    <select className="cursor-pointer border border-white rounded text-[0.8em] sm:text-[1em] px-1 py-2 w-full"
                        onChange={e => setCurrency(e.target.value)}>
                        {
                            currencies.map(el => {
                                return (
                                    <option className="text-black"
                                        key={el.id}
                                        value={el.name}>
                                        {el.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <select className="cursor-pointer border border-white rounded text-[0.8em] sm:text-[1em] px-1 py-2 w-full">
                        {
                            languages.map(el => {
                                return (
                                    <option className="text-black"
                                        key={el.id}>
                                        {el.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                :
                <div className="flex flex-col justify-start md:justify-evenly flex-shrink-0">
                    <Link href={'/sign-up'}
                        className="my-2 md:py-3 flex items-center justify-center md:px-10 w-[105px] h-[38px] md:w-[150px] md:h-[55px] rounded border border-white cursor-pointer flex-shrink-0 hover:text-brand hover:bg-white transition">
                        Sign up
                    </Link>
                    <Link href={'/log-in'}
                        className="my-2 md:py-3 flex items-center justify-center md:px-10 w-[105px] h-[38px] md:w-[150px] md:h-[55px] rounded border border-white cursor-pointer flex-shrink-0 hover:text-brand hover:bg-white transition">
                        Log in
                    </Link>
                </div>
            }
        </>
        }
            
        </>
    )
})

export default NavbarAuthButtons