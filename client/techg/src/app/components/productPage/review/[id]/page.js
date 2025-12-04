'use client'

const { fetchOneReview } = require("@/app/http/ratingAPI")
const { StoreContext } = require("@/app/store/StoreProvider")
const { observer } = require("mobx-react-lite")
const { useEffect, useContext } = require("react")

const ReviewPage = observer(({id}) => {
    const {rating} = useContext(StoreContext)

    useEffect(() => {
        fetchOneReview(id).then(data => {
            rating.setCurrentRating(data);
        })
    }, [])

    return (
        <div>
            
        </div>
    )
})

export default ReviewPage