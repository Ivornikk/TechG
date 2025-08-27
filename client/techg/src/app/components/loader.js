'use client'

import { useState, useEffect, useContext } from "react"
import { auth } from "../http/UserAPI"
import { StoreContext } from "../store/StoreProvider"
import { usePathname } from "next/navigation"

const Loader = () => {
    const [loading, setLoading] = useState(true)
    const { user } = useContext(StoreContext)
    let pathname = usePathname()

    useEffect(() => {
        auth().then(data => {
            user.setUser(data)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, [pathname])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }
    return <></>
}

export default Loader