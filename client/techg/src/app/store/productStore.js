'use client'
import { makeAutoObservable } from "mobx"

class ProductStore {
    constructor() {
        this._currentProduct = {}
        this._pictures = []
        this._products = []
        this._categories = []
        this._types = []
        this._groups = []
        this._reviews = []
        this._productsQuantities = {}
        this._quantity = 1
        this._totalProductsCount = 0
        makeAutoObservable(this)
    }

    setCurrentProduct(product) {
        this._currentProduct = product
    }

    setPictures(pictures) {
        this._pictures = pictures
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

    setReviews(reviews) {
        this._reviews = reviews
    }

    setProductsQuantities(productQuantities) {
        this._productsQuantities = productQuantities
    }

    setQuantity(quantity) {
        this._quantity = quantity
    }

    get currentProduct() {
        return this._currentProduct
    }

    get pictures() {
        return this._pictures
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

    get reviews() {
        return this._reviews
    }

    get productsQuantities() {
        return this._productsQuantities
    }

    get quantity() {
        return this._quantity
    }
}

export const productStore = new ProductStore()