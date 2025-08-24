'use client'
import { makeAutoObservable } from "mobx"

class ProductStore {
    constructor() {
        this._products = []
        this._totalProductsCount = 0
        makeAutoObservable(this)
    }

    setProducts(products) {
        this._products = products
    }
    
    setTotalProductsCount(count) {
        this._totalProductsCount = count
    }

    get products() {
        return this._products
    }

    get totalProductsCount() {
        return this._totalProductsCount
    }
}

export const productStore = new ProductStore()