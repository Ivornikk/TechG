'use client'
import { changeCountry } from "@/app/http/UserAPI";
import { StoreContext } from "@/app/store/StoreProvider";
import { currencies, EUCountries, languages } from "@/app/utils/consts";
import Link from "next/link"
import { useContext, useEffect, useState } from "react";

const Settings = () => {
    
    const { user, product } = useContext(StoreContext)

    const [selectedCountry, setSelectedCountry] = useState(EUCountries[0].name)
    const [selectedCurrency, setselectedCurrency] = useState(product.currency)

    useEffect(() => {
        changeCountry({userId: user.user.id, country: selectedCountry})
    }, [selectedCountry])
    useEffect(() => {
        product.setCurrency(selectedCountry)
    }, [selectedCurrency])

    return (
        <div className="min-h-[70vh]">
            <div className="bg-categories shadow-xl px-10 py-3 md:max-w-[65vw] m-auto flex flex-col md:my-30 my-10">
                <h1 className="text-[1.5em] mb-5 flex gap-3">
                    <Link className="cursor-pointer"
                        href={'/account/main'}>
                        {'<'}
                    </Link>
                    Settings
                </h1>
                <div className="gap-5">
                    <div className="flex flex-col gap-5">
                        <hr className="py-5 w-full border-stroke m-auto"></hr>
                        <ul className="text-gray-text flex flex-col gap-5">
                            <li className="w-full cursor-pointer ">
                                <Link className="w-full flex"
                                    href={'/account/settings/edit-user'}>
                                    Edit Account
                                </Link>
                            </li>
                            <li className="grid grid-cols-2 flex items-center">
                                <p>
                                    Shipping Country:
                                </p>
                                <select className="py-2 rounded border border-brand"
                                    onChange={e => setSelectedCountry(e.target.value)}>
                                    { EUCountries.map(el => {
                                        return (
                                            <option key={el.id}
                                                value={el.name}>
                                                {el.name}
                                            </option>
                                        )
                                    })}
                                </select>
                            </li>
                            <li className="grid grid-cols-2 flex items-center">
                                <p>
                                    Currency:
                                </p>
                                <select className="py-2 rounded border border-brand"
                                    onChange={e => setselectedCurrency(e.target.value)}>
                                    { currencies.map(el => {
                                        return (
                                            <option key={el.id}
                                                value={el.name}>
                                                {el.name}
                                            </option>
                                        )
                                    })}
                                </select>
                            </li>
                        </ul>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Settings