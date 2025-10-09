'use client'
import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"
import Link from "next/link"
import { StoreContext } from "../../store/StoreProvider"
import { currencies, languages } from "@/app/utils/consts"
import { changeCurrency } from "@/app/http/UserAPI"

const NavbarAuthButtons = observer(({isMobile}) => {
    const { user } = useContext(StoreContext)

    const [currency, setCurrency] = useState(user.currency)

    useEffect(() => {
        changeCurrency({userId: user.user.id, currency})
    }, [currency])


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
                        defaultValue={user.user.currency}
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
                    <select className="cursor-pointer border border-white rounded text-[0.8em] sm:text-[1em] px-1 py-2 w-full"
                        defaultValue={user.user.language}>
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