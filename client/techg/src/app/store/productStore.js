'use client'
import { makeAutoObservable } from "mobx"

class ProductStore {
    constructor() {
        this._products = []
        this._categories = []
        this._types = []
        this._groups = []
        this._totalProductsCount = 0
        makeAutoObservable(this)
    }

    setProducts(products) {
        this._products = products
    }
    
    setTotalProductsCount(count) {
        this._totalProductsCount = count
    }

    setCategories(categories) {
        this._categories = categories
    }

    setTypes(types) {
        this._types = types
    }

    setGroups(groups) {
        this._groups = groups
    }

    get products() {
        return this._products
    }

    get totalProductsCount() {
        return this._totalProductsCount
    }

    get categories() {
        return this._categories
    }

    get types() {
        return this._types
    }

    get groups() {
        return this._groups
    }
}

export const productStore = new ProductStore()