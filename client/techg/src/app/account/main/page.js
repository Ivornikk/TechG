'use client'
import Link from "next/link"
import { useContext, useState, useEffect } from "react"
import { StoreContext } from "@/app/store/StoreProvider"
import { observer } from "mobx-react-lite"

const Main = observer(() => {
    const { user } = useContext(StoreContext)
    const [isMobile, setIsMobile] = useState(false)

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

    return (
        <div className="m-auto md:my-20 md:max-w-[65vw] md:text-xl">
            <div className="mb-15 flex flex-col gap-2 md:p-5 bg-categories">
                <div className="px-2 py-5 rounded-xl bg-white text-[1.2em] flex gap-3 items-center">
                    <div className="md:mx-5 flex justify-between items-center gap-3 w-full">
                        <div className="flex items-center gap-3">
                            <div className="bg-stroke w-12 h-12 flex justify-center items-center rounded-full">
                                <img src="/UserIcon.svg" className="invert w-10">
                                </img>
                            </div>
                            {user.user.username}
                        </div>
                        { user.user.role === 'ADMIN' &&
                        <Link className="text-center md:text-md text-sm md:px-5 px-3 md:py-3 py-3 bg-brand border border-brand text-white rounded-xl cursor-pointer hover:bg-white hover:text-brand transition"
                            href={'/admin/dashboard'}>
                            Admin Panel
                        </Link>
                        }
                    </div>
                </div>
                <div className="bg-categories rounded-xl bg-white p-5">
                    <h2 className="w-full flex justify-between mb-5">
                        <p className="text-[1.1em]">Orders</p>
                        <Link className="md:text-lg text-gray-text text-sm cursor-pointer hover:underline"
                            href={'/account/my-orders'}>
                            View All
                        </Link>
                    </h2>
                    <ul className="flex gap-3 md:text-lg text-sm items-center">
                        <li className="hover:underline">
                            <button className="cursor-pointer flex flex-col items-center">
                                <img></img>
                                <p className="text-gray-text">
                                    Payment Pending
                                </p>
                            </button>
                        </li>
                        <li className="hover:underline">
                            <button className="cursor-pointer flex flex-col items-center">
                                <img></img>
                                <p className="text-gray-text">
                                    Pending
                                </p>
                            </button>
                        </li>
                        <li className="hover:underline">
                            <button className="cursor-pointer flex flex-col items-center">
                                <img></img>
                                <p className="text-gray-text">
                                    Processing
                                </p>
                            </button>
                        </li>
                        <li className="hover:underline">
                            <button className="cursor-pointer flex flex-col items-center">
                                <img></img>
                                <p className="text-gray-text">
                                    Shipped
                                </p>
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="bg-categories rounded-xl bg-white p-5">
                    <h2 className="text-[1.1em] mb-3">
                        Service
                    </h2>
                    <ul className="text-gray-text md:text-lg text-sm">
                        <li className="py-4 cursor-pointer md:hover:text-xl transition-all">
                            <Link href={'/account/settings'}
                                className="flex justify-between">
                                Settings
                                <p className="text-[0.8em]">{'>'}</p>
                            </Link>
                        </li>
                        <li className="py-4 md:hover:text-xl transition-all">
                            <Link href={'/account/address-book'}
                                className="flex justify-between">
                                Address Book
                                <p className="text-[0.8em]">{'>'}</p>
                            </Link>
                        </li>
                        <li className="py-4 md:hover:text-xl transition-all">
                            <Link href={'/account/settings'}
                                className="flex justify-between">
                                Return/Repair
                                <p className="text-[0.8em]">{'>'}</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
})

export default Main