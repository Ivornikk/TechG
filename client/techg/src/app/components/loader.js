'use client'

import { useState, useEffect, useContext } from "react"
import { auth } from "../http/UserAPI"
import { StoreContext } from "../store/StoreProvider"
import { redirect, usePathname } from "next/navigation"
import { AuthRoutes, PublicRoutes } from "../routes"

const Loader = () => {
    const [loading, setLoading] = useState(true)
    const { user } = useContext(StoreContext)
    let pathname = usePathname()

    useEffect(() => {
        const checkAuth = async () => {
            try {
                setLoading(true)
                const data = await auth()
                user.setUser(data)
                user.setIsAuth(true)
            } catch (e) {
                user.setUser(null)
                user.setIsAuth(false)
                if (AuthRoutes.includes(pathname)) {
                    redirect('/sign-up')
                }
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [pathname])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen fixed w-full h-full bg-black/50">
                <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }
    return <></>
}

export default Loader