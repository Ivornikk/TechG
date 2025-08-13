import Link from "next/link"

const Layout = () => {
    return (
        <div className="m-20 bg-categories shadow-xl max-w-[363px]">
            <h1 className="text-[1.7em] text-center">My Account </h1>
            <ul className="flex flex-col gap-5 m-10">
                <li>
                    <Link className="flex items-center gap-3 text-xl" href={'/'}>
                    <img src="/ordersIcon.svg"></img>My Orders
                    </Link>
                </li>
                <li>
                    <Link className="flex items-center gap-3 text-xl" href={'/'}>
                    <img src="/wishlistIconAcc.svg"></img>My Wishlist
                    </Link>
                </li>
                <li>
                    <Link className="flex items-center gap-3 text-xl" href={'/'}>
                    <img src="/settingsIcon.svg"></img>Settings
                    </Link>
                </li>
                <li>
                    <Link className="flex items-center gap-3 text-xl" href={'/'}>
                    <img src="/cartIconAcc.svg"></img>Shopping Cart
                    </Link>
                </li>
                <li className="mb-50">
                    <Link className="flex items-center gap-3 text-xl" href={'/'}>
                    <img src="/AddressBookIcon.svg"></img>Address Book
                    </Link>
                </li>
                <li className="mb-5">
                    <Link className="flex items-center gap-3 text-xl" href={'/'}>
                    <img src="/logOutIcon.svg"></img>Log Out
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Layout