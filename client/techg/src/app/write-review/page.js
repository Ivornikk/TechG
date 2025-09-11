'use client'

import { useContext, useEffect, useState } from "react"
import WriteReviewForm from "../components/forms/writeReviewForm"
import { StoreContext } from "../store/StoreProvider"
import { CheckUserForOrder } from "../http/OrderAPI"
import { useSearchParams } from "next/navigation"

const WriteReview = () => {
    const { user } = useContext(StoreContext)
    const userId = user.user.id
    const [isOrdered, setIsOrdered] = useState(false)
    const productId = useSearchParams().get('productId')
    useEffect(() => {
        CheckUserForOrder({userId, productId})
        .then(data => setIsOrdered(data))
    }, [])

    return (
        <div className="max-w-[1300px] m-auto my-10">
            { isOrdered ?
                <WriteReviewForm productId={productId} />
            :
                <div className="text-[1.5em]">
                    You must purchase the product first to rate it.
                </div>
            }
        </div>
    )
}

export default WriteReview