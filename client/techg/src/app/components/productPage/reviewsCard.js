const ReviewsCard = ({reviews}) => {

    const rating = 3.75

    const countReviewsByRating = (rating) => {
        let sum = 0
        reviews.map(review => {
            if (review.stars == rating) sum++
        })
        return sum
    }

    const stars = (rating) => {
        return (
            <div className="flex">
                        {rating >= 1 ?
                        <img src="/starYellow.svg"></img> :
                        <img src="/starGray.svg"></img>}
                        {rating >= 2 ?
                        <img src="/starYellow.svg"></img> :
                        <img src="/starGray.svg"></img>}
                        {rating >= 3 ?
                        <img src="/starYellow.svg"></img> :
                        <img src="/starGray.svg"></img>}
                        {rating >= 4 ?
                        <img src="/starYellow.svg"></img> :
                        <img src="/starGray.svg"></img>}
                        {rating == 5 ?
                        <img src="/starYellow.svg"></img> :
                        <img src="/starGray.svg"></img>}
                    </div>
        )
    }

    return (
        <div className="px-30 py-10 bg-categories mt-20 shadow-xl">
            <h1 className="text-3xl">Customer Reviews:</h1>
            <div className="grid grid-cols-3 gap-5 mt-10">
                <div className="flex flex-col items-center">
                    <div className="flex items-end">
                        <h1 className="text-[50px]">3,75</h1>
                        <p className="-translate-y-3 text-lg">out of 5</p>
                    </div>
                    {stars(rating)}
                </div>
                <div className="grid grid-rows-5 gap-1">
                    <div className="flex">
                        <p>5 Stars:</p>
                        <div className="h-[75%] bg-stroke w-50 mx-5 rounded-xl self-center"></div>
                        <p>{countReviewsByRating(5)}</p>
                    </div>
                    <div className="flex">
                        <p>4 Stars:</p>
                        <div className="h-[75%] bg-stroke w-50 mx-5 rounded-xl self-center"></div>
                        <p>{countReviewsByRating(4)}</p>
                    </div>
                    <div className="flex">
                        <p>3 Stars:</p>
                        <div className="h-[75%] bg-stroke w-50 mx-5 rounded-xl self-center"></div>
                        <p>{countReviewsByRating(3)}</p>
                    </div>
                    <div className="flex">
                        <p>2 Stars:</p>
                        <div className="h-[75%] bg-stroke w-50 mx-5 rounded-xl self-center"></div>
                        <p>{countReviewsByRating(2)}</p>
                    </div>
                    <div className="flex">
                        <p>1 Stars:</p>
                        <div className="h-[75%] bg-stroke w-50 mx-5 rounded-xl self-center"></div>
                        <p>{countReviewsByRating(1)}</p>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <button className="border border-button-active text-xl bg-button-active cursor-pointer text-white hover:bg-categories hover:text-button-active px-8 py-3 transition rounded-lg">
                        Write an review
                    </button>
                </div>
            </div>
            <select className="mr-5">
                <option>1 star</option>
                <option>2 star</option>
                <option>3 star</option>
                <option>4 star</option>
                <option>5 star</option>
            </select>
            <label>Sort by:</label>
            <select>
                <option>Highest rating</option>
                <option>Most recent</option>
                <option>Oldest</option>
            </select>
            <ul className="flex flex-col">
                {
                    reviews.map(review => {
                        return (
                            <li key={review.id}>
                                <div key={review.id} className="flex justify-start mt-5 mb-10">
                                    <div className="grid grid-cols-2 w-[15%] mr-50">
                                        <div className="w-[65px] h-[65px] bg-stroke rounded-4xl row-span-2"></div>
                                        <h2 className="text-lg">{review.user}</h2>
                                        <h2 className="text-lg -translate-y-3">{review.country}</h2>
                                    </div>
                                    <div className="flex flex-col ">
                                        <div className="flex items-center">
                                            {stars(review.stars)}
                                            <p className="text-gray-text ml-7 ">{review.date}</p>
                                        </div>
                                        <p className="mt-5">
                                            {review.text}
                                        </p>
                                    </div>
                                </div>
                                <hr className="w-[80%] border-stroke justify-self-center"></hr>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default ReviewsCard