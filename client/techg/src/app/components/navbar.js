import { redirect } from "next/navigation"
import Categories from "./categories"
import Link from "next/link"

const Navbar = () => {
    return (
        <nav className="md:px-30 bg-brand fixed w-full top-0 z-50 flex justify-center pb-5 md:pb-0 text-white">
            <Link className="flex-shrink-0 -translate-x-40 -translate-y-5 md:-translate-x-0 md:-translate-y-0" href={'/'}><img src="/nav-logo.svg" alt="Logo" className="py-5 h-auto md:w-[178px] cursor-pointer" width={150}></img></Link>
            <div className="flex flex-col justify-between w-full fixed md:relative">
                <div className="translate-y-16">
                    <form className="sm:ml-30">
                        <div className="flex items-center">
                            <input className="bg-search h-[40px] md:h-[56px] rounded-4xl px-5 xl:min-w-200 xl:flex-1 lg:w-130 md:w-70 text-black p-3 outline-none" placeholder="Search for products" type="text" />
                            <button className="cursor-pointer -translate-x-[50px] flex-shrink-0 mx-4"><img src="/search-icon.svg"></img></button>
                        </div>
                    </form>
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
        </nav>
    )
}

export default Navbar