'use client'
import Link from "next/link"
import { useContext, useEffect } from "react"
import { StoreContext } from "../store/StoreProvider"
import { redirect } from "next/navigation"

const Layout = ({children}) => {
    const {user} = useContext(StoreContext)

    useEffect(() => {
        if (user.user.role !== 'ADMIN')
            redirect('/')
    }, [])
    return (
        <div className="grid grid-cols-4 gap-10 my-10 px-20">
            <div className=" bg-categories shadow-xl max-w-[363px] col-span-1 py-3">
                <h1 className="text-[1.7em] text-center">Admin Page</h1>
                <ul className="flex flex-col gap-5 m-10">
                    <li className={'hover:translate-x-5 transition'}>
                        <Link className="flex items-center gap-3 text-xl"
                            href={'/admin/dashboard'}>
                            <img src="/dashboardIcon.svg" width={40}></img>
                        Dashboard
                        </Link>
                    </li>
                    <li className={'hover:translate-x-5 transition'}>
                        <Link className="flex items-center gap-3 text-xl"
                            href={'/admin/products'}>
                            <img src="/productsIcon.svg" width={40}></img>
                        Products
                        </Link>
                    </li>
                    <li className={'hover:translate-x-5 transition'}>
                        <Link className="flex items-center gap-3 text-xl"
                            href={'/admin/orders'}>
                            <img src="/adminOrdersIcon.svg" width={40}></img>
                        Orders
                        </Link>
                    </li>
                    <li className={'hover:translate-x-5 transition'}>
                        <Link className="flex items-center gap-3 text-xl"
                            href={'/admin/clients'}>
                            <img src="/clientsIcon.svg" width={40}></img>
                        Clients
                        </Link>
                    </li>
                    <li className={'hover:translate-x-5 transition'}>
                        <Link className="flex items-center gap-3 text-xl"
                            href={'/admin/delivery'}>
                            <img src="/deliveryIcon.svg" width={40}></img>
                        Delivery
                        </Link>
                    </li>
                    <li className={'hover:translate-x-5 transition'}>
                        <Link className="flex items-center gap-3 text-xl"
                            href={'/admin/transactions'}>
                            <img src="/transactionsIcon.svg" width={40}></img>
                        Transactions
                        </Link>
                    </li>
                    <li className={'hover:translate-x-5 transition'}>
                        <Link className="flex items-center gap-3 text-xl"
                            href={'/admin/settings'}>
                            <img src="/settingsIcon.svg" width={40}></img>
                        Settings
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="col-span-3">
                {children}
            </div>
        </div>
    )
}

export default Layout