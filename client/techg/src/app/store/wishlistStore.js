import { makeAutoObservable } from "mobx"

class WishlistStore {
    constructor() {
        this._items = []
        makeAutoObservable(this)
    }

    setItems(items) {
        this._items = items
    }

    get items() {
        return this._items
    }
}

export const wishlistStore = new WishlistStore()