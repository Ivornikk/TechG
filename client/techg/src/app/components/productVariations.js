import { useState } from "react"

const ProductVariations = ({variations}) => {
    const getFirstVariations = () => {
        let res = []
        variations.map(variation => {
            res.push(variation.types[0].id)
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
                variations.map(variationType => {
                    return (
                        <div key={variationType.id}>
                            <h2 className="text-xl">{variationType.name}:</h2>
                            <ul className="flex flex-row max-w-[530px] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-hovered-text-1 overflow-x-auto">
                                {
                                    variationType.types.map(type => {
                                        return (
                                            <li className={`min-w-[85px] min-h-[45px] flex flex-shrink-0 justify-center
                                            items-center mr-4 my-3 cursor-pointer ${activeVariations[variationType.id] == type.id ? 'bg-button-active text-white' : ' bg-stroke hover:bg-button-active hover:text-white'}
                                            transition rounded-sm`}
                                            key={type.id}>
                                                <button onClick={() => setActiveVariation(variationType.id, type.id)}
                                                 className="cursor-pointer">{type.name}</button>
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
}

export default ProductVariations