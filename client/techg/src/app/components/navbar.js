import Categories from "./categories"
import Link from "next/link"
import NavbarAuthButtons from "./navbarAuthButtons"
import SearchPanel from "./searchPanel"

const Navbar = () => {

    return (
        <nav className="xl:px-30 pb-0
                        bg-brand fixed w-[100vw] top-0 px-2 flex text-white justify-between items-center">
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
                    <div className="md:mr-20 md:justify-center flex flex-col mr-10 justify-end">
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
                            </button>
                        </Link>
                    </div>
                    <div>
                        <NavbarAuthButtons />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar