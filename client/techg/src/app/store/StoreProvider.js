'use client'

import React, {createContext} from "react"
import { userStore } from "./userStore"
import { productStore } from "./productStore"
import { basketStore } from "./basketStore"
import { wishlistStore } from "./wishlistStore"

export const StoreContext = createContext({
    userStore,
    productStore,
    basketStore,
    wishlistStore,
})

const StoreProvider = ({children}) => {
    return (
        <StoreContext.Provider value={{
            user: userStore,
            product: productStore,
            basket: basketStore,
            wishlist: wishlistStore,
        }}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider