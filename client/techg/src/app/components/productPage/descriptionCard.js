const DescriptionCard = ({images, description}) => {
    return (
        <div className="px-30 py-10 bg-categories mt-20 shadow-xl">
            <h1 className="text-3xl mb-5">Description:</h1>
            <p className="mb-15">{description}</p>
            <div className="grid grid-cols-2 gap-4 mx-30">
                {
                    images.map(image => {
                        return (
                            <img key={image.id} src={image.url}></img>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DescriptionCard