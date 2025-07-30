import Categories from "./categories"
import Link from "next/link"

const Navbar = () => {
    return (
        <nav className="bg-brand fixed w-full top-0 z-50 flex justify-center">
            <Link className="flex-shrink-0" href={'/'}><img src="/nav-logo.svg" alt="Logo" className="py-5 h-auto md:w-55 cursor-pointer flex-shrink-0" width={150}></img></Link>
            <div className="flex flex-col sm:mr-10 justify-between">
                <div className="self-center">
                    <form className="sm:ml-30">
                        <div className="flex items-center">
                            <input className="bg-search rounded-4xl xl:min-w-150 xl:flex-1 lg:w-130 md:w-70 text-black p-3 outline-none" placeholder="Search for products" type="text" />
                            <button className="cursor-pointer -translate-x-[50px]"><img src="/search-icon.svg"></img></button>
                        </div>
                    </form>
                </div>
                <Categories />
            </div>
            <div className="flex flex-col justify-center mr-20">
                <div className="flex hover:-translate-x-3 transition cursor-pointer">
                    <img className="mx-7 mb-4" src="/wishlist-icon.svg"></img>
                    <button>Wishlist</button>
                </div>
                <div className="flex hover:-translate-x-3 transition cursor-pointer">
                    <img className="ml-6 mr-7 mt-4" src="/cart-icon.svg"></img>
                    <button>Cart</button>
                </div>
            </div>
            <div className="flex flex-col justify-evenly flex-shrink-0">
                <button className="py-3 px-10 rounded border border-white cursor-pointer flex-shrink-0 hover:text-brand hover:bg-white transition">Sign up</button>
                <button className="py-3 px-10 rounded border border-white cursor-pointer flex-shrink-0 hover:text-brand hover:bg-white transition">Log in</button>
            </div>
        </nav>
    )
}

export default Navbar