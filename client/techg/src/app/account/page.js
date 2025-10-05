'use client'
import Link from "next/link"
import { useContext } from "react"
import { StoreContext } from "../store/StoreProvider"

const Account = () => {
    const { user } = useContext(StoreContext)

    return (
    <div className="mb-15 flex flex-col gap-2 bg-categories">
            <div className="pl-5 py-5 rounded-xl bg-white text-[1.2em] flex gap-3 items-center">
                <div className="bg-stroke w-12 h-12 flex justify-center items-center rounded-full">
                    <img src="/UserIcon.svg" className="invert w-10">
                    </img>
                </div>
                {user.user.username}
            </div>
            <div className="bg-categories rounded-xl bg-white p-5">
                <h2 className="w-full flex justify-between mb-5">
                    <p className="text-[1.1em]">Orders</p>
                    <Link className="text-gray-text text-sm cursor-pointer hover:underline"
                        href={'/my-orders'}>
                        View All
                    </Link>
                </h2>
                <ul className="flex gap-3 text-sm items-center">
                    <li>
                        <button className="flex flex-col items-center">
                            <img></img>
                            <p className="text-gray-text">
                                Payment Pending
                            </p>
                        </button>
                    </li>
                    <li>
                        <button className="flex flex-col items-center">
                            <img></img>
                            <p className="text-gray-text">
                                Pending
                            </p>
                        </button>
                    </li>
                    <li>
                        <button className="flex flex-col items-center">
                            <img></img>
                            <p className="text-gray-text">
                                Processing
                            </p>
                        </button>
                    </li>
                    <li>
                        <button className="flex flex-col items-center">
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
                <ul className="text-gray-text">
                    <li className="py-4 flex justify-between text-sm">
                        <Link href={'/account/settings'}>
                            Settings
                        </Link>
                        <p className="text-[0.8em]">{'>'}</p>
                    </li>
                    <li className="py-4 flex justify-between text-sm">
                        <Link href={'/account/settings'}>
                            Address Book
                        </Link>
                        <p className="text-[0.8em]">{'>'}</p>
                    </li>
                    <li className="py-4 flex justify-between text-sm">
                        <Link href={'/account/settings'}>
                            Return/Repair
                        </Link>
                        <p className="text-[0.8em]">{'>'}</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Account