'use client'
import { observer } from "mobx-react-lite"
import { useStore } from "../store/StoreProvider"
import Link from "next/link"

const NavbarAuthButtons = observer(() => {
    const { userStore } = useStore()

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
            {
                userStore.isAuth ?
                    <div className="flex flex-col items-center justify-start md:justify-evenly flex-shrink-0">
                        <Link href={'/account/settings'}
                            className="cursor-pointer">
                            <img src="/UserIcon.svg"></img>
                        </Link>
                        <select className="cursor-pointer border border-white rounded px-5 py-2 w-full">
                            {
                                currencies.map(el => {
                                    return (
                                        <option className="text-black"
                                            key={el.id}>
                                            {el.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        <select className="cursor-pointer border border-white rounded px-5 py-2 w-full">
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
    )
})

export default NavbarAuthButtons