'use client'

import Link from "next/link"
import { redirect, usePathname } from "next/navigation"
import { useContext } from "react"
import { StoreContext } from "../store/StoreProvider"

const Layout = ({children}) => {
    const { user } = useContext(StoreContext)
    const pathname = usePathname()

    const LogOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        redirect('/')
    }

    return (
        <div className="grid grid-cols-4 gap-10 my-10 px-20">
            <div className=" bg-categories shadow-xl max-w-[363px] col-span-1 py-3">
                <h1 className="text-[1.7em] text-center">My Account </h1>
                <ul className="flex flex-col gap-5 m-10">
                    <li className={`hover:translate-x-5 transition ${pathname == '/account/settings' ? 'text-button-active' : ''}`}>
                        <Link className="flex items-center gap-3 text-xl" href={'/account/settings'}>
                        {
                            pathname == '/account/settings' ?
                            <img src="/SettingsIconActive.svg"></img> :
                            <img src="/SettingsIcon.svg"></img>
                        }
                        Settings
                        </Link>
                    </li>
                    <li className={`hover:translate-x-5 transition ${pathname == '/account/my-orders' ? 'text-button-active' : ''}`}>
                        <Link className="flex items-center gap-3 text-xl" href={'/account/my-orders'}>
                        {
                            pathname == '/account/my-orders' ?
                            <img src="/ordersActiveIcon.svg"></img> :
                            <img src="/ordersIcon.svg"></img>
                        }
                        My Orders
                        </Link>
                    </li>
                    <li className={`hover:translate-x-5 transition`}>
                        <Link className="flex items-center gap-3 text-xl" href={'/wishlist'}>
                        <img src="/wishlistIconAcc.svg"></img>My Wishlist
                        </Link>
                    </li>
                    <li className={`hover:translate-x-5 transition ${pathname == '/cart' ? 'text-button-active' : ''}`}>
                        <Link className="flex items-center gap-3 text-xl" href={'/cart'}>
                        <img src="/cartIconAcc.svg"></img>Shopping Cart
                        </Link>
                    </li>
                    <li  className={`hover:translate-x-5 transition ${pathname == '/account/address-book' ? 'text-button-active' : ''}`}>
                        <Link className="flex items-center gap-3 text-xl" href={'/account/address-book'}>
                        {
                            pathname == '/account/address-book' ?
                            <img src="/addressBookActiveIcon.svg"></img> :
                            <img src="/AddressBookIcon.svg"></img>
                        }
                        Address Book
                        </Link>
                    </li>
                    <li  className={`mb-50 hover:translate-x-5 transition ${pathname == '/account/address-book' ? 'text-button-active' : ''}`}>
                        <Link className="flex items-center gap-3 text-xl"
                            href={'/admin/dashboard'}>
                        <img src="/admin.svg" className="w-[48px]"></img>
                        Admin page
                        </Link>
                    </li>
                    <li className="mb-5 hover:translate-x-5 transition justify-self-end">
                        <button className="flex items-center gap-3 text-xl cursor-pointer"
                            onClick={() => LogOut()}>
                        <img src="/logOutIcon.svg"></img>Log Out
                        </button>
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