import { makeAutoObservable } from "mobx"

class AddressStore {
    constructor() {
        this._addresses = []
        this._selectedAddress = {}
        makeAutoObservable(this)
    }

    setAddresses(addresses) {
        this._addresses = addresses
    }

    setSelectedAddresss(selectedAddress) {
        this._selectedAddress = selectedAddress
    }

    get addresses() {
        return this._addresses
    }

    get selectedAddress() {
        return this._selectedAddress
    }
}

export const addressStore = new AddressStore()