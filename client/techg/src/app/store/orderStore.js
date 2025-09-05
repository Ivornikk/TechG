import { makeAutoObservable } from "mobx"

class OrderStore {
    constructor() {
        this._orders = []
        this._currentOrder = {}
        this._ordersCount = 0
        makeAutoObservable(this)
    }

    setOrders(orders) {
        this._orders = orders
    }

    setCurrentOrder(order) {
        this._currentOrder = order
    }

    setOrdersCount(count) {
        this._ordersCount = count
    }

    get orders() {
        return this._orders
    }

    get currentOrder() {
        return this._currentOrder
    }

    get ordersCount() {
        return this._ordersCount
    }
}

export const orderStore = new OrderStore()