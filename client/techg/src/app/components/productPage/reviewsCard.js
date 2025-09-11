import Link from "next/link"

const ReviewsCard = ({reviews}) => {

    const estimateAverageRating = () => {
        let res = 0
        reviews.map(review => {
            res+=review.stars
        })
        res/=reviews.length
        return res.toFixed(2)
    }

    const rating = estimateAverageRating()

    const countReviewsByRating = (rating) => {
        let sum = 0
        reviews.map(review => {
            if (review.stars == rating) sum++
        })
        return sum
    }

    const ratingBar = (ratingAmount) => {
        const width = ratingAmount / reviews.length * 100
        return (
            <div className="h-[10px] bg-stroke w-full rounded-xl self-center">
                <div className={`z-10 h-[10px] rounded-xl bg-button-active
                `}
                style={{width: `${width}%`}}></div>
            </div>
        )
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
                        <h1 className="text-[50px]">{rating}</h1>
                        <p className="-translate-y-3 text-lg">out of 5</p>
                    </div>
                    {stars(rating)}
                </div>
                <div className="grid grid-cols-5">
                    <div className="grid gap-1 col-span-1">
                        <p>5 Stars:</p>
                        <p>4 Stars:</p>
                        <p>3 Stars:</p>
                        <p>2 Stars:</p>
                        <p>1 Star:</p>
                    </div>
                    <div className="grid gap-1 col-span-3">
                        {ratingBar(countReviewsByRating(5))}
                        {ratingBar(countReviewsByRating(4))}
                        {ratingBar(countReviewsByRating(3))}
                        {ratingBar(countReviewsByRating(2))}
                        {ratingBar(countReviewsByRating(1))}
                    </div>
                    <div className="grid gap-1 ml-2">
                        <p>{countReviewsByRating(5)}</p>
                        <p>{countReviewsByRating(4)}</p>
                        <p>{countReviewsByRating(3)}</p>
                        <p>{countReviewsByRating(2)}</p>
                        <p>{countReviewsByRating(1)}</p>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <Link className="border border-button-active text-xl bg-button-active cursor-pointer text-white hover:bg-categories hover:text-button-active px-8 py-3 transition rounded-lg"
                        href={`/write-review?productId=${26}`}>
                        Write an review
                    </Link>
                </div>
            </div>
            <select className="mr-5 cursor-pointer">
                <option>1 star</option>
                <option>2 star</option>
                <option>3 star</option>
                <option>4 star</option>
                <option>5 star</option>
            </select>
            <label>Sort by:</label>
            <select className=" cursor-pointer">
                <option>Highest rating</option>
                <option>Most recent</option>
                <option>Oldest</option>
            </select>
            <ul className="flex flex-col">
                {
                    reviews.map(review => {
                        return (
                            <li key={review.id}>
                                <div key={review.id} className="flex justify-between mt-5 mb-5">
                                    <div className="grid grid-cols-2 w-[15%]">
                                        <div className="w-[65px] h-[65px] bg-stroke rounded-4xl row-span-2"></div>
                                        <div>
                                            <h2 className="text-lg mb-2">{review.user}</h2>
                                            <h2 className="text-lg -translate-y-3">{review.country}</h2>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-[70%]">
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