'use client'

import { createRating } from "@/app/http/ratingAPI"
import { StoreContext } from "@/app/store/StoreProvider"
import { useContext, useState } from "react"

const WriteReviewForm = ({productId}) => {
    const { user } = useContext(StoreContext)
    const userId = user.user.id

    const [rate, setRate] = useState(5)
    const [review, setReview] = useState('')
    const [images, setImages] = useState([])

    const addReview = () => {
        const formData = new FormData()

        formData.append('rate', rate)
        formData.append('userId', userId)
        formData.append('productId', productId)
        formData.append('review', review)

        try {
            images.forEach(image => {
                formData.append('images', image)
            })
        } catch {
            formData.append('images', images)
        }

        try {
            createRating(formData)
            .then(() => alert('Success'))
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <form className="flex flex-col gap-5 justify-center items-center"
            onSubmit={e => e.preventDefault()}>
            <div className="flex gap-3">
                <label onClick={() => setRate(1)}
                    className={`hover:underline cursor-pointer ${rate==1&&'underline'}`}>1 star
                </label>
                <label onClick={() => setRate(2)}
                    className={`hover:underline cursor-pointer ${rate==2&&'underline'}`}>2 stars
                </label>
                <label onClick={() => setRate(3)}
                    className={`hover:underline cursor-pointer ${rate==3&&'underline'}`}>3 stars
                </label>
                <label onClick={() => setRate(4)}
                    className={`hover:underline cursor-pointer ${rate==4&&'underline'}`}>4 stars
                </label>
                <label onClick={() => setRate(5)}
                    className={`hover:underline cursor-pointer ${rate==5&&'underline'}`}>5 stars
                </label>
            </div>
            <div className="flex flex-col gap-3">
                <label>Write your review:</label>
                <textarea className="px-5 py-2 border border-brand rounded"
                    onChange={e => setReview(e.target.value)} />
            </div>
            <input type="file" multiple
                onChange={e => setImages(Array.from(e.target.files))}
                className="border border-brand rounded px-5 py-2" />
            <button className="bg-brand border border-brand px-4 py-2 text-white cursor-pointer rounded-xl hover:bg-white hover:text-brand transition"
                onClick={addReview}>
                Submit
            </button>
        </form>
    )
}

export default WriteReviewForm