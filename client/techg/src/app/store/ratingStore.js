const { makeAutoObservable } = require("mobx");

class RatingStore {
    constructor() {
        this._currentRating = {}
        this._ratings = []
        makeAutoObservable(this)
    }

    setCurrentRating(rating) {
        this._currentRating = rating
    }

    setRatings(ratings) {
        this._ratings = ratings
    }

    get currentRating() {
        return this._currentRating
    }

    get ratings() {
        return this._ratings
    }
}

export const ratingStore = new RatingStore()