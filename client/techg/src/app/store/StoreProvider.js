'use client'

import React, {createContext} from "react"
import { userStore } from "./userStore"
import { productStore } from "./productStore"
import { basketStore } from "./basketStore"

export const StoreContext = createContext({
    userStore,
    productStore,
    basketStore,
})

const StoreProvider = ({children}) => {
    return (
        <StoreContext.Provider value={{
            user: userStore,
            product: productStore,
            basket: basketStore,
        }}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider