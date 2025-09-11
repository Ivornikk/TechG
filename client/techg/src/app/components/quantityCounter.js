'use client'
import { observer } from "mobx-react-lite"
import { useState } from "react"

const QuantityCounter = observer(({ defaultValue = 1, changeQuantity}) => {

    const [quantity, setQuantity] = useState(1)

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
            changeQuantity(quantity - 1)
        } else
            setQuantity(1)
    }

    const inputChange = e => {
        if (isNaN(e.target.value)) {
            changeQuantity(1)
            setQuantity(1)
        } else
            changeQuantity(Number(e.target.value))
            setQuantity(Number(e.target.value))
    }

    return (
        <div className="text-[30px] w-[200px] flex items-center border border-stroke rounded-lg overflow-hidden">
            <button onClick={decrement}
                className="cursor-pointer text-[30px] bg-contain">
                <img src="/minus-icon.svg"></img>
            </button>
            <input type="text"
                className="px-10 border-x border-stroke w-full flex justify-center text-center"
                value={quantity}
                onChange={inputChange}
                maxLength={4}
            ></input>
            <button onClick={() => {
                setQuantity(quantity + 1)
                changeQuantity(quantity + 1)
            }}
                className=" cursor-pointer">
                <img className="h-full" src="/plus-icon.svg"></img>
            </button>
        </div>
    )
})

export default QuantityCounter