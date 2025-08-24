'use client'

import React, {createContext} from "react"
import { userStore } from "./userStore"
import { productStore } from "./productStore"

export const StoreContext = createContext({
    userStore,
    productStore
})

const StoreProvider = ({children}) => {
    return (
        <StoreContext.Provider value={{
            user: userStore,
            product: productStore,
        }}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider