'use client'

import { useState } from "react"

const AsidePanel = () => {
    const [visible, setVisible] = useState(false)
    
    return (
        <>
        <button>
            <img 
                src="/categories-icon.svg "
                width={30}>
            </img>
        </button>
        </>
    )
}

export default AsidePanel