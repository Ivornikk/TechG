'use client'
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Footer = () => {
    const [isShort, setIsShort] = useState()
    const pathname = usePathname()

    useEffect(() => {
        const checkHeight = () => {
            const contentHeight = document.documentElement.scrollHeight
            const screenHeight = window.innerHeight
            setIsShort(contentHeight <= screenHeight)
        }

        checkHeight()

        window.addEventListener('resize', checkHeight)
        return () => window.removeEventListener('resize', checkHeight)
    }, [pathname])

    return (
        <footer className={`md:px-30 bg-brand w-full bottom-0 z-50 flex justify-center pb-5 md:pb-0 text-white ${isShort && 'fixed'}`}>
            <Link className="flex-shrink-0  -translate-x-40 -translate-y-5 md:-translate-x-0 md:-translate-y-0" href={'/'}><img src="/nav-logo.svg" alt="Logo" className="py-5 h-auto md:w-[178px] cursor-pointer" width={150}></img></Link>
            <div className="flex flex-col justify-between w-full fixed md:relative">
                <div className="translate-y-16 text-center ">
                    contact us: techgcontact08@gmail.com
                </div>
            </div>
        </footer>
    )
}

export default Footer