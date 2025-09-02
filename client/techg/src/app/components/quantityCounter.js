'use client'
import { observer } from "mobx-react-lite"
import { useState } from "react"

const QuantityCounter = observer(({ defaultValue = 1, increment, decrement}) => {

    const [quantity, setQuantity] = useState(defaultValue)

    return (
        <div className="text-[30px] w-[200px] flex items-center border border-stroke rounded-lg overflow-hidden">
            <button onClick={() => {
                decrement()
                quantity > 1 ?
                setQuantity(quantity - 1) :
                setQuantity(1)
            }}
                className="cursor-pointer text-[30px] bg-contain">
                <img src="/minus-icon.svg"></img>
            </button>
            <input type="text"
                className="px-10 border-x border-stroke w-full flex justify-center text-center"
                value={quantity}
                onChange={e => { isNaN(e.target.value) ? setQuantity(1) : setQuantity(Number(e.target.value)) }}
                maxLength={4}
            ></input>
            <button onClick={() => {
                increment()
                setQuantity(quantity + 1)
            }}
                className=" cursor-pointer">
                <img className="h-full" src="/plus-icon.svg"></img>
            </button>
        </div>
    )
})

export default QuantityCounter