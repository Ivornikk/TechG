'use client'

import { observer } from "mobx-react-lite"
import { useState } from "react"

const ProductVariations = observer(({variations}) => {
    const getFirstVariations = () => {
        let res = []
        variations?.map(variation => {
            res.push(variation.values[0].id)
        })
        return res
    }
    const [activeVariations, setActiveVariations] = useState(getFirstVariations())
    const setActiveVariation = (variationTypeId, typeId) => {
        setActiveVariations(prev => ({
            ...prev,
            [variationTypeId]: typeId
        }))
    }

    return (
        <div className="mt-2 w-full">
            {
                variations?.map((variation, index) => {
                    return (
                        <div key={variation.id}>
                            <h2 className="text-xl">{variation.name}:</h2>
                            <ul className="flex flex-row max-w-[530px] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-hovered-text-1 overflow-x-auto">
                                {
                                    variation.values?.map(value => {
                                        return (
                                            <li className={`min-w-[85px] min-h-[45px] flex flex-shrink-0 justify-center
                                            items-center mr-4 my-3 cursor-pointer ${
                                                activeVariations[index] == value.id ? 'bg-button-active text-white' : ' bg-stroke hover:bg-button-active hover:text-white'
                                            }
                                            transition rounded-sm`}
                                            key={value.id}>
                                                <button onClick={() => setActiveVariation([variation.id, value.id])}
                                                 className="cursor-pointer">
                                                    {value.value}
                                                </button>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )
                })
            }
        </div>
    )
})

export default ProductVariations