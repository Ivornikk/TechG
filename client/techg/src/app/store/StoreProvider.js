'use client'
import React, {createContext, useContext} from "react"
import { userStore } from "./userStore"
import { productStore } from "./productStore"

const StoreContext = createContext({ 
    userStore, 
    productStore 
})

export const StoreProvider = ({children}) => {
    return (
        <StoreContext.Provider value={ {userStore, productStore} }>
            {children}
        </StoreContext.Provider>
    )
}

export const useStore = () => useContext(StoreContext)