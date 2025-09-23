'use client'
import Categories from "./navbar/categories"
import Link from "next/link"
import NavbarAuthButtons from "./navbar/navbarAuthButtons"
import SearchPanel from "./navbar/searchPanel"
import AsidePanel from "./navbar/AsidePanel"
import { useState, useEffect, useContext } from "react"
import { fetchCartItemsByUser } from "../http/BasketAPI"
import { StoreContext } from "../store/StoreProvider"

const Navbar = () => {

    const [isMobile, setIsMobile] = useState(false)
    const [cartItems, setCartItems] = useState(0)

    const { user } = useContext(StoreContext)
    const userId = user.user?.id

    useEffect(() => {
        fetchCartItemsByUser(userId)
        .then(data => {
            setCartItems(data.count)
        })
    }, [userId])

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
        <>
        {
            isMobile ?
        <nav className="fixed flex flex-col gap-3 bg-brand w-[100vw] top-0 px-3 py-2">
            <div className="flex items-center justify-between">
                <div className="flex gap-3">
                    <AsidePanel />
                    <Link href={'/'}>
                        <img
                            src="/nav-logo-mobile.svg"
                            alt="Logo"
                            width={100}>
                        </img>
                    </Link>
                </div>
                <NavbarAuthButtons isMobile={isMobile} />
            </div>
            <SearchPanel isMobile={true} />
        </nav>
        :
        <nav className="xl:px-30 pb-0 fixed
                        bg-brand w-[100vw] z-50 top-0 px-2 flex text-white justify-between items-center">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <Link href={'/'}
                        className="w-fit">
                        <img src="/nav-logo.svg"
                            alt="Logo"
                            width={150}
                            className="md:min-w-[178px] min-w-[150px] py-5 cursor-pointer">
                        </img>
                    </Link>
                    <div className="w-fit">
                        <Categories />
                    </div>
                </div>
            </div>
            <div className="hidden sm:block grow">
                <SearchPanel />
            </div>
            <div className="flex flex-col sm:self-auto mb-3 self-end">
                <div className="sm:hidden grow">
                    <SearchPanel />
                </div>
                <div className="flex gap-1">
                    <div className="md:mr-20 md:justify-center flex flex-col mr-3 justify-end">
                        <Link className="
                                        flex sm:hover:-translate-x-3 transition cursor-pointer"
                            href={'/wishlist'}>
                            <img className="mx-7 md:mb-4"
                                src="/wishlist-icon.svg"></img>
                            <button className=" md:block
                                                hidden cursor-pointer">
                                Wishlist
                            </button>
                        </Link>
                        <Link className="flex sm:hover:-translate-x-3 transition cursor-pointer"
                            href={'/cart'}>
                            <img className="ml-6 mr-7 mt-4"
                            src="/cart-icon.svg"></img>
                            <button className="md:block
                                                hidden cursor-pointer">
                                Cart
                                {cartItems}
                            </button>
                        </Link>
                    </div>
                    <div>
                        <NavbarAuthButtons isMobile={isMobile} />
                    </div>
                </div>
            </div>
        </nav>
        }
        </>
    )
}

export default Navbar