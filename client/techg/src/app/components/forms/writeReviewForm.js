'use client'

import { StoreContext } from "@/app/store/StoreProvider"
import { useContext } from "react"

const WriteReviewForm = ({productId}) => {
    const { user } = useContext(StoreContext)
    const userId = user.user.id

    return (
        <form>
            <input placeholder="Write sth" />
        </form>
    )
}

export default WriteReviewForm