'use client'

import { useState, useEffect, useContext } from "react"
import { useRouter } from "next/navigation"
import { auth } from "../http/UserAPI"
import { StoreContext } from "../store/StoreProvider"
import { redirect, usePathname } from "next/navigation"
import { AuthRoutes, PublicRoutes } from "../routes"

const Loader = () => {
    const [loading, setLoading] = useState(true)
    const { user } = useContext(StoreContext)
    const router = useRouter()
    let pathname = usePathname()

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const data = await auth()
                user.setUser(data)
                user.setIsAuth(true)
                if (!AuthRoutes.includes(pathname) && 
                    !PublicRoutes.some(route => pathname.startsWith(route))
                ) {
                    router.push("/page-not-found");
                }

                
            } catch (e) {
                user.setUser(null)
                user.setIsAuth(false)
                if (AuthRoutes.includes(pathname)) {
                    router.push('/sign-up')
                }
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [pathname])

    if (loading) {
        return (
            <div className="z-100 flex items-center justify-center min-h-screen w-full h-full bg-black/50">
                <div className="h-[100vh] w-[100vw] block">

                </div>
                <div className="fixed">
                    <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        )
    }
    return <></>
}

export default Loader