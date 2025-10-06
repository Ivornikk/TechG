'use client'
import Link from "next/link"
import { useState } from "react"

const AsidePanel = () => {
    
    const [shown, setShown] = useState(false)

    return (
        <>
            <button onClick={() => setShown(true)}>
                <img 
                    src="/categories-icon.svg "
                    width={30}>
                </img>
            </button>
        <div className={`z-[30] fixed top-0 left-0 h-[100vh] w-[100vw] bg-black/50 transition duration-300
            ${shown ? 'visible' : 'invisible'}`}>
            <aside className={`fixed top-0 left-0 bg-white h-[100vh] w-64 z-[40] transform transition-transform duration-300
            p-5 flex flex-col text-[1.3em]
            ${shown ? 'translate-x-0' : '-translate-x-full'}`}>
                <ul className="flex flex-col gap-5">
                    <li onClick={() => setShown(false)}>
                        <Link href={'/account/main'}
                            className="flex gap-3 items-center">
                            <img src="/UserIcon.svg" className="invert w-12"></img>
                            My Account
                        </Link>
                    </li>
                    <li onClick={() => setShown(false)}>
                        <Link href={'/wishlist'}
                            className="flex gap-3 items-center">
                            <img src="/wishlist-icon.svg" className="invert w-12"></img>
                            My Wishlist
                        </Link>
                    </li>
                    <li onClick={() => setShown(false)}>
                        <Link href={'/cart'}
                            className="flex gap-3 items-center">
                            <img src="/cart-icon.svg" className="invert w-12"></img>
                            My Cart
                        </Link>
                    </li>
                    <li onClick={() => setShown(false)}>
                        <Link href={'/account/my-orders'}
                            className="flex gap-3 items-center">
                            <img src="/adminOrdersIcon.svg" className="w-12"></img>
                            My Orders
                        </Link>
                    </li>
                    <hr className="border-stroke w-full" />
                </ul>
            </aside>
            <button onClick={() => setShown(false)}
                className="text-[2em] text-white fixed right-10 top-5">
                X
            </button>
        </div>
        </>
    )
}

export default AsidePanel