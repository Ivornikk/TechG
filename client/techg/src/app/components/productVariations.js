const ProductVariations = ({variations}) => {
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
                                            <li className="min-w-[85px] min-h-[45px] flex flex-shrink-0 justify-center items-center bg-stroke mr-4 my-3 cursor-pointer hover:bg-button-active transition rounded-sm" key={type.id}>
                                                <button className="cursor-pointer">{type.name}</button>
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