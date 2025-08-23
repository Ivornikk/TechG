import Categories from "./categories"
import Link from "next/link"
import NavbarAuthButtons from "./navbarAuthButtons"
import { redirect } from "next/navigation"
import SearchPanel from "./searchPanel"

const Navbar = () => {

    return (
        <nav className="md:px-30 bg-brand fixed w-full top-0 z-50 flex justify-center pb-5 md:pb-0 text-white">
            <Link className="flex-shrink-0 -translate-x-40 -translate-y-5 md:-translate-x-0 md:-translate-y-0" href={'/'}><img src="/nav-logo.svg" alt="Logo" className="py-5 h-auto md:w-[178px] cursor-pointer" width={150}></img></Link>
            <div className="flex flex-col justify-between w-full fixed md:relative">
                <div className="translate-y-16">
                    <SearchPanel />
                </div>
                <Categories />
            </div>
            <div className="flex flex-col justify-start md:justify-center mr-10 md:mr-20">
                <Link className="flex hover:-translate-x-3 transition cursor-pointer"
                      href={'/wishlist'}>
                    <img className="mx-7 md:mb-4" src="/wishlist-icon.svg"></img>
                    <button className="hidden md:block">Wishlist</button>
                </Link>
                <Link className="flex hover:-translate-x-3 transition cursor-pointer"
                      href={'/cart'}>
                    <img className="ml-6 mr-7 mt-4" src="/cart-icon.svg"></img>
                    <button className="hidden md:block">Cart</button>
                </Link>
            </div>
            <NavbarAuthButtons />
        </nav>
    )
}

export default Navbar