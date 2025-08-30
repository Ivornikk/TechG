'use client'
import { useContext } from "react"
import { StoreContext } from "../store/StoreProvider"
import { observer } from "mobx-react-lite"

const QuantityCounter = observer(({ defaultValue = 1 }) => {

    const {product} = useContext(StoreContext)

    return (
        <div className="text-[30px] w-[200px] flex items-center border border-stroke rounded-lg overflow-hidden">
            <button onClick={() => product.quantity > 1 ?
                product.setQuantity(product.quantity - 1) :
                product.setQuantity(1)}
                className="cursor-pointer text-[30px] bg-contain">
                <img src="/minus-icon.svg"></img>
            </button>
            <input type="text"
                className="px-10 border-x border-stroke w-full flex justify-center text-center"
                value={product.quantity}
                onChange={e => { isNaN(e.target.value) ? setQuantity(1) : setQuantity(Number(e.target.value)) }}
                maxLength={4}
            ></input>
            <button onClick={() => { product.setQuantity(product.quantity + 1) }}
                className=" cursor-pointer">
                <img className="h-full" src="/plus-icon.svg"></img>
            </button>
        </div>
    )
})

export default QuantityCounter