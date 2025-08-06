const SpecsCard = ({specs, features, pack}) => {
    return (
        <div className="px-30 py-10 bg-categories mt-20 shadow-xl">
            <h1 className="text-3xl mb-5">Specification:</h1>
            <ul className="mb-5">
                {
                    specs.map(spec => {
                        return (
                            <li key={spec.id}>{spec.name}</li>
                        )
                    })
                }
            </ul>
            <h1 className="text-3xl mb-5">Features:</h1>
            <ul className="mb-5">
                {
                    pack.map(elem => {
                        return (
                            <li key={elem.id}>{elem.name}</li>
                        )
                    })
                }
            </ul>
            <h1 className="text-3xl mb-5">Package includes:</h1>
            <ul className="mb-5">
                {
                    features.map(feature => {
                        return (
                            <li key={feature.id}>{feature.name}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default SpecsCard