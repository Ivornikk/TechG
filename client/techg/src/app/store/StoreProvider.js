'use client'

import React, {createContext} from "react"
import { userStore } from "./userStore"
import { productStore } from "./productStore"
import { basketStore } from "./basketStore"
import { wishlistStore } from "./wishlistStore"
import { addressStore } from "./addressStore"
import { orderStore } from "./orderStore"

export const StoreContext = createContext({
    userStore,
    productStore,
    basketStore,
    wishlistStore,
    addressStore,
    orderStore,
})

const StoreProvider = ({children}) => {
    return (
        <StoreContext.Provider value={{
            user: userStore,
            product: productStore,
            basket: basketStore,
            wishlist: wishlistStore,
            address: addressStore,
            order: orderStore,
        }}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider