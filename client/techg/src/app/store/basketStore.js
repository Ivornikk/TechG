'use client'
import { makeAutoObservable } from "mobx"

class BasketStore {
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

export const basketStore = new BasketStore()